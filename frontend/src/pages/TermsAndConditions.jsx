import React from 'react';

const TermsAndConditions = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Terms and Conditions</h2>
                <p className=" text-gray-700 mb-4">Last updated: December 18, 2024</p>

                <div className=" text-gray-700 space-y-4">
                    <h3 className="font-semibold">1. Description of Service</h3>
                    <p>SG SPOTS is a platform where users can discover, rate, and review various spots and locations in Singapore. Users can submit reviews, photos, and other content to help others find great places to visit. Content can be uploaded anonymously or by signing in through an account for enhanced features and verification.</p>

                    <h3 className="font-semibold">2. User-Generated Content</h3>
                    <p>Users are solely responsible for the content they upload to SG SPOTS. All content must comply with our guidelines. Reviews and media uploaded anonymously will be reviewed before publication, while verified users' content will go live immediately. SG SPOTS reserves the right to remove or modify any user-generated content at our discretion.</p>

                    <h3 className="font-semibold">3. Privacy</h3>
                    <p>SG SPOTS respects user privacy. We collect minimal personal information, such as your email address or other information if voluntarily provided. By using the Service, you agree to our Privacy Policy. Third-party services like Google Ads may collect data based on their own policies.</p>

                    <h3 className="font-semibold">4. Content Guidelines</h3>
                    <p>All content uploaded to SG SPOTS must be safe for work (SFW) and must not infringe on the intellectual property rights of others. Users may not upload copyrighted material without permission. Content that is discriminatory, offensive, or violates any law is prohibited.</p>

                    <h3 className="font-semibold">5. Dispute Resolution</h3>
                    <p>In the event of disputes or complaints regarding content on SG SPOTS, the administrators will review the situation and take appropriate action. We encourage users to report inappropriate content. A fair and neutral process will be followed to address any issues.</p>

                    <h3 className="font-semibold">6. Limitation of Liability</h3>
                    <p>SG SPOTS is provided "as is" and without warranties of any kind. We do not guarantee the accuracy, completeness, or availability of the Service. Under no circumstances shall SG SPOTS or its affiliates be liable for any damages arising from the use or inability to use the Service, including but not limited to damages for lost data, business interruption, or other losses.</p>

                    <h3 className="font-semibold">7. Termination of Accounts</h3>
                    <p>SG SPOTS reserves the right to suspend or terminate user accounts that violate these Terms, without prior notice. Termination may result from content violations, fraudulent activity, abuse of the Service, or any other misuse of the platform.</p>

                    <h3 className="font-semibold">8. Intellectual Property</h3>
                    <p>Users retain rights to the content they upload. By uploading content, you grant SG SPOTS a non-exclusive, worldwide, royalty-free license to display, distribute, and modify the content within the scope of the Service. SG SPOTS retains the right to remove or modify any content that violates these Terms.</p>

                    <h3 className="font-semibold">9. Modifications to Terms</h3>
                    <p>SG SPOTS reserves the right to update these Terms at any time. It is the user's responsibility to regularly review these Terms. Continued use of the Service after changes are made constitutes acceptance of the modified Terms. If any significant changes occur, we will notify users via a prominent notice on the platform.</p>

                    <h3 className="font-semibold">10. Governing Law</h3>
                    <p>These Terms shall be governed by and construed in accordance with the laws of Singapore, without regard to its conflict of law principles. Any disputes arising from these Terms shall be handled in the competent courts of Singapore.</p>
                </div>
            </div>
        </div>
    );
};

export default TermsAndConditions;
