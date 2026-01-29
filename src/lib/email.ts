import nodemailer from 'nodemailer';

interface SendEmailParams {
    to: string;
    subject: string;
    html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams): Promise<boolean> {
    const transporter = nodemailer.createTransport({
        host: process.env.BREVO_SMTP_HOST,
        port: parseInt(process.env.BREVO_SMTP_PORT || '587'),
        secure: false, // true for 465
        auth: {
            user: process.env.BREVO_USER,
            pass: process.env.BREVO_PASSWORD,
        },
    });

    const mailOptions = {
        from: `"${process.env.BREVO_FROM_NAME || 'GTCIS 2026 Team'}" <${process.env.BREVO_FROM_EMAIL || 'no-reply@gtcif.com'}>`, // Sender address
        replyTo: process.env.BREVO_REPLY_TO || 'info@gtcif.com',
        to,
        subject,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}
