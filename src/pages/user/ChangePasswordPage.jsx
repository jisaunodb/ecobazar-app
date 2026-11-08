import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Lock, Save } from "lucide-react";
import { authService } from "../../services/authService";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import toast from "react-hot-toast";
const passwordSchema = z.object({
  oldPassword: z.string().min(6, "Old password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Confirm password is required")
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});
export const ChangePasswordPage = () => {
  const [isSaving, setIsSaving] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(passwordSchema)
  });
  const onSubmit = async (data) => {
    setIsSaving(true);
    try {
      const res = await authService.changePassword(data.oldPassword, data.newPassword);
      setIsSaving(false);
      toast.success(res.message || "Password updated successfully!");
      reset();
    } catch {
      setIsSaving(false);
      toast.error("Failed to update password.");
    }
  };
  return <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Change Password</h2>
        <p className="text-xs text-slate-500 mt-1">
          Update your password regularly to protect your account
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 max-w-md">
        <Input
    label="Current Password"
    type="password"
    placeholder="••••••••"
    leftIcon={<Lock className="w-4 h-4" />}
    error={errors.oldPassword?.message}
    {...register("oldPassword")}
  />

        <Input
    label="New Password"
    type="password"
    placeholder="At least 6 characters"
    leftIcon={<Lock className="w-4 h-4" />}
    error={errors.newPassword?.message}
    {...register("newPassword")}
  />

        <Input
    label="Confirm New Password"
    type="password"
    placeholder="Re-enter new password"
    leftIcon={<Lock className="w-4 h-4" />}
    error={errors.confirmPassword?.message}
    {...register("confirmPassword")}
  />

        <Button
    type="submit"
    size="lg"
    isLoading={isSaving}
    className="w-max mt-2"
    leftIcon={<Save className="w-4 h-4" />}
  >
          Update Password
        </Button>
      </form>
    </div>;
};
