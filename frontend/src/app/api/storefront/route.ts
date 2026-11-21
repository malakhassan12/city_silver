import { NextResponse } from 'next/server';
import { getPublicStorefront } from '@/src/lib/storeDb';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(getPublicStorefront(), {
    headers: { 'Cache-Control': 'no-store' },
  });
}
