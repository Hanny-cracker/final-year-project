<?php
include "config.php";

$input = file_get_contents('php://input');
$data = json_decode($input,true);

if(isset($data) && !empty($data)){
    $pwd = md5(trim($data['password']));
    $email = $data['email'];
    
    $q = mysqli_query($con, " SELECT DISTINCT * FROM `log_in` WHERE email = '$email' AND user_password = '$pwd'");

    if($q){
        $data = array();
        while($row = mysqli_fetch_object($q)){
            $data[] = $row;            
        }
    }
    else{
        http_response_code(422);
        
    }
}

echo json_encode($data);
echo mysqli_error($con);
?>