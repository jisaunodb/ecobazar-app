import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { COLORS } from "../constants/theme";
import { loginAsAdmin } from "../redux/slices/authSlice";

export const AdminLoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("admin@ecobazar.com");
  const [password, setPassword] = useState("admin123");

  const handleAdminSignIn = () => {
    dispatch(loginAsAdmin());
    Alert.alert("Welcome Admin", "Access granted to Store Admin Dashboard!");
    navigation.replace("AdminDashboard");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons name="shield-checkmark" size={32} color="#f59e0b" />
          </View>
          <View style={styles.tag}>
            <Text style={styles.tagText}>ADMIN PORTAL</Text>
          </View>
          <Text style={styles.title}>Admin Sign In</Text>
          <Text style={styles.subtitle}>Secure authentication for Store Managers & Administrators</Text>
        </View>

        {/* 1-Click Demo Admin Button */}
        <View style={styles.demoCard}>
          <View style={styles.demoHeader}>
            <Ionicons name="flash" size={16} color="#f59e0b" />
            <Text style={styles.demoTitle}>QUICK ADMIN LOGIN</Text>
          </View>
          <TouchableOpacity style={styles.demoBtn} onPress={handleAdminSignIn}>
            <Text style={styles.demoBtnText}>Sign In as Demo Admin (1-Click)</Text>
            <Ionicons name="arrow-forward" size={16} color="#0f172a" />
          </TouchableOpacity>
        </View>

        {/* Form */}
        <View style={styles.form}>
          <Text style={styles.inputLabel}>Admin Email Address</Text>
          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={18} color="#d97706" />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="admin@ecobazar.com"
            />
          </View>

          <Text style={styles.inputLabel}>Admin Password</Text>
          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={18} color="#d97706" />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
            />
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleAdminSignIn}>
            <Ionicons name="log-in-outline" size={18} color="#ffffff" />
            <Text style={styles.loginBtnText}>Sign In to Dashboard</Text>
          </TouchableOpacity>
        </View>

        {/* Return to Customer Login */}
        <TouchableOpacity
          style={styles.customerSwitch}
          onPress={() => navigation.navigate("Login")}
        >
          <Ionicons name="person-outline" size={16} color={COLORS.primary} />
          <Text style={styles.customerSwitchText}>Are you a customer? Go to Customer Login</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#090d16",
  },
  scroll: {
    padding: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 24,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  tag: {
    backgroundColor: "rgba(245, 158, 11, 0.15)",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    marginBottom: 8,
  },
  tagText: {
    color: "#f59e0b",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  title: {
    fontSize: 22,
    fontWeight: "900",
    color: "#ffffff",
  },
  subtitle: {
    fontSize: 12,
    color: "#94a3b8",
    textAlign: "center",
    marginTop: 6,
    paddingHorizontal: 20,
  },
  demoCard: {
    backgroundColor: "#1e293b",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#334155",
    marginBottom: 20,
  },
  demoHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 8,
  },
  demoTitle: {
    fontSize: 10,
    fontWeight: "800",
    color: "#f59e0b",
    letterSpacing: 0.5,
  },
  demoBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f59e0b",
    height: 44,
    borderRadius: 10,
    gap: 8,
  },
  demoBtnText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#0f172a",
  },
  form: {
    backgroundColor: "#111827",
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: "#1f2937",
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: "#e2e8f0",
    marginBottom: 6,
    marginTop: 10,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1e293b",
    borderWidth: 1,
    borderColor: "#334155",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#ffffff",
  },
  loginBtn: {
    backgroundColor: "#16a34a",
    flexDirection: "row",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    gap: 8,
  },
  loginBtnText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
  customerSwitch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    gap: 6,
  },
  customerSwitchText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.primary,
  },
});

export default AdminLoginScreen;
