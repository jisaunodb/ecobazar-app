import { useState } from "react";
import { Plus, Edit3, Trash2 } from "lucide-react";
import { useAppSelector } from "../../redux/hooks";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import toast from "react-hot-toast";
export const AdminCategoriesPage = () => {
  const categories = useAppSelector((state) => state.products.categories);
  const [newCatName, setNewCatName] = useState("");
  const handleAdd = (e) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    toast.success(`Category "${newCatName}" added!`);
    setNewCatName("");
  };
  return <div className="flex flex-col gap-6 pb-12">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">Category Management</h1>
        <p className="text-xs text-slate-500 mt-1">Organize products into intuitive organic marketplace sections</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {
    /* Add Category Form */
  }
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-soft h-max">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <Plus className="w-4 h-4 text-emerald-600" /> Add New Category
          </h3>

          <form onSubmit={handleAdd} className="flex flex-col gap-4">
            <Input
    label="Category Name"
    placeholder="e.g. Exotic Fruits"
    value={newCatName}
    onChange={(e) => setNewCatName(e.target.value)}
  />

            <Button type="submit" size="md" className="w-full mt-2">
              Add Category
            </Button>
          </form>
        </div>

        {
    /* Categories List */
  }
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-soft flex flex-col gap-4">
          <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Active Categories ({categories.length})</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat) => <div
    key={cat._id}
    className="p-4 border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between gap-3 bg-slate-50/50 dark:bg-slate-800/40"
  >
                <div className="flex items-center gap-3">
                  <img src={cat.image} alt="" className="w-10 h-10 rounded-xl object-cover" />
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100">{cat.name}</h5>
                    <span className="text-[10px] text-slate-400">{cat.productCount} Items</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button className="p-1.5 text-slate-500 hover:text-emerald-600">
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
};
