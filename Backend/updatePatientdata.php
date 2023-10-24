<?php
include "config.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();

$user_id = $data['user_id'];
$patient_email_address = $data['patient_email_address'];
$patient_first_name = $data['patient_first_name'];
$patient_last_name = $data['patient_last_name'];
$patient_date_of_birth = $data['patient_date_of_birth'];
$patient_gender = $data['patient_gender'];
$patient_address = $data['patient_address'];
$patient_phone_no = $data['patient_phone_no'];
$patient_marital_status = $data['patient_marital_status'];
$patient_added_on = $data['patient_added_on'];

$q = mysqli_query($con,"UPDATE `patient_table` SET `patient_email_address`='$patient_email_address',`patient_first_name`='$patient_first_name',
                                                                        `patient_last_name`='$patient_last_name',`patient_date_of_birth`='$patient_date_of_birth',
                                                                        `patient_gender`='$patient_gender',`patient_address`='$patient_address',`patient_phone_no`='$patient_phone_no',
                                                                        `patient_marital_status`='$patient_marital_status' WHERE user_id = $user_id");

$p = mysqli_query($con, "UPDATE `log_in` SET `email`='$patient_email_address' WHERE user_id = $user_id");

if($q1 && $q2){
    http_response_code(201);
    $message['status'] = "Success";
}else{
    http_response_code(422);
    $message['status'] = "Error";
}

echo json_encode($message);
echo mysqli_error($con);
?>