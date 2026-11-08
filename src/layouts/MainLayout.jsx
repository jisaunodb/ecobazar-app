import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";
export const MainLayout = () => {
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors" }, /* @__PURE__ */ React.createElement(Navbar, null), /* @__PURE__ */ React.createElement("main", { className: "flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6" }, /* @__PURE__ */ React.createElement(Outlet, null)), /* @__PURE__ */ React.createElement(Footer, null));
};
