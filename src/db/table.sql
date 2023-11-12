-- Drop the 'OrderDetails' table if it exists
DROP TABLE IF EXISTS OrderDetails;

-- Drop the 'Orders' table if it exists
DROP TABLE IF EXISTS Orders;

-- Drop the 'users' table if it exists
DROP TABLE IF EXISTS users;

-- Drop the 'products' table if it exists
DROP TABLE IF EXISTS products;

-- Drop the 'categorys' table if it exists
DROP TABLE IF EXISTS categorys;

-- Recreate the tables
CREATE TABLE
  IF NOT EXISTS categorys (
    id INT PRIMARY KEY,
    categoryName VARCHAR(50) NOT NULL
  );

CREATE TABLE
  IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categorys (id)
  );

CREATE TABLE
  IF NOT EXISTS users (
    id INT PRIMARY KEY,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  );

CREATE TABLE
  IF NOT EXISTS Orders (
    id INT PRIMARY KEY,
    user_id INT,
    status VARCHAR(20) CHECK (status IN ('active', 'complete')),
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );

CREATE TABLE
  IF NOT EXISTS OrderDetails (
    id INT PRIMARY KEY,
    order_id INT,
    product_id INT,
    quantity INT,
    FOREIGN KEY (order_id) REFERENCES Orders (id),
    FOREIGN KEY (product_id) REFERENCES products (id)
  );