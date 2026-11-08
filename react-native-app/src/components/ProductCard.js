import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { toggleWishlist } from "../redux/slices/wishlistSlice";
import { COLORS } from "../constants/theme";

export const ProductCard = ({ product, navigation }) => {
  const dispatch = useDispatch();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isWishlisted = wishlistItems.includes(product._id);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        stock: product.stock,
      })
    );
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.88}
      onPress={() => navigation?.navigate("ProductDetails", { product })}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.image }} style={styles.image} resizeMode="cover" />
        
        {product.discountPercentage > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>-{product.discountPercentage}%</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.wishlistButton}
          onPress={() => dispatch(toggleWishlist(product._id))}
        >
          <Ionicons
            name={isWishlisted ? "heart" : "heart-outline"}
            size={18}
            color={isWishlisted ? COLORS.danger : COLORS.textLight}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.details}>
        <Text style={styles.category}>{product.category}</Text>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        <View style={styles.ratingRow}>
          <Ionicons name="star" size={12} color="#f59e0b" />
          <Text style={styles.ratingText}>{product.rating}</Text>
          <Text style={styles.reviewsText}>({product.reviewsCount})</Text>
        </View>

        <View style={styles.priceRow}>
          <View>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
            {product.originalPrice > product.price && (
              <Text style={styles.originalPrice}>${product.originalPrice.toFixed(2)}</Text>
            )}
          </View>

          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <Ionicons name="add" size={20} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  imageContainer: {
    width: "100%",
    height: 140,
    backgroundColor: "#f1f5f9",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  discountBadge: {
    position: "absolute",
    top: 8,
    left: 8,
    backgroundColor: COLORS.danger,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  discountText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: "700",
  },
  wishlistButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  details: {
    padding: 10,
  },
  category: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: "700",
    textTransform: "uppercase",
    marginBottom: 2,
  },
  name: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
    minHeight: 34,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    marginBottom: 6,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: "600",
    color: COLORS.text,
    marginLeft: 3,
  },
  reviewsText: {
    fontSize: 10,
    color: COLORS.textLight,
    marginLeft: 2,
  },
  priceRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  price: {
    fontSize: 15,
    fontWeight: "700",
    color: COLORS.primary,
  },
  originalPrice: {
    fontSize: 11,
    color: COLORS.textLight,
    textDecorationLine: "line-through",
  },
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductCard;
