import { createBrowserRouter } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout.jsx";
import DashboardPage from "../pages/DashboardPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import MoviePage from "../pages/MoviePage.jsx";
import TheaterPage from "../pages/TheaterPage.jsx";
import ScreeningPage from "../pages/ScreeningPage.jsx";
import ReservationPage from "../pages/ReservationPage.jsx";
import ProtectedRoute from "../components/common/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <DashboardPage /> },
      { path: "movies", element: <MoviePage /> },
      { path: "theaters", element: <TheaterPage /> },
      { path: "screenings", element: <ScreeningPage /> },
      { path: "reservations", element: <ReservationPage /> },
    ],
  },
]);

export default router;