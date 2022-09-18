let bodyParser = require("body-parser");
require('dotenv').config()
let express = require('express');
let app = express();

app.use('/public', express.static(__dirname + '/public'));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - ${req.ip}`)
  next()
})

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
  const absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath)
})

app.get('/json', (req, res) => {
  const message = 'Hello json';
  const responseMessage = process.env.MESSAGE_STYLE == 'uppercase' ? message.toUpperCase() : message ; 
  res.send({"message": responseMessage});
})

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({time: req.time})
})

app.get('/:word/echo', (req,res) => {
  res.send({echo: req.params.word})
})

app.route('/name').get((req, res) => {
  console.log(req.query);
  res.send({name: `${req.query.first} ${req.query.last}`})
}).post((req, res) => {
  console.log(req.body.last);
  res.send({name: `${req.body.first} ${req.body.last}`})
})


































 module.exports = app;
