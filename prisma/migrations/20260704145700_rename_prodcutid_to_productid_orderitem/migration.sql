/*
  Warnings:

  - You are about to drop the column `prodcutId` on the `order_items` table. All the data in the column will be lost.
  - Added the required column `productId` to the `order_items` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_prodcutId_fkey";

-- AlterTable
ALTER TABLE "order_items" DROP COLUMN "prodcutId",
ADD COLUMN     "productId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
