import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { query } = body; // This can be email or phone

        if (!query || query.trim().length === 0) {
            return NextResponse.json({ error: 'Please enter an email or phone number' }, { status: 400 });
        }

        const db = getDb();

        // Search by email or phone. Case insensitive for email.
        const sql = `
            SELECT firstName, lastName, email, phone, organization 
            FROM registrants 
            WHERE LOWER(email) = LOWER($1) OR phone = $1
        `;

        const result = await db.query(sql, [query.trim()]);
        const registrant = result.rows[0];

        if (registrant) {
            return NextResponse.json({
                found: true,
                registrant: {
                    firstName: registrant.firstName,
                    lastName: registrant.lastName,
                    organization: registrant.organization
                }
            });
        } else {
            return NextResponse.json({ found: false });
        }

    } catch (error) {
        console.error('Check Registration error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
