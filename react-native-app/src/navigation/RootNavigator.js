import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TabNavigator } from "./TabNavigator";
import { ProductDetailsScreen } from "../screens/ProductDetailsScreen";
import { CheckoutScreen } from "../screens/CheckoutScreen";
import { OrderSuccessScreen } from "../screens/OrderSuccessScreen";
import { OrdersScreen } from "../screens/OrdersScreen";
import { WishlistScreen } from "../screens/WishlistScreen";
import { LoginScreen } from "../screens/LoginScreen";
import { AdminLoginScreen } from "../screens/AdminLoginScreen";
import { AdminDashboardScreen } from "../screens/AdminDashboardScreen";
import { AdminProductsScreen } from "../screens/AdminProductsScreen";
import { AdminOrdersScreen } from "../screens/AdminOrdersScreen";

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="MainTabs"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
        <Stack.Screen name="Checkout" component={CheckoutScreen} />
        <Stack.Screen name="OrderSuccess" component={OrderSuccessScreen} />
        <Stack.Screen name="Orders" component={OrdersScreen} />
        <Stack.Screen name="Wishlist" component={WishlistScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboardScreen} />
        <Stack.Screen name="AdminProducts" component={AdminProductsScreen} />
        <Stack.Screen name="AdminOrders" component={AdminOrdersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
