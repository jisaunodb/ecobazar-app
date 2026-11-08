import React, { useState } from "react";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { ChevronDown, HelpCircle } from "lucide-react";
const FAQS = [
  {
    q: "How do I know the produce is genuinely 100% organic?",
    a: "All our produce and grocery vendors must hold active USDA Organic or equivalent regional certifications. We conduct surprise audits and laboratory pesticide tests on every farm partner."
  },
  {
    q: "What is the delivery time frame?",
    a: "Standard orders arrive within 24 to 48 hours in cold-insulated eco-boxes. Same-day delivery is available in select metropolitan areas for orders placed before 11:00 AM."
  },
  {
    q: "What if I receive damaged or spoiled fresh produce?",
    a: 'Your satisfaction is 100% guaranteed. If any produce fails your fresh standards, open a quick return request in "My Orders" within 48 hours for an instant full refund or replacement.'
  },
  {
    q: "How do I become an EcoBazar vendor?",
    a: "Certified organic growers and eco-product manufacturers can register under the Vendor Portal. Our quality assurance team will inspect your certifications within 3 business days."
  },
  {
    q: "Is there a minimum order value for free shipping?",
    a: "Yes! All orders over $50 qualify for automatic free standard cold-chain shipping."
  }
];
export const FAQPage = () => {
  const [openIdx, setOpenIdx] = useState(0);
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-6 pb-12 max-w-4xl mx-auto" }, /* @__PURE__ */ React.createElement(Breadcrumb, { items: [{ label: "FAQ" }] }), /* @__PURE__ */ React.createElement("div", { className: "text-center flex flex-col items-center gap-2 mb-4" }, /* @__PURE__ */ React.createElement("div", { className: "p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-2xl" }, /* @__PURE__ */ React.createElement(HelpCircle, { className: "w-8 h-8" })), /* @__PURE__ */ React.createElement("h1", { className: "text-3xl font-black text-slate-900 dark:text-slate-100" }, "Frequently Asked Questions"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 max-w-md" }, "Find answers to common questions about organic certifications, shipping, and returns")), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-3" }, FAQS.map((faq, idx) => {
    const isOpen = openIdx === idx;
    return /* @__PURE__ */ React.createElement(
      "div",
      {
        key: idx,
        className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition-all shadow-soft"
      },
      /* @__PURE__ */ React.createElement(
        "button",
        {
          onClick: () => setOpenIdx(isOpen ? null : idx),
          className: "w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-slate-900 dark:text-slate-100 hover:text-emerald-600"
        },
        /* @__PURE__ */ React.createElement("span", null, faq.q),
        /* @__PURE__ */ React.createElement(ChevronDown, { className: `w-5 h-5 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}` })
      ),
      isOpen && /* @__PURE__ */ React.createElement("div", { className: "px-5 pb-5 text-xs text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800/60 pt-3" }, faq.a)
    );
  })));
};
