import { Link, useRouter } from "expo-router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Image, StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { View } from "react-native";
import { ActivityIndicator } from "react-native";
import { fetchProducts } from "./../api/product";

interface Product {
  id: number;
  name: string;
  category_id: string;
  description: string;
  image: string;
  price: number;
}

const Product = () => {
  const [products, setProducts] = useState<Product[]>([]); // Khởi tạo Products là mảng rỗng
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const products = await fetchProducts();
        console.log(products); // Kiểm tra phản hồi API
        if (products) {
          setProducts(products); // Kiểm tra xem data.Products có phải là mảng không
        } else {
          console.error("Products data is not an array");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#FF4081" />;
  }

  return (
    <>
      <Text style={styles.title}>Sản phẩm nổi bật</Text>

      <View style={styles.productsContainer}>
        {products.map((product) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "../product-details/[id]",
                params: { id: product.id },
              })
            }
            key={product.id}
            style={styles.productCard}
          >
            <Image
              source={{
                uri: `http://localhost/coffee-shop/public/images/products/${product.image}`,
              }}
              style={styles.productImage}
            ></Image>

            <Text style={styles.productName}>{product.name}</Text>
            <Text style={styles.productName}>
              {product.price.toLocaleString("vi-VN", {
                style: "currency",
                currency: "VND",
              })}
            </Text>

            
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
};

export default Product;

const styles = StyleSheet.create({
  productsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  productImage: {
    height: 120,
    width: 120,
    borderRadius: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 8,
    textAlign: "center",
  },
  addButton: {
    marginTop: 8,
    backgroundColor: "#FF4081",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: "center",
  },
});
