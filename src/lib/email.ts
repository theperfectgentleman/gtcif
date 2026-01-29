import nodemailer from 'nodemailer';

interface SendEmailParams {
    to: string;
    subject: string;
    html: string;
    text?: string; // Optional plain text version
}

export async function sendEmail({ to, subject, html, text }: SendEmailParams): Promise<boolean> {
    const transporter = nodemailer.createTransport({
        host: process.env.BREVO_SMTP_HOST,
        port: parseInt(process.env.BREVO_SMTP_PORT || '587'),
        secure: false, // true for 465
        auth: {
            user: process.env.BREVO_USER,
            pass: process.env.BREVO_PASSWORD,
        },
    });

    // Generate a plain text version if not provided
    const plainText = text || html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

    const mailOptions = {
        from: `"${process.env.BREVO_FROM_NAME || 'GTCIS 2026 Team'}" <${process.env.BREVO_FROM_EMAIL || 'no-reply@gtcif.com'}>`,
        replyTo: process.env.BREVO_REPLY_TO || 'info@gtcif.com',
        to,
        subject,
        text: plainText, // Plain text version
        html,
        headers: {
            'X-Priority': '3', // Normal priority (not urgent spam)
            'X-Mailer': 'GTCIS Registration System',
            'List-Unsubscribe': `<mailto:${process.env.BREVO_REPLY_TO || 'info@gtcif.com'}?subject=Unsubscribe>`,
            'Message-ID': `<${Date.now()}.${Math.random().toString(36).substring(7)}@gtcif.com>`,
        },
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}
