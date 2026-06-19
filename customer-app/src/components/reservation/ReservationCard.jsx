import { ImageBackground, Pressable, StyleSheet, View, Text } from "react-native";
import { formatDate, formatTime } from "../../utils/date";

const ReservationCard = ({
  reservation,
  onCancel,
}) => {
  const screening = reservation.screening;
  const movie = screening.movie;
  const theater = screening.theater;

  const getSeatLabel = () => {
    const labels = [];

    reservation.reservationSeats.forEach(
      (reservaitonSeat) => {
        const seat = reservaitonSeat.seat;

        labels.push(
          `${seat.rowLabel}${seat.seatNumber}`
        );
      }
    );

    return labels.join(", ");
  };

  const isCanceled =
    reservation.status === "CANCELED";

  const posterUrl = movie.posterUrl;

  return (
    <ImageBackground
      source={
        posterUrl
          ? { uri: posterUrl }
          : undefined
      }
      style={styles.card}
      imageStyle={styles.cardImage}
    >
      <View style={styles.overlay} />

      <View style={styles.sideOverlay} />

      {!posterUrl && (
        <View style={styles.emptyPoster}>
          <Text style={styles.emptyPosterText}>
            CINEMAFLOW
          </Text>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.cardTop}>
          <Text
            style={styles.movieTitle}
            numberOfLines={1}
          >
            {movie.title}
          </Text>

          <Text
            style={[
              styles.badge,
              isCanceled &&
                styles.canceledBadge,
            ]}
          >
            {isCanceled
              ? "취소됨"
              : "예매완료"}
          </Text>
        </View>

        <View style={styles.cardBottom}>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>
              {theater.name}
            </Text>

            <View style={styles.dot} />

            <Text style={styles.infoText}>
              {formatDate(
                screening.startTime
              )}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoText}>
              {formatTime(
                screening.startTime
              )}{" "}
              시작
            </Text>

            <View style={styles.dot} />

            <Text style={styles.infoText}>
              {formatTime(
                screening.endTime
              )}{" "}
              종료
            </Text>
          </View>

          <View style={styles.seatBox}>
            <Text style={styles.seatLabel}>
              좌석
            </Text>

            <Text style={styles.seatValue}>
              {getSeatLabel()}
            </Text>
          </View>

          {!isCanceled && (
            <View style={styles.actions}>
              <Pressable
                style={styles.outlineButton}
              >
                <Text
                  style={
                    styles.outlineButtonText
                  }>
                  상세 보기
                </Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  onCancel(reservation)
                }
                style={styles.cancelButton}
              >
                <Text
                  style={
                    styles.cancelButtonText
                  }
                >
                  예약 취소
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  card: {
    minHeight: 250,
    marginBottom: 18,
    overflow: "hidden",
    borderRadius: 24,
    backgroundColor: "#111827",
  },

  cardImage: {
    borderRadius: 24,
    resizeMode: "cover",
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15,23,42,0.52)",
  },

  sideOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15,23,42,0.25)",
  },

  emptyPoster: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#111827",
  },

  emptyPosterText: {
    color: "#4f46e5",
    fontSize: 18,
    fontWeight: "900",
    letterSpacing: 1,
  },

  content: {
    minHeight: 250,
    justifyContent: "space-between",
    padding: 18,
  },

  cardTop: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },

  movieTitle: {
    flex: 1,
    color: "#ffffff",
    fontSize: 23,
    fontWeight: "900",
    lineHeight: 29,
    letterSpacing: -0.8,
  },

  badge: {
    overflow: "hidden",
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 999,
    color: "#ffffff",
    backgroundColor: "rgba(79,70,229,0.92)",
    fontSize: 12,
    fontWeight: "900",
  },

  canceledBadge: {
    color: "#fecaca",
    backgroundColor: "rgba(220,38,38,0.88)",
  },

  cardBottom: {
    marginTop: 70,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
  },

  infoText: {
    color: "rgba(255,255,255,0.82)",
    fontSize: 13,
    fontWeight: "700",
  },

  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.45)",
  },

  seatBox: {
    marginTop: 16,
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  seatLabel: {
    color: "rgba(255,255,255,0.68)",
    fontSize: 12,
    fontWeight: "800",
  },

  seatValue: {
    marginTop: 6,
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900",
  },

  actions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 16,
  },

  outlineButton: {
    flex: 1,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.28)",
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  outlineButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "900",
  },

  cancelButton: {
    flex: 1,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#fef2f2",
  },

  cancelButtonText: {
    color: "#dc2626",
    fontSize: 13,
    fontWeight: "900",
  },
});

export default ReservationCard;