import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
export const SearchBox = ({
  placeholder = "Search products, categories, organic food...",
  className = ""
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
    }
  };
  return /* @__PURE__ */ React.createElement("form", { onSubmit: handleSearch, className: `relative flex items-center w-full ${className}` }, /* @__PURE__ */ React.createElement(
    "input",
    {
      type: "text",
      value: searchTerm,
      onChange: (e) => setSearchTerm(e.target.value),
      placeholder,
      className: "w-full pl-4 pr-24 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all placeholder:text-slate-400"
    }
  ), /* @__PURE__ */ React.createElement(
    "button",
    {
      type: "submit",
      className: "absolute right-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
    },
    /* @__PURE__ */ React.createElement(Search, { className: "w-3.5 h-3.5" }),
    /* @__PURE__ */ React.createElement("span", { className: "hidden sm:inline" }, "Search")
  ));
};
