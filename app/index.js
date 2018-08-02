require("babel-core/register");
require("babel-polyfill");

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

app.listen(app.get('port'), function(err) {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log("Node app is running at localhost:" + app.get('port'))
})