<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);

if($data['patient_id']){
    $patient_id = $data['patient_id'];


$data = array();
$q = mysqli_query($con, "SELECT DISTINCT appointment_table.appointment_id, appointment_table.reason_for_appointment,appointment_table.appointment_date,appointment_table.appointment_time,appointment_table.doctor_comment,appointment_table.status,doctor_table.doctor_name,service_table.service_name 
                        FROM  appointment_table
                        INNER JOIN  doctor_table
                        ON doctor_table.doctor_id = appointment_table.doctor_id 
                        INNER JOIN service_table
                        ON service_table.service_id = appointment_table.service_id
                        INNER JOIN patient_table
                        ON appointment_table.patient_id = $patient_id");

while($row = mysqli_fetch_object($q)){
    $data[] = $row;
    
}

echo json_encode($data);
echo mysqli_error($con);
}


?>