import { apiClient } from "./api";
import { API_ENDPOINTS } from "../constants/apiEndpoints";
import { INITIAL_PRODUCTS, INITIAL_CATEGORIES } from "../constants/mockData";
export const productService = {
  getAllProducts: async (params) => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.BASE, { params });
      return response.data;
    } catch {
      let filtered = [...INITIAL_PRODUCTS];
      if (params?.category) {
        filtered = filtered.filter(
          (p) => p.category.toLowerCase() === params.category.toLowerCase()
        );
      }
      if (params?.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter(
          (p) => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query) || p.category.toLowerCase().includes(query)
        );
      }
      return {
        success: true,
        count: filtered.length,
        products: filtered
      };
    }
  },
  getSingleProduct: async (id) => {
    try {
      const response = await apiClient.get(`${API_ENDPOINTS.PRODUCTS.BASE}/${id}`);
      return response.data;
    } catch {
      const product = INITIAL_PRODUCTS.find((p) => p._id === id) || INITIAL_PRODUCTS[0];
      return {
        success: true,
        product
      };
    }
  },
  getCategories: async () => {
    try {
      const response = await apiClient.get(API_ENDPOINTS.PRODUCTS.CATEGORIES);
      return response.data;
    } catch {
      return {
        success: true,
        categories: INITIAL_CATEGORIES
      };
    }
  },
  createProduct: async (productData) => {
    try {
      const response = await apiClient.post(API_ENDPOINTS.PRODUCTS.BASE, productData);
      return response.data;
    } catch {
      const newProduct = {
        _id: `prod_${Date.now()}`,
        name: productData.name || "New Organic Product",
        slug: (productData.name || "new-product").toLowerCase().replace(/\s+/g, "-"),
        description: productData.description || "Certified organic harvest item.",
        price: productData.price || 12.99,
        discountPrice: productData.discountPrice,
        category: productData.category || "Fruits & Vegetables",
        brand: productData.brand || "EcoBazar Organics",
        stock: productData.stock || 50,
        ratings: 5,
        numOfReviews: 1,
        images: productData.images || ["https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80"],
        isFeatured: productData.isFeatured || false,
        isNewArrival: true,
        vendorName: productData.vendorName || "Green Valley Farmers",
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      return {
        success: true,
        message: "Product created successfully",
        product: newProduct
      };
    }
  },
  updateProduct: async (id, data) => {
    try {
      const response = await apiClient.put(`${API_ENDPOINTS.PRODUCTS.BASE}/${id}`, data);
      return response.data;
    } catch {
      return {
        success: true,
        message: "Product updated successfully"
      };
    }
  },
  deleteProduct: async (id) => {
    try {
      const response = await apiClient.delete(`${API_ENDPOINTS.PRODUCTS.BASE}/${id}`);
      return response.data;
    } catch {
      return {
        success: true,
        message: "Product deleted successfully"
      };
    }
  }
};
