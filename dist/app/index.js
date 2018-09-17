require("babel-core/register");
require("babel-polyfill");

const twilioSid = process.env.TWILIO_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(twilioSid, twilioAuthToken);

var express = require('express');
var app = express();
const bodyParser = require('body-parser');
var path = require("path");

app.set("view engine", "pug");
app.use(require("body-parser").urlencoded({ extended: false }));

app.set('port', process.env.PORT || 5000);
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());

app.get('/', function (req, res) {
		res.send('Hello there!');
});

function sendMsg(res) {
		twilioClient.messages.create({
				body: "This is Hays. I am testing this system. Call 5125345650 to stop this program. This message will be re-sent automatically. This number will change if you block the sms. If you continue to ignore me for weeks on end, I will program in voice calling. I do not give up.",
				from: '+15124022658',
				to: '+15125345650'
		}).then(message => console.log(message.sid)).done();

		res.send('Sending SMS...');
}

app.get('/send-sms-single', function (req, res) {
		sendMsg(res);
});

app.post('/sms', function (req, res) {
		if (req) {
				console.log("Success, here is the data: ", req.body);
				res.send('Success');
		} else {
				console.log("error error error");
				res.send('Failure');
		}
});

app.listen(app.get('port'), function (err) {
		if (err) {
				return console.log('something bad happened', err);
		}

		console.log("Node app is running at localhost:" + app.get('port'));
});