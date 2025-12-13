import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session || session.value !== 'true') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const db = await getDb();
        const registrants = await db.all('SELECT * FROM registrants ORDER BY registrationDate DESC');
        return NextResponse.json(registrants);
    } catch {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
