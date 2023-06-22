/*
  Warnings:

  - You are about to drop the column `post` on the `candidate` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `candidate` table. All the data in the column will be lost.
  - The primary key for the `student` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `rollNo` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `section` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `std` on the `student` table. All the data in the column will be lost.
  - You are about to drop the column `candidateId` on the `vote` table. All the data in the column will be lost.
  - You are about to drop the column `studentId` on the `vote` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[studentAdmissonNo]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[admissionNo]` on the table `Student` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `ministry` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentAdmissonNo` to the `Candidate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `admissionNo` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `candidateAdmissionNo` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voterAdmissonNo` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `candidate` DROP FOREIGN KEY `Candidate_studentId_fkey`;

-- DropForeignKey
ALTER TABLE `vote` DROP FOREIGN KEY `Vote_candidateId_fkey`;

-- DropForeignKey
ALTER TABLE `vote` DROP FOREIGN KEY `Vote_studentId_fkey`;

-- DropIndex
DROP INDEX `Candidate_post_idx` ON `candidate`;

-- DropIndex
DROP INDEX `Student_id_key` ON `student`;

-- DropIndex
DROP INDEX `Student_name_rollNo_section_key` ON `student`;

-- AlterTable
ALTER TABLE `candidate` DROP COLUMN `post`,
    DROP COLUMN `studentId`,
    ADD COLUMN `ministry` VARCHAR(191) NOT NULL,
    ADD COLUMN `studentAdmissonNo` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `student` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    DROP COLUMN `rollNo`,
    DROP COLUMN `section`,
    DROP COLUMN `std`,
    ADD COLUMN `admissionNo` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`admissionNo`);

-- AlterTable
ALTER TABLE `vote` DROP COLUMN `candidateId`,
    DROP COLUMN `studentId`,
    ADD COLUMN `candidateAdmissionNo` VARCHAR(191) NOT NULL,
    ADD COLUMN `voterAdmissonNo` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Candidate_studentAdmissonNo_key` ON `Candidate`(`studentAdmissonNo`);

-- CreateIndex
CREATE INDEX `Candidate_ministry_idx` ON `Candidate`(`ministry`);

-- CreateIndex
CREATE UNIQUE INDEX `Student_admissionNo_key` ON `Student`(`admissionNo`);

-- CreateIndex
CREATE INDEX `Student_admissionNo_idx` ON `Student`(`admissionNo`);

-- AddForeignKey
ALTER TABLE `Candidate` ADD CONSTRAINT `Candidate_studentAdmissonNo_fkey` FOREIGN KEY (`studentAdmissonNo`) REFERENCES `Student`(`admissionNo`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_candidateAdmissionNo_fkey` FOREIGN KEY (`candidateAdmissionNo`) REFERENCES `Candidate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_voterAdmissonNo_fkey` FOREIGN KEY (`voterAdmissonNo`) REFERENCES `Student`(`admissionNo`) ON DELETE RESTRICT ON UPDATE CASCADE;
