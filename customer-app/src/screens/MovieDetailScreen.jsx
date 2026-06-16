import { router, useLocalSearchParams } from "expo-router"
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getMovieById } from "../api/movie.api";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MovieDetailScreen = () => {
  const { id } = useLocalSearchParams();

  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMovie = async () => {
    try {
      setIsLoading(true);

      const data = await getMovieById(id);

      setMovie(data);
    } catch (error) {
      Alert.alert(
        "영화 조회 실패",
        error.response?.data?.message ??
          "영화 정보를 불러오지 못했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="#4f46e5"
        />
      </View>
    );
  }

  if (!movie) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>
            영화 정보를 찾을 수 없습니다
          </Text>

          <Pressable
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Text style={styles.backButtonText}>
              돌아가기
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={["top"]}
      style={styles.safeArea}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={styles.iconButton}
          >
            <Text style={styles.iconText}>
              ‹
            </Text>
          </Pressable>

          <Text style={styles.headerTitle}>
            영화 상세
          </Text>

          <View style={styles.iconButton} />
        </View>

        {movie.posterUrl ? (
          <Image
            source={{
              uri: movie.posterUrl,
            }}
            style={styles.poster}
          />
        ) : (
          <View style={styles.emptyPoster}>
            <Text style={styles.emptyPosterText}>
              CINEMAFLOW
            </Text>
          </View>
        )}

        <View style={styles.content}>
          <Text style={styles.title}>
            {movie.title}
          </Text>

          <Text style={styles.info}>
            {movie.runningTime}분
          </Text>

          <Text style={styles.description}>
            {movie.description ||
              "등록된 영화 소개가 없습니다."}
          </Text>

          <Pressable
            onPress={() =>
              router.push(`/movies/${id}/screenings`)
            }
            style={({ pressed }) => [
              styles.reserveButton,
              pressed && styles.pressedButton,
            ]}
          >
            <Text style={styles.reserveButtonText}>
              예매하기
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#ffffff",
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },

  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  emptyTitle: {
    color: "#111827",
    fontSize: 18,
    fontWeight: "900",
  },

  backButton: {
    marginTop: 20,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#eef2ff",
  },

  backButtonText: {
    color: "#4f46e5",
    fontWeight: "900",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 12,
  },

  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  iconText: {
    color: "#111827",
    fontSize: 34,
    lineHeight: 34,
  },

  headerTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "900",
  },

  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
    backgroundColor: "#e5e7eb",
  },

  emptyPoster: {
    width: "100%",
    aspectRatio: 2 / 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#eef2ff",
  },

  emptyPosterText: {
    color: "#4f46e5",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1,
  },

  content: {
    padding: 24,
  },

  title: {
    color: "#111827",
    fontSize: 26,
    fontWeight: "900",
    letterSpacing: -0.8,
  },

  info: {
    marginTop: 8,
    color: "#6b7280",
    fontSize: 14,
  },

  description: {
    marginTop: 24,
    color: "#374151",
    fontSize: 15,
    lineHeight: 24,
  },

  reserveButton: {
    height: 57,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 32,
    borderRadius: 14,
    backgroundColor: "#4f46e5",
  },

  pressedButton: {
    opacity: 0.85,
  },

  reserveButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
  },
});

export default MovieDetailScreen;