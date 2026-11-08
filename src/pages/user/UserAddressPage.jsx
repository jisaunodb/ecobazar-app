import { useState } from "react";
import { useForm } from "react-hook-form";
import { MapPin, Save } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { updateProfile } from "../../redux/slices/authSlice";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import toast from "react-hot-toast";
export const UserAddressPage = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const [isSaving, setIsSaving] = useState(false);
  const { register, handleSubmit } = useForm({
    defaultValues: {
      street: user?.address?.street || "742 Evergreen Terrace",
      city: user?.address?.city || "Springfield",
      zipCode: user?.address?.zipCode || "97477",
      country: user?.address?.country || "United States"
    }
  });
  const onSubmit = async (data) => {
    setIsSaving(true);
    const result = await dispatch(updateProfile({ address: data }));
    setIsSaving(false);
    if (updateProfile.fulfilled.match(result)) {
      toast.success("Shipping address updated!");
    } else {
      toast.error("Failed to update address.");
    }
  };
  return <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col gap-6">
      <div>
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-100">Saved Address Book</h2>
        <p className="text-xs text-slate-500 mt-1">
          Manage default shipping destinations for express organic checkout
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
    label="Street Address"
    placeholder="123 Organic Valley Way"
    leftIcon={<MapPin className="w-4 h-4" />}
    {...register("street")}
  />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="City" placeholder="San Francisco" {...register("city")} />
          <Input label="ZIP Code" placeholder="94107" {...register("zipCode")} />
          <Input label="Country" placeholder="United States" {...register("country")} />
        </div>

        <Button
    type="submit"
    size="lg"
    isLoading={isSaving}
    className="w-max mt-2"
    leftIcon={<Save className="w-4 h-4" />}
  >
          Save Address
        </Button>
      </form>
    </div>;
};
