-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema kiosko
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema kiosko
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `kiosko` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ;
USE `kiosko` ;

-- -----------------------------------------------------
-- Table `kiosko`.`colecciones`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kiosko`.`colecciones` (
  `numColeccion` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL UNIQUE,
  `estado` VARCHAR(45) NOT NULL DEFAULT 'inactiva',
  PRIMARY KEY (`numColeccion`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `kiosko`.`albumes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kiosko`.`albumes` (
  `idAlbum` INT NOT NULL AUTO_INCREMENT,
  `imagen` VARCHAR(250) NULL,
  `precio` VARCHAR(30) NOT NULL,
  `idColeccion` INT NOT NULL,
  PRIMARY KEY (`idAlbum`),
  CONSTRAINT `fk_albumes_colecciones`
    FOREIGN KEY (`idColeccion`)
    REFERENCES `kiosko`.`colecciones` (`numColeccion`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `kiosko`.`socios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kiosko`.`socios` (
  `numSocio` INT NOT NULL AUTO_INCREMENT,
  `usuario` VARCHAR(30) NOT NULL UNIQUE,
  `contrasenia` VARCHAR(30) NOT NULL,
  `puntos` VARCHAR(30) NOT NULL DEFAULT 0,
  `rol` VARCHAR(30) NOT NULL DEFAULT "usuario",
  PRIMARY KEY (`numSocio`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `kiosko`.`coleccionusuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kiosko`.`coleccionusuario` (
  `idcoleccionUsuario` INT NOT NULL AUTO_INCREMENT,
  `idAlbum` INT NULL DEFAULT NULL,
  `estado` VARCHAR(45) NOT NULL,
  `numColeccion` INT NOT NULL,
  `numSocio` INT NOT NULL,
  `codCromos` VARCHAR(300) NULL,
  PRIMARY KEY (`idcoleccionUsuario`),
  CONSTRAINT `idAlbum`
    FOREIGN KEY (`idAlbum`)
    REFERENCES `kiosko`.`albumes` (`idAlbum`),
  CONSTRAINT `numCol`
    FOREIGN KEY (`numColeccion`)
    REFERENCES `kiosko`.`colecciones` (`numColeccion`),
  CONSTRAINT `numSocio`
    FOREIGN KEY (`numSocio`)
    REFERENCES `kiosko`.`socios` (`numSocio`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


-- -----------------------------------------------------
-- Table `kiosko`.`cromos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kiosko`.`cromos` (
  `codCromo` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(40) NOT NULL,
  `imagen` VARCHAR(250) NULL,
  `precio` INT NOT NULL,
  `copias` INT NOT NULL DEFAULT 10,
  `numColeccion` INT NOT NULL,
  PRIMARY KEY (`codCromo`),
  CONSTRAINT `numColeccion`
    FOREIGN KEY (`numColeccion`)
    REFERENCES `kiosko`.`colecciones` (`numColeccion`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_unicode_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

