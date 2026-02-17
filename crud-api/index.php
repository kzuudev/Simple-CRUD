<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);


require 'config/database.php';

$stmt = $pdo->query("SELECT * FROM users");
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);



?>