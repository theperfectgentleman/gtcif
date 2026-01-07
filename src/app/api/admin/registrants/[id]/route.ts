import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { cookies } from 'next/headers';

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const db = await getDb();
        const registrant = await db.get('SELECT * FROM registrants WHERE id = ?', id);
        
        if (!registrant) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json(registrant);
    } catch {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
