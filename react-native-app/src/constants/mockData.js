export const MOCK_USER_CUSTOMER = {
  _id: "usr_cust_1",
  name: "Demo Customer",
  email: "demo.customer@ecobazar.com",
  role: "user",
  phone: "+1 (555) 019-0000",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
  addresses: [
    {
      _id: "addr_1",
      street: "742 Evergreen Terrace",
      city: "Springfield",
      state: "IL",
      zipCode: "62704",
      country: "United States",
      isDefault: true
    }
  ]
};

export const MOCK_USER_ADMIN = {
  _id: "usr_admin_1",
  name: "Alexander Wright",
  email: "admin@ecobazar.com",
  role: "admin",
  phone: "+1 (555) 999-0011",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80"
};

export const CATEGORIES = [
  { _id: "cat_1", name: "Fruits & Veggies", slug: "fruits-vegetables", icon: "leaf" },
  { _id: "cat_2", name: "Cold Pressed Oils", slug: "cold-pressed-oils", icon: "water" },
  { _id: "cat_3", name: "Dairy & Eggs", slug: "dairy-eggs", icon: "egg" },
  { _id: "cat_4", name: "Bakery", slug: "artisanal-bakery", icon: "nutrition" },
  { _id: "cat_5", name: "Beverages", slug: "beverages", icon: "cafe" }
];

export const MOCK_PRODUCTS = [
  {
    _id: "prod_1",
    name: "Fresh Organic Hass Avocados (Pack of 3)",
    slug: "fresh-organic-hass-avocados",
    category: "Fruits & Veggies",
    price: 4.99,
    originalPrice: 6.99,
    discountPercentage: 28,
    rating: 4.8,
    reviewsCount: 142,
    stock: 25,
    unit: "pack",
    isFeatured: true,
    isOrganic: true,
    description: "Creamy, nutrient-rich Haas avocados handpicked at peak ripeness from certified organic groves.",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80"
  },
  {
    _id: "prod_2",
    name: "Pure Cold-Pressed Extra Virgin Olive Oil 500ml",
    slug: "cold-pressed-olive-oil",
    category: "Cold Pressed Oils",
    price: 14.50,
    originalPrice: 18.00,
    discountPercentage: 19,
    rating: 4.9,
    reviewsCount: 89,
    stock: 14,
    unit: "bottle",
    isFeatured: true,
    isOrganic: true,
    description: "Single-origin unfiltered extra virgin olive oil made from early harvest Koroneiki olives.",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80"
  },
  {
    _id: "prod_3",
    name: "Pasture-Raised Free-Range Brown Eggs (1 Dozen)",
    slug: "pasture-raised-brown-eggs",
    category: "Dairy & Eggs",
    price: 5.75,
    originalPrice: 6.50,
    discountPercentage: 12,
    rating: 4.7,
    reviewsCount: 204,
    stock: 30,
    unit: "carton",
    isFeatured: true,
    isOrganic: true,
    description: "Rich golden yolks from free-range pasture-raised hens roaming on certified green meadows.",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=80"
  },
  {
    _id: "prod_4",
    name: "Raw Wildflower Organic Honey 350g",
    slug: "raw-wildflower-organic-honey",
    category: "Artisanal Bakery",
    price: 8.99,
    originalPrice: 10.99,
    discountPercentage: 18,
    rating: 4.9,
    reviewsCount: 95,
    stock: 18,
    unit: "jar",
    isFeatured: true,
    isOrganic: true,
    description: "Pure, unfiltered, enzyme-rich raw honey sourced straight from ethical mountain beekeepers.",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80"
  },
  {
    _id: "prod_5",
    name: "Organic Crisp Gala Apples 1kg",
    slug: "organic-crisp-gala-apples",
    category: "Fruits & Veggies",
    price: 3.49,
    originalPrice: 4.29,
    discountPercentage: 18,
    rating: 4.6,
    reviewsCount: 68,
    stock: 45,
    unit: "kg",
    isFeatured: false,
    isOrganic: true,
    description: "Juicy, sweet organic gala apples harvested freshly from high-altitude mountain orchards.",
    image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80"
  },
  {
    _id: "prod_6",
    name: "Artisan Sourdough Country Loaf 500g",
    slug: "artisan-sourdough-country-loaf",
    category: "Bakery",
    price: 4.25,
    originalPrice: 5.00,
    discountPercentage: 15,
    rating: 4.9,
    reviewsCount: 112,
    stock: 12,
    unit: "loaf",
    isFeatured: false,
    isOrganic: true,
    description: "Naturally fermented sourdough with wild starter, slow-proved for 36 hours for a crispy crust.",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
  }
];

export const MOCK_ORDERS = [
  {
    _id: "ORD-2026-9041",
    userName: "Demo Customer",
    userEmail: "demo.customer@ecobazar.com",
    totalAmount: 34.48,
    status: "Delivered",
    orderDate: "2026-07-20",
    paymentMethod: "Cash on Delivery",
    items: [
      { name: "Fresh Organic Hass Avocados", qty: 2, price: 4.99 },
      { name: "Pure Cold-Pressed Extra Virgin Olive Oil", qty: 1, price: 14.50 },
      { name: "Pasture-Raised Free-Range Brown Eggs", qty: 1, price: 5.75 }
    ]
  },
  {
    _id: "ORD-2026-8812",
    userName: "Demo Customer",
    userEmail: "demo.customer@ecobazar.com",
    totalAmount: 17.98,
    status: "Shipped",
    orderDate: "2026-07-22",
    paymentMethod: "bKash / Mobile Banking",
    items: [
      { name: "Raw Wildflower Organic Honey", qty: 2, price: 8.99 }
    ]
  }
];
