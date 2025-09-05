-- SQL script for Stockpile Manager database setup

-- Users table to store user information
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Suppliers table to store supplier details
CREATE TABLE suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    contact_person VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Items table for inventory management
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    sku VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    stock INT NOT NULL DEFAULT 0,
    price NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'in-stock', -- e.g., 'in-stock', 'low-stock', 'out-of-stock'
    category VARCHAR(100),
    supplier_id INT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
);

-- Item images table to store multiple images per item
CREATE TABLE item_images (
    id SERIAL PRIMARY KEY,
    item_id INT NOT NULL,
    url VARCHAR(255) NOT NULL,
    alt_text VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE
);


-- Transactions table to record sales
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    order_id VARCHAR(100) UNIQUE NOT NULL,
    customer_name VARCHAR(255),
    customer_email VARCHAR(255),
    amount NUMERIC(10, 2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Processing', -- e.g., 'Processing', 'Shipped', 'Fulfilled', 'Cancelled'
    transaction_date DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Linking items to transactions (many-to-many relationship)
CREATE TABLE transaction_items (
    transaction_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT NOT NULL,
    price_at_time NUMERIC(10, 2) NOT NULL,
    PRIMARY KEY (transaction_id, item_id),
    FOREIGN KEY (transaction_id) REFERENCES transactions(id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE RESTRICT -- Don't delete item if it's in a transaction
);


-- Activity log for tracking inventory movements
CREATE TABLE activity_log (
    id SERIAL PRIMARY KEY,
    item_id INT NOT NULL,
    user_id INT,
    action VARCHAR(100) NOT NULL, -- e.g., 'Stock Added', 'Sale', 'Inventory Check'
    quantity_change INT,
    details TEXT,
    log_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (item_id) REFERENCES items(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) -- Can be null if action is automated
);

-- Indexes for performance
CREATE INDEX idx_items_supplier_id ON items(supplier_id);
CREATE INDEX idx_items_status ON items(status);
CREATE INDEX idx_activity_log_item_id ON activity_log(item_id);
CREATE INDEX idx_transactions_status ON transactions(status);
CREATE INDEX idx_transactions_date ON transactions(transaction_date);

-- Function to update the 'updated_at' timestamp on item update
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_item_modtime
BEFORE UPDATE ON items
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();

-- Sample data for demonstration

-- Insert suppliers
INSERT INTO suppliers (name, contact_person, email, phone) VALUES
('FutureTech Dynamics', 'Dr. Evelyn Reed', 'e.reed@futuretech.io', '+1-202-555-0145'),
('Quantum Innovations', 'Marcus Thorne', 'marcus.t@qi.com', '+1-202-555-0189');

-- Insert items
INSERT INTO items (name, sku, stock, price, status, category, supplier_id) VALUES
('Laser-Guided Widget', 'LGW-001', 120, 49.99, 'in-stock', 'Widgets', 1),
('Hyper-Flux Capacitor', 'HFC-002', 15, 199.99, 'low-stock', 'Capacitors', 1),
('Quantum Sprocket', 'QS-003', 0, 99.99, 'out-of-stock', 'Sprockets', 2);

-- Insert a sample user
INSERT INTO users (first_name, last_name, email, password_hash, bio) VALUES
('John', 'Doe', 'john.doe@example.com', 'your_hashed_password_here', 'I am a software engineer.');

-- Insert recent transactions
INSERT INTO transactions (order_id, customer_name, customer_email, amount, status, transaction_date) VALUES
('ORD001', 'Olivia Martin', 'olivia.martin@email.com', 250.00, 'Fulfilled', '2024-05-23'),
('ORD002', 'Jackson Lee', 'jackson.lee@email.com', 150.75, 'Processing', '2024-05-23');

-- Link items to a transaction
INSERT INTO transaction_items (transaction_id, item_id, quantity, price_at_time) VALUES
(1, 2, 1, 199.99), -- Hyper-Flux Capacitor
(1, 1, 1, 49.99); -- Laser-Guided Widget
