-- CreateTable
CREATE TABLE "saques" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "data" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "valor" INTEGER NOT NULL,

    CONSTRAINT "saques_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "saques" ADD CONSTRAINT "saques_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
