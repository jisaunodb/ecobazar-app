import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, ArrowLeft, Send } from "lucide-react";
import { authService } from "../../services/authService";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import toast from "react-hot-toast";
export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }
    setIsLoading(true);
    try {
      const res = await authService.forgotPassword(email);
      setIsLoading(false);
      setSubmitted(true);
      toast.success(res.message || "Password reset link sent!");
    } catch {
      setIsLoading(false);
      toast.error("Failed to send reset link.");
    }
  };
  return <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-soft flex flex-col gap-6">
        <div className="text-center flex flex-col items-center gap-2">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-2xl">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Forgot Password?</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Enter your email and we'll send you an instant verification reset link
          </p>
        </div>

        {submitted ? <div className="p-4 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 rounded-2xl text-center flex flex-col gap-3">
            <p className="text-xs text-emerald-800 dark:text-emerald-300 font-medium leading-relaxed">
              We've emailed a password reset link to <strong>{email}</strong>. Please check your inbox or spam folder.
            </p>
            <Link
    to="/reset-password/demo_token_123"
    className="inline-block py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
  >
              Click Here to Open Reset Screen (Demo)
            </Link>
          </div> : <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
    label="Email Address"
    type="email"
    placeholder="e.g. sarah.jenkins@example.com"
    leftIcon={<Mail className="w-4 h-4" />}
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />

            <Button
    type="submit"
    size="lg"
    isLoading={isLoading}
    className="w-full mt-2"
    leftIcon={<Send className="w-4 h-4" />}
  >
              Send Reset Link
            </Button>
          </form>}

        <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
          <Link
    to="/login"
    className="inline-flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 font-semibold hover:text-emerald-600"
  >
            <ArrowLeft className="w-4 h-4" /> Back to Login
          </Link>
        </div>
      </div>
    </div>;
};
