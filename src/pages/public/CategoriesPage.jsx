import React from "react";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { CategoryCard } from "../../components/product/CategoryCard";
import { useAppSelector } from "../../redux/hooks";
export const CategoriesPage = () => {
  const categories = useAppSelector((state) => state.products.categories);
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-6 pb-12" }, /* @__PURE__ */ React.createElement(Breadcrumb, { items: [{ label: "Categories" }] }), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-black text-slate-900 dark:text-slate-100" }, "Product Categories"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-1" }, "Explore our wide selection of certified organic groceries, farm fresh produce, and eco-friendly products.")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" }, categories.map((category) => /* @__PURE__ */ React.createElement(CategoryCard, { key: category._id, category }))));
};
