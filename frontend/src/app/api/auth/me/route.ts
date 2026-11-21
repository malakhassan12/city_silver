import { NextResponse } from 'next/server';
import { getAuthContextFromRequest, sanitizeUser } from '@/src/lib/storeDb';

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { user, staffRole } = getAuthContextFromRequest(req);
  if (!user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  return NextResponse.json({
    user: sanitizeUser(user),
    staffRole,
  });
}
