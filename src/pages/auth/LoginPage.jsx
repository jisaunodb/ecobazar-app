import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, LogIn, Sparkles, UserCheck, ShieldCheck } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginUser } from "../../redux/slices/authSlice";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import toast from "react-hot-toast";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
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
        toast.success("Welcome back Customer!");
        navigate("/");
      }
    } else {
      toast.error(result.payload || "Login failed");
    }
  };

  const handleCustomerLogin = async () => {
    setValue("email", "demo.customer@ecobazar.com");
    setValue("password", "password123");
    const result = await dispatch(
      loginUser({ email: "demo.customer@ecobazar.com", password: "password123" })
    );
    if (loginUser.fulfilled.match(result)) {
      toast.success("Logged in as Demo Customer!");
      navigate("/");
    }
  };

  const handleAdminLogin = async () => {
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
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-soft flex flex-col gap-6">
        <div className="text-center flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white font-extrabold text-2xl shadow-md">
            E
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Welcome Back</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Sign in to access your EcoBazar account & organic orders
          </p>
        </div>

        {/* 1-Click Role Login & Admin Switch */}
        <div className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 rounded-2xl p-3.5 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Demo Customer Access
            </span>
            <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400">
              Customer Mode
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleCustomerLogin}
              className="flex flex-col items-center justify-center p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800/60 text-emerald-800 dark:text-emerald-300 rounded-2xl text-xs font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/60 hover:scale-[1.02] transition-all group"
            >
              <UserCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400 mb-1 group-hover:scale-110 transition-transform" />
              <span>Demo Customer</span>
              <span className="text-[10px] font-normal text-emerald-600/80 dark:text-emerald-400/80">1-Click Sign In</span>
            </button>

            <Link
              to="/admin/login"
              className="flex flex-col items-center justify-center p-3 bg-slate-900 dark:bg-slate-800 border border-slate-800 dark:border-slate-700 text-white rounded-2xl text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-700 hover:scale-[1.02] transition-all group"
            >
              <ShieldCheck className="w-5 h-5 text-amber-400 mb-1 group-hover:scale-110 transition-transform" />
              <span>Admin Portal</span>
              <span className="text-[10px] font-normal text-slate-300">Dedicated Admin Login</span>
            </Link>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 text-rose-600 text-xs font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="e.g. demo.customer@ecobazar.com"
            leftIcon={<Mail className="w-4 h-4" />}
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600 dark:text-slate-400">
              <input type="checkbox" className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
              <span>Remember me</span>
            </label>
            <Link to="/forgot-password" className="text-emerald-600 hover:underline font-semibold">
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            className="w-full mt-2"
            leftIcon={<LogIn className="w-4 h-4" />}
          >
            Sign In
          </Button>
        </form>

        <div className="text-center text-xs text-slate-500 pt-2 border-t border-slate-100 dark:border-slate-800">
          Don't have an account?{" "}
          <Link to="/register" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
};
