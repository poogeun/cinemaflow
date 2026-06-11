import prisma from "../lib/prisma.js";

const getTodayRange = () => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date();
  end.setHours(23, 59, 59, 999);

  return {
    start,
    end,
  };
};

export const getDashboard = async () => {
  const { start, end } = getTodayRange();

  const todayScreenings =
    await prisma.screening.count({
      where: {
        startTime: {
          gte: start,
          lte: end,
        },
      },
    });

  const todayReservations =
    await prisma.reservation.count({
      where: {
        createdAt: {
          gte: start,
          lte: end,
        },
        status: "RESERVED",
      },
    });

  const todayCanceled =
    await prisma.reservation.count({
      where: {
        updatedAt: {
          gte: start,
          lte: end,
        },
        status: "CANCELED",
      },
    });

  const now = new Date();

  const nowScreenings =
    await prisma.screening.findMany({
      where: {
        startTime: {
          lte: now,
        },
        endTime: {
          gte: now,
        },
      },
      include: {
        movie: true,
        theater: {
          include: {
            seats: true,
          },
        },
        reservations: {
          where: {
            status: "RESERVED",
          },
          include: {
            reservationSeats: true,
          },
        },
      },
      orderBy: {
        startTime: "asc",
      },
    });

  const mappedNowScreenings = nowScreenings.map((screening) => {
    const totalSeats = screening.theater.seats.length;

    const reservedSeats = screening.reservations.reduce(
      (sum, reservation) =>
        sum + reservation.reservationSeats.length,
      0
    );

    return {
      id: screening.id,
      movieTitle: screening.movie.title,
      theaterName: screening.theater.name,
      startTime: screening.startTime,
      endTime: screening.endTime,
      reservedSeats,
      totalSeats,
      reservationRate: Math.round(
        (reservedSeats / totalSeats) * 100
      ),
    };
  });

  const nearSoldOut = mappedNowScreenings
    .filter((item) => item.reservationRate >= 60)
    .sort((a, b) => b.reservationRate - a.reservationRate)
    .slice(0, 5);

  return {
    summary: {
      todayScreenings,
      todayReservations,
      todayCanceled,
    },
    nowScreenings: mappedNowScreenings,
    nearSoldOut,
  };
};