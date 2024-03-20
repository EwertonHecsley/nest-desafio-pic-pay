/*
  Warnings:

  - You are about to alter the column `valor` on the `depositos` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `valor` on the `saques` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `valor` on the `transferencias` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.
  - You are about to alter the column `saldo` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Integer`.

*/
-- AlterTable
ALTER TABLE "depositos" ALTER COLUMN "valor" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "saques" ALTER COLUMN "valor" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "transferencias" ALTER COLUMN "valor" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "saldo" SET DEFAULT 0,
ALTER COLUMN "saldo" SET DATA TYPE INTEGER;
