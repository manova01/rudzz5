<?php
// api/config/database.php

class Database {
    private $host = "localhost";
    private $db_name = "rudzz_marketplace";
    private $username = "root";
    private $password = "";
    private $conn;
    
    // Get database connection
    public function getConnection() {
        $this->conn = null;
        
        try {
            $this->conn = new mysqli($this->host, $this->username, $this->password, $this->db_name);
            $this->conn->set_charset("utf8");
        } catch(Exception $e) {
            echo "Connection error: " . $e->getMessage();
        }
        
        return $this->conn;
    }
}
?>

