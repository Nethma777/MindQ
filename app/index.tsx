import { Link, router } from "expo-router";
import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  SafeAreaView,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <Text style={styles.textMain}>MindQ</Text>
      </View>
      <Image
        style={styles.logo}
        source={require("../assets/images/MindQ.jpg")}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/signup")}
      >
        <Text style={styles.buttonText}>Embark on Your Adventure</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#f9f4f4",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  textMain: {
    fontSize: 40,
    color: "#000000",
    fontWeight: "bold",
  },
  logo: {
    height: 250,
    width: 250,
    margin: 20,
    borderRadius: 125, // Circular shape
    resizeMode: "cover",
    borderWidth: 4, // Border width
    borderColor: "rgba(0, 0, 139, 0.5)", // Transparent dark blue color
  },
  button: {
    marginTop: 25,
    backgroundColor: "#00008B", // Dark blue background
    paddingHorizontal: 30,
    borderRadius: 40,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
