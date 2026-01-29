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
        const result = await db.query('SELECT * FROM registrants ORDER BY registrationdate DESC');

        // Transform snake_case DB fields to camelCase for frontend
        const transformedRegistrants = result.rows.map(reg => ({
            id: reg.id,
            title: reg.title,
            firstName: reg.firstname,
            lastName: reg.lastname,
            email: reg.email,
            phone: reg.phone,
            organization: reg.organization,
            jobTitle: reg.jobtitle,
            country: reg.country,
            fieldVisit: reg.fieldvisit,
            fieldVisitLocation: reg.fieldvisitlocation,
            registrationDate: reg.registrationdate,
            emailSent: reg.emailsent,
            emailSentAt: reg.emailsentat
        }));

        return NextResponse.json(transformedRegistrants);
    } catch {
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
