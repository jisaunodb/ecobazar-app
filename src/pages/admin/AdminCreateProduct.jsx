import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ArrowLeft, Save, Upload, Image as ImageIcon, X, Star, Plus, Link as LinkIcon } from "lucide-react";
import { Input } from "../../components/common/Input";
import { Button } from "../../components/common/Button";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { createNewProduct } from "../../redux/slices/productSlice";
import toast from "react-hot-toast";

const PRESET_SAMPLE_IMAGES = [
  { name: "Crisp Apples", url: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80" },
  { name: "Fresh Strawberries", url: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80" },
  { name: "Organic Vegetables", url: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80" },
  { name: "Citrus Oranges", url: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=800&q=80" },
  { name: "Avocado & Greens", url: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=800&q=80" }
];

export const AdminCreateProduct = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const categories = useAppSelector((state) => state.products.categories);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Picture management state
  const [imagesList, setImagesList] = useState([
    {
      id: "img-default-1",
      url: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80",
      isMain: true
    }
  ]);
  const [customUrl, setCustomUrl] = useState("");

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    files.forEach((file) => {
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image file.`);
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result;
        if (dataUrl) {
          setImagesList((prev) => [
            ...prev,
            {
              id: `img-${Date.now()}-${Math.random()}`,
              url: dataUrl,
              isMain: prev.length === 0
            }
          ]);
          toast.success("Picture added!");
        }
      };
      reader.readAsDataURL(file);
    });

    e.target.value = ""; // Reset file input
  };

  const handleAddCustomUrl = () => {
    if (!customUrl.trim()) return;
    setImagesList((prev) => [
      ...prev,
      {
        id: `img-${Date.now()}`,
        url: customUrl.trim(),
        isMain: prev.length === 0
      }
    ]);
    setCustomUrl("");
    toast.success("Image URL added!");
  };

  const handleAddPreset = (url) => {
    if (imagesList.some((img) => img.url === url)) {
      toast.error("This image is already added.");
      return;
    }
    setImagesList((prev) => [
      ...prev,
      {
        id: `img-${Date.now()}`,
        url,
        isMain: prev.length === 0
      }
    ]);
    toast.success("Preset image added!");
  };

  const handleSetMain = (id) => {
    setImagesList((prev) =>
      prev.map((img) => ({
        ...img,
        isMain: img.id === id
      }))
    );
  };

  const handleRemoveImage = (id) => {
    setImagesList((prev) => {
      const filtered = prev.filter((img) => img.id !== id);
      if (filtered.length > 0 && !filtered.some((img) => img.isMain)) {
        filtered[0].isMain = true;
      }
      return filtered;
    });
  };

  const { register, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      sku: `SKU-${Math.floor(100000 + Math.random() * 900000)}`,
      Category: "Fruits & Vegetables",
      subCategory: "",
      brand: "EcoBazar Organic",
      price: 15,
      discountPrice: 10, // percentage
      stock: 50,
      status: "active",
      shortDescription: "",
      description: "",
      AdditionalInfo: "",
      tagsString: "Organic, Fresh",
    },
  });

  const onSubmit = async (data) => {
    if (imagesList.length === 0) {
      toast.error("Please add at least one product picture.");
      return;
    }

    setIsSubmitting(true);
    const tags = data.tagsString
      ? data.tagsString.split(",").map((t) => t.trim()).filter(Boolean)
      : [];

    const formattedImages = imagesList.map((img) => ({
      url: img.url,
      isMain: img.isMain
    }));

    const mainImgObj = imagesList.find((img) => img.isMain) || imagesList[0];

    const payload = {
      title: data.title,
      name: data.title,
      sku: data.sku,
      Category: data.Category,
      category: data.Category,
      subCategory: data.subCategory,
      brand: data.brand,
      price: Number(data.price),
      discountPrice: Number(data.discountPrice || 0),
      finalPrice: Number(data.price) - (Number(data.price) * Number(data.discountPrice || 0)) / 100,
      stock: Number(data.stock),
      status: data.status,
      shortDescription: data.shortDescription,
      description: data.description,
      AdditionalInfo: data.AdditionalInfo,
      tag: tags,
      tags,
      images: formattedImages.length > 0 ? formattedImages : [mainImgObj.url],
      ratings: 4.8,
      numOfReviews: 0,
      isFeatured: true,
    };

    const result = await dispatch(createNewProduct(payload));
    setIsSubmitting(false);

    if (createNewProduct.fulfilled.match(result)) {
      toast.success("Product created successfully!");
      navigate("/admin/products");
    } else {
      toast.error("Failed to create product.");
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-12 max-w-4xl mx-auto">
      <div className="flex items-center gap-3">
        <Link
          to="/admin/products"
          className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            Create New Product
          </h1>
          <p className="text-xs text-slate-500">
            Publish a new item with pictures, descriptions, and Mongoose schema fields
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-soft flex flex-col gap-6"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input label="Title *" placeholder="e.g. Organic Honeycrisp Apples" {...register("title", { required: true })} />
          <Input label="SKU *" placeholder="e.g. SKU-APP-001" {...register("sku", { required: true })} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
              Category *
            </label>
            <select
              {...register("Category")}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs focus:outline-none focus:border-emerald-500 font-semibold text-slate-800 dark:text-slate-200"
            >
              {categories.map((c) => (
                <option key={c._id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <Input label="Sub Category" placeholder="e.g. Fresh Produce" {...register("subCategory")} />
          <Input label="Brand" placeholder="e.g. EcoBazar Organics" {...register("brand")} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Input label="Price ($) *" type="number" step="0.01" {...register("price", { required: true })} />
          <Input label="Discount Price (% 0-100)" type="number" step="1" min="0" max="100" {...register("discountPrice")} />
          <Input label="Stock *" type="number" {...register("stock", { required: true })} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs focus:outline-none focus:border-emerald-500 font-semibold text-slate-800 dark:text-slate-200"
            >
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <Input label="Tags (Comma separated)" placeholder="e.g. Organic, Fresh, Vegan" {...register("tagsString")} />
        </div>

        {/* --- Product Pictures Upload Section --- */}
        <div className="flex flex-col gap-3 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <ImageIcon className="w-4 h-4 text-emerald-600" />
              Product Pictures ({imagesList.length})
            </label>
            <span className="text-[11px] text-slate-500">
              Select or upload multiple product images
            </span>
          </div>

          {/* Upload Box & Custom URL Input */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* File Upload Drop Area */}
            <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-2xl cursor-pointer bg-white dark:bg-slate-900 transition-all group">
              <Upload className="w-7 h-7 text-slate-400 group-hover:text-emerald-500 transition-colors mb-2" />
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 group-hover:text-emerald-600">
                Click or Drag & Drop Pictures
              </span>
              <span className="text-[11px] text-slate-400 mt-1">
                JPG, PNG, WEBP files supported
              </span>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>

            {/* Custom URL Input */}
            <div className="flex flex-col gap-2 justify-center bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800">
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <LinkIcon className="w-3.5 h-3.5 text-slate-400" />
                Or Add Image Web Link (URL):
              </span>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={customUrl}
                  onChange={(e) => setCustomUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="flex-1 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 p-2.5 text-xs focus:outline-none focus:border-emerald-500"
                />
                <button
                  type="button"
                  onClick={handleAddCustomUrl}
                  className="px-3.5 py-2.5 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl text-xs font-bold hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:hover:text-white transition-colors"
                >
                  Add
                </button>
              </div>

              {/* Presets */}
              <div className="mt-2 flex flex-col gap-1.5">
                <span className="text-[10px] font-bold uppercase text-slate-400">
                  Quick Sample Presets:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {PRESET_SAMPLE_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddPreset(preset.url)}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300 hover:bg-emerald-100 dark:hover:bg-emerald-950 hover:text-emerald-700 dark:hover:text-emerald-400 transition-all font-medium flex items-center gap-1"
                    >
                      <Plus className="w-3 h-3" />
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Picture Thumbnails Grid */}
          {imagesList.length > 0 ? (
            <div className="mt-2 flex flex-col gap-2">
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                Uploaded Pictures (Click star to set Main Image):
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
                {imagesList.map((img) => (
                  <div
                    key={img.id}
                    className={`relative group rounded-2xl overflow-hidden border-2 aspect-square bg-slate-100 dark:bg-slate-800 transition-all ${
                      img.isMain
                        ? "border-emerald-500 shadow-md ring-2 ring-emerald-500/20"
                        : "border-slate-200 dark:border-slate-800"
                    }`}
                  >
                    <img
                      src={img.url}
                      alt="Product preview"
                      className="w-full h-full object-cover"
                    />

                    {/* Main Badge */}
                    {img.isMain && (
                      <span className="absolute top-2 left-2 px-2 py-0.5 bg-emerald-600 text-white text-[10px] font-bold rounded-lg shadow-sm flex items-center gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        Main
                      </span>
                    )}

                    {/* Controls Overlay */}
                    <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-2">
                      {!img.isMain && (
                        <button
                          type="button"
                          onClick={() => handleSetMain(img.id)}
                          title="Set as Main Picture"
                          className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl transition-all shadow-sm"
                        >
                          <Star className="w-3.5 h-3.5" />
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(img.id)}
                        title="Remove Picture"
                        className="p-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl transition-all shadow-sm"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-amber-600 dark:amber-400 font-semibold bg-amber-50 dark:bg-amber-950/30 rounded-xl">
              ⚠️ No pictures added yet. Please upload or choose a picture link above.
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
            Short Description
          </label>
          <input
            {...register("shortDescription")}
            placeholder="Brief 1-line product highlight..."
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3 text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
            Description
          </label>
          <textarea
            rows={3}
            placeholder="Detailed description of the product..."
            {...register("description")}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold uppercase text-slate-700 dark:text-slate-300">
            Additional Info
          </label>
          <textarea
            rows={2}
            placeholder="Storage instructions, origin, nutritional facts..."
            {...register("AdditionalInfo")}
            className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-3.5 text-xs focus:outline-none focus:border-emerald-500"
          />
        </div>

        <Button
          type="submit"
          size="lg"
          isLoading={isSubmitting}
          className="w-max mt-2"
          leftIcon={<Save className="w-4 h-4" />}
        >
          Publish Product
        </Button>
      </form>
    </div>
  );
};


