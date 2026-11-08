# 🌿 EcoBazar - React Native (Expo) Mobile App

এই ফোল্ডারে সম্পূর্ণ **EcoBazar Organic Store** ওয়েবসাইটটির ১০০% পূর্ণাঙ্গ **React Native (Expo)** মোবাইল অ্যাপ্লিকেশন দেওয়া হয়েছে।

---

## 📱 ফিচারসমূহ (Features List)

1. **Customer Home Screen (`HomeScreen.js`)**:
   - Hero Banner (30% discount offer)
   - Categories carousel filter (Fruits, Oils, Dairy, Bakery, Beverages)
   - Featured & popular products grid
   - 1-Click Add to Cart

2. **Full Catalog Shop (`ShopScreen.js`)**:
   - Live Search filtering
   - Category filtering
   - Sort by Price (Low to High, High to Low) & Rating

3. **Product Details Screen (`ProductDetailsScreen.js`)**:
   - High-resolution product images
   - Quantity selector (+ / -)
   - Add to Cart with alert feedback
   - "Buy Now" direct checkout flow
   - Wishlist toggle heart button

4. **Cart Screen (`CartScreen.js`)**:
   - Item quantity adjustment & delete
   - Promo code coupon system (e.g. `SAVE10`)
   - Subtotal, discount & shipping calculations
   - Clear cart & Checkout button

5. **Checkout Screen (`CheckoutScreen.js`)**:
   - Delivery address inputs
   - Multiple payment options (Cash on Delivery, bKash / Mobile Banking, Card)
   - Order review & Place Order action

6. **Order Confirmation & My Orders (`OrderSuccessScreen.js`, `OrdersScreen.js`)**:
   - Order receipt & tracking details
   - List of all customer orders with status badges

7. **Wishlist Screen (`WishlistScreen.js`)**:
   - Saved items list
   - 1-click move to cart

8. **User Profile (`ProfileScreen.js`)**:
   - Demo Customer profile details
   - Quick reset to Demo Customer
   - Dedicated Admin Portal switcher

9. **Customer & Dedicated Admin Login (`LoginScreen.js`, `AdminLoginScreen.js`)**:
   - 1-Click Demo Customer sign in
   - 1-Click Demo Admin sign in
   - Dedicated Admin login interface

10. **Store Management Admin Dashboard (`AdminDashboardScreen.js`, `AdminProductsScreen.js`, `AdminOrdersScreen.js`)**:
    - Revenue, orders, products & customer metrics
    - Product Inventory (Add new product with image/price/stock, delete)
    - Orders Management (Advance status from Pending -> Processing -> Shipped -> Delivered)

---

## 🚀 How to Run on Your Computer / Mobile Phone

### ১. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- মোবাইল ফোনে **Expo Go** অ্যাপ (Google Play Store অথবা Apple App Store থেকে ইনস্টল করুন)

### ২. Installation
```bash
# react-native-app ফোল্ডারে যান
cd react-native-app

# ডিপেন্ডেন্সি ইনস্টল করুন
npm install
```

### ৩. Start Development Server
```bash
npx expo start
```
টার্মিনালে একটি **QR Code** দেখতে পাবেন।

### ৪. Open on Real Phone
- **Android**: আপনার ফোনের Expo Go অ্যাপ দিয়ে QR Code টি স্ক্যান করুন।
- **iOS**: আপনার আইফোনের Camera অ্যাপ দিয়ে QR Code স্ক্যান করে Expo Go-তে ওপেন করুন।

### ৫. Build Standalone APK (Android Installable File)
```bash
npx eas-cli build -p android --profile preview
```
অথবা লোকাল বিল্ডের জন্য:
```bash
npx expo run:android
```

---

## 📂 Project Architecture
```
react-native-app/
├── App.js                         # Root provider & Navigation container
├── app.json                       # Expo configuration
├── package.json                   # Mobile dependencies
└── src/
    ├── components/
    │   ├── Header.js              # Custom mobile top bar
    │   └── ProductCard.js         # Mobile product card with add-to-cart
    ├── constants/
    │   ├── mockData.js            # Products, categories, orders & demo accounts
    │   └── theme.js               # Colors & typography
    ├── navigation/
    │   ├── RootNavigator.js       # Stack navigation (Modals, Details, Admin)
    │   └── TabNavigator.js        # Bottom tabs (Home, Shop, Cart, Saved, Account)
    ├── redux/
    │   ├── store.js               # Redux Toolkit store
    │   └── slices/                # auth, cart, products, wishlist, orders
    └── screens/
        ├── HomeScreen.js
        ├── ShopScreen.js
        ├── ProductDetailsScreen.js
        ├── CartScreen.js
        ├── CheckoutScreen.js
        ├── OrderSuccessScreen.js
        ├── OrdersScreen.js
        ├── WishlistScreen.js
        ├── ProfileScreen.js
        ├── LoginScreen.js
        ├── AdminLoginScreen.js
        ├── AdminDashboardScreen.js
        ├── AdminProductsScreen.js
        └── AdminOrdersScreen.js
```
