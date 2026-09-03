import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Clock, Mail, Menu, Phone, X } from "lucide-react";
import { navLinks } from "../data/content";
import RollButton from "./RollButton";
import { useLiveTime } from "../hooks/useLiveTime";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const time = useLiveTime("Asia/Kolkata");
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`);
  const goToSection = (hash: string) => {
    if (isHome) {
      window.location.hash = hash;
    } else {
      window.location.href = `/${hash}`;
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-30 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200">
        {/* Utility bar */}
        <div className="hidden sm:block bg-[#EAF1F1] border-b border-gray-200">
          <div className="max-w-[1440px] mx-auto flex items-center justify-between px-5 sm:px-8 lg:px-12 py-1.5">
            <a
              href="tel:+919620664429"
              className="flex items-center gap-1.5 text-[12px] font-medium text-gray-600 hover:text-[#2F6F7E] transition-colors duration-300"
            >
              <Phone size={12} />
              Call Now +91 9620664429
            </a>
            <a
              href="mailto:rolexindiahbl@gmail.com"
              className="flex items-center gap-1.5 text-[12px] font-medium text-gray-600 hover:text-[#2F6F7E] transition-colors duration-300"
            >
              <Mail size={12} />
              rolexindiahbl@gmail.com
            </a>
          </div>
        </div>

        <nav className="max-w-[1440px] mx-auto flex items-center px-5 sm:px-8 lg:px-12 py-3 sm:py-4">
          <a href={isHome ? "#home" : "/"} className="flex items-center gap-2.5 mr-8 lg:mr-12">
            <img src={logo} alt="Rolex India" className="h-9 w-9 sm:h-10 sm:w-10  object-cover" />
            <span className="hidden sm:block text-[15px] font-bold text-gray-900">
              Rolex India
            </span>
          </a>
          <div className="hidden md:flex flex-1 items-center gap-6 lg:gap-8">
            {navLinks
              .filter((l) => l.label !== "Enquiry")
              .map((l) => (
                <a
                  key={l.label}
                  href={sectionHref(l.href)}
                  className="text-[13px] font-medium text-gray-700 hover:text-[#2F6F7E] transition-colors duration-300"
                >
                  {l.label}
                </a>
              ))}
          </div>

          <div className="hidden md:flex items-center shrink-0">
            <RollButton text="Get In Touch" size="md" variant="teal" onClick={() => goToSection("#contact")} />
          </div>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden ml-auto flex items-center gap-2 bg-[#2F6F7E] text-white pl-4 pr-2 py-2 text-[13px] font-bold uppercase"
          >
            Menu
            <span className="w-6 h-6  bg-white/20 flex items-center justify-center">
              <Menu size={14} />
            </span>
          </button>
        </nav>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-500 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
        <div
          className={`absolute left-3 right-3 bottom-3 bg-white  p-6 transition-transform duration-500 ${
            open ? "translate-y-0" : "translate-y-full"
          }`}
          style={{ transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)" }}
        >
          <div className="flex items-center justify-between mb-8">
            <span className="flex items-center gap-1.5 text-[13px] text-gray-600 bg-gray-100  px-3 py-1.5">
              <Clock size={14} />
              {time} in Hubballi
            </span>
            <button
              onClick={() => setOpen(false)}
              className="bg-gray-900 text-white  w-9 h-9 flex items-center justify-center"
            >
              <X size={16} />
            </button>
          </div>
          <div className="flex flex-col gap-1 mb-8">
            {navLinks
              .filter((l) => l.label !== "Enquiry")
              .map((l) => (
                <a
                  key={l.label}
                  href={sectionHref(l.href)}
                  onClick={() => setOpen(false)}
                  className="text-[26px] font-black uppercase text-gray-900 py-1"
                >
                  {l.label}
                </a>
              ))}
          </div>
          <RollButton
            text="Enquiry"
            variant="teal"
            onClick={() => {
              setOpen(false);
              goToSection("#contact");
            }}
            className="w-full justify-between"
          />
        </div>
      </div>
    </>
  );
}
