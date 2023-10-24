<?php
include "config.php";


$input = file_get_contents('php://input');
$data = json_decode($input,true);
$message = array();

$doctor_id = $data['doctor_id'];
$patient_id = $data['patient_id'];
$service_id = $data['service_id'];
$reason_for_appointment = $data['reason_for_appointment'];
$appointment_date = $data['appointment_date'];
$appointment_time = $data['appointment_time'];
$doctor_schedule_id = $data['doctor_schedule_id'];
$status = $data['status'];
$doctor_comment =" ";

$q1 = mysqli_query($con, "INSERT INTO `appointment_table`(`doctor_id`, `patient_id`, `service_id`, `doctor_schedule_id`, `reason_for_appointment`, `appointment_date`, `appointment_time`, `status`, `doctor_comment`) 
                                                VALUES ('$doctor_id','$patient_id','$service_id','$doctor_schedule_id','$reason_for_appointment','$appointment_date','$appointment_time','$status','$doctor_comment')");

$q2 = mysqli_query($con, "INSERT INTO `appointment_history`(`appointment_id`,`doctor_id`, `patient_id`, `service_id`, `doctor_schedule_id`, `reason_for_appointment`, `appointment_date`, `appointment_time`, `status`, `doctor_comment`) 
                          SELECT * FROM appointment_table WHERE appointment_table.appointment_id NOT IN (SELECT DISTINCT (appointment_history.appointment_id) FROM appointment_history)");

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