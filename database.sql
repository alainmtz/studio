-- Base de datos para Stockpile Manager (Compatible con MariaDB/MySQL)

-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS inventory;
USE inventory;

-- Tabla de Usuarios
CREATE TABLE IF NOT EXISTS Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Proveedores
CREATE TABLE IF NOT EXISTS Suppliers (
    supplier_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Items de Inventario
CREATE TABLE IF NOT EXISTS Items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    stock INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    status ENUM('in-stock', 'low-stock', 'out-of-stock') NOT NULL,
    category VARCHAR(50),
    supplier_id INT,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(supplier_id)
);

-- Tabla de Transacciones
CREATE TABLE IF NOT EXISTS Transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    item_id INT,
    user_id INT,
    type ENUM('sale', 'restock', 'adjustment') NOT NULL,
    quantity INT NOT NULL,
    notes TEXT,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES Items(item_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Inserts de ejemplo
INSERT INTO Users (first_name, last_name, email, password_hash) VALUES
('John', 'Doe', 'john.doe@example.com', 'hashed_password_1'),
('Jane', 'Smith', 'jane.smith@example.com', 'hashed_password_2');

INSERT INTO Suppliers (name, contact_person, email, phone) VALUES
('FutureTech Dynamics', 'Dr. Evelyn Reed', 'e.reed@futuretech.io', '+1-202-555-0145'),
('Quantum Innovations', 'Marcus Thorne', 'marcus.t@qi.com', '+1-202-555-0189');

INSERT INTO Items (name, sku, description, stock, price, status, category, supplier_id, image_url) VALUES
('Laser-Guided Widget', 'LGW-001', 'A high-precision widget with laser guidance.', 120, 49.99, 'in-stock', 'Widgets', 1, '/backend/uploads/LGW-001.png'),
('Hyper-Flux Capacitor', 'HFC-002', 'A capacitor for temporal displacement.', 15, 199.99, 'low-stock', 'Capacitors', 1, '/backend/uploads/HFC-002.png'),
('Quantum Sprocket', 'QS-003', 'A sprocket for quantum-level machinery.', 0, 99.99, 'out-of-stock', 'Sprockets', 2, '/backend/uploads/QS-003.png');

INSERT INTO Transactions (item_id, user_id, type, quantity, notes) VALUES
(1, 1, 'sale', -10, 'Order #12345'),
(2, 2, 'restock', 20, 'Shipment received'),
(1, 1, 'adjustment', -2, 'Stock correction after cycle count');
