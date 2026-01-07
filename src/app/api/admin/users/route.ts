import { NextResponse } from 'next/server';
import { getDb } from '../../../../lib/db';
import { cookies } from 'next/headers';

export async function GET() {
    const cookieStore = await cookies();
    const role = cookieStore.get('admin_role')?.value;
    
    if (role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const db = await getDb();
    const users = await db.all('SELECT id, username, role, createdAt FROM users');
    return NextResponse.json(users);
}

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const role = cookieStore.get('admin_role')?.value;
    
    if (role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    const { username, password, role: newRole } = body;

    if (!username || !password || !newRole) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const db = await getDb();
    try {
        await db.run(
            'INSERT INTO users (username, password, role) VALUES (?, ?, ?)',
            username, password, newRole
        );
        return NextResponse.json({ success: true });
    } catch {
         // This works for sqlite 'unique' error usually, but message format depends on driver version
         return NextResponse.json({ success: false, error: 'Could not create user. Username might exist.' }, { status: 400 });
    }
}

export async function PUT(request: Request) {
    const cookieStore = await cookies();
    const role = cookieStore.get('admin_role')?.value;
    
    if (role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    const { id, password } = body;

    if (!id || !password) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const db = await getDb();
    try {
        await db.run(
            'UPDATE users SET password = ? WHERE id = ?',
            password, id
        );
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ success: false, error: 'Could not update password.' }, { status: 500 });
    }
}
