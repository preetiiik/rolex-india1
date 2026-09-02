import { Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { footerNav } from "../data/content";
import logo from "../assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-14 sm:pt-16 lg:pt-20 pb-8">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 pb-12 sm:pb-16 border-b border-white/10">

          {/* Logo & Address */}
          <div>
            <img
              src={logo}
              alt="Rolex India"
              className="h-14 w-14 rounded-xl object-cover mb-5"
            />

            <a
  href="https://www.google.com/maps/search/?api=1&query=B-348%2C%20Industrial%20Estate%20Gokul%20Rd%2C%20Industrial%20Estate%2C%20Hubli%2C%20Karnataka%20580030%2C%20India"
  target="_blank"
  rel="noopener noreferrer"
  className="flex gap-2.5 text-[14px] text-white/70 visited:text-white/70 no-underline leading-6 max-w-[280px] hover:text-white transition-colors duration-300"
>
  <span className="flex items-center justify-center h-6 w-4 flex-shrink-0">
    <MapPin size={15} className="text-white/50" />
  </span>
  <span>
    B-348, Industrial Estate Gokul Rd, Industrial Estate, Hubli,
    Karnataka 580030, India
  </span>
</a>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[13px] text-white/50 mb-4">
              Navigation
            </p>

            <ul className="space-y-2.5">
              {footerNav.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="text-[15px] text-white/90 hover:text-white transition-colors duration-300"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <p className="text-[13px] text-white/50 mb-4">
              Contact Details
            </p>

            <ul className="space-y-3">

              {/* Phone */}
              <li>
                <a
                  href="tel:+919620664429"
                  className="flex items-center gap-2.5 text-[15px] text-white/90 hover:text-white transition-colors duration-300"
                >
                  <Phone
                    size={15}
                    className="text-white/50"
                  />
                  +91 9620664429
                </a>
              </li>

              {/* WhatsApp */}
              <li>
                <a
                  href="https://wa.me/919738347599"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-[15px] text-white/90 hover:text-white transition-colors duration-300"
                >
                  <FaWhatsapp
                    size={17}
                    className="text-white/50"
                  />
                  +91 9738347599
                </a>
              </li>

              {/* Email */}
              <li>
                <a
                  href="mailto:rolexindiahbl@gmail.com"
                  className="flex items-center gap-2.5 text-[15px] text-white/90 hover:text-white transition-colors duration-300 break-all"
                >
                  <Mail
                    size={15}
                    className="text-white/50 flex-shrink-0"
                  />
                  rolexindiahbl@gmail.com
                </a>
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">

         <p className="text-[13px] text-white/50">
  © 2025 ROLEX INDIA. All Rights Reserved.{" "}
  <span>
    {" "}
    <a
      href="https://spitel.com"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-white transition-colors"
    >
      Powered by Spitel Pvt. Ltd.
    </a>
  </span>
</p>

          <div className="flex items-center gap-4">
  <a
    href="/privacy-policy"
    className="text-white/50 hover:text-white transition-colors"
  >
    Privacy Policy
  </a>

  <span className="text-white/20">|</span>

  <a
    href="/terms-of-service"
    className="text-white/50 hover:text-white transition-colors"
  >
    Terms of Service
  </a>
</div>

        </div>
      </div>
    </footer>
  );
}