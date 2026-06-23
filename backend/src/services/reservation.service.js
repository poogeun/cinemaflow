import prisma from "../lib/prisma.js";
import AppError from "../errors/app.error.js";

export const createReservation = async ({
  userId,
  screeningId,
  seatIds,
}) => {
  const screening = await prisma.screening.findUnique({
    where: {
      id: screeningId,
    },
  });

  if (!screening) {
    throw new AppError("상영 정보를 찾을 수 없습니다.", 404);
  }

  const now = new Date();

  if (screening.startTime <= now) {
    throw new AppError(
      "이미 시작된 상영은 예매할 수 없습니다.",
      400
    );
  }

  const seats = await prisma.seat.findMany({
    where: {
      id: {
        in: seatIds,
      },
    },
  });

  if (seats.length !== seatIds.length) {
    throw new AppError("존재하지 않는 좌석이 있습니다.", 400);
  }  

  const reservedSeats =
    await prisma.reservationSeat.findMany({
      where: {
        seatId: {
          in: seatIds,
        },
        reservation: {
          screeningId,
          status: "RESERVED",
        },
      },
    });

  if (reservedSeats.length > 0) {
    throw new AppError(
      "이미 예약된 좌석이 포함되어 있습니다.",
      409
    );
  }

  return await prisma.$transaction(async (tx) => {

    const reservation = await tx.reservation.create({
      data: {
        userId,
        screeningId,
      },
    });

    await tx.reservationSeat.createMany({
      data: seatIds.map((seatId) => ({
        reservationId: reservation.id,
        seatId,
      })),
    });

    return reservation;
  });
}

export const getMyReservations = async (
  userId
) => {
  return await prisma.reservation.findMany({
    where: {
      userId,
    },
    include: {
      screening: {
        include: {
          movie: true,
          theater: true,
        },
      },
      reservationSeats: {
        include: {
          seat: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const cancelReservation = async (
  reservationId,
  userId
) => {
  const reservation =
    await prisma.reservation.findUnique({
      where: {
        id: Number(reservationId),
      },
    });

  if (!reservation) {
    throw new AppError(
      "예약을 찾을 수 없습니다.",
      404
    );
  }

  if (reservation.userId !== userId) {
    throw new AppError(
      "본인 예약만 취소할 수 있습니다.",
      403
    );
  }

  if (reservation.status === "CANCELED") {
    throw new AppError(
      "이미 취소된 예약입니다.",
      400
    );
  }

  return await prisma.reservation.update({
    where: {
      id: reservation.id,
    },
    data: {
      status: "CANCELED",
    },
  });
};

export const getReservations = async () => {
  return await prisma.reservation.findMany({
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
      screening: {
        include: {
          movie: true,
          theater: true,
        },
      },
      reservationSeats: {
        include: {
          seat: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const cancelReservationByAdmin = async (reservationId) => {
  const reservation = await prisma.reservation.findUnique({
    where: {
      id: Number(reservationId)
    },
  });

  if (!reservation) {
    throw new AppError("예약을 찾을 수 없습니다.", 404);
  }

  if (reservation.status === "CANCELED") {
    throw new AppError("이미 취소된 예약입니다.", 400);
  }

  return await prisma.reservation.update({
    where: {
      id: reservation.id,
    },
    data: {
      status: "CANCELED",
    },
  });
};