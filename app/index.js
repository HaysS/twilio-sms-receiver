require("babel-core/register");
require("babel-polyfill");

const twilioSid = process.env.TWILIO_SID;
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(twilioSid, twilioAuthToken);

var express = require('express')
var app = express()
const bodyParser = require('body-parser');
var path = require("path");

app.set("view engine", "pug");
app.use(require("body-parser").urlencoded({extended: false}));


app.set('port', (process.env.PORT || 5000))
app.use(express.static(__dirname + '/public'))

app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.send('Hello there!')
})

app.get('/send-sms', function(req, res) {
	twilioClient.messages
		.create({
		 body: "This is Hays. Please reply to this number to verify that this text was received. It is coded in a computer so I can\'t tell it works.",
		 from: '+15124022658',
		 to: '+15127857177'
		})
		.then(message => console.log(message.sid))
		.done();	

  	response.send('Sending SMS...')
})

app.post('/sms', function(req, res) {
	if(req) {
		console.log("Success, here is the data: ", req.body)
		res.send('Success')
	} else {
		console.log("error error error")
		res.send('Failure')
	}
})

app.listen(app.get('port'), function(err) {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log("Node app is running at localhost:" + app.get('port'))
})