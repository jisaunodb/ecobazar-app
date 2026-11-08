import React, { forwardRef } from "react";
export const Input = forwardRef(
  ({ label, error, helperText, leftIcon, rightIcon, className = "", ...props }, ref) => {
    return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-1.5 w-full" }, label && /* @__PURE__ */ React.createElement("label", { className: "text-xs font-semibold uppercase text-slate-700 dark:text-slate-300" }, label), /* @__PURE__ */ React.createElement("div", { className: "relative flex items-center" }, leftIcon && /* @__PURE__ */ React.createElement("div", { className: "absolute left-3.5 text-slate-400 pointer-events-none" }, leftIcon), /* @__PURE__ */ React.createElement(
      "input",
      {
        ref,
        className: `w-full rounded-2xl border bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 placeholder:text-slate-400 ${leftIcon ? "pl-10" : "pl-3.5"} ${rightIcon ? "pr-10" : "pr-3.5"} ${error ? "border-rose-500 focus:ring-rose-500/20" : "border-slate-200 dark:border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/20"} py-3 ${className}`,
        ...props
      }
    ), rightIcon && /* @__PURE__ */ React.createElement("div", { className: "absolute right-3.5 text-slate-400" }, rightIcon)), error ? /* @__PURE__ */ React.createElement("span", { className: "text-[11px] font-semibold text-rose-500" }, error) : helperText ? /* @__PURE__ */ React.createElement("span", { className: "text-[11px] text-slate-400" }, helperText) : null);
  }
);
Input.displayName = "Input";
