import React, { useState } from "react";
import {
  Smartphone,
  Code2,
  Copy,
  Check,
  X,
  ExternalLink,
  Layers,
  Sparkles,
  ShoppingBag,
  Store,
  Heart,
  User,
  ShieldCheck,
  Package,
  ArrowRight,
  Terminal
} from "lucide-react";
import toast from "react-hot-toast";

const CODE_FILES = [
  {
    name: "StandaloneApp.js (⭐ 1-File Instant Run)",
    path: "react-native-app/StandaloneApp.js",
    desc: "🚀 ZERO SETUP: Paste directly into Expo Snack (snack.expo.dev) or App.js. Just change BACKEND_API_URL!",
    code: `// =============================================================================
// 🌿 ECOBAZAR - ZERO CONFIGURATION REACT NATIVE APP
// 🚀 Copy-paste this file directly into Expo Snack (https://snack.expo.dev)
//    or replace App.js in any new Expo project!
// =============================================================================

import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, TouchableOpacity, ScrollView,
  FlatList, Image, TextInput, SafeAreaView, StatusBar, Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

// =============================================================================
// 👉 আপনার ব্যাকএন্ড API লিঙ্ক এখানে বসান (Paste your Backend API URL here)
// =============================================================================
const BACKEND_API_URL = "http://192.168.0.100:5000/api"; // 👈 আপনার ব্যাকএন্ড লিঙ্ক

// Note: If BACKEND_API_URL is empty or backend is offline,
// the app automatically displays built-in organic demo products!
// Full file available in /react-native-app/StandaloneApp.js`
  },
  {
    name: "api.js (Backend Link Config)",
    path: "react-native-app/src/config/api.js",
    desc: "🌐 Change API_BASE_URL to connect all screens to your Node.js/Python/PHP backend",
    code: `// =============================================================================
// 🌐 BACKEND API CONFIGURATION
// 👉 এখানে আপনার ব্যাকএন্ডের API URL টি বসিয়ে দিন
// =============================================================================

export const API_BASE_URL = "http://192.168.0.100:5000/api";

export const ENDPOINTS = {
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  GET_PROFILE: "/auth/profile",
  GET_PRODUCTS: "/products",
  GET_CATEGORIES: "/categories",
  GET_PRODUCT_DETAILS: (id) => \`/products/\${id}\`,
  CREATE_PRODUCT: "/products",
  CREATE_ORDER: "/orders",
  GET_MY_ORDERS: "/orders/my-orders",
};`
  },
  {
    name: "README.md",
    path: "react-native-app/README.md",
    desc: "Installation & Run instructions for Android & iOS (Expo Go & APK Build)",
    code: `# 🌿 EcoBazar - React Native (Expo) Mobile App

### ১. Installation
cd react-native-app
npm install

### ২. Start Development Server
npx expo start

### ৩. Run on Android or iOS
- Android: Scan QR code using Expo Go app
- iOS: Scan QR code with Camera and open Expo Go

### ৪. Build Android APK
npx eas-cli build -p android --profile preview`
  },
  {
    name: "App.js",
    path: "react-native-app/App.js",
    desc: "Root Entry point with Redux Provider, SafeArea & Root Navigator",
    code: `import React from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { RootNavigator } from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <RootNavigator />
      </SafeAreaProvider>
    </Provider>
  );
}`
  },
  {
    name: "TabNavigator.js",
    path: "react-native-app/src/navigation/TabNavigator.js",
    desc: "Bottom Tab Bar (Home, Shop, Cart, Saved, Account)",
    code: `import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { COLORS } from "../constants/theme";
import { HomeScreen } from "../screens/HomeScreen";
import { ShopScreen } from "../screens/ShopScreen";
import { CartScreen } from "../screens/CartScreen";
import { WishlistScreen } from "../screens/WishlistScreen";
import { ProfileScreen } from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const wishlistItems = useSelector((state) => state.wishlist.items);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textLight,
        tabBarStyle: {
          backgroundColor: COLORS.card,
          borderTopColor: COLORS.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: "Home" }} />
      <Tab.Screen name="Shop" component={ShopScreen} options={{ tabBarLabel: "Shop" }} />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarLabel: "Cart",
          tabBarBadge: cartItems.length > 0 ? cartItems.length : undefined,
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistScreen}
        options={{
          tabBarLabel: "Saved",
          tabBarBadge: wishlistItems.length > 0 ? wishlistItems.length : undefined,
        }}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: "Account" }} />
    </Tab.Navigator>
  );
};`
  },
  {
    name: "HomeScreen.js",
    path: "react-native-app/src/screens/HomeScreen.js",
    desc: "Hero Banner, Category Chips, Popular Organic Products",
    code: `import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { COLORS } from "../constants/theme";
import { ProductCard } from "../components/ProductCard";

export const HomeScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.products);
  const user = useSelector((state) => state.auth.user);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.userName}>Welcome, {user?.name}</Text>
      </View>
      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {/* Promo Hero Banner */}
        <View style={styles.banner}>
          <Text style={styles.bannerTitle}>Fresh Organic Foods</Text>
          <Text style={styles.bannerSub}>Up to 30% discount</Text>
        </View>

        {/* Product Grid */}
        <View style={styles.grid}>
          {products.map((p) => (
            <ProductCard key={p._id} product={p} navigation={navigation} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};`
  },
  {
    name: "CartScreen.js",
    path: "react-native-app/src/screens/CartScreen.js",
    desc: "Cart item manager, Promo coupon (SAVE10), Checkout link",
    code: `import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../constants/theme";
import { updateQuantity, removeFromCart } from "../redux/slices/cartSlice";

export const CartScreen = ({ navigation }) => {
  const { items, discountAmount, shippingFee } = useSelector((state) => state.cart);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart ({items.length})</Text>
      {/* Items list & Checkout button */}
    </View>
  );
};`
  },
  {
    name: "AdminLoginScreen.js",
    path: "react-native-app/src/screens/AdminLoginScreen.js",
    desc: "Dedicated Admin Sign In with 1-Click Demo Admin button",
    code: `import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { loginAsAdmin } from "../redux/slices/authSlice";

export const AdminLoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleAdmin1Click = () => {
    dispatch(loginAsAdmin());
    navigation.replace("AdminDashboard");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Portal Access</Text>
      <TouchableOpacity style={styles.quickBtn} onPress={handleAdmin1Click}>
        <Text style={styles.btnText}>Sign In as Demo Admin (1-Click)</Text>
      </TouchableOpacity>
    </View>
  );
};`
  },
  {
    name: "package.json",
    path: "react-native-app/package.json",
    desc: "Expo 52, React Native 0.76, React Navigation 7, Redux Toolkit",
    code: `{
  "name": "ecobazar-react-native",
  "version": "1.0.0",
  "main": "node_modules/expo/AppEntry.js",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios"
  },
  "dependencies": {
    "expo": "~52.0.0",
    "react": "18.3.1",
    "react-native": "0.76.6",
    "@react-navigation/native": "^7.0.0",
    "@react-navigation/native-stack": "^7.0.0",
    "@react-navigation/bottom-tabs": "^7.0.0",
    "@reduxjs/toolkit": "^2.5.0",
    "react-redux": "^9.2.0",
    "@expo/vector-icons": "^14.0.0"
  }
}`
  }
];

export const ReactNativeModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("simulator"); // "simulator" | "code" | "guide"
  const [selectedFileIdx, setSelectedFileIdx] = useState(0);
  const [simScreen, setSimScreen] = useState("home"); // "home" | "shop" | "cart" | "profile" | "admin"
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentFile = CODE_FILES[selectedFileIdx];

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentFile.code);
    setCopied(true);
    toast.success(`Copied ${currentFile.name} to clipboard!`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-emerald-400 flex items-center justify-center text-slate-950 font-black shadow-lg">
              <Smartphone className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black text-white">EcoBazar React Native Mobile App</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/30">
                  Expo Ready
                </span>
              </div>
              <p className="text-xs text-slate-400">
                100% Native iOS & Android Project structure inside <code className="text-amber-400">/react-native-app</code>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* View Switcher Tabs */}
            <div className="flex items-center bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setActiveTab("simulator")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === "simulator"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Preview</span>
              </button>
              <button
                onClick={() => setActiveTab("code")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === "code"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>Source Code ({CODE_FILES.length})</span>
              </button>
              <button
                onClick={() => setActiveTab("guide")}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeTab === "guide"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Run Guide</span>
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-hidden flex flex-col bg-slate-50 dark:bg-slate-950">
          {activeTab === "simulator" && (
            <div className="flex-1 p-6 flex flex-col md:flex-row items-center justify-center gap-8 overflow-y-auto">
              {/* Phone Device Mockup */}
              <div className="relative w-[340px] h-[640px] bg-slate-950 rounded-[48px] p-3 shadow-2xl border-4 border-slate-800 flex flex-col shrink-0">
                {/* Notch & Speaker */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-4 bg-slate-900 rounded-full z-30 flex items-center justify-center">
                  <div className="w-3 h-3 rounded-full bg-slate-950 mr-3" />
                  <div className="w-10 h-1 bg-slate-800 rounded-full" />
                </div>

                {/* Simulated Screen */}
                <div className="flex-1 bg-white dark:bg-slate-900 rounded-[38px] overflow-hidden flex flex-col relative pt-6">
                  {/* Status Bar */}
                  <div className="px-6 py-1 flex items-center justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400">
                    <span>9:41</span>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span>5G</span>
                      <span>100%</span>
                    </div>
                  </div>

                  {/* App Screen Content */}
                  <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
                    {simScreen === "home" && (
                      <>
                        <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                          <div>
                            <span className="text-[10px] text-slate-400">Welcome,</span>
                            <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                              Demo Customer
                            </h4>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                            DC
                          </div>
                        </div>

                        {/* Banner */}
                        <div className="p-4 rounded-2xl bg-emerald-700 text-white flex flex-col gap-1 shadow-md">
                          <span className="text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded bg-amber-400 text-slate-900 self-start">
                            30% OFF
                          </span>
                          <span className="text-sm font-black">Fresh Organic Harvest</span>
                          <span className="text-[11px] text-emerald-100">Pure healthy nutrition</span>
                        </div>

                        {/* Quick Categories */}
                        <div className="flex gap-2 overflow-x-auto pb-1">
                          {["All", "Fruits", "Oils", "Dairy", "Bakery"].map((c, i) => (
                            <span
                              key={c}
                              className={`px-3 py-1 rounded-xl text-[11px] font-bold shrink-0 ${
                                i === 0
                                  ? "bg-emerald-600 text-white"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                              }`}
                            >
                              {c}
                            </span>
                          ))}
                        </div>

                        {/* Product Cards */}
                        <div className="grid grid-cols-2 gap-2.5">
                          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-2.5 border border-slate-200 dark:border-slate-700">
                            <img
                              src="https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?auto=format&fit=crop&w=300&q=80"
                              alt="Avocado"
                              className="w-full h-24 object-cover rounded-xl mb-1.5"
                            />
                            <span className="text-[9px] text-emerald-600 font-bold uppercase">Organic</span>
                            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">Hass Avocados</p>
                            <span className="text-xs font-extrabold text-emerald-600">$4.99</span>
                          </div>

                          <div className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-2.5 border border-slate-200 dark:border-slate-700">
                            <img
                              src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=300&q=80"
                              alt="Olive oil"
                              className="w-full h-24 object-cover rounded-xl mb-1.5"
                            />
                            <span className="text-[9px] text-emerald-600 font-bold uppercase">Oils</span>
                            <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">Cold-Pressed Oil</p>
                            <span className="text-xs font-extrabold text-emerald-600">$14.50</span>
                          </div>
                        </div>
                      </>
                    )}

                    {simScreen === "shop" && (
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-black text-slate-900 dark:text-slate-100">Eco Catalog</span>
                        <input
                          placeholder="Search items..."
                          className="w-full px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 border-none outline-none"
                          readOnly
                        />
                        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold">Pasture Brown Eggs</span>
                            <p className="text-[10px] text-emerald-600 font-extrabold">$5.75 / carton</p>
                          </div>
                          <span className="px-2 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold">+ Add</span>
                        </div>
                        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold">Wildflower Honey 350g</span>
                            <p className="text-[10px] text-emerald-600 font-extrabold">$8.99 / jar</p>
                          </div>
                          <span className="px-2 py-1 rounded-lg bg-emerald-600 text-white text-[10px] font-bold">+ Add</span>
                        </div>
                      </div>
                    )}

                    {simScreen === "cart" && (
                      <div className="flex flex-col gap-3">
                        <span className="text-xs font-black text-slate-900 dark:text-slate-100">Shopping Cart (2 items)</span>
                        <div className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                          <div>
                            <p className="text-xs font-bold">Hass Avocados (2x)</p>
                            <span className="text-[10px] text-slate-500">$9.98</span>
                          </div>
                          <span className="text-xs font-extrabold text-emerald-600">$9.98</span>
                        </div>
                        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl">
                          <div className="flex justify-between text-xs font-bold text-slate-900 dark:text-slate-100">
                            <span>Total Payable:</span>
                            <span className="text-emerald-600">$24.48</span>
                          </div>
                        </div>
                        <button className="w-full py-2 bg-emerald-600 text-white font-extrabold text-xs rounded-xl shadow-md">
                          Place Order (COD / bKash)
                        </button>
                      </div>
                    )}

                    {simScreen === "profile" && (
                      <div className="flex flex-col gap-3">
                        <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold">
                            DC
                          </div>
                          <div>
                            <p className="text-xs font-extrabold">Demo Customer</p>
                            <span className="text-[10px] text-slate-500">demo.customer@ecobazar.com</span>
                          </div>
                        </div>
                        <button
                          onClick={() => setSimScreen("admin")}
                          className="w-full py-2.5 px-3 rounded-xl bg-slate-900 text-amber-400 text-xs font-bold flex items-center justify-between"
                        >
                          <span className="flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4" /> Switch to Admin Portal
                          </span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}

                    {simScreen === "admin" && (
                      <div className="flex flex-col gap-2.5">
                        <div className="p-2.5 rounded-xl bg-slate-900 text-white flex justify-between items-center">
                          <span className="text-xs font-black text-amber-400">Admin Dashboard</span>
                          <button
                            onClick={() => setSimScreen("home")}
                            className="text-[10px] text-emerald-400 underline font-bold"
                          >
                            Back to Store
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-200">
                            <span className="text-[10px] font-bold">Total Sales</span>
                            <p className="text-sm font-black">$4,890.50</p>
                          </div>
                          <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200">
                            <span className="text-[10px] font-bold">Orders</span>
                            <p className="text-sm font-black">128 Orders</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Native Bottom Tab Navigation Bar */}
                  <div className="h-14 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 px-3 flex items-center justify-around">
                    <button
                      onClick={() => setSimScreen("home")}
                      className={`flex flex-col items-center gap-0.5 ${
                        simScreen === "home" ? "text-emerald-600" : "text-slate-400"
                      }`}
                    >
                      <Store className="w-4 h-4" />
                      <span className="text-[9px] font-bold">Home</span>
                    </button>
                    <button
                      onClick={() => setSimScreen("shop")}
                      className={`flex flex-col items-center gap-0.5 ${
                        simScreen === "shop" ? "text-emerald-600" : "text-slate-400"
                      }`}
                    >
                      <Package className="w-4 h-4" />
                      <span className="text-[9px] font-bold">Shop</span>
                    </button>
                    <button
                      onClick={() => setSimScreen("cart")}
                      className={`flex flex-col items-center gap-0.5 ${
                        simScreen === "cart" ? "text-emerald-600" : "text-slate-400"
                      }`}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span className="text-[9px] font-bold">Cart</span>
                    </button>
                    <button
                      onClick={() => setSimScreen("profile")}
                      className={`flex flex-col items-center gap-0.5 ${
                        simScreen === "profile" || simScreen === "admin" ? "text-emerald-600" : "text-slate-400"
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span className="text-[9px] font-bold">Account</span>
                    </button>
                  </div>

                  {/* Home Bar */}
                  <div className="h-4 bg-white dark:bg-slate-950 flex items-center justify-center pb-1">
                    <div className="w-24 h-1 bg-slate-300 dark:bg-slate-700 rounded-full" />
                  </div>
                </div>
              </div>

              {/* Explanatory Info Card */}
              <div className="max-w-md flex flex-col gap-4">
                <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" />
                    <h4 className="text-sm font-black text-slate-900 dark:text-slate-100">
                      React Web বনাম React Native
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    বর্তমান ওয়েবসাইটটি <strong>React.js (Web)</strong> দিয়ে তৈরি, যা ব্রাউজারে চলে। অন্যদিকে, মোবাইল অ্যাপ (Android ও iOS) তৈরি করার জন্য <strong>React Native (Expo)</strong> প্রয়োজন।
                  </p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    আপনার অনুরোধ অনুযায়ী পুরো অ্যাপটির <strong>১০০% React Native কোডবেজ</strong> তৈরি করে <code className="text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded">/react-native-app</code> ফোল্ডারে সেভ করা হয়েছে!
                  </p>
                  <div className="p-3 rounded-xl bg-slate-900 text-slate-300 text-xs font-mono">
                    <div className="text-slate-400"># আপনার কম্পিউটারে চালানোর জন্য:</div>
                    <div className="text-emerald-400">cd react-native-app</div>
                    <div className="text-emerald-400">npx expo start</div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveTab("code")}
                    className="flex-1 py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-extrabold text-xs shadow-md hover:bg-emerald-500 transition-colors flex items-center justify-center gap-2"
                  >
                    <Code2 className="w-4 h-4" />
                    <span>View React Native Code</span>
                  </button>
                  <button
                    onClick={() => setActiveTab("guide")}
                    className="py-2.5 px-4 rounded-xl border border-slate-300 dark:border-slate-700 font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Run Instructions
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "code" && (
            <div className="flex-1 flex overflow-hidden">
              {/* File List Sidebar */}
              <div className="w-64 bg-slate-900 border-r border-slate-800 p-3 flex flex-col gap-1 overflow-y-auto">
                <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 px-3 py-2">
                  React Native Files
                </span>
                {CODE_FILES.map((file, idx) => (
                  <button
                    key={file.name}
                    onClick={() => setSelectedFileIdx(idx)}
                    className={`px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all flex flex-col gap-0.5 ${
                      selectedFileIdx === idx
                        ? "bg-emerald-600 text-white"
                        : "text-slate-400 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Code2 className="w-3.5 h-3.5 shrink-0" />
                      {file.name}
                    </span>
                    <span className="text-[10px] font-normal opacity-70 truncate">{file.path}</span>
                  </button>
                ))}
              </div>

              {/* Code Viewer */}
              <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
                <div className="px-6 py-3 bg-slate-900/60 border-b border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-emerald-400">{currentFile.path}</span>
                    <p className="text-[11px] text-slate-400">{currentFile.desc}</p>
                  </div>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? "Copied!" : "Copy Code"}</span>
                  </button>
                </div>

                <pre className="flex-1 p-6 text-xs font-mono text-slate-200 overflow-auto whitespace-pre leading-relaxed select-all">
                  {currentFile.code}
                </pre>
              </div>
            </div>
          )}

          {activeTab === "guide" && (
            <div className="flex-1 p-8 overflow-y-auto max-w-3xl mx-auto flex flex-col gap-6">
              <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-4">
                <h4 className="text-base font-black text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-emerald-600" />
                  কীভাবে আপনার ফোনে চালাবেন (Step-by-Step Guide)
                </h4>

                <div className="flex flex-col gap-3 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">1</span>
                    <div>
                      <strong>Expo Go ইনস্টল করুন:</strong> আপনার Android (Google Play Store) বা iPhone (App Store) থেকে <strong>Expo Go</strong> অ্যাপটি ডাউনলোড করুন।
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">2</span>
                    <div>
                      <strong>প্রজেক্ট ফোল্ডারে যান:</strong>
                      <div className="p-2.5 rounded-xl bg-slate-950 text-emerald-400 font-mono mt-1">
                        cd react-native-app && npm install
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">3</span>
                    <div>
                      <strong>সার্ভার চালু করুন:</strong>
                      <div className="p-2.5 rounded-xl bg-slate-950 text-emerald-400 font-mono mt-1">
                        npx expo start
                      </div>
                      <p className="mt-1 text-slate-400">টার্মিনালে কিউআর কোড প্রদর্শিত হবে।</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">4</span>
                    <div>
                      <strong>ফোনে স্ক্যান করুন:</strong> Expo Go অ্যাপ দিয়ে QR কোড স্ক্যান করলেই লাইভ মোবাইল অ্যাপটি আপনার ফোনে চালু হয়ে যাবে!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReactNativeModal;
