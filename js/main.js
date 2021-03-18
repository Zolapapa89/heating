


///////////////////////////////////////////////////////////////////////////////////////////////////
//Lekéri és percenként frissíti a: aktuális hőm, kívánt hőm, thermostat statuszt, thermostat módot,autotargettemp(idő+hőm)
window.addEventListener("load", refresh(), false);

var refreshVar = setInterval(refresh, 60000);
function refresh() {

    var thermostatClassname = document.getElementsByClassName("thermostat");

    for (let i = 0; i < thermostatClassname.length; i++) {

        var room = thermostatClassname[i].children[0].children[0].children[0].children[0].children[0].innerHTML;
        //console.log(room);
        var dayofweek = thermostatClassname[i].children[1].children[0].innerHTML;

        //console.log(dayofweek);
        //console.log(thermostatClassname[i].children[2].children[0].children[1].children[1].children[0].value);
        var aTempPlace = thermostatClassname[i].children[0].children[0].children[1].children[1].children[0];

        //console.log(thermostatClassname[i].children[0].children[0].children[2].children[1].children[1]);
        var tTempPlace = thermostatClassname[i].children[0].children[0].children[2].children[1].children[1];

        //console.log(thermostatClassname[i].children[0].children[0].children[4].children[1].children[0]);
        var thermostatStatusPlace = thermostatClassname[i].children[0].children[0].children[4].children[1].children[0];

        //console.log(thermostatClassname[i].children[0].children[0].children[3].children[1].children[0]);
        var thermostatModePlace = thermostatClassname[i].children[0].children[0].children[3].children[1].children[0];

        var autoTargettempPlace = thermostatClassname[i].children[0].children[0].children[5].children[1].children[0];

        //console.log("starttimeOnePlace");

        getautoTTemp(room, autoTargettempPlace);

        getATemp(room, aTempPlace);
        getTTemp(room, tTempPlace);
        getThermostatStatus(room, thermostatStatusPlace);
        getThermostatMode(room, thermostatModePlace, tTempPlace, autoTargettempPlace);


    }

};
//----------------------------------------------------------------------------------------------

function getautoTTemp(room, autoTargettempPlace) {

    $.ajax({
        url: 'getautotargettemp.php',
        method: 'POST',
        //dataType: 'json',
        data: {
            room: room //"Zoli Szoba"
        },
        success: function (response) {
            console.log(response);
            autoTargettempPlace.value = response;
        }
    })
};


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var endTimeOneClassName = document.getElementsByClassName("endTimeOne");

var endTimeOneFunction = function () {
    var x = this.value;
    var y = this.parentElement.parentElement.parentElement.children[1].children[0].children[0].value;


    if (x <= y) {
        alert("A kezdő időpontnál későbbi időpontot válassz!");
        this.value = "";
        return false;
    } else {
        console.log("this");
        console.log(this.parentElement.parentElement.parentElement.children[1].children[0].children[0]);
        this.parentElement.parentElement.parentElement.children[2].children[0].children[0].value = this.value;
    }
};

for (var i = 0; i < endTimeOneClassName.length; i++) {
    endTimeOneClassName[i].addEventListener('blur', endTimeOneFunction, false);
}
//-------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var endTimeTwoClassName = document.getElementsByClassName("endTimeTwo");

var endTimeTwoFunction = function () {

    var x = this.value;
    var y = this.parentElement.parentElement.parentElement.children[2].children[0].children[0].value;
    console.log(y);


    if (x <= y) {
        alert("A kezdő időpontnál későbbi időpontot válassz!");
        this.value = "";
        return false;
    } else {
        this.parentElement.parentElement.parentElement.children[3].children[0].children[0].value = this.value;
    }

};

for (var i = 0; i < endTimeTwoClassName.length; i++) {
    endTimeTwoClassName[i].addEventListener('blur', endTimeTwoFunction, false);
}
//-----------------------------------------------------------------------------------------------------------
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
var endTimeThreeClassName = document.getElementsByClassName("endTimeThree");

var endTimeThreeFunction = function () {
    var x = this.value;
    var y = this.parentElement.parentElement.parentElement.children[3].children[0].children[0].value;
    console.log(y);


    if (x <= y) {
        alert("A kezdő időpontnál későbbi időpontot válassz!");
        this.value = "";
        return false;
    } else {
        this.parentElement.parentElement.parentElement.children[4].children[0].children[0].value = this.value;
    }

};

for (var i = 0; i < endTimeThreeClassName.length; i++) {
    endTimeThreeClassName[i].addEventListener('blur', endTimeThreeFunction, false);
}
//--------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////
var endTimeFourClassName = document.getElementsByClassName("endTimeFour");

var endTimeFourFunction = function () {
    var x = this.value;
    var y = this.parentElement.parentElement.parentElement.children[4].children[0].children[0].value;
    console.log(y);


    if (x <= y) {
        alert("A kezdő időpontnál későbbi időpontot válassz!");
        this.value = "";
        return false;
    } else {
        this.parentElement.parentElement.parentElement.children[5].children[0].children[0].value = this.value;
    }

};

for (var i = 0; i < endTimeFourClassName.length; i++) {
    endTimeFourClassName[i].addEventListener('blur', endTimeFourFunction, false);
}
//------------------------------------------------------------------------------------------------------------------
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
var startTimeOneClassName = document.getElementsByClassName("startTimeOne");

var startTimeOneFunction = function () {

    this.parentElement.parentElement.parentElement.children[5].children[1].children[0].value = this.value;
};

for (var i = 0; i < startTimeOneClassName.length; i++) {
    startTimeOneClassName[i].addEventListener('blur', startTimeOneFunction, false);
}

//---------------------------------------------------------------------------------------------------------------------------------




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Az összes targettemp minusbutton funkciója
var tTempMinusButtonClassName = document.getElementsByClassName("tTempMinusButton");

var tTempMinusButtonFunction = function () {
    room = this.parentElement.parentElement.parentElement.children[0].children[0].children[0].innerHTML;
    thermostatMode = this.parentElement.parentElement.parentElement.children[3].children[1].children[0].value
    targettemp = (parseFloat(this.parentElement.children[1].value) - 0.5).toFixed(1);

    //console.log(room);
    //console.log(this.parentElement.parentElement.parentElement.children[3].children[1].children[0].value)
    //console.log(targettemp);
    if (thermostatMode == "manual") {
        this.parentElement.children[1].value = targettemp;
        updateTargetTemp(room, targettemp);
    } else {
        alert("A termosztát Automata módban van!")
    }
};

for (var i = 0; i < tTempMinusButtonClassName.length; i++) {
    tTempMinusButtonClassName[i].addEventListener('click', tTempMinusButtonFunction, false);
}
//----------------------------------------------------------------------------------------------

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Az összes targettemp plusbutton funkciója

var tTempPlusButtonClassName = document.getElementsByClassName("tTempPlusButton");

var tTempPlusButtonFunction = function () {
    room = this.parentElement.parentElement.parentElement.children[0].children[0].children[0].innerHTML;
    thermostatMode = this.parentElement.parentElement.parentElement.children[3].children[1].children[0].value
    targettemp = (parseFloat(this.parentElement.children[1].value) + 0.5).toFixed(1);

    //console.log(room);
    //console.log(targettemp);
    if (thermostatMode == "manual") {
        this.parentElement.children[1].value = targettemp;
        updateTargetTemp(room, targettemp);
    }else {
        alert("A termosztát Automata módban van!")
    }
};

for (var i = 0; i < tTempPlusButtonClassName.length; i++) {
    tTempPlusButtonClassName[i].addEventListener('click', tTempPlusButtonFunction, false);
}
//----------------------------------------------------------------------------------------------


///////////////////////////////////////////////////////////////////////////////////////////////////////////////      
var weekendButtonClassName = document.getElementsByClassName("weekendButton");

var weekendButtonFunction = function () {


    var titleLine = this.parentElement.children[1];
    titleLine.innerHTML = "Hétvégi program";
    //console.log(titleLine);
    var table = this.parentElement.children[4];
    if (table.style.display === "none") {
        table.style.display = "block";
    }
    /*else {
        table.style.display = "none";
    }*/


    var room = this.parentElement.parentElement.children[0].children[0].children[0].children[0].children[0].innerHTML;


    var dayofweek = "weekend";
    this.parentElement.children[0].innerHTML = dayofweek;


    var startTimeOnePlace = this.parentElement.children[4].children[0].children[1].children[0].children[0];
    var endTimeOnePlace = this.parentElement.children[4].children[0].children[1].children[1].children[0];
    var autoTargettempOnePlace = this.parentElement.children[4].children[0].children[1].children[2].children[1];

    var startTimeTwoPlace = this.parentElement.children[4].children[0].children[2].children[0].children[0];
    var endTimeTwoPlace = this.parentElement.children[4].children[0].children[2].children[1].children[0];
    var autoTargettempTwoPlace = this.parentElement.children[4].children[0].children[2].children[2].children[1];

    var startTimeThreePlace = this.parentElement.children[4].children[0].children[3].children[0].children[0];
    var endTimeThreePlace = this.parentElement.children[4].children[0].children[3].children[1].children[0];
    var autoTargettempThreePlace = this.parentElement.children[4].children[0].children[3].children[2].children[1];

    var startTimeFourPlace = this.parentElement.children[4].children[0].children[4].children[0].children[0];
    var endTimeFourPlace = this.parentElement.children[4].children[0].children[4].children[1].children[0];
    var autoTargettempFourPlace = this.parentElement.children[4].children[0].children[4].children[2].children[1];

    var startTimeFivePlace = this.parentElement.children[4].children[0].children[5].children[0].children[0];
    var endTimeFivePlace = this.parentElement.children[4].children[0].children[5].children[1].children[0];
    var autoTargettempFivePlace = this.parentElement.children[4].children[0].children[5].children[2].children[1];


    var lineOne;
    var lineTwo;
    var lineThree;
    var lineFour;
    var lineFive;
    var lineSix;
    $.ajax({
        url: 'getautotargettemptable.php',
        method: 'POST',
        //dataType: 'json',
        data: {
            room: room, //"Zoli Szoba"
            dayofweek: dayofweek
        },
        success: function (response) {

            lineOne = response.split("Ł")[0];
            lineTwo = response.split("Ł")[1];
            lineThree = response.split("Ł")[2];
            lineFour = response.split("Ł")[3];
            lineFive = response.split("Ł")[4];


            startTimeOnePlace.value = lineOne.split(",")[0];//startTime
            endTimeOnePlace.value = lineOne.split(",")[1];//endTime
            autoTargettempOnePlace.value = lineOne.split(",")[2];//autoTTemp

            startTimeTwoPlace.value = lineTwo.split(",")[0];
            endTimeTwoPlace.value = lineTwo.split(",")[1];
            autoTargettempTwoPlace.value = lineTwo.split(",")[2];


            startTimeThreePlace.value = lineThree.split(",")[0];
            endTimeThreePlace.value = lineThree.split(",")[1];
            autoTargettempThreePlace.value = lineThree.split(",")[2];


            startTimeFourPlace.value = lineFour.split(",")[0];
            endTimeFourPlace.value = lineFour.split(",")[1];
            autoTargettempFourPlace.value = lineFour.split(",")[2];

            startTimeFivePlace.value = lineFive.split(",")[0];
            endTimeFivePlace.value = lineFive.split(",")[1];
            autoTargettempFivePlace.value = lineFive.split(",")[2];


        }

    })
};

for (var i = 0; i < weekendButtonClassName.length; i++) {
    weekendButtonClassName[i].addEventListener('click', weekendButtonFunction, false);
}
//-----------------------------------------------------------------------------------------------------


////////////////////////////////////////////////////////////////////////////////////////////////////////
var workdayButtonClassName = document.getElementsByClassName("workdayButton");

var workdayButtonFunction = function () {

    var titleLine = this.parentElement.children[1];
    titleLine.innerHTML = "Hétközi program";

    var table = this.parentElement.children[4];
    if (table.style.display === "none") {
        table.style.display = "block";
    }
    /*else {
        table.style.display = "none";
    }*/


    var room = this.parentElement.parentElement.children[0].children[0].children[0].children[0].children[0].innerHTML;

    var dayofweek = "workday";
    this.parentElement.children[0].innerHTML = dayofweek;


    var startTimeOnePlace = this.parentElement.children[4].children[0].children[1].children[0].children[0];
    var endTimeOnePlace = this.parentElement.children[4].children[0].children[1].children[1].children[0];
    var autoTargettempOnePlace = this.parentElement.children[4].children[0].children[1].children[2].children[1];

    var startTimeTwoPlace = this.parentElement.children[4].children[0].children[2].children[0].children[0];
    var endTimeTwoPlace = this.parentElement.children[4].children[0].children[2].children[1].children[0];
    var autoTargettempTwoPlace = this.parentElement.children[4].children[0].children[2].children[2].children[1];

    var startTimeThreePlace = this.parentElement.children[4].children[0].children[3].children[0].children[0];
    var endTimeThreePlace = this.parentElement.children[4].children[0].children[3].children[1].children[0];
    var autoTargettempThreePlace = this.parentElement.children[4].children[0].children[3].children[2].children[1];

    var startTimeFourPlace = this.parentElement.children[4].children[0].children[4].children[0].children[0];
    var endTimeFourPlace = this.parentElement.children[4].children[0].children[4].children[1].children[0];
    var autoTargettempFourPlace = this.parentElement.children[4].children[0].children[4].children[2].children[1];

    var startTimeFivePlace = this.parentElement.children[4].children[0].children[5].children[0].children[0];
    var endTimeFivePlace = this.parentElement.children[4].children[0].children[5].children[1].children[0];
    var autoTargettempFivePlace = this.parentElement.children[4].children[0].children[5].children[2].children[1];


    var lineOne;
    var lineTwo;
    var lineThree;
    var lineFour;
    var lineFive;
    var lineSix;
    $.ajax({
        url: 'getautotargettemptable.php',
        method: 'POST',
        //dataType: 'json',
        data: {
            room: room, //"Zoli Szoba"
            dayofweek: dayofweek
        },
        success: function (response) {

            lineOne = response.split("Ł")[0];
            lineTwo = response.split("Ł")[1];
            lineThree = response.split("Ł")[2];
            lineFour = response.split("Ł")[3];
            lineFive = response.split("Ł")[4];


            startTimeOnePlace.value = lineOne.split(",")[0];//startTime
            endTimeOnePlace.value = lineOne.split(",")[1];//endTime
            autoTargettempOnePlace.value = lineOne.split(",")[2];//autoTTemp

            startTimeTwoPlace.value = lineTwo.split(",")[0];
            endTimeTwoPlace.value = lineTwo.split(",")[1];
            autoTargettempTwoPlace.value = lineTwo.split(",")[2];


            startTimeThreePlace.value = lineThree.split(",")[0];
            endTimeThreePlace.value = lineThree.split(",")[1];
            autoTargettempThreePlace.value = lineThree.split(",")[2];


            startTimeFourPlace.value = lineFour.split(",")[0];
            endTimeFourPlace.value = lineFour.split(",")[1];
            autoTargettempFourPlace.value = lineFour.split(",")[2];

            startTimeFivePlace.value = lineFive.split(",")[0];
            endTimeFivePlace.value = lineFive.split(",")[1];
            autoTargettempFivePlace.value = lineFive.split(",")[2];


        }

    })
};

for (var i = 0; i < workdayButtonClassName.length; i++) {
    workdayButtonClassName[i].addEventListener('click', workdayButtonFunction, false);
}
//-----------------------------------------------------------------------------------------------------------

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Az összes termostat módváltó gomb funkciója

var adjustThermostatModeButtonClassName = document.getElementsByClassName("adjustThermostatModeButton");

var adjustThermostatModeButtonFunction = function () {
    room = this.parentElement.parentElement.parentElement.children[0].children[0].children[0].innerHTML;

    var autoTargettempPlace = this.parentElement.parentElement.parentElement.children[5].children[1].children[0];
    //console.log(this.parentElement.parentElement.parentElement.children[5].children[1].children[0]);
    var tTempPlace = this.parentElement.parentElement.parentElement.children[2].children[1].children[1];
    //console.log(this.parentElement.parentElement.parentElement.children[2].children[1].children[1]);

    thermostatModePlace = this.parentElement.children[0];
    thermostatMode = this.parentElement.children[0].value;


    //console.log("this");
    //console.log(this.parentElement.children[0]);
    //console.log(room);
    //console.log(targettemp);
    this.parentElement.children[1].value = targettemp;
    //updateTargetTemp(room, targettemp);
    adjustThermostatMode(room, tTempPlace, thermostatMode, thermostatModePlace, autoTargettempPlace)

};

for (var i = 0; i < tTempPlusButtonClassName.length; i++) {
    adjustThermostatModeButtonClassName[i].addEventListener('click', adjustThermostatModeButtonFunction, false);
}

//----------------------------------------------------------------------------------------------




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Menti az adott thermostathoz tartozó tervezett időpontokat és hőmérsékleteket
var autotTempSubmitButtonClassName = document.getElementsByClassName("autotTempSubmitButton");

var autotTempSubmitButtonFunction = function () {
    //room = this.parentElement.parentElement.parentElement.children[0].children[0].children[0].innerHTML;
    //thermostatMode = this.parentElement.parentElement.parentElement.children[3].children[1].children[0].value
    //targettemp = (parseFloat(this.parentElement.children[1].value) - 0.5).toFixed(1);

    /* var table = this.parentElement.children[4];
     if (table.style.display === "none") {
         table.style.display = "block";
     } 
     /*else {
         table.style.display = "none";
     }*/

    room = this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[0].children[0].children[0].innerHTML;

    console.log(room);
    var dayofweek = this.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].innerHTML;
    console.log("dayofweek");
    console.log(dayofweek);

    var lineNumberOne = 1;
    //var startTimeOneString = document.getElementById("startTimeOne").value;
    //                     gomb     cella         sor             body          sor      cella       input
    var startTimeOneString = this.parentElement.parentElement.parentElement.children[1].children[0].children[0].value;
    var endTimeOneString = this.parentElement.parentElement.parentElement.children[1].children[1].children[0].value;
    var autoTTempOne = this.parentElement.parentElement.parentElement.children[1].children[2].children[1].value;

    var lineNumberTwo = 2;
    //                     gomb     cella         sor             body          sor      cella       input
    var startTimeTwoString = this.parentElement.parentElement.parentElement.children[2].children[0].children[0].value;
    var endTimeTwoString = this.parentElement.parentElement.parentElement.children[2].children[1].children[0].value;
    var autoTTempTwo = this.parentElement.parentElement.parentElement.children[2].children[2].children[1].value;

    var lineNumberThree = 3;
    //                     gomb     cella         sor             body          sor      cella       input
    var startTimeThreeString = this.parentElement.parentElement.parentElement.children[3].children[0].children[0].value;
    var endTimeThreeString = this.parentElement.parentElement.parentElement.children[3].children[1].children[0].value;
    var autoTTempThree = this.parentElement.parentElement.parentElement.children[3].children[2].children[1].value;


    var lineNumberFour = 4;
    //                     gomb     cella         sor             body          sor      cella       input

    var startTimeFourString = this.parentElement.parentElement.parentElement.children[4].children[0].children[0].value;
    var endTimeFourString = this.parentElement.parentElement.parentElement.children[4].children[1].children[0].value;
    var autoTTempFour = this.parentElement.parentElement.parentElement.children[4].children[2].children[1].value;


    var lineNumberFive = 5;
    //                     gomb     cella         sor             body          sor      cella       input
    var startTimeFiveString = this.parentElement.parentElement.parentElement.children[5].children[0].children[0].value;
    var endTimeFiveString = this.parentElement.parentElement.parentElement.children[5].children[1].children[0].value;
    var autoTTempFive = this.parentElement.parentElement.parentElement.children[5].children[2].children[1].value;

    /*
                console.log("startTimeOneString");
                console.log(startTimeOneString);
                console.log("endTimeOneString");
                console.log(endTimeOneString);
                console.log("autoTTempOne");
                console.log(autoTTempOne);
    
                console.log("startTimeTwoString");
                console.log(startTimeTwoString);
                console.log("endTimeTwoString");
                console.log(endTimeTwoString);
                console.log("autoTTempTwo");
                console.log(autoTTempTwo);
    
                console.log("startTimeThreeString");
                console.log(startTimeThreeString);
                console.log("endTimeThreeString");
                console.log(endTimeThreeString);
                console.log("autoTTempThree");
                console.log(autoTTempThree);
    
                console.log("startTimeFourString");
                console.log(startTimeFourString);
                console.log("endTimeFourString");
                console.log(endTimeFourString);
                console.log("autoTTempFour");
                console.log(autoTTempFour);
    
                console.log("startTimeFiveString");
                console.log(startTimeFiveString);
                console.log("endTimeFiveString");
                console.log(endTimeFiveString);
                console.log("autoTTempFive");
                console.log(autoTTempFive);
    
                console.log("startTimeSixString");
                console.log(startTimeSixString);
                console.log("endTimeSixString");
                console.log(endTimeSixString);
                console.log("autoTTempSix");
                console.log(autoTTempSix);
    */
    $.ajax({
        url: 'updateautotemp.php',
        method: 'POST',
        data: {
            room: room,
            dayofweek: dayofweek,




            // linenumberone: 1,
            starttimeone: startTimeOneString,
            endtimeone: endTimeOneString,
            autottempone: autoTTempOne,

            //  linenumbertwo: 2,
            starttimetwo: startTimeTwoString,
            endtimetwo: endTimeTwoString,
            autottemptwo: autoTTempTwo,

            // linenumberthree: 3,
            starttimethree: startTimeThreeString,
            endtimethree: endTimeThreeString,
            autottempthree: autoTTempThree,

            //  linenumberfour: 4,
            starttimefour: startTimeFourString,
            endtimefour: endTimeFourString,
            autottempfour: autoTTempFour,

            // linenumberfive: 5,
            starttimefive: startTimeFiveString,
            endtimefive: endTimeFiveString,
            autottempfive: autoTTempFive

            /* linenumbersix: 6,
             starttimesix: startTimeSixString,
             endtimesix: endTimeSixString,
             autottempsix: autoTTempSix*/


        },
        success: function (response) {
            //console.log(response);
            alert(response);
        }
    });
};

for (var i = 0; i < autotTempSubmitButtonClassName.length; i++) {
    autotTempSubmitButtonClassName[i].addEventListener("click", autotTempSubmitButtonFunction, false);

}

//----------------------------------------------------------------------------------------------

//////////////////////////////////////////////////////////////////////////////////////////

var hideAutoTTempTableClassName = document.getElementsByClassName("hideAutoTTempTable");

var hideAutoTTempTableFunction = function () {
    var titleLine = this.parentElement.parentElement.parentElement.parentElement.parentElement.children[1];
    titleLine.innerHTML = "Program";


    var table = this.parentElement.parentElement.parentElement.parentElement;
    //console.log(titleLine);

    //table.style.display = "none";

    if (table.style.display === "block") {
        table.style.display = "none";
    }
};

for (var i = 0; i < hideAutoTTempTableClassName.length; i++) {
    hideAutoTTempTableClassName[i].addEventListener("click", hideAutoTTempTableFunction, false);

}
//---------------------------------------------------------------------------------------------------------



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Hőfok állítás... gombok hívják meg
function updateTargetTemp(room, targettemp) {
    //var room = document.getElementById("zoliszoba").innerHTML;
    //console.log(room);
    //var targettemp = document.getElementById("targettemp").innerHTML;
    //console.log(targettemp);
    $.ajax({
        url: 'updatetargettemp.php',
        method: 'POST',
        data: {
            room: room,
            targettemp: targettemp
        },
        // success: function () { (getTTemp(room, tTempPlace)) }
        //success: console.log(response)
    });
};

//----------------------------------------------------------------------------------------------

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//lekéri a megfelelő actualtemp értéket és beilleszti a megfelelő helyre
function getATemp(room, aTempPlace) {
    //console.log("getatemp elindítva");
    //console.log(room, aTempPlace);
    $.ajax({
        url: 'get.php',
        method: 'POST',
        dataType: 'json',
        data: {
            room: room
        },
        success: function (response) {
            //console.log(response);
            var actualtemp = response['temp'];
            aTempPlace.value = parseFloat(actualtemp).toFixed(1);

            //console.log(actualtemp);
            //console.log(aTempPlace);
            //console.log(aTempPlace.value);
        }
    })
};
//----------------------------------------------------------------------------------------------

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//lekéri a megfelelő targettemp értéket és beilleszti a megfelelő helyre
function getTTemp(room, tTempPlace) {
    //console.log(room, tTempPlace);
    $.ajax({
        url: 'get.php',
        method: 'POST',
        dataType: 'json',
        data: {
            room: room
        },
        success: function (response) {
            //console.log(response);
            var targettemp = response['targettemp'];
            tTempPlace.value = parseFloat(targettemp).toFixed(1);
            //console.log(tTempPlace);
        }

    })
};
//----------------------------------------------------------------------------------------------


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Lekéri ay adott termosztát státuszát
function getThermostatStatus(room, thermostatStatusPlace) {
    //console.log(room, thermostatStatusPlace);
    $.ajax({
        url: 'get.php',
        method: 'POST',
        dataType: 'json',
        data: {
            room: room
        },
        success: function (response) {
            //console.log(response);
            var thermostatStatus = response['thermostatstatus'];
            thermostatStatusPlace.value = thermostatStatus;
            //console.log(thermostatStatus);
        }
    })
};
//----------------------------------------------------------------------------------------------


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Lekéri a megfelelő termosztát üzemmódját
function getThermostatMode(room, thermostatModePlace, tTempPlace, autoTargettempPlace) {
    //console.log(thermostatModePlace);
    //console.log(tTempPlace);
    //console.log(autoTargettempPlace);
    $.ajax({
        url: 'getthermostatmode.php',
        method: 'POST',
        //dataType: 'json',
        data: {
            room: room
        },
        success: function (response) {
            //console.log(response);
            var thermostatMode = response;    //['uzemmod']
            thermostatModePlace.value = thermostatMode;
            //console.log(thermostatModePlace);
            //console.log(thermostatMode);
            //console.log("autoTargettemp");
            if (thermostatMode == "auto") {
                //console.log(this);
                //console.log(tTempPlace);
                tTempPlace.value = autoTargettempPlace.value;
                var targettemp = tTempPlace.value;
                updateTargetTemp(room, targettemp);
            }
        }

    })
};
//----------------------------------------------------------------------------------------------

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Termosztát üzemmód változtatása, és frissítése az adatbázisban
function adjustThermostatMode(room, tTempPlace, thermostatMode, thermostatModePlace, autoTargettempPlace) {
    switch (thermostatMode) {
        case "manual":
            thermostatMode = "auto";
            //console.log(thermostatModePlace);
            updateThermostatMode(room, tTempPlace, thermostatMode, thermostatModePlace, autoTargettempPlace);
            break;

        case "auto":
            thermostatMode = "manual";
            updateThermostatMode(room, tTempPlace, thermostatMode, thermostatModePlace, autoTargettempPlace);
            //console.log("autoTargettempPlace");
            //console.log(autoTargettempPlace.value);
            break;

        default:
            thermostatMode = "manual";
            updateThermostatMode(room, tTempPlace, thermostatMode, thermostatModePlace, autoTargettempPlace);
            break;
    }
}
//----------------------------------------------------------------------------------------------


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Frissíti az adott termosztát uzemmódját
function updateThermostatMode(room, tTempPlace, thermostatMode, thermostatModePlace, autoTargettempPlace) {
    //var room = document.getElementById("zoliszoba").innerHTML;
    //console.log(thermostatModePlace);
    //var targettemp = document.getElementById("targettemp").innerHTML;
    //console.log(autoTargettempPlace);
    $.ajax({
        url: 'updatethermostatmode.php',
        method: 'POST',
        data: {
            room: room,
            thermostatMode: thermostatMode
        },
        success: function () {
            (getThermostatMode(room, thermostatModePlace, tTempPlace, autoTargettempPlace));
            //console.log(autoTargettempPlace);
            //console.log(thermostatModePlace); 
        }
    });
};
//----------------------------------------------------------------------------------------------



var autoTTempMinusButtonClassName = document.getElementsByClassName("autoTTempMinusButton");

var autoTTempMinusButtonFunction = function () {
    //console.log((this.parentElement.children[1]).value);
    this.parentElement.children[1].value = (parseFloat(this.parentElement.children[1].value) - 0.5).toFixed(1);
};

for (var i = 0; i < autoTTempMinusButtonClassName.length; i++) {
    autoTTempMinusButtonClassName[i].addEventListener('click', autoTTempMinusButtonFunction, false);
}



var autoTTempPlusButtonClassName = document.getElementsByClassName("autoTTempPlusButton");

var autoTTempPlusButtonFunction = function () {
    //console.log((this.parentElement.children[1]).value);
    this.parentElement.children[1].value = (parseFloat(this.parentElement.children[1].value) + 0.5).toFixed(1);
};

for (var i = 0; i < autoTTempPlusButtonClassName.length; i++) {
    autoTTempPlusButtonClassName[i].addEventListener('click', autoTTempPlusButtonFunction, false);
}




