<?php
include "config.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);

$email = $data['email'];

$q = mysqli_query($con, "SELECT `user_id` FROM `log_in` WHERE `email` = '$email'");

$data = array();
while($row = mysqli_fetch_object($q)){
    $data[] = $row;
    
}
echo json_encode($data);
echo mysqli_error($con);

?>