<?php
include "config.php";
$input = file_get_contents('php://input');
$data = json_decode($input,true);

$doctor_id = $data['doctor_id'];
$data = array();
$q = mysqli_query($con, "SELECT DISTINCT * FROM `doctor_schedule_table` WHERE `doctor_id` = $doctor_id");

while($row = mysqli_fetch_object($q)){
    $data[] = $row;
    
}
echo json_encode($data);
echo mysqli_error($con);
?>