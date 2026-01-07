import { NextResponse } from 'next/server';
import { getDb } from '../../../lib/db';
import nodemailer from 'nodemailer';

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

        const db = await getDb();
        
        // Handle empty email as null for unique constraint
        const emailValue = email && email.trim() !== '' ? email : null;

        // Insert into database
        try {
            await db.run(
                `INSERT INTO registrants (
                    title, firstName, lastName, email, phone, organization, jobTitle, country, fieldVisit, fieldVisitLocation
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [title, firstName, lastName, emailValue, phone, organization, jobTitle, country, fieldVisit ? 1 : 0, fieldVisitLocation]
            );
        } catch (dbError: unknown) {
            const message = dbError instanceof Error ? dbError.message : '';
            if (message && message.includes('UNIQUE constraint failed') && emailValue) {
                return NextResponse.json({ error: 'This email is already registered.' }, { status: 400 });
            }
            throw dbError;
        }

        // Send confirmation email via Brevo only if email is provided
        if (emailValue) {
            // NOTE: You should store these credentials in environment variables (.env.local)
        // BREVO_SMTP_HOST=smtp-relay.brevo.com
        // BREVO_SMTP_PORT=587
        // BREVO_USER=your-brevo-email@example.com
        // BREVO_PASSWORD=your-brevo-smtp-key
        
        const transporter = nodemailer.createTransport({
            host: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
            port: parseInt(process.env.BREVO_SMTP_PORT || '587'),
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.BREVO_USER || 'YOUR_BREVO_EMAIL', // TODO: Replace with your Brevo login email
                pass: process.env.BREVO_PASSWORD || 'YOUR_BREVO_SMTP_KEY', // TODO: Replace with your Brevo SMTP key
            },
        });

        const mailOptions = {
            from: '"GTCIS 2026" <no-reply@gtcif.com>', // Sender address
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
        };

        // We don't await the email sending to speed up the response, or we can await it to ensure delivery.
        // For critical confirmations, awaiting is better to report errors.
        try {
            await transporter.sendMail(mailOptions);
        } catch (emailError) {
            console.error('Error sending email:', emailError);
            // We still return success for the registration, but log the email error
        }
        }

        return NextResponse.json({ message: 'Registration successful!' }, { status: 201 });

    } catch (error) {
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
