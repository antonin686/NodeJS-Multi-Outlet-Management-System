-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2019 at 06:52 PM
-- Server version: 10.3.16-MariaDB
-- PHP Version: 7.3.6

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
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_ID` int(20) NOT NULL,
  `item_ID` int(20) NOT NULL,
  `outlet_ID` int(20) NOT NULL,
  `quantity` int(20) NOT NULL,
  `total_price` int(20) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_ID`, `item_ID`, `outlet_ID`, `quantity`, `total_price`, `date`) VALUES
(1, 1, 1, 2, 100, '2019-10-27'),
(2, 2, 2, 2, 100, '2019-10-27'),
(3, 2, 1, 2, 100, '2019-10-28'),
(4, 3, 2, 2, 200, '2019-10-28'),
(5, 1, 3, 2, 200, '2019-10-28'),
(6, 1, 1, 2, 200, '2019-10-29'),
(7, 2, 2, 2, 200, '2019-10-29'),
(8, 3, 3, 2, 400, '2019-10-29'),
(9, 2, 1, 2, 400, '2019-10-30'),
(10, 1, 2, 2, 500, '2019-10-30'),
(11, 1, 3, 2, 200, '2019-10-30'),
(12, 3, 1, 2, 200, '2019-10-30'),
(13, 1, 1, 2, 200, '2019-10-31'),
(14, 2, 1, 2, 200, '2019-10-31'),
(15, 3, 2, 2, 200, '2019-10-31'),
(16, 2, 3, 2, 200, '2019-10-31');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_ID` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
