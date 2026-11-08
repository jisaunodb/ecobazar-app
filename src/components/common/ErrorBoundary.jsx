import React, { Component } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ React.createElement("div", { className: "min-h-screen flex items-center justify-center p-6 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100" }, /* @__PURE__ */ React.createElement("div", { className: "max-w-md w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-xl text-center flex flex-col items-center gap-4" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-rose-100 dark:bg-rose-950/50 text-rose-600 rounded-full" }, /* @__PURE__ */ React.createElement(AlertTriangle, { className: "w-8 h-8" })), /* @__PURE__ */ React.createElement("h2", { className: "text-xl font-black" }, "Something went wrong"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500" }, "An unexpected application error occurred. Click below to reload the page."), /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => window.location.reload(),
          className: "mt-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-xs flex items-center gap-2 shadow-md transition-all"
        },
        /* @__PURE__ */ React.createElement(RefreshCw, { className: "w-4 h-4" }),
        " Reload EcoBazar"
      )));
    }
    return this.props.children;
  }
}
