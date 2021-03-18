<?php
$room = $_POST['room']; 
$dayofweek= $_POST['dayofweek'];  


$conn = new mysqli ('localhost', 'xxx', 'yyy', 'zzz');

$sql = "SELECT linenumber, starttime, endtime, autotargettemp FROM autotemps WHERE room = '$room' AND dayofweek = '$dayofweek' ORDER BY id";

if ($result=mysqli_query($conn,$sql))
		
    {
      while ($row=mysqli_fetch_array($result))
		  
      {
        echo $row['starttime'].",";
        

        echo $row['endtime'].",";
        

        echo $row['autotargettemp']."Ł";
      
      }
    }    
    mysqli_close($conn);
?>