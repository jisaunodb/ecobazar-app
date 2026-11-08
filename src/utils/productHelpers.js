export const getProductName = (product) => {
  if (!product) return "Product";
  return product.title || product.name || "Untitled Product";
};

export const getProductCategory = (product) => {
  if (!product) return "General";
  return product.Category || product.category || "General";
};

export const getProductSubCategory = (product) => {
  if (!product) return "";
  return product.subCategory || "";
};

export const getProductImages = (product) => {
  if (!product || !product.images || !Array.isArray(product.images)) {
    return ["https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80"];
  }
  return product.images.map((img) => {
    if (typeof img === "string") return img;
    if (img && typeof img === "object" && img.url) return img.url;
    return "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80";
  });
};

export const getProductMainImage = (product) => {
  const images = getProductImages(product);
  if (!product || !Array.isArray(product.images)) return images[0];

  // Look for image with isMain = true
  const mainObj = product.images.find(
    (img) => typeof img === "object" && img !== null && img.isMain
  );
  if (mainObj && mainObj.url) return mainObj.url;

  return images[0] || "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80";
};

export const getProductPriceInfo = (product) => {
  if (!product) {
    return { price: 0, finalPrice: 0, discountPrice: 0, discountPercentage: 0 };
  }

  const price = Number(product.price) || 0;
  const discountVal = Number(product.discountPrice) || 0;

  // Check if virtual finalPrice is already supplied
  if (typeof product.finalPrice === "number" && !isNaN(product.finalPrice)) {
    return {
      price,
      finalPrice: product.finalPrice,
      discountPrice: discountVal,
      discountPercentage: discountVal > 0 && discountVal <= 100 ? discountVal : Math.round(((price - product.finalPrice) / price) * 100)
    };
  }

  // If discountVal is percentage (min 0, max 100 in schema)
  if (discountVal > 0 && discountVal <= 100) {
    const calculatedFinal = price - (price * discountVal) / 100;
    return {
      price,
      finalPrice: Number(calculatedFinal.toFixed(2)),
      discountPrice: discountVal,
      discountPercentage: Math.round(discountVal)
    };
  }

  // If discountVal is stored as discounted fixed price < price
  if (discountVal > 0 && discountVal < price) {
    const pct = Math.round(((price - discountVal) / price) * 100);
    return {
      price,
      finalPrice: discountVal,
      discountPrice: discountVal,
      discountPercentage: pct
    };
  }

  return {
    price,
    finalPrice: price,
    discountPrice: 0,
    discountPercentage: 0
  };
};

export const getProductSku = (product) => {
  if (!product) return "SKU-000";
  return product.sku || `SKU-${(product._id || "000").substring(0, 8).toUpperCase()}`;
};

export const getProductStock = (product) => {
  if (!product) return 0;
  return typeof product.stock === "number" ? product.stock : 0;
};

export const getProductStatus = (product) => {
  if (!product) return "active";
  return product.status || "active";
};

export const getProductTags = (product) => {
  if (!product) return [];
  if (Array.isArray(product.tag)) return product.tag;
  if (Array.isArray(product.tags)) return product.tags;
  return [];
};
