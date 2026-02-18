<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

require 'config/database.php';

if($_SERVER['REQUEST_METHOD'] === "POST") {

    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $address = $_POST['address'];


    if(!empty($name)) {

        $sql = "INSERT INTO users (name, email, phone, address) VALUES (:name, :email, :phone, :address)";
        
        $stmt = $pdo->prepare($sql);
        $stmt->execute([':name' => $name, ':email' => $email, ':phone' => $phone, ':address' => $address]);

        echo '<alert>New Client Created</alert>';
        header('Location: index.php');

        exit;
    }
}


?>