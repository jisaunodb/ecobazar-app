import React, { useEffect, useState } from "react";
import { Search, UserCheck } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchUsersList } from "../../redux/slices/userSlice";
import toast from "react-hot-toast";
export const AdminUsersList = () => {
  const dispatch = useAppDispatch();
  const { usersList, isLoading } = useAppSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    dispatch(fetchUsersList());
  }, [dispatch]);
  const filteredUsers = usersList.filter(
    (u) => u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase()) || u.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-6 pb-12" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-black text-slate-900 dark:text-slate-100" }, "User Management"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 mt-1" }, "Manage customers, vendor accounts, and system admin permissions")), /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-soft flex items-center gap-3" }, /* @__PURE__ */ React.createElement(Search, { className: "w-4 h-4 text-slate-400 shrink-0" }), /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: searchTerm,
      onChange: (e) => setSearchTerm(e.target.value),
      placeholder: "Search by user name, email, or role...",
      className: "w-full bg-transparent text-xs text-slate-900 dark:text-slate-100 focus:outline-none placeholder:text-slate-400"
    }
  )), /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-soft" }, /* @__PURE__ */ React.createElement("div", { className: "overflow-x-auto" }, /* @__PURE__ */ React.createElement("table", { className: "w-full text-left text-xs" }, /* @__PURE__ */ React.createElement("thead", { className: "bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-slate-500 border-b border-slate-200 dark:border-slate-800" }, /* @__PURE__ */ React.createElement("tr", null, /* @__PURE__ */ React.createElement("th", { className: "p-4" }, "User"), /* @__PURE__ */ React.createElement("th", { className: "p-4" }, "Email"), /* @__PURE__ */ React.createElement("th", { className: "p-4" }, "Role"), /* @__PURE__ */ React.createElement("th", { className: "p-4" }, "Account Status"), /* @__PURE__ */ React.createElement("th", { className: "p-4 text-center" }, "Action"))), /* @__PURE__ */ React.createElement("tbody", { className: "divide-y divide-slate-100 dark:divide-slate-800" }, filteredUsers.map((u) => /* @__PURE__ */ React.createElement("tr", { key: u._id, className: "hover:bg-slate-50/50 dark:hover:bg-slate-800/30" }, /* @__PURE__ */ React.createElement("td", { className: "p-4 flex items-center gap-3" }, /* @__PURE__ */ React.createElement("img", { src: u.avatar, alt: "", className: "w-9 h-9 rounded-xl object-cover" }), /* @__PURE__ */ React.createElement("span", { className: "font-bold text-slate-900 dark:text-slate-100" }, u.name)), /* @__PURE__ */ React.createElement("td", { className: "p-4 text-slate-500" }, u.email), /* @__PURE__ */ React.createElement("td", { className: "p-4 uppercase font-bold" }, /* @__PURE__ */ React.createElement(Badge, { variant: u.role === "admin" ? "info" : u.role === "vendor" ? "warning" : "neutral" }, u.role)), /* @__PURE__ */ React.createElement("td", { className: "p-4" }, /* @__PURE__ */ React.createElement(Badge, { variant: u.isActive ? "success" : "danger" }, u.isActive ? "Active" : "Suspended")), /* @__PURE__ */ React.createElement("td", { className: "p-4 text-center" }, /* @__PURE__ */ React.createElement(
    "button",
    {
      onClick: () => toast.success(`Updated status for ${u.name}`),
      className: "p-2 text-slate-500 hover:text-emerald-600 rounded-xl"
    },
    /* @__PURE__ */ React.createElement(UserCheck, { className: "w-4 h-4" })
  )))))))));
};
