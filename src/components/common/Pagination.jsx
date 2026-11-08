import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  return /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-center gap-2 my-6" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => onPageChange(currentPage - 1),
      disabled: currentPage === 1,
      className: "p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
    },
    /* @__PURE__ */ React.createElement(ChevronLeft, { className: "w-4 h-4" })
  ), pages.map((page) => /* @__PURE__ */ React.createElement(
    "button",
    {
      key: page,
      onClick: () => onPageChange(page),
      className: `w-9 h-9 text-xs font-bold rounded-xl transition-all ${currentPage === page ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/30" : "border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`
    },
    page
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => onPageChange(currentPage + 1),
      disabled: currentPage === totalPages,
      className: "p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 disabled:opacity-40 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
    },
    /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-4 h-4" })
  ));
};
