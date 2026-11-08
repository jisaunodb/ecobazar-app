import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../constants/theme";
import { loginAsCustomer } from "../redux/slices/authSlice";

export const AdminDashboardScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const orders = useSelector((state) => state.orders.orders);

  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.brandBox}>
          <Ionicons name="shield-checkmark" size={20} color="#f59e0b" />
          <Text style={styles.brandTitle}>Admin Console</Text>
        </View>

        <TouchableOpacity
          style={styles.switchStoreBtn}
          onPress={() => {
            dispatch(loginAsCustomer());
            navigation.replace("MainTabs");
          }}
        >
          <Ionicons name="storefront-outline" size={16} color={COLORS.primary} />
          <Text style={styles.switchStoreText}>Back to Store</Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={styles.welcomeText}>Store Overview & Analytics</Text>

        {/* Metric Cards */}
        <View style={styles.statsGrid}>
          <View style={[styles.statCard, { borderLeftColor: "#10b981" }]}>
            <Text style={styles.statLabel}>Total Revenue</Text>
            <Text style={styles.statValue}>${totalRevenue.toFixed(2)}</Text>
            <Text style={styles.statSub}>+18.4% from last week</Text>
          </View>

          <View style={[styles.statCard, { borderLeftColor: "#3b82f6" }]}>
            <Text style={styles.statLabel}>Total Orders</Text>
            <Text style={styles.statValue}>{orders.length}</Text>
            <Text style={styles.statSub}>Active order queue</Text>
          </View>

          <View style={[styles.statCard, { borderLeftColor: "#f59e0b" }]}>
            <Text style={styles.statLabel}>Total Products</Text>
            <Text style={styles.statValue}>{products.length}</Text>
            <Text style={styles.statSub}>In catalog stock</Text>
          </View>

          <View style={[styles.statCard, { borderLeftColor: "#8b5cf6" }]}>
            <Text style={styles.statLabel}>Active Customers</Text>
            <Text style={styles.statValue}>1,420</Text>
            <Text style={styles.statSub}>Verified accounts</Text>
          </View>
        </View>

        {/* Quick Management Actions */}
        <Text style={styles.sectionTitle}>Management Modules</Text>

        <TouchableOpacity
          style={styles.moduleCard}
          onPress={() => navigation.navigate("AdminProducts")}
        >
          <View style={[styles.moduleIcon, { backgroundColor: "#dbeafe" }]}>
            <Ionicons name="cube-outline" size={24} color="#2563eb" />
          </View>
          <View style={styles.moduleText}>
            <Text style={styles.moduleName}>Product Inventory</Text>
            <Text style={styles.moduleDesc}>Add, edit, restock and delete organic items</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.moduleCard}
          onPress={() => navigation.navigate("AdminOrders")}
        >
          <View style={[styles.moduleIcon, { backgroundColor: "#fef3c7" }]}>
            <Ionicons name="receipt-outline" size={24} color="#d97706" />
          </View>
          <View style={styles.moduleText}>
            <Text style={styles.moduleName}>Customer Orders</Text>
            <Text style={styles.moduleDesc}>Update dispatch status (Pending / Shipped / Delivered)</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={COLORS.textLight} />
        </TouchableOpacity>

        {/* Recent Orders List Preview */}
        <Text style={styles.sectionTitle}>Recent Orders Queue</Text>
        {orders.slice(0, 3).map((ord) => (
          <View key={ord._id} style={styles.recentOrderCard}>
            <View style={styles.recentOrderHeader}>
              <Text style={styles.recentOrderId}>{ord._id}</Text>
              <Text style={styles.recentOrderAmount}>${ord.totalAmount?.toFixed(2)}</Text>
            </View>
            <Text style={styles.recentOrderCustomer}>{ord.userName} • {ord.status}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    height: 56,
    backgroundColor: "#0f172a",
  },
  brandBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  brandTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
  },
  switchStoreBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(22, 163, 74, 0.2)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    gap: 4,
  },
  switchStoreText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: "700",
  },
  scroll: {
    padding: 16,
    paddingBottom: 30,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
    marginBottom: 14,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: "48%",
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderLeftWidth: 4,
  },
  statLabel: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: "600",
  },
  statValue: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    marginVertical: 4,
  },
  statSub: {
    fontSize: 10,
    color: COLORS.primary,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 10,
    marginBottom: 12,
  },
  moduleCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
  },
  moduleIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  moduleText: {
    flex: 1,
    marginLeft: 12,
  },
  moduleName: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },
  moduleDesc: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 2,
  },
  recentOrderCard: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 8,
  },
  recentOrderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recentOrderId: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
  },
  recentOrderAmount: {
    fontSize: 13,
    fontWeight: "800",
    color: COLORS.primary,
  },
  recentOrderCustomer: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 4,
  },
});

export default AdminDashboardScreen;
