-- Drop tables if they exist to avoid conflicts
DROP TABLE IF EXISTS kyc_verifications;
DROP TABLE IF EXISTS achievements;
DROP TABLE IF EXISTS commissions;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS product_inventory;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS network_positions;
DROP TABLE IF EXISTS user_settings;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS ranks;

-- Create ranks table
CREATE TABLE ranks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  qualification_volume INT NOT NULL,
  commission_rate DECIMAL(5,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  city VARCHAR(50),
  state VARCHAR(50),
  country VARCHAR(50),
  postal_code VARCHAR(20),
  sponsor_id INT,
  rank_id INT DEFAULT 1,
  status ENUM('active', 'inactive', 'suspended') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (sponsor_id) REFERENCES users(id) ON DELETE SET NULL,
  FOREIGN KEY (rank_id) REFERENCES ranks(id)
);

-- Create user_settings table
CREATE TABLE user_settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  email_notifications BOOLEAN DEFAULT TRUE,
  sms_notifications BOOLEAN DEFAULT FALSE,
  team_updates BOOLEAN DEFAULT TRUE,
  commission_alerts BOOLEAN DEFAULT TRUE,
  rank_changes BOOLEAN DEFAULT TRUE,
  promotions BOOLEAN DEFAULT FALSE,
  two_factor_auth BOOLEAN DEFAULT FALSE,
  login_alerts BOOLEAN DEFAULT TRUE,
  session_timeout INT DEFAULT 30,
  payment_method ENUM('direct_deposit', 'paypal', 'check') DEFAULT 'direct_deposit',
  account_name VARCHAR(100),
  account_number VARCHAR(50),
  routing_number VARCHAR(50),
  auto_withdraw BOOLEAN DEFAULT FALSE,
  min_withdraw_amount DECIMAL(10,2) DEFAULT 100.00,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create network_positions table (binary tree structure)
CREATE TABLE network_positions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  parent_id INT,
  position ENUM('left', 'right') NOT NULL,
  left_child_id INT,
  right_child_id INT,
  left_volume DECIMAL(15,2) DEFAULT 0.00,
  right_volume DECIMAL(15,2) DEFAULT 0.00,
  total_volume DECIMAL(15,2) DEFAULT 0.00,
  level INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES network_positions(id) ON DELETE SET NULL,
  FOREIGN KEY (left_child_id) REFERENCES network_positions(id) ON DELETE SET NULL,
  FOREIGN KEY (right_child_id) REFERENCES network_positions(id) ON DELETE SET NULL
);

-- Create products table
CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  pv INT NOT NULL COMMENT 'Product Volume for commission calculations',
  category VARCHAR(50) NOT NULL,
  image_url VARCHAR(255),
  status ENUM('active', 'inactive', 'out_of_stock') DEFAULT 'active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create product_inventory table
CREATE TABLE product_inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  product_id INT NOT NULL,
  quantity INT NOT NULL DEFAULT 0,
  last_restock_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Create orders table
CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  total_pv INT NOT NULL,
  status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
  shipping_address TEXT,
  shipping_city VARCHAR(50),
  shipping_state VARCHAR(50),
  shipping_country VARCHAR(50),
  shipping_postal_code VARCHAR(20),
  tracking_number VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create order_items table
CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  quantity INT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  pv INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Create commissions table
CREATE TABLE commissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  order_id INT,
  amount DECIMAL(10,2) NOT NULL,
  type ENUM('direct', 'binary', 'matching', 'leadership', 'fast_start', 'rank_advancement') NOT NULL,
  status ENUM('pending', 'approved', 'paid', 'rejected') DEFAULT 'pending',
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE SET NULL
);

-- Create achievements table
CREATE TABLE achievements (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  type ENUM('rank', 'team', 'sales', 'bonus') NOT NULL,
  achieved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create kyc_verifications table
CREATE TABLE kyc_verifications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  reference_id VARCHAR(50) UNIQUE NOT NULL,
  id_document_url VARCHAR(255),
  address_document_url VARCHAR(255),
  selfie_url VARCHAR(255),
  status ENUM('not_started', 'pending', 'verified', 'rejected') DEFAULT 'not_started',
  document_submission_status ENUM('not_started', 'in_progress', 'completed', 'failed') DEFAULT 'not_started',
  initial_review_status ENUM('not_started', 'in_progress', 'completed', 'failed') DEFAULT 'not_started',
  identity_verification_status ENUM('not_started', 'in_progress', 'completed', 'failed') DEFAULT 'not_started',
  address_verification_status ENUM('not_started', 'in_progress', 'completed', 'failed') DEFAULT 'not_started',
  final_approval_status ENUM('not_started', 'in_progress', 'completed', 'failed') DEFAULT 'not_started',
  rejection_reason TEXT,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create communications table
CREATE TABLE communications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sender_id INT NOT NULL,
  message TEXT NOT NULL,
  is_system BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create user_communications table (for tracking read status)
CREATE TABLE user_communications (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  communication_id INT NOT NULL,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (communication_id) REFERENCES communications(id) ON DELETE CASCADE
);

-- Insert sample data

-- Insert ranks
INSERT INTO ranks (name, qualification_volume, commission_rate) VALUES
('New', 0, 5.00),
('Bronze', 1000, 7.00),
('Silver', 3000, 9.00),
('Gold', 7000, 12.00),
('Platinum', 15000, 15.00),
('Diamond', 30000, 18.00),
('Blue Diamond', 50000, 20.00),
('Black Diamond', 100000, 25.00);

-- Insert admin user (password: admin)
INSERT INTO users (username, email, password, first_name, last_name, phone, address, city, state, country, postal_code, rank_id, status) VALUES
('admin', 'admin@matwix.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Admin', 'User', '+1234567890', '123 Admin St', 'Admin City', 'Admin State', 'USA', '12345', 8, 'active');

-- Insert sample users
INSERT INTO users (username, email, password, first_name, last_name, phone, address, city, state, country, postal_code, sponsor_id, rank_id, status) VALUES
('john', 'john@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'John', 'Doe', '+1987654321', '456 Main St', 'New York', 'NY', 'USA', '10001', 1, 4, 'active'),
('sarah', 'sarah@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Sarah', 'Johnson', '+1122334455', '789 Oak Ave', 'Los Angeles', 'CA', 'USA', '90001', 1, 3, 'active'),
('michael', 'michael@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Michael', 'Chen', '+1555666777', '101 Pine St', 'Chicago', 'IL', 'USA', '60601', 2, 2, 'active'),
('jessica', 'jessica@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Jessica', 'Williams', '+1777888999', '202 Maple Dr', 'Houston', 'TX', 'USA', '77001', 2, 2, 'active'),
('david', 'david@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'David', 'Rodriguez', '+1333444555', '303 Cedar Ln', 'Miami', 'FL', 'USA', '33101', 3, 1, 'active'),
('emily', 'emily@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Emily', 'Taylor', '+1444555666', '404 Birch Rd', 'Seattle', 'WA', 'USA', '98101', 3, 1, 'active'),
('robert', 'robert@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Robert', 'Kim', '+1666777888', '505 Elm Blvd', 'Boston', 'MA', 'USA', '02101', 4, 1, 'active'),
('lisa', 'lisa@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Lisa', 'Garcia', '+1888999000', '606 Walnut Ave', 'Denver', 'CO', 'USA', '80201', 4, 1, 'active'),
('james', 'james@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'James', 'Brown', '+1222333444', '707 Spruce St', 'Atlanta', 'GA', 'USA', '30301', 5, 1, 'active'),
('jennifer', 'jennifer@example.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Jennifer', 'Martinez', '+1999000111', '808 Aspen Ct', 'Phoenix', 'AZ', 'USA', '85001', 5, 1, 'active');

-- Insert user settings
INSERT INTO user_settings (user_id, email_notifications, sms_notifications, team_updates, commission_alerts, rank_changes, promotions, two_factor_auth, login_alerts, session_timeout, payment_method, account_name, account_number, routing_number, auto_withdraw, min_withdraw_amount) VALUES
(1, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, TRUE, 60, 'direct_deposit', 'Admin User', '****1234', '****5678', FALSE, 100.00),
(2, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE, 30, 'direct_deposit', 'John Doe', '****2345', '****6789', TRUE, 50.00),
(3, TRUE, TRUE, TRUE, TRUE, TRUE, TRUE, FALSE, TRUE, 45, 'paypal', 'Sarah Johnson', NULL, NULL, FALSE, 100.00),
(4, TRUE, FALSE, TRUE, TRUE, FALSE, FALSE, FALSE, FALSE, 30, 'direct_deposit', 'Michael Chen', '****3456', '****7890', FALSE, 100.00),
(5, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE, 30, 'check', 'Jessica Williams', NULL, NULL, FALSE, 100.00),
(6, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE, 30, 'direct_deposit', 'David Rodriguez', '****4567', '****8901', FALSE, 100.00),
(7, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE, 30, 'direct_deposit', 'Emily Taylor', '****5678', '****9012', FALSE, 100.00),
(8, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE, 30, 'paypal', 'Robert Kim', NULL, NULL, FALSE, 100.00),
(9, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE, 30, 'direct_deposit', 'Lisa Garcia', '****6789', '****0123', FALSE, 100.00),
(10, TRUE, FALSE, TRUE, TRUE, TRUE, FALSE, FALSE, TRUE, 30, 'direct_deposit', 'James Brown', '****7890', '****1234', FALSE, 100.00);

-- Insert network positions (binary tree structure)
INSERT INTO network_positions (user_id, parent_id, position, left_volume, right_volume, total_volume, level) VALUES
(1, NULL, 'left', 25000.00, 18000.00, 43000.00, 1); -- Admin (root)

-- Insert level 2
INSERT INTO network_positions (user_id, parent_id, position, left_volume, right_volume, total_volume, level) VALUES
(2, 1, 'left', 12000.00, 8000.00, 20000.00, 2), -- John (left of Admin)
(3, 1, 'right', 10000.00, 5000.00, 15000.00, 2); -- Sarah (right of Admin)

-- Update parent's children
UPDATE network_positions SET left_child_id = 2, right_child_id = 3 WHERE id = 1;

-- Insert level 3
INSERT INTO network_positions (user_id, parent_id, position, left_volume, right_volume, total_volume, level) VALUES
(4, 2, 'left', 5000.00, 3000.00, 8000.00, 3), -- Michael (left of John)
(5, 2, 'right', 4000.00, 2000.00, 6000.00, 3), -- Jessica (right of John)
(6, 3, 'left', 6000.00, 2000.00, 8000.00, 3), -- David (left of Sarah)
(7, 3, 'right', 3000.00, 1000.00, 4000.00, 3); -- Emily (right of Sarah)

-- Update parents' children
UPDATE network_positions SET left_child_id = 4, right_child_id = 5 WHERE id = 2;
UPDATE network_positions SET left_child_id = 6, right_child_id = 7 WHERE id = 3;

-- Insert level 4
INSERT INTO network_positions (user_id, parent_id, position, left_volume, right_volume, total_volume, level) VALUES
(8, 4, 'left', 2000.00, 1000.00, 3000.00, 4), -- Robert (left of Michael)
(9, 4, 'right', 1500.00, 500.00, 2000.00, 4), -- Lisa (right of Michael)
(10, 6, 'left', 1000.00, 500.00, 1500.00, 4); -- James (left of David)

-- Update parents' children
UPDATE network_positions SET left_child_id = 8, right_child_id = 9 WHERE id = 4;
UPDATE network_positions SET left_child_id = 10, right_child_id = NULL WHERE id = 6;

-- Insert products
INSERT INTO products (name, description, price, pv, category, image_url, status) VALUES
('Matwix Essential Starter Kit', 'Everything you need to get started with Matwix business opportunity.', 199.99, 100, 'Business Kits', '/products/starter-kit.jpg', 'active'),
('Matwix Premium Business Package', 'Advanced business tools and training materials for serious entrepreneurs.', 499.99, 300, 'Business Kits', '/products/premium-package.jpg', 'active'),
('Matwix Elite Success System', 'Complete system with all tools, training, and support for maximum success.', 999.99, 600, 'Business Kits', '/products/elite-system.jpg', 'active'),
('Daily Wellness Supplement', 'Essential vitamins and minerals for everyday health.', 39.99, 25, 'Health', '/products/wellness-supplement.jpg', 'active'),
('Immune Support Formula', 'Powerful blend of ingredients to support immune system function.', 49.99, 30, 'Health', '/products/immune-support.jpg', 'active'),
('Energy Boost Complex', 'Natural formula to enhance energy and reduce fatigue.', 44.99, 28, 'Health', '/products/energy-boost.jpg', 'active'),
('Weight Management System', 'Complete system for healthy weight management and metabolism support.', 129.99, 80, 'Health', '/products/weight-management.jpg', 'active'),
('Anti-Aging Serum', 'Advanced formula to reduce signs of aging and improve skin appearance.', 89.99, 55, 'Beauty', '/products/anti-aging-serum.jpg', 'active'),
('Hydrating Facial Cream', 'Deep hydration for all skin types with natural ingredients.', 59.99, 35, 'Beauty', '/products/facial-cream.jpg', 'active'),
('Revitalizing Shampoo & Conditioner Set', 'Premium hair care system for healthier, shinier hair.', 49.99, 30, 'Beauty', '/products/hair-care-set.jpg', 'active'),
('Home Purification System', 'Advanced air and water purification for a healthier home environment.', 299.99, 180, 'Home', '/products/purification-system.jpg', 'active'),
('Eco-Friendly Cleaning Kit', 'Complete set of non-toxic, environmentally friendly cleaning products.', 79.99, 50, 'Home', '/products/cleaning-kit.jpg', 'active');

-- Insert product inventory
INSERT INTO product_inventory (product_id, quantity, last_restock_date) VALUES
(1, 250, NOW() - INTERVAL 7 DAY),
(2, 150, NOW() - INTERVAL 7 DAY),
(3, 75, NOW() - INTERVAL 7 DAY),
(4, 500, NOW() - INTERVAL 14 DAY),
(5, 450, NOW() - INTERVAL 14 DAY),
(6, 400, NOW() - INTERVAL 14 DAY),
(7, 200, NOW() - INTERVAL 14 DAY),
(8, 300, NOW() - INTERVAL 21 DAY),
(9, 350, NOW() - INTERVAL 21 DAY),
(10, 250, NOW() - INTERVAL 21 DAY),
(11, 100, NOW() - INTERVAL 28 DAY),
(12, 200, NOW() - INTERVAL 28 DAY);

-- Insert orders
INSERT INTO orders (user_id, order_number, total_amount, total_pv, status, payment_status, shipping_address, shipping_city, shipping_state, shipping_country, shipping_postal_code, tracking_number, created_at) VALUES
(2, 'ORD-10001', 699.98, 400, 'delivered', 'paid', '456 Main St', 'New York', 'NY', 'USA', '10001', 'TRK123456789', NOW() - INTERVAL 60 DAY),
(3, 'ORD-10002', 999.99, 600, 'delivered', 'paid', '789 Oak Ave', 'Los Angeles', 'CA', 'USA', '90001', 'TRK234567890', NOW() - INTERVAL 55 DAY),
(4, 'ORD-10003', 199.99, 100, 'delivered', 'paid', '101 Pine St', 'Chicago', 'IL', 'USA', '60601', 'TRK345678901', NOW() - INTERVAL 50 DAY),
(5, 'ORD-10004', 499.99, 300, 'delivered', 'paid', '202 Maple Dr', 'Houston', 'TX', 'USA', '77001', 'TRK456789012', NOW() - INTERVAL 45 DAY),
(2, 'ORD-10005', 134.97, 83, 'delivered', 'paid', '456 Main St', 'New York', 'NY', 'USA', '10001', 'TRK567890123', NOW() - INTERVAL 40 DAY),
(3, 'ORD-10006', 169.97, 105, 'delivered', 'paid', '789 Oak Ave', 'Los Angeles', 'CA', 'USA', '90001', 'TRK678901234', NOW() - INTERVAL 35 DAY),
(6, 'ORD-10007', 199.99, 100, 'delivered', 'paid', '303 Cedar Ln', 'Miami', 'FL', 'USA', '33101', 'TRK789012345', NOW() - INTERVAL 30 DAY),
(7, 'ORD-10008', 199.99, 100, 'delivered', 'paid', '404 Birch Rd', 'Seattle', 'WA', 'USA', '98101', 'TRK890123456', NOW() - INTERVAL 25 DAY),
(8, 'ORD-10009', 199.99, 100, 'delivered', 'paid', '505 Elm Blvd', 'Boston', 'MA', 'USA', '02101', 'TRK901234567', NOW() - INTERVAL 20 DAY),
(9, 'ORD-10010', 199.99, 100, 'delivered', 'paid', '606 Walnut Ave', 'Denver', 'CO', 'USA', '80201', 'TRK012345678', NOW() - INTERVAL 15 DAY),
(10, 'ORD-10011', 199.99, 100, 'delivered', 'paid', '707 Spruce St', 'Atlanta', 'GA', 'USA', '30301', 'TRK123456789', NOW() - INTERVAL 10 DAY),
(2, 'ORD-10012', 379.98, 235, 'shipped', 'paid', '456 Main St', 'New York', 'NY', 'USA', '10001', 'TRK234567890', NOW() - INTERVAL 5 DAY),
(3, 'ORD-10013', 299.99, 180, 'processing', 'paid', '789 Oak Ave', 'Los Angeles', 'CA', 'USA', '90001', NULL, NOW() - INTERVAL 2 DAY),
(4, 'ORD-10014', 79.99, 50, 'pending', 'pending', '101 Pine St', 'Chicago', 'IL', 'USA', '60601', NULL, NOW() - INTERVAL 1 DAY);

-- Insert order items
INSERT INTO order_items (order_id, product_id, quantity, price, pv) VALUES
(1, 1, 1, 199.99, 100),
(1, 2, 1, 499.99, 300),
(2, 3, 1, 999.99, 600),
(3, 1, 1, 199.99, 100),
(4, 2, 1, 499.99, 300),
(5, 4, 1, 39.99, 25),
(5, 5, 1, 49.99, 30),
(5, 6, 1, 44.99, 28),
(6, 8, 1, 89.99, 55),
(6, 9, 1, 59.99, 35),
(6, 10, 1, 49.99, 30),
(7, 1, 1, 199.99, 100),
(8, 1, 1, 199.99, 100),
(9, 1, 1, 199.99, 100),
(10, 1, 1, 199.99, 100),
(11, 1, 1, 199.99, 100),
(12, 8, 1, 89.99, 55),
(12, 9, 1, 59.99, 35),
(12, 10, 1, 49.99, 30),
(12, 12, 1, 79.99, 50),
(12, 4, 2, 39.99, 25),
(12, 5, 1, 49.99, 30),
(13, 11, 1, 299.99, 180),
(14, 12, 1, 79.99, 50);

-- Insert commissions
INSERT INTO commissions (user_id, order_id, amount, type, status, description, created_at) VALUES
(1, 1, 70.00, 'direct', 'paid', 'Direct commission from order #ORD-10001', NOW() - INTERVAL 59 DAY),
(1, 2, 120.00, 'direct', 'paid', 'Direct commission from order #ORD-10002', NOW() - INTERVAL 54 DAY),
(1, 3, 20.00, 'direct', 'paid', 'Direct commission from order #ORD-10003', NOW() - INTERVAL 49 DAY),
(1, 4, 60.00, 'direct', 'paid', 'Direct commission from order #ORD-10004', NOW() - INTERVAL 44 DAY),
(2, 3, 10.00, 'direct', 'paid', 'Direct commission from order #ORD-10003', NOW() - INTERVAL 49 DAY),
(2, 5, 13.50, 'direct', 'paid', 'Direct commission from order #ORD-10005', NOW() - INTERVAL 39 DAY),
(3, 6, 17.00, 'direct', 'paid', 'Direct commission from order #ORD-10006', NOW() - INTERVAL 34 DAY),
(2, 7, 20.00, 'direct', 'paid', 'Direct commission from order #ORD-10007', NOW() - INTERVAL 29 DAY),
(3, 8, 20.00, 'direct', 'paid', 'Direct commission from order #ORD-10008', NOW() - INTERVAL 24 DAY),
(4, 9, 20.00, 'direct', 'paid', 'Direct commission from order #ORD-10009', NOW() - INTERVAL 19 DAY),
(4, 10, 20.00, 'direct', 'paid', 'Direct commission from order #ORD-10010', NOW() - INTERVAL 14 DAY),
(6, 11, 20.00, 'direct', 'paid', 'Direct commission from order #ORD-10011', NOW() - INTERVAL 9 DAY),
(1, NULL, 500.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 56 DAY),
(1, NULL, 450.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 49 DAY),
(1, NULL, 525.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 42 DAY),
(1, NULL, 475.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 35 DAY),
(1, NULL, 550.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 28 DAY),
(1, NULL, 500.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 21 DAY),
(1, NULL, 525.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 14 DAY),
(1, NULL, 575.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 7 DAY),
(2, NULL, 250.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 56 DAY),
(2, NULL, 225.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 49 DAY),
(2, NULL, 275.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 42 DAY),
(2, NULL, 240.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 35 DAY),
(2, NULL, 260.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 28 DAY),
(2, NULL, 230.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 21 DAY),
(2, NULL, 270.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 14 DAY),
(2, NULL, 280.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 7 DAY),
(3, NULL, 200.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 56 DAY),
(3, NULL, 180.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 49 DAY),
(3, NULL, 220.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 42 DAY),
(3, NULL, 190.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 35 DAY),
(3, NULL, 210.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 28 DAY),
(3, NULL, 185.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 21 DAY),
(3, NULL, 215.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 14 DAY),
(3, NULL, 225.00, 'binary', 'paid', 'Weekly binary commission payout', NOW() - INTERVAL 7 DAY),
(1, NULL, 100.00, 'leadership', 'paid', 'Monthly leadership bonus', NOW() - INTERVAL 60 DAY),
(1, NULL, 100.00, 'leadership', 'paid', 'Monthly leadership bonus', NOW() - INTERVAL 30 DAY),
(2, NULL, 75.00, 'leadership', 'paid', 'Monthly leadership bonus', NOW() - INTERVAL 60 DAY),
(2, NULL, 75.00, 'leadership', 'paid', 'Monthly leadership bonus', NOW() - INTERVAL 30 DAY),
(1, NULL, 200.00, 'rank_advancement', 'paid', 'Rank advancement bonus to Diamond', NOW() - INTERVAL 90 DAY),
(2, NULL, 100.00, 'rank_advancement', 'paid', 'Rank advancement bonus to Gold', NOW() - INTERVAL 60 DAY),
(3, NULL, 50.00, 'rank_advancement', 'paid', 'Rank advancement bonus to Silver', NOW() - INTERVAL 45 DAY);

-- Insert achievements
INSERT INTO achievements (user_id, title, description, type, achieved_at) VALUES
(1, 'Black Diamond Rank Achieved', 'Congratulations on reaching Black Diamond rank!', 'rank', NOW() - INTERVAL 90 DAY),
(2, 'Gold Rank Achieved', 'Congratulations on reaching Gold rank!', 'rank', NOW() - INTERVAL 60 DAY),
(3, 'Silver Rank Achieved', 'Congratulations on reaching Silver rank!', 'rank', NOW() - INTERVAL 45 DAY),
(4, 'Bronze Rank Achieved', 'Congratulations on reaching Bronze rank!', 'rank', NOW() - INTERVAL 30 DAY),
(5, 'Bronze Rank Achieved', 'Congratulations on reaching Bronze rank!', 'rank', NOW() - INTERVAL 30 DAY),
(1, 'Team Size Milestone', 'Your team has grown to 100+ members', 'team', NOW() - INTERVAL 75 DAY),
(2, 'Team Size Milestone', 'Your team has grown to 50+ members', 'team', NOW() - INTERVAL 45 DAY),
(3, 'Team Size Milestone', 'Your team has grown to 25+ members', 'team', NOW() - INTERVAL 30 DAY),
(1, 'Sales Leader Award', 'Top 1% in sales performance this quarter', 'sales', NOW() - INTERVAL 60 DAY),
(2, 'Sales Leader Award', 'Top 5% in sales performance this quarter', 'sales', NOW() - INTERVAL 60 DAY),
(3, 'Sales Leader Award', 'Top 10% in sales performance this quarter', 'sales', NOW() - INTERVAL 60 DAY),
(1, 'Fast Start Bonus', 'Qualified for the Fast Start Bonus program', 'bonus', NOW() - INTERVAL 120 DAY),
(2, 'Fast Start Bonus', 'Qualified for the Fast Start Bonus program', 'bonus', NOW() - INTERVAL 90 DAY),
(3, 'Fast Start Bonus', 'Qualified for the Fast Start Bonus program', 'bonus', NOW() - INTERVAL 75 DAY);

-- Insert KYC verifications
INSERT INTO kyc_verifications (user_id, reference_id, status, document_submission_status, initial_review_status, identity_verification_status, address_verification_status, final_approval_status, created_at) VALUES
(1, 'KYC-1234567890-ADMIN', 'verified', 'completed', 'completed', 'completed', 'completed', 'completed', NOW() - INTERVAL 100 DAY),
(2, 'KYC-2345678901-JOHN', 'verified', 'completed', 'completed', 'completed', 'completed', 'completed', NOW() - INTERVAL 85 DAY),
(3, 'KYC-3456789012-SARAH', 'verified', 'completed', 'completed', 'completed', 'completed', 'completed', NOW() - INTERVAL 70 DAY),
(4, 'KYC-4567890123-MICHAEL', 'pending', 'completed', 'in_progress', 'not_started', 'not_started', 'not_started', NOW() - INTERVAL 10 DAY),
(5, 'KYC-5678901234-JESSICA', 'rejected', 'completed', 'completed', 'failed', 'not_started', 'not_started', NOW() - INTERVAL 20 DAY);

-- Insert communications
INSERT INTO communications (sender_id, message, is_system, created_at) VALUES
(1, 'Welcome to Matwix! We are excited to have you join our community.', TRUE, NOW() - INTERVAL 100 DAY),
(1, 'New product launch webinar scheduled for next Tuesday at 7 PM EST. All team members should attend.', TRUE, NOW() - INTERVAL 30 DAY),
(2, 'Just recruited two new members! Looking forward to helping them get started.', FALSE, NOW() - INTERVAL 25 DAY),
(3, 'Has anyone tried the new sales presentation? Getting great results with it!', FALSE, NOW() - INTERVAL 20 DAY),
(4, 'Reminder: Team call tonight at 8 PM. We will be discussing the new compensation plan.', FALSE, NOW() - INTERVAL 15 DAY),
(1, 'Congratulations to our top performers this month! Check the leaderboard to see if you made the list.', TRUE, NOW() - INTERVAL 10 DAY),
(1, 'Important: System maintenance scheduled for this weekend. The platform will be unavailable from Saturday 2 AM to 4 AM EST.', TRUE, NOW() - INTERVAL 5 DAY);

-- Insert user communications (read status)
INSERT INTO user_communications (user_id, communication_id, is_read) VALUES
(1, 1, TRUE),
(2, 1, TRUE),
(3, 1, TRUE),
(4, 1, TRUE),
(5, 1, TRUE),
(6, 1, TRUE),
(7, 1, TRUE),
(8, 1, TRUE),
(9, 1, TRUE),
(10, 1, TRUE),
(1, 2, TRUE),
(2, 2, TRUE),
(3, 2, TRUE),
(4, 2, FALSE),
(5, 2, FALSE),
(6, 2, FALSE),
(7, 2, FALSE),
(8, 2, FALSE),
(9, 2, FALSE),
(10, 2, FALSE),
(1, 3, TRUE),
(2, 3, TRUE),
(3, 3, TRUE),
(4, 3, FALSE),
(5, 3, FALSE),
(1, 4, TRUE),
(2, 4, FALSE),
(3, 4, TRUE),
(4, 4, FALSE),
(5, 4, FALSE),
(1, 5, TRUE),
(2, 5, FALSE),
(3, 5, FALSE),
(4, 5, TRUE),
(5, 5, FALSE),
(1, 6, TRUE),
(2, 6, FALSE),
(3, 6, FALSE),
(4, 6, FALSE),
(5, 6, FALSE),
(6, 6, FALSE),
(7, 6, FALSE),
(8, 6, FALSE),
(9, 6, FALSE),
(10, 6, FALSE),
(1, 7, TRUE),
(2, 7, FALSE),
(3, 7, FALSE),
(4, 7, FALSE),
(5, 7, FALSE),
(6, 7, FALSE),
(7, 7, FALSE),
(8, 7, FALSE),
(9, 7, FALSE),
(10, 7, FALSE);
