<?php
include "config.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();

$user_id = $data['user_id'];
$patient_email_address = $data['email_address'];
$user_id = $data['user_id'];
$patient_first_name = $data['first_name'];
$patient_last_name = $data['last_name'];
$patient_date_of_birth = $data['date_of_birth'];
$patient_gender = $data['gender'];
$patient_address = $data['address'];
$patient_phone_no = $data['phone_no'];
$patient_added_on = date("Y/m/d");
$patient_marital_status = $data['patient_marital_status'];


$q = mysqli_query($con,"INSERT INTO `patient_table`(`user_id`, `patient_email_address`, `patient_first_name`, `patient_last_name`, `patient_date_of_birth`, `patient_gender`, `patient_address`, `patient_phone_no`, `patient_marital_status`, `patient_added_on`) 
                                             VALUES ($user_id,'$patient_email_address','$patient_first_name','$patient_last_name','$patient_date_of_birth','$patient_gender','$patient_address','$patient_phone_no','$patient_marital_status','$patient_added_on')");

if($q){
    http_response_code(201);
    $message['status'] = "Success";
}else{
    http_response_code(422);
    $message['status'] = "Error";
}

echo json_encode($message);
echo mysqli_error($con);
?>