<?php

require 'config/headers.php';


ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'config/database.php';

if($_SERVER['REQUEST_METHOD'] === "POST") {

    $user = json_decode(file_get_contents(('php://input')), true);

    $name = $user['name'] ?? '';
    $email = $user['email'] ?? '';
    $phone = $user['phone'] ?? '';
    $address = $user['address'] ?? '';

    
    if(!empty($user['name'])) {

        // Query for sql database
        $sql = "INSERT INTO users (name, email, phone, address) VALUES (:name, :email, :phone, :address)";
        
        // Prepare the reusable SQL statement
        $stmt = $pdo->prepare($sql);
    
        // Bind the parameters to the SQL statement
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':address', $address);
        $stmt->execute();

        // Execute the statement and check if it was successful, otherwise return an error message
        if($stmt->execute()) {
            $response = [
                'status' => 'success',
                'message' => 'New client created successfully'
            ];
        }else {
            $response = [
                'status' => 'error',
                'message' => 'Failed to create new client'
            ];
        }

          // Return the response as JSON
          echo json_encode($response);
    }

    header('Location: index.php');
    exit;
}


?>