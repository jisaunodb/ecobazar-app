import React, { useState } from "react";
import {
  View,
  Text,
  Image,
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
import {
  updateQuantity,
  removeFromCart,
  applyCoupon,
  clearCart
} from "../redux/slices/cartSlice";

export const CartScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { items, coupon, discountAmount, shippingFee } = useSelector((state) => state.cart);
  const [couponCode, setCouponCode] = useState("");

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = Math.max(0, subtotal - discountAmount + (items.length > 0 ? shippingFee : 0));

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) return;
    if (couponCode.toUpperCase() === "SAVE10" || couponCode.toUpperCase() === "ECO10") {
      dispatch(applyCoupon(couponCode));
      Alert.alert("Success", "Coupon applied! You saved $5.00 on your organic order.");
      setCouponCode("");
    } else {
      Alert.alert("Invalid Coupon", "Try code 'SAVE10' for $5.00 off.");
    }
  };

  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="My Shopping Cart" navigation={navigation} />
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconCircle}>
            <Ionicons name="cart-outline" size={54} color={COLORS.primary} />
          </View>
          <Text style={styles.emptyTitle}>Your Cart is Empty</Text>
          <Text style={styles.emptySubtitle}>Looks like you haven't added any fresh organic products yet.</Text>
          <TouchableOpacity
            style={styles.shopBtn}
            onPress={() => navigation.navigate("Shop")}
          >
            <Text style={styles.shopBtnText}>Explore Organic Grocery</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={`My Cart (${items.length})`}
        navigation={navigation}
        rightAction={
          <TouchableOpacity onPress={() => dispatch(clearCart())}>
            <Text style={styles.clearText}>Clear</Text>
          </TouchableOpacity>
        }
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Items List */}
        <View style={styles.itemsList}>
          {items.map((item) => (
            <View key={item._id} style={styles.cartCard}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />

              <View style={styles.itemDetails}>
                <View style={styles.titleRow}>
                  <Text style={styles.itemName} numberOfLines={2}>
                    {item.name}
                  </Text>
                  <TouchableOpacity
                    onPress={() => dispatch(removeFromCart(item._id))}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
                  </TouchableOpacity>
                </View>

                <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

                <View style={styles.itemActions}>
                  <View style={styles.qtyBox}>
                    <TouchableOpacity
                      style={styles.qtyAction}
                      onPress={() =>
                        dispatch(
                          updateQuantity({ id: item._id, quantity: item.quantity - 1 })
                        )
                      }
                    >
                      <Ionicons name="remove" size={14} color={COLORS.text} />
                    </TouchableOpacity>
                    <Text style={styles.qtyText}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.qtyAction}
                      onPress={() =>
                        dispatch(
                          updateQuantity({ id: item._id, quantity: item.quantity + 1 })
                        )
                      }
                    >
                      <Ionicons name="add" size={14} color={COLORS.text} />
                    </TouchableOpacity>
                  </View>

                  <Text style={styles.itemTotal}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Promo Code Input */}
        <View style={styles.couponCard}>
          <Text style={styles.couponLabel}>Have a promo code?</Text>
          <View style={styles.couponInputRow}>
            <TextInput
              placeholder="e.g. SAVE10"
              placeholderTextColor={COLORS.textLight}
              value={couponCode}
              onChangeText={setCouponCode}
              autoCapitalize="characters"
              style={styles.couponInput}
            />
            <TouchableOpacity style={styles.couponApplyBtn} onPress={handleApplyCoupon}>
              <Text style={styles.couponApplyText}>Apply</Text>
            </TouchableOpacity>
          </View>
          {coupon && (
            <View style={styles.appliedBadge}>
              <Ionicons name="checkmark-circle" size={14} color={COLORS.primary} />
              <Text style={styles.appliedText}>Coupon '{coupon}' active (-$5.00)</Text>
            </View>
          )}
        </View>

        {/* Bill Summary */}
        <View style={styles.summaryCard}>
          <Text style={styles.summaryTitle}>Order Summary</Text>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>

          {discountAmount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: COLORS.primary }]}>Discount</Text>
              <Text style={[styles.summaryValue, { color: COLORS.primary }]}>
                -${discountAmount.toFixed(2)}
              </Text>
            </View>
          )}

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>${shippingFee.toFixed(2)}</Text>
          </View>

          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total Payable</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Checkout Bottom Button */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomTotalLabel}>Total Amount</Text>
          <Text style={styles.bottomTotalVal}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutBtn}
          onPress={() => navigation.navigate("Checkout")}
        >
          <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          <Ionicons name="arrow-forward" size={16} color={COLORS.white} />
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
  clearText: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.danger,
    paddingHorizontal: 8,
  },
  scroll: {
    padding: 16,
    paddingBottom: 30,
  },
  itemsList: {
    gap: 12,
    marginBottom: 16,
  },
  cartCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  itemName: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
    flex: 1,
    marginRight: 8,
  },
  itemPrice: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  itemActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  qtyBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 8,
    padding: 2,
  },
  qtyAction: {
    width: 26,
    height: 26,
    borderRadius: 6,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.text,
  },
  itemTotal: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.primary,
  },
  couponCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 16,
  },
  couponLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 8,
  },
  couponInputRow: {
    flexDirection: "row",
    gap: 8,
  },
  couponInput: {
    flex: 1,
    height: 42,
    backgroundColor: "#f1f5f9",
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 13,
    color: COLORS.text,
  },
  couponApplyBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  couponApplyText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "700",
  },
  appliedBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 6,
  },
  appliedText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: "600",
  },
  summaryCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  summaryValue: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    paddingTop: 10,
    marginTop: 6,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: "800",
    color: COLORS.text,
  },
  totalValue: {
    fontSize: 17,
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
  bottomTotalLabel: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  bottomTotalVal: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.primary,
  },
  checkoutBtn: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 46,
    borderRadius: 12,
    gap: 8,
  },
  checkoutText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  emptyIconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
  },
  emptySubtitle: {
    fontSize: 13,
    color: COLORS.textLight,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 18,
  },
  shopBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  shopBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
  },
});

export default CartScreen;
