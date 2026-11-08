import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, LogIn, ShieldCheck, Sparkles, ArrowRight, ShoppingBag } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginUser } from "../../redux/slices/authSlice";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import toast from "react-hot-toast";

const adminLoginSchema = z.object({
  email: z.string().email("Please enter a valid admin email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export const AdminLoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "admin@ecobazar.com",
      password: "admin123"
    }
  });

  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      const user = result.payload.user;
      if (user?.role === "admin") {
        toast.success("Welcome back Admin!");
        navigate("/admin/dashboard");
      } else {
        toast.error("Access denied: You do not have Admin privileges.");
      }
    } else {
      toast.error(result.payload || "Admin login failed");
    }
  };

  const handleAdmin1Click = async () => {
    setValue("email", "admin@ecobazar.com");
    setValue("password", "admin123");
    const result = await dispatch(
      loginUser({ email: "admin@ecobazar.com", password: "admin123" })
    );
    if (loginUser.fulfilled.match(result)) {
      toast.success("Logged in as Admin!");
      navigate("/admin/dashboard");
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border-2 border-slate-900 dark:border-amber-500/30 rounded-3xl p-8 shadow-2xl flex flex-col gap-6 relative overflow-hidden">
        {/* Top Decorative Admin Banner */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-slate-900 via-amber-500 to-emerald-600" />

        <div className="text-center flex flex-col items-center gap-2 pt-2">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 dark:bg-slate-800 text-amber-400 border border-slate-700 flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-[10px] font-extrabold uppercase tracking-wider">
            <Sparkles className="w-3 h-3 text-amber-600 dark:text-amber-400" />
            Admin Portal Access
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            Admin Sign In
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Secure authentication for EcoBazar Store Managers & Administrators
          </p>
        </div>

        {/* 1-Click Demo Admin Button */}
        <div className="bg-slate-900 text-white dark:bg-slate-800/90 border border-slate-800 dark:border-slate-700 rounded-2xl p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-amber-400 tracking-wider flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> Quick Admin Login
            </span>
            <span className="text-[10px] text-slate-400">1-Click Access</span>
          </div>

          <button
            type="button"
            onClick={handleAdmin1Click}
            className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 group"
          >
            <span>Sign In as Demo Admin</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-600 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Admin Email Address"
            type="email"
            placeholder="e.g. admin@ecobazar.com"
            leftIcon={<Mail className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Admin Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4 text-amber-600 dark:text-amber-400" />}
            error={errors.password?.message}
            {...register("password")}
          />

          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            className="w-full mt-2 bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:hover:bg-white text-white dark:text-slate-900 font-extrabold"
            leftIcon={<LogIn className="w-4 h-4" />}
          >
            Sign In to Admin Dashboard
          </Button>
        </form>

        {/* Switch to Customer Portal Link */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col items-center gap-2">
          <Link
            to="/login"
            className="text-xs text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold flex items-center gap-1.5 transition-colors"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-600" />
            <span>Are you a customer? Go to Customer Login</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
