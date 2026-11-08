import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, ArrowRight, ShoppingBag, ArrowLeft } from "lucide-react";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { Button } from "../../components/common/Button";
import { formatCurrency } from "../../utils/formatters";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateQuantity, removeFromCart, clearCart } from "../../redux/slices/cartSlice";
export const CartPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const shippingPrice = totalPrice > 50 || cartItems.length === 0 ? 0 : 5;
  const taxPrice = totalPrice * 0.08;
  const grandTotal = totalPrice + shippingPrice + taxPrice;
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-6 pb-12" }, /* @__PURE__ */ React.createElement(Breadcrumb, { items: [{ label: "Shopping Cart" }] }), /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-black text-slate-900 dark:text-slate-100" }, "Your Shopping Cart"), cartItems.length === 0 ? /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center gap-4 shadow-soft" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 rounded-2xl" }, /* @__PURE__ */ React.createElement(ShoppingBag, { className: "w-12 h-12" })), /* @__PURE__ */ React.createElement("h3", { className: "text-xl font-bold text-slate-900 dark:text-slate-100" }, "Your cart is empty"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 max-w-sm" }, "Looks like you haven't added any organic goodies yet. Start exploring our shop!"), /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/shop",
      className: "mt-2 inline-flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-xl font-bold text-xs hover:bg-emerald-700 transition-colors shadow-sm"
    },
    /* @__PURE__ */ React.createElement(ArrowLeft, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Continue Shopping")
  )) : /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8" }, /* @__PURE__ */ React.createElement("div", { className: "lg:col-span-2 flex flex-col gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-soft" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-left text-xs" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-slate-500 border-b border-slate-200 dark:border-slate-800" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "p-4" }, "Product"), /* @__PURE__ */ React.createElement("th", { className: "p-4" }, "Price"), /* @__PURE__ */ React.createElement("th", { className: "p-4" }, "Quantity"), /* @__PURE__ */ React.createElement("th", { className: "p-4" }, "Subtotal"), /* @__PURE__ */ React.createElement("th", { className: "p-4 text-center" }, "Action"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-800" }, cartItems.map((item) => {
    const itemPrice = item.product.discountPrice ?? item.product.price;
    const itemSubtotal = itemPrice * item.quantity;
    return /* @__PURE__ */ React.createElement("tr", { key: item._id, className: "hover:bg-slate-50/50 dark:hover:bg-slate-800/30" }, /* @__PURE__ */ React.createElement("td", { className: "p-4 flex items-center gap-3" }, /* @__PURE__ */ React.createElement(
      "img",
      {
        src: item.product.images[0],
        alt: item.product.name,
        className: "w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0"
      }
    ), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ React.createElement(
      Link,
      {
        to: `/product/${item.product._id}`,
        className: "font-bold text-slate-900 dark:text-slate-100 hover:text-emerald-600 text-sm line-clamp-1"
      },
      item.product.name
    ), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] text-slate-400" }, item.product.category))), /* @__PURE__ */ React.createElement("td", { className: "p-4 font-bold text-slate-800 dark:text-slate-200" }, formatCurrency(itemPrice)), /* @__PURE__ */ React.createElement("td", { className: "p-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-800 w-max" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => dispatch(
          updateQuantity({ id: item._id, quantity: item.quantity - 1 })
        ),
        className: "px-2.5 py-1 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 rounded-l-xl"
      },
      "-"
    ), /* @__PURE__ */ React.createElement("span", { className: "px-3 py-1 font-bold text-slate-900 dark:text-slate-100" }, item.quantity), /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => dispatch(
          updateQuantity({ id: item._id, quantity: item.quantity + 1 })
        ),
        className: "px-2.5 py-1 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 rounded-r-xl"
      },
      "+"
    ))), /* @__PURE__ */ React.createElement("td", { className: "p-4 font-black text-emerald-600 dark:text-emerald-400" }, formatCurrency(itemSubtotal)), /* @__PURE__ */ React.createElement("td", { className: "p-4 text-center" }, /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: () => dispatch(removeFromCart(item._id)),
        className: "p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition-colors"
      },
      /* @__PURE__ */ React.createElement(Trash2, { className: "w-4 h-4" })
    )));
  })))), /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between" }, /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/shop",
      className: "text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
    },
    /* @__PURE__ */ React.createElement(ArrowLeft, { className: "w-4 h-4" }),
    " Continue Shopping"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => dispatch(clearCart()),
      className: "text-xs font-bold text-rose-600 hover:underline"
    },
    "Clear Shopping Cart"
  )))), /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-soft flex flex-col gap-6 h-max" }, /* @__PURE__ */ React.createElement("h3", { className: "text-lg font-black text-slate-900 dark:text-slate-100 pb-4 border-b border-slate-100 dark:border-slate-800" }, "Order Summary"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-3 text-xs font-medium text-slate-600 dark:text-slate-400" }, /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", null, "Subtotal:"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-900 dark:text-slate-100" }, formatCurrency(totalPrice))), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", null, "Shipping:"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-900 dark:text-slate-100" }, shippingPrice === 0 ? /* @__PURE__ */ React.createElement("span", { className: "text-emerald-600" }, "FREE") : formatCurrency(shippingPrice))), /* @__PURE__ */ React.createElement("div", { className: "flex justify-between" }, /* @__PURE__ */ React.createElement("span", null, "Estimated Tax (8%):"), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-900 dark:text-slate-100" }, formatCurrency(taxPrice))), /* @__PURE__ */ React.createElement("div", { className: "pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-base font-black text-slate-900 dark:text-slate-100" }, /* @__PURE__ */ React.createElement("span", null, "Total Amount:"), /* @__PURE__ */ React.createElement("span", { className: "text-emerald-600 dark:text-emerald-400" }, formatCurrency(grandTotal)))), /* @__PURE__ */ React.createElement(
    Button,
    {
      onClick: () => navigate("/checkout"),
      size: "lg",
      className: "w-full mt-2",
      rightIcon: /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-4 h-4" })
    },
    "Proceed to Checkout"
  ))));
};
