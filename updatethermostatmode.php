<?php
$conn = new mysqli('localhost', 'xxx', 'yyy', 'zzz');
$room=$_POST['room'];
$thermostatMode=$_POST['thermostatMode'];

$sql_update = "UPDATE thermostat SET thermostatmode='$thermostatMode' WHERE room = '$room' ORDER by id DESC LIMIT 1";



if (mysqli_query($conn, $sql_update)) {
    echo "<h5>thank you"; } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn); }

  mysqli_close($conn); 


?>