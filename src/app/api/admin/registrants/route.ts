import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const db = getDb();
        const result = await db.query('SELECT * FROM registrants ORDER BY registrationDate DESC');
        return NextResponse.json(result.rows);
    } catch {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
