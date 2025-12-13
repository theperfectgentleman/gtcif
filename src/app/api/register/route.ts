import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const body = await request.json();
    const { name, email, phone, organization } = body;

    const validationErrors: string[] = [];
    if (!name || typeof name !== 'string') validationErrors.push('Name is required');
    if (!email || typeof email !== 'string') validationErrors.push('Email is required');
    if (!phone || typeof phone !== 'string') validationErrors.push('Phone is required');
    if (!organization || typeof organization !== 'string') validationErrors.push('Organization is required');

    if (validationErrors.length > 0) {
        return NextResponse.json({ errors: validationErrors }, { status: 400 });
    }

    try {
        // MVP: no DB configured yet. This endpoint validates and acknowledges.
        return NextResponse.json({ message: 'Registration successful!' }, { status: 201 });
    } catch (error) {
        console.error('Database error:', error);
        return NextResponse.json({ error: 'Registration failed. Please try again later.' }, { status: 500 });
    }
}