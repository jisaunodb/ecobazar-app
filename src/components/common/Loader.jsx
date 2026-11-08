import React from "react";
import { Loader2 } from "lucide-react";
export const Loader = ({ fullScreen = false, text = "Loading..." }) => {
  if (fullScreen) {
    return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-md text-white" }, /* @__PURE__ */ React.createElement(Loader2, { className: "w-10 h-10 animate-spin text-emerald-500 mb-3" }), /* @__PURE__ */ React.createElement("span", { className: "text-sm font-bold tracking-wide" }, text));
  }
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center justify-center p-8 text-slate-500" }, /* @__PURE__ */ React.createElement(Loader2, { className: "w-8 h-8 animate-spin text-emerald-600 mb-2" }), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-semibold" }, text));
};
