import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Truck, RefreshCw, Headphones } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
const SLIDES = [
  {
    id: 1,
    title: "Fresh & Healthy Organic Food",
    subtitle: "Sale up to 30% OFF",
    description: "Free shipping on all your orders over $50. Certified organic, locally sourced produce delivered right to your door.",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1200&q=80",
    buttonText: "Shop Now",
    tag: "100% Organic Guaranteed",
    badgeBg: "bg-emerald-500"
  },
  {
    id: 2,
    title: "Sustainable Eco-Friendly Living",
    subtitle: "New Summer Collection",
    description: "Upgrade your lifestyle with zero-waste home essentials, recycled apparel, and bamboo tech gadgets.",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80",
    buttonText: "Explore Collection",
    tag: "Zero Waste Tech & Apparel",
    badgeBg: "bg-amber-500"
  }
];
export const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 6e3);
    return () => clearInterval(timer);
  }, []);
  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  };
  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  };
  const slide = SLIDES[currentSlide];
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "relative w-full rounded-3xl overflow-hidden bg-emerald-950 text-white min-h-[420px] md:min-h-[480px] flex items-center shadow-soft-lg" }, /* @__PURE__ */ React.createElement(AnimatePresence, { mode: "wait" }, /* @__PURE__ */ React.createElement(
    motion.div,
    {
      key: slide.id,
      initial: { opacity: 0, scale: 1.05 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { duration: 0.6 },
      className: "absolute inset-0 z-0"
    },
    /* @__PURE__ */ React.createElement(
      "img",
      {
        src: slide.image,
        alt: slide.title,
        className: "w-full h-full object-cover opacity-35"
      }
    ),
    /* @__PURE__ */ React.createElement("div", { className: "absolute inset-0 bg-gradient-to-r from-emerald-950/90 via-emerald-950/60 to-transparent" })
  )), /* @__PURE__ */ React.createElement("div", { className: "relative z-10 max-w-2xl p-6 sm:p-12 md:p-16 flex flex-col items-start gap-4" }, /* @__PURE__ */ React.createElement("span", { className: "inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30" }, slide.tag), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-400 font-bold text-sm sm:text-base" }, slide.subtitle), /* @__PURE__ */ React.createElement("h1", { className: "text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight" }, slide.title), /* @__PURE__ */ React.createElement("p", { className: "text-slate-200 text-sm sm:text-base max-w-lg leading-relaxed" }, slide.description), /* @__PURE__ */ React.createElement("div", { className: "pt-2" }, /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/shop",
      className: "inline-flex items-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm rounded-xl shadow-lg transition-all duration-300 hover:gap-3"
    },
    /* @__PURE__ */ React.createElement("span", null, slide.buttonText),
    /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-4 h-4" })
  ))), /* @__PURE__ */ React.createElement("div", { className: "absolute bottom-6 right-6 z-20 flex items-center gap-2" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handlePrev,
      className: "p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-colors"
    },
    /* @__PURE__ */ React.createElement(ChevronLeft, { className: "w-5 h-5" })
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleNext,
      className: "p-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/10 transition-colors"
    },
    /* @__PURE__ */ React.createElement(ChevronRight, { className: "w-5 h-5" })
  ))), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-soft" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-xl" }, /* @__PURE__ */ React.createElement(Truck, { className: "w-6 h-6" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h5", { className: "text-sm font-bold text-slate-900 dark:text-slate-100" }, "Free Shipping"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 dark:text-slate-400" }, "Free shipping on all orders $50+"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-soft" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-xl" }, /* @__PURE__ */ React.createElement(Headphones, { className: "w-6 h-6" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h5", { className: "text-sm font-bold text-slate-900 dark:text-slate-100" }, "Customer Support"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 dark:text-slate-400" }, "Instant assistance 24/7"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-soft" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-xl" }, /* @__PURE__ */ React.createElement(ShieldCheck, { className: "w-6 h-6" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h5", { className: "text-sm font-bold text-slate-900 dark:text-slate-100" }, "100% Secure Payment"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 dark:text-slate-400" }, "Encrypted transaction gateway"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3 p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-soft" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 rounded-xl" }, /* @__PURE__ */ React.createElement(RefreshCw, { className: "w-6 h-6" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h5", { className: "text-sm font-bold text-slate-900 dark:text-slate-100" }, "Money-Back Guarantee"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 dark:text-slate-400" }, "30 days return policy")))));
};
