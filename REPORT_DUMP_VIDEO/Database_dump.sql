-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               10.4.8-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             10.3.0.5771
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- Dumping database structure for recipe
CREATE DATABASE IF NOT EXISTS `recipe` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `recipe`;

-- Dumping structure for table recipe.category
CREATE TABLE IF NOT EXISTS `category` (
  `Category_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Category_Name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Category_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table recipe.category: ~6 rows (approximately)
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`Category_ID`, `Category_Name`) VALUES
	(1, 'Brunch'),
	(2, 'Snack'),
	(3, 'Breakfast'),
	(4, 'Lunch'),
	(5, 'Dinner'),
	(6, 'Tea');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

-- Dumping structure for table recipe.recipe
CREATE TABLE IF NOT EXISTS `recipe` (
  `Recipe_ID` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(80) NOT NULL,
  `Prep_Time` time NOT NULL,
  `Cook_Time` time NOT NULL,
  `Price` int(11) NOT NULL,
  `Description` varchar(255) NOT NULL,
  `Steps` varchar(255) NOT NULL DEFAULT '',
  `Ingridients` varchar(255) NOT NULL DEFAULT '',
  `Recipe_Owner` int(11) NOT NULL,
  `Category_ID` int(11) NOT NULL,
  PRIMARY KEY (`Recipe_ID`),
  KEY `Recipe_Owner` (`Recipe_Owner`),
  KEY `Category_ID` (`Category_ID`),
  CONSTRAINT `Category_ID` FOREIGN KEY (`Category_ID`) REFERENCES `category` (`Category_ID`),
  CONSTRAINT `Recipe_Owner` FOREIGN KEY (`Recipe_Owner`) REFERENCES `users` (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table recipe.recipe: ~1 rows (approximately)
/*!40000 ALTER TABLE `recipe` DISABLE KEYS */;
INSERT INTO `recipe` (`Recipe_ID`, `Name`, `Prep_Time`, `Cook_Time`, `Price`, `Description`, `Steps`, `Ingridients`, `Recipe_Owner`, `Category_ID`) VALUES
	(1, 'Thai fried prawn & pineapple rice', '00:10:00', '00:15:00', 8, 'This quick, low calorie supper is perfect for a busy weeknight. Cook your rice in advance to get ahead - run it under cold water to chill quickly, then freeze in a food bag for up to one month', 'Heat the oil in a wok or non-stick frying pan and fry the spring onion whites for 2 mins until softened. Stir in the pepper for 1 min, followed by the pineapple for 1 min more, then stir in the green curry paste and soy sauce.', '2 tsp sunflower oil bunch spring onions, greens and whites separated, both sliced 1 green pepper, deseeded and chopped into small chunks 140g pineapple chopped into bite-sized chunks 3 tbsp Thai green curry paste 4 tsp light soy sauce, plus extra to serve', 1, 4);
/*!40000 ALTER TABLE `recipe` ENABLE KEYS */;

-- Dumping structure for table recipe.users
CREATE TABLE IF NOT EXISTS `users` (
  `User_ID` int(11) NOT NULL AUTO_INCREMENT,
  `fName` varchar(30) NOT NULL,
  `lName` varchar(40) NOT NULL,
  PRIMARY KEY (`User_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- Dumping data for table recipe.users: ~2 rows (approximately)
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` (`User_ID`, `fName`, `lName`) VALUES
	(1, 'Ignas', 'Lamanauskas'),
	(2, 'Paul', 'Chef');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
