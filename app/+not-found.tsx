// +not-found.tsx
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Dimensions,
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

// Get screen dimensions
const { width, height } = Dimensions.get("window");

const NotFoundScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fffefb" />
      <Text style={styles.bg404}>404</Text>
      <Image
        source={require("../assets/images/404.png")}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.subtitle}>Sorry, this page isn’t available.</Text>
      <Pressable
        style={({ pressed }) => [styles.button, pressed && { opacity: 0.85 }]}
        onPress={() => navigation.navigate("Dashboard" as never)}
        android_ripple={{ color: "#1565c0" }}
      >
        <Text style={styles.buttonText}>Go to Dashboard</Text>
      </Pressable>
    </View>
  );
};

export default NotFoundScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffefb",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: width * 0.06,
    paddingTop: Platform.OS === "android" ? 20 : 40,
    paddingBottom: Platform.OS === "android" ? 20 : 40,
  },
  bg404: {
    fontSize: width * 0.13,
    fontWeight: "500", // medium font weight for text
    color: "#FF3C38",
    marginBottom: 8,
    textAlign: "center",
    letterSpacing: 2,
  },
  image: {
    width: width * 0.65, // large width for image
    height: height * 0.25, // large height for image
    marginBottom: 16,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#FF3C38", // emphasize image with border
    backgroundColor: "#fff",
    alignSelf: "center",
  },
  subtitle: {
    fontSize: width * 0.042,
    textAlign: "center",
    color: "#555",
    marginBottom: 18,
    lineHeight: 20,
    fontWeight: "500", // medium font weight for text
    maxWidth: width * 0.85,
  },
  button: {
    backgroundColor: "#1C73E8",
    paddingHorizontal: width * 0.13,
    paddingVertical: width * 0.038,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 2,
    elevation: 2,
    minWidth: width * 0.5,
  },
  buttonText: {
    color: "#fff",
    fontSize: width * 0.045,
    fontWeight: "500", // medium font weight for text
    letterSpacing: 0.5,
  },
});
