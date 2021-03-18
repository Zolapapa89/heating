<?php

$conn = new mysqli('localhost', 'xxx', 'yyy', 'zzz');


            $room=$_POST['room'];
            $dayofweek= $_POST['dayofweek'];

            $startTimeOne = $_POST['starttimeone'];
            $endTimeOne = $_POST['endtimeone'];
            $autoTTempOne = $_POST['autottempone'];

            $startTimeTwo = $_POST['starttimetwo'];
            $endTimeTwo = $_POST['endtimetwo'];
            $autoTTempTwo = $_POST['autottemptwo'];

            $startTimeThree = $_POST['starttimethree'];
            $endTimeThree = $_POST['endtimethree'];
            $autoTTempThree = $_POST['autottempthree'];

            $startTimeFour =  $_POST['starttimefour'];
            $endTimeFour = $_POST['endtimefour'];
            $autoTTempFour =  $_POST['autottempfour'];

            $startTimeFive =  $_POST['starttimefive'];
            $endTimeFive = $_POST['endtimefive'];
            $autoTTempFive =  $_POST['autottempfive'];



$sql_update = "UPDATE autotemps 
SET starttime = CASE WHEN linenumber = '1' THEN '$startTimeOne' 
                    WHEN linenumber = '2' THEN '$startTimeTwo' 
                    WHEN linenumber = '3' THEN '$startTimeThree' 
                    WHEN linenumber = '4' THEN '$startTimeFour' 
                    WHEN linenumber = '5' THEN '$startTimeFive' 
                    END,
     endtime = CASE WHEN linenumber = '1' THEN '$endTimeOne' 
                    WHEN linenumber = '2' THEN '$endTimeTwo' 
                    WHEN linenumber = '3' THEN '$endTimeThree' 
                    WHEN linenumber = '4' THEN '$endTimeFour' 
                    WHEN linenumber = '5' THEN '$endTimeFive' 
                    END,
     autotargettemp = CASE WHEN linenumber = '1' THEN '$autoTTempOne' 
                    WHEN linenumber = '2' THEN '$autoTTempTwo' 
                    WHEN linenumber = '3' THEN '$autoTTempThree' 
                    WHEN linenumber = '4' THEN '$autoTTempFour' 
                    WHEN linenumber = '5' THEN '$autoTTempFive' 
                    END 
WHERE linenumber IN ('1', '2', '3', '4', '5') 
AND room = '$room'
AND dayofweek = '$dayofweek'";
                    



if (mysqli_query($conn, $sql_update)){ 
    echo "Sikeresen Mentve!"; } else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn); }

  mysqli_close($conn); 


?>