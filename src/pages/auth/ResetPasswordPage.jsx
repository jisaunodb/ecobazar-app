import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Lock, CheckCircle } from "lucide-react";
import { authService } from "../../services/authService";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import toast from "react-hot-toast";
export const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const res = await authService.resetPassword(token || "default", password);
      setIsLoading(false);
      toast.success(res.message || "Password reset successful!");
      navigate("/login");
    } catch {
      setIsLoading(false);
      toast.error("Failed to reset password.");
    }
  };
  return <div className="min-h-[75vh] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8 shadow-soft flex flex-col gap-6">
        <div className="text-center flex flex-col items-center gap-2">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 rounded-2xl">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-slate-100">Set New Password</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Create a strong new password for your EcoBazar account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
    label="New Password"
    type="password"
    placeholder="At least 6 characters"
    leftIcon={<Lock className="w-4 h-4" />}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />

          <Input
    label="Confirm New Password"
    type="password"
    placeholder="Re-enter new password"
    leftIcon={<Lock className="w-4 h-4" />}
    value={confirmPassword}
    onChange={(e) => setConfirmPassword(e.target.value)}
  />

          <Button
    type="submit"
    size="lg"
    isLoading={isLoading}
    className="w-full mt-2"
    leftIcon={<CheckCircle className="w-4 h-4" />}
  >
            Update Password
          </Button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 dark:border-slate-800">
          <Link to="/login" className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>;
};
