<?php
include "config.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();

$user_id = $data['user_id'];
$service_id = $data['service_provided'];
$doctor_email_address = $data['doctor_email_address'];
$doctor_name = $data['doctor_name'];
$doctor_phone_no = $data['doctor_phone_no'];
$doctor_address = $data['doctor_address'];
$doctor_date_of_birth = $data['doctor_date_of_birth'];
$doctor_degree = $data['doctor_degree'];
$doctor_expert_in = $data['doctor_expert_in'];
$doctor_added_on = date("Y/m/d");


$q = mysqli_query($con, "INSERT INTO `doctor_table`(`user_id`,`service_id`, `doctor_email_address`, `doctor_name`, `doctor_phone_no`, `doctor_address`, `doctor_date_of_birth`,`doctor_degree`, `doctor_expert_in`, `doctor_added_on`) 
                            VALUES ($user_id,$service_id,'$doctor_email_address','$doctor_name','$doctor_phone_no','$doctor_address','$doctor_date_of_birth','$doctor_degree','$doctor_expert_in','$doctor_added_on')");

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