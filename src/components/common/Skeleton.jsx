import React from "react";
export const Skeleton = ({ className = "" }) => {
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: `animate-pulse bg-slate-200 dark:bg-slate-800 rounded-2xl ${className}`
    }
  );
};
