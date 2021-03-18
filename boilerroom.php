<?php
$room = $_POST['room'];   

$zoliszobaThermostatStatus = "";
$nappaliThermostatStatus = "";
$tetoterNappaliThermostatStatus = "";
$konyhaThermostatStatus = "";
$varrodaThermostatStatus = "";
$petiszobaThermostatStatus = "";
$osokszobaThermostatStatus = "";
$attiThermostatStatus = "";
$sportcentrumThermostatStatus = "";
$vendegszobaThermostatStatus = "";

$kazankorEloremenoTemp = $_POST['kazankorEloremenoTemp'];
$kazankorVisszateroTemp = $_POST['kazankorVisszateroTemp'];
$futeskorEloremenoTemp = $_POST['futeskorEloremenoTemp'];
$futeskorVisszateroTemp = $_POST['futeskorVisszateroTemp'];



$boilerStatus = "";

$conn = new mysqli('localhost', 'xxx', 'yyy', 'zzz');

$sql = "SELECT thermostatstatus FROM thermostat WHERE room = 'Zoli Szoba' ORDER BY id DESC LIMIT 1";
$sql1 = "SELECT thermostatstatus FROM thermostat WHERE room = 'Nappali' ORDER BY id DESC LIMIT 1";
$sql2 = "SELECT thermostatstatus FROM thermostat WHERE room = 'Tetoter Nappali' ORDER BY id DESC LIMIT 1";
$sql3 = "SELECT thermostatstatus FROM thermostat WHERE room = 'Konyha' ORDER BY id DESC LIMIT 1";
$sql4 = "SELECT thermostatstatus FROM thermostat WHERE room = 'Varroda' ORDER BY id DESC LIMIT 1";
$sql5 = "SELECT thermostatstatus FROM thermostat WHERE room = 'Peti Szoba' ORDER BY id DESC LIMIT 1";
$sql6 = "SELECT thermostatstatus FROM thermostat WHERE room = 'Osok Szoba' ORDER BY id DESC LIMIT 1";
$sql7 = "SELECT thermostatstatus FROM thermostat WHERE room = 'Atti Szoba' ORDER BY id DESC LIMIT 1";
$sql8 = "SELECT thermostatstatus FROM thermostat WHERE room = 'Sportcentrum' ORDER BY id DESC LIMIT 1";
$sql9 = "SELECT thermostatstatus FROM thermostat WHERE room = 'Vendegszoba' ORDER BY id DESC LIMIT 1";

if ($result = mysqli_query($conn, $sql)) {
    while ($row = mysqli_fetch_assoc($result)) {
        $zoliszobaThermostatStatus = $row['thermostatstatus'];
    }
}


if ($result = mysqli_query($conn, $sql1)) {
    while ($row1 = mysqli_fetch_assoc($result)) {
        $nappaliThermostatStatus = $row1['thermostatstatus'];
    }
}

if ($result = mysqli_query($conn, $sql2)) {
    while ($row2 = mysqli_fetch_assoc($result)) {
        $tetoterNappaliThermostatStatus = $row2['thermostatstatus'];
    }
}

if ($result = mysqli_query($conn, $sql3)) {
    while ($row3 = mysqli_fetch_assoc($result)) {
        $konyhaThermostatStatus = $row3['thermostatstatus'];
    }
}

if ($result = mysqli_query($conn, $sql4)) {
    while ($row4 = mysqli_fetch_assoc($result)) {
        $varrodaThermostatStatus = $row4['thermostatstatus'];
    }
}

if ($result = mysqli_query($conn, $sql5)) {
    while ($row5 = mysqli_fetch_assoc($result)) {
        $petiszobaThermostatStatus = $row5['thermostatstatus'];
    }
}

if ($result = mysqli_query($conn, $sql6)) {
    while ($row6 = mysqli_fetch_assoc($result)) {
        $osokszobaThermostatStatus = $row6['thermostatstatus'];
    }
}

if ($result = mysqli_query($conn, $sql7)) {
    while ($row7 = mysqli_fetch_assoc($result)) {
        $attiThermostatStatus = $row7['thermostatstatus'];
    }
}

if ($result = mysqli_query($conn, $sql8)) {
    while ($row8 = mysqli_fetch_assoc($result)) {
        $sportcentrumThermostatStatus = $row8['thermostatstatus'];
    }
}

if ($result = mysqli_query($conn, $sql9)) {
    while ($row9 = mysqli_fetch_assoc($result)) {
        $vendegszobaThermostatStatus = $row9['thermostatstatus'];
    }
}



mysqli_close($conn);




if (
    $nappaliThermostatStatus == "be" ||
    $zoliszobaThermostatStatus == "be" ||
    $tetoterNappaliThermostatStatus == "be" ||
    $konyhaThermostatStatus == "be" ||
    $varrodaThermostatStatus == "be" ||
    $petiszobaThermostatStatus == "be" ||
    $osokszobaThermostatStatus == "be" ||
    $attiThermostatStatus == "be" ||
    $sportcentrumThermostatStatus == "be" ||
    $vendegszobaThermostatStatus == "be"
) {
    $boilerStatus = "be";
} else if (
    $nappaliThermostatStatus == "ki" &&
    $zoliszobaThermostatStatus == "ki" &&
    $tetoterNappaliThermostatStatus == "ki" &&
    $konyhaThermostatStatus == "ki" &&
    $varrodaThermostatStatus == "ki" &&
    $petiszobaThermostatStatus == "ki" &&
    $osokszobaThermostatStatus == "ki" &&
    $attiThermostatStatus == "ki" &&
    $sportcentrumThermostatStatus == "ki" &&
    $vendegszobaThermostatStatus == "ki"
) {
    $boilerStatus = "ki";
} else {
    $boilerStatus = "hiba";
}





echo $boilerStatus;






//////////////////////////////////////////////////////////////////

$conn = new mysqli('localhost', 'xxx', 'yyy', 'zzz');

date_default_timezone_set('Europe/Budapest');
$d = date("Y-m-d");
//echo " Date:".$d."<BR>";
$t = date("H:i:s");

            

$sql="INSERT INTO boilerstatus (id, Date, Time, boilerstatus) VALUES (NULL, '$d', '$t', '$boilerStatus ')";
//$sql="INSERT INTO logs (id, room, temp, targettemp) VALUES (NULL, 'Zola', '38', '15')";
$sql2="INSERT INTO watertemperatures (id, Date, Time, kazankoreloremeno, kazankorvisszatero, futeskoreloremeno, futeskorvisszatero) VALUES (NULL, '$d', '$t', '$kazankorEloremenoTemp', '$kazankorVisszateroTemp', '$futeskorEloremenoTemp', '$futeskorVisszateroTemp')";

if ($conn->query($sql) === TRUE && $conn->query($sql2) === TRUE) {
    //echo "data inserted";
    
}
else 
{
    //echo "failed";
}




mysqli_close($conn);
?>



