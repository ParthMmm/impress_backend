/*
  Warnings:

  - You are about to drop the `PostTags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PostTags" DROP CONSTRAINT "PostTags_postId_fkey";

-- AlterTable
ALTER TABLE "Film" ALTER COLUMN "name" SET DEFAULT E'NK_';

-- AlterTable
ALTER TABLE "Lube" ALTER COLUMN "name" SET DEFAULT E'Krytox';

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "filmId" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "lubeId" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "typeId" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "PostTags";

-- CreateTable
CREATE TABLE "Type" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL DEFAULT E'clicky',

    CONSTRAINT "Type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_filmId_fkey" FOREIGN KEY ("filmId") REFERENCES "Film"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_lubeId_fkey" FOREIGN KEY ("lubeId") REFERENCES "Lube"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
