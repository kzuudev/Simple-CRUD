<?php 

$server = 'localhost';
$dbname = 'react-crud';
$user = 'root';
$password = '';


try {

    $pdo = new PDO("mysql:host=$server;dbname=$dbname;charset=utf8mb4", $user, $password);    
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "Connected successfully";

}catch(PDOException $e){
    echo "Database Error: " . $e->getMessage();
}





?>