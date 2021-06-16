/*
SQLyog Community v13.1.5  (64 bit)
MySQL - 5.6.47-log : Database - kiosko
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`kiosko` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */;

USE `kiosko`;

/*Table structure for table `albumes` */

DROP TABLE IF EXISTS `albumes`;

CREATE TABLE `albumes` (
  `idAlbum` int(11) NOT NULL AUTO_INCREMENT,
  `imagen` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `precio` int(11) NOT NULL,
  `idColeccion` int(11) NOT NULL,
  PRIMARY KEY (`idAlbum`),
  KEY `fk_albumes_colecciones` (`idColeccion`),
  CONSTRAINT `fk_albumes_colecciones` FOREIGN KEY (`idColeccion`) REFERENCES `colecciones` (`numColeccion`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `albumes` */

insert  into `albumes`(`idAlbum`,`imagen`,`precio`,`idColeccion`) values 
(1,'/media/albumes/coleccion rojo.png',25,1),
(2,'/media/albumes/coleccion amarillo.png',12,2),
(3,'/media/albumes/coleccion azul.png',18,3),
(4,'/media/albumes/coleccion blanco.png',21,4),
(5,'/media/albumes/coleccion morado.png',30,5),
(6,'/media/albumes/coleccion negro.png',32,6),
(7,'/media/albumes/coleccion verde.png',22,7);

/*Table structure for table `colecciones` */

DROP TABLE IF EXISTS `colecciones`;

CREATE TABLE `colecciones` (
  `numColeccion` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estado` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'inactiva',
  PRIMARY KEY (`numColeccion`),
  UNIQUE KEY `nombre` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `colecciones` */

insert  into `colecciones`(`numColeccion`,`nombre`,`estado`) values 
(1,'coleccion rojo','activa'),
(2,'coleccion amarillo','activa'),
(3,'coleccion azul','activa'),
(4,'coleccion blanco','activa'),
(5,'coleccion morado','activa'),
(6,'coleccion negro','activa'),
(7,'coleccion verde','activa');

/*Table structure for table `coleccionusuario` */

DROP TABLE IF EXISTS `coleccionusuario`;

CREATE TABLE `coleccionusuario` (
  `idcoleccionUsuario` int(11) NOT NULL AUTO_INCREMENT,
  `idAlbum` int(11) DEFAULT NULL,
  `estado` varchar(45) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numColeccion` int(11) NOT NULL,
  `numSocio` int(11) NOT NULL,
  `codCromos` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`idcoleccionUsuario`),
  KEY `idAlbum` (`idAlbum`),
  KEY `numCol` (`numColeccion`),
  KEY `numSocio` (`numSocio`),
  CONSTRAINT `idAlbum` FOREIGN KEY (`idAlbum`) REFERENCES `albumes` (`idAlbum`),
  CONSTRAINT `numCol` FOREIGN KEY (`numColeccion`) REFERENCES `colecciones` (`numColeccion`),
  CONSTRAINT `numSocio` FOREIGN KEY (`numSocio`) REFERENCES `socios` (`numSocio`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `coleccionusuario` */

insert  into `coleccionusuario`(`idcoleccionUsuario`,`idAlbum`,`estado`,`numColeccion`,`numSocio`,`codCromos`) values 
(1,1,'completada',1,2,'53;52;54;55;56;58;57;59;60;51;'),
(2,2,'no iniciada',2,2,''),
(3,3,'no iniciada',3,2,''),
(4,4,'completada parcialmente',4,2,'25;26;'),
(5,5,'no iniciada',5,2,''),
(6,6,'no iniciada',6,2,''),
(7,7,'no iniciada',7,2,''),
(8,2,'completada parcialmente',2,3,'4;8;'),
(9,3,'completada parcialmente',3,3,'12;13;20;'),
(10,NULL,'completada parcialmente',1,3,'53;');

/*Table structure for table `cromos` */

DROP TABLE IF EXISTS `cromos`;

CREATE TABLE `cromos` (
  `codCromo` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(40) COLLATE utf8mb4_unicode_ci NOT NULL,
  `imagen` varchar(250) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `precio` int(11) NOT NULL,
  `copias` int(11) NOT NULL DEFAULT '10',
  `numColeccion` int(11) NOT NULL,
  PRIMARY KEY (`codCromo`),
  UNIQUE KEY `nombre` (`nombre`),
  KEY `numColeccion` (`numColeccion`),
  CONSTRAINT `numColeccion` FOREIGN KEY (`numColeccion`) REFERENCES `colecciones` (`numColeccion`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `cromos` */

insert  into `cromos`(`codCromo`,`nombre`,`imagen`,`precio`,`copias`,`numColeccion`) values 
(1,'BT1','/media/colecciones/coleccion amarillo/coleccion amarillo_BT1.png',7,10,2),
(2,'BT2','/media/colecciones/coleccion amarillo/coleccion amarillo_BT2.png',10,10,2),
(3,'BT3','/media/colecciones/coleccion amarillo/coleccion amarillo_BT3.png',13,10,2),
(4,'BT4','/media/colecciones/coleccion amarillo/coleccion amarillo_BT4.png',8,9,2),
(5,'BT5','/media/colecciones/coleccion amarillo/coleccion amarillo_BT5.png',12,10,2),
(6,'BT6','/media/colecciones/coleccion amarillo/coleccion amarillo_BT6.png',18,10,2),
(7,'BT7','/media/colecciones/coleccion amarillo/coleccion amarillo_BT7.png',22,10,2),
(8,'BT8','/media/colecciones/coleccion amarillo/coleccion amarillo_BT8.png',3,9,2),
(9,'BT9','/media/colecciones/coleccion amarillo/coleccion amarillo_BT9.png',5,10,2),
(10,'BT10','/media/colecciones/coleccion amarillo/coleccion amarillo_BT10.png',12,10,2),
(11,'AZ1','/media/colecciones/coleccion azul/coleccion azul_AZ1.png',5,10,3),
(12,'AZ2','/media/colecciones/coleccion azul/coleccion azul_AZ2.png',5,9,3),
(13,'AZ3','/media/colecciones/coleccion azul/coleccion azul_AZ3.png',5,9,3),
(14,'AZ4','/media/colecciones/coleccion azul/coleccion azul_AZ4.png',5,10,3),
(15,'AZ5','/media/colecciones/coleccion azul/coleccion azul_AZ5.png',5,10,3),
(16,'AZ6','/media/colecciones/coleccion azul/coleccion azul_AZ6.png',5,10,3),
(17,'AZ7','/media/colecciones/coleccion azul/coleccion azul_AZ7.png',5,10,3),
(18,'AZ8','/media/colecciones/coleccion azul/coleccion azul_AZ8.png',5,10,3),
(19,'AZ9','/media/colecciones/coleccion azul/coleccion azul_AZ9.png',5,10,3),
(20,'AZ10','/media/colecciones/coleccion azul/coleccion azul_AZ10.png',5,9,3),
(21,'BL1','/media/colecciones/coleccion blanco/coleccion blanco_BL1.png',6,10,4),
(22,'BL2','/media/colecciones/coleccion blanco/coleccion blanco_BL2.png',6,10,4),
(23,'BL3','/media/colecciones/coleccion blanco/coleccion blanco_BL3.png',6,10,4),
(24,'BL4','/media/colecciones/coleccion blanco/coleccion blanco_BL4.png',6,10,4),
(25,'BL5','/media/colecciones/coleccion blanco/coleccion blanco_BL5.png',6,8,4),
(26,'BL6','/media/colecciones/coleccion blanco/coleccion blanco_BL6.png',6,9,4),
(27,'BL7','/media/colecciones/coleccion blanco/coleccion blanco_BL7.png',6,10,4),
(28,'BL8','/media/colecciones/coleccion blanco/coleccion blanco_BL8.png',6,9,4),
(29,'BL9','/media/colecciones/coleccion blanco/coleccion blanco_BL9.png',6,10,4),
(30,'BL10','/media/colecciones/coleccion blanco/coleccion blanco_BL10.png',6,10,4),
(31,'MR1','/media/colecciones/coleccion morado/coleccion morado_MR1.png',9,10,5),
(32,'MR2','/media/colecciones/coleccion morado/coleccion morado_MR2.png',9,10,5),
(33,'MR3','/media/colecciones/coleccion morado/coleccion morado_MR3.png',9,10,5),
(34,'MR4','/media/colecciones/coleccion morado/coleccion morado_MR4.png',9,10,5),
(35,'MR5','/media/colecciones/coleccion morado/coleccion morado_MR5.png',9,10,5),
(36,'MR6','/media/colecciones/coleccion morado/coleccion morado_MR6.png',9,10,5),
(37,'MR7','/media/colecciones/coleccion morado/coleccion morado_MR7.png',9,10,5),
(38,'MR8','/media/colecciones/coleccion morado/coleccion morado_MR8.png',9,10,5),
(39,'MR9','/media/colecciones/coleccion morado/coleccion morado_MR9.png',9,10,5),
(40,'MR10','/media/colecciones/coleccion morado/coleccion morado_MR10.png',9,10,5),
(41,'NR1','/media/colecciones/coleccion negro/coleccion negro_NR1.png',12,10,6),
(42,'NR2','/media/colecciones/coleccion negro/coleccion negro_NR2.png',12,10,6),
(43,'NR3','/media/colecciones/coleccion negro/coleccion negro_NR3.png',12,10,6),
(44,'NR4','/media/colecciones/coleccion negro/coleccion negro_NR4.png',12,10,6),
(45,'NR5','/media/colecciones/coleccion negro/coleccion negro_NR5.png',12,10,6),
(46,'NR6','/media/colecciones/coleccion negro/coleccion negro_NR6.png',12,10,6),
(47,'NR7','/media/colecciones/coleccion negro/coleccion negro_NR7.png',12,10,6),
(48,'NR8','/media/colecciones/coleccion negro/coleccion negro_NR8.png',12,10,6),
(49,'NR9','/media/colecciones/coleccion negro/coleccion negro_NR9.png',12,10,6),
(50,'NR10','/media/colecciones/coleccion negro/coleccion negro_NR10.png',12,10,6),
(51,'RO1','/media/colecciones/coleccion rojo/coleccion rojo_RO1.png',5,9,1),
(52,'RO2','/media/colecciones/coleccion rojo/coleccion rojo_RO2.png',5,9,1),
(53,'RO3','/media/colecciones/coleccion rojo/coleccion rojo_RO3.png',5,8,1),
(54,'RO4','/media/colecciones/coleccion rojo/coleccion rojo_RO4.png',5,9,1),
(55,'RO5','/media/colecciones/coleccion rojo/coleccion rojo_RO5.png',5,9,1),
(56,'RO6','/media/colecciones/coleccion rojo/coleccion rojo_RO6.png',5,9,1),
(57,'RO7','/media/colecciones/coleccion rojo/coleccion rojo_RO7.png',5,9,1),
(58,'RO8','/media/colecciones/coleccion rojo/coleccion rojo_RO8.png',5,9,1),
(59,'RO9','/media/colecciones/coleccion rojo/coleccion rojo_RO9.png',5,9,1),
(60,'RO10','/media/colecciones/coleccion rojo/coleccion rojo_RO10.png',5,9,1),
(61,'VE1','/media/colecciones/coleccion verde/coleccion verde_VE1.png',3,10,7),
(62,'VE2','/media/colecciones/coleccion verde/coleccion verde_VE2.png',3,10,7),
(63,'VE3','/media/colecciones/coleccion verde/coleccion verde_VE3.png',3,10,7),
(64,'VE4','/media/colecciones/coleccion verde/coleccion verde_VE4.png',3,10,7),
(65,'VE5','/media/colecciones/coleccion verde/coleccion verde_VE5.png',3,10,7),
(66,'VE6','/media/colecciones/coleccion verde/coleccion verde_VE6.png',3,10,7),
(67,'VE7','/media/colecciones/coleccion verde/coleccion verde_VE7.png',3,10,7),
(68,'VE8','/media/colecciones/coleccion verde/coleccion verde_VE8.png',3,10,7),
(70,'VE9','/media/colecciones/coleccion verde/coleccion verde_VE9.png',3,10,7),
(71,'VE10','/media/colecciones/coleccion verde/coleccion verde_VE10.png',3,10,7);

/*Table structure for table `socios` */

DROP TABLE IF EXISTS `socios`;

CREATE TABLE `socios` (
  `numSocio` int(11) NOT NULL AUTO_INCREMENT,
  `usuario` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `contrasenia` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `puntos` int(11) NOT NULL DEFAULT '0',
  `rol` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'usuario',
  PRIMARY KEY (`numSocio`),
  UNIQUE KEY `usuario` (`usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

/*Data for the table `socios` */

insert  into `socios`(`numSocio`,`usuario`,`contrasenia`,`puntos`,`rol`) values 
(1,'admin','admin',0,'admin'),
(2,'user1','4321',28,'usuario'),
(3,'user2','g3aw',533,'usuario');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
