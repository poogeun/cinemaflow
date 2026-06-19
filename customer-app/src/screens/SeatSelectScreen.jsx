import { router, useLocalSearchParams } from "expo-router"
import { ActivityIndicator, Alert, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { getScreeningById } from "../api/screening.api";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createReservation } from "../api/reservation.api";

const SeatSelectScreen = () => {
  const { id } = useLocalSearchParams();

  const [screening, setScreening] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);
  const [isReserving, setIsReserving] = useState(false);

  const fetchScreening = async () => {
    try {
      setIsLoading(true);

      const data = await getScreeningById(id);

      console.log("상영 상세", data);

      setScreening(data);
    } catch (error) {
      Alert.alert(
        "상영 정보 조회 실패",
        error.response?.data?.message ??
          "상영 정보를 불러오지 못했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchScreening();
  }, [id]);

  // 예약된 좌석 목록
  const reservedSeatIds = [];

  screening?.reservations?.forEach(
    (reservation) => {
      reservation.reservationSeats.forEach(
        (reservationSeat) => {
          reservedSeatIds.push(
            reservationSeat.seatId
          );
        }
      );
    }
  );

  // 좌석 선택
  const handleToggleSeat = (seat) => {
    const isReserved =
      reservedSeatIds.includes(seat.id);

    if (isReserved) {
      return;
    }

    const isSelected =
      selectedSeatIds.includes(seat.id);

    if (isSelected) {
      const nextSeatIds = [];

      selectedSeatIds.forEach((seatId) => {
        if (seatId !== seat.id) {
          nextSeatIds.push(seatId);
        }
      });

      setSelectedSeatIds(nextSeatIds);
      return;
    }

    setSelectedSeatIds([
      ...selectedSeatIds,
      seat.id,
    ]);
  };

  // 예매 버튼
  const handleReserve = async () => {
    if (selectedSeatIds === 0) {
      Alert.alert(
        "좌석 선택",
        "예매할 좌석을 선택해 주세요."
      );
      return;
    }

    try {
      setIsReserving(true);

      await createReservation({
        screeningId: id,
        seatIds: selectedSeatIds,
      });

      Alert.alert(
        "예매 완료",
        "예매가 완료되었습니다.",
        [
          {
            text: "확인",
            onPress: () =>
              router.replace("/reservations"),
          },
        ]
      );
    } catch (error) {
      Alert.alert(
        "예매 실패",
        error.response?.data?.message ??
          "예매를 완료하지 못했습니다."
      );
    } finally {
      setIsReserving(false);
    }
  };

  // 좌석 행별로 그룹화
  const seatRows = [];

  screening?.theater?.seats?.forEach((seat) => {
    let row = seatRows.find(
      (item) => item.rowLabel === seat.rowLabel
    );

    if (!row) {
      row = {
        rowLabel: seat.rowLabel,
        seats: [],
      };

      seatRows.push(row);
    }

    row.seats.push(seat);
  });

  // 좌석 맵 너비 계산
  let maxSeatCount = 0;

  seatRows.forEach((row) => {
    if (row.seats.length > maxSeatCount) {
      maxSeatCount = row.seats.length;
    }
  });

  const seatMapWidth =
    24 + maxSeatCount * 40;

  // 선택 좌석 목록
  const selectedSeats = [];

  screening?.theater?.seats?.forEach((seat) => {
    if (selectedSeatIds.includes(seat.id)) {
      selectedSeats.push(seat);
    }
  });

  // 선택 좌석 표시 문자열
  const selectedSeatLabel =
    selectedSeats.length === 0
      ? "선택한 좌석 없음"
      : selectedSeats.map(
        (seat) =>
          `${seat.rowLabel}${seat.seatNumber}`
      )
      .join(", ");

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
          좌석 선택
        </Text>

        <View style={styles.backButton} />
      </View>

        <View style={styles.container}>
          <Text style={styles.movieTitle}>
            {screening?.movie?.title}
          </Text>

          <Text style={styles.description}>
            {screening?.theater?.name} · 좌석{" "}
            {screening?.theater?.seats?.length ?? 0}개
          </Text>

          <View style={styles.screenBox}>
            <Text style={styles.screenText}>
              SCREEN
            </Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.seatScrollContent}
          >
            <View
              style={[
                styles.seatGrid,
                {
                  minWidth: seatMapWidth,
                },
              ]}
            >
              {seatRows.map((row) => (
                <View
                  key={row.rowLabel}
                  style={styles.seatRow}
                >
                  <Text style={styles.rowLabel}>
                    {row.rowLabel}
                  </Text>

                  <View style={styles.seats}>
                    {row.seats.map((seat) => {
                      const isReserved =
                        reservedSeatIds.includes(seat.id);

                      const isSelected =
                        selectedSeatIds.includes(seat.id);

                      return (
                        <Pressable
                          key={seat.id}
                          disabled={isReserved}
                          onPress={() =>
                            handleToggleSeat(seat)
                          }
                          style={[
                            styles.seat,
                            isReserved &&
                              styles.reservedSeat,
                            isSelected &&
                              styles.selectedSeat,
                          ]}
                        >
                          <Text
                            style={[
                              styles.seatText,
                              isReserved &&
                                styles.reservedSeatText,
                              isSelected &&
                                styles.selectedSeatText,
                            ]}
                          >
                            {seat.rowLabel}{seat.seatNumber}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

        <View style={styles.legend}>
          <View style={styles.legendItem}>
            <View style={styles.availableBox} />
            <Text style={styles.legendText}>가능</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={styles.selectedBox} />
            <Text style={styles.legendText}>선택</Text>
          </View>

          <View style={styles.legendItem}>
            <View style={styles.reservedBox} />
            <Text style={styles.legendText}>예매됨</Text>
          </View>
        </View>
      </View>

      <View style={styles.bottomBar}>
        <View style={styles.summary}>
          <Text style={styles.summaryLabel}>
            선택 좌석
          </Text>

          <Text
            style={styles.summaryValue}
            numberOfLines={1}
          >
            {selectedSeatLabel}
          </Text>
        </View>

        <Pressable
          onPress={handleReserve}
          disabled={
            selectedSeatIds.length === 0 ||
            isReserving
          }
          style={({ pressed }) => [
            styles.reserveButton,
            (selectedSeatIds.length === 0 ||
              isReserving) &&
              styles.disabledButton,
            pressed &&
              selectedSeatIds.length > 0 &&
              !isReserving &&
              styles.pressedButton,
          ]}
        >
          <Text style={styles.reserveButtonText}>
            {isReserving
              ? "예매 중..."
              : selectedSeatIds.length === 0
              ? "좌석을 선택해 주세요"
              : `${selectedSeatIds.length}석 예매하기`}
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

  movieTitle: {
    color: "#111827",
    fontSize: 24,
    fontWeight: "900",
  },

  description: {
    marginTop: 10,
    color: "#6b7280",
    fontSize: 15,
  },

  container: {
    flex: 1,
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 120,
    backgroundColor: "#f7f8fc",
  },

  screenBox: {
    width: "100%",
    marginTop: 30,
    marginBottom: 28,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#eef2ff",
  },

  screenText: {
    color: "#4f46e5",
    textAlign: "center",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
  },

  seatScrollContent: {
    paddingHorizontal: 4,
  },

  seatGrid: {
    gap: 12,
  },

  seatRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  rowLabel: {
    width: 24,
    color: "#6b7280",
    fontSize: 12,
    fontWeight: "900",
  },

  seats: {
    flexDirection: "row",
    gap: 8,
  },

  seat: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#dfe3ed",
  },

  selectedSeat: {
    borderColor: "#4f46e5",
    backgroundColor: "#4f46e5",
  },

  reservedSeat: {
    borderColor: "#e5e7eb",
    backgroundColor: "#e5e7eb",
  },

  seatText: {
    color: "#111827",
    fontSize: 12,
    fontWeight: "800",
  },

  selectedSeatText: {
    color: "#ffffff",
  },

  reservedSeatText: {
    color: "#9ca3af",
  },

  legend: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
    marginTop: 28,
  },

  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  availableBox: {
    width: 14,
    height: 14,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#dfe3ed",
    backgroundColor: "#ffffff",
  },

  selectedBox: {
    width: 14,
    height: 14,
    borderRadius: 4,
    backgroundColor: "#4f46e5",    
  },

  reservedBox: {
    width: 14,
    height: 14,
    borderRadius: 4,
    backgroundColor: "#e5e7eb",     
  },

  legendText: {
    color: "#6b7280",
    fontSize: 12,
    fontWeight: "700",
  },

  bottomBar: {
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: "#eceef3",
    backgroundColor: "#ffffff",
  },

  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  summaryLabel: {
    color: "#6b7280",
    fontSize: 13,
    fontWeight: "700",
  },

  summaryValue: {
    flex: 1,
    marginLeft: 12,
    color: "#111827",
    textAlign: "right",
    fontSize: 15,
    fontWeight: "900",
  },

  reserveButton: {
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#4f46e5",
  },

  disabledButton: {
    backgroundColor: "#c7d2fe",
  },

  pressedButton: {
    opacity: 0.85
  },

  reserveButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
  },
});

export default SeatSelectScreen;