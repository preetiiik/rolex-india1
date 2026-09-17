import Navbar from "./Navbar";
import Footer from "./Footer";

const sectionClass = "mb-8";
const headingClass = "text-xl sm:text-2xl font-bold text-gray-900 mb-3";
const bodyClass = "text-gray-600 leading-7";
const listClass = "list-disc pl-6 space-y-2 text-gray-600 leading-7";

/* =====================================================
   PRIVACY POLICY
===================================================== */

export function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative bg-[#14282E] text-white px-5 sm:px-8 lg:px-12 pt-32 sm:pt-36 pb-16 sm:pb-20">
        <Navbar />
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#4FA8B8] mb-3">
            Rolex India
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-white/60">
            Last Updated: September 2, 2026
          </p>
        </div>
      </section>

      <article className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12 py-14">
        <p className={bodyClass}>
          [Official Legal Company Name] (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or
          &ldquo;our&rdquo;) respects your privacy and is committed to
          protecting the personal information you provide when you visit or use
          this website.
        </p>
        <p className={`${bodyClass} mt-3 ${sectionClass}`}>
          This Privacy Policy explains what information we may collect, how we
          use it, how we may share it, and the choices available to you.
        </p>

        <section className={sectionClass}>
          <h2 className={headingClass}>1. Information We Collect</h2>
          <p className={bodyClass}>
            We may collect information that you voluntarily provide through
            forms, enquiries, or other interactions with the website. This may
            include:
          </p>
          <ul className={`${listClass} mt-3`}>
            <li>Name</li>
            <li>Company name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Location</li>
            <li>Details of your enquiry</li>
            <li>Other information that you choose to provide</li>
          </ul>
          <p className={`${bodyClass} mt-3`}>
            We may also collect limited technical information, such as browser
            type, device information, IP address, pages visited, and general
            website usage information, where enabled by our hosting, analytics,
            security, or similar services.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>2. How We Use Your Information</h2>
          <p className={bodyClass}>
            We may use the information we collect to:
          </p>
          <ul className={`${listClass} mt-3`}>
            <li>Respond to enquiries and requests for information.</li>
            <li>Provide information about our products and services.</li>
            <li>
              Communicate with you regarding your enquiry or business
              relationship.
            </li>
            <li>Operate, maintain, secure, and improve the website.</li>
            <li>Understand website usage and improve user experience.</li>
            <li>Comply with applicable legal and regulatory requirements.</li>
          </ul>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>3. Cookies and Similar Technologies</h2>
          <p className={bodyClass}>
            The website may use cookies and similar technologies for essential
            functionality, security, preferences, analytics, and other website
            operations.
          </p>
          <p className={`${bodyClass} mt-3`}>
            You can manage or disable certain cookies through your browser
            settings. Disabling cookies may affect some website functionality.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>4. Sharing of Information</h2>
          <p className={bodyClass}>
            We do not intend to sell your personal information.
          </p>
          <p className={`${bodyClass} mt-3`}>
            We may share information with trusted service providers who assist
            us with website hosting, communications, analytics, security, or
            other business operations where reasonably necessary.
          </p>
          <p className={`${bodyClass} mt-3`}>
            We may also disclose information where required by applicable law,
            legal process, or a lawful government request.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>5. Data Security</h2>
          <p className={bodyClass}>
            We take reasonable technical and organisational measures designed to
            protect personal information against unauthorised access,
            alteration, disclosure, or destruction.
          </p>
          <p className={`${bodyClass} mt-3`}>
            However, no internet transmission or electronic storage system can
            be guaranteed to be completely secure.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>6. Data Retention</h2>
          <p className={bodyClass}>
            We retain personal information only for as long as reasonably
            necessary for the purposes described in this Privacy Policy,
            including:
          </p>
          <ul className={`${listClass} mt-3`}>
            <li>Responding to enquiries.</li>
            <li>Maintaining business records.</li>
            <li>Resolving disputes.</li>
            <li>Meeting contractual obligations.</li>
            <li>Complying with applicable laws and regulations.</li>
          </ul>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>7. Your Rights</h2>
          <p className={bodyClass}>
            Subject to applicable law, you may have rights regarding your
            personal information, including the right to:
          </p>
          <ul className={`${listClass} mt-3`}>
            <li>Access your personal information.</li>
            <li>Request correction or updating of inaccurate information.</li>
            <li>
              Request deletion of your personal information where applicable.
            </li>
            <li>
              Exercise other rights available under applicable privacy and
              data-protection laws.
            </li>
          </ul>
          <p className={`${bodyClass} mt-3`}>
            You may make a request using the contact details provided below.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>8. Third-Party Websites</h2>
          <p className={bodyClass}>
            This website may contain links to third-party websites or services.
          </p>
          <p className={`${bodyClass} mt-3`}>
            We are not responsible for the privacy practices, content, or
            security of third-party websites. We encourage you to review the
            privacy policies of those websites before providing them with
            personal information.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>9. Changes to This Privacy Policy</h2>
          <p className={bodyClass}>
            We may update this Privacy Policy from time to time.
          </p>
          <p className={`${bodyClass} mt-3`}>
            Any revised version will be posted on this page with an updated
            &ldquo;Last Updated&rdquo; date.
          </p>
        </section>

        <section>
          <h2 className={headingClass}>10. Contact Us</h2>
          <p className={bodyClass}>
            If you have any questions about this Privacy Policy or your personal
            information, you can contact us using the details below.
          </p>
          <div className={`${bodyClass} mt-4 space-y-1`}>
            <p>[Official Legal Company Name]</p>
            <p>Registered Address: [Official Registered Address]</p>
            <p>Privacy/Contact Email: [Official Privacy or Contact Email]</p>
            <p>Phone: [Official Phone Number, if applicable]</p>
          </div>
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

/* =====================================================
   TERMS OF SERVICE
===================================================== */

export function TermsOfService() {
  return (
    <main className="min-h-screen bg-white">
      <section className="relative bg-[#14282E] text-white px-5 sm:px-8 lg:px-12 pt-32 sm:pt-36 pb-16 sm:pb-20">
        <Navbar />
        <div className="max-w-[1100px] mx-auto">
          <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#4FA8B8] mb-3">
            Rolex India
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
            Terms of Service
          </h1>
          <p className="mt-4 text-white/60">
            Last Updated: September 2, 2026
          </p>
        </div>
      </section>

      <article className="max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12 py-14">
        <p className={`${bodyClass} ${sectionClass}`}>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and
          use of the Rolex India website. By accessing or using this website,
          you agree to be bound by these Terms. If you do not agree with these
          Terms, please do not use this website.
        </p>

        <section className={sectionClass}>
          <h2 className={headingClass}>1. About the Website</h2>
          <p className={bodyClass}>
            This website provides information about Rolex India&rsquo;s steel
            products, equipment, capabilities, services, and business
            activities. The content is provided for general information and
            business enquiry purposes.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>2. Use of the Website</h2>
          <p className={bodyClass}>You agree that you will not:</p>
          <ul className={`${listClass} mt-3`}>
            <li>Use the website for any unlawful or unauthorised purpose.</li>
            <li>
              Attempt to gain unauthorised access to the website or its systems.
            </li>
            <li>
              Interfere with the security, operation, or availability of the
              website.
            </li>
            <li>
              Copy, reproduce, modify, distribute, or commercially exploit
              website content without permission.
            </li>
            <li>
              Submit information that is false, misleading, unlawful, or
              infringes another person&rsquo;s rights.
            </li>
          </ul>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>3. Product and Service Information</h2>
          <p className={bodyClass}>
            Product descriptions, specifications, photographs, dimensions,
            availability, capabilities, and other information displayed on the
            website may be subject to change. Website information should not be
            treated as a final quotation, technical specification, warranty, or
            contractual offer unless expressly stated otherwise.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>4. Enquiries and Communications</h2>
          <p className={bodyClass}>
            Submitting an enquiry through the website does not automatically
            create a contract, purchase order, agency relationship, or other
            binding business arrangement.
          </p>
          <p className={`${bodyClass} mt-3`}>
            Any commercial transaction will be governed by the applicable
            quotation, purchase order, agreement, invoice, or other written
            terms accepted by the relevant parties.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>5. Intellectual Property</h2>
          <p className={bodyClass}>
            Unless otherwise indicated, the website and its content, including
            text, graphics, logos, photographs, design elements, and software,
            are owned by or licensed to Rolex India and are protected by
            applicable intellectual property laws.
          </p>
          <p className={`${bodyClass} mt-3`}>
            No ownership rights are transferred to you through your use of this
            website.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>6. Third-Party Links</h2>
          <p className={bodyClass}>
            Links to third-party websites may be provided for convenience. Rolex
            India does not control or endorse all third-party content and is not
            responsible for their availability, accuracy, security, or terms.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>7. Disclaimer</h2>
          <p className={bodyClass}>
            The website is provided on an &ldquo;as available&rdquo; basis. To
            the maximum extent permitted by applicable law, Rolex India makes no
            representation or warranty that the website will always be
            uninterrupted, error-free, secure, or completely accurate or
            current.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>8. Limitation of Liability</h2>
          <p className={bodyClass}>
            To the maximum extent permitted by applicable law, Rolex India will
            not be liable for indirect, incidental, special, consequential, or
            loss-of-profit damages arising from or relating to your use of, or
            inability to use, the website.
          </p>
          <p className={`${bodyClass} mt-3`}>
            Nothing in these Terms excludes liability that cannot lawfully be
            excluded.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>9. Changes to These Terms</h2>
          <p className={bodyClass}>
            We may modify these Terms from time to time. Updated Terms will be
            posted on this page with a revised &ldquo;Last Updated&rdquo; date.
          </p>
          <p className={`${bodyClass} mt-3`}>
            Your continued use of the website after changes are posted
            constitutes acceptance of the revised Terms, to the extent permitted
            by law.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={headingClass}>10. Governing Law</h2>
          <p className={bodyClass}>
            These Terms shall be governed by the laws applicable in India,
            subject to the jurisdiction and dispute-resolution provisions
            contained in any applicable written commercial agreement between the
            parties.
          </p>
        </section>

        <section>
          <h2 className={headingClass}>11. Contact Us</h2>
          <p className={bodyClass}>
            If you have any questions regarding these Terms, please contact us
            using the official contact details provided on this website.
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