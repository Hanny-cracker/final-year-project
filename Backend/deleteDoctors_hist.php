<?php
include "config.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);

$doctor_id = $data['doctor_id'];


$q = mysqli_query($con, "DELETE FROM `appointment_history` WHERE `doctor` =$doctor_id");

echo mysqli_error($con);
?>