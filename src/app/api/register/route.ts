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
                [title, firstName, lastName, emailValue, phone, organization, jobTitle, country, !!fieldVisit, fieldVisitLocation]
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
                text: `Registration Confirmed

Dear ${title ? title + ' ' : ''}${firstName} ${lastName},

Thank you for registering for the 1st Ghana Tree Crops Investment Summit (GTCIS 2026).

We have received your registration details:
- Organization: ${organization ?? 'Not specified'}
- Country: ${country ?? 'Not specified'}

Event Details:
Date: February 17-20, 2026

We look forward to seeing you there!

NOTE: This email may have landed in your spam or junk folder. Please check there if you don't see it in your inbox, and mark it as "Not Spam" to receive future updates.

If you have any questions, please contact us at ${process.env.BREVO_REPLY_TO || 'info@gtcif.com'}.

Best regards,
GTCIS 2026 Team`,
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #2F855A; margin-bottom: 20px;">Registration Confirmed</h1>
                    <p style="font-size: 16px; line-height: 1.6;">Dear ${title ? title + ' ' : ''}${firstName} ${lastName},</p>
                    <p style="font-size: 16px; line-height: 1.6;">Thank you for registering for the <strong>1st Ghana Tree Crops Investment Summit (GTCIS 2026)</strong>.</p>
                    <p style="font-size: 16px; line-height: 1.6;">We have received your registration details:</p>
                    <ul style="font-size: 16px; line-height: 1.8;">
                        <li><strong>Organization:</strong> ${organization ?? 'Not specified'}</li>
                        <li><strong>Country:</strong> ${country ?? 'Not specified'}</li>
                    </ul>
                    <div style="background-color: #f7fafc; border-left: 4px solid #2F855A; padding: 15px; margin: 20px 0;">
                        <p style="margin: 0; font-size: 14px; color: #2d3748;"><strong>📅 Event Date:</strong> February 17-20, 2026</p>
                    </div>
                    <p style="font-size: 16px; line-height: 1.6;">We look forward to seeing you there!</p>
                    
                    <div style="background-color: #fff3cd; border: 1px solid #ffc107; border-radius: 4px; padding: 12px; margin: 20px 0;">
                        <p style="margin: 0; font-size: 13px; color: #856404;">
                            <strong>📧 Important:</strong> This email may have landed in your spam or junk folder. Please check there if you don't see it in your inbox, and mark it as "Not Spam" to receive future updates about the summit.
                        </p>
                    </div>
                    
                    <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
                    <p style="font-size: 12px; color: #666; line-height: 1.4;">
                        If you have any questions, please contact us at <a href="mailto:${process.env.BREVO_REPLY_TO || 'info@gtcif.com'}" style="color: #2F855A;">${process.env.BREVO_REPLY_TO || 'info@gtcif.com'}</a>.
                    </p>
                    <p style="font-size: 12px; color: #999;">
                        &copy; 2026 Ghana Tree Crops Investment Summit. All rights reserved.
                    </p>
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
