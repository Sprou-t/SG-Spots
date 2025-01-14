import admin from '../firebase/firebase.config.js';
import TemporaryUser from '../models/models.tempUser.js';

/* after user clicks the link, it will send a request back to my server at the endpoint
 defined in the verification link: ie.  https://sg-spots.firebaseapp.com/__/auth/action
 ?mode=verifyEmail&oobCode=
 so in this case, we need to create a router that listens to this endpoint
 */

export const handleVerification = async (req, res) => {
    const { oobCode } = req.query;
    try {
        // Get user info from oobCode
        const userInfo = await admin.auth().verifyActionCode(oobCode);
        console.log("userInfo ==> ", userInfo);

        const userRecord = await admin.auth().getUserByEmail(userInfo.email);
        console.log("userRecord ==> ", userRecord);

        if (userRecord.emailVerified) {
            console.log('Email successfully verified!');

            // Query MongoDB with the user's email (since we now have it)
            const verifiedUser = await TemporaryUser.findOne({ email: userRecord.email });
            if (verifiedUser) {
                // Migrate user from TemporaryUser to permanent Users collection
                const newUser = new User({
                    email: verifiedUser.email,
                    username: verifiedUser.username,
                    firebaseUuid: verifiedUser.firebaseUuid,
                });
                await newUser.save();
                await TemporaryUser.deleteOne({ email: userRecord.email }); // Remove from TemporaryUser collection

                res.status(200).json({ success: true, message: 'Email successfully verified and user migrated!' });
            } else {
                res.status(404).json({ success: false, message: 'Temporary user not found!' });
            }
        } else {
            res.status(400).json({ success: false, message: 'Email verification failed!' });
        }
    } catch (error) {
        console.error('Error verifying email:', error.message);
        if (error.code === 'auth/invalid-action-code') {
            return res.status(400).json({ success: false, message: 'Invalid or expired verification link.' });
        }
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
};