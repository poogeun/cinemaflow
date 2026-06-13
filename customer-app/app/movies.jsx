import { Pressable, StyleSheet, Text, View } from "react-native"
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const MoviesPage = () => {
  const handleLogout = async () => {
    await SecureStore.deleteItemAsync(
      "accessToken"
    );

    router.replace("/login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        영화 목록
      </Text>

      <Pressable
        onPress={handleLogout}
        style={({ pressed }) => [
          styles.logoutButton,
          pressed && styles.pressedButton,
        ]}
      >
        <Text style={styles.logoutButtonText}>
          로그아웃
        </Text>
      </Pressable>
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

  title: {
    fontSize: 24,
    fontWeight: "900",
  },

  logoutButton: {
    width: "100%",
    height: 52,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    borderRadius: 12,
    backgroundColor: "#fef2f2",
  },

  pressedButton: {
    opacity: 0.7,
  },

  logoutButtonText: {
    color: "#dc2626",
    fontSize: 15,
    fontWeight: "900",
  },
});

export default MoviesPage;