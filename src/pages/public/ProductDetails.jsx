import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart, ShoppingCart, Truck, ShieldCheck, RefreshCw, Check } from "lucide-react";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { Rating } from "../../components/common/Rating";
import { ProductCard } from "../../components/product/ProductCard";
import { Button } from "../../components/common/Button";
import { formatCurrency } from "../../utils/formatters";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart } from "../../redux/slices/cartSlice";
import { toggleWishlist } from "../../redux/slices/wishlistSlice";
import { fetchSingleProduct } from "../../redux/slices/productSlice";
import toast from "react-hot-toast";
export const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const { selectedProduct, products, isLoading } = useAppSelector((state) => state.products);
  const wishlist = useAppSelector((state) => state.wishlist.items);
  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [id, dispatch]);
  useEffect(() => {
    if (selectedProduct?.images?.[0]) {
      setSelectedImage(selectedProduct.images[0]);
    }
  }, [selectedProduct]);
  if (isLoading || !selectedProduct) {
    return <div className="py-12 flex justify-center">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </div>;
  }
  const isWishlisted = wishlist.some((item) => item._id === selectedProduct._id);
  const relatedProducts = products.filter((p) => p.category === selectedProduct.category && p._id !== selectedProduct._id).slice(0, 4);
  const handleAddToCart = () => {
    dispatch(addToCart({ product: selectedProduct, quantity }));
    toast.success(`${quantity} x ${selectedProduct.name} added to cart!`);
  };
  const handleToggleWishlist = () => {
    dispatch(toggleWishlist(selectedProduct));
    if (isWishlisted) {
      toast.error("Removed from wishlist");
    } else {
      toast.success("Added to wishlist!");
    }
  };
  return <div className="flex flex-col gap-8 pb-12">
      <Breadcrumb
    items={[
      { label: "Shop", path: "/shop" },
      { label: selectedProduct.category, path: `/shop?category=${selectedProduct.category}` },
      { label: selectedProduct.name }
    ]}
  />

      {
    /* Main Product Info Section */
  }
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-soft grid grid-cols-1 lg:grid-cols-2 gap-10">
        {
    /* Left Gallery */
  }
        <div className="flex flex-col gap-4">
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-800">
            <img
    src={selectedImage || selectedProduct.images[0]}
    alt={selectedProduct.name}
    className="w-full h-full object-cover transition-all duration-300"
  />
            {selectedProduct.discountPercentage && <span className="absolute top-4 left-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                -{selectedProduct.discountPercentage}% OFF
              </span>}
          </div>

          {
    /* Thumbnails */
  }
          {selectedProduct.images.length > 1 && <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {selectedProduct.images.map((img, idx) => <button
    key={idx}
    onClick={() => setSelectedImage(img)}
    className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${selectedImage === img ? "border-emerald-600 scale-95" : "border-slate-200 dark:border-slate-800 opacity-70 hover:opacity-100"}`}
  >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>)}
            </div>}
        </div>

        {
    /* Right Product Details */
  }
        <div className="flex flex-col justify-between gap-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                {selectedProduct.category} • {selectedProduct.brand}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 dark:bg-emerald-950 px-2.5 py-0.5 rounded-full">
                <Check className="w-3.5 h-3.5" /> In Stock ({selectedProduct.stock})
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100">
              {selectedProduct.name}
            </h1>

            <div className="flex items-center gap-4">
              <Rating value={selectedProduct.ratings} reviewsCount={selectedProduct.numOfReviews} size="md" />
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500 font-medium">
                Vendor: <strong className="text-slate-900 dark:text-slate-100">{selectedProduct.vendorName || "EcoBazar"}</strong>
              </span>
            </div>

            {
    /* Price */
  }
            <div className="flex items-baseline gap-3 my-2">
              <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-100">
                {formatCurrency(selectedProduct.discountPrice ?? selectedProduct.price)}
              </span>
              {selectedProduct.discountPrice && <span className="text-lg text-slate-400 line-through">
                  {formatCurrency(selectedProduct.price)}
                </span>}
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>

          {
    /* Actions & Quantity */
  }
          <div className="flex flex-col gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase">Quantity:</span>
              <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50 dark:bg-slate-800">
                <button
    onClick={() => setQuantity(Math.max(1, quantity - 1))}
    className="px-3 py-1.5 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 rounded-l-xl"
  >
                  -
                </button>
                <span className="px-4 py-1.5 text-xs font-bold text-slate-900 dark:text-slate-100">
                  {quantity}
                </span>
                <button
    onClick={() => setQuantity(quantity + 1)}
    className="px-3 py-1.5 text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 rounded-r-xl"
  >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
    onClick={handleAddToCart}
    size="lg"
    className="flex-1"
    leftIcon={<ShoppingCart className="w-5 h-5" />}
  >
                Add to Cart
              </Button>

              <button
    onClick={handleToggleWishlist}
    className={`p-3.5 rounded-2xl border transition-colors ${isWishlisted ? "bg-rose-50 border-rose-200 text-rose-600" : "border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50"}`}
  >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-rose-600" : ""}`} />
              </button>
            </div>
          </div>

          {
    /* Guarantees */
  }
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Fast 24h Shipping</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Organic</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RefreshCw className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Easy 30-Day Return</span>
            </div>
          </div>
        </div>
      </div>

      {
    /* Tabs Section */
  }
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 shadow-soft flex flex-col gap-6">
        <div className="flex items-center gap-6 border-b border-slate-200 dark:border-slate-800">
          <button
    onClick={() => setActiveTab("description")}
    className={`pb-3 text-sm font-bold border-b-2 transition-all ${activeTab === "description" ? "border-emerald-600 text-emerald-600 dark:text-emerald-400" : "border-transparent text-slate-500 hover:text-slate-800"}`}
  >
            Detailed Description
          </button>
          <button
    onClick={() => setActiveTab("reviews")}
    className={`pb-3 text-sm font-bold border-b-2 transition-all ${activeTab === "reviews" ? "border-emerald-600 text-emerald-600 dark:text-emerald-400" : "border-transparent text-slate-500 hover:text-slate-800"}`}
  >
            Customer Reviews ({selectedProduct.numOfReviews})
          </button>
          <button
    onClick={() => setActiveTab("vendor")}
    className={`pb-3 text-sm font-bold border-b-2 transition-all ${activeTab === "vendor" ? "border-emerald-600 text-emerald-600 dark:text-emerald-400" : "border-transparent text-slate-500 hover:text-slate-800"}`}
  >
            Vendor Information
          </button>
        </div>

        {activeTab === "description" && <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex flex-col gap-3">
            <p>{selectedProduct.description}</p>
            <ul className="list-disc list-inside space-y-1 text-slate-500">
              <li>100% Certified Organic & Non-GMO Project Verified.</li>
              <li>Responsibly harvested using sustainable eco-friendly farming practices.</li>
              <li>Kept in optimal cold-chain storage to guarantee crispness and flavor.</li>
            </ul>
          </div>}

        {activeTab === "reviews" && <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-2xl">
              <div className="text-3xl font-black text-slate-900 dark:text-slate-100">
                {selectedProduct.ratings.toFixed(1)}
              </div>
              <div>
                <Rating value={selectedProduct.ratings} showCount={false} size="md" />
                <span className="text-xs text-slate-500">Based on {selectedProduct.numOfReviews} verified buyers</span>
              </div>
            </div>

            {
    /* Sample review list */
  }
            <div className="flex flex-col gap-3 pt-2">
              <div className="p-4 border border-slate-100 dark:border-slate-800 rounded-2xl flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">Verified Buyer</span>
                  <Rating value={5} showCount={false} />
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  "Exceeded my expectations! The taste is so fresh and crisp. Delivery was lightning fast too."
                </p>
              </div>
            </div>
          </div>}

        {activeTab === "vendor" && <div className="flex flex-col gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            <h4 className="font-bold text-slate-900 dark:text-slate-100">{selectedProduct.vendorName || "Green Valley Organics"}</h4>
            <p>Certified Organic Merchant since 2021. Specializing in daily fresh produce and zero-waste logistics.</p>
          </div>}
      </div>

      {
    /* Related Products */
  }
      {relatedProducts.length > 0 && <div className="flex flex-col gap-6 mt-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">Related Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {relatedProducts.map((prod) => <ProductCard key={prod._id} product={prod} />)}
          </div>
        </div>}
    </div>;
};
