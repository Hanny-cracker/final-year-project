<?php
include "config.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);

$user_email_address = $data['email_address'];
$user_password = md5($data['password']);
$user_status = $data['status'];

$p = mysqli_query($con, "INSERT INTO `log_in`( `email`, `user_password`, `user_status`) 
                            VALUES ('$user_email_address','$user_password','$user_status')");

$e = mysqli_query($con," SELECT DISTINCT user_id FROM `log_in` WHERE email = '$user_email_address'");              

$data = array();

while($row = mysqli_fetch_object($e)){
    $data[] = $row;    
}

echo json_encode($data);
echo mysqli_error($con);
?>