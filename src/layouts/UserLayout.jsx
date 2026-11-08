import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { User, ShoppingBag, MapPin, KeyRound, Heart, LogOut } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/slices/authSlice";
import { Navbar } from "../components/common/Navbar";
import { Footer } from "../components/common/Footer";
const USER_NAV = [
  { name: "Profile Overview", path: "/user/profile", icon: User },
  { name: "My Orders", path: "/user/orders", icon: ShoppingBag },
  { name: "Address Book", path: "/user/addresses", icon: MapPin },
  { name: "My Wishlist", path: "/wishlist", icon: Heart },
  { name: "Change Password", path: "/user/change-password", icon: KeyRound }
];
export const UserLayout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors" }, /* @__PURE__ */ React.createElement(Navbar, null), /* @__PURE__ */ React.createElement("main", { className: "flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8" }, /* @__PURE__ */ React.createElement("div", { className: "flex flex-col md:flex-row gap-8" }, /* @__PURE__ */ React.createElement("aside", { className: "w-full md:w-64 shrink-0" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-soft flex flex-col gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4 pb-6 border-b border-slate-100 dark:border-slate-800" }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: user?.avatar || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
      alt: user?.name,
      className: "w-14 h-14 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col" }, /* @__PURE__ */ React.createElement("h3", { className: "text-base font-extrabold text-slate-900 dark:text-slate-100" }, user?.name), /* @__PURE__ */ React.createElement("span", { className: "text-xs text-slate-500 truncate max-w-[140px]" }, user?.email))), /* @__PURE__ */ React.createElement("nav", { className: "flex flex-col gap-1.5" }, USER_NAV.map((item) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;
    return /* @__PURE__ */ React.createElement(
      Link,
      {
        key: item.path,
        to: item.path,
        className: `flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${isActive ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`
      },
      /* @__PURE__ */ React.createElement(Icon, { className: "w-4 h-4" }),
      /* @__PURE__ */ React.createElement("span", null, item.name)
    );
  }), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => dispatch(logout()),
      className: "flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors mt-2"
    },
    /* @__PURE__ */ React.createElement(LogOut, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "Logout")
  )))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement(Outlet, null)))), /* @__PURE__ */ React.createElement(Footer, null));
};
