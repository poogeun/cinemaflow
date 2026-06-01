/*
  Warnings:

  - Added the required column `theaterId` to the `Screening` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Screening" ADD COLUMN     "theaterId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Theater" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "seatRow" INTEGER NOT NULL,
    "seatColumn" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Theater_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Screening" ADD CONSTRAINT "Screening_theaterId_fkey" FOREIGN KEY ("theaterId") REFERENCES "Theater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
