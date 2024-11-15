create database lemoncoin;
use lemoncoin;

create table if not exists usuarios (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    email VARCHAR(45) NOT NULL,
    senha VARCHAR(45) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    genero ENUM('F', 'M') NOT NULL,
    PRIMARY KEY (id),
    UNIQUE KEY (email),
    UNIQUE KEY (telefone)
);

create table if not exists contas (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(45) NOT NULL,
    saldo DECIMAL(10,2) NOT NULL,
    fk_usuario_id INT UNSIGNED NOT NULL,
    icone VARCHAR(20),
    PRIMARY KEY (id),
    FOREIGN KEY (fk_usuario_id) REFERENCES usuarios (id)
);

create table if not exists categorias (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    nome VARCHAR(45),
    fk_usuario_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (fk_usuario_id) REFERENCES usuarios (id)
);

create table if not exists movimentacoes (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT,
    valor DECIMAL (10,2),
    recorrencia ENUM('Diaria, Semanal, Mensal, Trimestral, Quadrimestral, Semestral, Anual') NOT NULL,
    data DATETIME NOT NULL,
    tipo ENUM('Despesa', 'Receita') NOT NULL,
    fk_usuario_id INT UNSIGNED NOT NULL,
    fk_conta_id INT UNSIGNED NOT NULL,
    fk_categoria_id INT UNSIGNED NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (fk_usuario_id) REFERENCES usuarios (id),
    FOREIGN KEY (fk_conta_id) REFERENCES conta (id),
    FOREIGN KEY (fk_categoria_id) REFERENCES categoria (id)
);