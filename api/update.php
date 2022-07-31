<?php
include_once './database.php';

header("Access-Control-Allow-Origin: * ");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$firstName = '';
$lastName = '';
$dob = '';
$phone = '';
$password = '';
$conn = null;

$databaseService = new DatabaseService();
$conn = $databaseService->getConnection();

$data = json_decode(file_get_contents("php://input"));

$firstName = $data->fname;
$lastName = $data->lname;
$dob = $data->dob;
$phone = $data->phone;
$password = $data->password;
$id = $data->id;

$query = "UPDATE Users
                SET first_name = :firstname,
                    last_name = :lastname,
                    dob = :dob,
                    phone = :phone,
                    password = :password 
                WHERE id= :id
        ";

$stmt = $conn->prepare($query);

$stmt->bindParam(':firstname', $firstName);
$stmt->bindParam(':lastname', $lastName);
$stmt->bindParam(':dob', $dob);
$stmt->bindParam(':phone', $phone);
$password_hash = password_hash($password, PASSWORD_BCRYPT);
$stmt->bindParam(':password', $password_hash);
$stmt->bindParam(':id', $id);


if($stmt->execute()){

    http_response_code(200);
    echo json_encode(array("message" => "User was successfully Updated."));
}
else{
    http_response_code(400);
    echo json_encode(array("message" => "Unable to update the user."));
}
?>