<?php
include "config.php";

$data = array();
$q = mysqli_query($con, "SELECT DISTINCT doctor_table.user_id, doctor_table.doctor_id, doctor_table.service_id, service_table.service_name, doctor_table.doctor_email_address,doctor_table.doctor_name,doctor_table.doctor_phone_no,doctor_table.doctor_address,doctor_table.doctor_date_of_birth,doctor_table.doctor_degree,doctor_table.doctor_expert_in,doctor_table.doctor_added_on 
                                FROM doctor_table
                                INNER JOIN service_table
                                ON service_table.service_id = doctor_table.service_id");

while($row = mysqli_fetch_object($q)){
    $data[] = $row;
    
}
echo json_encode($data);
echo mysqli_error($con);

?>