-- AlterTable
ALTER TABLE "depositos" ALTER COLUMN "valor" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "saques" ALTER COLUMN "valor" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "transferencias" ALTER COLUMN "valor" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "saldo" SET DEFAULT 0,
ALTER COLUMN "saldo" SET DATA TYPE DECIMAL(65,30);
