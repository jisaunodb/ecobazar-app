// =============================================================================
// 🌿 ECOBAZAR - ZERO CONFIGURATION REACT NATIVE APP
// 🚀 Copy-paste this file directly into Expo Snack (https://snack.expo.dev) 
//    or replace App.js in any new Expo project!
// =============================================================================

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
  TextInput,
  SafeAreaView,
  StatusBar,
  Alert,
  ActivityIndicator
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// =============================================================================
// 👉 আপনার ব্যাকএন্ড API লিঙ্ক এখানে বসান (Paste your Backend API URL here)
// =============================================================================
const BACKEND_API_URL = ""; // e.g. "http://192.168.0.105:5000/api" or "https://api.yourdomain.com/api"

// Sample Demo Data (Used when BACKEND_API_URL is empty or backend is offline)
const DEMO_PRODUCTS = [
  {
    _id: "prod_1",
    name: "Fresh Organic Hass Avocados (Pack of 3)",
    category: "Fruits & Veggies",
    price: 4.99,
    originalPrice: 6.99,
    discountPercentage: 28,
    rating: 4.8,
    stock: 25,
    unit: "pack",
    image: "https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=600&q=80",
    description: "Creamy, nutrient-rich Haas avocados handpicked at peak ripeness from certified organic groves."
  },
  {
    _id: "prod_2",
    name: "Pure Cold-Pressed Extra Virgin Olive Oil 500ml",
    category: "Cold Pressed Oils",
    price: 14.50,
    originalPrice: 18.00,
    discountPercentage: 19,
    rating: 4.9,
    stock: 14,
    unit: "bottle",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=600&q=80",
    description: "Single-origin unfiltered extra virgin olive oil made from early harvest Koroneiki olives."
  },
  {
    _id: "prod_3",
    name: "Pasture-Raised Free-Range Brown Eggs (1 Dozen)",
    category: "Dairy & Eggs",
    price: 5.75,
    originalPrice: 6.50,
    discountPercentage: 12,
    rating: 4.7,
    stock: 30,
    unit: "carton",
    image: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=600&q=80",
    description: "Rich golden yolks from free-range pasture-raised hens roaming on certified green meadows."
  },
  {
    _id: "prod_4",
    name: "Raw Wildflower Organic Honey 350g",
    category: "Artisanal Bakery",
    price: 8.99,
    originalPrice: 10.99,
    discountPercentage: 18,
    rating: 4.9,
    stock: 18,
    unit: "jar",
    image: "https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=600&q=80",
    description: "Pure, unfiltered, enzyme-rich raw honey sourced straight from ethical mountain beekeepers."
  }
];

export default function StandaloneApp() {
  const [activeTab, setActiveTab] = useState("home"); // "home" | "shop" | "cart" | "account" | "admin"
  const [products, setProducts] = useState(DEMO_PRODUCTS);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([
    { ...DEMO_PRODUCTS[0], quantity: 2 },
    { ...DEMO_PRODUCTS[1], quantity: 1 }
  ]);
  const [wishlist, setWishlist] = useState(["prod_1"]);
  const [orders, setOrders] = useState([
    {
      _id: "ORD-9041",
      status: "Delivered",
      total: 34.48,
      date: "2026-07-20",
      items: "2x Hass Avocados, 1x Olive Oil"
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCat, setActiveCat] = useState("All");

  // 🌐 অটোমেটিক ব্যাকএন্ড API থেকে প্রোডাক্ট লোড করার কোড
  useEffect(() => {
    if (BACKEND_API_URL && BACKEND_API_URL.startsWith("http")) {
      fetchProductsFromBackend();
    }
  }, []);

  const fetchProductsFromBackend = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BACKEND_API_URL}/products`);
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        } else if (data?.products) {
          setProducts(data.products);
        }
      }
    } catch (err) {
      console.log("Backend offline, using demo products:", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Cart Helpers
  const addToCart = (product, qty = 1) => {
    setCart((prev) => {
      const exists = prev.find((i) => i._id === product._id);
      if (exists) {
        return prev.map((i) =>
          i._id === product._id ? { ...i, quantity: i.quantity + qty } : i
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    Alert.alert("Success", `${product.name} added to cart!`);
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => (i._id === id ? { ...i, quantity: i.quantity + delta } : i))
        .filter((i) => i.quantity > 0)
    );
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  // Place Order API call
  const placeOrder = async () => {
    const totalAmount = cart.reduce((sum, i) => sum + i.price * i.quantity, 0) + 2.99;
    const newOrder = {
      _id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      status: "Pending",
      total: totalAmount,
      date: new Date().toISOString().split("T")[0],
      items: cart.map((i) => `${i.quantity}x ${i.name}`).join(", ")
    };

    // যদি ব্যাকএন্ড থাকে তাহলে API কল হবে
    if (BACKEND_API_URL && BACKEND_API_URL.startsWith("http")) {
      try {
        await fetch(`${BACKEND_API_URL}/orders`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newOrder)
        });
      } catch (e) {
        console.log("Could not post order to backend:", e.message);
      }
    }

    setOrders([newOrder, ...orders]);
    setCart([]);
    Alert.alert("🎉 Order Confirmed!", `Order #${newOrder._id} has been placed successfully.`);
    setActiveTab("account");
  };

  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      {/* Top App Header */}
      <View style={styles.topHeader}>
        <View style={styles.brandRow}>
          <View style={styles.logoBadge}>
            <Ionicons name="leaf" size={18} color="#16a34a" />
          </View>
          <Text style={styles.brandName}>
            Eco<Text style={{ color: "#16a34a" }}>Bazar</Text>
          </Text>
        </View>

        <View style={styles.headerRight}>
          {BACKEND_API_URL ? (
            <View style={styles.apiBadgeLive}>
              <View style={styles.liveDot} />
              <Text style={styles.apiBadgeText}>API Live</Text>
            </View>
          ) : (
            <View style={styles.apiBadgeMock}>
              <Text style={styles.apiMockText}>Mock Mode</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.cartIconWrapper}
            onPress={() => setActiveTab("cart")}
          >
            <Ionicons name="cart-outline" size={22} color="#0f172a" />
            {cart.length > 0 && (
              <View style={styles.cartCountBadge}>
                <Text style={styles.cartCountText}>{cart.length}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      {/* API URL Helper Banner if not set */}
      {!BACKEND_API_URL && (
        <View style={styles.apiHintBanner}>
          <Ionicons name="information-circle" size={16} color="#d97706" />
          <Text style={styles.apiHintText} numberOfLines={1}>
            Connect backend: Paste URL into <Text style={{ fontWeight: "bold" }}>BACKEND_API_URL</Text>
          </Text>
        </View>
      )}

      {/* Main Content Area */}
      <View style={styles.screenContent}>
        {/* ===================== HOME SCREEN ===================== */}
        {activeTab === "home" && !selectedProduct && (
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
            {/* Promo Banner */}
            <View style={styles.banner}>
              <View style={{ flex: 1 }}>
                <View style={styles.tag}>
                  <Text style={styles.tagText}>SPECIAL OFFER</Text>
                </View>
                <Text style={styles.bannerTitle}>Fresh Organic Foods</Text>
                <Text style={styles.bannerSub}>Get up to 30% OFF this week</Text>
                <TouchableOpacity
                  style={styles.bannerBtn}
                  onPress={() => setActiveTab("shop")}
                >
                  <Text style={styles.bannerBtnText}>Shop Catalogue</Text>
                </TouchableOpacity>
              </View>
              <Image
                source={{ uri: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=300&q=80" }}
                style={styles.bannerImg}
              />
            </View>

            {/* Categories */}
            <Text style={styles.sectionTitle}>Categories</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
              {["All", "Fruits & Veggies", "Cold Pressed Oils", "Dairy & Eggs", "Artisanal Bakery"].map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[styles.catChip, activeCat === c && styles.activeCatChip]}
                  onPress={() => setActiveCat(c)}
                >
                  <Text style={[styles.catChipText, activeCat === c && styles.activeCatChipText]}>
                    {c}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Product Grid */}
            <Text style={styles.sectionTitle}>Popular Organic Products</Text>
            <View style={styles.grid}>
              {products
                .filter((p) => activeCat === "All" || p.category === activeCat)
                .map((product) => (
                  <View key={product._id} style={styles.card}>
                    <TouchableOpacity onPress={() => setSelectedProduct(product)}>
                      <Image source={{ uri: product.image }} style={styles.cardImg} />
                    </TouchableOpacity>

                    <View style={styles.cardBody}>
                      <Text style={styles.cardCat}>{product.category}</Text>
                      <Text style={styles.cardTitle} numberOfLines={2}>
                        {product.name}
                      </Text>

                      <View style={styles.priceRow}>
                        <Text style={styles.cardPrice}>${product.price?.toFixed(2)}</Text>
                        <TouchableOpacity
                          style={styles.addBtn}
                          onPress={() => addToCart(product)}
                        >
                          <Ionicons name="add" size={18} color="#ffffff" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
            </View>
          </ScrollView>
        )}

        {/* ===================== PRODUCT DETAILS MODAL/VIEW ===================== */}
        {selectedProduct && (
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => setSelectedProduct(null)}
            >
              <Ionicons name="arrow-back" size={20} color="#0f172a" />
              <Text style={styles.backBtnText}>Back to products</Text>
            </TouchableOpacity>

            <Image
              source={{ uri: selectedProduct.image }}
              style={styles.detailsImage}
              resizeMode="cover"
            />

            <View style={styles.detailsBody}>
              <Text style={styles.cardCat}>{selectedProduct.category}</Text>
              <Text style={styles.detailsTitle}>{selectedProduct.name}</Text>
              <Text style={styles.detailsPrice}>${selectedProduct.price?.toFixed(2)}</Text>

              <Text style={styles.detailsDesc}>{selectedProduct.description}</Text>

              <TouchableOpacity
                style={styles.detailsAddBtn}
                onPress={() => {
                  addToCart(selectedProduct);
                  setSelectedProduct(null);
                }}
              >
                <Ionicons name="cart" size={18} color="#ffffff" />
                <Text style={styles.detailsAddText}>Add to Shopping Cart</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        )}

        {/* ===================== SHOP SCREEN ===================== */}
        {activeTab === "shop" && !selectedProduct && (
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} color="#64748b" />
              <TextInput
                placeholder="Search products by title..."
                value={search}
                onChangeText={setSearch}
                style={styles.searchInput}
              />
            </View>

            <View style={styles.grid}>
              {products
                .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
                .map((product) => (
                  <View key={product._id} style={styles.card}>
                    <TouchableOpacity onPress={() => setSelectedProduct(product)}>
                      <Image source={{ uri: product.image }} style={styles.cardImg} />
                    </TouchableOpacity>
                    <View style={styles.cardBody}>
                      <Text style={styles.cardTitle} numberOfLines={2}>{product.name}</Text>
                      <View style={styles.priceRow}>
                        <Text style={styles.cardPrice}>${product.price?.toFixed(2)}</Text>
                        <TouchableOpacity style={styles.addBtn} onPress={() => addToCart(product)}>
                          <Ionicons name="add" size={18} color="#ffffff" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                ))}
            </View>
          </ScrollView>
        )}

        {/* ===================== CART SCREEN ===================== */}
        {activeTab === "cart" && (
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text style={styles.sectionTitle}>Shopping Cart ({cart.length})</Text>

            {cart.length === 0 ? (
              <View style={styles.emptyBox}>
                <Ionicons name="cart-outline" size={54} color="#94a3b8" />
                <Text style={styles.emptyText}>Your cart is empty!</Text>
                <TouchableOpacity
                  style={styles.emptyBtn}
                  onPress={() => setActiveTab("shop")}
                >
                  <Text style={{ color: "#ffffff", fontWeight: "bold" }}>Start Shopping</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                {cart.map((item) => (
                  <View key={item._id} style={styles.cartItem}>
                    <Image source={{ uri: item.image }} style={styles.cartImg} />
                    <View style={{ flex: 1, marginLeft: 12 }}>
                      <Text style={styles.cartTitle} numberOfLines={1}>{item.name}</Text>
                      <Text style={styles.cartPrice}>${item.price?.toFixed(2)}</Text>
                    </View>

                    <View style={styles.qtyRow}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => updateQuantity(item._id, -1)}
                      >
                        <Ionicons name="remove" size={14} color="#0f172a" />
                      </TouchableOpacity>
                      <Text style={styles.qtyText}>{item.quantity}</Text>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => updateQuantity(item._id, 1)}
                      >
                        <Ionicons name="add" size={14} color="#0f172a" />
                      </TouchableOpacity>
                    </View>
                  </View>
                ))}

                {/* Summary */}
                <View style={styles.summaryBox}>
                  <View style={styles.sumRow}>
                    <Text style={styles.sumLabel}>Subtotal</Text>
                    <Text style={styles.sumVal}>${cartTotal.toFixed(2)}</Text>
                  </View>
                  <View style={styles.sumRow}>
                    <Text style={styles.sumLabel}>Delivery Fee</Text>
                    <Text style={styles.sumVal}>$2.99</Text>
                  </View>
                  <View style={[styles.sumRow, { borderTopWidth: 1, borderColor: "#e2e8f0", paddingTop: 8 }]}>
                    <Text style={styles.totalLabel}>Total</Text>
                    <Text style={styles.totalVal}>${(cartTotal + 2.99).toFixed(2)}</Text>
                  </View>

                  <TouchableOpacity style={styles.checkoutBtn} onPress={placeOrder}>
                    <Text style={styles.checkoutText}>Place Order (Cash on Delivery / bKash)</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </ScrollView>
        )}

        {/* ===================== ACCOUNT & ORDERS ===================== */}
        {activeTab === "account" && (
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <View style={styles.userCard}>
              <View style={styles.userAvatar}>
                <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 18 }}>DC</Text>
              </View>
              <View style={{ marginLeft: 12, flex: 1 }}>
                <Text style={styles.userName}>Demo Customer</Text>
                <Text style={styles.userEmail}>demo.customer@ecobazar.com</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.adminSwitchBanner}
              onPress={() => setActiveTab("admin")}
            >
              <Ionicons name="shield-checkmark" size={20} color="#f59e0b" />
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={{ color: "#ffffff", fontWeight: "bold", fontSize: 13 }}>Admin Dashboard</Text>
                <Text style={{ color: "#94a3b8", fontSize: 11 }}>Manage orders & inventory</Text>
              </View>
              <Ionicons name="chevron-forward" size={18} color="#f59e0b" />
            </TouchableOpacity>

            <Text style={[styles.sectionTitle, { marginTop: 20 }]}>My Order History</Text>
            {orders.map((ord) => (
              <View key={ord._id} style={styles.orderCard}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <Text style={styles.orderId}>{ord._id}</Text>
                  <View style={styles.statusBadge}>
                    <Text style={styles.statusText}>{ord.status}</Text>
                  </View>
                </View>
                <Text style={styles.orderItems}>{ord.items}</Text>
                <Text style={styles.orderTotal}>Total: ${ord.total?.toFixed(2)}</Text>
              </View>
            ))}
          </ScrollView>
        )}

        {/* ===================== ADMIN DASHBOARD ===================== */}
        {activeTab === "admin" && (
          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <Text style={styles.sectionTitle}>Admin Dashboard</Text>
              <TouchableOpacity onPress={() => setActiveTab("home")}>
                <Text style={{ color: "#16a34a", fontWeight: "bold", fontSize: 12 }}>Back to Shop</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.adminStatsGrid}>
              <View style={styles.adminStatCard}>
                <Text style={styles.adminStatLabel}>Total Revenue</Text>
                <Text style={styles.adminStatValue}>$4,890.50</Text>
              </View>
              <View style={styles.adminStatCard}>
                <Text style={styles.adminStatLabel}>Active Orders</Text>
                <Text style={styles.adminStatValue}>{orders.length}</Text>
              </View>
            </View>

            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Quick Add Product</Text>
            <TouchableOpacity
              style={styles.adminAddBtn}
              onPress={() =>
                Alert.alert(
                  "API Connected",
                  "When your backend is running, this button sends POST /products to your backend database!"
                )
              }
            >
              <Ionicons name="add-circle-outline" size={20} color="#ffffff" />
              <Text style={{ color: "#ffffff", fontWeight: "bold", marginLeft: 6 }}>
                Add New Product via Backend API
              </Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </View>

      {/* ===================== BOTTOM TAB BAR ===================== */}
      <View style={styles.bottomTabBar}>
        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => {
            setSelectedProduct(null);
            setActiveTab("home");
          }}
        >
          <Ionicons
            name={activeTab === "home" ? "home" : "home-outline"}
            size={22}
            color={activeTab === "home" ? "#16a34a" : "#64748b"}
          />
          <Text style={[styles.tabText, activeTab === "home" && styles.tabActiveText]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => {
            setSelectedProduct(null);
            setActiveTab("shop");
          }}
        >
          <Ionicons
            name={activeTab === "shop" ? "storefront" : "storefront-outline"}
            size={22}
            color={activeTab === "shop" ? "#16a34a" : "#64748b"}
          />
          <Text style={[styles.tabText, activeTab === "shop" && styles.tabActiveText]}>Shop</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => {
            setSelectedProduct(null);
            setActiveTab("cart");
          }}
        >
          <Ionicons
            name={activeTab === "cart" ? "cart" : "cart-outline"}
            size={22}
            color={activeTab === "cart" ? "#16a34a" : "#64748b"}
          />
          <Text style={[styles.tabText, activeTab === "cart" && styles.tabActiveText]}>
            Cart ({cart.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabBtn}
          onPress={() => {
            setSelectedProduct(null);
            setActiveTab("account");
          }}
        >
          <Ionicons
            name={activeTab === "account" || activeTab === "admin" ? "person" : "person-outline"}
            size={22}
            color={activeTab === "account" || activeTab === "admin" ? "#16a34a" : "#64748b"}
          />
          <Text style={[styles.tabText, (activeTab === "account" || activeTab === "admin") && styles.tabActiveText]}>
            Account
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  topHeader: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  logoBadge: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: "#dcfce7",
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: {
    fontSize: 18,
    fontWeight: "900",
    color: "#0f172a",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  apiBadgeLive: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#dcfce7",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    gap: 4,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#16a34a",
  },
  apiBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#166534",
  },
  apiBadgeMock: {
    backgroundColor: "#fef3c7",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  apiMockText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#b45309",
  },
  cartIconWrapper: {
    position: "relative",
    padding: 4,
  },
  cartCountBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: "#16a34a",
    width: 16,
    height: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cartCountText: {
    color: "#ffffff",
    fontSize: 9,
    fontWeight: "bold",
  },
  apiHintBanner: {
    backgroundColor: "#fffbeb",
    borderBottomWidth: 1,
    borderBottomColor: "#fde68a",
    paddingHorizontal: 16,
    paddingVertical: 6,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  apiHintText: {
    fontSize: 11,
    color: "#92400e",
    flex: 1,
  },
  screenContent: {
    flex: 1,
  },
  banner: {
    backgroundColor: "#14532d",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    overflow: "hidden",
    marginBottom: 20,
  },
  tag: {
    backgroundColor: "#f59e0b",
    alignSelf: "flex-start",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginBottom: 6,
  },
  tagText: {
    fontSize: 8,
    fontWeight: "800",
    color: "#0f172a",
  },
  bannerTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#ffffff",
  },
  bannerSub: {
    fontSize: 11,
    color: "#bbf7d0",
    marginTop: 2,
    marginBottom: 10,
  },
  bannerBtn: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  bannerBtnText: {
    color: "#14532d",
    fontSize: 11,
    fontWeight: "bold",
  },
  bannerImg: {
    width: 100,
    height: 100,
    borderRadius: 12,
    alignSelf: "center",
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 10,
  },
  catChip: {
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
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
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    overflow: "hidden",
    marginBottom: 14,
  },
  cardImg: {
    width: "100%",
    height: 120,
    backgroundColor: "#f1f5f9",
  },
  cardBody: {
    padding: 10,
  },
  cardCat: {
    fontSize: 9,
    color: "#16a34a",
    fontWeight: "700",
    textTransform: "uppercase",
  },
  cardTitle: {
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
  cardPrice: {
    fontSize: 14,
    fontWeight: "800",
    color: "#16a34a",
  },
  addBtn: {
    backgroundColor: "#16a34a",
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    gap: 4,
  },
  backBtnText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#0f172a",
  },
  detailsImage: {
    width: "100%",
    height: 240,
    borderRadius: 16,
    backgroundColor: "#f1f5f9",
  },
  detailsBody: {
    paddingVertical: 14,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 4,
  },
  detailsPrice: {
    fontSize: 22,
    fontWeight: "800",
    color: "#16a34a",
    marginTop: 6,
    marginBottom: 12,
  },
  detailsDesc: {
    fontSize: 13,
    color: "#64748b",
    lineHeight: 20,
    marginBottom: 20,
  },
  detailsAddBtn: {
    backgroundColor: "#16a34a",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 46,
    borderRadius: 12,
    gap: 8,
  },
  detailsAddText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginBottom: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 13,
    color: "#0f172a",
  },
  cartItem: {
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
  },
  cartTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#0f172a",
  },
  cartPrice: {
    fontSize: 13,
    color: "#16a34a",
    fontWeight: "700",
    marginTop: 4,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    padding: 2,
  },
  qtyBtn: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    paddingHorizontal: 8,
    fontSize: 12,
    fontWeight: "700",
  },
  summaryBox: {
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginTop: 10,
  },
  sumRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  sumLabel: {
    fontSize: 12,
    color: "#64748b",
  },
  sumVal: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0f172a",
  },
  totalLabel: {
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
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 14,
  },
  checkoutText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
  },
  emptyBox: {
    alignItems: "center",
    paddingTop: 60,
  },
  emptyText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#64748b",
    marginTop: 10,
  },
  emptyBtn: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 16,
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 14,
  },
  userAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#16a34a",
    alignItems: "center",
    justifyContent: "center",
  },
  userName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0f172a",
  },
  userEmail: {
    fontSize: 11,
    color: "#64748b",
    marginTop: 2,
  },
  adminSwitchBanner: {
    backgroundColor: "#0f172a",
    padding: 12,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  orderCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 8,
  },
  orderId: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0f172a",
  },
  statusBadge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  statusText: {
    color: "#166534",
    fontSize: 10,
    fontWeight: "700",
  },
  orderItems: {
    fontSize: 11,
    color: "#64748b",
    marginTop: 4,
  },
  orderTotal: {
    fontSize: 13,
    fontWeight: "700",
    color: "#16a34a",
    marginTop: 4,
  },
  adminStatsGrid: {
    flexDirection: "row",
    gap: 10,
  },
  adminStatCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },
  adminStatLabel: {
    fontSize: 11,
    color: "#64748b",
  },
  adminStatValue: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 4,
  },
  adminAddBtn: {
    backgroundColor: "#0f172a",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    borderRadius: 10,
    marginTop: 10,
  },
  bottomTabBar: {
    height: 56,
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderTopWidth: 1,
    borderTopColor: "#e2e8f0",
    alignItems: "center",
    justifyContent: "space-around",
  },
  tabBtn: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 10,
    fontWeight: "600",
    color: "#64748b",
    marginTop: 2,
  },
  tabActiveText: {
    color: "#16a34a",
    fontWeight: "700",
  },
});
