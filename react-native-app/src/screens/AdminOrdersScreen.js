import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../constants/theme";
import { Header } from "../components/Header";
import { updateOrderStatus } from "../redux/slices/orderSlice";

export const AdminOrdersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  const handleStatusChange = (orderId, currentStatus) => {
    const nextStatusMap = {
      Pending: "Processing",
      Processing: "Shipped",
      Shipped: "Delivered",
      Delivered: "Pending",
    };
    const nextStatus = nextStatusMap[currentStatus] || "Processing";
    dispatch(updateOrderStatus({ id: orderId, status: nextStatus }));
    Alert.alert("Status Updated", `Order ${orderId} is now marked as "${nextStatus}"`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Customer Orders Queue" showBack navigation={navigation} />

      <FlatList
        data={orders}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <View style={styles.header}>
              <View>
                <Text style={styles.orderId}>{item._id}</Text>
                <Text style={styles.customerName}>{item.userName} ({item.userEmail})</Text>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>{item.status}</Text>
              </View>
            </View>

            <View style={styles.itemBox}>
              {item.items?.map((it, idx) => (
                <Text key={idx} style={styles.itemLine}>
                  • {it.qty}x {it.name}
                </Text>
              ))}
            </View>

            <View style={styles.footer}>
              <Text style={styles.totalAmount}>${item.totalAmount?.toFixed(2)}</Text>
              <TouchableOpacity
                style={styles.changeStatusBtn}
                onPress={() => handleStatusChange(item._id, item.status)}
              >
                <Ionicons name="refresh" size={14} color={COLORS.white} />
                <Text style={styles.changeStatusText}>Advance Status</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  orderId: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },
  customerName: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  statusBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  statusText: {
    color: COLORS.primaryDark,
    fontSize: 11,
    fontWeight: "700",
  },
  itemBox: {
    backgroundColor: "#f8fafc",
    padding: 10,
    borderRadius: 10,
    marginVertical: 10,
  },
  itemLine: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 2,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
  },
  changeStatusBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    height: 34,
    borderRadius: 8,
    gap: 6,
  },
  changeStatusText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "700",
  },
});

export default AdminOrdersScreen;
