import { NextResponse } from 'next/server';
import { getDb } from '../../../../lib/db';
import { hashPassword } from '../../../../lib/auth';

export async function POST(request: Request) {
    const body = await request.json();
    const { username, password } = body;

    const db = getDb();
    const hashedPassword = hashPassword(password);

    // Check for hashed password
    const result = await db.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, hashedPassword]);
    const user = result.rows[0];

    if (user) {
        const response = NextResponse.json({ success: true, role: user.role, username: user.username });
        const oneDay = 60 * 60 * 24;

        response.cookies.set('admin_session', user.username, {
            httpOnly: true,
            path: '/',
            maxAge: oneDay,
        });

        // This cookie allows client to easily check role for UI
        response.cookies.set('admin_role', user.role, {
            httpOnly: false,
            path: '/',
            maxAge: oneDay,
        });

        return response;
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
