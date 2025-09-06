-- Migration: Add stock_history and activity_log tables

CREATE TABLE stock_history (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_id INT NOT NULL,
  date DATE NOT NULL,
  stock_level INT NOT NULL,
  sales INT DEFAULT 0,
  CONSTRAINT fk_stock_item FOREIGN KEY (item_id) REFERENCES Items(id)
);

CREATE TABLE activity_log (
  id INT AUTO_INCREMENT PRIMARY KEY,
  item_id INT NOT NULL,
  date DATETIME NOT NULL,
  user VARCHAR(255),
  action VARCHAR(255),
  quantity INT,
  details TEXT,
  CONSTRAINT fk_activity_item FOREIGN KEY (item_id) REFERENCES Items(id)
);
