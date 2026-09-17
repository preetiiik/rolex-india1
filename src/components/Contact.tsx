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
import { products } from "../data/content";

type FieldConfig = {
  name: string;
  label: string;
  required: boolean;
  type?: string;
  /**
   * Soft limit. Going past this does NOT break the form,
   * it shows a clear validation message.
   */
  maxLength?: number;
  /**
   * Hard cap applied while typing / pasting so a huge paste can
   * never blow up the input, the state or the request payload.
   */
  hardLimit?: number;
  placeholder?: string;
  inputMode?: "text" | "numeric" | "email" | "tel";
  options?: string[];
  validate: (value: string) => string;
};

/* =====================================================
   VALIDATION PATTERNS
===================================================== */

/*
  Entity / company name.
  Letters, digits, spaces and common business punctuation.
  Digits ARE allowed: "3M", "H2O Coolers", "24x7 Engineering".
*/
const ENTITY_PATTERN = /^[A-Za-z0-9][A-Za-z0-9 .,&'()\-/]*$/;

/*
  Person name. Letters, spaces, apostrophe, hyphen and dot.
  ("Dr. O'Brien-Smith")
*/
const PERSON_PATTERN = /^[A-Za-z][A-Za-z .'-]*$/;

/*
  Email. Stricter than [^\s@]+@[^\s@]+\.[^\s@]+ so that
  missing username, missing domain and missing TLD are all caught.
*/
const EMAIL_PATTERN =
  /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z]{2,63}$/;

// Starts with 6-9, followed by exactly 9 more digits (10 digits total)
const PHONE_PATTERN = /^[6-9][0-9]{9}$/;

// Numbers only
const QUANTITY_PATTERN = /^[0-9]+$/;

const MAX_QUANTITY = 1_000_000;

/* =====================================================
   SAFETY HELPERS  (XSS / injection)
===================================================== */

/*
  Anything that looks like markup, an inline event handler,
  an HTML entity or a script-bearing URL scheme.

  NOTE: values are always rendered as plain text by React
  (no dangerouslySetInnerHTML / innerHTML anywhere in this file),
  so nothing typed here can ever execute. These checks exist so the
  user gets a clear message instead of silently sending junk,
  and so the payload we POST is clean.
*/
const MARKUP_PATTERN = /[<>]/;
const SCRIPT_LIKE_PATTERN =
  /(<\s*\/?\s*[a-z!]|javascript\s*:|vbscript\s*:|data\s*:\s*text\/html|on[a-z]+\s*=|&#x?[0-9a-f]+;?|&lt;|&gt;)/i;

const checkUnsafeContent = (value: string): string => {
  if (MARKUP_PATTERN.test(value)) {
    return "The characters < and > are not allowed";
  }

  if (SCRIPT_LIKE_PATTERN.test(value)) {
    return "HTML or script content is not allowed";
  }

  return "";
};

/*
  Strip control characters and zero-width characters, and
  normalise whitespace. Used on every keystroke and again
  before the value leaves the browser.
*/
const sanitizeInput = (value: string): string =>
  value
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001F\u007F-\u009F\u200B-\u200D\uFEFF]/g, "")
    .replace(/[ \t]{2,}/g, " ");

const lengthError = (
  label: string,
  value: string,
  maxLength: number
): string =>
  value.length > maxLength
    ? `${label} must be ${maxLength} characters or less (currently ${value.length})`
    : "";

/* =====================================================
   FORM FIELDS
===================================================== */

const MATERIALS = [
  "Mild Steel (MS)",
  "Stainless Steel (SS)",
  "Carbon Steel",
  "Alloy Steel",
  "Free Cutting Steel (FCS)",
  "EN8",
  "EN9",
  "EN19",
  "EN24",
  "Spring Steel",
];

const fields: FieldConfig[] = [
  {
    name: "entityName",
    label: "Entity Name",
    required: true,
    maxLength: 35,
    hardLimit: 35,
    inputMode: "text",
    placeholder: "e.g. 3M Industries Pvt Ltd",

    validate: (value) => {
      const v = sanitizeInput(value).trim();

      if (!v) {
        return "Entity name is required";
      }

      const unsafe = checkUnsafeContent(v);
      if (unsafe) return unsafe;

      const tooLong = lengthError("Entity name", v, 35);
      if (tooLong) return tooLong;

      if (v.length < 2) {
        return "Entity name must contain at least 2 characters";
      }

      if (!ENTITY_PATTERN.test(v)) {
        return "Entity name can use letters, numbers, spaces and . , & ' ( ) - / only";
      }

      if (!/[A-Za-z]/.test(v)) {
        return "Entity name must contain at least one letter";
      }

      return "";
    },
  },

  {
    name: "contactPerson",
    label: "Contact Person",
    required: true,
    maxLength: 35,
    hardLimit: 35,
    inputMode: "text",
    placeholder: "e.g. Anita Sharma",

    validate: (value) => {
      const v = sanitizeInput(value).trim();

      if (!v) {
        return "Contact person is required";
      }

      const unsafe = checkUnsafeContent(v);
      if (unsafe) return unsafe;

      const tooLong = lengthError("Contact person", v, 35);
      if (tooLong) return tooLong;

      if (v.length < 2) {
        return "Contact person must contain at least 2 characters";
      }

      if (/[0-9]/.test(v)) {
        return "Contact person should not contain numbers";
      }

      if (!PERSON_PATTERN.test(v)) {
        return "Contact person should contain letters, spaces, apostrophes and hyphens only";
      }

      return "";
    },
  },

  {
    name: "email",
    label: "Email ID",
    required: true,
    type: "email",
    maxLength: 35,
    hardLimit: 35,
    inputMode: "email",
    placeholder: "e.g. name@company.com",

    validate: (value) => {
      const v = sanitizeInput(value).trim();

      if (!v) {
        return "Email ID is required";
      }

      const unsafe = checkUnsafeContent(v);
      if (unsafe) return unsafe;

      const tooLong = lengthError("Email ID", v, 35);
      if (tooLong) return tooLong;

      if (/\s/.test(v)) {
        return "Email address cannot contain spaces";
      }

      const atCount = (v.match(/@/g) || []).length;

      if (atCount === 0) {
        return "Email address must contain @ (e.g. name@company.com)";
      }

      if (atCount > 1) {
        return "Email address must contain only one @";
      }

      const [localPart, domainPart] = v.split("@");

      // Missing username, e.g. "@example.com"
      if (!localPart) {
        return "Email address is missing the part before @";
      }

      // Missing domain, e.g. "user@"
      if (!domainPart) {
        return "Email address is missing the domain after @ (e.g. company.com)";
      }

      if (!domainPart.includes(".")) {
        return "Email domain must include a dot (e.g. company.com)";
      }

      if (v.includes("..")) {
        return "Email address cannot contain two dots in a row";
      }

      if (
        localPart.startsWith(".") ||
        localPart.endsWith(".") ||
        domainPart.startsWith(".") ||
        domainPart.startsWith("-") ||
        domainPart.endsWith(".") ||
        domainPart.endsWith("-")
      ) {
        return "Email address cannot start or end a part with a dot or hyphen";
      }

      if (localPart.length > 64) {
        return "The part before @ is too long";
      }

      if (!EMAIL_PATTERN.test(v)) {
        return "Enter a valid email address (e.g. name@company.com)";
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
    hardLimit: 10,
    inputMode: "numeric",
    placeholder: "10-digit mobile number",

    validate: (value) => {
      const v = sanitizeInput(value).trim();

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
    maxLength: 7,
    hardLimit: 9,
    inputMode: "numeric",
    placeholder: "e.g. 500",

    validate: (value) => {
      const v = sanitizeInput(value).trim();

      if (!v) {
        return "Quantity is required";
      }

      if (!QUANTITY_PATTERN.test(v)) {
        return "Quantity should contain numbers only";
      }

      const numeric = Number(v);

      if (!Number.isFinite(numeric)) {
        return "Enter a valid quantity";
      }

      if (numeric <= 0) {
        return "Quantity must be greater than 0";
      }

      if (numeric > MAX_QUANTITY) {
        return `Quantity must be ${MAX_QUANTITY.toLocaleString(
          "en-IN"
        )} or less`;
      }

      return "";
    },
  },

  {
    name: "product",
    label: "Product Required",
    required: true,
    placeholder: "Select product",
    options: products.map((product) => product.title),

    validate: (value) => {
      const v = sanitizeInput(value).trim();

      if (!v) {
        return "Please select a product";
      }

      /*
        Only a value from the allow-list is acceptable. This blocks
        any tampered/injected <option> value.
      */
      const allowed = products.map((product) => product.title);

      if (!allowed.includes(v)) {
        return "Please select a product from the list";
      }

      return "";
    },
  },

  {
    name: "material",
    label: "Material",
    required: true,
    placeholder: "Select material",
    options: MATERIALS,

    validate: (value) => {
      const v = sanitizeInput(value).trim();

      if (!v) {
        return "Please select a material";
      }

      if (!MATERIALS.includes(v)) {
        return "Please select a material from the list";
      }

      return "";
    },
  },
];

const emptyValues = Object.fromEntries(
  fields.map((field) => [field.name, ""])
);

const getField = (name: string) =>
  fields.find((item) => item.name === name);

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
  const fieldRefs = useRef<
    Record<string, HTMLInputElement | HTMLSelectElement | null>
  >({});


  /* ===================================================
     HANDLE INPUT CHANGE
  =================================================== */

  const handleChange = (
    name: string,
    rawValue: string
  ) => {
    const field = getField(name);

    /*
      Always strip control / zero-width characters first.
      Markup characters are NOT stripped silently - they are
      reported through validation so the user knows why.
    */
    let value = sanitizeInput(rawValue);

    /*
      Phone: digits only.
    */
    if (name === "phone") {
      value = value.replace(/\D/g, "");
    }

    /*
      Quantity: digits only.
    */
    if (name === "quantity") {
      value = value.replace(/\D/g, "");
    }

    /*
      Hard cap so an oversized paste can never break
      the input, the state or the payload.
    */
    if (field?.hardLimit) {
      value = value.slice(0, field.hardLimit);
    }

    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (!field) return;

    /*
      Validate live once the user has interacted with the field,
      while an error is already showing, or as soon as the value
      goes past the soft limit (so a big paste explains itself
      instead of being silently truncated).
    */
    const shouldValidateNow =
      touched[name] ||
      Boolean(errors[name]) ||
      (field.maxLength !== undefined &&
        value.trim().length > field.maxLength);

    if (shouldValidateNow) {
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

    const field = getField(name);

    if (!field) return;

    const error = field.validate(values[name] ?? "");

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

    if (isSubmitting) return;

    setSubmitError("");
    setShowSuccessPopup(false);

    const nextErrors: Record<string, string> = {};

    /*
      Validate every field.
    */
    fields.forEach((field) => {
      nextErrors[field.name] =
        field.validate(values[field.name] ?? "");
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

    /*
      Build a clean payload: sanitised, trimmed, length-capped.
      Nothing raw from the DOM is forwarded.
    */
    const payload = Object.fromEntries(
      fields.map((field) => {
        const clean = sanitizeInput(
          values[field.name] ?? ""
        ).trim();

        return [
          field.name,
          field.maxLength
            ? clean.slice(0, field.maxLength)
            : clean,
        ];
      })
    );

    setIsSubmitting(true);

    /*
      Abort the request if the network hangs, so the user
      always gets an answer instead of an endless spinner.
    */
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      15000
    );

    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.onLine === false
      ) {
        throw new Error(
          "You appear to be offline. Please check your connection and try again."
        );
      }

      const response = await fetch(
        "/api/contact",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },

          body: JSON.stringify(payload),
          signal: controller.signal,
        }
      );

      /*
        The server may return HTML (proxy error page), an empty
        body, or malformed JSON. Parse defensively - a parse
        failure must never be mistaken for success.
      */
      const rawBody = await response.text();

      let result: { success?: boolean; message?: string } | null =
        null;

      if (rawBody) {
        try {
          result = JSON.parse(rawBody);
        } catch {
          result = null;
        }
      }

      if (!response.ok) {
        throw new Error(
          result?.message ||
            `Your enquiry could not be sent (error ${response.status}). Please try again or email us directly.`
        );
      }

      if (!result || result.success !== true) {
        throw new Error(
          result?.message ||
            "We could not confirm that your enquiry was received. Please try again or email us directly."
        );
      }

      /*
        Successful submission - only reached on an explicit
        ok + success:true response.
      */
      setValues(emptyValues);
      setErrors({});
      setTouched({});

      setShowSuccessPopup(true);

    } catch (error) {
      console.error(
        "Contact form submission error:",
        error
      );

      /*
        Never show the success popup on failure.
      */
      setShowSuccessPopup(false);

      let message =
        "Something went wrong while sending your enquiry. Please try again.";

      if (error instanceof DOMException && error.name === "AbortError") {
        message =
          "The request timed out. Please check your connection and try again.";
      } else if (error instanceof TypeError) {
        message =
          "Network error - your enquiry was not sent. Please check your connection and try again.";
      } else if (error instanceof Error && error.message) {
        message = error.message;
      }

      setSubmitError(message);
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };


  /* ===================================================
     JSX
     All values below are rendered as text by React.
     No dangerouslySetInnerHTML is used anywhere, so any
     markup a user types is shown literally, never executed.
  =================================================== */

  return (
    <>
      <section
        id="contact"
        className="bg-[#EAF1F1]"
      >
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 pt-6 sm:pt-8 lg:pt-10 pb-16 sm:pb-20">

          {/* ===========================
              HEADING
          ============================ */}

          <Reveal className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2
              className="font-bold leading-[1.05] tracking-tight text-gray-900"
              style={{
                fontSize:
                  "clamp(2rem, 5vw, 3.5rem)",
              }}
            >
              Contact Us
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
                href="https://www.google.com/maps/search/?api=1&query=B-348%2C%20Industrial%20Estate%20Gokul%20Rd%2C%20Industrial%20Estate%2C%20Hubballi%2C%20Karnataka%20580030%2C%20India"
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
                  Industrial Estate, Hubballi,
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


                      {/* INPUT / SELECT */}

                      {field.options ? (
                        <select
                          ref={(el) => {
                            fieldRefs.current[field.name] = el;
                          }}
                          id={`field-${field.name}`}
                          value={
                            values[field.name]
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
                        >
                          <option value="" disabled>
                            {field.placeholder ??
                              `Select ${field.label.toLowerCase()}`}
                          </option>

                          {field.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      ) : (
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
                          /*
                            Hard cap only. The softer limit is
                            reported as a validation message.
                          */
                          maxLength={
                            field.hardLimit ?? field.maxLength
                          }
                          placeholder={field.placeholder}
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
                      )}


                      {/* ERROR */}

                      {errors[field.name] && (
                        <span
                          id={`error-${field.name}`}
                          className="text-[12px] text-red-500 break-words"
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
                    BACKEND / NETWORK ERROR
                ============================ */}

                {submitError && (
                  <p
                    className="mt-4 text-[13px] text-red-500 break-words"
                    role="alert"
                    aria-live="assertive"
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
            src="https://www.google.com/maps?q=B-348,%20Industrial%20Estate%20Gokul%20Rd,%20Industrial%20Estate,%20Hubballi,%20Karnataka%20580030%2C%20India&output=embed"
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