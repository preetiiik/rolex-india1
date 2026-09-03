import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import RollButton from "./RollButton";

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
    <section id="contact" className="bg-[#EAF1F1]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20">
        <div className="text-center mb-10 sm:mb-14 lg:mb-16">
          <h2
            className="font-bold leading-[1.05] tracking-tight text-gray-900"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Contact
          </h2>
          <span className="inline-block w-14 h-[3px] bg-[#2F6F7E] mt-5" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">
          {/* Left: info */}
          <div className="space-y-5">
            <a
              href="tel:+919620664429"
              className="flex items-center gap-3 text-[14px] sm:text-[15px] font-medium text-gray-700 hover:text-[#2F6F7E] transition-colors duration-300"
            >
              <Phone size={16} className="text-[#2F6F7E] flex-shrink-0" />
              +91 9620664429
            </a>
            <a
              href="https://wa.me/919738347599"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 text-[14px] sm:text-[15px] font-medium text-gray-700 hover:text-[#2F6F7E] transition-colors duration-300"
            >
              <FaWhatsapp size={16} className="text-[#2F6F7E] flex-shrink-0" />
              +91 9738347599
            </a>
            <a
              href="mailto:rolexindiahbl@gmail.com"
              className="flex items-center gap-3 text-[14px] sm:text-[15px] font-medium text-gray-700 hover:text-[#2F6F7E] transition-colors duration-300 break-all"
            >
              <Mail size={16} className="text-[#2F6F7E] flex-shrink-0" />
              rolexindiahbl@gmail.com
            </a>
            <a
              href="https://www.google.com/maps/search/?api=1&query=B-348%2C%20Industrial%20Estate%20Gokul%20Rd%2C%20Industrial%20Estate%2C%20Hubli%2C%20Karnataka%20580030%2C%20India"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-[14px] sm:text-[15px] font-medium text-gray-700 hover:text-[#2F6F7E] transition-colors duration-300"
            >
              <MapPin size={16} className="text-[#2F6F7E] flex-shrink-0 mt-0.5" />
              <span>
                B-348, Industrial Estate Gokul Rd, Industrial Estate, Hubli,
                Karnataka 580030, India
              </span>
            </a>
          </div>

          {/* Right: form */}
          <form onSubmit={handleSubmit} noValidate className="w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {fields.map((f) => (
                <label key={f.name} className="flex flex-col gap-2">
                  <span className="text-[12px] font-bold uppercase tracking-wide text-gray-500">
                    {f.label} {f.required && <span className="text-[#2F6F7E]">*</span>}
                  </span>
                  <input
                    type={f.type ?? "text"}
                    value={values[f.name]}
                    onChange={(e) => handleChange(f.name, e.target.value)}
                    onBlur={() => handleBlur(f.name)}
                    className={`w-full  border bg-white px-4 py-3 text-[14px] text-gray-900 outline-none transition-colors duration-300 ${
                      errors[f.name] ? "border-red-500 focus:border-red-500" : "border-gray-200 focus:border-[#2F6F7E]"
                    }`}
                  />
                  {errors[f.name] && (
                    <span className="text-[12px] text-red-500">{errors[f.name]}</span>
                  )}
                </label>
              ))}
            </div>

            <div className="mt-8 sm:mt-10">
              <RollButton text="Send" variant="teal" type="submit" />
            </div>

            {submitted && (
              <p className="mt-4 text-[13px] text-gray-600">
                Thanks — your enquiry has been noted. We'll get back to you shortly.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Map */}
      <div className="w-full h-[380px] sm:h-[440px]">
        <iframe
          title="Rolex India location"
          src="https://www.google.com/maps?q=B-348,%20Industrial%20Estate%20Gokul%20Rd,%20Industrial%20Estate,%20Hubli,%20Karnataka%20580030,%20India&output=embed"
          className="w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </section>
  );
}
