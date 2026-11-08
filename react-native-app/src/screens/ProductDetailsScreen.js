import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { COLORS } from "../constants/theme";
import { addToCart } from "../redux/slices/cartSlice";
import { toggleWishlist } from "../redux/slices/wishlistSlice";

export const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.includes(product._id);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        stock: product.stock
      })
    );
    Alert.alert("Success", `${quantity}x ${product.name} added to cart!`, [
      { text: "View Cart", onPress: () => navigation.navigate("Cart") },
      { text: "Keep Shopping", style: "cancel" }
    ]);
  };

  const handleBuyNow = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        stock: product.stock
      })
    );
    navigation.navigate("Checkout");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Custom Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.circleBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color={COLORS.text} />
        </TouchableOpacity>
        <Text style={styles.topBarTitle} numberOfLines={1}>Product Details</Text>
        <TouchableOpacity
          style={styles.circleBtn}
          onPress={() => dispatch(toggleWishlist(product._id))}
        >
          <Ionicons
            name={isWishlisted ? "heart" : "heart-outline"}
            size={22}
            color={isWishlisted ? COLORS.danger : COLORS.text}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
          {product.discountPercentage > 0 && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>Save {product.discountPercentage}%</Text>
            </View>
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.metaRow}>
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{product.category}</Text>
            </View>
            <View style={styles.stockBadge}>
              <Text style={styles.stockText}>{product.stock > 0 ? "In Stock" : "Out of Stock"}</Text>
            </View>
          </View>

          <Text style={styles.name}>{product.name}</Text>

          <View style={styles.ratingRow}>
            <Ionicons name="star" size={16} color="#f59e0b" />
            <Text style={styles.ratingVal}>{product.rating}</Text>
            <Text style={styles.reviewsText}>({product.reviewsCount} customer reviews)</Text>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.originalPrice > product.price && (
              <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
            )}
            <Text style={styles.unitText}>/ {product.unit || "item"}</Text>
          </View>

          {/* Description */}
          <Text style={styles.sectionHeading}>Description</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Quantity Controls */}
          <View style={styles.quantitySection}>
            <Text style={styles.qtyLabel}>Quantity:</Text>
            <View style={styles.qtyControls}>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Ionicons name="remove" size={18} color={COLORS.text} />
              </TouchableOpacity>
              <Text style={styles.qtyNumber}>{quantity}</Text>
              <TouchableOpacity
                style={styles.qtyBtn}
                onPress={() => setQuantity((q) => Math.min(product.stock || 99, q + 1))}
              >
                <Ionicons name="add" size={18} color={COLORS.text} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Sticky Action Bar */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.addCartBtn} onPress={handleAddToCart}>
          <Ionicons name="cart-outline" size={20} color={COLORS.primary} />
          <Text style={styles.addCartText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyNowBtn} onPress={handleBuyNow}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.card,
  },
  topBar: {
    height: 54,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  topBarTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
  },
  circleBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "#f1f5f9",
    alignItems: "center",
    justifyContent: "center",
  },
  scroll: {
    paddingBottom: 40,
  },
  imageWrapper: {
    width: "100%",
    height: 300,
    backgroundColor: "#f8fafc",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  discountBadge: {
    position: "absolute",
    bottom: 14,
    left: 16,
    backgroundColor: COLORS.danger,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  discountText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: "bold",
  },
  content: {
    padding: 20,
  },
  metaRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  categoryText: {
    color: COLORS.primaryDark,
    fontSize: 11,
    fontWeight: "700",
  },
  stockBadge: {
    backgroundColor: "#dcfce7",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  stockText: {
    color: "#166534",
    fontSize: 11,
    fontWeight: "700",
  },
  name: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.text,
    lineHeight: 28,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 12,
  },
  ratingVal: {
    fontSize: 13,
    fontWeight: "700",
    color: COLORS.text,
    marginLeft: 4,
  },
  reviewsText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginLeft: 6,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 16,
  },
  price: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.primary,
  },
  originalPrice: {
    fontSize: 16,
    color: COLORS.textLight,
    textDecorationLine: "line-through",
    marginLeft: 10,
  },
  unitText: {
    fontSize: 13,
    color: COLORS.textLight,
    marginLeft: 6,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 8,
    marginBottom: 6,
  },
  description: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 22,
  },
  quantitySection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  qtyLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: COLORS.text,
  },
  qtyControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
    borderRadius: 12,
    padding: 4,
  },
  qtyBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyNumber: {
    paddingHorizontal: 16,
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.text,
  },
  bottomBar: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.card,
  },
  addCartBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
  },
  addCartText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: "700",
  },
  buyNowBtn: {
    flex: 1,
    height: 48,
    borderRadius: 14,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  buyNowText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
  },
});

export default ProductDetailsScreen;
