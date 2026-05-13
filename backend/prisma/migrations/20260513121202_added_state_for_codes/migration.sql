-- CreateEnum
CREATE TYPE "CodeState" AS ENUM ('NOT_EVEN_SEND', 'SENDING', 'SENDED');

-- AlterTable
ALTER TABLE "ConfirmEmailCode" ADD COLUMN     "codeState" "CodeState" NOT NULL DEFAULT 'NOT_EVEN_SEND';

-- AlterTable
ALTER TABLE "ResetCode" ADD COLUMN     "codeState" "CodeState" NOT NULL DEFAULT 'NOT_EVEN_SEND';
