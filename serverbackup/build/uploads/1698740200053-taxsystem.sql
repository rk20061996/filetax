-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2023 at 08:57 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `taxsystem`
--

-- --------------------------------------------------------

--
-- Table structure for table `document_type`
--

CREATE TABLE `document_type` (
  `id` int(11) NOT NULL,
  `document_name` varchar(55) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `document_type`
--

INSERT INTO `document_type` (`id`, `document_name`) VALUES
(1, 'Client Tax Organizer Tax Year 2018'),
(2, 'Form W-2'),
(3, 'Form 1099-B'),
(4, 'Form 1099-Div'),
(5, 'Form 1099-G'),
(6, 'Form 1098-T'),
(7, 'Other Form-1098'),
(8, 'Other Form-1099'),
(9, 'Other Form/Schedules');

-- --------------------------------------------------------

--
-- Table structure for table `document_upload`
--

CREATE TABLE `document_upload` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `document_type_id` int(11) NOT NULL,
  `filename` varchar(55) NOT NULL,
  `created_at` date NOT NULL DEFAULT current_timestamp(),
  `is_deleted` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `document_upload`
--

INSERT INTO `document_upload` (`id`, `user_id`, `document_type_id`, `filename`, `created_at`, `is_deleted`) VALUES
(1, 13, 8, '1698695805077-users.sql', '2023-10-31', 1),
(2, 13, 8, '1698695934103-users.sql', '2023-10-31', 1),
(9, 13, 5, '1698696251454-users.sql', '2023-10-31', 1),
(10, 13, 3, '1698696324779-users.sql', '2023-10-31', 1),
(11, 13, 4, '1698696339856-users.sql', '2023-10-31', 1),
(12, 13, 4, '1698700078934-1698695934103-users.sql', '2023-10-31', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(50) DEFAULT NULL,
  `lastname` varchar(50) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(55) NOT NULL,
  `created_on` timestamp(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `phone`, `created_on`) VALUES
(1, 'Ravi', 'kant', 'rkant@enact.com', '$2a$10$k8ln0G/3my4mmMn7xV7JrOafqFdMNE5uuuisuSdeZ1TQlMQC6vPQq', '8789606077', '2023-10-29 18:00:59.000000'),
(2, 'Ravi', 'kant', 'rkantd@enact.com', '$2a$10$y9DDuet.9zbPkM7c4fTXKe6EpGSIMHqRgeidOKKJ8jX9FHHgXtM9e', '8789606077', '2023-10-29 19:43:23.000000'),
(3, 'ravi', 'kant', 'ravikkkk@gmail.com', '$2a$10$z9gDwepoTg1i0.qku9./v.OOC1VHNgAZ04vjyeHXbSw8/6JVXImbm', '8789806077', '2023-10-29 20:41:02.000000'),
(4, 'ravi', 'kant', 'ravikkkks@gmail.com', '$2a$10$Yidbg9NedKgTOuWs7D2qfOrRkucVC5bq2dK/JcVPT1sfHZeR01pXq', '8789806077', '2023-10-29 20:42:26.000000'),
(5, 'ravi', 'kant', 'ravikkkksd@gmail.com', '$2a$10$2Ylzlwq6jBQa2xsbqGXDkeSTtWTf0cbIvCZSXfrUtFhXYCOl1FC9G', '8789806077', '2023-10-29 20:43:37.000000'),
(6, 'ravi', 'kant', 'ravikkkkdsd@gmail.com', '$2a$10$pBAW8GA4TrSAR4HrdcZW3eookjs1WUMe.Say39ZmdaEwyC.6Ewzmy', '8789806077', '2023-10-29 20:44:27.000000'),
(7, 'ravi', 'kant', 'ravikkkdkdsd@gmail.com', '$2a$10$/7VgIRcYeUCc4POjmaNv8.SrwIkVfAHxRWo796ZprZD2ySlmhbH46', '8789806077', '2023-10-29 20:44:50.000000'),
(8, 'ravi', 'kant', 'ravikkdkdkdsd@gmail.com', '$2a$10$jA365x448qGFyGML3Ae1bedyeokAIs9e4khw/5kNLuD2FdzAjSxsu', '8789806077', '2023-10-29 20:45:43.000000'),
(9, 'ravi', 'kant', 'ravikkdkdkdfsd@gmail.com', '$2a$10$rmgVDFatr5f635AMJkThQeNQBWxsJi2kJZPnHCvEP3/kLEovQWEvK', '8789806077', '2023-10-29 20:46:03.000000'),
(10, 'ravi', 'kant', 'ravikkdkddkdfsd@gmail.com', '$2a$10$bVP2b2DI2ReC6/S5h//2U.7M8BT6ER.Fe//V0p1/4qx.Ugud6ew0C', '8789806077', '2023-10-29 20:46:56.000000'),
(11, 'ravi', 'kant', 'rkaaa@gmail.com', '$2a$10$Oh/6MDah.kp0F8ktdwCntuSwXKr3BZluV/cgtCNBoZxZ2/ym5imda', '8789806077', '2023-10-29 20:51:14.000000'),
(12, 'Ravi', 'kant', 'rkant1d@enact.com', '$2a$10$kV9H0mjjvUmRA2Mohf371OZAFaK67kqhOoh67ftez29u4zuAmzQVi', '8789606077', '2023-10-30 13:10:23.000000'),
(13, 'Ravi', 'kant', 'rkant1cd@enact.com', '$2a$10$gMNUC4cz73bfG9rscx8leexiDxzZ0HMbIt7wMakGOnv/1vCdEb02m', '8789606077', '2023-10-30 13:35:02.000000');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `document_type`
--
ALTER TABLE `document_type`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `document_upload`
--
ALTER TABLE `document_upload`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `document_type`
--
ALTER TABLE `document_type`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `document_upload`
--
ALTER TABLE `document_upload`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
