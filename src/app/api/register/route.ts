import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';
import { sendEmail } from '../../../lib/email';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const {
            title,
            firstName,
            lastName,
            email,
            phone,
            organization,
            jobTitle,
            country,
            fieldVisit,
            fieldVisitLocation
        } = body;

        // Basic validation - Removed email from required fields
        if (!firstName || !lastName || !phone || !organization || !country) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const db = getDb();

        // Handle empty email as null for unique constraint
        const emailValue = email && email.trim() !== '' ? email : null;

        // Insert into database
        try {
            await db.query(
                `INSERT INTO registrants (
                    title, firstName, lastName, email, phone, organization, jobTitle, country, fieldVisit, fieldVisitLocation
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
                [title, firstName, lastName, emailValue, phone, organization, jobTitle, country, fieldVisit ? 1 : 0, fieldVisitLocation]
            );
        } catch (dbError: unknown) {
            const error = dbError as { code?: string };
            if (error.code === '23505' && emailValue) { // Postgres unique violation code
                return NextResponse.json({ error: 'This email is already registered.' }, { status: 400 });
            }
            throw dbError;
        }

        // Send confirmation email via Brevo only if email is provided
        if (emailValue) {
            await sendEmail({
                to: email,
                subject: 'Registration Confirmation - GTCIS 2026',
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #2F855A;">Registration Confirmed</h1>
                    <p>Dear ${title ? title + ' ' : ''}${firstName} ${lastName},</p>
                    <p>Thank you for registering for the <strong>1st Ghana Tree Crops Investment Summit (GTCIS 2026)</strong>.</p>
                    <p>We have received your registration details:</p>
                    <ul>
                        <li><strong>Organization:</strong> ${organization}</li>
                        <li><strong>Country:</strong> ${country}</li>
                    </ul>
                    <p>We look forward to seeing you there!</p>
                    <hr />
                    <p style="font-size: 12px; color: #666;">If you have any questions, please contact us.</p>
                </div>
            `,
            });
        }

        return NextResponse.json({ message: 'Registration successful!' }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
