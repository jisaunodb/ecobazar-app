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
import { loginAsCustomer } from "../redux/slices/authSlice";

export const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("demo.customer@ecobazar.com");
  const [password, setPassword] = useState("password123");

  const handleCustomerLogin = () => {
    dispatch(loginAsCustomer());
    Alert.alert("Success", "Logged in as Demo Customer!");
    navigation.replace("MainTabs");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.header}>
          <View style={styles.iconCircle}>
            <Ionicons name="leaf" size={32} color={COLORS.primary} />
          </View>
          <Text style={styles.title}>EcoBazar</Text>
          <Text style={styles.subtitle}>Welcome back! Sign in to your organic store account</Text>
        </View>

        {/* 1-Click Demo Customer Access */}
        <View style={styles.demoCard}>
          <View style={styles.demoHeader}>
            <Ionicons name="flash" size={16} color="#d97706" />
            <Text style={styles.demoTitle}>QUICK ACCESS</Text>
          </View>
          <TouchableOpacity style={styles.demoBtn} onPress={handleCustomerLogin}>
            <Ionicons name="person-circle-outline" size={20} color={COLORS.primaryDark} />
            <Text style={styles.demoBtnText}>1-Click Sign In as Demo Customer</Text>
          </TouchableOpacity>
        </View>

        {/* Regular Login Form */}
        <View style={styles.form}>
          <Text style={styles.inputLabel}>Email Address</Text>
          <View style={styles.inputBox}>
            <Ionicons name="mail-outline" size={18} color={COLORS.textLight} />
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              placeholder="customer@example.com"
            />
          </View>

          <Text style={styles.inputLabel}>Password</Text>
          <View style={styles.inputBox}>
            <Ionicons name="lock-closed-outline" size={18} color={COLORS.textLight} />
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholder="••••••••"
            />
          </View>

          <TouchableOpacity style={styles.loginBtn} onPress={handleCustomerLogin}>
            <Text style={styles.loginBtnText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {/* Dedicated Admin Portal Link */}
        <TouchableOpacity
          style={styles.adminSwitch}
          onPress={() => navigation.navigate("AdminLogin")}
        >
          <Ionicons name="shield-checkmark" size={18} color="#d97706" />
          <Text style={styles.adminSwitchText}>Store Administrator? Go to Admin Portal</Text>
        </TouchableOpacity>
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
    padding: 24,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginTop: 20,
    marginBottom: 28,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: COLORS.primaryLight,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "900",
    color: COLORS.text,
  },
  subtitle: {
    fontSize: 13,
    color: COLORS.textLight,
    textAlign: "center",
    marginTop: 6,
    paddingHorizontal: 20,
  },
  demoCard: {
    backgroundColor: "#fef3c7",
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: "#fde68a",
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
    color: "#b45309",
    letterSpacing: 0.5,
  },
  demoBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
    height: 44,
    borderRadius: 10,
    gap: 8,
  },
  demoBtnText: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.primaryDark,
  },
  form: {
    backgroundColor: COLORS.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 6,
    marginTop: 10,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.text,
  },
  loginBtn: {
    backgroundColor: COLORS.primary,
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  loginBtnText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
  },
  adminSwitch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    gap: 6,
  },
  adminSwitchText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#b45309",
  },
});

export default LoginScreen;
