<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Method: POST, GET , DELETE, PUT, PATCH, OPTIONS');
header('Access-Control-allow-Header: token, Content-Type');
header('Content-Type: text/plain');
header('Content-Length: 0');

$con = mysqli_connect("localhost","root","","appointment_app") or die("could'tn connect");

?>