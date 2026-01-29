import { NextResponse } from 'next/server';
import { getDb } from '../../../../../lib/db';
import { sendEmail } from '../../../../../lib/email';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const cookieStore = await cookies();
    const session = cookieStore.get('admin_session');

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { ids, sendToAllPending } = body;
        const db = getDb();

        interface Registrant {
            id: number;
            email: string | null;
            title?: string;
            firstName: string;
            lastName: string;
            organization: string;
            country: string;
            emailSent?: boolean;
        }

        let registrantsToSend: Registrant[] = [];

        if (sendToAllPending) {
            const result = await db.query('SELECT * FROM registrants WHERE emailSent = FALSE OR emailSent IS NULL');
            registrantsToSend = result.rows;
        } else if (ids && Array.isArray(ids) && ids.length > 0) {
            // Postgres ANY() is clean for arrays
            const result = await db.query('SELECT * FROM registrants WHERE id = ANY($1)', [ids]);
            registrantsToSend = result.rows;
        } else {
            return NextResponse.json({ error: 'No recipients specified' }, { status: 400 });
        }

        let successCount = 0;
        let failCount = 0;

        // Process sequentially to avoid overwhelming the SMTP server (though bulk services can handle parallel usually)
        // For better UX we could use Promise.all with chunks, but let's keep it simple and reliable first.
        for (const reg of registrantsToSend) {
            if (!reg.email) {
                failCount++;
                continue;
            }

            const emailSuccess = await sendEmail({
                to: reg.email,
                subject: 'Registration Confirmation - GTCIS 2026',
                text: `Registration Confirmed

Dear ${reg.title ? reg.title + ' ' : ''}${reg.firstName} ${reg.lastName},

Thank you for registering for the 1st Ghana Tree Crops Investment Summit (GTCIS 2026).

We have received your registration details:
- Organization: ${reg.organization ?? 'Not specified'}
- Country: ${reg.country ?? 'Not specified'}

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
                    <p style="font-size: 16px; line-height: 1.6;">Dear ${reg.title ? reg.title + ' ' : ''}${reg.firstName} ${reg.lastName},</p>
                    <p style="font-size: 16px; line-height: 1.6;">Thank you for registering for the <strong>1st Ghana Tree Crops Investment Summit (GTCIS 2026)</strong>.</p>
                    <p style="font-size: 16px; line-height: 1.6;">We have received your registration details:</p>
                    <ul style="font-size: 16px; line-height: 1.8;">
                        <li><strong>Organization:</strong> ${reg.organization ?? 'Not specified'}</li>
                        <li><strong>Country:</strong> ${reg.country ?? 'Not specified'}</li>
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

            if (emailSuccess) {
                await db.query(
                    'UPDATE registrants SET emailSent = TRUE, emailSentAt = CURRENT_TIMESTAMP WHERE id = $1',
                    [reg.id]
                );
                successCount++;
            } else {
                failCount++;
            }
        }

        return NextResponse.json({
            success: true,
            message: `Processed ${registrantsToSend.length} emails. Sent: ${successCount}, Failed: ${failCount}`,
            stats: { total: registrantsToSend.length, sent: successCount, failed: failCount }
        });

    } catch (error) {
        console.error('Bulk email error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
