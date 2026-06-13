import { useEffect } from "react";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";
import { ActivityIndicator, StyleSheet, View } from "react-native";

const IndexPage = () => {
  useEffect(() => {
    const checkAuth = async () => {
      const accessToken =
        await SecureStore.getItemAsync(
          "accessToken"
        );

      if (accessToken) {
        router.replace("/movies");
        return;
      }

      router.replace("/login");
    }

    checkAuth();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="#4f46e5"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
});

export default IndexPage;