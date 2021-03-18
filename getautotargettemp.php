<?php
$room = $_POST['room'];   


date_default_timezone_set('Europe/Budapest');

$t = new DateTime();
$midnight = DateTime::createFromFormat('H:i:s', '00:00:00');


$weekday = date('w'); 
$dayofweek;


  //echo $weekday;
if($weekday == 6 || $weekday == 0){
	$dayofweek = "weekend";
}else{
  $dayofweek = "workday";
}

//echo $dayofweek;
            $startTimeOneString;
            $endTimeOneString;
            $autoTTempOneString;

            $startTimeTwoString;
            $endTimeTwoString;
            $autoTTempTwoString;

            $startTimeThreeString;
            $endTimeThreeString;
            $autoTTempThreeString;

            $startTimeFourString;
            $endTimeFourString;
            $autoTTempFourString;

            $startTimeFiveString;
            $endTimeFiveString;
            $autoTTempFiveString;

            $startTimeSixString;
            $endTimeSixString;
            $autoTTempSixString;

            $startTimeOne;
            $endTimeOne;
            $autoTTempOne;

            $startTimeTwo;
            $endTimeTwo;
            $autoTTempTwo;

            $startTimeThree;
            $endTimeThree;
            $autoTTempThree;

            $startTimeFour;
            $endTimeFour;
            $autoTTempFour;

            $startTimeFive;
            $endTimeFive;
            $autoTTempFive;

           

$conn = new mysqli ('localhost', 'xxx', 'yyy', 'zzz');

$sqlLineOne = "SELECT linenumber, starttime, endtime, autotargettemp FROM autotemps WHERE room = '$room' AND dayofweek = '$dayofweek' AND linenumber = '1' ORDER BY id";

if ($result=mysqli_query($conn,$sqlLineOne))
		
    {while ($row=mysqli_fetch_row($result))
		  
      {
        $GLOBALS['startTimeOne'] = DateTime::createFromFormat('H:i:s', $row[1]);     
        $GLOBALS['endTimeOne'] = DateTime::createFromFormat('H:i:s', $row[2]);
        $GLOBALS['autoTTempOne'] = $row[3];
      }
    
    }    
    $sqlLineTwo = "SELECT linenumber, starttime, endtime, autotargettemp FROM autotemps WHERE room = '$room' AND dayofweek = '$dayofweek' AND linenumber = '2' ORDER BY id";

    if ($result=mysqli_query($conn,$sqlLineTwo))
        
        {while ($row=mysqli_fetch_row($result))
          
          {
          
    
            $GLOBALS['startTimeTwo'] = DateTime::createFromFormat('H:i:s', $row[1]);
            $GLOBALS['endTimeTwo'] = DateTime::createFromFormat('H:i:s', $row[2]);
            $GLOBALS['autoTTempTwo'] = $row[3];
         //echo "$row[1] <br>";
      
    
          }
        
        } 

        $sqlLineThree = "SELECT linenumber, starttime, endtime, autotargettemp FROM autotemps WHERE room = '$room' AND dayofweek = '$dayofweek' AND linenumber = '3' ORDER BY id";

        if ($result=mysqli_query($conn,$sqlLineThree))
            
            {while ($row=mysqli_fetch_row($result))
              
              {
              
        
                $GLOBALS['startTimeThree'] = DateTime::createFromFormat('H:i:s', $row[1]);
                $GLOBALS['endTimeThree'] = DateTime::createFromFormat('H:i:s', $row[2]);
                $GLOBALS['autoTTempThree'] = $row[3];
             
          
        
              }
            
            } 
            
            $sqlLineFour = "SELECT linenumber, starttime, endtime, autotargettemp FROM autotemps WHERE room = '$room' AND dayofweek = '$dayofweek' AND linenumber = '4' ORDER BY id";

    if ($result=mysqli_query($conn,$sqlLineFour))
        
        {while ($row=mysqli_fetch_row($result))
          
          {
          
    
            $GLOBALS['startTimeFour'] = DateTime::createFromFormat('H:i:s', $row[1]);
            $GLOBALS['endTimeFour'] = DateTime::createFromFormat('H:i:s', $row[2]);
            $GLOBALS['autoTTempFour'] = $row[3];
         
      
    
          }
        
        } 

        $sqlLineFive = "SELECT linenumber, starttime, endtime, autotargettemp FROM autotemps WHERE room = '$room' AND dayofweek = '$dayofweek' AND linenumber = '5' ORDER BY id";

    if ($result=mysqli_query($conn,$sqlLineFive))
        
        {while ($row=mysqli_fetch_row($result))
          
          {
         

            if($t >= $midnight && $t < $endTimeFour){
              $GLOBALS['startTimeFive'] = DateTime::createFromFormat('H:i:s', $row[1])->modify('-1 day');
              $GLOBALS['endTimeFive'] = DateTime::createFromFormat('H:i:s', $row[2]);
              
            }else{
              $GLOBALS['startTimeFive'] = DateTime::createFromFormat('H:i:s', $row[1]);
              $GLOBALS['endTimeFive'] = DateTime::createFromFormat('H:i:s', $row[2])->modify('+1 day');
            }

            $GLOBALS['autoTTempFive'] = $row[3];
         //echo "$row[1] <br>";
      
    
          }
        
        } 





///////////////////////////////////////////////////////////////////////////////////////   
    mysqli_close($conn);

  

    if($t >= $startTimeOne && $t < $endTimeOne){
      echo $autoTTempOne;
    }else if ($t >= $startTimeTwo && $t < $endTimeTwo){
        echo $autoTTempTwo;
    }else if ($t >= $startTimeThree && $t < $endTimeThree){
        echo $autoTTempThree;
    }else if ($t >= $startTimeFour && $t < $endTimeFour){
        echo $autoTTempFour;
    }else if ($t >= $startTimeFive && $t < $endTimeFive){
        echo $autoTTempFive;
    }else{
      echo "error";
    }

  
?>