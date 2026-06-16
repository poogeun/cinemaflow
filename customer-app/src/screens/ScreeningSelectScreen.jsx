import { router, useLocalSearchParams } from "expo-router"
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { getScreeningsByMovieId } from "../api/screening.api";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreeningSelectScreen = () => {
  const { id } = useLocalSearchParams();

  const [screenings, setScreenings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchScreenings = async () => {
    try {
      setIsLoading(true);

      const data = await getScreeningsByMovieId(id);
      setScreenings(data);
    } catch (error) {
      Alert.alert(
        "상영 일정 조회 실패",
        error.response?.data?.message ??
          "상영 일정을 불러오지 못했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScreenings();
  }, [id]);

  const formatDate = (value) => {
    const date = new Date(value);

    return date.toLocaleDateString(
      "ko-KR",
      {
        month: "long",
        day: "numeric",
        weekday: "short",
      }
    );
  };

  const formatTime = (value) => {
    const date = new Date(value);

    return date.toLocaleTimeString(
      "ko-KR",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const handleSelectScreening = (
    screening
  ) => {
    console.log("선택한 상영 일정", screening);
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
      edges={["top"]}
      style={styles.safeArea}
    >
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Text style={styles.backText}>
            ‹
          </Text>
        </Pressable>

        <Text style={styles.headerTitle}>
          상영 일정 선택
        </Text>

        <View style={styles.backButton} />
      </View>

      <FlatList
        data={screenings}
        keyExtractor={(item) =>
          String(item.id)
        }
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>
              상영 일정이 없습니다
            </Text>

            <Text style={styles.emptyDescription}>
              이 영화의 상영 일정이 아직 등록되지 않았습니다.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              handleSelectScreening(item)
            }
            style={({ pressed }) => [
              styles.screeningCard,
              pressed && styles.pressedCard,
            ]}
          >
            <View>
              <Text style={styles.dateText}>
                {formatDate(item.startTime)}
              </Text>

              <Text style={styles.timeText}>
                {formatTime(item.startTime)} 시작
              </Text>
            </View>

            <View style={styles.theaterBadge}>
              <Text style={styles.theaterText}>
                {item.theater?.name ??
                  "상영관"}
              </Text>
            </View>
          </Pressable>
        )}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: "#ffffff",
  },

  backButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  backText: {
    color: "#111827",
    fontSize: 34,
    lineHeight: 34,
  },

  headerTitle: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "900",
  },

  list: {
    padding: 22,
  },

  screeningCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    padding: 18,
    borderRadius: 18,
    backgroundColor: "#ffffff",
  },

  pressedCard: {
    opacity: 0.8,
  },

  dateText: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "900",
  },

  timeText: {
    marginTop: 7,
    color: "#6b7280",
    fontSize: 13,
  },

  theaterBadge: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#eef2ff",
  },

  emptyBox: {
    alignItems: "center",
    paddingVertical: 60,
    paddingHorizontal: 20,
  },

  emptyTitle: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "900",
  },

  emptyDescription: {
    marginTop: 8,
    color: "#6b7280",
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },  
});

export default ScreeningSelectScreen;