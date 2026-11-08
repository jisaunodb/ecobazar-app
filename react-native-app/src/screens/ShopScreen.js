import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { COLORS } from "../constants/theme";
import { CATEGORIES } from "../constants/mockData";
import { ProductCard } from "../components/ProductCard";
import { Header } from "../components/Header";

export const ShopScreen = ({ navigation }) => {
  const products = useSelector((state) => state.products.products);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");
  const [sortBy, setSortBy] = useState("featured"); // featured, price-low, price-high, rating

  let filtered = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      selectedCat === "All" ||
      p.category.toLowerCase().includes(selectedCat.toLowerCase());
    return matchesSearch && matchesCat;
  });

  if (sortBy === "price-low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Eco Shop" navigation={navigation} />

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <View style={styles.inputWrapper}>
          <Ionicons name="search" size={18} color={COLORS.textLight} />
          <TextInput
            placeholder="Search all organic groceries..."
            placeholderTextColor={COLORS.textLight}
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch("")}>
              <Ionicons name="close-circle" size={18} color={COLORS.textLight} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Category Horizontal Filter */}
      <View style={styles.categoryBar}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.catScroll}>
          <TouchableOpacity
            style={[styles.catBtn, selectedCat === "All" && styles.activeCatBtn]}
            onPress={() => setSelectedCat("All")}
          >
            <Text style={[styles.catBtnText, selectedCat === "All" && styles.activeCatBtnText]}>
              All
            </Text>
          </TouchableOpacity>
          {CATEGORIES.map((c) => (
            <TouchableOpacity
              key={c._id}
              style={[styles.catBtn, selectedCat === c.name && styles.activeCatBtn]}
              onPress={() => setSelectedCat(c.name)}
            >
              <Text style={[styles.catBtnText, selectedCat === c.name && styles.activeCatBtnText]}>
                {c.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Sort Buttons */}
      <View style={styles.sortBar}>
        <Text style={styles.resultsCount}>{filtered.length} Items found</Text>
        <View style={styles.sortOptions}>
          <TouchableOpacity
            style={[styles.sortBtn, sortBy === "featured" && styles.activeSortBtn]}
            onPress={() => setSortBy("featured")}
          >
            <Text style={[styles.sortBtnText, sortBy === "featured" && styles.activeSortBtnText]}>
              Featured
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortBtn, sortBy === "price-low" && styles.activeSortBtn]}
            onPress={() => setSortBy("price-low")}
          >
            <Text style={[styles.sortBtnText, sortBy === "price-low" && styles.activeSortBtnText]}>
              $ Low
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.sortBtn, sortBy === "rating" && styles.activeSortBtn]}
            onPress={() => setSortBy("rating")}
          >
            <Text style={[styles.sortBtnText, sortBy === "rating" && styles.activeSortBtnText]}>
              ★ Rating
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Products List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.cardWrapper}>
            <ProductCard product={item} navigation={navigation} />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="leaf-outline" size={48} color={COLORS.textLight} />
            <Text style={styles.emptyTitle}>No products found</Text>
            <Text style={styles.emptySubtitle}>Try adjusting your search or category filter</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 6,
    backgroundColor: COLORS.card,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
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
  categoryBar: {
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 8,
  },
  catScroll: {
    paddingHorizontal: 16,
  },
  catBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    backgroundColor: "#f1f5f9",
    marginRight: 8,
  },
  activeCatBtn: {
    backgroundColor: COLORS.primary,
  },
  catBtnText: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.text,
  },
  activeCatBtnText: {
    color: COLORS.white,
  },
  sortBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  resultsCount: {
    fontSize: 12,
    color: COLORS.textLight,
    fontWeight: "600",
  },
  sortOptions: {
    flexDirection: "row",
    gap: 6,
  },
  sortBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeSortBtn: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  sortBtnText: {
    fontSize: 11,
    color: COLORS.textLight,
    fontWeight: "600",
  },
  activeSortBtnText: {
    color: COLORS.primaryDark,
    fontWeight: "700",
  },
  listContent: {
    paddingHorizontal: 10,
    paddingBottom: 24,
  },
  columnWrapper: {
    justifyContent: "space-between",
  },
  cardWrapper: {
    width: "48%",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
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

export default ShopScreen;
