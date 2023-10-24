<?php
include "config.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);

$service_id = $data['service_id'];

$q = mysqli_query($con, "DELETE FROM `service_table` WHERE `service_id`=$service_id");

echo json_encode($data);
echo mysqli_error($con);

?>