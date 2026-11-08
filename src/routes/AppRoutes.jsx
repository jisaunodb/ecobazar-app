import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { MainLayout } from "../layouts/MainLayout";
import { AdminLayout } from "../layouts/AdminLayout";
import { UserLayout } from "../layouts/UserLayout";
import { ProtectedRoute } from "./ProtectedRoute";
import { Loader } from "../components/common/Loader";
import { Home } from "../pages/public/Home";
import { Shop } from "../pages/public/Shop";
import { CategoriesPage } from "../pages/public/CategoriesPage";
import { ProductDetails } from "../pages/public/ProductDetails";
import { CartPage } from "../pages/public/CartPage";
import { WishlistPage } from "../pages/public/WishlistPage";
import { CheckoutPage } from "../pages/public/CheckoutPage";
import { OrderSuccessPage } from "../pages/public/OrderSuccessPage";
import { OffersPage } from "../pages/public/OffersPage";
import { AboutPage } from "../pages/public/AboutPage";
import { ContactPage } from "../pages/public/ContactPage";
import { FAQPage } from "../pages/public/FAQPage";
import { PrivacyPolicyPage } from "../pages/public/PrivacyPolicyPage";
import { TermsPage } from "../pages/public/TermsPage";
import { NotFoundPage } from "../pages/public/NotFoundPage";
import { LoginPage } from "../pages/auth/LoginPage";
import { AdminLoginPage } from "../pages/auth/AdminLoginPage";
import { RegisterPage } from "../pages/auth/RegisterPage";
import { ForgotPasswordPage } from "../pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "../pages/auth/ResetPasswordPage";
import { VerifyEmailPage } from "../pages/auth/VerifyEmailPage";
import { UserProfilePage } from "../pages/user/UserProfilePage";
import { UserOrdersPage } from "../pages/user/UserOrdersPage";
import { UserOrderDetailsPage } from "../pages/user/UserOrderDetailsPage";
import { UserAddressPage } from "../pages/user/UserAddressPage";
import { ChangePasswordPage } from "../pages/user/ChangePasswordPage";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { AdminProductsList } from "../pages/admin/AdminProductsList";
import { AdminCreateProduct } from "../pages/admin/AdminCreateProduct";
import { AdminEditProduct } from "../pages/admin/AdminEditProduct";
import { AdminOrdersList } from "../pages/admin/AdminOrdersList";
import { AdminUsersList } from "../pages/admin/AdminUsersList";
import { AdminCategoriesPage } from "../pages/admin/AdminCategoriesPage";
import { AdminAnalyticsPage } from "../pages/admin/AdminAnalyticsPage";
import { AdminSettingsPage } from "../pages/admin/AdminSettingsPage";
import { AdminProfilePage } from "../pages/admin/AdminProfilePage";

export const AppRoutes = () => {
  return (
    <Suspense fallback={<Loader fullScreen text="Loading EcoBazar..." />}>
      <Routes>
        {/* Public Routes with MainLayout */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="search" element={<Shop />} />
          <Route path="categories" element={<CategoriesPage />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="wishlist" element={<WishlistPage />} />
          <Route path="offers" element={<OffersPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="faq" element={<FAQPage />} />
          <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route path="admin-login" element={<AdminLoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forgot-password" element={<ForgotPasswordPage />} />
          <Route path="reset-password/:token" element={<ResetPasswordPage />} />
          <Route path="verify-email/:token" element={<VerifyEmailPage />} />
          
          <Route
            path="checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="order-success"
            element={
              <ProtectedRoute>
                <OrderSuccessPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* User Account Routes */}
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/user/profile" replace />} />
          <Route path="profile" element={<UserProfilePage />} />
          <Route path="orders" element={<UserOrdersPage />} />
          <Route path="orders/:id" element={<UserOrderDetailsPage />} />
          <Route path="addresses" element={<UserAddressPage />} />
          <Route path="change-password" element={<ChangePasswordPage />} />
        </Route>

        {/* Admin Dashboard Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProductsList />} />
          <Route path="products/create" element={<AdminCreateProduct />} />
          <Route path="products/edit/:id" element={<AdminEditProduct />} />
          <Route path="orders" element={<AdminOrdersList />} />
          <Route path="users" element={<AdminUsersList />} />
          <Route path="categories" element={<AdminCategoriesPage />} />
          <Route path="analytics" element={<AdminAnalyticsPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="profile" element={<AdminProfilePage />} />
        </Route>

        {/* 404 Fallback */}
        <Route path="*" element={<MainLayout />}>
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

