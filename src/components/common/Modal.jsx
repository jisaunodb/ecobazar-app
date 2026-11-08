import React, { useEffect } from "react";
import { X } from "lucide-react";
export const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  if (!isOpen) return null;
  return /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]",
      onClick: (e) => e.stopPropagation()
    },
    /* @__PURE__ */ React.createElement("div", { className: "p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between" }, /* @__PURE__ */ React.createElement("h3", { className: "text-base font-black text-slate-900 dark:text-slate-100" }, title), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: onClose,
        className: "p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-all"
      },
      /* @__PURE__ */ React.createElement(X, { className: "w-5 h-5" })
    )),
    /* @__PURE__ */ React.createElement("div", { className: "p-6 overflow-y-auto" }, children)
  ));
};
