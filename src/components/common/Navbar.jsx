import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Sun,
  Moon,
  LogOut,
  ChevronDown,
  PhoneCall,
  LayoutDashboard,
  ShieldCheck,
  Smartphone
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { toggleTheme } from "../../redux/slices/themeSlice";
import { logout } from "../../redux/slices/authSlice";
import { SearchBox } from "../product/SearchBox";
import { formatCurrency } from "../../utils/formatters";
import { ReactNativeModal } from "./ReactNativeModal";

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [rnModalOpen, setRnModalOpen] = useState(false);
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const cartQuantity = useAppSelector((state) => state.cart.totalQuantity);
  const cartTotal = useAppSelector((state) => state.cart.totalPrice);
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const handleLogout = () => {
    dispatch(logout());
    setUserDropdownOpen(false);
    navigate("/login");
  };
  return /* @__PURE__ */ React.createElement(
    React.Fragment,
    null,
    /* @__PURE__ */ React.createElement(
      "header",
      { className: "sticky top-0 z-40 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 transition-colors shadow-sm" },
      /* @__PURE__ */ React.createElement("div", { className: "hidden md:block bg-slate-900 text-slate-300 text-xs py-2 px-4 sm:px-8 border-b border-slate-800" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto flex items-center justify-between" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-6" }, /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1.5 text-emerald-400 font-medium" }, /* @__PURE__ */ React.createElement(ShieldCheck, { className: "w-4 h-4" }), " 100% Certified Organic & Eco-Friendly Marketplace"), /* @__PURE__ */ React.createElement("span", { className: "flex items-center gap-1" }, /* @__PURE__ */ React.createElement(PhoneCall, { className: "w-3.5 h-3.5" }), " Support: +1 (800) 555-ECOB")), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4" }, /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => dispatch(toggleTheme()),
          className: "flex items-center gap-1.5 hover:text-white transition-colors"
        },
        darkMode ? /* @__PURE__ */ React.createElement(Sun, { className: "w-3.5 h-3.5 text-amber-400" }) : /* @__PURE__ */ React.createElement(Moon, { className: "w-3.5 h-3.5" }),
        /* @__PURE__ */ React.createElement("span", null, darkMode ? "Light Mode" : "Dark Mode")
      ),
      /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setRnModalOpen(true),
          className: "flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30 font-bold transition-all"
        },
        /* @__PURE__ */ React.createElement(Smartphone, { className: "w-3.5 h-3.5 text-emerald-400" }),
        /* @__PURE__ */ React.createElement("span", null, "📱 React Native App (Expo)")
      ),
      isAuthenticated && user?.role === "admin" && /* @__PURE__ */ React.createElement(
        Link,
        {
          to: "/admin/dashboard",
          className: "flex items-center gap-1 text-emerald-400 font-bold hover:underline"
        },
        /* @__PURE__ */ React.createElement(LayoutDashboard, { className: "w-3.5 h-3.5" }),
        " Admin Dashboard"
      )))), /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4" }, /* @__PURE__ */ React.createElement(Link, { to: "/", className: "flex items-center gap-2.5 shrink-0 group" }, /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white font-extrabold text-xl shadow-md group-hover:scale-105 transition-transform" }, "E"), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ React.createElement("span", { className: "text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 transition-colors" }, "Eco", /* @__PURE__ */ React.createElement("span", { className: "text-emerald-600 dark:text-emerald-400" }, "Bazar")), /* @__PURE__ */ React.createElement("span", { className: "text-[10px] font-semibold text-slate-400 tracking-widest uppercase -mt-1" }, "Organic Shop"))), /* @__PURE__ */ React.createElement("div", { className: "hidden md:flex flex-1 max-w-xl mx-4" }, /* @__PURE__ */ React.createElement(SearchBox, null)), /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-3" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => dispatch(toggleTheme()),
      className: "md:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
    },
    darkMode ? /* @__PURE__ */ React.createElement(Sun, { className: "w-5 h-5 text-amber-400" }) : /* @__PURE__ */ React.createElement(Moon, { className: "w-5 h-5" })
  ), /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/wishlist",
      className: "relative p-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors",
      title: "Wishlist"
    },
    /* @__PURE__ */ React.createElement(Heart, { className: "w-5 h-5" }),
    wishlistItems.length > 0 && /* @__PURE__ */ React.createElement("span", { className: "absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center" }, wishlistItems.length)
  ), /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/cart",
      className: "flex items-center gap-3 p-2 sm:px-3.5 sm:py-2 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
    },
    /* @__PURE__ */ React.createElement("div", { className: "relative" }, /* @__PURE__ */ React.createElement(ShoppingBag, { className: "w-5 h-5" }), cartQuantity > 0 && /* @__PURE__ */ React.createElement("span", { className: "absolute -top-2 -right-2 w-4 h-4 bg-emerald-600 text-white text-[9px] font-bold rounded-full flex items-center justify-center" }, cartQuantity)),
    /* @__PURE__ */ React.createElement("div", { className: "hidden lg:flex flex-col text-left" }, /* @__PURE__ */ React.createElement("span", { className: "text-[10px] uppercase font-semibold text-emerald-600 dark:text-emerald-400 leading-tight" }, "Shopping Cart"), /* @__PURE__ */ React.createElement("span", { className: "text-xs font-bold text-slate-900 dark:text-slate-100" }, formatCurrency(cartTotal)))
  ), /* @__PURE__ */ React.createElement("div", { className: "relative" }, isAuthenticated ? /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setUserDropdownOpen(!userDropdownOpen),
      className: "flex items-center gap-2 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
    },
    /* @__PURE__ */ React.createElement(
      "img",
      {
        src: user?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
        alt: user?.name,
        className: "w-8 h-8 rounded-xl object-cover"
      }
    ),
    /* @__PURE__ */ React.createElement("span", { className: "hidden xl:inline text-xs font-bold text-slate-800 dark:text-slate-200" }, user?.name?.split(" ")[0]),
    /* @__PURE__ */ React.createElement(ChevronDown, { className: "w-3.5 h-3.5 text-slate-400" })
  ), userDropdownOpen && /* @__PURE__ */ React.createElement(
    "div",
    {
      onClick: () => setUserDropdownOpen(false),
      className: "absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-soft-lg py-2 z-50 animate-in fade-in slide-in-from-top-2"
    },
    /* @__PURE__ */ React.createElement("div", { className: "px-4 py-2 border-b border-slate-100 dark:border-slate-800" }, /* @__PURE__ */ React.createElement("p", { className: "text-xs font-bold text-slate-900 dark:text-slate-100" }, user?.name), /* @__PURE__ */ React.createElement("p", { className: "text-[11px] text-slate-500 truncate" }, user?.email)),
    user?.role === "admin" && /* @__PURE__ */ React.createElement(
      Link,
      {
        to: "/admin/dashboard",
        className: "flex items-center gap-2.5 px-4 py-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:bg-slate-50 dark:hover:bg-slate-800"
      },
      /* @__PURE__ */ React.createElement(LayoutDashboard, { className: "w-4 h-4" }),
      " Admin Dashboard"
    ),
    /* @__PURE__ */ React.createElement(
      Link,
      {
        to: "/user/profile",
        className: "flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
      },
      /* @__PURE__ */ React.createElement(User, { className: "w-4 h-4" }),
      " My Profile"
    ),
    /* @__PURE__ */ React.createElement(
      Link,
      {
        to: "/user/orders",
        className: "flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800"
      },
      /* @__PURE__ */ React.createElement(ShoppingBag, { className: "w-4 h-4" }),
      " My Orders"
    ),
    /* @__PURE__ */ React.createElement(
      "button",
      {
        onClick: handleLogout,
        className: "w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 text-left mt-1 border-t border-slate-100 dark:border-slate-800"
      },
      /* @__PURE__ */ React.createElement(LogOut, { className: "w-4 h-4" }),
      " Logout"
    )
  )) : /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/login",
      className: "inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
    },
    /* @__PURE__ */ React.createElement(User, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Login")
  )), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setMobileMenuOpen(!mobileMenuOpen),
      className: "md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
    },
    mobileMenuOpen ? /* @__PURE__ */ React.createElement(X, { className: "w-6 h-6" }) : /* @__PURE__ */ React.createElement(Menu, { className: "w-6 h-6" })
  ))), /* @__PURE__ */ React.createElement("nav", { className: "hidden md:block bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200/60 dark:border-slate-800/60" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-8 py-3" }, /* @__PURE__ */ React.createElement(Link, { to: "/", className: "hover:text-emerald-600 transition-colors" }, "Home"), /* @__PURE__ */ React.createElement(Link, { to: "/shop", className: "hover:text-emerald-600 transition-colors" }, "Shop All"), /* @__PURE__ */ React.createElement(Link, { to: "/categories", className: "hover:text-emerald-600 transition-colors" }, "Categories"), /* @__PURE__ */ React.createElement(Link, { to: "/offers", className: "hover:text-emerald-600 transition-colors text-amber-600 dark:text-amber-400" }, "Special Offers"), /* @__PURE__ */ React.createElement(Link, { to: "/about", className: "hover:text-emerald-600 transition-colors" }, "About Us"), /* @__PURE__ */ React.createElement(Link, { to: "/contact", className: "hover:text-emerald-600 transition-colors" }, "Contact"), /* @__PURE__ */ React.createElement(Link, { to: "/faq", className: "hover:text-emerald-600 transition-colors" }, "FAQ")), /* @__PURE__ */ React.createElement("div", { className: "text-slate-500 font-medium" }, "Fast 24-48h Delivery Available"))), mobileMenuOpen && /* @__PURE__ */ React.createElement("div", { className: "md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 flex flex-col gap-4 animate-in slide-in-from-top duration-200" }, /* @__PURE__ */ React.createElement(SearchBox, null), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-2 pt-2 text-sm font-semibold text-slate-800 dark:text-slate-200" }, /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/",
      onClick: () => setMobileMenuOpen(false),
      className: "px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
    },
    "Home"
  ), /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/shop",
      onClick: () => setMobileMenuOpen(false),
      className: "px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
    },
    "Shop"
  ), /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/categories",
      onClick: () => setMobileMenuOpen(false),
      className: "px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
    },
    "Categories"
  ), /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/offers",
      onClick: () => setMobileMenuOpen(false),
      className: "px-3 py-2 rounded-xl text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/20"
    },
    "Special Offers"
  ), /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/about",
      onClick: () => setMobileMenuOpen(false),
      className: "px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
    },
    "About Us"
  ), /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/contact",
      onClick: () => setMobileMenuOpen(false),
      className: "px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
    },
    "Contact"
  ), /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/faq",
      onClick: () => setMobileMenuOpen(false),
      className: "px-3 py-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
    },
    "FAQ"
  ), isAuthenticated && user?.role === "admin" && /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/admin/dashboard",
      onClick: () => setMobileMenuOpen(false),
      className: "px-3 py-2 rounded-xl text-emerald-600 font-bold hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
    },
    "Admin Dashboard"
  )))),
  /* @__PURE__ */ React.createElement(ReactNativeModal, {
    isOpen: rnModalOpen,
    onClose: () => setRnModalOpen(false)
  })
  );
};
