import sgMail from '@sendgrid/mail';
import { config } from 'dotenv';

config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (toEmail, firstName, verificationToken) => {
    const verificationUrl = `http://localhost:8000/verify-email?token=${verificationToken}&email=${toEmail}`;
    const msg = {
        to: toEmail,
        from: {
            name: 'Todo Creation',
            email: process.env.FROM_EMAIL
        },
        subject: 'Verify Your Email Address',
        text: `Hello ${firstName}, please verify your email address by clicking on this link: ${verificationUrl}`,
        html: `<strong>Hello ${firstName}, please verify your email address by clicking on this link:</strong> <a href="${verificationUrl}">Verify Email</a>`,
    };

    try {
        await sgMail.send(msg);
        console.log('Verification email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        if (error.response) {
            console.error(error.response.body);
        }
    }
};

export default sendEmail;
