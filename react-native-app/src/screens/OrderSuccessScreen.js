import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../constants/theme";

export const OrderSuccessScreen = ({ route, navigation }) => {
  const { order } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.successCircle}>
          <Ionicons name="checkmark-circle" size={80} color={COLORS.primary} />
        </View>

        <Text style={styles.title}>Order Placed Successfully!</Text>
        <Text style={styles.subtitle}>
          Thank you for choosing 100% certified organic foods from EcoBazar.
        </Text>

        {order && (
          <View style={styles.receiptCard}>
            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Order ID</Text>
              <Text style={styles.receiptValue}>{order._id}</Text>
            </View>
            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Amount Paid / Due</Text>
              <Text style={[styles.receiptValue, { color: COLORS.primary }]}>
                ${order.totalAmount?.toFixed(2)}
              </Text>
            </View>
            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Payment</Text>
              <Text style={styles.receiptValue}>{order.paymentMethod}</Text>
            </View>
            <View style={styles.receiptRow}>
              <Text style={styles.receiptLabel}>Estimated Delivery</Text>
              <Text style={styles.receiptValue}>Tomorrow, 10 AM - 1 PM</Text>
            </View>
          </View>
        )}

        <View style={styles.actionButtons}>
          <TouchableOpacity
            style={styles.viewOrdersBtn}
            onPress={() => navigation.navigate("Orders")}
          >
            <Text style={styles.viewOrdersText}>View My Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.homeBtn}
            onPress={() => navigation.navigate("MainTabs", { screen: "Home" })}
          >
            <Text style={styles.homeBtnText}>Back to Homepage</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  successCircle: {
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textLight,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
    lineHeight: 18,
  },
  receiptCard: {
    width: "100%",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 28,
  },
  receiptRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },
  receiptLabel: {
    fontSize: 13,
    color: COLORS.textLight,
  },
  receiptValue: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
  },
  actionButtons: {
    width: "100%",
    gap: 12,
  },
  viewOrdersBtn: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  viewOrdersText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
  },
  homeBtn: {
    backgroundColor: COLORS.card,
    height: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  homeBtnText: {
    color: COLORS.text,
    fontSize: 14,
    fontWeight: "600",
  },
});

export default OrderSuccessScreen;
