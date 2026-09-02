import { useState } from "react";
import RollButton from "./RollButton";

const fields = [
  { name: "entityName", label: "Entity Name", required: true },
  { name: "contactPerson", label: "Contact Person", required: true },
  { name: "email", label: "Email ID", required: true, type: "email" },
  { name: "phone", label: "Phone No.", required: true, type: "tel" },
  { name: "quantity", label: "Quantity Required", required: true },
  { name: "material", label: "Material", required: true },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section id="contact" className="bg-[#F5F5F5] pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28">
      <div className="max-w-[1440px] mx-auto">
        <div className="px-5 sm:px-8 lg:px-12 flex items-center gap-3 mb-6 sm:mb-8">
          <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gray-900 text-white flex items-center justify-center text-[11px] sm:text-xs font-semibold">
            6
          </span>
          <span className="text-xs sm:text-[13px] font-medium border border-gray-300 rounded-full px-3 sm:px-4 py-1 sm:py-1.5">
            Get In Touch
          </span>
        </div>

        <div className="px-5 sm:px-8 lg:px-12">
          <h2
            className="font-medium leading-[1.12] tracking-[-0.02em] text-gray-900 mb-10 sm:mb-14 lg:mb-16"
            style={{ fontSize: "clamp(1.5rem, 4vw, 3.2rem)" }}
          >
            Get In Touch
          </h2>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 lg:p-12 max-w-[820px]"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
              {fields.map((f) => (
                <label key={f.name} className="flex flex-col gap-2">
                  <span className="text-[13px] font-medium text-gray-900">
                    {f.label} {f.required && <span className="text-[#F26522]">*</span>}
                  </span>
                  <input
                    type={f.type ?? "text"}
                    required={f.required}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[14px] text-gray-900 outline-none focus:border-gray-900 transition-colors duration-300"
                  />
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
