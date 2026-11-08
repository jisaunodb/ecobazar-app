import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../constants/theme";
import { Header } from "../components/Header";
import { loginAsCustomer, loginAsAdmin, logout } from "../redux/slices/authSlice";

export const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);

  const handleAdminSwitch = () => {
    dispatch(loginAsAdmin());
    Alert.alert("Admin Mode", "Switched to Admin Portal!", [
      { text: "Open Dashboard", onPress: () => navigation.navigate("AdminDashboard") }
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Account" navigation={navigation} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* User Card */}
        <View style={styles.userCard}>
          <Image
            source={{ uri: user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" }}
            style={styles.avatar}
          />
          <View style={styles.userInfo}>
            <View style={styles.badgeRow}>
              <Text style={styles.userName}>{user?.name || "Demo Customer"}</Text>
              <View style={[styles.roleBadge, role === "admin" && styles.adminBadge]}>
                <Text style={[styles.roleText, role === "admin" && styles.adminRoleText]}>
                  {role === "admin" ? "ADMIN" : "CUSTOMER"}
                </Text>
              </View>
            </View>
            <Text style={styles.userEmail}>{user?.email || "demo.customer@ecobazar.com"}</Text>
            <Text style={styles.userPhone}>{user?.phone || "+1 (555) 019-0000"}</Text>
          </View>
        </View>

        {/* Admin Switch Banner */}
        <TouchableOpacity style={styles.adminBanner} onPress={handleAdminSwitch}>
          <View style={styles.adminIconBox}>
            <Ionicons name="shield-checkmark" size={24} color="#f59e0b" />
          </View>
          <View style={styles.adminBannerText}>
            <Text style={styles.adminBannerTitle}>EcoBazar Admin Portal</Text>
            <Text style={styles.adminBannerSub}>Manage inventory, catalog & customer orders</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#f59e0b" />
        </TouchableOpacity>

        {/* Menu Items */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>My Shopping</Text>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Orders")}>
            <View style={[styles.menuIcon, { backgroundColor: "#dbeafe" }]}>
              <Ionicons name="receipt-outline" size={18} color="#2563eb" />
            </View>
            <Text style={styles.menuTitle}>My Orders</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Wishlist")}>
            <View style={[styles.menuIcon, { backgroundColor: "#fee2e2" }]}>
              <Ionicons name="heart-outline" size={18} color="#dc2626" />
            </View>
            <Text style={styles.menuTitle}>Saved Wishlist</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() =>
              Alert.alert(
                "Default Address",
                `${user?.addresses?.[0]?.street || "742 Evergreen Terrace"}, ${user?.addresses?.[0]?.city || "Springfield"}`
              )
            }
          >
            <View style={[styles.menuIcon, { backgroundColor: "#dcfce7" }]}>
              <Ionicons name="location-outline" size={18} color="#16a34a" />
            </View>
            <Text style={styles.menuTitle}>Delivery Addresses</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        {/* Account Settings */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Authentication</Text>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              dispatch(loginAsCustomer());
              Alert.alert("Success", "Reset to Demo Customer account");
            }}
          >
            <View style={[styles.menuIcon, { backgroundColor: "#f3e8ff" }]}>
              <Ionicons name="person-outline" size={18} color="#9333ea" />
            </View>
            <Text style={styles.menuTitle}>Reset as Demo Customer</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => navigation.navigate("AdminLogin")}
          >
            <View style={[styles.menuIcon, { backgroundColor: "#fef3c7" }]}>
              <Ionicons name="lock-closed-outline" size={18} color="#d97706" />
            </View>
            <Text style={styles.menuTitle}>Dedicated Admin Login</Text>
            <Ionicons name="chevron-forward" size={18} color={COLORS.textLight} />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.menuItem, { borderBottomWidth: 0 }]}
            onPress={() => {
              dispatch(logout());
              navigation.replace("Login");
            }}
          >
            <View style={[styles.menuIcon, { backgroundColor: "#fee2e2" }]}>
              <Ionicons name="log-out-outline" size={18} color="#ef4444" />
            </View>
            <Text style={[styles.menuTitle, { color: "#ef4444" }]}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    paddingBottom: 40,
    gap: 16,
  },
  userCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  userInfo: {
    marginLeft: 14,
    flex: 1,
  },
  badgeRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userName: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
  },
  roleBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  adminBadge: {
    backgroundColor: "#fef3c7",
  },
  roleText: {
    fontSize: 9,
    fontWeight: "800",
    color: COLORS.primaryDark,
  },
  adminRoleText: {
    color: "#b45309",
  },
  userEmail: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 2,
  },
  userPhone: {
    fontSize: 11,
    color: COLORS.textLight,
    marginTop: 1,
  },
  adminBanner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#0f172a",
    padding: 14,
    borderRadius: 16,
  },
  adminIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#1e293b",
    alignItems: "center",
    justifyContent: "center",
  },
  adminBannerText: {
    flex: 1,
    marginLeft: 12,
  },
  adminBannerTitle: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
  adminBannerSub: {
    color: "#94a3b8",
    fontSize: 11,
    marginTop: 2,
  },
  section: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.textLight,
    textTransform: "uppercase",
    marginVertical: 6,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  menuIcon: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  menuTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginLeft: 12,
  },
});

export default ProfileScreen;
