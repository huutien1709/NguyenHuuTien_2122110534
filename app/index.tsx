import { Redirect, router } from "expo-router";
import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const IntroScreen = ({}) => {
  return (
    <View style={styles.container}>
      {/* Hình ảnh đại diện */}
      <Image
        source={require("../assets/images/cappucino1.png")}
        style={styles.image}
      />

      {/* Tiêu đề */}
      <Text style={styles.title}>Chào mừng bạn đến với Ứng dụng của chúng tôi!
      </Text>

      {/* Mô tả ngắn */}
      <Text style={styles.description}>
      Đây là ứng dụng giúp bạn dễ dàng lựa chọn và mua các loại cà phê với thông tin chi tiết về hương vị, nguồn gốc...</Text>
      <TouchableOpacity
        onPress={() => router.push("/(tabs)/login")}
        style={{
          padding: 14,
          marginTop: 50,
          width: "100%",
          borderRadius: 10,
          backgroundColor: "#d5006d",
        }}
      >
        <Text
          style={{
            fontSize: 18,
            color: "#fff",
            textAlign: "center",
            fontWeight: "bold",
            letterSpacing: 0.5,
          }}
        >
          Bắt Đầu
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#ffeef8",
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
});

export default IntroScreen;
