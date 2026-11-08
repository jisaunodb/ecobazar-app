import React from "react";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { ProductCard } from "../../components/product/ProductCard";
import { useAppSelector } from "../../redux/hooks";
import { Flame } from "lucide-react";
export const OffersPage = () => {
  const products = useAppSelector((state) => state.products.products);
  const discountedProducts = products.filter((p) => p.discountPercentage && p.discountPercentage > 0);
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-6 pb-12" }, /* @__PURE__ */ React.createElement(Breadcrumb, { items: [{ label: "Special Offers" }] }), /* @__PURE__ */ React.createElement("div", { className: "bg-gradient-to-r from-amber-500 to-emerald-600 text-white rounded-3xl p-8 shadow-soft flex flex-col gap-2" }, /* @__PURE__ */ React.createElement("span", { className: "inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase w-max" }, /* @__PURE__ */ React.createElement(Flame, { className: "w-4 h-4 fill-white" }), " Hot Deals & Discounts"), /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-black" }, "Special Organic Offers"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-white/90 max-w-lg" }, "Save big on selected organic produce, artisanal breads, raw oils, and sustainable gear. Limited time deals updated daily!")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4" }, discountedProducts.map((prod) => /* @__PURE__ */ React.createElement(ProductCard, { key: prod._id, product: prod }))));
};
