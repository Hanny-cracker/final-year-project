<?php
include "config.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);

$appointment_id = $data['appointment_id'];


$q = mysqli_query($con, "DELETE FROM `appointment_table` WHERE `appointment_id` =$appointment_id");

$p = mysqli_query($con, "UPDATE `appointment_history` SET `status`='Unconfirmed' WHERE `appointment_id`= $appointment_id");
echo mysqli_error($con);
?>

