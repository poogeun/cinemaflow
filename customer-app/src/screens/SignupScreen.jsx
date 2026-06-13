import { router } from "expo-router";
import { useState } from "react";
import { Alert, ImageBackground, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { signup } from "../api/auth.api";

const SignupScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !passwordConfirm
    ) {
      Alert.alert(
        "입력 확인",
        "모든 항목을 입력해 주세요."
      );
      return;
    }

    if (password !== passwordConfirm) {
      Alert.alert(
        "입력 확인",
        "비밀번호가 일치하지 않습니다."
      );
      return;
    }

    try {
      setIsLoading(true);

      await signup({
        name,
        email,
        password,
      });

      Alert.alert(
        "회원가입 완료",
        "로그인 화면으로 이동합니다.",
        [
          {
            text: "확인",
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "회원가입 실패",
        error.response?.data?.message ??
          "잠시 후 다시 시도해 주세요."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    router.back();
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

          <Text style={styles.heroTitle}>
            나만의 영화 시간을 시작하세요
          </Text>
        </ImageBackground>

        <View style={styles.content}>
          <Text style={styles.title}>
            회원가입
          </Text>

          <Text style={styles.description}>
            예매에 사용할 회원 정보를 입력해 주세요.
          </Text>

          <Text style={styles.label}>이름</Text>

          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="이름을 입력하세요"
            placeholderTextColor="#9ca3af"
            style={styles.input}
          />

          <Text style={styles.label}>이메일</Text>

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

          <Text style={styles.label}>비밀번호</Text>

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="비밀번호를 입력하세요"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            style={styles.input}
          />

          <Text style={styles.label}>비밀번호 확인</Text>

          <TextInput
            value={passwordConfirm}
            onChangeText={setPasswordConfirm}
            placeholder="비밀번호를 다시 입력하세요"
            placeholderTextColor="#9ca3af"
            secureTextEntry
            style={styles.input}
          />                                 

          <Pressable
            disabled={isLoading}
            onPress={handleSignup}
            style={({ pressed }) => [
              styles.signupButton,
              pressed &&
                !isLoading &&
                styles.pressedButton,
              isLoading &&
                styles.disabledButton,
            ]}
          >
            <Text style={styles.signupButtonText}>
              {isLoading
                ? "가입 중..."
                : "회원가입"}
            </Text>
          </Pressable>

          <View style={styles.loginArea}>
            <Text style={styles.loginDescription}>
              이미 계정이 있으신가요?
            </Text>

            <Pressable onPress={handleLogin}>
              <Text style={styles.loginButton}>
                로그인
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
    height: 210,
    paddingHorizontal: 28,
    paddingTop: 56,
    paddingBottom: 28,
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
    position: "absolute",
    right: 28,
    bottom: 26,
    left: 28,
    color: "#ffffff",
    fontSize: 25,
    fontWeight: "900",
    letterSpacing: -0.7,
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

  signupButton: {
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

  signupButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
  },

  loginArea: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
  },

  loginDescription: {
    color: "#6b7280",
    fontSize: 13,
  },

  loginButton: {
    padding: 6,
    color: "#4f46e5",
    fontSize: 13,
    fontWeight: "900",
  },
  
  disabledButton: {
    opacity: 0.6,
  },
});

export default SignupScreen;