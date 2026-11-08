import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { COLORS } from "../constants/theme";
import { Header } from "../components/Header";

export const OrdersScreen = ({ navigation }) => {
  const orders = useSelector((state) => state.orders.orders);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return { bg: "#dcfce7", text: "#166534" };
      case "shipped":
        return { bg: "#e0f2fe", text: "#0369a1" };
      case "pending":
      case "processing":
        return { bg: "#fef3c7", text: "#92400e" };
      default:
        return { bg: "#f1f5f9", text: "#475569" };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Orders" navigation={navigation} />

      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="receipt-outline" size={48} color={COLORS.textLight} />
            <Text style={styles.emptyTitle}>No Orders Yet</Text>
            <Text style={styles.emptySubtitle}>You haven't placed any grocery orders yet.</Text>
          </View>
        }
        renderItem={({ item }) => {
          const statusStyle = getStatusColor(item.status);
          return (
            <View style={styles.orderCard}>
              <View style={styles.cardHeader}>
                <View>
                  <Text style={styles.orderId}>{item._id}</Text>
                  <Text style={styles.orderDate}>{item.orderDate || "Recent"}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.bg }]}>
                  <Text style={[styles.statusText, { color: statusStyle.text }]}>
                    {item.status}
                  </Text>
                </View>
              </View>

              <View style={styles.itemsBox}>
                {item.items?.map((it, idx) => (
                  <Text key={idx} style={styles.itemLine} numberOfLines={1}>
                    • {it.qty}x {it.name} (${it.price?.toFixed(2)})
                  </Text>
                ))}
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.paymentMethod}>Paid via {item.paymentMethod || "COD"}</Text>
                <Text style={styles.totalPrice}>${item.totalAmount?.toFixed(2)}</Text>
              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  list: {
    padding: 16,
    gap: 12,
  },
  orderCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  orderId: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },
  orderDate: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 11,
    fontWeight: "700",
  },
  itemsBox: {
    backgroundColor: "#f8fafc",
    padding: 10,
    borderRadius: 10,
    marginVertical: 8,
    gap: 4,
  },
  itemLine: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 6,
  },
  paymentMethod: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.primary,
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 12,
  },
  emptySubtitle: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },
});

export default OrdersScreen;
