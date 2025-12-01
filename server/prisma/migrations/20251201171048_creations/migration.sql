-- CreateTable
CREATE TABLE "Creations" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "prompt" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "publish" BOOLEAN NOT NULL DEFAULT false,
    "likes" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Creations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Creations" ADD CONSTRAINT "Creations_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
