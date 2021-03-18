<?php
$conn = new mysqli('localhost', 'xxx', 'yyy', 'zzz');
$room=$_POST['room'];
$temp=$_POST['temp'];
$targettemp=$_POST['targettemp'];
$thermostatMode=$_POST['thermostatMode'];
$oldThermostatStatus = $_POST['thermostatStatus'];
//Get current date and time
date_default_timezone_set('Europe/Budapest');
$d = date("Y-m-d");
//echo " Date:".$d."<BR>";
$t = date("H:i:s");

$hysteresis = 0.2;
        $thermostatStatus="";


        
        if ($temp <= $targettemp - $hysteresis){
            $thermostatStatus = "be";
            }else if ($temp >= $targettemp + $hysteresis) {
            $thermostatStatus = "ki";
            }else{
                $thermostatStatus = $oldThermostatStatus;
            }

            

$sql="INSERT INTO temperatures (id, Date, Time, room, temp, targettemp, thermostatstatus) VALUES (NULL, '$d', '$t', '$room ', '$temp', '$targettemp', '$thermostatStatus')";

$sql2="INSERT INTO thermostat (id, Date, Time, room, thermostatmode, thermostatstatus) VALUES (NULL, '$d', '$t', '$room ', '$thermostatMode', '$thermostatStatus')";

if ($conn->query($sql) === TRUE && $conn->query($sql2) === TRUE) {
    echo "data inserted";
    
}
else 
{
    echo "failed";
}

mysqli_close($conn);
?>


