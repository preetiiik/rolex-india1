import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import RollButton from "./RollButton";
import contactBg from "../assets/what-we-do1.webp";

type FieldConfig = {
  name: string;
  label: string;
  required: boolean;
  type?: string;
  validate: (value: string) => string;
};

const NAME_PATTERN = /^[A-Za-z][A-Za-z\s.'-]*$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_PATTERN = /^\+?[0-9]{10,15}$/;

const fields: FieldConfig[] = [
  {
    name: "entityName",
    label: "Entity Name",
    required: true,
    validate: (v) => (v.trim().length < 2 ? "Enter a valid entity name" : ""),
  },
  {
    name: "contactPerson",
    label: "Contact Person",
    required: true,
    validate: (v) => (!NAME_PATTERN.test(v.trim()) ? "Name should only contain letters" : ""),
  },
  {
    name: "email",
    label: "Email ID",
    required: true,
    type: "email",
    validate: (v) => (!EMAIL_PATTERN.test(v.trim()) ? "Enter a valid email address" : ""),
  },
  {
    name: "phone",
    label: "Phone No.",
    required: true,
    type: "tel",
    validate: (v) => (!PHONE_PATTERN.test(v.trim()) ? "Enter a valid phone number (digits only)" : ""),
  },
  {
    name: "quantity",
    label: "Quantity Required",
    required: true,
    validate: (v) => (!/\d/.test(v) ? "Enter a valid quantity (numbers required)" : ""),
  },
  {
    name: "material",
    label: "Material",
    required: true,
    validate: (v) => (v.trim().length < 1 ? "Material is required" : ""),
  },
];

const emptyValues = Object.fromEntries(fields.map((f) => [f.name, ""]));

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [values, setValues] = useState<Record<string, string>>(emptyValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleChange = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const field = fields.find((f) => f.name === name)!;
      setErrors((prev) => ({ ...prev, [name]: value.trim() ? field.validate(value) : "" }));
    }
  };

  const handleBlur = (name: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    const field = fields.find((f) => f.name === name)!;
    const value = values[name];
    setErrors((prev) => ({
      ...prev,
      [name]: !value.trim() ? "This field is required" : field.validate(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nextErrors: Record<string, string> = {};
    fields.forEach((f) => {
      const value = values[f.name];
      nextErrors[f.name] = !value.trim() ? "This field is required" : f.validate(value);
    });
    setErrors(nextErrors);
    setTouched(Object.fromEntries(fields.map((f) => [f.name, true])));

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) return;

    setSubmitted(true);
    setValues(emptyValues);
    setErrors({});
    setTouched({});
  };

  return (
    <section id="contact" className="bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left: info panel */}
        <div className="relative overflow-hidden bg-[#0a1a3a] px-5 sm:px-8 lg:px-14 py-16 sm:py-20 lg:py-28">
          <img
            src={contactBg}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a3a]/95 via-[#0a1a3a]/90 to-[#0a1a3a]/95" />

          <div className="relative z-10 max-w-[440px] ml-auto lg:mr-0">
            <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-[#F26522] mb-6 sm:mb-8">
              Connect With Us
            </p>

            <h2
              className="font-black uppercase leading-[0.95] tracking-tight text-white mb-10 sm:mb-14"
              style={{ fontSize: "clamp(2.25rem, 5.5vw, 4rem)" }}
            >
              Get In Touch
            </h2>

            <ul className="space-y-5 sm:space-y-6">
              <li>
                <a
                  href="tel:+919620664429"
                  className="flex items-center gap-3 text-[14px] sm:text-base font-light text-white/80 hover:text-white transition-colors duration-300"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.06] flex-shrink-0">
                    <Phone size={15} />
                  </span>
                  +91 9620664429
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919738347599"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[14px] sm:text-base font-light text-white/80 hover:text-white transition-colors duration-300"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.06] flex-shrink-0">
                    <FaWhatsapp size={16} />
                  </span>
                  +91 9738347599
                </a>
              </li>
              <li>
                <a
                  href="mailto:rolexindiahbl@gmail.com"
                  className="flex items-center gap-3 text-[14px] sm:text-base font-light text-white/80 hover:text-white transition-colors duration-300 break-all"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.06] flex-shrink-0">
                    <Mail size={15} />
                  </span>
                  rolexindiahbl@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=B-348%2C%20Industrial%20Estate%20Gokul%20Rd%2C%20Industrial%20Estate%2C%20Hubli%2C%20Karnataka%20580030%2C%20India"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 text-[14px] sm:text-base font-light text-white/80 hover:text-white transition-colors duration-300"
                >
                  <span className="flex items-center justify-center w-9 h-9 rounded-full bg-white/[0.06] flex-shrink-0">
                    <MapPin size={15} />
                  </span>
                  <span className="pt-1.5">
                    B-348, Industrial Estate Gokul Rd, Industrial Estate, Hubli,
                    Karnataka 580030, India
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right: form panel */}
        <div className="px-5 sm:px-8 lg:px-14 py-16 sm:py-20 lg:py-28 flex items-center">
          <form onSubmit={handleSubmit} noValidate className="w-full max-w-[520px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {fields.map((f) => (
                <label key={f.name} className="flex flex-col gap-2">
                  <span className="text-[12px] font-bold uppercase tracking-wide text-gray-500">
                    {f.label} {f.required && <span className="text-[#F26522]">*</span>}
                  </span>
                  <input
                    type={f.type ?? "text"}
                    value={values[f.name]}
                    onChange={(e) => handleChange(f.name, e.target.value)}
                    onBlur={() => handleBlur(f.name)}
                    className={`w-full rounded-lg border bg-white px-4 py-3 text-[14px] text-gray-900 outline-none transition-colors duration-300 ${
                      errors[f.name] ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-[#F26522]"
                    }`}
                  />
                  {errors[f.name] && (
                    <span className="text-[12px] text-red-500">{errors[f.name]}</span>
                  )}
                </label>
              ))}
            </div>

            <div className="mt-8 sm:mt-10">
              <RollButton text="Send" variant="orange" type="submit" />
            </div>

            {submitted && (
              <p className="mt-4 text-[13px] text-gray-600">
                Thanks — your enquiry has been noted. We'll get back to you shortly.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
