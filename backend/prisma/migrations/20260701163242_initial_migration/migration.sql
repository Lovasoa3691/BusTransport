-- CreateTable
CREATE TABLE `User` (
    `id_user` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(50) NULL,
    `f_name` VARCHAR(20) NOT NULL,
    `l_name` VARCHAR(20) NOT NULL,
    `phone_number` VARCHAR(15) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(255) NULL,
    `status` VARCHAR(20) NOT NULL,
    `role` VARCHAR(20) NOT NULL,
    `id_driver` INTEGER NULL,
    `permit` VARCHAR(3) NULL,
    `age` INTEGER NULL,
    `experience` VARCHAR(20) NULL,
    `status_driver` VARCHAR(10) NULL,
    `discriminator` VARCHAR(50) NOT NULL,
    `photo` VARCHAR(50) NULL,

    PRIMARY KEY (`id_user`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Bus` (
    `id_bus` INTEGER NOT NULL AUTO_INCREMENT,
    `driver_id` INTEGER NULL,
    `registration` VARCHAR(12) NOT NULL,
    `capacity` INTEGER NOT NULL,
    `image` VARCHAR(255) NOT NULL,
    `status_bus` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`id_bus`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserControlledBus` (
    `id_control` INTEGER NOT NULL AUTO_INCREMENT,
    `admin_id` INTEGER NOT NULL,
    `bus_id` INTEGER NOT NULL,

    PRIMARY KEY (`id_control`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Line` (
    `id_line` INTEGER NOT NULL AUTO_INCREMENT,
    `bus_id` INTEGER NOT NULL,
    `line_name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `price` DOUBLE NOT NULL DEFAULT 1500.0,
    `route_path` JSON NOT NULL,

    PRIMARY KEY (`id_line`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Stop` (
    `id_stop` INTEGER NOT NULL AUTO_INCREMENT,
    `code_stop` VARCHAR(255) NOT NULL,
    `name_stop` VARCHAR(255) NOT NULL,
    `latitude` VARCHAR(255) NOT NULL,
    `longitude` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_stop`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LineStop` (
    `id_line_stop` INTEGER NOT NULL AUTO_INCREMENT,
    `line_id` INTEGER NOT NULL,
    `stop_id` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,

    UNIQUE INDEX `LineStop_line_id_order_key`(`line_id`, `order`),
    PRIMARY KEY (`id_line_stop`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TripRequest` (
    `id_req` INTEGER NOT NULL AUTO_INCREMENT,
    `stop_id` INTEGER NOT NULL,
    `line_id` INTEGER NOT NULL,
    `request_time` VARCHAR(255) NOT NULL,
    `latitude` VARCHAR(255) NOT NULL,
    `longitude` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_req`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ticket` (
    `id_ticket` INTEGER NOT NULL AUTO_INCREMENT,
    `num_ticket` VARCHAR(255) NOT NULL,
    `qr_code` VARCHAR(255) NOT NULL,
    `status_ticket` VARCHAR(255) NOT NULL DEFAULT 'Valide',
    `price` DOUBLE NOT NULL DEFAULT 0.0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `stop_id` INTEGER NOT NULL,
    `driver_id` INTEGER NULL,
    `bus_id` INTEGER NULL,

    UNIQUE INDEX `Ticket_qr_code_key`(`qr_code`),
    PRIMARY KEY (`id_ticket`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Income` (
    `id_in` INTEGER NOT NULL AUTO_INCREMENT,
    `ticket_id` INTEGER NOT NULL,
    `bus_id` INTEGER NOT NULL,
    `description` VARCHAR(50) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `date_in` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id_in`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bus` ADD CONSTRAINT `Bus_driver_id_fkey` FOREIGN KEY (`driver_id`) REFERENCES `User`(`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserControlledBus` ADD CONSTRAINT `UserControlledBus_admin_id_fkey` FOREIGN KEY (`admin_id`) REFERENCES `User`(`id_user`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `UserControlledBus` ADD CONSTRAINT `UserControlledBus_bus_id_fkey` FOREIGN KEY (`bus_id`) REFERENCES `Bus`(`id_bus`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Line` ADD CONSTRAINT `Line_bus_id_fkey` FOREIGN KEY (`bus_id`) REFERENCES `Bus`(`id_bus`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LineStop` ADD CONSTRAINT `LineStop_line_id_fkey` FOREIGN KEY (`line_id`) REFERENCES `Line`(`id_line`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `LineStop` ADD CONSTRAINT `LineStop_stop_id_fkey` FOREIGN KEY (`stop_id`) REFERENCES `Stop`(`id_stop`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TripRequest` ADD CONSTRAINT `TripRequest_stop_id_fkey` FOREIGN KEY (`stop_id`) REFERENCES `Stop`(`id_stop`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TripRequest` ADD CONSTRAINT `TripRequest_line_id_fkey` FOREIGN KEY (`line_id`) REFERENCES `Line`(`id_line`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_stop_id_fkey` FOREIGN KEY (`stop_id`) REFERENCES `Stop`(`id_stop`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_driver_id_fkey` FOREIGN KEY (`driver_id`) REFERENCES `User`(`id_user`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ticket` ADD CONSTRAINT `Ticket_bus_id_fkey` FOREIGN KEY (`bus_id`) REFERENCES `Bus`(`id_bus`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Income` ADD CONSTRAINT `Income_ticket_id_fkey` FOREIGN KEY (`ticket_id`) REFERENCES `Ticket`(`id_ticket`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Income` ADD CONSTRAINT `Income_bus_id_fkey` FOREIGN KEY (`bus_id`) REFERENCES `Bus`(`id_bus`) ON DELETE RESTRICT ON UPDATE CASCADE;
