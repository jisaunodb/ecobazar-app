import { useState } from "react";
import { Save, Store } from "lucide-react";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import toast from "react-hot-toast";
export const AdminSettingsPage = () => {
  const [isSaving, setIsSaving] = useState(false);
  const handleSave = (e) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast.success("Marketplace settings updated!");
    }, 800);
  };
  return <div className="flex flex-col gap-6 pb-12 max-w-4xl">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Store Settings</h1>
        <p className="text-xs text-slate-500 mt-1">Configure global platform thresholds, taxes, and shipping rates</p>
      </div>

      <form onSubmit={handleSave} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col gap-6">
        <h3 className="text-base font-black text-slate-900 dark:text-slate-100 flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <Store className="w-5 h-5 text-emerald-600" /> Platform Defaults
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Store Name" defaultValue="EcoBazar Organic" />
          <Input label="Support Email" defaultValue="support@ecobazar.com" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="Free Shipping Threshold ($)" defaultValue="50.00" />
          <Input label="Default Standard Shipping ($)" defaultValue="5.00" />
          <Input label="Estimated Tax Rate (%)" defaultValue="8.00" />
        </div>

        <Button type="submit" size="lg" isLoading={isSaving} className="w-max mt-2" leftIcon={<Save className="w-4 h-4" />}>
          Save Settings
        </Button>
      </form>
    </div>;
};
