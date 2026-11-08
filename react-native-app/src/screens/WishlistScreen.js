import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../constants/theme";
import { Header } from "../components/Header";
import { toggleWishlist } from "../redux/slices/wishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";

export const WishlistScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const wishlistIds = useSelector((state) => state.wishlist.items);
  const allProducts = useSelector((state) => state.products.products);

  const wishlistProducts = allProducts.filter((p) => wishlistIds.includes(p._id));

  return (
    <SafeAreaView style={styles.container}>
      <Header title={`My Wishlist (${wishlistProducts.length})`} navigation={navigation} />

      <FlatList
        data={wishlistProducts}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Ionicons name="heart-outline" size={54} color={COLORS.textLight} />
            <Text style={styles.emptyTitle}>Wishlist is empty</Text>
            <Text style={styles.emptySubtitle}>Explore our fresh organic catalogue and tap the heart icon to save products here.</Text>
            <TouchableOpacity
              style={styles.exploreBtn}
              onPress={() => navigation.navigate("Shop")}
            >
              <Text style={styles.exploreBtnText}>Browse Products</Text>
            </TouchableOpacity>
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={styles.category}>{item.category}</Text>
              <Text style={styles.name} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.price}>${item.price.toFixed(2)}</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.cartBtn}
                onPress={() => {
                  dispatch(
                    addToCart({
                      _id: item._id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      quantity: 1,
                      stock: item.stock
                    })
                  );
                }}
              >
                <Ionicons name="cart" size={16} color={COLORS.white} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.removeBtn}
                onPress={() => dispatch(toggleWishlist(item._id))}
              >
                <Ionicons name="trash-outline" size={16} color={COLORS.danger} />
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
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 12,
    backgroundColor: "#f1f5f9",
  },
  info: {
    flex: 1,
    marginLeft: 12,
  },
  category: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.primary,
    marginTop: 4,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
  cartBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  removeBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: "#fee2e2",
    alignItems: "center",
    justifyContent: "center",
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 80,
    paddingHorizontal: 30,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: COLORS.text,
    marginTop: 14,
  },
  emptySubtitle: {
    fontSize: 13,
    color: COLORS.textLight,
    textAlign: "center",
    marginTop: 6,
    marginBottom: 20,
    lineHeight: 18,
  },
  exploreBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  exploreBtnText: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: "700",
  },
});

export default WishlistScreen;
