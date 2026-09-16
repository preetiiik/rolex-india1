import { useRef, useState } from "react";
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
  maxLength?: number;
  inputMode?: "text" | "numeric" | "email" | "tel";
  validate: (value: string) => string;
};

/* =====================================================
   VALIDATION PATTERNS
===================================================== */

// Letters and spaces only
const NAME_PATTERN = /^[A-Za-z]+(?:\s+[A-Za-z]+)*$/;

// Email
const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Starts with 6-9, followed by exactly 9 more digits (10 digits total)
const PHONE_PATTERN = /^[6-9][0-9]{9}$/;

// Numbers only
const QUANTITY_PATTERN = /^[0-9]+$/;

// Letters, numbers and spaces
const MATERIAL_PATTERN =
  /^[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*$/;


/* =====================================================
   FORM FIELDS
===================================================== */

const fields: FieldConfig[] = [
  {
    name: "entityName",
    label: "Entity Name",
    required: true,
    maxLength: 100,
    inputMode: "text",

    validate: (value) => {
      const v = value.trim();

      if (!v) {
        return "Entity name is required";
      }

      if (v.length < 2) {
        return "Entity name must contain at least 2 characters";
      }

      if (!NAME_PATTERN.test(v)) {
        return "Entity name should contain letters and spaces only";
      }

      return "";
    },
  },

  {
    name: "contactPerson",
    label: "Contact Person",
    required: true,
    maxLength: 100,
    inputMode: "text",

    validate: (value) => {
      const v = value.trim();

      if (!v) {
        return "Contact person is required";
      }

      if (v.length < 2) {
        return "Contact person must contain at least 2 characters";
      }

      if (!NAME_PATTERN.test(v)) {
        return "Contact person should contain letters and spaces only";
      }

      return "";
    },
  },

  {
    name: "email",
    label: "Email ID",
    required: true,
    type: "email",
    maxLength: 150,
    inputMode: "email",

    validate: (value) => {
      const v = value.trim();

      if (!v) {
        return "Email ID is required";
      }

      if (!EMAIL_PATTERN.test(v)) {
        return "Enter a valid email address";
      }

      return "";
    },
  },

  {
    name: "phone",
    label: "Phone Number",
    required: true,
    type: "tel",
    maxLength: 10,
    inputMode: "numeric",

    validate: (value) => {
      const v = value.trim();

      if (!v) {
        return "Phone number is required";
      }

      if (!/^[0-9]+$/.test(v)) {
        return "Phone number should contain digits only";
      }

      if (v.length !== 10) {
        return "Phone number must contain exactly 10 digits";
      }

      if (!/^[6-9]/.test(v)) {
        return "Phone number must start with a digit from 6 to 9";
      }

      if (!PHONE_PATTERN.test(v)) {
        return "Enter a valid 10-digit phone number";
      }

      return "";
    },
  },

  {
    name: "quantity",
    label: "Quantity Required",
    required: true,
    maxLength: 10,
    inputMode: "numeric",

    validate: (value) => {
      const v = value.trim();

      if (!v) {
        return "Quantity is required";
      }

      if (!QUANTITY_PATTERN.test(v)) {
        return "Quantity should contain numbers only";
      }

      if (Number(v) <= 0) {
        return "Quantity must be greater than 0";
      }

      return "";
    },
  },

  {
    name: "material",
    label: "Material",
    required: true,
    maxLength: 100,
    inputMode: "text",

    validate: (value) => {
      const v = value.trim();

      if (!v) {
        return "Material is required";
      }

      if (!MATERIAL_PATTERN.test(v)) {
        return "Material should contain letters, numbers and spaces only";
      }

      return "";
    },
  },
];

const emptyValues = Object.fromEntries(
  fields.map((field) => [field.name, ""])
);


/* =====================================================
   CONTACT COMPONENT
===================================================== */

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

  // Tracks each field's input DOM node so we can focus the first
  // invalid one if the form fails validation on submit.
  const fieldRefs = useRef<Record<string, HTMLInputElement | null>>({});


  /* ===================================================
     HANDLE INPUT CHANGE
  =================================================== */

  const handleChange = (
    name: string,
    value: string
  ) => {
    /*
      Phone:
      Only allow digits and maximum 10 characters.
    */
    if (name === "phone") {
      value = value.replace(/\D/g, "").slice(0, 10);
    }

    /*
      Quantity:
      Only allow numbers.
    */
    if (name === "quantity") {
      value = value.replace(/\D/g, "");
    }

    /*
      Entity Name / Contact Person:
      Only allow letters and spaces.
    */
    if (name === "entityName" || name === "contactPerson") {
      value = value.replace(/[^A-Za-z\s]/g, "");
    }

    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    /*
      If the user has already interacted with
      the field, validate it immediately.
    */
    if (touched[name]) {
      const field = fields.find(
        (item) => item.name === name
      );

      if (!field) return;

      setErrors((previous) => ({
        ...previous,
        [name]: field.validate(value),
      }));
    }
  };


  /* ===================================================
     HANDLE BLUR
  =================================================== */

  const handleBlur = (name: string) => {
    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }));

    const field = fields.find(
      (item) => item.name === name
    );

    if (!field) return;

    const error = field.validate(values[name]);

    setErrors((previous) => ({
      ...previous,
      [name]: error,
    }));
  };


  /* ===================================================
     SUBMIT
  =================================================== */

  const handleSubmit = async (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    setSubmitError("");

    const nextErrors: Record<string, string> = {};

    /*
      Validate every field.
    */
    fields.forEach((field) => {
      nextErrors[field.name] =
        field.validate(values[field.name]);
    });

    setErrors(nextErrors);

    /*
      Mark every field as touched.
    */
    setTouched(
      Object.fromEntries(
        fields.map((field) => [
          field.name,
          true,
        ])
      )
    );

    /*
      Stop submission if ANY field has an error.
    */
    const hasErrors =
      Object.values(nextErrors).some(
        (error) => Boolean(error)
      );

    if (hasErrors) {
      /*
        Move focus to the first invalid field so keyboard and
        screen-reader users land directly on what needs fixing.
      */
      const firstErrorField = fields.find(
        (field) => nextErrors[field.name]
      );

      if (firstErrorField) {
        fieldRefs.current[firstErrorField.name]?.focus();
      }

      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(values),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to submit enquiry."
        );
      }

      /*
        Successful submission.
      */
      setValues(emptyValues);
      setErrors({});
      setTouched({});

      /*
        Show success popup.
      */
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


  /* ===================================================
     JSX
  =================================================== */

  return (
    <>
      <section
        id="contact"
        className="bg-[#EAF1F1]"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20">

          {/* ===========================
              HEADING
          ============================ */}

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

            {/* ===========================
                CONTACT INFORMATION
            ============================ */}

            <Reveal className="space-y-5">

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


            {/* ===========================
                FORM
            ============================ */}

            <Reveal
              delay={120}
              className="w-full"
            >
              <form
                onSubmit={handleSubmit}
                noValidate
                className="w-full"
              >

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">

                  {fields.map((field) => (
                    <label
                      key={field.name}
                      className="flex flex-col gap-2"
                    >

                      {/* LABEL */}

                      <span className="text-[12px] font-bold uppercase tracking-wide text-gray-500">
                        {field.label}

                        {field.required && (
                          <span className="text-[#2F6F7E]">
                            {" "}*
                          </span>
                        )}
                      </span>


                      {/* INPUT */}

                      <input
                        ref={(el) => {
                          fieldRefs.current[field.name] = el;
                        }}
                        id={`field-${field.name}`}
                        type={
                          field.type ?? "text"
                        }
                        value={
                          values[field.name]
                        }
                        maxLength={
                          field.maxLength
                        }
                        inputMode={
                          field.inputMode
                        }
                        autoComplete={
                          field.name === "email"
                            ? "email"
                            : field.name === "phone"
                            ? "tel"
                            : "off"
                        }
                        aria-invalid={
                          Boolean(errors[field.name])
                        }
                        aria-describedby={
                          errors[field.name]
                            ? `error-${field.name}`
                            : undefined
                        }
                        onChange={(event) =>
                          handleChange(
                            field.name,
                            event.target.value
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


                      {/* ERROR */}

                      {errors[field.name] && (
                        <span
                          id={`error-${field.name}`}
                          className="text-[12px] text-red-500"
                          role="alert"
                        >
                          {errors[field.name]}
                        </span>
                      )}

                    </label>
                  ))}

                </div>


                {/* ===========================
                    SEND BUTTON
                ============================ */}

                <div className="mt-8 sm:mt-10">
                  <RollButton
                    text={
                      isSubmitting
                        ? "Sending..."
                        : "Send"
                    }
                    variant="teal"
                    type="submit"
                    disabled={isSubmitting}
                  />
                </div>


                {/* ===========================
                    BACKEND ERROR
                ============================ */}

                {submitError && (
                  <p
                    className="mt-4 text-[13px] text-red-500"
                    role="alert"
                  >
                    {submitError}
                  </p>
                )}

              </form>
            </Reveal>

          </div>
        </div>


        {/* ===========================
            GOOGLE MAP
        ============================ */}

        <div className="w-full h-[380px] sm:h-[440px]">
          <iframe
            title="Rolex India location"
            src="https://www.google.com/maps?q=B-348,%20Industrial%20Estate%20Gokul%20Rd,%20Industrial%20Estate,%20Hubli,%20Karnataka%20580030%2C%20India&output=embed"
            className="w-full h-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

      </section>


      {/* =================================================
          SUCCESS POPUP
      ================================================== */}

      {showSuccessPopup && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-5"
          onClick={() =>
            setShowSuccessPopup(false)
          }
        >

          <div
            className="relative w-full max-w-[440px] bg-white px-7 py-9 sm:px-10 sm:py-11 text-center shadow-2xl"
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* CLOSE */}

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


            {/* SUCCESS ICON */}

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF1F1]">
              <CheckCircle
                size={34}
                className="text-[#2F6F7E]"
                strokeWidth={2}
              />
            </div>


            {/* TITLE */}

            <h3 className="text-2xl font-bold text-gray-900">
              Enquiry Submitted!
            </h3>


            {/* MESSAGE */}

            <p className="mt-3 text-[14px] leading-6 text-gray-600">
              Thank you for contacting
              Rolex India. Your enquiry has
              been submitted successfully.
              We'll get back to you shortly.
            </p>


            {/* OK */}

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