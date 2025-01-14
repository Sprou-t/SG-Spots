import nodemailer from 'nodemailer';

async function sendVerificationEmail(username, email, password) {
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
            to: email,
            subject: 'SGSPOTS Account D',
            text: `Hi ${username},

Your SGSpots account has been created successfully! Here are your account details:

Email: ${email}  
Password: ${password}

Please keep this information secure. You can use these credentials to log in to your account.

Best regards,  
The SGSpots Team`,
        });
        console.log('Verification email sent successfully');
    } catch (error) {
        console.error('Error sending verification email:', error.message);
        throw new Error('Failed to send verification email')
    }
}

export default sendVerificationEmail;
