<?php

require 'config/headers.php';
require 'config/database.php';

ini_set('display_errors', 1);
error_reporting(E_ALL);




$stmt = $pdo->query("SELECT * FROM users ORDER BY created_at ASC");
$users = $stmt->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($users);