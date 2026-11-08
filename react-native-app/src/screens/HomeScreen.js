import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  StatusBar
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../constants/theme";
import { CATEGORIES } from "../constants/mockData";
import { ProductCard } from "../components/ProductCard";

export const HomeScreen = ({ navigation }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const products = useSelector((state) => state.products.products);
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  const filteredProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category.toLowerCase().includes(activeCategory.toLowerCase()));

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.card} />

      {/* Top Header */}
      <View style={styles.header}>
        <View style={styles.userInfo}>
          <Image
            source={{ uri: user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.welcomeText}>Welcome back,</Text>
            <Text style={styles.userName}>{user?.name || "Demo Customer"}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.cartIconBadge}
          onPress={() => navigation.navigate("Cart")}
        >
          <Ionicons name="cart-outline" size={24} color={COLORS.text} />
          {cartItems.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartItems.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Search Bar */}
        <TouchableOpacity
          style={styles.searchBar}
          activeOpacity={0.9}
          onPress={() => navigation.navigate("Shop")}
        >
          <Ionicons name="search" size={20} color={COLORS.textLight} />
          <Text style={styles.searchPlaceholder}>Search organic vegetables, fruits, honey...</Text>
        </TouchableOpacity>

        {/* Promo Hero Banner */}
        <View style={styles.promoBanner}>
          <View style={styles.promoTextContainer}>
            <View style={styles.promoTag}>
              <Text style={styles.promoTagText}>SPECIAL OFFER</Text>
            </View>
            <Text style={styles.promoTitle}>Fresh & 100% Organic</Text>
            <Text style={styles.promoSubtitle}>Get up to 30% OFF this week</Text>
            <TouchableOpacity
              style={styles.promoButton}
              onPress={() => navigation.navigate("Shop")}
            >
              <Text style={styles.promoButtonText}>Shop Now</Text>
              <Ionicons name="arrow-forward" size={14} color={COLORS.primaryDark} />
            </TouchableOpacity>
          </View>
          <Image
            source={{ uri: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=350&q=80" }}
            style={styles.promoImage}
            resizeMode="cover"
          />
        </View>

        {/* Categories Bar */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Categories</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Shop")}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        >
          <TouchableOpacity
            style={[styles.categoryChip, activeCategory === "All" && styles.activeCategoryChip]}
            onPress={() => setActiveCategory("All")}
          >
            <Text style={[styles.categoryChipText, activeCategory === "All" && styles.activeCategoryChipText]}>
              All
            </Text>
          </TouchableOpacity>

          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat._id}
              style={[styles.categoryChip, activeCategory === cat.name && styles.activeCategoryChip]}
              onPress={() => setActiveCategory(cat.name)}
            >
              <Text style={[styles.categoryChipText, activeCategory === cat.name && styles.activeCategoryChipText]}>
                {cat.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Featured Organic Products */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Products</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Shop")}>
            <Text style={styles.seeAllText}>View All ({products.length})</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.grid}>
          {filteredProducts.map((product) => (
            <View key={product._id} style={styles.gridItem}>
              <ProductCard product={product} navigation={navigation} />
            </View>
          ))}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  welcomeText: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  userName: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },
  cartIconBadge: {
    padding: 6,
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 4,
  },
  badgeText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "bold",
  },
  scrollContent: {
    paddingBottom: 24,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    marginTop: 14,
    paddingHorizontal: 14,
    height: 46,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  searchPlaceholder: {
    marginLeft: 10,
    fontSize: 13,
    color: COLORS.textLight,
  },
  promoBanner: {
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    backgroundColor: "#14532d",
    flexDirection: "row",
    overflow: "hidden",
    height: 145,
  },
  promoTextContainer: {
    flex: 1.2,
    padding: 16,
    justifyContent: "center",
  },
  promoTag: {
    alignSelf: "flex-start",
    backgroundColor: "#eab308",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    marginBottom: 6,
  },
  promoTagText: {
    fontSize: 9,
    fontWeight: "800",
    color: "#0f172a",
  },
  promoTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#ffffff",
  },
  promoSubtitle: {
    fontSize: 11,
    color: "#bbf7d0",
    marginTop: 2,
    marginBottom: 10,
  },
  promoButton: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
  },
  promoButtonText: {
    fontSize: 11,
    fontWeight: "700",
    color: COLORS.primaryDark,
  },
  promoImage: {
    flex: 0.9,
    height: "100%",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.primary,
  },
  categoriesList: {
    paddingHorizontal: 16,
    gap: 8,
  },
  categoryChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginRight: 8,
  },
  activeCategoryChip: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
  },
  activeCategoryChipText: {
    color: COLORS.white,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 12,
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
  },
});

export default HomeScreen;
