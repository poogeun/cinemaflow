import { router } from "expo-router";
import { useState } from "react";
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { login } from "../api/auth.api";
import * as SecureStore from "expo-secure-store";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert(
        "입력 확인",
        "이메일과 비밀번호를 입력해 주세요."
      );
      return;
    }

    try {
      setIsLoading(true);

      const data = await login({
        email,
        password,
      });

      await SecureStore.setItemAsync(
        "accessToken",
        data.accessToken
      );

      router.replace("/movies");
    } catch (error) {
      Alert.alert(
        "로그인 실패",
        error.response?.data?.message ??
          "잠시 후 다시 시도해 주세요."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = () => {
    router.push("/signup");
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={
        Platform.OS === "ios"
          ? "padding"
          : "height"
      }
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba",
          }}
          style={styles.hero}
          imageStyle={styles.heroImage}
        >
          <View style={styles.overlay} />

          <Text style={styles.brand}>
            CINEMAFLOW
          </Text>

          <View style={styles.heroContent}>
            <Text style={styles.heroTitle}>
              영화의 순간을{"\n"}더 가까이
            </Text>

            <Text style={styles.heroDescription}>
              보고 싶은 영화를 간편하게 예매하세요.
            </Text>
          </View>
        </ImageBackground>

        <View style={styles.content}>
          <Text style={styles.title}>
            다시 만나 반가워요
          </Text>

          <Text style={styles.description}>
            CinemaFlow 계정으로 로그인해 주세요.
          </Text>

          <Text style={styles.label}>
            이메일
          </Text>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="이메일을 입력하세요"
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />

          <Text style={styles.label}>
            비밀번호
          </Text>

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="비밀번호를 입력하세요"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            style={styles.input}
          />          

          <Pressable
            disabled={isLoading}
            onPress={handleLogin}
            style={({ pressed }) => [
              styles.loginButton,
              pressed &&
                !isLoading &&
                styles.pressedButton,
              isLoading &&
                styles.disabledButton,
            ]}
          >
            <Text style={styles.loginButtonText}>
              {isLoading ? "로그인 중..." : "로그인"}
            </Text>
          </Pressable>

          <View style={styles.signupArea}>
            <Text style={styles.signupDescription}>
              아직 계정이 없으신가요?
            </Text>

            <Pressable onPress={handleSignup}>
              <Text style={styles.signupButton}>
                회원가입
              </Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  container: {
    flexGrow: 1,
    backgroundColor: "#ffffff",
  },

  hero: {
    height: 310,
    paddingHorizontal: 28,
    paddingTop: 64,
    paddingBottom: 30,
  },

  heroImage: {
    resizeMode: "cover",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15,23,42,0.62)",
  },

  brand: {
    color: "#ffffff",
    fontSize: 17,
    fontWeight: "900",
    letterSpacing: 2,
  },

  heroContent: {
    position: "absolute",
    right: 28,
    bottom: 32,
    left: 28,
  },

  heroTitle: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "900",
    lineHeight: 39,
    letterSpacing: -1,
  },

  heroDescription: {
    marginTop: 10,
    color: "rgba(255,255,255,0.72)",
    fontSize: 14,
  },

  content: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 34,
    paddingBottom: 40, 
  },

  title: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "900",
    letterSpacing: -0.7,
  },

  description: {
    marginTop: 8,
    marginBottom: 28,
    color: "#6b7280",
    fontSize: 14,
  },

  label: {
    marginBottom: 8,
    color: "#111827",
    fontSize: 13,
    fontWeight: "800",
  },

  input: {
    height: 54,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#e1e5ed",
    borderRadius: 12,
    color: "#111827",
    fontSize: 15,
  },

  loginButton: {
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    borderRadius: 12,
    backgroundColor: "#4f46e5",
  },

  pressedButton: {
    backgroundColor: "#4338ca",
    opacity: 0.9,
  },

  loginButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
  },

  signupArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },

  signupDescription: {
    color: "#6b7280",
    fontSize: 13,
  },

  signupButton: {
    padding: 6,
    color: "#4f46e5",
    fontSize: 13,
    fontWeight: "900",
  },

  disabledButton: {
    opacity: 0.6,
  },
});

export default LoginScreen;