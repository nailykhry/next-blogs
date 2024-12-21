import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="min-h-screen py-10 bg-gray-50">
        <div className="max-w-4xl px-6 py-10 mx-auto bg-white rounded-lg shadow-lg">
          <h1 className="text-4xl font-extrabold text-center text-gray-900">
            Privacy Policy
          </h1>
          <p className="mt-2 text-center text-gray-600">
            Effective Date: <strong>14 Desember 2024</strong>
          </p>

          <div className="mt-8 space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-gray-800">
                1. Information We Collect
              </h2>
              <p className="mt-4 leading-relaxed text-gray-600">
                At InkSpire, we value your privacy. This Privacy Policy explains
                how we collect, use, and protect your information. By using our
                platform, you consent to the practices outlined below.
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>
                  ✅ Personal Information: Name, email, phone number, and other
                  details you provide.
                </li>
                <li>
                  ✅ Usage Data: Automatically collected data such as IP
                  address, browser type, and device information.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800">
                2. How We Use Your Information
              </h2>
              <p className="mt-4 leading-relaxed text-gray-600">
                InkSpire uses your information to improve our services and
                provide a better experience:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>
                  💡 To personalize your experience and improve the platform.
                </li>
                <li>
                  💡 To communicate updates, newsletters, or promotional
                  content.
                </li>
                <li>
                  💡 To ensure compliance with legal and regulatory
                  requirements.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800">
                3. Sharing Your Information
              </h2>
              <p className="mt-4 leading-relaxed text-gray-600">
                InkSpire does not sell your personal information. However, we
                may share data:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>
                  🔒 With trusted service providers who assist in delivering our
                  services.
                </li>
                <li>
                  🔒 To comply with legal obligations or protect our legal
                  rights.
                </li>
                <li>
                  🔒 In connection with a merger, sale, or acquisition of our
                  business.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800">
                4. Your Rights
              </h2>
              <p className="mt-4 leading-relaxed text-gray-600">
                As a user, you have rights regarding your data, including:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>📋 Accessing or requesting a copy of your data.</li>
                <li>
                  📋 Correcting inaccuracies in your personal information.
                </li>
                <li>📋 Requesting deletion of your personal data.</li>
              </ul>
              <p className="mt-4 text-gray-600">
                To exercise your rights, contact us at{' '}
                <a
                  href="mailto:support@inkspire.com"
                  className="text-indigo-500 underline"
                >
                  support@inkspire.com
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800">
                5. Updates to This Privacy Policy
              </h2>
              <p className="mt-4 leading-relaxed text-gray-600">
                This Privacy Policy may be updated periodically. Changes will be
                posted on this page with an updated effective date. We encourage
                you to review this page regularly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-800">
                6. Contact Us
              </h2>
              <p className="mt-4 leading-relaxed text-gray-600">
                If you have any questions about this Privacy Policy, please
                contact us at:
              </p>
              <ul className="mt-4 space-y-2 text-gray-600">
                <li>
                  📧 Email:{' '}
                  <a
                    href="mailto:support@inkspire.com"
                    className="text-indigo-500 underline"
                  >
                    support@inkspire.com
                  </a>
                </li>
                <li>🏢 Address: Surabaya, East Java</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
