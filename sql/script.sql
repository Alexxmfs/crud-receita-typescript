CREATE DATABASE IF NOT EXISTS locluxo DEFAULT CHARACTER SET utf8mb4 DEFAULT COLLATE utf8mb4_0900_ai_ci;
USE locluxo;


CREATE TABLE veiculo (
  idveiculo int NOT NULL AUTO_INCREMENT,
  marca varchar(50) NOT NULL,
  modelo varchar(50) NOT NULL,
  ano int NOT NULL,
  cor varchar(50) NOT NULL,
  categoria varchar(50) NOT NULL,
  PRIMARY KEY (idveiculo)
);
