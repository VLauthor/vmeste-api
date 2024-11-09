-- CreateTable
CREATE TABLE "Reminders" (
    "reminders_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "Reminders_pkey" PRIMARY KEY ("reminders_id")
);

-- AddForeignKey
ALTER TABLE "Reminders" ADD CONSTRAINT "Reminders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
