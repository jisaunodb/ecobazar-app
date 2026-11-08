import React, { useState } from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  PlusCircle,
  ShoppingBag,
  Grid,
  BarChart3,
  Settings,
  User,
  LogOut,
  Menu,
  X,
  Sun,
  Moon,
  Home,
  Search
} from "lucide-react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleTheme } from "../redux/slices/themeSlice";
import { logout } from "../redux/slices/authSlice";
const VENDOR_NAV = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Product Manager", path: "/admin/products", icon: Package },
  { name: "Order Tracker", path: "/admin/orders", icon: ShoppingBag },
  { name: "Categories", path: "/admin/categories", icon: Grid }
];
const SYSTEM_NAV = [
  { name: "Analytics", path: "/admin/analytics", icon: BarChart3 },
  { name: "Storefront Settings", path: "/admin/settings", icon: Settings },
  { name: "Profile", path: "/admin/profile", icon: User }
];
export const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const darkMode = useAppSelector((state) => state.theme.darkMode);
  const user = useAppSelector((state) => state.auth.user);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen flex bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans" }, /* @__PURE__ */ React.createElement("aside", { className: "hidden lg:flex flex-col w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shrink-0" }, /* @__PURE__ */ React.createElement("div", { className: "p-6 flex items-center space-x-3 text-emerald-600 font-bold text-2xl" }, /* @__PURE__ */ React.createElement("div", { className: "w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-sm" }, /* @__PURE__ */ React.createElement("div", { className: "w-4 h-4 bg-white rounded-sm" })), /* @__PURE__ */ React.createElement("span", { className: "tracking-tight text-slate-900 dark:text-white" }, "EcoHub")), /* @__PURE__ */ React.createElement("nav", { className: "flex-1 px-4 space-y-6 overflow-y-auto" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase tracking-widest text-slate-400 font-bold px-2 mb-2" }, "Vendor Console"), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, VENDOR_NAV.map((item) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;
    return /* @__PURE__ */ React.createElement(
      Link,
      {
        key: item.path,
        to: item.path,
        className: `flex items-center space-x-3 p-3 rounded-xl font-medium text-xs transition-colors ${isActive ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`
      },
      /* @__PURE__ */ React.createElement(Icon, { className: `w-4 h-4 ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}` }),
      /* @__PURE__ */ React.createElement("span", null, item.name)
    );
  }))), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase tracking-widest text-slate-400 font-bold px-2 mb-2" }, "System"), /* @__PURE__ */ React.createElement("div", { className: "space-y-1" }, SYSTEM_NAV.map((item) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;
    return /* @__PURE__ */ React.createElement(
      Link,
      {
        key: item.path,
        to: item.path,
        className: `flex items-center space-x-3 p-3 rounded-xl font-medium text-xs transition-colors ${isActive ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"}`
      },
      /* @__PURE__ */ React.createElement(Icon, { className: `w-4 h-4 ${isActive ? "text-emerald-600 dark:text-emerald-400" : "text-slate-400"}` }),
      /* @__PURE__ */ React.createElement("span", null, item.name)
    );
  })))), /* @__PURE__ */ React.createElement("div", { className: "p-4 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-3" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3 p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/50" }, /* @__PURE__ */ React.createElement(
    "img",
    {
      src: user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
      alt: user?.name,
      className: "w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700"
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "flex-1 min-w-0" }, /* @__PURE__ */ React.createElement("p", { className: "text-xs font-bold text-slate-900 dark:text-slate-100 truncate" }, user?.name || "Alex Dev"), /* @__PURE__ */ React.createElement("p", { className: "text-[10px] text-slate-400 truncate" }, "Senior Admin"))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pt-1" }, /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/",
      className: "flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
    },
    /* @__PURE__ */ React.createElement(Home, { className: "w-3.5 h-3.5" }),
    " Storefront"
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: handleLogout,
      className: "flex items-center gap-1 text-xs font-semibold text-rose-500 hover:text-rose-600"
    },
    /* @__PURE__ */ React.createElement(LogOut, { className: "w-3.5 h-3.5" }),
    " Exit"
  )))), /* @__PURE__ */ React.createElement("div", { className: "flex-1 flex flex-col min-w-0 overflow-hidden" }, /* @__PURE__ */ React.createElement("header", { className: "h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-10" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center gap-4 flex-1 max-w-xl" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSidebarOpen(true),
      className: "lg:hidden p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
    },
    /* @__PURE__ */ React.createElement(Menu, { className: "w-5 h-5" })
  ), /* @__PURE__ */ React.createElement("div", { className: "hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 px-4 py-2.5 rounded-full w-full max-w-md" }, /* @__PURE__ */ React.createElement(Search, { className: "w-4 h-4 text-slate-400 mr-3 shrink-0" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      placeholder: "Search products, orders, or vendors...",
      className: "bg-transparent border-none text-xs sm:text-sm outline-none w-full text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
    }
  ))), /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-3 sm:space-x-4" }, /* @__PURE__ */ React.createElement("div", { className: "flex space-x-1 px-3 py-1 bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 rounded-full text-xs font-bold items-center" }, /* @__PURE__ */ React.createElement("span", null, "LIVE"), /* @__PURE__ */ React.createElement("div", { className: "w-2 h-2 bg-emerald-500 rounded-full animate-pulse ml-1" })), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => dispatch(toggleTheme()),
      className: "w-10 h-10 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center cursor-pointer hover:bg-slate-100 transition-all"
    },
    darkMode ? /* @__PURE__ */ React.createElement(Sun, { className: "w-4 h-4 text-amber-400" }) : /* @__PURE__ */ React.createElement(Moon, { className: "w-4 h-4 text-slate-600" })
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => navigate("/admin/products/create"),
      className: "bg-black dark:bg-emerald-600 text-white px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold hover:bg-slate-800 dark:hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-sm"
    },
    /* @__PURE__ */ React.createElement(PlusCircle, { className: "w-4 h-4" }),
    /* @__PURE__ */ React.createElement("span", null, "+ Create Product")
  ))), sidebarOpen && /* @__PURE__ */ React.createElement("div", { className: "fixed inset-0 z-50 flex lg:hidden" }, /* @__PURE__ */ React.createElement(
    "div",
    {
      className: "fixed inset-0 bg-slate-950/60 backdrop-blur-sm",
      onClick: () => setSidebarOpen(false)
    }
  ), /* @__PURE__ */ React.createElement("div", { className: "relative w-64 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 p-6 flex flex-col z-10 border-r border-slate-200 dark:border-slate-800" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800" }, /* @__PURE__ */ React.createElement("div", { className: "flex items-center space-x-2 text-emerald-600 font-bold text-xl" }, /* @__PURE__ */ React.createElement("div", { className: "w-7 h-7 bg-emerald-600 rounded-lg flex items-center justify-center text-white text-xs" }, "E"), /* @__PURE__ */ React.createElement("span", null, "EcoHub Admin")), /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => setSidebarOpen(false),
      className: "p-1 text-slate-400 hover:text-slate-700"
    },
    /* @__PURE__ */ React.createElement(X, { className: "w-5 h-5" })
  )), /* @__PURE__ */ React.createElement("nav", { className: "flex-1 space-y-4 overflow-y-auto" }, /* @__PURE__ */ React.createElement("div", { className: "text-[10px] uppercase tracking-widest text-slate-400 font-bold px-2" }, "Console Nav"), [...VENDOR_NAV, ...SYSTEM_NAV].map((item) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;
    return /* @__PURE__ */ React.createElement(
      Link,
      {
        key: item.path,
        to: item.path,
        onClick: () => setSidebarOpen(false),
        className: `flex items-center space-x-3 p-3 rounded-xl font-medium text-xs transition-colors ${isActive ? "bg-emerald-50 dark:bg-emerald-950 text-emerald-700 font-bold" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50"}`
      },
      /* @__PURE__ */ React.createElement(Icon, { className: "w-4 h-4" }),
      /* @__PURE__ */ React.createElement("span", null, item.name)
    );
  })))), /* @__PURE__ */ React.createElement("main", { className: "p-4 sm:p-8 flex-1 overflow-y-auto" }, /* @__PURE__ */ React.createElement(Outlet, null))));
};
