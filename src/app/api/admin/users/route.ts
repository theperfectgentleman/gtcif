import { NextResponse } from 'next/server';
import { getDb } from '../../../../lib/db';
import { cookies } from 'next/headers';
import { hashPassword } from '../../../../lib/auth';

export async function GET() {
    const cookieStore = await cookies();
    const role = cookieStore.get('admin_role')?.value;

    if (role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const db = getDb();
    const result = await db.query('SELECT id, username, role, createdAt FROM users');
    return NextResponse.json(result.rows);
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

    const db = getDb();
    const hashedPassword = hashPassword(password);

    try {
        console.log(`Attempting to create user: ${username} with role: ${newRole}`);
        await db.query(
            'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)',
            [username, hashedPassword, newRole]
        );
        console.log(`User ${username} created successfully`);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error creating user:', error);
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

    const db = getDb();
    const hashedPassword = hashPassword(password);

    try {
        await db.query('UPDATE users SET password = $1 WHERE id = $2', [hashedPassword, id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating password:', error);
        return NextResponse.json({ success: false, error: 'Could not update password.' }, { status: 500 });
    }
}

export async function PATCH(request: Request) {
    const cookieStore = await cookies();
    const role = cookieStore.get('admin_role')?.value;

    if (role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    const { id, role: newRole } = body;

    if (!id || !newRole) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const db = getDb();
    try {
        await db.query('UPDATE users SET role = $1 WHERE id = $2', [newRole, id]);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error updating role:', error);
        return NextResponse.json({ success: false, error: 'Could not update user role.' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    const cookieStore = await cookies();
    const role = cookieStore.get('admin_role')?.value;

    if (role !== 'admin') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
    }

    const db = getDb();
    try {
        await db.query('DELETE FROM users WHERE id = $1', [id]);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
