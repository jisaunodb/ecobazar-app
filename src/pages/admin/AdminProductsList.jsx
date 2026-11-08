import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Plus, Edit3, Trash2, Search, Eye } from "lucide-react";
import { Badge } from "../../components/common/Badge";
import { Modal } from "../../components/common/Modal";
import { formatCurrency } from "../../utils/formatters";
import {
  getProductName,
  getProductCategory,
  getProductMainImage,
  getProductPriceInfo,
  getProductSku,
  getProductStock,
  getProductStatus,
} from "../../utils/productHelpers";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProducts, deleteExistingProduct } from "../../redux/slices/productSlice";
import toast from "react-hot-toast";

export const AdminProductsList = () => {
  const dispatch = useAppDispatch();
  const { products, isLoading } = useAppSelector((state) => state.products);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const filteredProducts = products.filter((p) => {
    const name = getProductName(p).toLowerCase();
    const cat = getProductCategory(p).toLowerCase();
    const brand = (p.brand || "").toLowerCase();
    const sku = getProductSku(p).toLowerCase();
    const term = searchTerm.toLowerCase();

    return name.includes(term) || cat.includes(term) || brand.includes(term) || sku.includes(term);
  });

  const handleDelete = async () => {
    if (deleteId) {
      await dispatch(deleteExistingProduct(deleteId));
      toast.success("Product removed from catalog.");
      setDeleteId(null);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            Product Inventory
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage all EcoBazar organic catalog items, prices, discounts, and stocks
          </p>
        </div>
        <Link
          to="/admin/products/create"
          className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl text-xs font-bold transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-soft flex items-center gap-3">
        <Search className="w-4 h-4 text-slate-400 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search title, category, SKU, or brand..."
          className="w-full bg-transparent text-xs text-slate-900 dark:text-slate-100 focus:outline-none placeholder:text-slate-400"
        />
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 uppercase font-bold text-slate-500 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4">Product Details</th>
                <th className="p-4">SKU</th>
                <th className="p-4">Category</th>
                <th className="p-4">Price</th>
                <th className="p-4">Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    Loading inventory list...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    No products found matching query.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const name = getProductName(p);
                  const cat = getProductCategory(p);
                  const mainImg = getProductMainImage(p);
                  const { price, finalPrice, discountPercentage } = getProductPriceInfo(p);
                  const sku = getProductSku(p);
                  const stock = getProductStock(p);
                  const status = getProductStatus(p);

                  return (
                    <tr key={p._id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={mainImg}
                          alt=""
                          className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0"
                        />
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-900 dark:text-slate-100 text-sm line-clamp-1">
                            {name}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            Brand: {p.brand || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="p-4 font-mono text-[11px] font-semibold text-slate-500">
                        {sku}
                      </td>
                      <td className="p-4 font-semibold text-slate-600 dark:text-slate-300">
                        {cat}
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="font-bold text-emerald-600 dark:text-emerald-400">
                            {formatCurrency(finalPrice)}
                          </span>
                          {discountPercentage > 0 && (
                            <span className="text-[10px] text-slate-400 line-through">
                              {formatCurrency(price)} ({discountPercentage}% off)
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        {stock < 10 ? (
                          <Badge variant="danger">{stock} (Low)</Badge>
                        ) : (
                          <Badge variant="success">{stock} In Stock</Badge>
                        )}
                      </td>
                      <td className="p-4">
                        <Badge
                          variant={
                            status === "active"
                              ? "success"
                              : status === "pending"
                              ? "warning"
                              : "neutral"
                          }
                        >
                          {status}
                        </Badge>
                      </td>
                      <td className="p-4 text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Link
                            to={`/product/${p._id}`}
                            target="_blank"
                            className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                          <Link
                            to={`/admin/products/edit/${p._id}`}
                            className="p-2 text-slate-500 hover:text-emerald-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
                          >
                            <Edit3 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteId(p._id)}
                            className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        title="Confirm Delete Product"
      >
        <div className="flex flex-col gap-4 text-xs text-slate-600 dark:text-slate-300">
          <p>
            Are you sure you want to delete this product? This action cannot be undone and will remove it from the live storefront.
          </p>
          <div className="flex items-center justify-end gap-3 mt-2">
            <button
              onClick={() => setDeleteId(null)}
              className="px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl font-bold hover:bg-slate-100"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-rose-600 text-white rounded-xl font-bold hover:bg-rose-700"
            >
              Delete Product
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

