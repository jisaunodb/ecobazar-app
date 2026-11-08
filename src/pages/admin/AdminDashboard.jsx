import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  ArrowRight,
  Eye,
  PlusCircle
} from "lucide-react";
import { formatCurrency } from "../../utils/formatters";
import { Badge } from "../../components/common/Badge";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProducts } from "../../redux/slices/productSlice";
import { fetchAllOrders } from "../../redux/slices/orderSlice";
export const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.products);
  const { allOrders } = useAppSelector((state) => state.orders);
  const [timeFilter, setTimeFilter] = useState("30D");
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);
  const totalRevenue = allOrders.reduce((sum, o) => sum + o.totalPrice, 0) || 124592;
  const totalOrders = allOrders.length || 1284;
  const lowStockProducts = products.filter((p) => p.stock < 10);
  const velocityHeights = [40, 60, 45, 85, 70, 95, 55];
  const velocityDates = ["01 Oct", "05 Oct", "10 Oct", "15 Oct", "20 Oct", "25 Oct", "30 Oct"];
  return <div className="space-y-6 pb-8">
      {
    /* Top Welcome Banner */
  }
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100 tracking-tight">
            Vendor Console
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            Real-time sales velocity, marketplace inventory, and system analytics
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
    to="/admin/products/create"
    className="bg-black dark:bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-xs font-semibold hover:bg-slate-800 dark:hover:bg-emerald-700 transition-all flex items-center gap-1.5 shadow-sm"
  >
            <PlusCircle className="w-4 h-4" />
            <span>+ Create Product</span>
          </Link>
        </div>
      </div>

      {
    /* 4 Sleek Metric Cards */
  }
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-soft">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Total Revenue</p>
          <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">$124,592.00</h3>
          <p className="text-emerald-500 text-xs font-semibold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +12.5% vs last month
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-soft">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Orders</p>
          <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">1,284</h3>
          <p className="text-emerald-500 text-xs font-semibold mt-2 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" /> +43 new today
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-soft">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vendors</p>
          <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">842</h3>
          <p className="text-amber-500 text-xs font-semibold mt-2">9 pending approval</p>
        </div>

        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-soft">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Inventory</p>
          <h3 className="text-2xl font-bold mt-1 text-slate-900 dark:text-slate-100">18.4k</h3>
          <p className="text-slate-400 text-xs font-semibold mt-2">Stock health: Excellent</p>
        </div>
      </section>

      {
    /* Main Grid: Sales Velocity + Recent Products */
  }
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {
    /* Sales Velocity Chart Card */
  }
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">Sales Velocity</h4>
                <p className="text-xs text-slate-400">Transaction velocity across all registered marketplace vendors</p>
              </div>
              <div className="flex space-x-2 text-xs font-semibold">
                {["7D", "30D", "1Y"].map((filter) => <button
    key={filter}
    onClick={() => setTimeFilter(filter)}
    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${timeFilter === filter ? "bg-black text-white dark:bg-emerald-600" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"}`}
  >
                    {filter}
                  </button>)}
              </div>
            </div>

            {
    /* Velocity Bar Graphics */
  }
            <div className="h-48 flex items-end space-x-3 sm:space-x-4 px-2 pb-2 mt-4">
              {velocityHeights.map((h, i) => <div
    key={i}
    className="flex-1 bg-slate-50 dark:bg-slate-800/60 h-full rounded-t-lg relative group transition-all hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
  >
                  <div
    className={`absolute bottom-0 left-0 right-0 rounded-t-lg transition-all ${i === 5 ? "bg-emerald-600" : "bg-emerald-500"}`}
    style={{ height: `${h}%` }}
  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-md pointer-events-none transition-opacity whitespace-nowrap">
                      ${h * 240}
                    </div>
                  </div>
                </div>)}
            </div>

            <div className="flex justify-between text-[10px] font-bold text-slate-400 px-2 mt-4 uppercase tracking-tighter">
              {velocityDates.map((date, idx) => <span key={idx}>{date}</span>)}
            </div>
          </div>
        </div>

        {
    /* Recent Products Card */
  }
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">Recent Products</h4>
              <span className="text-xs text-slate-400 font-semibold">Active Inventory</span>
            </div>

            <div className="space-y-4">
              {products.slice(0, 4).map((item, idx) => <div key={item._id} className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700">
                    <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate text-slate-900 dark:text-slate-100">{item.name}</p>
                    <p className="text-xs text-slate-500 truncate">
                      {item.category} • ${item.discountPrice ?? item.price}
                    </p>
                  </div>
                  <div className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    +{12 + idx * 10}
                  </div>
                </div>)}
            </div>
          </div>

          <Link
    to="/admin/products"
    className="w-full py-3 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm font-bold rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 text-center mt-6 transition-colors block"
  >
            View All Inventory
          </Link>
        </div>
      </section>

      {
    /* Orders Table Section */
  }
      <section className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="font-bold text-lg text-slate-900 dark:text-slate-100">Recent Vendor Orders</h4>
            <p className="text-xs text-slate-400">Latest customer purchases across the marketplace</p>
          </div>
          <Link
    to="/admin/orders"
    className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
  >
            <span>View All Tracker</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800 uppercase font-bold text-slate-400 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {allOrders.slice(0, 5).map((order) => <tr key={order._id} className="hover:bg-slate-50/60 dark:hover:bg-slate-800/40">
                  <td className="p-3 font-bold text-slate-900 dark:text-slate-100">#{order._id}</td>
                  <td className="p-3 text-slate-600 dark:text-slate-300">{order.userName}</td>
                  <td className="p-3 font-black text-emerald-600">{formatCurrency(order.totalPrice)}</td>
                  <td className="p-3">
                    <Badge variant={order.orderStatus === "delivered" ? "success" : "warning"}>
                      {order.orderStatus}
                    </Badge>
                  </td>
                  <td className="p-3 text-center">
                    <Link to="/admin/orders" className="p-1 text-slate-400 hover:text-emerald-600 inline-block">
                      <Eye className="w-4 h-4" />
                    </Link>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </section>
    </div>;
};
