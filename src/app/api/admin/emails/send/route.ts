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
                html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h1 style="color: #2F855A;">Registration Confirmed</h1>
                    <p>Dear ${reg.title ? reg.title + ' ' : ''}${reg.firstName} ${reg.lastName},</p>
                    <p>Thank you for registering for the <strong>1st Ghana Tree Crops Investment Summit (GTCIS 2026)</strong>.</p>
                    <p>We have received your registration details:</p>
                    <ul>
                        <li><strong>Organization:</strong> ${reg.organization ?? 'Not specified'}</li>
                        <li><strong>Country:</strong> ${reg.country ?? 'Not specified'}</li>
                    </ul>
                    <p>We look forward to seeing you there!</p>
                    <hr />
                    <p style="font-size: 12px; color: #666;">If you have any questions, please contact us.</p>
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
