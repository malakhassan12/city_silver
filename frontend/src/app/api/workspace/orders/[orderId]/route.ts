import crypto from 'node:crypto';
import { NextResponse } from 'next/server';
import { getDb, requireStaffFromRequest, saveDb } from '@/src/lib/storeDb';
import type { Order, OrderStatus } from '@/src/types/store';

export async function PATCH(
  req: Request,
  context: { params: Promise<{ orderId: string }> }
) {
  const auth = requireStaffFromRequest(req);
  if (!auth.ok) return auth.response;

  const { orderId } = await context.params;
  const db = getDb();
  const { user, staffRole } = auth;
  const order = db.orders.find((o) => o.id === orderId);
  if (!order) {
    return NextResponse.json({ error: 'Order not found' }, { status: 404 });
  }

  const isOwner = staffRole.role === 'owner';
  const perms = staffRole.permissions;

  if (!isOwner && !perms.canViewAllOrders && order.assignedEmployeeId !== user.id) {
    return NextResponse.json({ error: 'Order is not assigned to you' }, { status: 403 });
  }

  const { assignedEmployeeId, checklist, status, courierNote, refundAmount } =
    (await req.json()) as {
      assignedEmployeeId?: string | null;
      checklist?: Partial<Order['checklist']>;
      status?: OrderStatus;
      courierNote?: string;
      refundAmount?: number;
    };

  if (assignedEmployeeId !== undefined) {
    if (!isOwner && !perms.canManageStaff) {
      return NextResponse.json(
        { error: 'Only store owner or staff manager can reassign orders' },
        { status: 403 }
      );
    }
    if (assignedEmployeeId === null || assignedEmployeeId === '') {
      order.assignedEmployeeId = null;
      order.assignedEmployeeName = null;
    } else {
      const emp = db.users.find((u) => u.id === assignedEmployeeId);
      order.assignedEmployeeId = emp?.id ?? null;
      order.assignedEmployeeName = emp?.name ?? null;
    }
  }

  if (checklist) {
    if (!isOwner && !perms.canPrepareOrders) {
      return NextResponse.json(
        { error: 'Permission denied: cannot prepare orders' },
        { status: 403 }
      );
    }
    order.checklist = { ...order.checklist, ...checklist };
  }

  if (courierNote !== undefined) {
    if (!isOwner && !perms.canHandleDeliveryPickup) {
      return NextResponse.json(
        { error: 'Permission denied: cannot update delivery/pickup notes' },
        { status: 403 }
      );
    }
    order.courierNote = courierNote.slice(0, 240);
  }

  if (status && status !== order.status) {
    if (status === 'completed') {
      if (!isOwner && !perms.canCompleteOrders) {
        return NextResponse.json(
          { error: 'Permission denied: cannot complete orders' },
          { status: 403 }
        );
      }
      order.completedAt = new Date().toISOString();
    } else if (status === 'cancelled') {
      if (!isOwner && !perms.canIssueRefunds) {
        return NextResponse.json(
          { error: 'Permission denied: cancelling requires refund authority' },
          { status: 403 }
        );
      }
    } else if (!isOwner && !perms.canUpdateOrderStatus) {
      return NextResponse.json(
        { error: 'Permission denied: cannot update order status' },
        { status: 403 }
      );
    }
    order.status = status;
  }

  if (typeof refundAmount === 'number' && refundAmount > 0) {
    if (!isOwner && !perms.canIssueRefunds) {
      return NextResponse.json(
        { error: 'Permission denied: refunds are off by default' },
        { status: 403 }
      );
    }
    order.paidAmount = Math.max(0, order.paidAmount - refundAmount);
    order.paymentStatus = 'refunded';
    order.paymentLogs.push({
      id: `pay-${crypto.randomUUID().slice(0, 8)}`,
      amount: -refundAmount,
      method: 'Refund',
      recordedBy: user.name,
      recordedAt: new Date().toISOString(),
      note: 'Refund issued',
    });
  }

  order.updatedAt = new Date().toISOString();
  saveDb();
  return NextResponse.json(order);
}
