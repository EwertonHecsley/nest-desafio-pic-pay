/*
  Warnings:

  - You are about to drop the column `cpf` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `usersLogistas` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[cpf_cnpj]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `cpf_cnpj` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "users_cpf_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "cpf",
ADD COLUMN     "cpf_cnpj" TEXT NOT NULL,
ADD COLUMN     "logista" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "usersLogistas";

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_cnpj_key" ON "users"("cpf_cnpj");
