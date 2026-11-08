import React from "react";
import { Loader2 } from "lucide-react";
export const Button = ({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all rounded-2xl active:scale-[0.98] disabled:opacity-60 disabled:pointer-events-none focus:outline-none";
  const variantStyles = {
    primary: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 hover:shadow-lg hover:shadow-emerald-600/30",
    secondary: "bg-slate-900 hover:bg-slate-800 text-white dark:bg-slate-100 dark:hover:bg-white dark:text-slate-900 shadow-sm",
    outline: "border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80",
    ghost: "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800",
    danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-md shadow-rose-600/20"
  };
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs gap-1.5",
    md: "px-4 py-2.5 text-xs sm:text-sm gap-2",
    lg: "px-6 py-3.5 text-sm sm:text-base gap-2.5"
  };
  return /* @__PURE__ */ React.createElement(
    "button",
    {
      className: `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`,
      disabled: isLoading || disabled,
      ...props
    },
    isLoading ? /* @__PURE__ */ React.createElement(Loader2, { className: "w-4 h-4 animate-spin shrink-0" }) : leftIcon && /* @__PURE__ */ React.createElement("span", { className: "shrink-0" }, leftIcon),
    /* @__PURE__ */ React.createElement("span", null, children),
    !isLoading && rightIcon && /* @__PURE__ */ React.createElement("span", { className: "shrink-0" }, rightIcon)
  );
};
