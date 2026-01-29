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
        const db = getDb();
        const result = await db.query('SELECT * FROM registrants WHERE id = $1', [id]);
        const registrant = result.rows[0];

        if (!registrant) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        // Transform snake_case DB fields to camelCase for frontend
        const transformedRegistrant = {
            id: registrant.id,
            title: registrant.title,
            firstName: registrant.firstname,
            lastName: registrant.lastname,
            email: registrant.email,
            phone: registrant.phone,
            organization: registrant.organization,
            jobTitle: registrant.jobtitle,
            country: registrant.country,
            fieldVisit: registrant.fieldvisit,
            fieldVisitLocation: registrant.fieldvisitlocation,
            registrationDate: registrant.registrationdate,
            emailSent: registrant.emailsent,
            emailSentAt: registrant.emailsentat
        };

        return NextResponse.json(transformedRegistrant);
    } catch {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const db = getDb();
        await db.query('DELETE FROM registrants WHERE id = $1', [id]);
        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
