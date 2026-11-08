import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchMyOrders } from "../../redux/slices/orderSlice";
export const UserOrdersPage = () => {
  const dispatch = useAppDispatch();
  const { userOrders, isLoading } = useAppSelector((state) => state.orders);
  useEffect(() => {
    dispatch(fetchMyOrders());
  }, [dispatch]);
  const getStatusBadge = (status) => {
    switch (status) {
      case "delivered":
        return <Badge variant="success">Delivered</Badge>;
      case "processing":
        return <Badge variant="info">Processing</Badge>;
      case "shipped":
        return <Badge variant="warning">Shipped</Badge>;
      case "cancelled":
        return <Badge variant="danger">Cancelled</Badge>;
      default:
        return <Badge variant="neutral">{status}</Badge>;
    }
  };
  return <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">My Orders</h2>
        <p className="text-xs text-slate-500 mt-1">
          Track current organic deliveries and view order history
        </p>
      </div>

      {isLoading ? <div className="py-8 flex justify-center">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        </div> : userOrders.length === 0 ? <div className="text-center py-8 text-slate-500 text-xs">
          No orders found yet. Start shopping on EcoBazar!
        </div> : <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5">Order ID</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Items</th>
                <th className="p-3.5">Total Amount</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {userOrders.map((order) => <tr key={order._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-slate-100">
                    #{order._id}
                  </td>
                  <td className="p-3.5 text-slate-500">{formatDate(order.createdAt)}</td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-400">
                    {order.orderItems.length} Product(s)
                  </td>
                  <td className="p-3.5 font-black text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(order.totalPrice)}
                  </td>
                  <td className="p-3.5">{getStatusBadge(order.orderStatus)}</td>
                  <td className="p-3.5 text-center">
                    <Link
    to={`/user/orders/${order._id}`}
    className="p-2 inline-flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-xl text-xs font-bold transition-all"
  >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </Link>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>}
    </div>;
};
