import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, TextInput } from 'react-native';
import { ThemedText } from "@/components/ThemedText";

type CartItem = {
  id: number;
  name: string;
  image: any;
  price: number;
  quantity: number; // New property for quantity
};

type Product = {
  id: number;
  name: string;
  image: any;
  price: number;
};

const products: Product[] = [
  { id: 1, name: 'Bơ Sữa Phô Mai', image: require('@/assets/images/bosua.jpg'), price: 3.00 },
  { id: 2, name: 'Dâu Phô Mai Tươi', image: require('@/assets/images/dau.jpg'), price: 3.00 },
  { id: 3, name: 'Cà Phê Sữa Đá', image: require('@/assets/images/caphesua.webp'), price: 2.00 },
  { id: 4, name: 'Bơ Arabica', image: require('@/assets/images/boarabica.webp'), price: 2.50 },
];

const CartScreen: React.FC<{ route: any }> = ({ route }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(route?.params?.cartItems || []);

  const calculateTotal = (): string => {
    return cartItems.reduce((total: number, item: CartItem) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const addToCart = (product: Product) => {
    const existingItemIndex = cartItems.findIndex(item => item.id === product.id);
    if (existingItemIndex > -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingItemIndex].quantity += 1; // Increase quantity if already in cart
      setCartItems(updatedItems);
    } else {
      setCartItems(prevItems => [...prevItems, { ...product, quantity: 1 }]); // Add new item with quantity 1
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      const updatedItems = cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      );
      setCartItems(updatedItems);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ThemedText type="title" style={styles.title}>Giỏ hàng</ThemedText>
      {cartItems.length === 0 ? (
        <ThemedText type="default" style={styles.emptyCartText}>Giỏ hàng của bạn hiện đang trống.</ThemedText>
      ) : (
        <>
          {cartItems.map((item: CartItem) => (
            <View key={item.id} style={styles.itemContainer}>
              <Image source={item.image} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <ThemedText type="title" style={styles.smallProductName}>{item.name}</ThemedText> {/* Updated style applied here */}
                <ThemedText type="default" style={styles.priceText}>${item.price.toFixed(2)}</ThemedText>
                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity - 1)} style={styles.quantityButton}>
                    <ThemedText type="default">-</ThemedText>
                  </TouchableOpacity>
                  <TextInput
                    style={styles.quantityInput}
                    value={String(item.quantity)}
                    keyboardType="numeric"
                    onChangeText={(text) => updateQuantity(item.id, Number(text))}
                  />
                  <TouchableOpacity onPress={() => updateQuantity(item.id, item.quantity + 1)} style={styles.quantityButton}>
                    <ThemedText type="default">+</ThemedText>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style={styles.removeButton} onPress={() => removeFromCart(item.id)}>
                <ThemedText type="default">Xóa</ThemedText>
              </TouchableOpacity>
            </View>
          ))}
          <View style={styles.totalContainer}>
            <ThemedText type="title">Tổng: ${calculateTotal()}</ThemedText>
          </View>
          <TouchableOpacity style={styles.checkoutButton}>
            <ThemedText type="default" style={styles.checkoutText}>Xử lý thanh toán</ThemedText>
          </TouchableOpacity>
        </>
      )}

      <ThemedText type="title" style={styles.title}>Tất cả sản phẩm</ThemedText>
      {products.map((product) => (
        <View key={product.id} style={styles.productContainer}>
          <Image source={product.image} style={styles.productImage} />
          <View style={styles.productDetails}>
            <ThemedText type="title" style={styles.smallProductName}>{product.name}</ThemedText>
            <ThemedText type="default" style={styles.priceText}>${product.price.toFixed(2)}</ThemedText>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={() => addToCart(product)}>
            <ThemedText type="default">Thêm vào giỏ hàng</ThemedText>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  emptyCartText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    color: '#888888',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  removeButton: {
    backgroundColor: '#FF4081',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
  },
  totalContainer: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  checkoutButton: {
    marginTop: 20,
    backgroundColor: '#FF4081',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  smallProductName: {
    fontSize: 15, 
    fontWeight: '500',
  },
  addButton: {
    backgroundColor: '#FF4081',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
  },
  priceText: {
    color: '#000000', 
    fontWeight: '500',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: '#FF4081',
    borderRadius: 5,
    padding: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 40,
    textAlign: 'center',
  },
});

export default CartScreen;
