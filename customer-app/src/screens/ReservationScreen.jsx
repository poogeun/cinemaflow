import ReservationCard from "../components/reservation/ReservationCard";
import { getMyReservations, cancelReservation } from "../api/reservation.api";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, FlatList, Pressable, StyleSheet, Text, Alert, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useEffect, useState } from "react";

const ReservationScreen = () => {
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      setIsLoading(true);

      const data = await getMyReservations();

      setReservations(data);
    } catch (error) {
      Alert.alert(
        "예약 조회 실패",
        error.response?.data?.message ??
          "예약 조회 내역을 불러오지 못했습니다."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const handleCancel = (reservation) => {
    Alert.alert(
      "예약 취소",
      "예약을 취소하시겠습니까?",
      [
        {
          text: "아니요",
          style: "cancel",
        },
        {
          text: "취소하기",
          style: "destructive",
          onPress: async () => {
            try {
              await cancelReservation(
                reservation.id
              );

              Alert.alert(
                "취소 완료",
                "예약이 취소되었습니다."
              );

              fetchReservations();
            } catch (error) {
              Alert.alert(
                "예약 취소 실패",
                error.response?.data?.message ??
                  "예약을 취소하지 못했습니다."
              );
            }
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
    );
  }  
  
  return (
    <SafeAreaView
      edges={["top"]}
      style={styles.safeArea}
    >
      <View style={styles.header}>
        <View >
          <Text style={styles.title}>
            내 예약
          </Text>

          <Text style={styles.description}>
            예매한 영화와 좌석 정보를 확인하세요.
          </Text>
        </View>
      </View>

      <FlatList
        data={reservations}
        keyExtractor={(item) =>
          String(item.id)
        }
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>
              예약 내역이 없습니다
            </Text>

            <Text style={styles.emptyDescription}>
              보고 싶은 영화를 예매해 보세요.
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <ReservationCard
            reservation={item}
            onCancel={handleCancel}
          />
        )} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f7f8fc",
  },

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingHorizontal: 22,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
  },

  title: {
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

  list: {
    padding: 22,
    paddingBottom: 120,
  },

  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ffffff",
  },

  list: {
    padding: 22,
    paddingBottom: 120,
  },

  emptyBox: {
    alignItems: "center",
    paddingVertical: 80,
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
  },  
});

export default ReservationScreen;