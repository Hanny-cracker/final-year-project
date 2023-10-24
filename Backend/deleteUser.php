<?php
include "config.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);

$user_id = $data['user_id'];


$q = mysqli_query($con, "DELETE FROM `log_in` WHERE `user_id` =$user_id");

echo mysqli_error($con);
?>