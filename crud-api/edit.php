<?php 


require 'config/headers.php';
require 'config/database.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);




if($_SERVER['REQUEST_METHOD'] === 'GET') {


    // if(isset($_GET['id'])) {
    //     header("Location: index.php");  
    //     exit;
    // }

    $id = $_GET['id'];
    $path = explode('/', $_SERVER['REQUEST_URI']);
    print_r($path);
    exit;
    $stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
    $stmt->execute(['id' => $id]);
    $row = $stmt->fetch(PDO::FETCH_ASSOC);


}else {

    $id = $_POST['id'] ?? null;
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $address = $_POST['address'] ?? '';

    var_dump($id);
    var_dump($name);
    var_dump($phone);
    var_dump($email);
    var_dump($address);

}


?>

