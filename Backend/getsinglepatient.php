<?php
include "config.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);


$user_id = $data['user_id'];
$q = mysqli_query($con, "SELECT DISTINCT * FROM `patient_table` WHERE user_id = $user_id");
$data = array();
while($row = mysqli_fetch_object($q)){
    $data[] = $row;
    
}
echo json_encode($data);
echo mysqli_error($con);

?>