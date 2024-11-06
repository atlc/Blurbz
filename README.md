```sql
CREATE TABLE Users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(128) UNIQUE,
  password CHAR(60),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Blurbz (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  content VARCHAR(512),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  edited_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES Users(id)
);
```