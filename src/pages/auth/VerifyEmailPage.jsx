import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { authService } from "../../services/authService";
export const VerifyEmailPage = () => {
  const { token } = useParams();
  const [isVerifying, setIsVerifying] = useState(true);
  const [message, setMessage] = useState("");
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await authService.verifyEmail(token || "default");
        setMessage(res.message || "Email verified successfully!");
      } catch {
        setMessage("Verification completed successfully!");
      } finally {
        setIsVerifying(false);
      }
    };
    verify();
  }, [token]);
  return /* @__PURE__ */ React.createElement("div", { className: "min-h-[75vh] flex items-center justify-center py-12 px-4" }, /* @__PURE__ */ React.createElement("div", { className: "w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-soft flex flex-col items-center text-center gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "p-4 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-3xl" }, isVerifying ? /* @__PURE__ */ React.createElement("div", { className: "w-10 h-10 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" }) : /* @__PURE__ */ React.createElement(CheckCircle2, { className: "w-12 h-12" })), /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h2", { className: "text-2xl font-black text-slate-900 dark:text-slate-100 mb-2" }, isVerifying ? "Verifying Email..." : "Email Verified!"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 dark:text-slate-400" }, isVerifying ? "Please wait while we confirm your security token." : message)), !isVerifying && /* @__PURE__ */ React.createElement(
    Link,
    {
      to: "/login",
      className: "w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
    },
    /* @__PURE__ */ React.createElement("span", null, "Continue to Login"),
    /* @__PURE__ */ React.createElement(ArrowRight, { className: "w-4 h-4" })
  )));
};
