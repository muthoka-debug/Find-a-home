import * as React from "react";

import { cn } from "./utils";

type ButtonOptions = { variant?: "default" | "outline" | "ghost"; size?: "icon" | "default" | "sm" };

export const buttonVariants = ({ variant = "default", size = "default" }: ButtonOptions = {}) => {
  const base = "inline-flex items-center justify-center rounded-md text-sm";
  const sizeClass = size === "icon" ? "size-9 p-0" : size === "sm" ? "px-2 py-1 text-sm" : "px-3 py-2";
  const variantClass =
    variant === "outline"
      ? "border border-gray-200 bg-white"
      : variant === "ghost"
      ? "bg-transparent"
      : "bg-teal-500 text-white";

  return `${base} ${sizeClass} ${variantClass}`;
};

export function Button({ className, children, size, ...props }: any & { size?: ButtonOptions["size"] }) {
  return (
    <button className={cn(buttonVariants({ size }), className)} {...props}>
      {children}
    </button>
  );
}

export default Button;
