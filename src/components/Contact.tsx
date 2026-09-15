import { useState } from "react";
import {
  Mail,
  MapPin,
  Phone,
  CheckCircle,
  X,
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import RollButton from "./RollButton";
import Reveal from "./Reveal";

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
    validate: (v) =>
      v.trim().length < 2
        ? "Enter a valid entity name"
        : "",
  },
  {
    name: "contactPerson",
    label: "Contact Person",
    required: true,
    validate: (v) =>
      !NAME_PATTERN.test(v.trim())
        ? "Name should only contain letters"
        : "",
  },
  {
    name: "email",
    label: "Email ID",
    required: true,
    type: "email",
    validate: (v) =>
      !EMAIL_PATTERN.test(v.trim())
        ? "Enter a valid email address"
        : "",
  },
  {
    name: "phone",
    label: "Phone No.",
    required: true,
    type: "tel",
    validate: (v) =>
      !PHONE_PATTERN.test(v.trim())
        ? "Enter a valid phone number (digits only)"
        : "",
  },
  {
    name: "quantity",
    label: "Quantity Required",
    required: true,
    validate: (v) =>
      !/\d/.test(v)
        ? "Enter a valid quantity (numbers required)"
        : "",
  },
  {
    name: "material",
    label: "Material",
    required: true,
    validate: (v) =>
      v.trim().length < 1
        ? "Material is required"
        : "",
  },
];

const emptyValues = Object.fromEntries(
  fields.map((f) => [f.name, ""])
);

export default function Contact() {
  const [values, setValues] =
    useState<Record<string, string>>(emptyValues);

  const [errors, setErrors] =
    useState<Record<string, string>>({});

  const [touched, setTouched] =
    useState<Record<string, boolean>>({});

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [showSuccessPopup, setShowSuccessPopup] =
    useState(false);

  const [submitError, setSubmitError] =
    useState("");

  // Handle input changes
  const handleChange = (
    name: string,
    value: string
  ) => {
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (touched[name]) {
      const field = fields.find(
        (f) => f.name === name
      );

      if (!field) return;

      setErrors((prev) => ({
        ...prev,
        [name]: value.trim()
          ? field.validate(value)
          : "",
      }));
    }
  };

  // Validate field when user leaves it
  const handleBlur = (name: string) => {
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));

    const field = fields.find(
      (f) => f.name === name
    );

    if (!field) return;

    const value = values[name];

    setErrors((prev) => ({
      ...prev,
      [name]: !value.trim()
        ? "This field is required"
        : field.validate(value),
    }));
  };

  // Submit form to backend
  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    // Validate all fields first
    const nextErrors: Record<string, string> = {};

    fields.forEach((field) => {
      const value = values[field.name];

      nextErrors[field.name] = !value.trim()
        ? "This field is required"
        : field.validate(value);
    });

    setErrors(nextErrors);

    setTouched(
      Object.fromEntries(
        fields.map((field) => [
          field.name,
          true,
        ])
      )
    );

    const hasErrors =
      Object.values(nextErrors).some(Boolean);

    if (hasErrors) {
      return;
    }

    // Start submitting
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to submit enquiry."
        );
      }

      // Successful submission
      setValues(emptyValues);
      setErrors({});
      setTouched({});

      // Show popup
      setShowSuccessPopup(true);
    } catch (error) {
      console.error(
        "Contact form submission error:",
        error
      );

      setSubmitError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section
        id="contact"
        className="bg-[#EAF1F1]"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20">
          
          {/* Heading */}
          <Reveal className="text-center mb-10 sm:mb-14 lg:mb-16">
            <h2
              className="font-bold leading-[1.05] tracking-tight text-gray-900"
              style={{
                fontSize:
                  "clamp(2rem, 5vw, 3.5rem)",
              }}
            >
              Contact
            </h2>

            <span className="inline-block w-14 h-[3px] bg-[#2F6F7E] mt-5" />
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-16 items-start">

            {/* =========================================
                LEFT SIDE - CONTACT INFORMATION
            ========================================== */}
            <Reveal className="space-y-5">

              {/* Phone */}
              <a
                href="tel:+919620664429"
                className="flex items-center gap-3 text-[14px] sm:text-[15px] font-medium text-gray-700 hover:text-[#2F6F7E] transition-colors duration-300"
              >
                <Phone
                  size={16}
                  className="text-[#2F6F7E] flex-shrink-0"
                />

                <span>
                  +91 9620664429
                </span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/919738347599"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[14px] sm:text-[15px] font-medium text-gray-700 hover:text-[#2F6F7E] transition-colors duration-300"
              >
                <FaWhatsapp
                  size={16}
                  className="text-[#2F6F7E] flex-shrink-0"
                />

                <span>
                  +91 9738347599
                </span>
              </a>

              {/* Email */}
              <a
                href="mailto:rolexindiahbl@gmail.com"
                className="flex items-center gap-3 text-[14px] sm:text-[15px] font-medium text-gray-700 hover:text-[#2F6F7E] transition-colors duration-300 break-all"
              >
                <Mail
                  size={16}
                  className="text-[#2F6F7E] flex-shrink-0"
                />

                <span>
                  rolexindiahbl@gmail.com
                </span>
              </a>

              {/* Address */}
              <a
                href="https://www.google.com/maps/search/?api=1&query=B-348%2C%20Industrial%20Estate%20Gokul%20Rd%2C%20Industrial%20Estate%2C%20Hubli%2C%20Karnataka%20580030%2C%20India"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-[14px] sm:text-[15px] font-medium text-gray-700 hover:text-[#2F6F7E] transition-colors duration-300"
              >
                <MapPin
                  size={16}
                  className="text-[#2F6F7E] flex-shrink-0 mt-0.5"
                />

                <span>
                  B-348, Industrial Estate Gokul Rd,
                  Industrial Estate, Hubli,
                  Karnataka 580030, India
                </span>
              </a>
            </Reveal>

            {/* =========================================
                RIGHT SIDE - CONTACT FORM
            ========================================== */}
            <Reveal
              delay={120}
              className="w-full"
            >
              <form
                onSubmit={handleSubmit}
                noValidate
                className="w-full"
              >

                {/* Form Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

                  {fields.map((field) => (
                    <label
                      key={field.name}
                      className="flex flex-col gap-2"
                    >

                      {/* Label */}
                      <span className="text-[12px] font-bold uppercase tracking-wide text-gray-500">
                        {field.label}

                        {field.required && (
                          <span className="text-[#2F6F7E]">
                            {" "}*
                          </span>
                        )}
                      </span>

                      {/* Input */}
                      <input
                        type={
                          field.type ?? "text"
                        }
                        value={
                          values[field.name]
                        }
                        onChange={(e) =>
                          handleChange(
                            field.name,
                            e.target.value
                          )
                        }
                        onBlur={() =>
                          handleBlur(
                            field.name
                          )
                        }
                        disabled={isSubmitting}
                        className={`w-full border bg-white px-4 py-3 text-[14px] text-gray-900 outline-none transition-colors duration-300 ${
                          errors[field.name]
                            ? "border-red-500 focus:border-red-500"
                            : "border-gray-200 focus:border-[#2F6F7E]"
                        } ${
                          isSubmitting
                            ? "cursor-not-allowed opacity-60"
                            : ""
                        }`}
                      />

                      {/* Validation Error */}
                      {errors[field.name] && (
                        <span className="text-[12px] text-red-500">
                          {errors[field.name]}
                        </span>
                      )}

                    </label>
                  ))}

                </div>

                {/* Submit Button */}
                <div className="mt-8 sm:mt-10">
                  <RollButton
                    text={
                      isSubmitting
                        ? "Sending..."
                        : "Send"
                    }
                    variant="teal"
                    type="submit"
                  />
                </div>

                {/* Backend Error */}
                {submitError && (
                  <p className="mt-4 text-[13px] text-red-500">
                    {submitError}
                  </p>
                )}

              </form>
            </Reveal>

          </div>
        </div>

        {/* =========================================
            GOOGLE MAP
        ========================================== */}
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

      {/* ===========================================
          SUCCESS POPUP
      ============================================ */}
      {showSuccessPopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-5"
          onClick={() =>
            setShowSuccessPopup(false)
          }
        >
          <div
            className="relative w-full max-w-[440px] bg-white px-7 py-9 sm:px-10 sm:py-11 text-center shadow-2xl"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Close Button */}
            <button
              type="button"
              onClick={() =>
                setShowSuccessPopup(false)
              }
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-700 transition-colors duration-200"
              aria-label="Close popup"
            >
              <X size={20} />
            </button>

            {/* Success Icon */}
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF1F1]">
              <CheckCircle
                size={34}
                className="text-[#2F6F7E]"
                strokeWidth={2}
              />
            </div>

            {/* Heading */}
            <h3 className="text-2xl font-bold text-gray-900">
              Enquiry Submitted!
            </h3>

            {/* Message */}
            <p className="mt-3 text-[14px] leading-6 text-gray-600">
              Thank you for contacting
              Rolex India. Your enquiry has
              been submitted successfully.
              We'll get back to you shortly.
            </p>

            {/* OK Button */}
            <button
              type="button"
              onClick={() =>
                setShowSuccessPopup(false)
              }
              className="mt-7 bg-[#2F6F7E] px-8 py-3 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#245965]"
            >
              OK
            </button>

          </div>
        </div>
      )}
    </>
  );
}