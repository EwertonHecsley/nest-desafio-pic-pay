-- CreateTable
CREATE TABLE "depositos" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor" INTEGER NOT NULL,

    CONSTRAINT "depositos_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "depositos" ADD CONSTRAINT "depositos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
