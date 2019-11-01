-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 01, 2019 at 04:59 PM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.3.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `atp3db`
--

-- --------------------------------------------------------

--
-- Table structure for table `employee_attendance`
--

CREATE TABLE `employee_attendance` (
  `emp_ID` int(11) NOT NULL,
  `usrname` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `outlet_ID` int(50) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `employee_attendance`
--

INSERT INTO `employee_attendance` (`emp_ID`, `usrname`, `name`, `outlet_ID`, `date`) VALUES
(7, 'abid12', 'forrest gumps', 5, '2019-11-01'),
(8, 'shuvo', 'shuvo sharkar', 5, '2019-11-01'),
(9, 'sakib', 'sakib khan', 5, '2019-11-01'),
(10, 'shuvo', 'shuvo sharkar', 5, '2019-11-01'),
(11, 'sakib', 'sakib khan', 5, '2019-11-01'),
(12, 'shuvo', 'shuvo sharkar', 5, '2019-11-01'),
(13, 'sakib', 'sakib khan', 5, '2019-11-01'),
(14, 'sakib', 'sakib khan', 5, '2019-11-01'),
(15, 'shuvo', 'shuvo sharkar', 5, '2019-11-01'),
(16, 'sakib67', 'sakib jhon', 5, '2019-11-01'),
(17, 'abid12', 'forrest gumps', 5, '2019-11-01'),
(18, 'shuvo', 'shuvo sharkar', 5, '2019-11-01'),
(19, 'shuvo', 'shuvo sharkar', 5, '2019-11-01'),
(20, 'sakib67', 'sakib jhon', 5, '2019-11-01'),
(21, 'abid12', 'forrest gumps', 5, '2019-11-01'),
(22, 'abid12', 'forrest gumps', 0, '2019-11-01');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `employee_attendance`
--
ALTER TABLE `employee_attendance`
  ADD PRIMARY KEY (`emp_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `employee_attendance`
--
ALTER TABLE `employee_attendance`
  MODIFY `emp_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
