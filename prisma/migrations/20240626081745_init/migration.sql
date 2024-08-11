-- CreateTable
CREATE TABLE "Notes" (
    "notes_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("notes_id")
);

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
