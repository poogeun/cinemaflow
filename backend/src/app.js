import express from "express";
import cors from "cors";
import movieRoutes from "./routes/movie.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import screeningRoutes from "./routes/screening.routes.js";
import theaterRoutes from "./routes/theater.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";

const app = express();
const PORT = 3000;

app.use(cors({
  origin: "http://localhost:5173",
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CinemaFlow API Server");
});

app.use("/api/movies", movieRoutes);
app.use("/api/screenings", screeningRoutes);
app.use("/api/theaters", theaterRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`Server Running : ${PORT}`);
});