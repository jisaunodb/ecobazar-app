// =============================================================================
// 🌿 ECOBAZAR - REACT NATIVE APPLICATION
// Built with pure React Native primitives: View, Text, StyleSheet, TouchableOpacity,
// ScrollView, TextInput, Image, SafeAreaView
// =============================================================================

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  SafeAreaView
} from "react-native";
import {
  ShoppingBag,
  Heart,
  User,
  Store,
  Package,
  Search,
  Plus,
  Minus,
  Trash2,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Globe,
  Smartphone,
  Maximize2,
  ChevronRight,
  Tag,
  Star
} from "lucide-react";
import { API_BASE_URL as CONFIG_API_URL } from "../config/api";
import { INITIAL_PRODUCTS as MOCK_PRODUCTS, INITIAL_CATEGORIES as CATEGORIES } from "../constants/mockData";
import toast from "react-hot-toast";

export const EcoBazarNativeApp = () => {
  // Navigation State
  const [currentScreen, setCurrentScreen] = useState("home"); // "home" | "shop" | "cart" | "checkout" | "order-success" | "orders" | "account" | "admin" | "admin-products"
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [deviceFrame, setDeviceFrame] = useState(true); // Phone mockup or responsive full

  // 🌐 Backend API Configuration State (user can paste here or in src/config/api.js)
  const [apiUrl, setApiUrl] = useState(CONFIG_API_URL || "");
  const [apiConnected, setApiConnected] = useState(false);
  const [showApiBar, setShowApiBar] = useState(true);

  // App Data State
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [cart, setCart] = useState([
    { ...MOCK_PRODUCTS[0], quantity: 2 },
    { ...MOCK_PRODUCTS[1], quantity: 1 }
  ]);
  const [wishlist, setWishlist] = useState(["prod_1", "prod_3"]);
  const [orders, setOrders] = useState([
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
        { name: "Pure Cold-Pressed Extra Virgin Olive Oil", qty: 1, price: 14.50 }
      ]
    }
  ]);
  const [latestOrder, setLatestOrder] = useState(null);

  // Shop Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured"); // "featured" | "price-low" | "price-high"

  // Checkout Form
  const [shippingName, setShippingName] = useState("Demo Customer");
  const [shippingPhone, setShippingPhone] = useState("+1 (555) 019-0000");
  const [shippingStreet, setShippingStreet] = useState("742 Evergreen Terrace");
  const [shippingCity, setShippingCity] = useState("Springfield");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  // Admin New Product Form
  const [newTitle, setNewTitle] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newCategory, setNewCategory] = useState("Fruits & Veggies");
  const [newStock, setNewStock] = useState("20");

  // 🌐 Test & Sync with Backend API
  const testBackendConnection = async (urlToTest) => {
    const target = urlToTest || apiUrl;
    if (!target) {
      toast("Using built-in demo data (API URL not set)", { icon: "ℹ️" });
      setApiConnected(false);
      return;
    }

    try {
      const res = await fetch(`${target}/products`);
      if (res.ok) {
        const data = await res.json();
        const productList = Array.isArray(data) ? data : data?.products || [];
        if (productList.length > 0) {
          setProducts(productList);
        }
        setApiConnected(true);
        toast.success("Connected to Backend API successfully!");
      } else {
        setApiConnected(false);
        toast.error(`Backend returned HTTP ${res.status}`);
      }
    } catch (e) {
      setApiConnected(false);
      toast.error(`Could not connect to ${target}: ${e.message}`);
    }
  };

  useEffect(() => {
    if (apiUrl) {
      testBackendConnection(apiUrl);
    }
  }, []);

  // Cart operations
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((i) => i._id === product._id);
      if (existing) {
        return prev.map((i) =>
          i._id === product._id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    toast.success(`${qty}x ${product.name} added to cart!`);
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i._id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((i) => i._id !== id));
    toast.success("Item removed from cart");
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Calculations
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const deliveryFee = cart.length > 0 ? 2.99 : 0;
  const totalAmount = subtotal + deliveryFee;

  // Place Order handler
  const handlePlaceOrder = async () => {
    if (!shippingName.trim() || !shippingStreet.trim()) {
      toast.error("Please fill in shipping details");
      return;
    }

    const orderData = {
      _id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      userName: shippingName,
      userEmail: "demo.customer@ecobazar.com",
      totalAmount,
      status: "Pending",
      orderDate: new Date().toISOString().split("T")[0],
      paymentMethod,
      shippingAddress: `${shippingStreet}, ${shippingCity}`,
      items: cart.map((i) => ({ name: i.name, qty: i.quantity, price: i.price }))
    };

    // If backend URL is provided, send to backend API
    if (apiUrl) {
      try {
        await fetch(`${apiUrl}/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(orderData)
        });
      } catch (err) {
        console.log("Backend offline, recorded locally:", err.message);
      }
    }

    setOrders([orderData, ...orders]);
    setLatestOrder(orderData);
    setCart([]);
    setCurrentScreen("order-success");
  };

  // Admin Product Creation
  const handleCreateProduct = async () => {
    if (!newTitle.trim() || !newPrice.trim()) {
      toast.error("Please provide title and price");
      return;
    }

    const newProd = {
      _id: `prod_${Date.now()}`,
      name: newTitle.trim(),
      category: newCategory,
      price: parseFloat(newPrice) || 0,
      stock: parseInt(newStock, 10) || 15,
      rating: 5.0,
      reviewsCount: 1,
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
      description: "100% certified farm-fresh organic grocery produce."
    };

    if (apiUrl) {
      try {
        await fetch(`${apiUrl}/products`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newProd)
        });
      } catch (e) {
        console.log("Could not post to backend:", e.message);
      }
    }

    setProducts([newProd, ...products]);
    setNewTitle("");
    setNewPrice("");
    toast.success("New product added to catalog!");
    setCurrentScreen("shop");
  };

  // Filtered Products for Shop
  let filteredShopProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat =
      selectedCategory === "All" ||
      p.category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  if (sortBy === "price-low") {
    filteredShopProducts.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredShopProducts.sort((a, b) => b.price - a.price);
  }

  return (
    <View style={styles.pageWrapper}>
      {/* Top Floating Control Bar: API Connector & Device Frame Switcher */}
      <View style={styles.topControlBar}>
        <View style={styles.controlLeft}>
          <View style={styles.brandPill}>
            <Text style={styles.brandPillText}>🌿 EcoBazar React Native</Text>
          </View>

          <View style={styles.apiInputContainer}>
            <Globe size={14} color={apiConnected ? "#10b981" : "#f59e0b"} />
            <TextInput
              style={styles.apiInput}
              value={apiUrl}
              onChangeText={setApiUrl}
              placeholder="Paste backend API URL: e.g. http://localhost:5000/api"
              placeholderTextColor="#94a3b8"
            />
            <TouchableOpacity
              style={[styles.apiConnectBtn, apiConnected && styles.apiConnectedBtn]}
              onPress={() => testBackendConnection(apiUrl)}
            >
              <Text style={styles.apiConnectBtnText}>
                {apiConnected ? "Connected ✓" : "Connect API"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.controlRight}>
          <TouchableOpacity
            style={[styles.viewModeBtn, deviceFrame && styles.activeViewModeBtn]}
            onPress={() => setDeviceFrame(true)}
          >
            <Smartphone size={14} color={deviceFrame ? "#ffffff" : "#64748b"} />
            <Text style={[styles.viewModeText, deviceFrame && styles.activeViewModeText]}>
              Mobile View
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.viewModeBtn, !deviceFrame && styles.activeViewModeBtn]}
            onPress={() => setDeviceFrame(false)}
          >
            <Maximize2 size={14} color={!deviceFrame ? "#ffffff" : "#64748b"} />
            <Text style={[styles.viewModeText, !deviceFrame && styles.activeViewModeText]}>
              Expanded View
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Container */}
      <View style={[styles.appContainer, deviceFrame ? styles.phoneFrameContainer : styles.fullWidthContainer]}>
        {deviceFrame && (
          <View style={styles.phoneNotch}>
            <View style={styles.speakerPill} />
            <View style={styles.cameraHole} />
          </View>
        )}

        {/* Native App Header */}
        <View style={styles.nativeHeader}>
          <View style={styles.headerLeft}>
            {currentScreen !== "home" && !selectedProduct ? (
              <TouchableOpacity
                style={styles.headerBackBtn}
                onPress={() => setCurrentScreen("home")}
              >
                <ArrowLeft size={20} color="#0f172a" />
              </TouchableOpacity>
            ) : selectedProduct ? (
              <TouchableOpacity
                style={styles.headerBackBtn}
                onPress={() => setSelectedProduct(null)}
              >
                <ArrowLeft size={20} color="#0f172a" />
              </TouchableOpacity>
            ) : (
              <View style={styles.headerLogo}>
                <Text style={styles.headerLogoText}>E</Text>
              </View>
            )}

            <View style={{ marginLeft: 8 }}>
              <Text style={styles.headerBrand}>
                Eco<Text style={{ color: "#16a34a" }}>Bazar</Text>
              </Text>
              <Text style={styles.headerSubtitle}>
                {apiConnected ? "Backend Connected 🟢" : "Ready for API Link"}
              </Text>
            </View>
          </View>

          <View style={styles.headerRightActions}>
            <TouchableOpacity
              style={styles.headerCartBtn}
              onPress={() => {
                setSelectedProduct(null);
                setCurrentScreen("cart");
              }}
            >
              <ShoppingBag size={20} color="#0f172a" />
              {cart.length > 0 && (
                <View style={styles.cartBadge}>
                  <Text style={styles.cartBadgeText}>{cart.length}</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Screen Content */}
        <ScrollView style={styles.nativeBody} contentContainerStyle={styles.scrollContent}>
          {/* ==================== PRODUCT DETAILS VIEW ==================== */}
          {selectedProduct ? (
            <View style={styles.detailsContainer}>
              <Image source={{ uri: selectedProduct.image }} style={styles.detailsImg} />
              <View style={styles.detailsContent}>
                <View style={styles.badgeRow}>
                  <View style={styles.catBadge}>
                    <Text style={styles.catBadgeText}>{selectedProduct.category}</Text>
                  </View>
                  <View style={styles.stockBadge}>
                    <Text style={styles.stockBadgeText}>In Stock</Text>
                  </View>
                </View>

                <Text style={styles.detailsTitle}>{selectedProduct.name}</Text>
                <Text style={styles.detailsPrice}>${selectedProduct.price?.toFixed(2)}</Text>

                <Text style={styles.detailsDesc}>{selectedProduct.description}</Text>

                <View style={styles.detailsActions}>
                  <TouchableOpacity
                    style={styles.addCartLargeBtn}
                    onPress={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                  >
                    <ShoppingBag size={18} color="#ffffff" />
                    <Text style={styles.addCartLargeText}>Add to Cart</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.buyNowBtn}
                    onPress={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                      setCurrentScreen("checkout");
                    }}
                  >
                    <Text style={styles.buyNowText}>Buy Now</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ) : currentScreen === "home" ? (
            /* ==================== HOME SCREEN ==================== */
            <View>
              {/* Promo Banner */}
              <View style={styles.promoBanner}>
                <View style={styles.promoTextCol}>
                  <View style={styles.offerBadge}>
                    <Text style={styles.offerBadgeText}>SPECIAL 30% OFF</Text>
                  </View>
                  <Text style={styles.promoTitle}>Fresh & 100% Organic</Text>
                  <Text style={styles.promoSub}>Healthy groceries right at your doorstep</Text>
                  <TouchableOpacity
                    style={styles.shopNowBtn}
                    onPress={() => setCurrentScreen("shop")}
                  >
                    <Text style={styles.shopNowBtnText}>Shop Now</Text>
                    <ArrowRight size={14} color="#15803d" />
                  </TouchableOpacity>
                </View>
                <Image
                  source={{ uri: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=350&q=80" }}
                  style={styles.promoImg}
                />
              </View>

              {/* Categories */}
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Categories</Text>
                <TouchableOpacity onPress={() => setCurrentScreen("shop")}>
                  <Text style={styles.seeAllText}>See All</Text>
                </TouchableOpacity>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
                {["All", "Fruits & Veggies", "Cold Pressed Oils", "Dairy & Eggs", "Artisanal Bakery"].map((c) => (
                  <TouchableOpacity
                    key={c}
                    style={[styles.catChip, selectedCategory === c && styles.activeCatChip]}
                    onPress={() => {
                      setSelectedCategory(c);
                      setCurrentScreen("shop");
                    }}
                  >
                    <Text style={[styles.catChipText, selectedCategory === c && styles.activeCatChipText]}>
                      {c}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Product Grid */}
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Featured Organic Harvest</Text>
                <Text style={styles.itemCountText}>{products.length} Items</Text>
              </View>

              <View style={styles.productGrid}>
                {products.map((p) => (
                  <View key={p._id} style={styles.productCard}>
                    <TouchableOpacity onPress={() => setSelectedProduct(p)}>
                      <Image source={{ uri: p.image }} style={styles.productImg} />
                    </TouchableOpacity>

                    <View style={styles.productInfo}>
                      <Text style={styles.productCat}>{p.category}</Text>
                      <Text style={styles.productTitle} numberOfLines={2}>
                        {p.name}
                      </Text>

                      <View style={styles.priceRow}>
                        <Text style={styles.productPrice}>${p.price?.toFixed(2)}</Text>
                        <TouchableOpacity
                          style={styles.addBtn}
                          onPress={() => addToCart(p)}
                        >
                          <Plus size={16} color="#ffffff" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : currentScreen === "shop" ? (
            /* ==================== SHOP SCREEN ==================== */
            <View>
              {/* Search Bar */}
              <View style={styles.searchBox}>
                <Search size={18} color="#64748b" />
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search organic fruits, vegetables, oils..."
                  placeholderTextColor="#94a3b8"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
              </View>

              {/* Category Filter Chips */}
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll}>
                {["All", "Fruits & Veggies", "Cold Pressed Oils", "Dairy & Eggs", "Artisanal Bakery"].map((c) => (
                  <TouchableOpacity
                    key={c}
                    style={[styles.catChip, selectedCategory === c && styles.activeCatChip]}
                    onPress={() => setSelectedCategory(c)}
                  >
                    <Text style={[styles.catChipText, selectedCategory === c && styles.activeCatChipText]}>
                      {c}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* Sort Bar */}
              <View style={styles.sortBar}>
                <Text style={styles.sortFound}>{filteredShopProducts.length} Items found</Text>
                <View style={styles.sortTabs}>
                  <TouchableOpacity
                    style={[styles.sortTab, sortBy === "featured" && styles.activeSortTab]}
                    onPress={() => setSortBy("featured")}
                  >
                    <Text style={styles.sortTabText}>Featured</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.sortTab, sortBy === "price-low" && styles.activeSortTab]}
                    onPress={() => setSortBy("price-low")}
                  >
                    <Text style={styles.sortTabText}>$ Low</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.sortTab, sortBy === "price-high" && styles.activeSortTab]}
                    onPress={() => setSortBy("price-high")}
                  >
                    <Text style={styles.sortTabText}>$ High</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Products List */}
              <View style={styles.productGrid}>
                {filteredShopProducts.map((p) => (
                  <View key={p._id} style={styles.productCard}>
                    <TouchableOpacity onPress={() => setSelectedProduct(p)}>
                      <Image source={{ uri: p.image }} style={styles.productImg} />
                    </TouchableOpacity>
                    <View style={styles.productInfo}>
                      <Text style={styles.productTitle} numberOfLines={2}>
                        {p.name}
                      </Text>
                      <View style={styles.priceRow}>
                        <Text style={styles.productPrice}>${p.price?.toFixed(2)}</Text>
                        <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(p)}>
                          <Plus size={16} color="#ffffff" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : currentScreen === "cart" ? (
            /* ==================== CART SCREEN ==================== */
            <View>
              <Text style={styles.sectionTitle}>Shopping Cart ({cart.length})</Text>

              {cart.length === 0 ? (
                <View style={styles.emptyCartBox}>
                  <ShoppingBag size={54} color="#94a3b8" />
                  <Text style={styles.emptyCartTitle}>Your cart is empty</Text>
                  <TouchableOpacity
                    style={styles.browseShopBtn}
                    onPress={() => setCurrentScreen("shop")}
                  >
                    <Text style={styles.browseShopText}>Browse Store</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View>
                  {cart.map((item) => (
                    <View key={item._id} style={styles.cartCard}>
                      <Image source={{ uri: item.image }} style={styles.cartImg} />
                      <View style={styles.cartDetails}>
                        <Text style={styles.cartItemTitle} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.cartItemPrice}>${item.price?.toFixed(2)}</Text>
                        <View style={styles.qtyControlRow}>
                          <TouchableOpacity
                            style={styles.qtyBtn}
                            onPress={() => updateQuantity(item._id, -1)}
                          >
                            <Minus size={14} color="#0f172a" />
                          </TouchableOpacity>
                          <Text style={styles.qtyNumber}>{item.quantity}</Text>
                          <TouchableOpacity
                            style={styles.qtyBtn}
                            onPress={() => updateQuantity(item._id, 1)}
                          >
                            <Plus size={14} color="#0f172a" />
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={styles.deleteBtn}
                            onPress={() => removeFromCart(item._id)}
                          >
                            <Trash2 size={16} color="#ef4444" />
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  ))}

                  {/* Summary */}
                  <View style={styles.billBox}>
                    <View style={styles.billRow}>
                      <Text style={styles.billLabel}>Subtotal</Text>
                      <Text style={styles.billValue}>${subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.billRow}>
                      <Text style={styles.billLabel}>Delivery Fee</Text>
                      <Text style={styles.billValue}>${deliveryFee.toFixed(2)}</Text>
                    </View>
                    <View style={[styles.billRow, styles.totalRow]}>
                      <Text style={styles.totalText}>Total Amount</Text>
                      <Text style={styles.totalVal}>${totalAmount.toFixed(2)}</Text>
                    </View>

                    <TouchableOpacity
                      style={styles.checkoutBtn}
                      onPress={() => setCurrentScreen("checkout")}
                    >
                      <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
                      <ArrowRight size={16} color="#ffffff" />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ) : currentScreen === "checkout" ? (
            /* ==================== CHECKOUT SCREEN ==================== */
            <View>
              <Text style={styles.sectionTitle}>Delivery & Payment</Text>

              <View style={styles.formCard}>
                <Text style={styles.formLabel}>Recipient Full Name</Text>
                <TextInput
                  style={styles.formInput}
                  value={shippingName}
                  onChangeText={setShippingName}
                  placeholder="Full Name"
                />

                <Text style={styles.formLabel}>Phone Number</Text>
                <TextInput
                  style={styles.formInput}
                  value={shippingPhone}
                  onChangeText={setShippingPhone}
                  placeholder="Phone"
                />

                <Text style={styles.formLabel}>Delivery Address</Text>
                <TextInput
                  style={styles.formInput}
                  value={shippingStreet}
                  onChangeText={setShippingStreet}
                  placeholder="Street / Apartment"
                />

                <Text style={styles.formLabel}>City</Text>
                <TextInput
                  style={styles.formInput}
                  value={shippingCity}
                  onChangeText={setShippingCity}
                  placeholder="City"
                />
              </View>

              <Text style={[styles.sectionTitle, { marginTop: 14 }]}>Select Payment Option</Text>
              {["Cash on Delivery", "bKash / Mobile Wallet", "Credit / Debit Card"].map((method) => (
                <TouchableOpacity
                  key={method}
                  style={[styles.paymentMethodCard, paymentMethod === method && styles.activePaymentCard]}
                  onPress={() => setPaymentMethod(method)}
                >
                  <View style={[styles.radioCircle, paymentMethod === method && styles.activeRadioCircle]} />
                  <Text style={styles.paymentMethodText}>{method}</Text>
                </TouchableOpacity>
              ))}

              <View style={styles.billBox}>
                <View style={styles.billRow}>
                  <Text style={styles.totalText}>Total Payable</Text>
                  <Text style={styles.totalVal}>${totalAmount.toFixed(2)}</Text>
                </View>
                <TouchableOpacity style={styles.checkoutBtn} onPress={handlePlaceOrder}>
                  <Text style={styles.checkoutBtnText}>Confirm Order (Post to Backend)</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : currentScreen === "order-success" ? (
            /* ==================== ORDER SUCCESS ==================== */
            <View style={styles.successBox}>
              <CheckCircle2 size={64} color="#16a34a" />
              <Text style={styles.successTitle}>Order Confirmed!</Text>
              <Text style={styles.successSubtitle}>
                Your order #{latestOrder?._id} has been recorded.
              </Text>

              <TouchableOpacity
                style={styles.checkoutBtn}
                onPress={() => setCurrentScreen("orders")}
              >
                <Text style={styles.checkoutBtnText}>View My Orders</Text>
              </TouchableOpacity>
            </View>
          ) : currentScreen === "orders" ? (
            /* ==================== ORDERS LIST ==================== */
            <View>
              <Text style={styles.sectionTitle}>My Orders History</Text>
              {orders.map((ord) => (
                <View key={ord._id} style={styles.orderCard}>
                  <View style={styles.orderHeader}>
                    <Text style={styles.orderIdText}>{ord._id}</Text>
                    <View style={styles.statusPill}>
                      <Text style={styles.statusPillText}>{ord.status}</Text>
                    </View>
                  </View>
                  <Text style={styles.orderDate}>{ord.orderDate}</Text>
                  <Text style={styles.orderItemsPreview}>
                    {ord.items?.map((it) => `${it.qty}x ${it.name}`).join(", ")}
                  </Text>
                  <Text style={styles.orderTotalText}>Total: ${ord.totalAmount?.toFixed(2)}</Text>
                </View>
              ))}
            </View>
          ) : currentScreen === "account" ? (
            /* ==================== ACCOUNT SCREEN ==================== */
            <View>
              <View style={styles.userProfileCard}>
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarInitials}>DC</Text>
                </View>
                <View style={{ marginLeft: 14 }}>
                  <Text style={styles.userName}>Demo Customer</Text>
                  <Text style={styles.userEmail}>demo.customer@ecobazar.com</Text>
                </View>
              </View>

              <TouchableOpacity
                style={styles.adminBannerBtn}
                onPress={() => setCurrentScreen("admin")}
              >
                <ShieldCheck size={24} color="#f59e0b" />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.adminBannerTitle}>Store Admin Portal</Text>
                  <Text style={styles.adminBannerSub}>Manage inventory, catalog & orders</Text>
                </View>
                <ChevronRight size={18} color="#f59e0b" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuRow}
                onPress={() => setCurrentScreen("orders")}
              >
                <Package size={18} color="#2563eb" />
                <Text style={styles.menuText}>My Orders</Text>
                <ChevronRight size={16} color="#94a3b8" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.menuRow}
                onPress={() => toast.success("Connected to Demo Customer!")}
              >
                <User size={18} color="#16a34a" />
                <Text style={styles.menuText}>Reset as Demo Customer</Text>
                <ChevronRight size={16} color="#94a3b8" />
              </TouchableOpacity>
            </View>
          ) : currentScreen === "admin" ? (
            /* ==================== ADMIN DASHBOARD ==================== */
            <View>
              <View style={styles.sectionHeaderRow}>
                <Text style={styles.sectionTitle}>Admin Management Console</Text>
                <TouchableOpacity onPress={() => setCurrentScreen("home")}>
                  <Text style={styles.seeAllText}>Back to Store</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Total Sales</Text>
                  <Text style={styles.statNumber}>$4,890.50</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Total Orders</Text>
                  <Text style={styles.statNumber}>{orders.length}</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Products</Text>
                  <Text style={styles.statNumber}>{products.length}</Text>
                </View>
                <View style={styles.statCard}>
                  <Text style={styles.statLabel}>Backend Link</Text>
                  <Text style={styles.statNumber}>{apiConnected ? "Online" : "Mock"}</Text>
                </View>
              </View>

              <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Add New Product (API POST)</Text>
              <View style={styles.formCard}>
                <TextInput
                  style={styles.formInput}
                  placeholder="Product Title (e.g. Organic Papaya 1kg)"
                  value={newTitle}
                  onChangeText={setNewTitle}
                />
                <TextInput
                  style={styles.formInput}
                  placeholder="Price in USD (e.g. 6.50)"
                  value={newPrice}
                  onChangeText={setNewPrice}
                  keyboardType="numeric"
                />
                <TouchableOpacity style={styles.checkoutBtn} onPress={handleCreateProduct}>
                  <Text style={styles.checkoutBtnText}>Publish to Catalog</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : null}
        </ScrollView>

        {/* Native Bottom Navigation Bar */}
        <View style={styles.nativeTabBar}>
          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              setSelectedProduct(null);
              setCurrentScreen("home");
            }}
          >
            <Store size={20} color={currentScreen === "home" ? "#16a34a" : "#64748b"} />
            <Text style={[styles.tabLabel, currentScreen === "home" && styles.activeTabLabel]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              setSelectedProduct(null);
              setCurrentScreen("shop");
            }}
          >
            <Package size={20} color={currentScreen === "shop" ? "#16a34a" : "#64748b"} />
            <Text style={[styles.tabLabel, currentScreen === "shop" && styles.activeTabLabel]}>Shop</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              setSelectedProduct(null);
              setCurrentScreen("cart");
            }}
          >
            <ShoppingBag size={20} color={currentScreen === "cart" ? "#16a34a" : "#64748b"} />
            <Text style={[styles.tabLabel, currentScreen === "cart" && styles.activeTabLabel]}>
              Cart ({cart.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.tabItem}
            onPress={() => {
              setSelectedProduct(null);
              setCurrentScreen("account");
            }}
          >
            <User size={20} color={currentScreen === "account" || currentScreen === "admin" ? "#16a34a" : "#64748b"} />
            <Text style={[styles.tabLabel, (currentScreen === "account" || currentScreen === "admin") && styles.activeTabLabel]}>
              Account
            </Text>
          </TouchableOpacity>
        </View>

        {/* Phone Bottom Home Bar */}
        {deviceFrame && (
          <View style={styles.homeIndicatorBar}>
            <View style={styles.homeIndicator} />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pageWrapper: {
    flex: 1,
    backgroundColor: "#090d16",
    alignItems: "center",
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 8,
    minHeight: "100vh",
  },
  topControlBar: {
    width: "100%",
    maxWidth: 960,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginBottom: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  controlLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  brandPill: {
    backgroundColor: "rgba(22, 163, 74, 0.2)",
    borderWidth: 1,
    borderColor: "#16a34a",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  brandPillText: {
    color: "#4ade80",
    fontSize: 12,
    fontWeight: "800",
  },
  apiInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 38,
    flex: 1,
  },
  apiInput: {
    flex: 1,
    marginLeft: 8,
    color: "#ffffff",
    fontSize: 12,
    outline: "none",
  },
  apiConnectBtn: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 8,
  },
  apiConnectedBtn: {
    backgroundColor: "#059669",
  },
  apiConnectBtnText: {
    color: "#ffffff",
    fontSize: 11,
    fontWeight: "700",
  },
  controlRight: {
    flexDirection: "row",
    gap: 8,
  },
  viewModeBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#0f172a",
    gap: 6,
  },
  activeViewModeBtn: {
    backgroundColor: "#16a34a",
  },
  viewModeText: {
    color: "#94a3b8",
    fontSize: 11,
    fontWeight: "700",
  },
  activeViewModeText: {
    color: "#ffffff",
  },
  appContainer: {
    backgroundColor: "#ffffff",
    overflow: "hidden",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
  },
  phoneFrameContainer: {
    width: 380,
    maxWidth: "100%",
    height: 740,
    borderRadius: 44,
    borderWidth: 8,
    borderColor: "#1e293b",
    position: "relative",
  },
  fullWidthContainer: {
    width: "100%",
    maxWidth: 960,
    minHeight: 740,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  phoneNotch: {
    height: 24,
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  speakerPill: {
    width: 50,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#334155",
  },
  cameraHole: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#0f172a",
    marginLeft: 10,
  },
  nativeHeader: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
    backgroundColor: "#ffffff",
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerBackBtn: {
    padding: 6,
    marginRight: 4,
  },
  headerLogo: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#16a34a",
    alignItems: "center",
    justifyContent: "center",
  },
  headerLogoText: {
    color: "#ffffff",
    fontWeight: "900",
    fontSize: 18,
  },
  headerBrand: {
    fontSize: 16,
    fontWeight: "900",
    color: "#0f172a",
  },
  headerSubtitle: {
    fontSize: 10,
    color: "#64748b",
  },
  headerRightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  headerCartBtn: {
    position: "relative",
    padding: 6,
  },
  cartBadge: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: "#16a34a",
    width: 18,
    height: 18,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
  },
  cartBadgeText: {
    color: "#ffffff",
    fontSize: 10,
    fontWeight: "bold",
  },
  nativeBody: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  promoBanner: {
    backgroundColor: "#14532d",
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    overflow: "hidden",
    marginBottom: 16,
  },
  promoTextCol: {
    flex: 1.2,
  },
  offerBadge: {
    backgroundColor: "#f59e0b",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  offerBadgeText: {
    color: "#0f172a",
    fontSize: 9,
    fontWeight: "800",
  },
  promoTitle: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
  },
  promoSub: {
    color: "#bbf7d0",
    fontSize: 11,
    marginTop: 4,
    marginBottom: 10,
  },
  shopNowBtn: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    gap: 4,
  },
  shopNowBtnText: {
    color: "#15803d",
    fontSize: 11,
    fontWeight: "800",
  },
  promoImg: {
    width: 90,
    height: 90,
    borderRadius: 12,
    alignSelf: "center",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0f172a",
  },
  seeAllText: {
    color: "#16a34a",
    fontSize: 12,
    fontWeight: "700",
  },
  itemCountText: {
    color: "#64748b",
    fontSize: 11,
  },
  catScroll: {
    marginBottom: 14,
  },
  catChip: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 12,
    marginRight: 8,
  },
  activeCatChip: {
    backgroundColor: "#16a34a",
    borderColor: "#16a34a",
  },
  catChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0f172a",
  },
  activeCatChipText: {
    color: "#ffffff",
  },
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    overflow: "hidden",
    marginBottom: 12,
  },
  productImg: {
    width: "100%",
    height: 120,
    backgroundColor: "#f1f5f9",
  },
  productInfo: {
    padding: 10,
  },
  productCat: {
    fontSize: 9,
    color: "#16a34a",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  productTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#0f172a",
    marginTop: 2,
    minHeight: 32,
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "800",
    color: "#16a34a",
  },
  addBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: "#16a34a",
    alignItems: "center",
    justifyContent: "center",
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 42,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    color: "#0f172a",
    outline: "none",
  },
  sortBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  sortFound: {
    fontSize: 12,
    color: "#64748b",
  },
  sortTabs: {
    flexDirection: "row",
    gap: 4,
  },
  sortTab: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  activeSortTab: {
    backgroundColor: "#16a34a",
    borderColor: "#16a34a",
  },
  sortTabText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#64748b",
  },
  cartCard: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 10,
    alignItems: "center",
  },
  cartImg: {
    width: 60,
    height: 60,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
  },
  cartDetails: {
    flex: 1,
    marginLeft: 12,
  },
  cartItemTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0f172a",
  },
  cartItemPrice: {
    fontSize: 13,
    fontWeight: "700",
    color: "#16a34a",
    marginTop: 2,
  },
  qtyControlRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 6,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyNumber: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#0f172a",
    paddingHorizontal: 4,
  },
  deleteBtn: {
    marginLeft: "auto",
    padding: 4,
  },
  billBox: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginTop: 12,
  },
  billRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  billLabel: {
    fontSize: 12,
    color: "#64748b",
  },
  billValue: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0f172a",
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    paddingTop: 8,
    marginTop: 4,
  },
  totalText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0f172a",
  },
  totalVal: {
    fontSize: 16,
    fontWeight: "800",
    color: "#16a34a",
  },
  checkoutBtn: {
    backgroundColor: "#16a34a",
    height: 44,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
    gap: 6,
  },
  checkoutBtnText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "800",
  },
  emptyCartBox: {
    alignItems: "center",
    paddingTop: 60,
  },
  emptyCartTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#64748b",
    marginTop: 12,
  },
  browseShopBtn: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 16,
  },
  browseShopText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    gap: 8,
  },
  formLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#0f172a",
  },
  formInput: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 10,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 13,
    color: "#0f172a",
    outline: "none",
  },
  paymentMethodCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 8,
    gap: 10,
  },
  activePaymentCard: {
    borderColor: "#16a34a",
    backgroundColor: "#f0fdf4",
  },
  radioCircle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#94a3b8",
  },
  activeRadioCircle: {
    borderColor: "#16a34a",
    backgroundColor: "#16a34a",
  },
  paymentMethodText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0f172a",
  },
  successBox: {
    alignItems: "center",
    paddingTop: 60,
  },
  successTitle: {
    fontSize: 20,
    fontWeight: "900",
    color: "#0f172a",
    marginTop: 12,
  },
  successSubtitle: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 4,
    marginBottom: 20,
  },
  orderCard: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 10,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  orderIdText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0f172a",
  },
  statusPill: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusPillText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#15803d",
  },
  orderDate: {
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 2,
  },
  orderItemsPreview: {
    fontSize: 12,
    color: "#64748b",
    marginVertical: 6,
  },
  orderTotalText: {
    fontSize: 14,
    fontWeight: "800",
    color: "#16a34a",
  },
  userProfileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 12,
  },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#16a34a",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarInitials: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0f172a",
  },
  userEmail: {
    fontSize: 11,
    color: "#64748b",
  },
  adminBannerBtn: {
    backgroundColor: "#0f172a",
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },
  adminBannerTitle: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "800",
  },
  adminBannerSub: {
    color: "#94a3b8",
    fontSize: 10,
  },
  menuRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 8,
    gap: 10,
  },
  menuText: {
    flex: 1,
    fontSize: 13,
    fontWeight: "600",
    color: "#0f172a",
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 12,
  },
  statCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  statLabel: {
    fontSize: 11,
    color: "#64748b",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 4,
  },
  detailsContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    overflow: "hidden",
  },
  detailsImg: {
    width: "100%",
    height: 220,
    backgroundColor: "#f1f5f9",
  },
  detailsContent: {
    padding: 16,
  },
  badgeRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  catBadge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  catBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#166534",
  },
  stockBadge: {
    backgroundColor: "#f1f5f9",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  stockBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#0f172a",
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0f172a",
  },
  detailsPrice: {
    fontSize: 22,
    fontWeight: "900",
    color: "#16a34a",
    marginVertical: 8,
  },
  detailsDesc: {
    fontSize: 13,
    color: "#64748b",
    lineHeight: 18,
    marginBottom: 16,
  },
  detailsActions: {
    flexDirection: "row",
    gap: 10,
  },
  addCartLargeBtn: {
    flex: 1,
    backgroundColor: "#16a34a",
    height: 44,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  addCartLargeText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "800",
  },
  buyNowBtn: {
    flex: 1,
    backgroundColor: "#0f172a",
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  buyNowText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "800",
  },
  nativeTabBar: {
    height: 56,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "space-around",
  },
  tabItem: {
    alignItems: "center",
    justifyContent: "center",
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: "600",
    color: "#64748b",
    marginTop: 2,
  },
  activeTabLabel: {
    color: "#16a34a",
    fontWeight: "800",
  },
  homeIndicatorBar: {
    height: 16,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  homeIndicator: {
    width: 100,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#cbd5e1",
  },
});

export default EcoBazarNativeApp;
