import { useState } from "react";
import { User as UserIcon, Mail, Save, ShieldCheck } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateProfile } from "../../redux/slices/authSlice";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import toast from "react-hot-toast";
export const AdminProfilePage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState(user?.name || "Administrator");
  const [email, setEmail] = useState(user?.email || "admin@ecobazar.com");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const result = await dispatch(updateProfile({ name, email }));
    setIsSaving(false);
    if (updateProfile.fulfilled.match(result)) {
      toast.success("Admin profile updated!");
    } else {
      toast.error("Failed to update admin profile.");
    }
  };
  return <div className="flex flex-col gap-6 pb-12 max-w-2xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Administrator Profile</h1>
        <p className="text-xs text-slate-500 mt-1">Manage system administrator credentials and contact details</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col gap-6">
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <img src={user?.avatar} alt="" className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500" />
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-slate-100">{user?.name}</h3>
            <span className="text-xs font-bold text-emerald-600 uppercase flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" /> Root Administrator
            </span>
          </div>
        </div>

        <Input label="Admin Full Name" value={name} onChange={(e) => setName(e.target.value)} leftIcon={<UserIcon className="w-4 h-4" />} />
        <Input label="Admin Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} leftIcon={<Mail className="w-4 h-4" />} />

        <Button type="submit" size="lg" isLoading={isSaving} className="w-max mt-2" leftIcon={<Save className="w-4 h-4" />}>
          Save Admin Profile
        </Button>
      </form>
    </div>;
};
