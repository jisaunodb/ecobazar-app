import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../constants/theme";
import { Header } from "../components/Header";
import { clearCart } from "../redux/slices/cartSlice";
import { addOrder } from "../redux/slices/orderSlice";
import { apiService } from "../services/apiService";

export const CheckoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const { items, discountAmount, shippingFee } = useSelector((state) => state.cart);

  const [name, setName] = useState(user?.name || "Demo Customer");
  const [phone, setPhone] = useState(user?.phone || "+1 (555) 019-0000");
  const [street, setStreet] = useState(user?.addresses?.[0]?.street || "742 Evergreen Terrace");
  const [city, setCity] = useState(user?.addresses?.[0]?.city || "Springfield");
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  const subtotal = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  const handlePlaceOrder = () => {
    if (!name.trim() || !phone.trim() || !street.trim()) {
      Alert.alert("Missing Details", "Please fill in all shipping details.");
      return;
    }

    const newOrder = {
      _id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      userName: name,
      userEmail: user?.email || "demo.customer@ecobazar.com",
      totalAmount: total,
      status: "Pending",
      orderDate: new Date().toISOString().split("T")[0],
      paymentMethod,
      shippingAddress: `${street}, ${city}`,
      items: items.map((i) => ({ name: i.name, qty: i.quantity, price: i.price }))
    };

    // 🌐 Automatically sync order with backend API
    apiService.orders.create(newOrder).catch((e) => console.log("Order sync skipped:", e.message));

    dispatch(addOrder(newOrder));
    dispatch(clearCart());
    navigation.replace("OrderSuccess", { order: newOrder });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Checkout" showBack navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Shipping Address */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="location-outline" size={20} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Shipping Details</Text>
          </View>

          <Text style={styles.inputLabel}>Full Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.textInput}
            placeholder="Recipient Name"
          />

          <Text style={styles.inputLabel}>Phone Number</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            style={styles.textInput}
            placeholder="e.g. +1 555-019-0000"
            keyboardType="phone-pad"
          />

          <Text style={styles.inputLabel}>Delivery Address</Text>
          <TextInput
            value={street}
            onChangeText={setStreet}
            style={styles.textInput}
            placeholder="Street address, apartment, house"
          />

          <Text style={styles.inputLabel}>City</Text>
          <TextInput
            value={city}
            onChangeText={setCity}
            style={styles.textInput}
            placeholder="City"
          />
        </View>

        {/* Payment Methods */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="card-outline" size={20} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Payment Method</Text>
          </View>

          {["Cash on Delivery", "bKash / Mobile Wallet", "Debit / Credit Card"].map((method) => (
            <TouchableOpacity
              key={method}
              style={[styles.paymentOption, paymentMethod === method && styles.activePaymentOption]}
              onPress={() => setPaymentMethod(method)}
            >
              <Ionicons
                name={paymentMethod === method ? "radio-button-on" : "radio-button-off"}
                size={18}
                color={paymentMethod === method ? COLORS.primary : COLORS.textLight}
              />
              <Text
                style={[
                  styles.paymentOptionText,
                  paymentMethod === method && styles.activePaymentText
                ]}
              >
                {method}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Order Items Preview */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="receipt-outline" size={20} color={COLORS.primary} />
            <Text style={styles.cardTitle}>Order Summary ({items.length} items)</Text>
          </View>

          {items.map((i) => (
            <View key={i._id} style={styles.itemRow}>
              <Text style={styles.itemName} numberOfLines={1}>
                {i.quantity}x {i.name}
              </Text>
              <Text style={styles.itemPrice}>${(i.price * i.quantity).toFixed(2)}</Text>
            </View>
          ))}

          <View style={styles.divider} />

          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Subtotal</Text>
            <Text style={styles.calcVal}>${subtotal.toFixed(2)}</Text>
          </View>
          {discountAmount > 0 && (
            <View style={styles.calcRow}>
              <Text style={[styles.calcLabel, { color: COLORS.primary }]}>Discount</Text>
              <Text style={[styles.calcVal, { color: COLORS.primary }]}>
                -${discountAmount.toFixed(2)}
              </Text>
            </View>
          )}
          <View style={styles.calcRow}>
            <Text style={styles.calcLabel}>Delivery Fee</Text>
            <Text style={styles.calcVal}>${shippingFee.toFixed(2)}</Text>
          </View>
          <View style={[styles.calcRow, { marginTop: 6 }]}>
            <Text style={styles.totalText}>Total Amount</Text>
            <Text style={styles.totalVal}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Place Order CTA */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomSubtext}>Pay via {paymentMethod}</Text>
          <Text style={styles.bottomTotal}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.placeOrderBtn} onPress={handlePlaceOrder}>
          <Text style={styles.placeOrderText}>Confirm & Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scroll: {
    padding: 16,
    paddingBottom: 30,
    gap: 14,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 4,
    marginTop: 8,
  },
  textInput: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
    fontSize: 13,
    color: COLORS.text,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    marginBottom: 8,
    gap: 10,
  },
  activePaymentOption: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primaryLight,
  },
  paymentOptionText: {
    fontSize: 13,
    color: COLORS.text,
    fontWeight: "600",
  },
  activePaymentText: {
    color: COLORS.primaryDark,
    fontWeight: "700",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  itemName: {
    fontSize: 12,
    color: COLORS.text,
    flex: 1,
    marginRight: 8,
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 10,
  },
  calcRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  calcLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  calcVal: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
  },
  totalText: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.text,
  },
  totalVal: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.primary,
  },
  bottomBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: COLORS.card,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  bottomSubtext: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  bottomTotal: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.primary,
  },
  placeOrderBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  placeOrderText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
  },
});

export default CheckoutScreen;
