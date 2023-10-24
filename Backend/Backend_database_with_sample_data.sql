-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2023 at 06:40 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `appointment_app`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_table`
--

CREATE TABLE `admin_table` (
  `admin_id` int(11) NOT NULL,
  `hospital_email` varchar(50) NOT NULL,
  `admin_name` varchar(200) NOT NULL,
  `hospital_name` varchar(200) NOT NULL,
  `hospital_address` mediumtext NOT NULL,
  `hospital_contact_no` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `admin_table`
--

INSERT INTO `admin_table` (`admin_id`, `hospital_email`, `admin_name`, `hospital_name`, `hospital_address`, `hospital_contact_no`, `user_id`) VALUES
(1, 'tembihan01@gmail.com', 'hanniel', 'waspital', 'buea', 56789, 33);

-- --------------------------------------------------------

--
-- Table structure for table `appointment_history`
--

CREATE TABLE `appointment_history` (
  `appointment_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `doctor_schedule_id` int(11) NOT NULL,
  `reason_for_appointment` mediumtext NOT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `status` enum('Pending','Confirmed','Canceled','Completed','Unconfirmed') NOT NULL,
  `doctor_comment` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `appointment_history`
--

INSERT INTO `appointment_history` (`appointment_id`, `doctor_id`, `patient_id`, `service_id`, `doctor_schedule_id`, `reason_for_appointment`, `appointment_date`, `appointment_time`, `status`, `doctor_comment`) VALUES
(168, 1, 25, 1, 40, 'cold', '2023-06-16', '09:00:00', 'Pending', ' ');

-- --------------------------------------------------------

--
-- Table structure for table `appointment_table`
--

CREATE TABLE `appointment_table` (
  `appointment_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `doctor_schedule_id` int(11) NOT NULL,
  `reason_for_appointment` mediumtext NOT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `status` enum('Pending','Confirmed','Canceled','Completed','Unconfirmed') NOT NULL,
  `doctor_comment` longtext NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `appointment_table`
--

INSERT INTO `appointment_table` (`appointment_id`, `doctor_id`, `patient_id`, `service_id`, `doctor_schedule_id`, `reason_for_appointment`, `appointment_date`, `appointment_time`, `status`, `doctor_comment`) VALUES
(168, 1, 25, 1, 40, 'cold', '2023-06-16', '09:00:00', 'Pending', ' ');

-- --------------------------------------------------------

--
-- Table structure for table `doctor_schedule_table`
--

CREATE TABLE `doctor_schedule_table` (
  `doctor_schedule_id` int(11) NOT NULL,
  `doctor_id` int(11) NOT NULL,
  `time` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `duration` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `doctor_schedule_table`
--

INSERT INTO `doctor_schedule_table` (`doctor_schedule_id`, `doctor_id`, `time`, `duration`) VALUES
(40, 1, '10:00', 30),
(80, 1, '09:00', 30),
(81, 3, '09:00', 30),
(82, 1, '10:00', 30),
(83, 1, '13:00', 30),
(84, 6, '15:00', 30),
(85, 6, '18:00', 30),
(86, 1, '15:00', 30),
(87, 1, '18:00', 30),
(88, 6, '09:30', 30),
(89, 6, '11:00', 30),
(90, 5, '12:00', 30),
(91, 5, '14:00', 30),
(92, 5, '16:00', 30),
(93, 3, '15:30', 30),
(94, 3, '15:00', 30),
(95, 3, '18:00', 30),
(96, 3, '13:30', 30);

-- --------------------------------------------------------

--
-- Table structure for table `doctor_table`
--

CREATE TABLE `doctor_table` (
  `doctor_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `doctor_email_address` varchar(200) NOT NULL,
  `doctor_name` varchar(100) NOT NULL,
  `doctor_phone_no` varchar(30) NOT NULL,
  `doctor_address` varchar(200) NOT NULL,
  `doctor_date_of_birth` date NOT NULL,
  `doctor_degree` varchar(200) NOT NULL,
  `doctor_expert_in` varchar(120) NOT NULL,
  `doctor_added_on` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `doctor_table`
--

INSERT INTO `doctor_table` (`doctor_id`, `user_id`, `service_id`, `doctor_email_address`, `doctor_name`, `doctor_phone_no`, `doctor_address`, `doctor_date_of_birth`, `doctor_degree`, `doctor_expert_in`, `doctor_added_on`) VALUES
(1, 6, 1, 'peterparker@gmail.com', 'Dr. Peter Parker', '7539518520', '102, Sky View, NYC', '1985-10-29', 'MBBS MS', 'Sergen', '2021-02-15'),
(2, 7, 1, 'adambrodly@gmail.com', 'Dr. Adam Broudly', '753852963', '105, Fort, NYC', '1982-08-10', 'MBBS MD(Cardiac)', 'Cardiologist', '2021-02-18'),
(3, 8, 2, 'sophia.parker@gmail.com', 'Dr. Sophia Parker', '7417417410', '50, Best street CA', '1989-04-03', 'MBBS', 'Gynacologist', '2021-02-18'),
(5, 10, 5, 'emmalarsdattor@gmail.com', 'Dr. Emma Larsdattor', '9635852025', '25, Silver Arch', '1988-03-03', 'MBBS MD', 'General Physian', '2021-02-18'),
(6, 11, 3, 'manuel.armstrong@gmail.com', 'Dr. Manuel Armstrong', '8523697410', '2378 Fire Access Road Asheboro, NC 27203', '1989-03-01', 'MBBS MD (Medicine)', 'General Physician', '2021-02-23');

-- --------------------------------------------------------

--
-- Table structure for table `log_in`
--

CREATE TABLE `log_in` (
  `user_id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `user_password` varchar(300) NOT NULL,
  `user_status` enum('admin','doctor','patient') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `log_in`
--

INSERT INTO `log_in` (`user_id`, `email`, `user_password`, `user_status`) VALUES
(1, 'jerribrown@gmail.com', 'password', 'patient'),
(6, 'peterparker@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'doctor'),
(7, 'adambrodly@gmail.com', 'password', 'doctor'),
(8, 'sophia.parker@gmail.com', 'password', 'doctor'),
(10, 'Dr. Emma Larsdattor', 'password', 'doctor'),
(11, 'Dr. Manuel Armstrong', 'password', 'doctor'),
(33, 'tembihan01@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'admin'),
(65, 'tembihanniel@gmail.com', '5f4dcc3b5aa765d61d8327deb882cf99', 'patient');

-- --------------------------------------------------------

--
-- Table structure for table `patient_table`
--

CREATE TABLE `patient_table` (
  `patient_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `patient_email_address` varchar(200) NOT NULL,
  `patient_first_name` varchar(100) NOT NULL,
  `patient_last_name` varchar(100) NOT NULL,
  `patient_date_of_birth` date NOT NULL,
  `patient_gender` enum('Male','Female','Other') NOT NULL,
  `patient_address` varchar(223) NOT NULL,
  `patient_phone_no` varchar(30) NOT NULL,
  `patient_marital_status` varchar(50) NOT NULL,
  `patient_added_on` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `patient_table`
--

INSERT INTO `patient_table` (`patient_id`, `user_id`, `patient_email_address`, `patient_first_name`, `patient_last_name`, `patient_date_of_birth`, `patient_gender`, `patient_address`, `patient_phone_no`, `patient_marital_status`, `patient_added_on`) VALUES
(25, 65, 'tembihanniel@gmail.com', 'Tembi', 'Hanniel', '2001-01-17', 'Male', 'buea', '653776695', 'Single', '2023-06-15');

-- --------------------------------------------------------

--
-- Table structure for table `service_table`
--

CREATE TABLE `service_table` (
  `service_id` int(11) NOT NULL,
  `service_name` varchar(200) NOT NULL,
  `service_logo` varchar(200) NOT NULL,
  `service_url` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `service_table`
--

INSERT INTO `service_table` (`service_id`, `service_name`, `service_logo`, `service_url`) VALUES
(1, 'General Check-Up', '/assets/stethescope.jpeg', '/Patient/appointment'),
(2, 'Heart Check-Up', '/assets/heart.jpeg', '/Patient/appointment'),
(3, 'Eye Check-Up', '/assets/eye.png', '/Patient/appointment'),
(4, 'Bone check-Up', 'assets/bone.png', '/Patient/appointment'),
(5, 'Tooth Check-Up', 'assets/tooth.jpg', '/Patient/appointment');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_table`
--
ALTER TABLE `admin_table`
  ADD PRIMARY KEY (`admin_id`),
  ADD KEY `A-user_id` (`user_id`);

--
-- Indexes for table `appointment_history`
--
ALTER TABLE `appointment_history`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `appointment_history_ibfk_3` (`patient_id`),
  ADD KEY `appointment_history_ibfk_4` (`doctor_schedule_id`),
  ADD KEY `appointment_history_ibfk_5` (`service_id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `appointment_table`
--
ALTER TABLE `appointment_table`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `doctor_id` (`doctor_id`),
  ADD KEY `patient_id` (`patient_id`),
  ADD KEY `service_id` (`service_id`);

--
-- Indexes for table `doctor_schedule_table`
--
ALTER TABLE `doctor_schedule_table`
  ADD PRIMARY KEY (`doctor_schedule_id`),
  ADD KEY `doctor_id` (`doctor_id`);

--
-- Indexes for table `doctor_table`
--
ALTER TABLE `doctor_table`
  ADD PRIMARY KEY (`doctor_id`),
  ADD KEY `service_id` (`service_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `log_in`
--
ALTER TABLE `log_in`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `patient_table`
--
ALTER TABLE `patient_table`
  ADD PRIMARY KEY (`patient_id`),
  ADD UNIQUE KEY `user_id` (`user_id`);

--
-- Indexes for table `service_table`
--
ALTER TABLE `service_table`
  ADD PRIMARY KEY (`service_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_table`
--
ALTER TABLE `admin_table`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `appointment_table`
--
ALTER TABLE `appointment_table`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;

--
-- AUTO_INCREMENT for table `doctor_schedule_table`
--
ALTER TABLE `doctor_schedule_table`
  MODIFY `doctor_schedule_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `doctor_table`
--
ALTER TABLE `doctor_table`
  MODIFY `doctor_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `log_in`
--
ALTER TABLE `log_in`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `patient_table`
--
ALTER TABLE `patient_table`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `service_table`
--
ALTER TABLE `service_table`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `admin_table`
--
ALTER TABLE `admin_table`
  ADD CONSTRAINT `A-user_id` FOREIGN KEY (`user_id`) REFERENCES `log_in` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `appointment_table`
--
ALTER TABLE `appointment_table`
  ADD CONSTRAINT `Doctor` FOREIGN KEY (`doctor_id`) REFERENCES `doctor_table` (`doctor_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Patient` FOREIGN KEY (`patient_id`) REFERENCES `patient_table` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `Service` FOREIGN KEY (`service_id`) REFERENCES `service_table` (`service_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `doctor_schedule_table`
--
ALTER TABLE `doctor_schedule_table`
  ADD CONSTRAINT `doctor_id` FOREIGN KEY (`doctor_id`) REFERENCES `doctor_table` (`doctor_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `doctor_table`
--
ALTER TABLE `doctor_table`
  ADD CONSTRAINT `doctor_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `log_in` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `service_id` FOREIGN KEY (`service_id`) REFERENCES `service_table` (`service_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `patient_table`
--
ALTER TABLE `patient_table`
  ADD CONSTRAINT `patient_table_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `log_in` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
