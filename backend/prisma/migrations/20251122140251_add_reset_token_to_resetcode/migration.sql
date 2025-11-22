/*
  Warnings:

  - A unique constraint covering the columns `[resetToken]` on the table `ResetCode` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ResetCode" ADD COLUMN     "resetToken" TEXT,
ADD COLUMN     "resetTokenExpiresAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "ResetCode_resetToken_key" ON "ResetCode"("resetToken");
