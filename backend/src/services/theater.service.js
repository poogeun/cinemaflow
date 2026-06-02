import prisma from "../lib/prisma.js";
import AppError from "../errors/app.error.js";

export const createTheater = async ({
  name,
  seatRow,
  seatColumn,
}) => {
  if (!name) {
    throw new AppError(
      "상영관 이름은 필수입니다.",
      400
    );
  }
  if (seatRow <= 0) {
    throw new AppError(
      "좌석 행은 0보다 커야 합니다.",
      400
    );
  }
  if (seatColumn <= 0) {
    throw new AppError(
      "좌석 열은 0보다 커야 합니다.",
      400
    );
  }

  return await prisma.$transaction(
    async (tx) => {
      
      const theater =
        await tx.theater.create({
          data: {
            name,
            seatRow,
            seatColumn,
          },
        });

      const seats = [];

      for (
        let row = 0;
        row < seatRow;
        row++
      ) {
        const rowLabel =
          String.fromCharCode(
            65 + row
          );
        
        for (
          let col = 1;
          col <= seatColumn;
          col++
        ) {
          seats.push({
            theaterId: theater.id,
            rowLabel,
            seatNumber: col,
          });
        }
      }

      await tx.seat.createMany({
        data: seats,
      });

      return theater;
    }
  );
};

export const getTheaters = async () => {
  return await prisma.theater.findMany({
    orderBy: {
      id: "desc",
    },
  });
};

export const getTheaterById = async (id) => {
  const theater = await prisma.theater.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      seats: {
        orderBy: [
          { rowLabel: "asc" },
          { seatNumber: "asc" },
        ],
      },
    },
  });

  if (!theater) {
    throw new AppError("상영관을 찾을 수 없습니다.", 404);
  }

  return theater;
}