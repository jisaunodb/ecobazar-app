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
  ],
  isVerified: true,
  createdAt: "2026-01-15"
};
export const MOCK_USER_ADMIN = {
  _id: "usr_admin_1",
  name: "Alexander Wright",
  email: "admin@ecobazar.com",
  role: "admin",
  phone: "+1 (555) 999-0011",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
  isVerified: true,
  createdAt: "2025-11-01"
};
export const INITIAL_CATEGORIES = [
  {
    _id: "cat_1",
    name: "Fruits & Vegetables",
    slug: "fruits-vegetables",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=400&q=80",
    productCount: 42
  },
  {
    _id: "cat_2",
    name: "Cold Pressed Oils",
    slug: "cold-pressed-oils",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=400&q=80",
    productCount: 18
  },
  {
    _id: "cat_3",
    name: "Dairy & Eggs",
    slug: "dairy-eggs",
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=400&q=80",
    productCount: 24
  },
  {
    _id: "cat_4",
    name: "Artisanal Bakery",
    slug: "artisanal-bakery",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=400&q=80",
    productCount: 15
  },
  {
    _id: "cat_5",
    name: "Eco Household",
    slug: "eco-household",
    image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=400&q=80",
    productCount: 31
  },
  {
    _id: "cat_6",
    name: "Nuts & Seeds",
    slug: "nuts-seeds",
    image: "https://images.unsplash.com/photo-1536591375315-1b83689e3772?auto=format&fit=crop&w=400&q=80",
    productCount: 29
  }
];
export const INITIAL_PRODUCTS = [
  {
    _id: "prod_1",
    name: "Organic Honeycrisp Crisp Apples",
    slug: "organic-honeycrisp-apples",
    description: "Freshly harvested crisp organic Honeycrisp apples from local biodynamic orchards. Rich in fiber, antioxidant phytochemicals, and natural sweetness without any chemical pesticides.",
    price: 8.99,
    discountPrice: 6.49,
    discountPercentage: 27,
    category: "Fruits & Vegetables",
    brand: "EcoBazar Organics",
    stock: 45,
    ratings: 4.9,
    numOfReviews: 128,
    images: [
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    isNewArrival: false,
    vendorName: "Green Valley Farmers",
    createdAt: "2026-04-01"
  },
  {
    _id: "prod_2",
    name: "Extra Virgin Extra-Cold Olive Oil (500ml)",
    slug: "extra-virgin-olive-oil",
    description: "First cold-pressed unrefined extra virgin olive oil crafted from hand-picked estate olives. Ideal for fresh salads, light saut\xE9ing, and Mediterranean dipping.",
    price: 19.99,
    discountPrice: 15.99,
    discountPercentage: 20,
    category: "Cold Pressed Oils",
    brand: "Verde Estate",
    stock: 22,
    ratings: 4.8,
    numOfReviews: 89,
    images: [
      "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    isNewArrival: false,
    vendorName: "Verde Estate Co.",
    createdAt: "2026-03-28"
  },
  {
    _id: "prod_3",
    name: "Pasture-Raised Organic Whole Milk (1 Gallon)",
    slug: "pasture-raised-organic-milk",
    description: "Pure, non-homogenized organic pasture-raised whole milk sourced from grass-fed family dairy cows. Farm fresh taste delivered cold.",
    price: 6.49,
    category: "Dairy & Eggs",
    brand: "PureMeadow Dairy",
    stock: 30,
    ratings: 4.7,
    numOfReviews: 64,
    images: [
      "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: false,
    isNewArrival: true,
    vendorName: "PureMeadow Farm",
    createdAt: "2026-04-10"
  },
  {
    _id: "prod_4",
    name: "Slow Ferment Sourdough Artisan Loaf",
    slug: "sourdough-artisan-loaf",
    description: "Wild yeast sourdough bread baked with stone-ground organic heritage flour. 36-hour slow fermentation yields deep flavor and airy crust.",
    price: 7.5,
    discountPrice: 5.99,
    discountPercentage: 20,
    category: "Artisanal Bakery",
    brand: "Hearth & Grain",
    stock: 8,
    ratings: 4.9,
    numOfReviews: 210,
    images: [
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    isNewArrival: false,
    vendorName: "Hearth & Grain Bakery",
    createdAt: "2026-04-12"
  },
  {
    _id: "prod_5",
    name: "Raw Organic Almonds (1lb Pack)",
    slug: "raw-organic-almonds",
    description: "Unsalted, unpasteurized raw organic almonds from sustainable California groves. Dense in plant protein, magnesium, and vitamin E.",
    price: 14.99,
    category: "Nuts & Seeds",
    brand: "EcoBazar Organics",
    stock: 50,
    ratings: 4.8,
    numOfReviews: 45,
    images: [
      "https://images.unsplash.com/photo-1536591375315-1b83689e3772?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: false,
    isNewArrival: true,
    vendorName: "Valley Nut Co.",
    createdAt: "2026-04-05"
  },
  {
    _id: "prod_6",
    name: "Zero-Waste Bamboo Kitchen Cleaning Brushes",
    slug: "bamboo-kitchen-brushes",
    description: "Set of 4 biodegradable natural sisal fiber and sustainable FSC bamboo dish scrubbing brushes. Replace plastic sponge pollution effortlessly.",
    price: 12.99,
    discountPrice: 9.99,
    discountPercentage: 23,
    category: "Eco Household",
    brand: "EcoEarth",
    stock: 60,
    ratings: 4.6,
    numOfReviews: 78,
    images: [
      "https://images.unsplash.com/photo-1583947215259-38e31be8751f?auto=format&fit=crop&w=800&q=80"
    ],
    isFeatured: true,
    isNewArrival: true,
    vendorName: "EcoEarth Goods",
    createdAt: "2026-04-15"
  }
];
export const MOCK_ORDERS = [
  {
    _id: "ORD-2026-9041",
    userName: "Demo Customer",
    userEmail: "demo.customer@ecobazar.com",
    orderItems: [
      {
        product: "prod_1",
        name: "Organic Honeycrisp Crisp Apples",
        price: 6.49,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80"
      },
      {
        product: "prod_2",
        name: "Extra Virgin Extra-Cold Olive Oil (500ml)",
        price: 15.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80"
      }
    ],
    shippingAddress: {
      street: "742 Evergreen Terrace",
      city: "Springfield",
      state: "IL",
      zipCode: "62704",
      country: "United States"
    },
    paymentMethod: "Credit Card",
    paymentStatus: "paid",
    orderStatus: "delivered",
    itemsPrice: 28.97,
    shippingPrice: 0,
    taxPrice: 2.31,
    totalPrice: 31.28,
    createdAt: "2026-04-18T10:30:00Z"
  },
  {
    _id: "ORD-2026-8812",
    userName: "Michael Brown",
    userEmail: "michael.brown@example.com",
    orderItems: [
      {
        product: "prod_4",
        name: "Slow Ferment Sourdough Artisan Loaf",
        price: 5.99,
        quantity: 3,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80"
      }
    ],
    shippingAddress: {
      street: "120 Ocean View Ave",
      city: "Monterey",
      state: "CA",
      zipCode: "93940",
      country: "United States"
    },
    paymentMethod: "PayPal",
    paymentStatus: "paid",
    orderStatus: "shipped",
    itemsPrice: 17.97,
    shippingPrice: 5,
    taxPrice: 1.44,
    totalPrice: 24.41,
    createdAt: "2026-04-20T14:15:00Z"
  }
];
