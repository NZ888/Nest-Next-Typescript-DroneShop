-- CreateTable
CREATE TABLE "ConfirmEmailCode" (
    "email" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "confirmToken" TEXT,
    "confirmTokenExpiresAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConfirmEmailCode_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "ConfirmEmailCode_confirmToken_key" ON "ConfirmEmailCode"("confirmToken");
