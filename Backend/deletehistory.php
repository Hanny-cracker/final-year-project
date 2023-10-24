<?php
include "config.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);

$patient_id = $data['patient_id'];


$q = mysqli_query($con, "DELETE FROM `appointment_history` WHERE `patient_id` =$patient_id");

echo mysqli_error($con);
?>