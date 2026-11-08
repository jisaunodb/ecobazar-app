import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Flame, Sparkles, Leaf } from "lucide-react";
import { HeroSlider } from "../../components/product/HeroSlider";
import { CategoryCard } from "../../components/product/CategoryCard";
import { ProductCard } from "../../components/product/ProductCard";
import { BannerSection } from "../../components/product/BannerSection";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProducts } from "../../redux/slices/productSlice";
export const Home = () => {
  const dispatch = useAppDispatch();
  const { products, categories, isLoading } = useAppSelector((state) => state.products);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 8);
  const newArrivals = products.filter((p) => p.isNewArrival).slice(0, 4);
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-12 pb-12" }, /* @__PURE__ */ React.createElement(HeroSlider, null), /* @__PURE__ */ React.createElement("section", { className: "flex flex-col gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Leaf, { className: "w-3.5 h-3.5" }), " Organic Marketplace"), /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-black text-slate-900 dark:text-slate-100" }, "Popular Categories")), /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/categories",
      className: "text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
    },
    /* @__PURE__ */ React.createElement("span", null, "View All"),
    /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-4 h-4" })
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" }, categories.map((cat) => /* @__PURE__ */ React.createElement(CategoryCard, { key: cat._id, category: cat })))), /* @__PURE__ */ React.createElement("section", { className: "flex flex-col gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Sparkles, { className: "w-3.5 h-3.5 text-amber-500" }), " Daily Fresh Selections"), /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-black text-slate-900 dark:text-slate-100" }, "Featured Organic Products")), /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/shop",
      className: "text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
    },
    /* @__PURE__ */ React.createElement("span", null, "Browse Shop"),
    /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-4 h-4" })
  )), isLoading ? /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4" }, [1, 2, 3, 4].map((n) => /* @__PURE__ */ React.createElement("div", { key: n, className: "h-64 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" }))) : /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5" }, featuredProducts.map((prod) => /* @__PURE__ */ React.createElement(ProductCard, { key: prod._id, product: prod })))), /* @__PURE__ */ React.createElement(BannerSection, null), /* @__PURE__ */ React.createElement("section", { className: "flex flex-col gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1" }, /* @__PURE__ */ React.createElement(Flame, { className: "w-3.5 h-3.5 fill-amber-500" }), " Fresh Harvest"), /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-black text-slate-900 dark:text-slate-100" }, "Just Arrived This Week")), /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/shop",
      className: "text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
    },
    /* @__PURE__ */ React.createElement("span", null, "See All New"),
    /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-4 h-4" })
  )), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5" }, newArrivals.map((prod) => /* @__PURE__ */ React.createElement(ProductCard, { key: prod._id, product: prod })))), /* @__PURE__ */ React.createElement("section", { className: "bg-emerald-900 text-white rounded-3xl p-8 sm:p-12 shadow-soft flex flex-col md:flex-row items-center justify-between gap-8" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-xl flex flex-col gap-3" }, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-extrabold uppercase tracking-widest text-emerald-400" }, "Certified Organic Standards"), /* @__PURE__ */ React.createElement("h3", { className: "text-2xl sm:text-3xl font-black leading-tight" }, "Freshness directly from eco-friendly local farms to your door"), /* @__PURE__ */ React.createElement("p", { className: "text-xs sm:text-sm text-emerald-100/80 leading-relaxed" }, "Every item on EcoBazar undergoes strict quality testing. Enjoy organic, pesticide-free vegetables, fruits, cold pressed oils, and eco-tech gadgets with peace of mind.")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row gap-4 shrink-0" }, /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/shop",
      className: "px-6 py-3.5 bg-white text-slate-900 hover:bg-slate-100 font-bold text-xs rounded-2xl shadow-lg transition-all text-center"
    },
    "Start Shopping Now"
  ), /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/about",
      className: "px-6 py-3.5 bg-emerald-800 text-white border border-emerald-700 hover:bg-emerald-700 font-bold text-xs rounded-2xl transition-all text-center"
    },
    "Learn Our Mission"
  ))));
};
