import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { COLORS } from "../constants/theme";
import { Header } from "../components/Header";
import { addProduct, deleteProduct } from "../redux/slices/productSlice";

export const AdminProductsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const [modalVisible, setModalVisible] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Fruits & Veggies");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleCreateProduct = () => {
    if (!name.trim() || !price.trim()) {
      Alert.alert("Error", "Please provide product name and price");
      return;
    }

    const newProd = {
      _id: `prod_${Date.now()}`,
      name: name.trim(),
      category,
      price: parseFloat(price) || 0,
      stock: parseInt(stock, 10) || 10,
      rating: 5.0,
      reviewsCount: 1,
      isFeatured: true,
      image: imageUrl.trim() || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=400&q=80",
      description: "Fresh farm-sourced 100% certified organic produce."
    };

    dispatch(addProduct(newProd));
    Alert.alert("Success", "New organic product added to catalog!");
    setName("");
    setPrice("");
    setStock("");
    setImageUrl("");
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Product Inventory"
        showBack
        navigation={navigation}
        rightAction={
          <TouchableOpacity style={styles.addBtn} onPress={() => setModalVisible(true)}>
            <Ionicons name="add" size={20} color={COLORS.white} />
          </TouchableOpacity>
        }
      />

      <FlatList
        data={products}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={{ uri: item.image }} style={styles.productImage} />

            <View style={styles.productDetails}>
              <Text style={styles.productCat}>{item.category}</Text>
              <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              <Text style={styles.productStock}>Stock: {item.stock} units</Text>
            </View>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={() => {
                Alert.alert("Confirm Delete", `Delete ${item.name}?`, [
                  { text: "Cancel", style: "cancel" },
                  { text: "Delete", style: "destructive", onPress: () => dispatch(deleteProduct(item._id)) }
                ]);
              }}
            >
              <Ionicons name="trash-outline" size={18} color={COLORS.danger} />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Add Product Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Organic Product</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.text} />
              </TouchableOpacity>
            </View>

            <Text style={styles.inputLabel}>Product Title</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="e.g. Organic Sweet Mangoes 1kg"
              value={name}
              onChangeText={setName}
            />

            <Text style={styles.inputLabel}>Category</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Fruits & Veggies"
              value={category}
              onChangeText={setCategory}
            />

            <View style={styles.inputRow}>
              <View style={{ flex: 1 }}>
                <Text style={styles.inputLabel}>Price ($)</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="5.99"
                  keyboardType="numeric"
                  value={price}
                  onChangeText={setPrice}
                />
              </View>
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.inputLabel}>Stock Qty</Text>
                <TextInput
                  style={styles.modalInput}
                  placeholder="25"
                  keyboardType="numeric"
                  value={stock}
                  onChangeText={setStock}
                />
              </View>
            </View>

            <Text style={styles.inputLabel}>Image URL (optional)</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="https://images.unsplash.com/..."
              value={imageUrl}
              onChangeText={setImageUrl}
            />

            <TouchableOpacity style={styles.saveProductBtn} onPress={handleCreateProduct}>
              <Text style={styles.saveProductText}>Save & Publish Product</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  addBtn: {
    width: 34,
    height: 34,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    padding: 16,
    gap: 12,
  },
  productCard: {
    flexDirection: "row",
    backgroundColor: COLORS.card,
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
  },
  productImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#f1f5f9",
  },
  productDetails: {
    flex: 1,
    marginLeft: 12,
  },
  productCat: {
    fontSize: 10,
    color: COLORS.primary,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  productName: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: 2,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: "800",
    color: COLORS.primary,
    marginTop: 2,
  },
  productStock: {
    fontSize: 11,
    color: COLORS.textLight,
  },
  deleteBtn: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: COLORS.card,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
    paddingBottom: 36,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.text,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: "700",
    color: COLORS.text,
    marginTop: 8,
    marginBottom: 4,
  },
  modalInput: {
    backgroundColor: "#f8fafc",
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    height: 42,
    fontSize: 13,
    color: COLORS.text,
  },
  inputRow: {
    flexDirection: "row",
  },
  saveProductBtn: {
    backgroundColor: COLORS.primary,
    height: 46,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  saveProductText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: "700",
  },
});

export default AdminProductsScreen;
