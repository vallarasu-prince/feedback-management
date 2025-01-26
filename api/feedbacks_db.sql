-- Users Table
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Feedback Table
CREATE TABLE feedbacks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    platform VARCHAR(100),
    module VARCHAR(100),
    description TEXT,
    attachments VARCHAR(255),
    tags VARCHAR(255),
    status VARCHAR(255),
    user VARCHAR(255),
    votes INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Log Table
CREATE TABLE logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    action VARCHAR(255),
    details TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tracking Table
CREATE TABLE tracking (
    id INT AUTO_INCREMENT PRIMARY KEY,
    api_endpoint VARCHAR(255) NOT NULL,
    method VARCHAR(10) NOT NULL,
    request_body TEXT,
    response_body TEXT,
    status_code INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
