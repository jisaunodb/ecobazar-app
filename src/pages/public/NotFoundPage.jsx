import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
export const NotFoundPage = () => {
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-[70vh] flex items-center justify-center py-12 px-4 text-center" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-md flex flex-col items-center gap-4" }, /* @__PURE__ */ React.createElement("span", { className: "text-8xl font-black text-emerald-600/20 dark:text-emerald-400/10" }, "404"), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-black text-slate-900 dark:text-slate-100 -mt-8" }, "Page Not Found"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "The page you are looking for might have been removed, had its name changed, or is temporarily unavailable."), /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/",
      className: "mt-2 inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl transition-all shadow-md"
    },
    /* @__PURE__ */ React.createElement(Home, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Back to Homepage")
  )));
};
