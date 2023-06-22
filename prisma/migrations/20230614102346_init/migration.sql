-- CreateTable
CREATE TABLE `Student` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `rollNo` INTEGER NOT NULL,
    `section` VARCHAR(191) NOT NULL,
    `std` INTEGER NOT NULL,
    `house` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Student_id_key`(`id`),
    UNIQUE INDEX `Student_name_rollNo_section_key`(`name`, `rollNo`, `section`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Candidate` (
    `id` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `post` ENUM('PRIME_MINISTER', 'VICE_PRIME_MINISTER', 'EDUCATION', 'VICE_EDUCATION', 'HOUSE_CAPTIAN', 'VICE_HOUSE_CAPTAIN', 'SPORTS_MINISTER', 'VICE_SPORTS_MINISTER') NOT NULL,

    UNIQUE INDEX `Candidate_id_key`(`id`),
    UNIQUE INDEX `Candidate_studentId_key`(`studentId`),
    INDEX `Candidate_post_idx`(`post`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Vote` (
    `id` VARCHAR(191) NOT NULL,
    `candidateId` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Vote_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Candidate` ADD CONSTRAINT `Candidate_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_candidateId_fkey` FOREIGN KEY (`candidateId`) REFERENCES `Candidate`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Vote` ADD CONSTRAINT `Vote_studentId_fkey` FOREIGN KEY (`studentId`) REFERENCES `Student`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
