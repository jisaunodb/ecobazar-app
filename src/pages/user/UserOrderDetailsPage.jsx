import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Truck, CreditCard } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { formatCurrency, formatDate } from "../../utils/formatters";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchSingleOrder } from "../../redux/slices/orderSlice";
export const UserOrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { currentOrder, isLoading } = useAppSelector((state) => state.orders);
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleOrder(id));
    }
  }, [id, dispatch]);
  if (isLoading || !currentOrder) {
    return <div className="py-12 flex justify-center">
        <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>;
  }
  return <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col gap-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Link
    to="/user/orders"
    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
  >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-slate-100">
              Order #{currentOrder._id}
            </h2>
            <p className="text-xs text-slate-500">Placed on {formatDate(currentOrder.createdAt)}</p>
          </div>
        </div>

        <Badge variant={currentOrder.orderStatus === "delivered" ? "success" : "warning"}>
          {currentOrder.orderStatus.toUpperCase()}
        </Badge>
      </div>

      {
    /* Grid details */
  }
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col gap-2 text-xs">
          <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <Truck className="w-4 h-4 text-emerald-600" /> Shipping Address
          </span>
          <p className="text-slate-600 dark:text-slate-300">{currentOrder.shippingAddress.fullName}</p>
          <p className="text-slate-500">{currentOrder.shippingAddress.street}, {currentOrder.shippingAddress.city}</p>
          <p className="text-slate-500">{currentOrder.shippingAddress.country} - {currentOrder.shippingAddress.zipCode}</p>
          <p className="text-slate-500">Phone: {currentOrder.shippingAddress.phone}</p>
        </div>

        <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col gap-2 text-xs">
          <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <CreditCard className="w-4 h-4 text-emerald-600" /> Payment & Status
          </span>
          <p className="text-slate-600 dark:text-slate-300 uppercase">Method: {currentOrder.paymentMethod}</p>
          <p className="text-emerald-600 font-bold">Is Paid: YES</p>
          <p className="text-slate-500">Delivered At: {currentOrder.deliveredAt ? formatDate(currentOrder.deliveredAt) : "In Transit"}</p>
        </div>
      </div>

      {
    /* Items list */
  }
      <div className="flex flex-col gap-3">
        <h4 className="text-xs font-bold uppercase text-slate-500">Ordered Items</h4>
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {currentOrder.orderItems.map((item, idx) => <div key={idx} className="py-3 flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <img
    src={item.image}
    alt={item.name}
    className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
  />
                <div>
                  <h5 className="font-bold text-slate-900 dark:text-slate-100">{item.name}</h5>
                  <span className="text-[11px] text-slate-400">Qty: {item.quantity}</span>
                </div>
              </div>

              <span className="font-black text-emerald-600 dark:text-emerald-400">
                {formatCurrency(item.price * item.quantity)}
              </span>
            </div>)}
        </div>
      </div>

      {
    /* Summary */
  }
      <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800 flex flex-col gap-2 text-xs font-medium text-slate-600 dark:text-slate-400">
        <div className="flex justify-between">
          <span>Items Price:</span>
          <span>{formatCurrency(currentOrder.itemsPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping:</span>
          <span>{formatCurrency(currentOrder.shippingPrice)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax:</span>
          <span>{formatCurrency(currentOrder.taxPrice)}</span>
        </div>
        <div className="flex justify-between text-base font-black text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-200 dark:border-slate-700">
          <span>Total Paid:</span>
          <span className="text-emerald-600 dark:text-emerald-400">
            {formatCurrency(currentOrder.totalPrice)}
          </span>
        </div>
      </div>
    </div>;
};
