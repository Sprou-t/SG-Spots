import nodemailer from 'nodemailer';

async function sendVerificationEmail(to, link) {
    // Log the environment variables to ensure they're loaded correctly
    console.log('Email Username:', process.env.EMAIL_USERNAME);
    console.log('Email Password:', process.env.EMAIL_PASSWORD);

    // Create the transporter inside the function
    const transporter = nodemailer.createTransport({
        service: "gmail",
        secure: true,
        auth: {
            user: process.env.EMAIL_USERNAME, // your email address
            pass: process.env.EMAIL_PASSWORD, // your email password or app password
        },
    });
    console.log("transporter ==> ", transporter);

    try {
        // Send the verification email
        await transporter.sendMail({
            from: process.env.EMAIL_USERNAME,
            to: to,
            subject: 'Email Verification',
            text: `Click the link below to verify your email: ${link}`,
        });
        console.log('Verification email sent successfully');
    } catch (error) {
        console.error('Error sending verification email:', error.message);
        throw new Error('Failed to send verification email')
    }
}

export default sendVerificationEmail;
