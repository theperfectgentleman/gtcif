import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { username, password } = body;

    if (username === 'admin' && password === 'pass') {
        const response = NextResponse.json({ success: true });
        response.cookies.set('admin_session', 'true', {
            httpOnly: true,
            path: '/',
            maxAge: 60 * 60 * 24, // 1 day
        });
        return response;
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
}
