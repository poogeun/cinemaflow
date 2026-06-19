import { router, useLocalSearchParams } from "expo-router"
import { ActivityIndicator, Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { getScreeningsByMovieId } from "../api/screening.api";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { formatDate, formatDateTime, formatTime, formatShortDate, getDateKey, getWeekLabel } from "../utils/date";

const ScreeningSelectScreen = () => {
  const { id } = useLocalSearchParams();

  const [movie, setMovie] = useState(null);
  const [screenings, setScreenings] = useState([]);
  const [dateItems, setDateItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchScreenings = async () => {
    try {
      setIsLoading(true);

      const data = await getScreeningsByMovieId(id);
      setScreenings(data);

      if (data.length > 0) {
        setMovie(data[0].movie);

        const nextDateItems =
          createDateItems(data);

        setDateItems(nextDateItems);

        setSelectedDate(
          nextDateItems[0]?.dateKey ?? ""
        );
      }
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

  // 날짜 목록
  const createDateItems = (items) => {
    const nextDateItems = [];

    items.forEach((screening) => {
      const dateKey = getDateKey(
        screening.startTime
      );

      const exists = nextDateItems.some(
        (item) => item.dateKey === dateKey
      );

      if (!exists) {
        nextDateItems.push({
          dateKey,
          date: new Date(
            screening.startTime
          ),
        });
      }
    });

    return nextDateItems;
  };

  const handleSelectDate = (dateKey) => {
    setSelectedDate(dateKey);
  };

  const handleSelectScreening = (
    screening
  ) => {
    router.push(
      `/screenings/${screening.id}/seats`
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
    ); 
  }

  // 선택한 날짜 상영 목록
  const selectedScreenings = [];

  screenings.forEach((screening) => {
    const dateKey = getDateKey(
      screening.startTime
    );

    if (dateKey === selectedDate) {
      selectedScreenings.push(screening);
    }
  });

  // 상영관별 상영 그룹
  const theaterGroups = [];

  selectedScreenings.forEach((screening) => {
    const theaterId = screening.theater?.id;

    let group = theaterGroups.find(
      (item) => item.theaterId === theaterId
    );

    if (!group) {
      group = {
        theaterId,
        theaterName:
          screening.theater?.name ?? "상영관",
        totalSeats:
          screening.theater?.seats?.length ?? 0,
        screenings: [],
      };

      theaterGroups.push(group);
    }

    group.screenings.push(screening);
  });


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
        data={theaterGroups}
        keyExtractor={(item) =>
          String(item.theaterId)
        }
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <>
            <View style={styles.movieSummary}>
              <Text style={styles.movieTitle}>
                {movie?.title ?? "영화"}
              </Text>

              <Text style={styles.movieMeta}>
                {movie?.runningTime ?? "-"}분 · 예매 가능
              </Text>
            </View>

            <View style={styles.dateSection}>
              <Text style={styles.sectionTitle}>
                날짜 선택
              </Text>

              <FlatList
                horizontal
                data={dateItems}
                keyExtractor={(item) =>
                  item.dateKey
                }
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.dateList}
                renderItem={({ item }) => {
                  const isSelected =
                    item.dateKey === selectedDate;

                  return (
                    <Pressable
                      onPress={() =>
                        handleSelectDate(
                          item.dateKey
                        )
                      }
                      style={[
                        styles.dateChip,
                        isSelected &&
                          styles.activeDateChip,
                      ]}
                    >
                      <Text
                        style={[
                          styles.dateWeek,
                          isSelected &&
                            styles.activeDateText,
                        ]}
                      >
                        {getWeekLabel(item.date)}
                      </Text>

                      <Text
                        style={[
                          styles.dateDay,
                          isSelected &&
                            styles.activeDateText,
                        ]}
                      >
                        {item.date.getDate()}
                      </Text>
                    </Pressable>
                  );
                }}
              />
            </View>

            <Text style={styles.notice}>
              관람할 시간을 선택해 주세요.
            </Text>
          </>
        }
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>
              상영 일정이 없습니다.
            </Text>

            <Text style={styles.emptyDescription}>
              선택한 날짜에 등록된 상영 일정이 없습니다.
            </Text>
          </View>          
        }
        renderItem={({ item }) => (
          <View style={styles.theaterCard}>
            <View style={styles.theaterHeader}>
              <Text style={styles.theaterName}>
                {item.theaterName}
              </Text>

              <Text style={styles.seatInfo}>
                {item.totalSeats}석
              </Text>
            </View>

            <View style={styles.timeGrid}>
              {item.screenings.map((screening) => (
                <Pressable
                  key={screening.id}
                  onPress={() =>
                    handleSelectScreening(
                      screening
                    )
                  }
                  style={({ pressed }) => [
                    styles.timeButton,
                    pressed &&
                      styles.pressedTimeButton,
                  ]}
                >
                  <Text style={styles.startTime}>
                    {formatTime(
                      screening.startTime
                    )}
                  </Text>

                  <Text style={styles.endTime}>
                    종료{" "}
                    {formatTime(
                      screening.endTime
                    )}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
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

  movieSummary: {
    paddingHorizontal: 22,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#f1f2f6",
    backgroundColor: "#ffffff",
  },

  movieTitle: {
    color: "#111827",
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: -0.8,
  },

  movieMeta: {
    marginTop: 8,
    color: "#6b7280",
    fontSize: 13,
  },

  dateSection: {
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 22,
    borderTopWidth: 10,
    borderTopColor: "#f7f8fc",
    backgroundColor: "#ffffff",
  },

  sectionTitle: {
    marginBottom: 14,
    color: "#111827",
    fontSize: 16,
    fontWeight: "900",
  },

  dateList: {
    paddingRight: 22,
    gap: 10,
  },

  dateChip: {
    width: 66,
    alignItems: "center",
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 18,
    backgroundColor: "#ffffff",
  },

  activeDateChip: {
    borderColor: "#4f46e5",
    backgroundColor: "#4f46e5",
  },

  dateWeek: {
    color: "#6b7280",
    fontSize: 12,
    fontWeight: "800",
  },

  dateDay: {
    marginTop: 6,
    color: "#111827",
    fontSize: 20,
    fontWeight: "900",
  },

  activeDateText: {
    color: "#ffffff",
  },

  notice: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 18,
    color: "#6b7280",
    fontSize: 13,
  },

  theaterCard: {
    marginHorizontal: 22,
    marginBottom: 16,
    padding: 18,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    shadowColor: "#0f172a",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.04,
    shadowRadius: 24,
    elevation: 2,
  },

  theaterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  theaterName: {
    color: "#111827",
    fontSize: 16,
    fontWeight: "900",
  },

  seatInfo: {
    color: "#6b7280",
    fontSize: 12,
    fontWeight: "700",
  },

  timeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  timeButton: {
    minWidth: 82,
    paddingHorizontal: 13,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#dfe3ed",
    borderRadius: 14,
    backgroundColor: "#ffffff",
  },

  pressedTimeButton: {
    borderColor: "#4f46e5",
    backgroundColor: "#eef2ff",
  },

  startTime: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "900",
  },

  endTime: {
    marginTop: 5,
    color: "#6b7280",
    fontSize: 11,
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