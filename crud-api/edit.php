<?php 


require 'config/headers.php';
require 'config/database.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);


if($_SERVER['REQUEST_METHOD'] === 'GET') {


    if(isset($_GET['id'])) {
       
        $id = $_GET['id'] ?? null;
  
        // $path = explode('/', $_SERVER['REQUEST_URI']);
        // print_r($path);

        if(isset($id) && is_numeric($id)) {
            $stmt = $pdo->prepare("SELECT * FROM users WHERE id = :id");
            $stmt->bindParam(':id', $id);
            $stmt->execute();
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            echo json_encode($user);
            exit;
        }else {
            $stmt = $pdo->prepare("SELECT * FROM users");
            $stmt->execute();
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($users);
            exit;
        }
    }

}else {

    $id = $_POST['id'] ?? null;
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $phone = $_POST['phone'] ?? '';
    $address = $_POST['address'] ?? '';

    $user = json_decode(file_get_contents('php://input'));
    
    echo $user->name;

    // Query for sql database
    $sql = "UPDATE users SET name = :name, email = :email, phone = :phone, address = :address, updated_at = :updated_at WHERE id = :id";

    // Prepare the reusable SQL statement
    $stmt = $pdo->prepare($sql);
 
    // Bind the parameters to the SQL statement
    $stmt->bindParam(':name', $user->name);
    $stmt->bindParam(':email', $user->email);
    $stmt->bindParam(':phone', $user->phone);
    $stmt->bindParam(':address', $user->address);
    $stmt->bindParam(':updated_at', $user->updated_at);
    $stmt->bindParam(':id', $user->id);
    $stmt->execute();

    if($stmt->execute()) {
        $response = [
            'status' => 'success',
            'message' => 'User updated successfully'
        ];
    }else {
        $response = [
            'status' => 'error',
            'message' => 'Failed to update user'
        ];
    }

    exit;



}


?>

