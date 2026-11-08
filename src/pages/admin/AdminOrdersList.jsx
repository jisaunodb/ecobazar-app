import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { Modal } from "../../components/common/Modal";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchAllOrders, updateOrderStatus } from "../../redux/slices/orderSlice";
import toast from "react-hot-toast";
export const AdminOrdersList = () => {
  const dispatch = useAppDispatch();
  const { allOrders, isLoading } = useAppSelector((state) => state.orders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);
  const handleStatusChange = async (orderId, newStatus) => {
    await dispatch(updateOrderStatus({ orderId, status: newStatus }));
    toast.success(`Order #${orderId} status changed to ${newStatus}`);
  };
  const filteredOrders = allOrders.filter((o) => {
    if (filterStatus === "all") return true;
    return o.orderStatus === filterStatus;
  });
  return <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Order Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Track, update delivery status, and review customer order history
          </p>
        </div>

        {
    /* Status Filter */
  }
        <select
    value={filterStatus}
    onChange={(e) => setFilterStatus(e.target.value)}
    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl px-4 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
  >
          <option value="all">All Orders ({allOrders.length})</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      {
    /* Orders Table */
  }
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Order ID</th>
                <th className="p-4">Customer Details</th>
                <th className="p-4">Date</th>
                <th className="p-4">Total Amount</th>
                <th className="p-4">Delivery Status</th>
                <th className="p-4 text-center">Manage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredOrders.map((order) => <tr key={order._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                  <td className="p-4 font-black text-slate-900 dark:text-slate-100">
                    #{order._id}
                  </td>

                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        {order.userName}
                      </span>
                      <span className="text-[10px] text-slate-400">{order.userEmail}</span>
                    </div>
                  </td>

                  <td className="p-4 text-slate-500">{formatDate(order.createdAt)}</td>

                  <td className="p-4 font-black text-emerald-600 dark:text-emerald-400">
                    {formatCurrency(order.totalPrice)}
                  </td>

                  <td className="p-4">
                    <select
    value={order.orderStatus}
    onChange={(e) => handleStatusChange(order._id, e.target.value)}
    className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-2.5 py-1 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none"
  >
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>

                  <td className="p-4 text-center">
                    <button
    onClick={() => setSelectedOrder(order)}
    className="p-2 bg-slate-100 dark:bg-slate-800 hover:bg-emerald-600 hover:text-white rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1"
  >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>

      {
    /* Order Details Modal */
  }
      <Modal
    isOpen={!!selectedOrder}
    onClose={() => setSelectedOrder(null)}
    title={`Order Details #${selectedOrder?._id}`}
  >
        {selectedOrder && <div className="flex flex-col gap-4 text-xs text-slate-600 dark:text-slate-300">
            <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-2xl flex justify-between items-center">
              <div>
                <span className="font-bold text-slate-900 dark:text-slate-100">{selectedOrder.userName}</span>
                <p className="text-[10px] text-slate-400">{selectedOrder.userEmail}</p>
              </div>
              <Badge variant={selectedOrder.orderStatus === "delivered" ? "success" : "warning"}>
                {selectedOrder.orderStatus.toUpperCase()}
              </Badge>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800 max-h-48 overflow-y-auto">
              {selectedOrder.orderItems.map((item, idx) => <div key={idx} className="py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img src={item.image} alt="" className="w-8 h-8 rounded-lg object-cover" />
                    <span>{item.name} (x{item.quantity})</span>
                  </div>
                  <span className="font-bold">{formatCurrency(item.price * item.quantity)}</span>
                </div>)}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-sm font-black text-slate-900 dark:text-slate-100">
              <span>Grand Total:</span>
              <span className="text-emerald-600">{formatCurrency(selectedOrder.totalPrice)}</span>
            </div>
          </div>}
      </Modal>
    </div>;
};
