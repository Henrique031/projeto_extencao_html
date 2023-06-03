-- Criação do banco de dados
CREATE DATABASE EsporteDatabase;

-- Utilização do banco de dados
USE EsporteDatabase;

-- Criação da tabela 'perfil'
CREATE TABLE perfil (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(255),
    senha VARCHAR(50)
);

-- Criação da tabela 'comentarios'
CREATE TABLE comentarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    created_at TIMESTAMP,
    comentario TEXT
);

-- Criação da tabela 'perfil_comentario'
CREATE TABLE perfil_comentario (
    comentarios_id INT,
    created_at TIMESTAMP,
    perfil_id INT,
    FOREIGN KEY (comentarios_id) REFERENCES comentarios(id),
    FOREIGN KEY (perfil_id) REFERENCES perfil(id)
);