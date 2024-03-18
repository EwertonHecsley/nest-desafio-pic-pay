-- CreateTable
CREATE TABLE "transferencias" (
    "id" SERIAL NOT NULL,
    "user_id_origem" INTEGER NOT NULL,
    "user_id_destino" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor" INTEGER NOT NULL,

    CONSTRAINT "transferencias_pkey" PRIMARY KEY ("id")
);
