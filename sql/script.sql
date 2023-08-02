CREATE DATABASE IF NOT EXISTS receitaDB;
USE receitaDB;

CREATE TABLE receita (
  idreceita int NOT NULL AUTO_INCREMENT,
  titulo varchar(50) NOT NULL,
  ingrediente varchar(50) NOT NULL,
  utensilio varchar(50) NOT NULL,
  ModoPreparo varchar(50) NOT NULL,
  categoria varchar(50) NOT NULL,
  PRIMARY KEY (idreceita)
);
