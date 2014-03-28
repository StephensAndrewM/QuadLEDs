var http = require('http'),
    fs = require('fs'),
    // NEVER use a Sync function except at start-up!
    index = fs.readFileSync(__dirname + '/html/index.html');

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

// Socket.io server listens to our app
var io = require('socket.io').listen(app);

app.listen(301);




var SerialPort  = require('serialport').SerialPort;

var comPort = "COM3";

var arduinoSerial = new SerialPort(comPort, {
	baudRate: 4800, 		// this is synced to what was set for the Arduino Code
	dataBits: 8, 			// this is the default for Arduino serial communication
	parity: 'none', 		// this is the default for Arduino serial communication
	stopBits: 1, 			// this is the default for Arduino serial communication
	flowControl: false 		// this is the default for Arduino serial communication
}, false);

arduinoSerial.open(function () {

	console.log("OPEN");

	io.socket.on('color', function(data) {

		console.log(data);

		/*var iRed = Math.floor(Math.random()*256);
		var iBlue = Math.floor(Math.random()*256);
		var iGreen = Math.floor(Math.random()*256);*/

		/*var iRed = 255;
		var iBlue = 255;
		var iGreen = 255;*/

		var rgb = hex.match(/.{1,2}/g);
		var iRed = parseInt("0x"+rgb[0]);
		var iBlue = parseInt("0x"+rgb[1]);
		var iGreen = parseInt("0x"+rgb[2]);

		var sRed = String.fromCharCode(iRed);
		var sBlue = String.fromCharCode(iBlue);
		var sGreen = String.fromCharCode(iGreen);

		console.log("A"+sRed+sBlue+sGreen);

		arduinoSerial.write("A"+sRed+sBlue+sGreen, function(err, results) {
			console.log('err ' + err);
			console.log('results ' + results);
		});
	}, 1000);

	/*arduinoSerial.on('data', function(data) {
		console.log('data received: ' + data);
	});*/
});