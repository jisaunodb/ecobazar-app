import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CreditCard, Truck, ShieldCheck, CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { formatCurrency } from "../../utils/formatters";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createNewOrder } from "../../redux/slices/orderSlice";
import { clearCart } from "../../redux/slices/cartSlice";
import toast from "react-hot-toast";
const checkoutSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  phone: z.string().min(6, "Valid phone number required"),
  street: z.string().min(5, "Street address required"),
  city: z.string().min(2, "City required"),
  zipCode: z.string().min(3, "ZIP/Postal code required"),
  country: z.string().min(2, "Country required"),
  paymentMethod: z.enum(["credit_card", "paypal", "cash_on_delivery", "stripe"])
});
export const CheckoutPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector((state) => state.cart.totalPrice);
  const user = useAppSelector((state) => state.auth.user);
  const shippingPrice = totalPrice > 50 || cartItems.length === 0 ? 0 : 5;
  const taxPrice = totalPrice * 0.08;
  const grandTotal = totalPrice + shippingPrice + taxPrice;
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: user?.name || "Sarah Jenkins",
      phone: user?.phone || "+1 (555) 847-2910",
      street: user?.address?.street || "742 Evergreen Terrace",
      city: user?.address?.city || "Springfield",
      zipCode: user?.address?.zipCode || "97477",
      country: user?.address?.country || "United States",
      paymentMethod: "credit_card"
    }
  });
  const selectedPayment = watch("paymentMethod");
  const onSubmit = async (data) => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }
    setIsSubmitting(true);
    const orderPayload = {
      userId: user?._id || "usr_cust_1",
      userName: data.fullName,
      userEmail: user?.email || "sarah.jenkins@example.com",
      orderItems: cartItems.map((item) => ({
        _id: item._id,
        productId: item.product._id,
        name: item.product.name,
        price: item.product.discountPrice ?? item.product.price,
        quantity: item.quantity,
        image: item.product.images[0]
      })),
      shippingAddress: {
        fullName: data.fullName,
        phone: data.phone,
        street: data.street,
        city: data.city,
        zipCode: data.zipCode,
        country: data.country
      },
      paymentMethod: data.paymentMethod,
      itemsPrice: totalPrice,
      taxPrice,
      shippingPrice,
      totalPrice: grandTotal
    };
    try {
      const result = await dispatch(createNewOrder(orderPayload));
      setIsSubmitting(false);
      if (createNewOrder.fulfilled.match(result)) {
        dispatch(clearCart());
        toast.success("Order placed successfully!");
        navigate("/order-success");
      }
    } catch {
      setIsSubmitting(false);
      toast.error("Failed to process order.");
    }
  };
  return <div className="flex flex-col gap-6 pb-12">
      <Breadcrumb items={[{ label: "Cart", path: "/cart" }, { label: "Checkout" }]} />

      <h1 className="text-3xl font-black text-slate-900 dark:text-slate-100">Checkout & Payment</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {
    /* Shipping Form */
  }
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-soft flex flex-col gap-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <Truck className="w-5 h-5 text-emerald-600" /> Shipping Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
    label="Full Name"
    placeholder="Sarah Jenkins"
    error={errors.fullName?.message}
    {...register("fullName")}
  />

              <Input
    label="Phone Number"
    placeholder="+1 (555) 000-0000"
    error={errors.phone?.message}
    {...register("phone")}
  />
            </div>

            <Input
    label="Street Address"
    placeholder="123 Organic St, Suite 400"
    error={errors.street?.message}
    {...register("street")}
  />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
    label="City"
    placeholder="San Francisco"
    error={errors.city?.message}
    {...register("city")}
  />

              <Input
    label="ZIP / Postal Code"
    placeholder="94107"
    error={errors.zipCode?.message}
    {...register("zipCode")}
  />

              <Input
    label="Country"
    placeholder="United States"
    error={errors.country?.message}
    {...register("country")}
  />
            </div>
          </div>

          {
    /* Payment Method Selector */
  }
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-soft flex flex-col gap-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
              <CreditCard className="w-5 h-5 text-emerald-600" /> Select Payment Method
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
    { id: "credit_card", name: "Credit / Debit Card", desc: "Visa, Mastercard, Amex" },
    { id: "paypal", name: "PayPal Express", desc: "Fast online payment" },
    { id: "stripe", name: "Stripe Gateway", desc: "Secure card checkout" },
    { id: "cash_on_delivery", name: "Cash On Delivery", desc: "Pay when delivered" }
  ].map((pm) => <label
    key={pm.id}
    onClick={() => setValue("paymentMethod", pm.id)}
    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${selectedPayment === pm.id ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 font-bold" : "border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40"}`}
  >
                  <input
    type="radio"
    value={pm.id}
    checked={selectedPayment === pm.id}
    onChange={() => {
    }}
    className="mt-1 accent-emerald-600"
  />
                  <div>
                    <div className="text-sm font-bold">{pm.name}</div>
                    <div className="text-xs text-slate-500 font-normal">{pm.desc}</div>
                  </div>
                </label>)}
            </div>
          </div>
        </div>

        {
    /* Order Summary Column */
  }
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-soft flex flex-col gap-6 h-max">
          <h3 className="text-lg font-black text-slate-900 dark:text-slate-100 pb-4 border-b border-slate-100 dark:border-slate-800">
            Order Review ({cartItems.length})
          </h3>

          <div className="flex flex-col gap-3 max-h-60 overflow-y-auto pr-1">
            {cartItems.map((item) => <div key={item._id} className="flex items-center gap-3">
                <img
    src={item.product.images[0]}
    alt={item.product.name}
    className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
  />
                <div className="flex-1 min-w-0">
                  <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    {item.product.name}
                  </h5>
                  <span className="text-[11px] text-slate-500">
                    Qty: {item.quantity} x {formatCurrency(item.product.discountPrice ?? item.product.price)}
                  </span>
                </div>
              </div>)}
          </div>

          <div className="flex flex-col gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <div className="flex justify-between">
              <span>Items Total:</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping:</span>
              <span>{shippingPrice === 0 ? "FREE" : formatCurrency(shippingPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax:</span>
              <span>{formatCurrency(taxPrice)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-slate-900 dark:text-slate-100 pt-2 border-t border-slate-100 dark:border-slate-800">
              <span>Total Payable:</span>
              <span className="text-emerald-600 dark:text-emerald-400">
                {formatCurrency(grandTotal)}
              </span>
            </div>
          </div>

          <Button
    type="submit"
    size="lg"
    isLoading={isSubmitting}
    className="w-full mt-2"
    leftIcon={<CheckCircle2 className="w-5 h-5" />}
  >
            Confirm & Place Order
          </Button>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>256-Bit Encrypted Secure Checkout</span>
          </div>
        </div>
      </form>
    </div>;
};
