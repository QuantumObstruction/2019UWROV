/*
*-------------------------------------------------------------------------*
*                                                                         *
*         Oregon State University Underwater Robotics Club                *
*   This code is not for redistribution this solely for the development   *
*                   of the 2019 OSU Underwater ROV                        *
*                                                                         *
*                 UnderWater ROV CS Lead: Jeramie Chew                    *
* ______________________chewje@oregonstate.edu____________________________*


Team goals:
1.)Program all sensors/i2c on Teensy and Serial output them Serial read
                *NXP 9DOF // Pitch/Roll/Yaw math implemented
                                                orientation not decided
                *MS08(pin) Pressure sensor
                *HSR04(pin) Ultrasonic Distance Sensor x 2
                *Metal Detector
                *PH Sensor
                *MUX PWM
                *Servo Driver
2.)Record gstreamer feed
                *Save to file
3.)Take still image gstreamer
                *Save to file
4.)Communicate our final sensor readouts to webpage
                *res.send or socket.io
5.)Process still images with Tensorflow for obj detect
                *Still learning this--- We will be using the 2 files previously mentioned
6.)Turn an LED on with OpenCV
                *This is our Helloworld to autnoous movement
7.)Communicate to the MUX (Insert model here) proper PWM signals for ESC communication
                *Link to documentation here
8.)Communicate with Servos through servo driver (Insert model here)
                *Link to documentation
9.)Use OpenCV for autnomous travel-- Follow a line ---- Square turns
10.)Link gstreamer index.html to the server implement CSS/HTML build


           **Feel free to contact Jeramie Chew on Slack or email with any questions**
*/
"use strict"
var express = require('express');
var fs = require('fs');
var path = require('path');
const port_number = 4000;

var app = require('express');
//var server = require('http').createServer(app).listen(port_number);


var app = express();
var server = require('http').createServer(app).listen(port_number);
console.log("server now listening on port 4000 || 3389");
//{console.log("==Server is listneing on port", port_number);});


const io = require('socket.io')(server);

//app.use(express.static(__dirname = '/public'));
app.use(express.static(__dirname + '/public'));
const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
//UDEV set to teensy
const port = new SerialPort('/dev/teensy', { baudRate: 9600 });
const parser = port.pipe(new Readline({ delimiter: '\n' })); // Read the port data




//port.on("open... is one of many functions serialport gives us. We have error checking and
//many other functions **link serial port github here**
port.on("open", () => {
  console.log('opened Baud 9600');
});


parser.on('data', data =>{
//data needs to be represented as Picth/Roll/Yaw prefebley in an into an array.
//  console.log(data);
//parse our data and distribute into a visual representation on the webpage
parseSensors(data);
});

function parseSensors(serial) {
                var accelX = parseFloat(serial.split(' ')[1]);
                var accelY = parseFloat(serial.split(' ')[3]);
                var accelZ = parseFloat(serial.split(' ')[5]);
                var magX = parseFloat(serial.split(' ')[8]);
                var magY = parseFloat(serial.split(' ')[10]);
                var magZ = parseFloat(serial.split(' ')[12]);


var pitch = 180 * Math.atan(accelX/Math.sqrt(accelY*accelY + accelZ*accelZ))/Math.PI;
var roll = 180 * Math.atan(accelY/Math.sqrt(accelX*accelX + accelZ*accelZ))/Math.PI;
var yaw = 180 * Math.atan(accelZ/Math.sqrt(accelX*accelX + accelZ*accelZ))/Math.PI;
console.log("Pitch: ", pitch.toFixed(4), "Roll: ", roll.toFixed(4), "Yaw: ", yaw.toFixed(4));



}


app.get(['/','index.html'], function (req, res) {
  res.sendfile('./public/');
  console.log("== loaded index.html");
});


//This lets us have a port
/*
app.listen(4000, function () {
  console.log('Listening on port 4000');
});
*/



//io.on('connection', client => {
//  client.on('event', data => { /* … */ });
//  client.on('disconnect', () => { /* … */ });
//});
//server.listen(4000);
//console.log('4000');
