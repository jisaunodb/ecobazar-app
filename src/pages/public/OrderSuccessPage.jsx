import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ShoppingBag, ArrowRight } from "lucide-react";
import { useAppSelector } from "../../redux/hooks";
export const OrderSuccessPage = () => {
  const currentOrder = useAppSelector((state) => state.orders.currentOrder);
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-[75vh] flex items-center justify-center py-12 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-soft flex flex-col items-center text-center gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-3xl flex items-center justify-center" }, /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-10 h-10" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest" }, "Order Confirmed!"), /* @__PURE__ */ React.createElement("h1", { className: "text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-1" }, "Thank You For Your Purchase"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 dark:text-slate-400 mt-2" }, "Your organic order ", /* @__PURE__ */ React.createElement("strong", { className: "text-slate-800 dark:text-slate-200" }, "#", currentOrder?._id || "ORD-1001"), " has been placed and is now being freshly packed.")), /* @__PURE__ */ React.createElement("div", { className: "w-full p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300 flex flex-col gap-2" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", null, "Payment Status:"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-emerald-600" }, "PAID")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", null, "Shipping Address:"), /* @__PURE__ */ React.createElement("span", { className: "font-semibold text-right" }, currentOrder?.shippingAddress?.street || "742 Evergreen Terrace")), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", null, "Estimated Delivery:"), /* @__PURE__ */ React.createElement("span", { className: "font-bold" }, "24 - 48 Hours"))), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col sm:flex-row gap-3 w-full" }, /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/user/orders",
      className: "flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
    },
    /* @__PURE__ */ React.createElement(ShoppingBag, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Track Order")
  ), /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/shop",
      className: "flex-1 py-3 px-4 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
    },
    /* @__PURE__ */ React.createElement("span", null, "Back to Store"),
    /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-4 h-4" })
  ))));
};
