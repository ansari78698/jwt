<?php
	
	include_once './database.php';

	header("Access-Control-Allow-Origin: * ");
	header("Content-Type: application/json; charset=UTF-8");
	header("Access-Control-Allow-Methods: POST");
	header("Access-Control-Max-Age: 3600");
	header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

	$databaseService = new DatabaseService();
	$conn = $databaseService->getConnection();

	$data = json_decode(file_get_contents("php://input"));
	$mydata = json_decode(base64_decode(str_replace('_', '/', str_replace('-','+',explode('.', $data->toekn)[1]))));

	$stmt = $conn->query("SELECT * FROM users WHERE id= ".$mydata->data->id."  LIMIT 1");
	$user = $stmt->fetch();
	$data = array(
				'id' => $user['id'],
				'firstname' => $user['first_name'],
				'lastname' => $user['last_name'],
				'email' => $user['email'],
				'dob' => $user['dob'],
				'phone' => $user['phone']
			);
	echo json_encode($data);
?>