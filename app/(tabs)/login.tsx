// LoginScreen.js
import { Link } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { loginUser } from "./../api/auth"; // Import login function

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Success message
  const [error, setError] = useState(""); // Error message

  // Handle login
  const handleLogin = async () => {
    if (email && password) {
      try {
        const data = await loginUser(email, password); // Call login function
        setMessage(data.message); // Set success message
        setError(""); // Clear error message
      } catch {
        setMessage(""); // Clear success message on error
        setError("Đăng nhập không thành công!"); // Set error message
      }
    } else {
      setError("Vui lòng điền đầy đủ thông tin!"); // Error for missing fields
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        source={require("@/assets/images/profile.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Đăng Nhập</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </TouchableOpacity>

      {/* Display messages if any */}
      {message && <Text style={styles.message}>{message}</Text>}
      {error && <Text style={styles.errorMessage}>{error}</Text>}

      {/* Navigate to registration screen */}
      <TouchableOpacity style={styles.loginRedirect}>
        <Link href="./signup">
          <Text style={styles.loginText}>Bạn chưa có tài khoản? Đăng ký</Text>
        </Link>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#ffeef8", // Light cherry blossom pink
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 24,
    color: "#d5006d", // Cherry blossom pink
  },
  input: {
    height: 50,
    borderColor: "#f1a7b4", // Slightly darker pink
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
  },
  button: {
    height: 50,
    backgroundColor: "#d5006d", // Cherry blossom pink
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  message: {
    fontSize: 16,
    color: "green",
    textAlign: "center",
    marginBottom: 16,
  },
  errorMessage: {
    fontSize: 16,
    color: "red",
    textAlign: "center",
    marginBottom: 16,
  },
  loginRedirect: {
    alignItems: "center",
    marginTop: 20,
  },
  loginText: {
    color: "#d5006d", // Cherry blossom pink
    fontSize: 16,
    fontWeight: "500",
  },
});
