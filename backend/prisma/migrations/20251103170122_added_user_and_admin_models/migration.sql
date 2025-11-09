/*
  Warnings:

  - You are about to drop the `Testttt` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- DropTable
DROP TABLE "public"."Testttt";

-- CreateTable
CREATE TABLE "User" (
    "Technical id" SERIAL NOT NULL,
    "Public uuid" TEXT NOT NULL,
    "Name" VARCHAR(30) NOT NULL,
    "Unique email" VARCHAR(60) NOT NULL,
    "Hashed Password" TEXT NOT NULL,
    "Role" "Role" NOT NULL DEFAULT 'USER',
    "User creation data & time" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("Technical id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "ID" INTEGER NOT NULL,
    "Permissions" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("ID")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_Public uuid_key" ON "User"("Public uuid");

-- CreateIndex
CREATE UNIQUE INDEX "User_Unique email_key" ON "User"("Unique email");

-- AddForeignKey
ALTER TABLE "Admin" ADD CONSTRAINT "Admin_ID_fkey" FOREIGN KEY ("ID") REFERENCES "User"("Technical id") ON DELETE RESTRICT ON UPDATE CASCADE;
