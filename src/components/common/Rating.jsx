import React from "react";
import { Star } from "lucide-react";
export const Rating = ({ value, max = 5, size = "sm", showValue = true }) => {
  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-5 h-5"
  };
  return /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-1" }, Array.from({ length: max }).map((_, index) => {
    const fillAmount = Math.min(Math.max(value - index, 0), 1);
    return /* @__PURE__ */ React.createElement("div", { key: index, className: "relative inline-block text-slate-300 dark:text-slate-700" }, /* @__PURE__ */ React.createElement(Star, { className: `${iconSizes[size]} fill-current` }), fillAmount > 0 && /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "absolute top-0 left-0 overflow-hidden text-amber-400",
        style: { width: `${fillAmount * 100}%` }
      },
      /* @__PURE__ */ React.createElement(Star, { className: `${iconSizes[size]} fill-current` })
    ));
  }), showValue && /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-slate-700 dark:text-slate-300 ml-1" }, value.toFixed(1)));
};
