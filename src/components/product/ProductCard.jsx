import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag, Heart, Eye } from "lucide-react";
import { Rating } from "../common/Rating";
import { Badge } from "../common/Badge";
import { formatCurrency } from "../../utils/formatters";
import {
  getProductName,
  getProductCategory,
  getProductMainImage,
  getProductPriceInfo,
} from "../../utils/productHelpers";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addToCart } from "../../redux/slices/cartSlice";
import { toggleWishlist } from "../../redux/slices/wishlistSlice";
import toast from "react-hot-toast";

export const ProductCard = ({ product }) => {
  const dispatch = useAppDispatch();
  const wishlistItems = useAppSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.some((item) => item._id === product._id);

  const productName = getProductName(product);
  const productCat = getProductCategory(product);
  const mainImage = getProductMainImage(product);
  const { price, finalPrice, discountPercentage } = getProductPriceInfo(product);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart({ product, quantity: 1 }));
    toast.success(`Added ${productName} to cart!`);
  };

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleWishlist(product));
    if (isWishlisted) {
      toast.error(`Removed from wishlist`);
    } else {
      toast.success(`Saved to wishlist!`);
    }
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl overflow-hidden hover:shadow-soft-lg transition-all duration-300 flex flex-col h-full">
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
        {discountPercentage > 0 && (
          <Badge variant="danger">-{discountPercentage}% OFF</Badge>
        )}
        {product.isFeatured && <Badge variant="warning">Featured</Badge>}
        {product.isNewArrival && <Badge variant="info">New Harvest</Badge>}
        {product.status && product.status !== "active" && (
          <Badge variant="neutral">{product.status}</Badge>
        )}
      </div>

      <button
        onClick={handleToggleWishlist}
        className={`absolute top-3 right-3 z-10 p-2.5 rounded-2xl backdrop-blur-md transition-all shadow-sm ${
          isWishlisted
            ? "bg-rose-500 text-white"
            : "bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-rose-500"
        }`}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
      </button>

      <Link
        to={`/product/${product._id}`}
        className="relative block aspect-square overflow-hidden bg-slate-50 dark:bg-slate-800/40"
      >
        <img
          src={mainImage}
          alt={productName}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="px-3.5 py-1.5 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-slate-100 rounded-2xl text-xs font-bold shadow-md flex items-center gap-1.5 backdrop-blur-sm">
            <Eye className="w-3.5 h-3.5" /> Quick View
          </span>
        </div>
      </Link>

      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            {productCat}
          </span>
          <Link to={`/product/${product._id}`}>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm line-clamp-2 hover:text-emerald-600 transition-colors">
              {productName}
            </h3>
          </Link>
          <div className="mt-1">
            <Rating value={product.ratings || 4.8} size="sm" />
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 mt-auto">
          <div className="flex flex-col">
            <span className="text-base font-black text-slate-900 dark:text-slate-100">
              {formatCurrency(finalPrice)}
            </span>
            {discountPercentage > 0 && (
              <span className="text-[11px] text-slate-400 line-through">
                {formatCurrency(price)}
              </span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            className="p-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl transition-all shadow-md shadow-emerald-600/20 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

