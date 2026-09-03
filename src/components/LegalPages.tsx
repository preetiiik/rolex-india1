import Navbar from "./Navbar";
import Footer from "./Footer";

const sectionClass = "mb-8";
const headingClass = "text-xl sm:text-2xl font-bold text-gray-900 mb-3";
const bodyClass = "text-gray-600 leading-7";
const listClass = "list-disc pl-6 space-y-2 text-gray-600 leading-7";

export function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative bg-[#14282E] text-white px-5 sm:px-8 lg:px-12 pt-32 sm:pt-36 pb-16 sm:pb-20">
        <Navbar />
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#4FA8B8] mb-3">Rolex India</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-white/60">
            Last updated: September 2, 2026
          </p>
        </div>
      </section>

      <article className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12 py-14">
        <p className={`${bodyClass} ${sectionClass}`}>
          Rolex India ("we", "us", or "our") respects your privacy and is
          committed to protecting the information you provide when you visit
          or use this website. This Privacy Policy explains what information
          we may collect, how we use it, and the choices available to you.
        </p>

        <section className={sectionClass}>
          <h2 className={headingClass}>1. Information We Collect</h2>
          <p className={bodyClass}>
            We may collect information that you voluntarily provide through
            forms, enquiries, or other interactions with the website. This may
            include your name, company name, email address, phone number,
            location, and the details of your enquiry.
          </p>
          <p className={`${bodyClass} mt-3`}>
            We may also collect limited technical information, such as browser
            type, device information, IP address, pages visited, and general
            website usage information, where enabled by our hosting,
            analytics, security, or similar services.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>2. How We Use Information</h2>
          <p className={bodyClass}>Information may be used to:</p>
          <ul className={`${listClass} mt-3`}>
            <li>Respond to enquiries and requests for information.</li>
            <li>Provide information about our products and services.</li>
            <li>Communicate with you regarding your enquiry or business relationship.</li>
            <li>Operate, maintain, secure, and improve the website.</li>
            <li>Understand website usage and improve user experience.</li>
            <li>Comply with applicable legal and regulatory requirements.</li>
          </ul>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>3. Cookies and Similar Technologies</h2>
          <p className={bodyClass}>
            The website may use cookies or similar technologies for essential
            functionality, security, preferences, analytics, or other website
            operations. You can manage certain cookie settings through your
            browser. Disabling cookies may affect some website functionality.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>4. Sharing of Information</h2>
          <p className={bodyClass}>
            We do not intend to sell your personal information. Information may
            be shared with trusted service providers who assist us with website
            hosting, communications, analytics, security, or other business
            operations, where reasonably necessary. We may also disclose
            information where required by law, legal process, or a lawful
            government request.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>5. Data Security</h2>
          <p className={bodyClass}>
            We take reasonable technical and organisational measures designed
            to protect information against unauthorised access, alteration,
            disclosure, or destruction. However, no internet transmission or
            electronic storage system can be guaranteed to be completely
            secure.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>6. Data Retention</h2>
          <p className={bodyClass}>
            We retain information only for as long as reasonably necessary for
            the purposes described in this policy, including responding to
            enquiries, maintaining business records, resolving disputes,
            meeting contractual obligations, and complying with applicable
            law.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>7. Your Rights</h2>
          <p className={bodyClass}>
            Subject to applicable law, you may have rights regarding access,
            correction, updating, or deletion of your personal information,
            and may have other rights relating to the processing of your
            information. Requests can be made using the contact details below.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>8. Third-Party Websites</h2>
          <p className={bodyClass}>
            This website may contain links to third-party websites or services.
            We are not responsible for the privacy practices, content, or
            security of those third parties. We encourage you to review their
            respective privacy policies.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>9. Changes to This Policy</h2>
          <p className={bodyClass}>
            We may update this Privacy Policy from time to time. Any revised
            version will be posted on this page with an updated "Last updated"
            date.
          </p>
        </section>

        <section>
          <h2 className={headingClass}>10. Contact Us</h2>
          <p className={bodyClass}>
            If you have questions about this Privacy Policy or your personal
            information, please contact us through the contact details
            provided on this website.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Replace the contact wording above with your company's official
            privacy/contact email and registered business address before
            publishing.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <a href="/" className="text-[#4FA8B8] hover:underline">
            ← Back to Home
            </a>
        </div>
      </article>

      <Footer />
    </main>
  );
}

export function TermsOfService() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative bg-[#14282E] text-white px-5 sm:px-8 lg:px-12 pt-32 sm:pt-36 pb-16 sm:pb-20">
        <Navbar />
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#4FA8B8] mb-3">Rolex India</p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-4 text-white/60">
            Last updated: September 2, 2026
          </p>
        </div>
      </section>

      <article className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12 py-14">
        <p className={`${bodyClass} ${sectionClass}`}>
          These Terms of Service ("Terms") govern your access to and use of
          the Rolex India website. By accessing or using this website, you
          agree to these Terms. If you do not agree with them, please do not
          use the website.
        </p>

        <section className={sectionClass}>
          <h2 className={headingClass}>1. About the Website</h2>
          <p className={bodyClass}>
            This website provides information about Rolex India's steel
            products, equipment, capabilities, services, and business
            activities. Website content is provided for general information
            and business enquiry purposes.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>2. Use of the Website</h2>
          <p className={bodyClass}>You agree that you will not:</p>
          <ul className={`${listClass} mt-3`}>
            <li>Use the website for any unlawful or unauthorised purpose.</li>
            <li>Attempt to gain unauthorised access to the website or its systems.</li>
            <li>Interfere with the security, operation, or availability of the website.</li>
            <li>Copy, reproduce, modify, distribute, or commercially exploit website content without permission.</li>
            <li>Submit information that is false, misleading, unlawful, or infringes another person's rights.</li>
          </ul>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>3. Product and Service Information</h2>
          <p className={bodyClass}>
            Product descriptions, specifications, photographs, dimensions,
            availability, capabilities, and other information displayed on
            the website may be subject to change. Website information should
            not be treated as a final quotation, technical specification,
            warranty, or contractual offer unless expressly stated otherwise.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>4. Enquiries and Communications</h2>
          <p className={bodyClass}>
            Submitting an enquiry through the website does not automatically
            create a contract, purchase order, agency relationship, or other
            binding business arrangement. Any commercial transaction will be
            governed by the applicable quotation, purchase order, agreement,
            invoice, or other written terms accepted by the relevant parties.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>5. Intellectual Property</h2>
          <p className={bodyClass}>
            Unless otherwise indicated, the website and its content, including
            text, graphics, logos, photographs, design elements, and software,
            are owned by or licensed to Rolex India and are protected by
            applicable intellectual property laws. No ownership rights are
            transferred to you by your use of the website.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>6. Third-Party Links</h2>
          <p className={bodyClass}>
            Links to third-party websites may be provided for convenience. We
            do not control or endorse all third-party content and are not
            responsible for their availability, accuracy, security, or terms.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>7. Disclaimer</h2>
          <p className={bodyClass}>
            The website is provided on an "as available" basis. To the maximum
            extent permitted by applicable law, we make no representation or
            warranty that the website will always be uninterrupted, error-free,
            secure, or completely accurate or current.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>8. Limitation of Liability</h2>
          <p className={bodyClass}>
            To the maximum extent permitted by applicable law, Rolex India
            will not be liable for indirect, incidental, special,
            consequential, or loss-of-profit damages arising from or relating
            to your use of, or inability to use, the website. Nothing in these
            Terms excludes liability that cannot lawfully be excluded.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>9. Changes to These Terms</h2>
          <p className={bodyClass}>
            We may modify these Terms from time to time. Updated Terms will be
            posted on this page with a revised "Last updated" date. Your
            continued use of the website after changes are posted constitutes
            acceptance of the revised Terms, to the extent permitted by law.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>10. Governing Law</h2>
          <p className={bodyClass}>
            These Terms shall be governed by the laws applicable in India,
            subject to the jurisdiction and dispute-resolution provisions
            contained in any applicable written commercial agreement between
            the parties.
          </p>
        </section>

        <section>
          <h2 className={headingClass}>11. Contact</h2>
          <p className={bodyClass}>
            For questions regarding these Terms, please contact Rolex India
            using the official contact details provided on this website.
          </p>
          <p className="mt-4 text-sm text-gray-500">
            Before publishing, replace this with your company's official
            legal name, registered address, and contact email.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <a href="/" className="text-[#4FA8B8] hover:underline">
        ← Back to Home
        </a>
        </div>
      </article>

      <Footer />
    </main>
  );
}