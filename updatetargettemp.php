<?php
$conn = new mysqli('localhost', 'xxx', 'yyy', 'zzz');
$room=$_POST['room'];
$targettemp=$_POST['targettemp'];

$sql_update = "UPDATE temperatures SET targettemp='$targettemp' WHERE room = '$room' ORDER by id DESC LIMIT 1";



if (mysqli_query($conn, $sql_update)) {
    echo "<h5>thank you"; } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn); }

  mysqli_close($conn); 


?>