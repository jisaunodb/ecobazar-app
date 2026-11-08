import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";
export const Breadcrumb = ({ items }) => {
  return /* @__PURE__ */ React.createElement("nav", { className: "flex items-center text-xs font-semibold text-slate-500 py-3 overflow-x-auto" }, /* @__PURE__ */ React.createElement(Link, { to: "/", className: "flex items-center gap-1 hover:text-emerald-600 shrink-0" }, /* @__PURE__ */ React.createElement(Home, { className: "w-3.5 h-3.5" }), /* @__PURE__ */ React.createElement("span", null, "Home")), items.map((item, index) => /* @__PURE__ */ React.createElement(React.Fragment, { key: index }, /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-3.5 h-3.5 mx-1.5 text-slate-400 shrink-0" }), item.path ? /* @__PURE__ */ React.createElement(Link, { to: item.path, className: "hover:text-emerald-600 shrink-0" }, item.label) : /* @__PURE__ */ React.createElement("span", { className: "text-slate-900 dark:text-slate-100 font-bold shrink-0" }, item.label))));
};
