
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Fonts/FreeSans12pt7b.h>


#define SCREEN_WIDTH 128 
#define SCREEN_HEIGHT 64 
#define   SSD1306_DISPLAYOFF   0xAE
#define   SSD1306_DISPLAYON   0xAF


// Declaration for an SSD1306 display connected to I2C (SDA, SCL pins)    /D2=SDK  D1=SCK/
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);

// set pin numbers
const int buttonPin = 13;     // the number of the minusbutton pin     /D7/
const int buttonPin2 = 12;       // the number of the plusbutton pin   /D6/
const int buttonPin3 = 15;      //the number of the modebutton pin /D8/

// GPIO where the DS18B20 is connected to
const int oneWireBus = 02;  //DS18 pin      /D4/

const int motionSensorPin = 14;  //Motion sensor pin      /D5/

// variables
int buttonState = 0;
int buttonState2 = 0;
int buttonState3 = 0;
int sensorState = 0;
int functionGetdata();
int functionPostData();
int minusButton();
int plusButton();
int modeButton();
int updateTargetTemp();
int displayStatus;

float temp;
String room = "Nappali";
String thermostatMode;
String thermostatStatus;
char sTargetTemp;
String autoTargetTemp;
float fTargetTemp;
float targettemp;
float minimum = 4;
float maximum = 28;
String targetTemp;
String payload;
String currentTime;
String postDataToGet =  "&room=" + room;
String postData = "&room=" + room + "&temp=" + temp + "&targettemp=" + targettemp;


const char *ssid = "xxx";  
const char *password = "yyy";


const char *host = "127.0.0.1";  
unsigned long startMillis;
unsigned long startMillis2;
unsigned long startMillis3;
unsigned long startMillis4;
unsigned long currentMillis;
unsigned long currentMillis2;
unsigned long currentMillis3;
unsigned long currentMillis4;
const unsigned long period = 60000;
const unsigned long periodButtons = 100;
const unsigned long periodSleep = 12000;
const unsigned long periodSensor = 1000;
unsigned long periodDisplay = 70000;

HTTPClient http;

OneWire oneWire(oneWireBus);


DallasTemperature sensors(&oneWire);



//Icons for display
const unsigned char tempBitmap [] PROGMEM = {
  // '20935-200, 20x20px
  0x00, 0x00, 0x00, 0x00, 0xe0, 0x00, 0x01, 0x90, 0x00, 0x01, 0x10, 0x00, 0x01, 0x10, 0x00, 0x01,
  0x17, 0x00, 0x01, 0x53, 0x00, 0x01, 0x53, 0x00, 0x01, 0x53, 0x00, 0x01, 0x50, 0x00, 0x01, 0x50,
  0x00, 0x02, 0x48, 0x00, 0x04, 0x44, 0x00, 0x04, 0xe4, 0x00, 0x05, 0xf4, 0x00, 0x04, 0xe4, 0x00,
  0x04, 0x44, 0x00, 0x02, 0x08, 0x00, 0x01, 0xf0, 0x00, 0x00, 0x00, 0x00
};

const unsigned char targettempBitmap [] PROGMEM = {
  // 'letöltés (1), 20x20px
  0x01, 0x80, 0x00, 0x03, 0xc0, 0x00, 0x04, 0x60, 0x00, 0xfc, 0x7f, 0xf0, 0x06, 0x60, 0x00, 0x03,
  0xc0, 0x00, 0x00, 0x00, 0x00, 0x00, 0x1c, 0x00, 0x00, 0x36, 0x00, 0xff, 0xe3, 0xf0, 0xff, 0xe3,
  0xf0, 0x00, 0x36, 0x00, 0x00, 0x1c, 0x00, 0x00, 0x00, 0x00, 0x03, 0xc0, 0x00, 0x06, 0x40, 0x00,
  0xfc, 0x7f, 0xf0, 0x04, 0x60, 0x00, 0x03, 0xc0, 0x00, 0x01, 0x80, 0x00
};


const unsigned char heatBitmap [] PROGMEM = {
  // 'letöltés (2), 20x20px
  0x00, 0x00, 0x00, 0x00, 0x10, 0x00, 0x00, 0x70, 0x00, 0x00, 0xf0, 0x00, 0x00, 0xf0, 0x00, 0x01,
  0xf2, 0x00, 0x05, 0xf6, 0x00, 0x0f, 0xf6, 0x00, 0x0f, 0xff, 0x00, 0x0f, 0xff, 0x00, 0x1f, 0xff,
  0x80, 0x1f, 0xff, 0x80, 0x1f, 0xcf, 0xc0, 0x3f, 0xc7, 0xc0, 0x3f, 0x07, 0xc0, 0x1e, 0x07, 0x80,
  0x1e, 0x03, 0x80, 0x0c, 0x03, 0x00, 0x04, 0x00, 0x00, 0x00, 0x00, 0x00
};


const unsigned char celsiusBitmap [] PROGMEM = {
  // 'images (1), 20x20px
  0x00, 0x00, 0x00, 0x38, 0x0f, 0xc0, 0x7c, 0x1f, 0xe0, 0xc6, 0x38, 0x70, 0xc6, 0x30, 0x30, 0xc6,
  0x60, 0x00, 0x7c, 0x60, 0x00, 0x78, 0x60, 0x00, 0x00, 0x60, 0x00, 0x00, 0x60, 0x00, 0x00, 0x60,
  0x00, 0x00, 0x60, 0x00, 0x00, 0x60, 0x00, 0x00, 0x60, 0x00, 0x00, 0x60, 0x00, 0x00, 0x30, 0x30,
  0x00, 0x38, 0x70, 0x00, 0x1f, 0xe0, 0x00, 0x0f, 0xc0, 0x00, 0x00, 0x00
};


const unsigned char manualBitmap [] PROGMEM = {
  0x00, 0x00, 0x00, 0x00, 0xc0, 0x00, 0x00, 0xd8, 0x00, 0x06, 0xd8, 0x00, 0x06, 0xd8, 0x00, 0x06, 
  0xd8, 0x00, 0x06, 0xd8, 0x00, 0x13, 0x78, 0x00, 0x1b, 0x7c, 0x60, 0x1b, 0xfc, 0xc0, 0x0f, 0xfd, 
  0xc0, 0x0f, 0xff, 0x80, 0x0f, 0xff, 0x00, 0x07, 0xff, 0x00, 0x07, 0xfe, 0x00, 0x07, 0xfe, 0x00, 
  0x03, 0xfe, 0x00, 0x03, 0xfc, 0x00, 0x01, 0xf0, 0x00, 0x00, 0x00, 0x00
};


const unsigned char autoBitmap[] PROGMEM = {
  0x00, 0x00, 0x00, 0x00, 0xf0, 0x00, 0x01, 0xf8, 0x00, 0x01, 0xf8, 0x00, 0x01, 0xf8, 0x00, 0x03, 
  0xfc, 0x00, 0x03, 0xfc, 0x00, 0x03, 0xbc, 0x00, 0x07, 0x9e, 0x00, 0x07, 0x9e, 0x00, 0x07, 0x9e, 
  0x00, 0x0f, 0x9f, 0x00, 0x0f, 0xff, 0x00, 0x0f, 0xff, 0x00, 0x1f, 0xff, 0x80, 0x1e, 0x07, 0x80, 
  0x1e, 0x07, 0x80, 0x1e, 0x07, 0xc0, 0x1c, 0x03, 0x80, 0x00, 0x00, 0x00
};



void setup() {
  // initialize the pushbuttons pin as an input
  pinMode(buttonPin, INPUT);
  pinMode(buttonPin2, INPUT);
  pinMode(buttonPin3, INPUT);
  pinMode(motionSensorPin, INPUT);


  startMillis = millis();
  startMillis2 = millis();
  startMillis3 = millis();
  startMillis4 = millis();

  delay(1000);
  Serial.begin(115200);
  Serial.println("Start setup");
  // Start the DS18B20 sensor
  //sensors.begin();
  WiFi.mode(WIFI_OFF);        //Prevents reconnection issue (taking too long to connect)
  delay(100);
  WiFi.mode(WIFI_STA);        //This line hides the viewing of ESP as wifi hotspot

  Serial.println("wifi indítása");
  WiFi.begin(ssid, password);     
  Serial.println("");

  Serial.println("csatlakozás");
  Serial.print("Connecting");
  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  //If connection successful show IP address in serial monitor
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  
  Serial.println("csatlakozva");
  Serial.println("csatlakozva, setup vége");


  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) { 
    Serial.println(F("SSD1306 allocation failed"));
    for (;;);
  }

  delay(500);

  display.clearDisplay();
}



void loop() {

  currentMillis2 = millis();  
  if (currentMillis2 - startMillis2 >= period) {
    startMillis2 = currentMillis2;
    
    getCurrentTime();
    getThermostatMode();
    getThermostatStatus();
    Serial.println(thermostatStatus);
    Serial.println(thermostatMode);
  }

  currentMillis = millis();  
  if (currentMillis - startMillis >= periodButtons) {
    startMillis = currentMillis;
     //Serial.println(thermostatMode);
    buttons();
    //getCurrentTime();
  }

  currentMillis3 = millis();  
  if (currentMillis - startMillis3 >= periodDisplay) {
    startMillis3 = currentMillis3;
    displayOff();
    periodDisplay = period;

  }

  currentMillis4 = millis();  
      if (currentMillis4 - startMillis4 >= periodSensor) {
    startMillis4 = currentMillis4;
    sensor();
    //getCurrentTime();

    }

}


void displayOff() {
  Serial.println("displayOff");
  displayStatus = 0;
  display.ssd1306_command(SSD1306_DISPLAYOFF);
}


void buttons() {
//Serial.println(thermostatMode);

  // read the state of the pushbutton value
  buttonState = digitalRead(buttonPin);

  buttonState2 = digitalRead(buttonPin2);

  buttonState3 = digitalRead(buttonPin3);

  sensorState = digitalRead(motionSensorPin);
 


  
  if (WiFi.status() == WL_CONNECTED) {
    if(thermostatMode == "manual"){

    //minusButton
    if (buttonState == HIGH)
    {
      Serial.println("minus pressed");
      minusButton();
    }

    //plusbutton
    if (buttonState2 == HIGH)
    {
      Serial.println("plus pressed");
      plusButton();
    }
    }

    //modebutton
    if (buttonState3 == HIGH) {
      Serial.println("mode pressed");
      modeButton();
    }
  }
}


void sensor() {
  if (sensorState == HIGH && displayStatus == 0)
  {
    Serial.println("Motion detected");
    displayStatus = 1;
    display.ssd1306_command(SSD1306_DISPLAYON);
  }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
void getThermostatStatus() {
  Serial.println("getThermostatStatus");
  //display.ssd1306_command(SSD1306_DISPLAYON);

  //postDataToGet =  "&room=" + room;

  HTTPClient http;    

  http.begin("http://192.168.1.99:80/smarthome/heating/getthermostatstatus.php");              //Specify request destination
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");    //Specify content-type header

  int httpCode = http.POST(postDataToGet);   //Send the request
  String payload = http.getString();    

  //Serial.println(payload);    

  thermostatStatus = payload;
  
  //Serial.print(thermostatStatus);
  http.end();
}


void getThermostatMode() {
  Serial.println("getThermostatMode");
  //display.ssd1306_command(SSD1306_DISPLAYON);

  //postDataToGet =  "&room=" + room;

  HTTPClient http;    

  http.begin("http://192.168.1.99:80/smarthome/heating/getthermostatmode.php");              
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");    

  int httpCode = http.POST(postDataToGet);   
  String payload = http.getString();    

  //Serial.println(payload);    

  thermostatMode = payload;
  http.end();


  if(thermostatMode == "auto"){
    Serial.println("automata mode");
    getautotargettemp(thermostatMode);
  }else{
    Serial.println("manual mode");
  String falseData = "manual";
    getdata(thermostatMode, falseData);
  }
  
  //Serial.print(thermostatMode);
  
  
}


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

void getautotargettemp(String) {
  Serial.println("getautotargettemp");
  //Serial.println(thermostatMode);

  //display.ssd1306_command(SSD1306_DISPLAYON);

  HTTPClient http;    

  http.begin("http://192.168.1.99:80/smarthome/heating/getautotargettemp.php");              
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");    

  int httpCode = http.POST(postDataToGet);   
  String payload = http.getString();    


  //Serial.println(payload);    
  autoTargetTemp = payload;
  Serial.println(autoTargetTemp);
  getdata(thermostatMode, autoTargetTemp);
}

/////////////////////////////////////////////////////////////
void getCurrentTime(){

  Serial.println("getCurrentTime");


  HTTPClient http;    

  http.begin("http://192.168.1.99:80/smarthome/heating/currenttime.php");             
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");   

  int httpCode = http.POST(room);   //Send the request
  String payload = http.getString();    //Get the response payload

  Serial.println(payload);    

  currentTime = payload;
  display.setCursor(0, 63);
  display.println(currentTime);

    http.end();
  
}

void getdata(String, String) {
  Serial.println("getdata");
  Serial.println(thermostatMode);

  //display.ssd1306_command(SSD1306_DISPLAYON);

  HTTPClient http;   

  http.begin("http://192.168.1.99:80/smarthome/heating/esp.php");             
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");    

  int httpCode = http.POST(postDataToGet);  
  String payload = http.getString();    

  //Serial.println(payload);    
  if(thermostatMode == "auto"){
    targetTemp = autoTargetTemp;
  }else{
    targetTemp = payload;
  }
 Serial.println("targetTemp");
  Serial.println(targetTemp);

  //targetTemp = payload;
  fTargetTemp = targetTemp.toFloat();
  sensors.requestTemperatures();
  temp = sensors.getTempCByIndex(0);

  //Serial.print(temp);
  //Serial.println("ºC");
  //Serial.print(fTargetTemp);
  //Serial.println("ºC");
  http.end();
  functionPostData(fTargetTemp, temp, thermostatMode);

  display.clearDisplay();

  display.drawBitmap(0, 0, tempBitmap, 20, 20, WHITE);
  display.drawBitmap(0, 21, targettempBitmap, 20, 20, WHITE);
  display.drawBitmap(80, 0, celsiusBitmap, 20, 20, WHITE);
  display.drawBitmap(80, 21, celsiusBitmap, 20, 20, WHITE);
  display.drawBitmap(108, 44, celsiusBitmap, 20, 20, WHITE);
  //display.drawBitmap(0, 44, heatBitmap, 20, 20, WHITE);


display.drawLine(0, 42, 128, 42, WHITE);
//display.drawLine(85, 43, 85, 64, WHITE);
//display.drawLine(105, 43, 105, 64, WHITE);
display.drawLine(60, 43, 60, 64, WHITE);
display.drawLine(105, 0, 105, 41, WHITE);
display.drawLine(106, 21, 128, 21, WHITE);
  

  display.setFont(&FreeSans12pt7b);
  display.setTextSize(0.5);
  display.setTextColor(WHITE);

  display.setCursor(30, 18);
  display.println(temp, 1);

  display.setCursor(30, 39);
  display.println(fTargetTemp, 1);

 display.setCursor(0, 63);
  display.println(currentTime);

   display.setCursor(63, 63);
  display.println("33.5");
  

  if(thermostatMode=="manual"){
    display.drawBitmap(108, 0, manualBitmap, 20, 20, WHITE);
  }else{
    display.drawBitmap(108, 0, autoBitmap, 20, 20, WHITE);
  }

  if(thermostatStatus=="be"){
    display.drawBitmap(108, 22, heatBitmap, 20, 20, WHITE);
  }
  
  display.display();
}


//Postdata

int functionPostData(float, float, String) {

  postData = "&room=" + room + "&temp=" + temp + "&targettemp=" + fTargetTemp + "&thermostatMode=" + thermostatMode + "&thermostatStatus=" + thermostatStatus;

  HTTPClient httpp;
  httpp.begin("http://192.168.1.99:80/smarthome/heating/insert.php");              
  httpp.addHeader("Content-Type", "application/x-www-form-urlencoded");   

Serial.println(postData);
  int httpCodee = httpp.POST(postData);   
  String resp = httpp.getString();    
  //Serial.println(postData);
  Serial.println(resp);
  httpp.end();
  return 0;
}



//minusButton function
int minusButton() {

  //display.ssd1306_command(SSD1306_DISPLAYON);
  Serial.println("minusbutton started");

  http.begin("http://192.168.1.99:80/smarthome/heating/esp.php");              
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");    

  int httpCode = http.POST(postDataToGet);   
  payload = http.getString();    
  //Serial.println(http.getString());

  //Serial.println(payload);    
  Serial.println(httpCode);

  fTargetTemp = payload.toFloat();
  if (fTargetTemp > minimum && fTargetTemp <= maximum) {
    targettemp = fTargetTemp - 0.5;

    //Serial.println(room);
    //Serial.println(fTargetTemp);
    //Serial.println(targettemp);
    //Serial.println("ºC");

    //Serial.println(room);
    //Serial.println(fTargetTemp);
    //Serial.println(targettemp);
    http.end();

    updateTargetTemp(room, targettemp, thermostatMode);
  }
}

//plusButton funuction
int plusButton() {

  http.begin("http://192.168.1.99:80/smarthome/heating/esp.php");           
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  int httpCode = http.POST(postDataToGet);
  String payload = http.getString();

  //Serial.println(payload);

  fTargetTemp = payload.toFloat();
  if (fTargetTemp >= minimum && fTargetTemp < maximum) {
    targettemp = fTargetTemp + 0.5;

    //Serial.println(room);
    //Serial.println(fTargetTemp);
    //Serial.println(targettemp);
    http.end();

    updateTargetTemp(room, targettemp, thermostatMode);
  }
}

//modebutton
int modeButton() {
  //display.ssd1306_command(SSD1306_DISPLAYON);

  // HTTPClient http;

  http.begin("http://192.168.1.99:80/smarthome/heating/getthermostatmode.php");
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  int httpCode = http.POST(postDataToGet);
  String payload = http.getString();

  Serial.println(payload);

  thermostatMode = payload;
  //Serial.println(thermostatMode.length());

  http.end();

  if (thermostatMode == "manual") {
    thermostatMode = "auto";
    updateThermostatMode(room, thermostatMode, targettemp);
  }  else if (thermostatMode == "auto") {
    thermostatMode = "manual";
    updateThermostatMode(room, thermostatMode, targettemp);
  } else {
    thermostatMode = "manual";
    updateThermostatMode(room, thermostatMode, targettemp);
  }
}


//function for update thermostatMode
int updateThermostatMode(String, String, float) {

  Serial.println("updateThermostatMode elidnítva");

  postData = "&room=" + room + "&thermostatMode=" + thermostatMode;
  //Serial.println(room);
  //Serial.println(thermostatMode);

  HTTPClient http;
  http.begin("http://192.168.1.99:80/smarthome/heating/updatethermostatmode.php");
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  int httpCodee = http.POST(postData);
  String resp = http.getString();
  Serial.println("update thermostatMode vége");

  http.end();
  sensors.requestTemperatures();
  temp = sensors.getTempCByIndex(0);

  display.clearDisplay();

  display.drawBitmap(0, 0, tempBitmap, 20, 20, WHITE);
  display.drawBitmap(0, 21, targettempBitmap, 20, 20, WHITE);
  display.drawBitmap(80, 0, celsiusBitmap, 20, 20, WHITE);
  display.drawBitmap(80, 21, celsiusBitmap, 20, 20, WHITE);
  display.drawBitmap(108, 44, celsiusBitmap, 20, 20, WHITE);
  //display.drawBitmap(0, 44, heatBitmap, 20, 20, WHITE);


display.drawLine(0, 42, 128, 42, WHITE);
//display.drawLine(85, 43, 85, 64, WHITE);
//display.drawLine(105, 43, 105, 64, WHITE);
display.drawLine(60, 43, 60, 64, WHITE);
display.drawLine(105, 0, 105, 41, WHITE);
display.drawLine(106, 21, 128, 21, WHITE);
  

  display.setFont(&FreeSans12pt7b);
  display.setTextSize(0.5);
  display.setTextColor(WHITE);

  display.setCursor(30, 18);
  display.println(temp, 1);

  display.setCursor(30, 39);
  display.println(fTargetTemp, 1);

 display.setCursor(0, 63);
  display.println(currentTime);

   display.setCursor(63, 63);
  display.println("33.5");
  

  if(thermostatMode=="manual"){
    display.drawBitmap(108, 0, manualBitmap, 20, 20, WHITE);
  }else{
    display.drawBitmap(108, 0, autoBitmap, 20, 20, WHITE);
  }

  if(thermostatStatus=="be"){
    display.drawBitmap(108, 22, heatBitmap, 20, 20, WHITE);
  }
  
  display.display();
  return 0;
}


//function for update targettemp
int updateTargetTemp(String, float, String) {
  Serial.println("update targettemp elidnítva");

  postData = "&room=" + room + "&targettemp=" + targettemp;
  //Serial.println(room);
  //Serial.println(targettemp);

  HTTPClient http;
  http.begin("http://192.168.1.99:80/smarthome/heating/updatetargettemp.php");
  http.addHeader("Content-Type", "application/x-www-form-urlencoded");

  int httpCodee = http.POST(postData);
  String resp = http.getString();
  //Serial.println("update targettemp vége");

  http.end();
  sensors.requestTemperatures();
  temp = sensors.getTempCByIndex(0);

 display.clearDisplay();

  display.drawBitmap(0, 0, tempBitmap, 20, 20, WHITE);
  display.drawBitmap(0, 21, targettempBitmap, 20, 20, WHITE);
  display.drawBitmap(80, 0, celsiusBitmap, 20, 20, WHITE);
  display.drawBitmap(80, 21, celsiusBitmap, 20, 20, WHITE);
  display.drawBitmap(108, 44, celsiusBitmap, 20, 20, WHITE);
  //display.drawBitmap(0, 44, heatBitmap, 20, 20, WHITE);


display.drawLine(0, 42, 128, 42, WHITE);
//display.drawLine(85, 43, 85, 64, WHITE);
//display.drawLine(105, 43, 105, 64, WHITE);
display.drawLine(60, 43, 60, 64, WHITE);
display.drawLine(105, 0, 105, 41, WHITE);
display.drawLine(106, 21, 128, 21, WHITE);
  

  display.setFont(&FreeSans12pt7b);
  display.setTextSize(0.5);
  display.setTextColor(WHITE);

  display.setCursor(30, 18);
  display.println(temp, 1);

  display.setCursor(30, 39);
  display.println(targettemp, 1);

 display.setCursor(0, 63);
  display.println(currentTime);

   display.setCursor(63, 63);
  display.println("33.5");
  

  if(thermostatMode=="manual"){
    display.drawBitmap(108, 0, manualBitmap, 20, 20, WHITE);
  }else{
    display.drawBitmap(108, 0, autoBitmap, 20, 20, WHITE);
  }

  if(thermostatStatus=="be"){
    display.drawBitmap(108, 22, heatBitmap, 20, 20, WHITE);
  }
  
  display.display();
  return 0;
}
