import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Flame } from "lucide-react";
export const BannerSection = () => {
  return /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 my-10" }, /* @__PURE__ */ React.createElement("div", { className: "relative overflow-hidden rounded-3xl bg-slate-900 text-white p-6 sm:p-8 flex flex-col justify-between min-h-[220px] shadow-soft" }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=600&q=80",
      alt: "Organic Fruit",
      className: "absolute inset-0 w-full h-full object-cover opacity-25"
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "relative z-10" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold uppercase tracking-wider text-emerald-400" }, "BEST DEAL"), /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold mt-1 mb-2" }, "Sale of the Month: Fresh Organic Apples"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-300" }, "Discount up to 30% on fresh orchard harvests.")), /* @__PURE__ */ React.createElement("div", { className: "relative z-10 pt-4" }, /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/shop",
      className: "inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
    },
    /* @__PURE__ */ React.createElement("span", null, "Shop Now"),
    /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-3.5 h-3.5" })
  ))), /* @__PURE__ */ React.createElement("div", { className: "relative overflow-hidden rounded-3xl bg-emerald-800 text-white p-6 sm:p-8 flex flex-col justify-between min-h-[220px] shadow-soft" }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80",
      alt: "Low price grocery",
      className: "absolute inset-0 w-full h-full object-cover opacity-20"
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "relative z-10" }, /* @__PURE__ */ React.createElement("span", { className: "inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full" }, /* @__PURE__ */ React.createElement(Flame, { className: "w-3 h-3 fill-slate-950" }), " HOT"), /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold mt-2 mb-2" }, "100% Organic Cold Pressed Oils"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-emerald-100" }, "Pure, nutrient-dense pantry essentials.")), /* @__PURE__ */ React.createElement("div", { className: "relative z-10 pt-4" }, /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/shop",
      className: "inline-flex items-center gap-2 text-xs font-bold text-amber-300 hover:text-amber-200"
    },
    /* @__PURE__ */ React.createElement("span", null, "Explore Now"),
    /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-3.5 h-3.5" })
  ))), /* @__PURE__ */ React.createElement("div", { className: "relative overflow-hidden rounded-3xl bg-slate-800 text-white p-6 sm:p-8 flex flex-col justify-between min-h-[220px] shadow-soft" }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80",
      alt: "Eco Tech",
      className: "absolute inset-0 w-full h-full object-cover opacity-25"
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "relative z-10" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold uppercase tracking-wider text-sky-400" }, "NEW ARRIVAL"), /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold mt-1 mb-2" }, "Eco-Friendly Bamboo Audio"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-300" }, "Natural materials paired with high performance sound.")), /* @__PURE__ */ React.createElement("div", { className: "relative z-10 pt-4" }, /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/shop",
      className: "inline-flex items-center gap-2 text-xs font-bold text-sky-400 hover:text-sky-300"
    },
    /* @__PURE__ */ React.createElement("span", null, "View Gadgets"),
    /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-3.5 h-3.5" })
  ))));
};
