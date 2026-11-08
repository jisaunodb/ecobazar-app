import React from "react";
import { Link } from "react-router-dom";
import { Heart, ArrowLeft } from "lucide-react";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { ProductCard } from "../../components/product/ProductCard";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { clearWishlist } from "../../redux/slices/wishlistSlice";
export const WishlistPage = () => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-6 pb-12" }, /* @__PURE__ */ React.createElement(Breadcrumb, { items: [{ label: "Wishlist" }] }), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between" }, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-black text-slate-900 dark:text-slate-100" }, "My Wishlist"), wishlistItems.length > 0 && /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => dispatch(clearWishlist()),
      className: "text-xs font-bold text-rose-600 hover:underline"
    },
    "Clear Wishlist"
  )), wishlistItems.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center gap-4 shadow-soft" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-rose-50 dark:bg-rose-950 text-rose-600 rounded-2xl" }, /* @__PURE__ */ React.createElement(Heart, { className: "w-12 h-12" })), /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold text-slate-900 dark:text-slate-100" }, "Your wishlist is empty"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 max-w-sm" }, "Save items you love by clicking the heart icon while browsing our store!"), /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/shop",
      className: "mt-2 inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-700 transition-colors shadow-sm"
    },
    /* @__PURE__ */ React.createElement(ArrowLeft, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Explore Products")
  )) : /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5" }, wishlistItems.map((prod) => /* @__PURE__ */ React.createElement(ProductCard, { key: prod._id, product: prod }))));
};
