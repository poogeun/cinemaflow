import { useEffect, useState } from "react";
import { getMe } from "../api/auth.api";
import { ActivityIndicator, Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import * as SecureStore from "expo-secure-store";

const ProfileScreen = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMe = async () => {
    try {
      setIsLoading(true);

      const data = await getMe();

      setUser(data);
    } catch (error) {
      Alert.alert(
        "사용자 조회 실패",
        error.response?.data?.message ??
          "사용자 정보를 불러오지 못했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "로그아웃",
      "로그아웃하시겠습니까?",
      [
        {
          text: "취소",
          style: "cancel",
        },
        {
          text: "로그아웃",
          style: "destructive",
          onPress: async () => {
            await SecureStore.deleteItemAsync(
              "accessToken"
            );

            router.replace("/login");
          },
        },
      ]
    );
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#4f46e5"
        />
      </View>      
    )
  }

  const initial = user?.name?.charAt(0) ?? "C";

  return (
    <SafeAreaView
      edges={["top"]}
      style={styles.safeArea}
    >
      <View style={styles.header}>
        <Text style={styles.pageTitle}>
          내 정보
        </Text>

        <Text style={styles.description}>
          계정 정보와 앱 설정을 확인하세요.
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {initial}
            </Text>
          </View>

          <Text style={styles.name}>
            {user?.name ?? "고객"}
          </Text>

          <Text style={styles.email}>
            {user?.email ?? ""}
          </Text>

          <View style={styles.roleBadge}>
            <Text style={styles.roleText}>
              {user?.role ?? "CUSTOMER"}
            </Text>
          </View>
        </View>

        <View style={styles.menuCard}>
          <Pressable
            style={styles.menuItem}
            onPress={() =>
              router.push("/reservations")
            }
          >
            <Text style={styles.menuText}>
              내 예약 관리
            </Text>

            <Text style={styles.arrow}>
              ›
            </Text>
          </Pressable>

          <Pressable style={styles.menuItem}>
            <Text style={styles.menuText}>
              계정 정보
            </Text>

            <Text style={styles.arrow}>
              ›
            </Text>            
          </Pressable>
        </View>

        <Pressable
          onPress={handleLogout}
          style={({ pressed }) => [
            styles.logoutButton,
            pressed &&
              styles.pressedButton,
          ]}
        >
          <Text style={styles.logoutText}>
            로그아웃
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f8fc",
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },
  
  header: {
    paddingHorizontal: 22,
    paddingVertical: 24,
    backgroundColor: "#ffffff",
  },

  pageTitle: {
    color: "#111827",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: -0.8,
  },

  description: {
    marginTop: 9,
    color: "#6b7280",
    fontSize: 14,
  },

  content: {
    padding: 22,
    paddingBottom: 120,
  },

  profileCard: {
    alignItems: "center",
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#ffffff",
  },

  avatar: {
    width: 72,
    height: 72,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderRadius: 36,
    backgroundColor: "#4f46e5",
  },

  avatarText: {
    color: "#ffffff",
    fontSize: 28,
    fontWeight: "900",
  },

  name: {
    color: "#111827",
    fontSize: 22,
    fontwei: "900",
    letterSpacing: -0.6,
  },

  email: {
    marginTop: 7,
    color: "#6b7280",
    fontSize: 14,
  },

  roleBadge: {
    marginTop: 14,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    backgroundColor: "#eef2ff",
  },

  roleText: {
    color: "#4f46e5",
    fontsi: 12,
    fontWeight: "900",
  },

  menuCard: {
    marginTop: 18,
    overflow: "hidden",
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },

  menuItem: {
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f2f6",
  },

  menuText: {
    colo: "#111827",
    fontSize: 15,
    fontWeight: "800",
  },

  arrow: {
    color: "#9ca3af",
    fontSize: 22,
  },

  logoutButton: {
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 18,
    borderRadius: 16,
    backgroundColor: "#fef2f2",
  },

  pressedButton: {
    opacity: 0.75,
  },

  logoutText: {
    color: "#dc2626",
    fontSize: 15,
    fontWeight: "900",
  },
});

export default ProfileScreen;