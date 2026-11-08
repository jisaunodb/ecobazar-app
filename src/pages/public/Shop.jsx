import { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Grid, List, RotateCcw, Search, SlidersHorizontal } from "lucide-react";
import { ProductCard } from "../../components/product/ProductCard";
import { Breadcrumb } from "../../components/common/Breadcrumb";
import { Pagination } from "../../components/common/Pagination";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchProducts, setFilters, resetFilters } from "../../redux/slices/productSlice";
export const Shop = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const { products, categories, isLoading, filters } = useAppSelector(
    (state) => state.products
  );
  const categoryParam = searchParams.get("category") || "";
  useEffect(() => {
    dispatch(fetchProducts());
    if (categoryParam) {
      dispatch(setFilters({ category: categoryParam }));
    }
  }, [dispatch, categoryParam]);
  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (filters.category) {
      list = list.filter(
        (p) => p.category.toLowerCase() === filters.category.toLowerCase()
      );
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
      );
    }
    if (filters.minPrice > 0 || filters.maxPrice < 500) {
      list = list.filter((p) => {
        const price = p.discountPrice ?? p.price;
        return price >= filters.minPrice && price <= filters.maxPrice;
      });
    }
    if (filters.rating > 0) {
      list = list.filter((p) => p.ratings >= filters.rating);
    }
    if (filters.sort === "price-low") {
      list.sort((a, b) => (a.discountPrice ?? a.price) - (b.discountPrice ?? b.price));
    } else if (filters.sort === "price-high") {
      list.sort((a, b) => (b.discountPrice ?? b.price) - (a.discountPrice ?? a.price));
    } else if (filters.sort === "rating") {
      list.sort((a, b) => b.ratings - a.ratings);
    }
    return list;
  }, [products, filters]);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleCategorySelect = (catName) => {
    const newCat = filters.category === catName ? "" : catName;
    dispatch(setFilters({ category: newCat }));
    if (newCat) {
      setSearchParams({ category: newCat });
    } else {
      setSearchParams({});
    }
    setCurrentPage(1);
  };
  const handleReset = () => {
    dispatch(resetFilters());
    setSearchParams({});
    setCurrentPage(1);
  };
  return <div className="flex flex-col gap-6 pb-12">
      <Breadcrumb items={[{ label: "Shop" }]} />

      <div className="flex flex-col lg:flex-row gap-8">
        {
    /* Sidebar Filters */
  }
        <aside className="w-full lg:w-64 shrink-0 flex flex-col gap-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 shadow-soft flex flex-col gap-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-emerald-600" /> Filter Products
              </span>
              <button
    onClick={handleReset}
    className="text-xs text-rose-600 hover:underline flex items-center gap-1 font-semibold"
  >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            {
    /* Categories */
  }
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Categories</h4>
              <div className="flex flex-col gap-1.5">
                {categories.map((cat) => <button
    key={cat._id}
    onClick={() => handleCategorySelect(cat.name)}
    className={`text-left px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-between ${filters.category.toLowerCase() === cat.name.toLowerCase() ? "bg-emerald-600 text-white" : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
  >
                    <span>{cat.name}</span>
                    <span className="text-[10px] opacity-70">({cat.productCount})</span>
                  </button>)}
              </div>
            </div>

            {
    /* Price Range Filter */
  }
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Max Price (${filters.maxPrice})</h4>
              <input
    type="range"
    min="0"
    max="300"
    step="5"
    value={filters.maxPrice}
    onChange={(e) => {
      dispatch(setFilters({ maxPrice: Number(e.target.value) }));
      setCurrentPage(1);
    }}
    className="w-full accent-emerald-600 cursor-pointer"
  />
              <div className="flex justify-between text-xs font-bold text-slate-600 dark:text-slate-400">
                <span>$0</span>
                <span>$300</span>
              </div>
            </div>

            {
    /* Rating Filter */
  }
            <div className="flex flex-col gap-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Minimum Rating</h4>
              <div className="flex flex-col gap-1">
                {[4, 3, 2, 1].map((stars) => <button
    key={stars}
    onClick={() => {
      dispatch(setFilters({ rating: filters.rating === stars ? 0 : stars }));
      setCurrentPage(1);
    }}
    className={`text-xs p-2 rounded-xl border text-left transition-all ${filters.rating === stars ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 font-bold" : "border-slate-200 dark:border-slate-800 text-slate-600 hover:bg-slate-50"}`}
  >
                    ⭐ {stars} Stars & Above
                  </button>)}
              </div>
            </div>
          </div>
        </aside>

        {
    /* Product Grid Area */
  }
        <div className="flex-1 flex flex-col gap-6">
          {
    /* Top Filter Bar */
  }
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-4 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
              Showing <span className="text-emerald-600">{filteredProducts.length}</span> Products
            </p>

            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
              {
    /* Sort Select */
  }
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500">Sort:</span>
                <select
    value={filters.sort}
    onChange={(e) => dispatch(setFilters({ sort: e.target.value }))}
    className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-1.5 text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-emerald-500"
  >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {
    /* View Mode Toggle */
  }
              <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl p-1 bg-slate-50 dark:bg-slate-800">
                <button
    onClick={() => setViewMode("grid")}
    className={`p-1.5 rounded-lg transition-colors ${viewMode === "grid" ? "bg-emerald-600 text-white" : "text-slate-400"}`}
  >
                  <Grid className="w-4 h-4" />
                </button>
                <button
    onClick={() => setViewMode("list")}
    className={`p-1.5 rounded-lg transition-colors ${viewMode === "list" ? "bg-emerald-600 text-white" : "text-slate-400"}`}
  >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {
    /* Product Items */
  }
          {isLoading ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((n) => <div key={n} className="h-72 rounded-2xl bg-slate-200 dark:bg-slate-800 animate-pulse" />)}
            </div> : paginatedProducts.length === 0 ? <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-12 text-center flex flex-col items-center gap-3">
              <Search className="w-12 h-12 text-slate-300" />
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">No Products Found</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Try clearing your search query or selecting a different filter category.
              </p>
              <button
    onClick={handleReset}
    className="mt-2 px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-700"
  >
                Reset All Filters
              </button>
            </div> : <div
    className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" : "flex flex-col gap-4"}
  >
              {paginatedProducts.map((prod) => <ProductCard key={prod._id} product={prod} viewMode={viewMode} />)}
            </div>}

          {
    /* Pagination */
  }
          <Pagination
    currentPage={currentPage}
    totalPages={totalPages}
    onPageChange={(page) => setCurrentPage(page)}
  />
        </div>
      </div>
    </div>;
};
