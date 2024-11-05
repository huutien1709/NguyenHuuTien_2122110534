import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Picker } from "react-native";
import { fetchProductById } from "../api/product";
import { useRoute } from "@react-navigation/native";

export default function ProductDetails() {
  const route = useRoute();
  const { id } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("M"); // Default size
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const loadProductDetails = async () => {
      try {
        const data = await fetchProductById(id);
        setProduct(data.product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProductDetails();
  }, [id]);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: `http://localhost/coffee-shop/public/images/products/${product.image}`,
        }}
        style={styles.mainImage}
        resizeMode="cover"
      />
      <View style={styles.header}>
        <Text style={styles.productName}>{product.name}</Text>
      </View>
      <View>
  <Text style={styles.productPrice}>
    Giá: {product.price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
  </Text>
</View>


      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.productDescription}>{product.description}</Text>
        
        {/* Size Selection */}
        <View style={styles.sizeContainer}>
          <Text style={styles.sizeLabel}>Size:</Text>
          <Picker
            selectedValue={selectedSize}
            style={styles.picker}
            onValueChange={(itemValue) => setSelectedSize(itemValue)}
          >
            <Picker.Item label="Nhỏ" value="Nhỏ" />
            <Picker.Item label="Vừa" value="Vừa" />
            <Picker.Item label="Lớn" value="Lớn" />
          </Picker>
        </View>

        {/* Quantity Selection */}
        <View style={styles.quantityContainer}>
          <Text style={styles.quantityLabel}>Số lượng:</Text>
          <View style={styles.quantityControl}>
            <TouchableOpacity onPress={() => setQuantity(quantity > 1 ? quantity - 1 : 1)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity onPress={() => setQuantity(quantity + 1)} style={styles.quantityButton}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Thêm vào giỏ hàng</Text>
        </TouchableOpacity>

        {/* Additional Details */}
        {/* <View style={styles.additionalDetails}>
          <Text style={styles.detailsHeader}>Additional Product Details:</Text>
          <Text style={styles.detailsText}>{product.detail}</Text>
        </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#ffeef8", },
  mainImage: {
    width: "100%",
    height: 250,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    marginTop: 260,
  },
  productName: { fontSize: 24, fontWeight: "bold", color: "#333", marginBottom: 10 },
  productPrice: { fontSize: 18,fontWeight: "bold", color: "#333", marginBottom: 10 },
  productDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    marginTop: 10,
  },
  scrollContainer: { paddingTop: 10, paddingBottom: 80 },
  
  // Size selection
  sizeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  sizeLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  picker: {
    height: 40, // Smaller height for picker
    width: 100, // Reduced width for size selection
    marginLeft: 10,
  },

  // Quantity selection
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
  },
  quantityLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  quantityControl: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  quantityButton: {
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d5006d", // Cherry blossom pink
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
  },

  // Add to Cart button
  addToCartButton: {
    backgroundColor: "#d5006d", // Cherry blossom pink
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 20,
  },
  addToCartText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  additionalDetails: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  detailsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  detailsText: { fontSize: 14, color: "#666" },
});
