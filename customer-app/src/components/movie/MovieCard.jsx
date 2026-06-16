import { Image, Pressable, StyleSheet, Text, View } from "react-native";

const MovieCard = ({
  movie,
  rank,
  onPress,
}) => {
  return (
    <Pressable
      onPress={() => onPress(movie)}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.posterArea}>
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

        <View style={styles.rank}>
          <Text style={styles.rankText}>
            {rank}
          </Text>
        </View>
      </View>

      <Text
        style={styles.title}
        numberOfLines={1}
      >
        {movie.title}
      </Text>

      <Text style={styles.info}>
        {movie.runningTime}분 · 예매 가능
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 156,
    marginRight: 14,
  },

  pressed: {
    opacity: 0.8,
  },

  posterArea: {
    position: "relative",
  },

  poster: {
    width: "100%",
    aspectRatio: 2 / 3,
    borderRadius: 14,
    backgroundColor: "#e5e7eb",
  },

  emptyPoster: {
    width: "100%",
    aspectRatio: 2 / 3,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    backgroundColor: "#eef2ff",
  },

  emptyPosterText: {
    color: "#4f46e5",
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
  },

  rank: {
    position: "absolute",
    top: 10,
    left: 10,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
    backgroundColor: "rgba(15,23,42,0.8)",
  },

  rankText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "900",
  },

  title: {
    marginTop: 12,
    color: "#111827",
    fontSize: 15,
    fontWeight: "900",
  },

  info: {
    marginTop: 6,
    color: "#6b7280",
    fontSize: 12,
  },
});

export default MovieCard;