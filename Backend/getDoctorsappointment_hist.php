<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);


$doctor_id = $data['doctor_id'];
// $appointment_date = $data['appointment_date'];
$data = array();
$q = mysqli_query($con, "SELECT DISTINCT appointment_history.appointment_id, appointment_history.reason_for_appointment,appointment_history.appointment_date,appointment_history.appointment_time,appointment_history.status
,patient_table.patient_first_name,patient_table.patient_last_name,service_table.service_name, appointment_history.doctor_comment
FROM  appointment_history
INNER JOIN  doctor_table
ON doctor_table.doctor_id = $doctor_id AND appointment_history.doctor_id=$doctor_id
INNER JOIN service_table
ON service_table.service_id = appointment_history.service_id
INNER JOIN patient_table
ON appointment_history.patient_id = patient_table.patient_id ");



while($row = mysqli_fetch_object($q)){
    $data[] = $row;
    
}

echo json_encode($data);
echo mysqli_error($con);

?>