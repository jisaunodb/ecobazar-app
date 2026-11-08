import React from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend);
export const AdminAnalyticsPage = () => {
  const categoryChartData = {
    labels: ["Fruits & Veggies", "Cold Pressed Oils", "Dairy & Eggs", "Artisanal Bakery", "Eco Household"],
    datasets: [
      {
        data: [45, 20, 15, 12, 8],
        backgroundColor: ["#059669", "#10b981", "#34d399", "#f59e0b", "#6366f1"]
      }
    ]
  };
  const monthlySalesData = {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    datasets: [
      {
        label: "Organic Sales ($)",
        data: [48e3, 72e3, 91e3, 12e4],
        backgroundColor: "#059669",
        borderRadius: 12
      }
    ]
  };
  return /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-6 pb-12" }, /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("h1", { className: "text-2xl font-black text-slate-900 dark:text-slate-100" }, "Marketplace Analytics"), /* @__PURE__ */ React.createElement("p", { className: "text-xs text-slate-500 mt-1" }, "Deep-dive analysis on category distribution, revenue growth, and buyer trends")), /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6" }, /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-soft flex flex-col gap-4" }, /* @__PURE__ */ React.createElement("h3", { className: "text-base font-black text-slate-900 dark:text-slate-100" }, "Category Share Distribution"), /* @__PURE__ */ React.createElement("div", { className: "h-64 w-full flex items-center justify-center" }, /* @__PURE__ */ React.createElement(Doughnut, { data: categoryChartData, options: { maintainAspectRatio: false } }))), /* @__PURE__ */ React.createElement("div", { className: "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-soft flex flex-col gap-4" }, /* @__PURE__ */ React.createElement("h3", { className: "text-base font-black text-slate-900 dark:text-slate-100" }, "Quarterly Organic Growth"), /* @__PURE__ */ React.createElement("div", { className: "h-64 w-full" }, /* @__PURE__ */ React.createElement(Bar, { data: monthlySalesData, options: { maintainAspectRatio: false, plugins: { legend: { display: false } } } })))));
};
