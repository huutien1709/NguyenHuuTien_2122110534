import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
} from "react-native";
import { fetchSearchProducts } from "../api/product";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

export default function Search() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    if (term) {
      setIsLoading(true);
      const results = await fetchSearchProducts(term);
      setFilteredData(results);
      setIsLoading(false);
    } else {
      setFilteredData([]);
    }
  };

  const resetSearch = () => {
    setSearchTerm("");
    setFilteredData([]);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/product-details/[id]",
          params: { id: item.id },
        })
      }
      key={item.id}
      style={styles.item}
    >
      <Image
        source={{
          uri: `http://localhost/coffee-shop/public/images/products/${item.image}`,
        }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.itemPrice}>$ {item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  useFocusEffect(
    React.useCallback(() => {
      resetSearch();
    }, [])
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tìm Kiếm!</Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tìm kiếm thức uống cho bạn. . ."
          placeholderTextColor="#ccc"
          value={searchTerm}
          onChangeText={handleSearch}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : (
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffeef8", // Light pink background color
  },
  title: {
    paddingBottom: 20,
    fontSize: 30,
    fontWeight: "bold",
    color: "#D5006D", // Dark pink color for the title
    textAlign: "center",
  },
  searchContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    padding: 15,
    borderRadius: 25,
    backgroundColor: "#FFFFFF", // White background for the input
    borderWidth: 1,
    borderColor: "#D5006D", // Dark pink border color
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  list: {
    paddingBottom: 20,
  },
  item: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#FFFFFF", // White background for items
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#C71585", // Medium violet-red color for item text
  },
  itemPrice: {
    fontSize: 18,
    color: "#D5006D", // Dark pink color for price
  },
});

