CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha senha VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS salas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    capacidade INT NOT NULL,
    descricao TEXT,
    recursos VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reservas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sala_id INT NOT NULL,
    usuario_id INT,
    responsavel_nome VARCHAR(100) NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    data_inicio DATETIME NOT NULL,
    data_fim DATETIME NOT NULL,
    status ENUM('ativa', 'cancelada') DEFAULT 'ativa',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sala_id) REFERENCES salas(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE SET NULL,
    CHECK (data_inicio < data_fim)
);

INSERT INTO usuarios (nome, email, senha) 
VALUES ('Admin', 'admin@email.com', '123456')
ON DUPLICATE KEY UPDATE nome = VALUES(nome), senha = VALUES(senha);

INSERT INTO salas (nome, capacidade, descricao, recursos) VALUES
('Sala A', 10, 'Sala com projetor', 'Projetor, quadro branco'),
('Sala B', 20, 'Sala ampla', 'TV, videoconferência')
ON DUPLICATE KEY UPDATE nome = VALUES(nome);

INSERT INTO reservas (sala_id, usuario_id, responsavel_nome, titulo, data_inicio, data_fim, status)
VALUES (1, 1, 'Admin', 'Reunião de projeto', '2026-06-23 09:00:00', '2026-06-23 10:00:00', 'ativa')
ON DUPLICATE KEY UPDATE titulo = VALUES(titulo);