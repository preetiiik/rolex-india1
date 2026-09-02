import { ArrowRight } from "lucide-react";

interface RollButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "dark" | "orange" | "outline";
  size?: "sm" | "md";
  className?: string;
  type?: "button" | "submit";
}

export default function RollButton({
  text,
  onClick,
  variant = "dark",
  size = "md",
  className = "",
  type = "button",
}: RollButtonProps) {
  const bg =
    variant === "dark"
      ? "bg-gray-900 text-white"
      : variant === "orange"
      ? "bg-[#F26522] hover:bg-[#e05a1a] text-white"
      : "bg-white text-gray-900 border border-gray-200";

  const arrowWrap =
    variant === "orange"
      ? "text-[#F26522]"
      : variant === "outline"
      ? "text-gray-900"
      : "text-gray-900";

  const pad = size === "sm" ? "pl-4 pr-1.5 py-1.5" : "pl-5 sm:pl-6 pr-2 py-2";
  const circle = size === "sm" ? "w-6 h-6" : "w-7 h-7 sm:w-8 sm:h-8";
  const fontSize = size === "sm" ? "text-xs" : "text-[13px] sm:text-sm";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`group inline-flex items-center gap-3 rounded-full ${bg} ${pad} ${fontSize} font-medium transition-colors duration-300 ${className}`}
    >
      <span className="overflow-hidden h-[18px] sm:h-[20px]">
        <span
          className="flex flex-col transition-transform duration-500 group-hover:-translate-y-1/2"
          style={{ transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)" }}
        >
          <span className="leading-[18px] sm:leading-[20px] block whitespace-nowrap">{text}</span>
          <span className="leading-[18px] sm:leading-[20px] block whitespace-nowrap">{text}</span>
        </span>
      </span>
      <span
        className={`relative flex items-center justify-center ${circle} rounded-full bg-white flex-shrink-0`}
      >
        <ArrowRight
          size={size === "sm" ? 12 : 14}
          className={`${arrowWrap} transition-transform duration-500 group-hover:-rotate-45`}
          style={{ transitionTimingFunction: "cubic-bezier(0.25,0.1,0.25,1)" }}
        />
      </span>
    </button>
  );
}
