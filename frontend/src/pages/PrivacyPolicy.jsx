import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Privacy Policy</h2>
                <p className="text-gray-700 mb-4">Last updated: December 19, 2024</p>

                <div className=" text-gray-700 space-y-6">
                    <h3 className="font-semibold">1. Information We Collect</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>Personal Information:</strong> We may collect personal information from you, such as your email address, only if you voluntarily provide it to us. This information is collected solely for verifying your student status. Providing your email address is optional, and you can still use our website anonymously without providing this information.
                        </li>
                        <li>
                            <strong>User-Generated Content:</strong> When you submit reviews or upload photos of dorms, you are providing us with user-generated content. By uploading photos, you grant us permission to use these photos on our website for the purpose of displaying dorm information and reviews.
                        </li>
                        <li>
                            <strong>Automatically Collected Information:</strong> We may automatically collect certain information when you visit our website, including your browser type, operating system, IP address, and browsing behavior. This information is used for analytics purposes to improve our website, performance, and user experience.
                        </li>
                        <li>
                            <strong>Cookies and Tracking:</strong> We use cookies and similar tracking technologies to enhance your experience on our site. These cookies allow us to remember your preferences, understand how you interact with our services, and help improve functionality. You may adjust your browser settings to refuse cookies, but this may limit certain functionalities.
                        </li>
                    </ul>

                    <h3 className="font-semibold">2. Use of Information</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>
                            <strong>To Provide and Improve Our Services:</strong> We use the information we collect to provide and personalize our services, including displaying dorm reviews and photos, and improving the functionality and user experience of our website.
                        </li>
                        <li>
                            <strong>Communication:</strong> If you provide your email address, we may use it to communicate with you about your account, inquiries, or updates about our services. You may opt-out of these communications at any time.
                        </li>
                    </ul>

                    <h3 className="font-semibold">3. Data Security</h3>
                    <p>We take appropriate measures to protect the security of your personal data and prevent unauthorized access, alteration, or disclosure. However, please be aware that no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee its absolute security.</p>

                    <h3 className="font-semibold">4. Sharing Your Information</h3>
                    <p>We do not sell, trade, or otherwise transfer your personal information to outside parties, except as required by law or for the purposes of operating our website, such as hosting services or analytics providers. Any third parties who assist us are required to keep your information confidential.</p>

                    <h3 className="font-semibold">5. Legal Compliance</h3>
                    <p>We comply with applicable privacy laws, including the General Data Protection Regulation (GDPR) for European users and the California Consumer Privacy Act (CCPA) for residents of California. If you are a resident of these regions, you may have specific rights regarding your personal data. Please contact us if you would like to exercise these rights.</p>

                    <h3 className="font-semibold">6. Changes to this Privacy Policy</h3>
                    <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technology, or legal requirements. If we make significant changes, we will notify you by posting the updated policy on this page and updating the date of the last revision. We encourage you to review this page periodically for the latest information on our privacy practices.</p>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
