-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
  document_id INT AUTO_INCREMENT PRIMARY KEY,
  booking_id INT NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  file_path VARCHAR(500) NOT NULL,
  file_type ENUM('passport', 'visa', 'photo', 'other') NOT NULL,
  file_size INT NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (booking_id) REFERENCES bookings(booking_id) ON DELETE CASCADE,
  INDEX idx_booking_id (booking_id),
  INDEX idx_file_type (file_type)
);

-- Add some sample data (optional)
-- INSERT INTO documents (booking_id, file_name, original_name, file_path, file_type, file_size, mime_type) VALUES
-- (1, 'passport-1234567890.jpg', 'passport.jpg', '/uploads/documents/passport-1234567890.jpg', 'passport', 1024000, 'image/jpeg'),
-- (1, 'visa-1234567891.pdf', 'visa.pdf', '/uploads/documents/visa-1234567891.pdf', 'visa', 2048000, 'application/pdf');

