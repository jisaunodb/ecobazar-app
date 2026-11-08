import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
export const CategoryCard = ({ category }) => {
  return /* @__PURE__ */ React.createElement(
    Link,
    {
      to: `/shop?category=${encodeURIComponent(category.name)}`,
      className: "group relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 hover:border-emerald-500/50 hover:shadow-soft transition-all duration-300 flex items-center gap-4"
    },
    /* @__PURE__ */ React.createElement("div", { className: "relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0" }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: category.image,
        alt: category.name,
        className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      }
    )),
    /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("h4", { className: "text-sm font-bold text-slate-900 dark:text-slate-100 truncate group-hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors" }, category.name), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5" }, category.productCount, " Products")),
    /* @__PURE__ */ React.createElement("div", { className: "p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-emerald-600 group-hover:text-white transition-all" }, /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-4 h-4" }))
  );
};
