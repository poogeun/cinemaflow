import { useEffect, useState } from "react";
import { getMovies } from "../api/movie.api";
import MovieCard from "../components/movie/MovieCard";
import { ActivityIndicator, Alert, FlatList, Pressable, RefreshControl, StyleSheet, View } from "react-native";
import { Text } from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

const MovieScreen = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchMovies = async () => {
    try {
      setIsLoading(true);

      const data = await getMovies();

      setMovies(data);
    } catch (error) {
      Alert.alert(
        "영화 조회 실패",
        error.response?.data?.message ??
          "영화 목록을 불러오지 못했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleMoviePress = (movie) => {
    router.push(`/movies/${movie.id}`);
  };

  const handleRefresh = async () => {
    try {
      setIsRefreshing(true);

      const data = await getMovies();

      setMovies(data);
    } catch (error) {
      Alert.alert(
        "영화 조회 실패",
        error.response?.data?.message ??
          "영화 목록을 불러오지 못했습니다."
      );
    } finally {
      setIsRefreshing(false);
    }
  };

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

  return (
    <SafeAreaView
      style={styles.safeArea}
    >
      <FlatList
        data={movies}
        keyExtractor={(item) =>
          String(item.id)
        }
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={handleRefresh}
            tintColor="#4f46e5"
            colors={["#4f46e5"]}
          />
        }
        ListHeaderComponent={
          <>
            <View style={styles.header}>
              <View style={styles.top}>
                <Text style={styles.brand}>
                  CINEMAFLOW
                </Text>

                <Pressable
                  style={styles.profile}
                  onPress={() =>
                    router.push("/profile")
                  }
                >
                  <Text style={styles.profileText}>
                    Y
                  </Text>
                </Pressable>
              </View>

              <Text style={styles.welcome}>
                오늘은 어떤 영화를{"\n"}
                만나볼까요?
              </Text>

              <Text style={styles.subtitle}>
                현재 상영 중인 영화를 확인해 보세요.
              </Text>
            </View>

            <View style={styles.tabs}>
              <View
                style={[
                  styles.tab,
                  styles.activeTab,
                ]}
              >
                <Text style={styles.activeTabText}>
                  현재 상영작
                </Text>
              </View>

              <View style={styles.tab}>
                <Text style={styles.tabText}>
                  상영 예정작
                </Text>
              </View>             
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                영화 차트
              </Text>

              <Text style={styles.count}>
                총 {movies.length}편
              </Text>
            </View>

            {movies.length === 0 ? (
              <View style={styles.emptyBox}>
                <Text style={styles.emptyTitle}>
                  등록된 영화가 없습니다.
                </Text>
              </View>
            ) : (
              <FlatList
                data={movies}
                horizontal
                keyExtractor={(item) =>
                  `chart-${item.id}`
                }
                showsHorizontalScrollIndicator={
                  false
                }
                contentContainerStyle={
                  styles.movieList
                }
                renderItem={({
                  item,
                  index,
                }) => (
                  <MovieCard
                    movie={item}
                    rank={index + 1}
                    onPress={
                      handleMoviePress
                    }
                  />
                )}
              />
            )}
          </>
        }
        renderItem={null}
      />
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
    paddingTop: 30,
    paddingBottom: 18,
    backgroundColor: "#ffffff",
  },

  top: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  brand: {
    color: "#4f46e5",
    fontSize: 20,
    fontWeight: "900",
    letterSpacing: 1,
  },

  profile: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    backgroundColor: "#4f46e5",
  },

  profileText: {
    color: "#ffffff",
    fontWeight: "900",
  },

  welcome: {
    marginTop: 26,
    color: "#111827",
    fontSize: 25,
    fontWeight: "900",
    lineHeight: 34,
    letterSpacing: -0.8,
  },

  subtitle: {
    marginTop: 8,
    color: "#6b7280",
    fontSize: 14,
  },

  tabs: {
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 22,
    paddingVertical: 18,
    backgroundColor: "#ffffff",
  },

  tab: {
    paddingHorizontal: 15,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: "#f3f4f6",
  },

  activeTab: {
    backgroundColor: "#4f46e5",
  },

  tabText: {
    color: "#6b7280",
    fontWeight: "800",
  },

  activeTabText: {
    color: "#ffffff",
    fontWeight: "800",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 17,
  },

  sectionTitle: {
    color: "#111827",
    fontSize: 20,
    fontWeight: "900",
  },

  count: {
    color: "#6b7280",
    fontSize: 13,
  },

  movieList: {
    paddingLeft: 22,
    paddingRight: 8,
    paddingBottom: 110,
  },

  emptyBox: {
    marginHorizontal: 22,
    paddingVertical: 44,
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 18,
    backgroundColor: "#ffffff",
  },

  emptyTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "900",
  },
});

export default MovieScreen;