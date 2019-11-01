-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 31, 2019 at 09:30 PM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 5.6.38

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
-- Table structure for table `raw_goods_inventory`
--

CREATE TABLE `raw_goods_inventory` (
  `id` int(11) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `product_type` varchar(100) NOT NULL,
  `date` date NOT NULL,
  `opening` double NOT NULL,
  `receive` double NOT NULL,
  `total` double NOT NULL,
  `exp` double NOT NULL,
  `inventory_balance` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `raw_goods_inventory`
--

INSERT INTO `raw_goods_inventory` (`id`, `product_name`, `product_type`, `date`, `opening`, `receive`, `total`, `exp`, `inventory_balance`) VALUES
(1, 'Chicken', 'Wings', '2019-10-01', 32, 30, 62, 38, 24),
(2, 'Beef', 'Bacon', '2019-10-01', 10, 60, 70, 30, 40),
(3, 'Chicken', 'Wings', '2019-10-02', 24, 35, 59, 49, 10),
(4, 'Beef', 'Bacon', '2019-10-01', 40, 20, 60, 50, 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `raw_goods_inventory`
--
ALTER TABLE `raw_goods_inventory`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `raw_goods_inventory`
--
ALTER TABLE `raw_goods_inventory`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
