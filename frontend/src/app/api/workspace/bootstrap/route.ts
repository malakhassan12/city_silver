import { NextResponse } from 'next/server';
import { getDb, requireStaffFromRequest, sanitizeUser } from '@/src/lib/storeDb';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const auth = requireStaffFromRequest(req);
  if (!auth.ok) return auth.response;

  const db = getDb();
  const { user, staffRole } = auth;
  const isOwner = staffRole.role === 'owner';
  const perms = staffRole.permissions;

  const visibleOrders =
    isOwner || perms.canViewAllOrders
      ? db.orders
      : perms.canViewAssignedOrders
      ? db.orders.filter((o) => o.assignedEmployeeId === user.id)
      : [];

  const customers =
    isOwner || perms.canViewFinancialReports
      ? db.users
          .filter((u) => !db.staffRoles.some((r) => r.userId === u.id))
          .map(sanitizeUser)
      : [];

  const staffMembers =
    isOwner || perms.canManageStaff
      ? db.staffRoles.map((roleRec) => {
          const u = db.users.find((usr) => usr.id === roleRec.userId);
          return {
            staffRole: roleRec,
            profile: u ? sanitizeUser(u) : null,
          };
        })
      : db.staffRoles
          .filter((r) => r.role === 'employee' && r.active)
          .map((roleRec) => {
            const u = db.users.find((usr) => usr.id === roleRec.userId);
            return {
              staffRole: roleRec,
              profile: u ? sanitizeUser(u) : null,
            };
          });

  return NextResponse.json(
    {
      myStaffRole: staffRole,
      products: db.products,
      categories: db.categories,
      inventoryLogs: isOwner || perms.canManageInventory ? db.inventoryLogs : [],
      orders: visibleOrders,
      silverPricing: db.silverPricing,
      settings: db.settings,
      customers,
      staffMembers,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}
