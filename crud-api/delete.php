<?php 


require 'config/headers.php';
require 'config/database.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);

if($_SERVER['REQUEST_METHOD'] === 'DELETE') {

  if(isset($_GET['id'])) {
        
    $id = $_GET['id'] ?? null;

    $sql = "DELETE FROM users WHERE id = :id";

    $stmt = $pdo->prepare($sql);
    $stmt->bindParam(':id', $id);
    $stmt->execute();   
   
     if($stmt->execute()) {
        $response = [
            'status' => 'success',
            'message' => 'User deleted successfully'
        ];
    }else {
        $response = [
            'status' => 'error',
            'message' => 'Failed to delete user'
        ];
    }

  }else {
    header("Location: index.php");
    exit;
  }
}




?>