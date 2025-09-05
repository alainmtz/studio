-- Users Table
CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Suppliers Table
CREATE TABLE Suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_person VARCHAR(100),
    email VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Items Table
CREATE TABLE Items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    sku VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    stock INTEGER NOT NULL DEFAULT 0,
    price NUMERIC(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'in-stock', -- 'in-stock', 'low-stock', 'out-of-stock'
    category VARCHAR(50),
    supplier_id INTEGER REFERENCES Suppliers(id),
    image_url VARCHAR(255), -- Stores path to image like /backend/uploads/image.jpg
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Transactions Table
CREATE TABLE Transactions (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(50) UNIQUE NOT NULL,
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(20) NOT NULL, -- 'Fulfilled', 'Processing', 'Shipped'
    transaction_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- Sample Data

-- Insert Sample Users
INSERT INTO Users (first_name, last_name, email, password_hash, bio) VALUES
('John', 'Doe', 'john.doe@example.com', 'hashed_password_1', 'I am a software engineer specializing in building amazing web applications.'),
('Jane', 'Smith', 'jane.smith@example.com', 'hashed_password_2', 'Product manager with a passion for user experience.');

-- Insert Sample Suppliers
INSERT INTO Suppliers (name, contact_person, email, phone) VALUES
('FutureTech Dynamics', 'Dr. Evelyn Reed', 'e.reed@futuretech.io', '+1-202-555-0145'),
('Quantum Innovations', 'Marcus Thorne', 'marcus.t@qi.com', '+1-202-555-0189'),
('Stellar Components Co.', 'Lila Chen', 'l.chen@stellarcomp.net', '+1-202-555-0122'),
('Apex Machining', 'Javier Morales', 'javi@apexmach.com', '+1-202-555-0167'),
('BioSynth Labs', 'Dr. Aris Thorne', 'aris.t@biosynth.dev', '+1-202-555-0193');

-- Insert Sample Items
INSERT INTO Items (name, sku, stock, price, status, category, supplier_id, image_url) VALUES
('Laser-Guided Widget', 'LGW-001', 120, 49.99, 'in-stock', 'Widgets', 1, '/backend/uploads/LGW-001.jpg'),
('Hyper-Flux Capacitor', 'HFC-002', 15, 199.99, 'low-stock', 'Capacitors', 1, '/backend/uploads/HFC-002.jpg'),
('Quantum Sprocket', 'QS-003', 0, 99.99, 'out-of-stock', 'Sprockets', 2, '/backend/uploads/QS-003.jpg'),
('Nano-Enhanced Gear', 'NEG-004', 75, 29.99, 'in-stock', 'Gears', 3, '/backend/uploads/NEG-004.jpg'),
('Chrono-Stabilizer Unit', 'CSU-005', 30, 349.99, 'in-stock', 'Stabilizers', 4, '/backend/uploads/CSU-005.jpg'),
('Plasma-Infused Screw', 'PIS-006', 8, 2.99, 'low-stock', 'Fasteners', 5, '/backend/uploads/PIS-006.jpg');

-- Insert Sample Transactions
INSERT INTO Transactions (order_id, customer_name, customer_email, amount, status, transaction_date) VALUES
('ORD001', 'Olivia Martin', 'olivia.martin@email.com', 250.00, 'Fulfilled', '2024-05-23'),
('ORD002', 'Jackson Lee', 'jackson.lee@email.com', 150.75, 'Processing', '2024-05-23'),
('ORD003', 'Isabella Nguyen', 'isabella.nguyen@email.com', 350.00, 'Fulfilled', '2024-05-22'),
('ORD004', 'William Kim', 'will@email.com', 450.50, 'Shipped', '2024-05-21'),
('ORD005', 'Sofia Davis', 'sofia.davis@email.com', 550.00, 'Fulfilled', '2024-05-20');
