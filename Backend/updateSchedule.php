<?php
include "config.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);

$doctor_id = $data['doctor_id'];
$time_slot = $data['time'];

$d = mysqli_query($con, "DELETE FROM `doctor_schedule_table` WHERE doctor_id= $doctor_id");

foreach($time_slot as $time){
    $q = mysqli_query($con, "INSERT INTO `doctor_schedule_table`(`doctor_id`, `time`, `duration`) 
                                VALUES ('$doctor_id','$time','30')");
                
}
echo mysqli_error($con);
?>

