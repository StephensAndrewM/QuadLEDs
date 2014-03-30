var SerialPort  = require('serialport').SerialPort;

var comPort = "COM12";

var arduinoSerial = new SerialPort(comPort, {
	baudRate: 9600, 		// this is synced to what was set for the Arduino Code
	dataBits: 8, 			// this is the default for Arduino serial communication
	parity: 'none', 		// this is the default for Arduino serial communication
	stopBits: 1, 			// this is the default for Arduino serial communication
	flowControl: false 		// this is the default for Arduino serial communication
}, false);

arduinoSerial.open(function () {

	console.log("OPEN");

	setInterval(function() {

		var iRed = Math.floor(Math.random()*256);
		var iBlue = Math.floor(Math.random()*256);
		var iGreen = Math.floor(Math.random()*256);

		var sRed = iRed.toString(16);
		var sBlue = iBlue.toString(16);
		var sGreen = iGreen.toString(16);

		arduinoSerial.write("#"+sRed+sBlue+sGreen+"4000~", function(err, results) {
			console.log('err ' + err);
			console.log('results ' + results);
		});

		console.log("#"+sRed+sBlue+sGreen+"4000~");

	}, 5000);

	/*arduinoSerial.on('data', function(data) {
		console.log('data received: ' + data);
	});*/
});