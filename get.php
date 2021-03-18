<?php
$room = $_POST['room'];   //"Zoli Szoba";

$conn = new mysqli ('localhost', 'xxx', 'yyy', 'zzz');

$sql = "SELECT * FROM temperatures WHERE room = '$room' ORDER BY id DESC LIMIT 1";

if ($result=mysqli_query($conn,$sql))
		
    {
      while ($row=mysqli_fetch_assoc($result))
		  
      {
        //echo $room;
       // echo $row;
       echo json_encode($row);
      }
    }    
    mysqli_close($conn);
?>