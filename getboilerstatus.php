<?php
$room = $_POST['room'];   
$conn = new mysqli ('localhost', 'xxx', 'yyy', 'zzz');

$sql = "SELECT * FROM boilerstatus ORDER BY id DESC LIMIT 1";

if ($result=mysqli_query($conn,$sql))
		
    {
      while ($row=mysqli_fetch_assoc($result))
		  
      {
   
       echo $row['boilerstatus'];
      
      }
    }    
    mysqli_close($conn);
?>