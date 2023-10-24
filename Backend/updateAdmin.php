<?php
include "config.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();

$user_id = $data['user_id'];
$hospital_email = $data['hospital_email'];
$admin_name = $data['admin_name'];
$hospital_name = $data['hospital_name'];
$hospital_address = $data['hospital_address'];
$hospital_contact_no = $data['hospital_contact_no'];

$p = mysqli_query($con, "UPDATE `log_in` SET `email`='$hospital_email' WHERE user_id = $user_id");

// $q = mysqli_query($con,"INSERT INTO `admin_table`(`hospital_email`, `admin_name`, `hospital_name`, `hospital_address`, `hospital_contact_no`) 
//                                 VALUES ('$hospital_email','$admin_name','$hospital_name','$hospital_address',$hospital_contact_no)");


$q = mysqli_query($con,"UPDATE `admin_table` SET `hospital_email`='$hospital_email',`admin_name`='$admin_name',`hospital_name`='$hospital_name',`hospital_address`='$hospital_address',`hospital_contact_no`= $hospital_contact_no  WHERE user_id = $user_id");

if($q && $q){
    http_response_code(201);
    $message['status'] = "Success";
}else{
    http_response_code(422);
    $message['status'] = "Error";
}

echo json_encode($message);
echo mysqli_error($con);
?>