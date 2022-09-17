require('dotenv').config()
let express = require('express');
let app = express();
app.get('/', function(req, res){
  const absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath)
})

app.get('/json', (req, res) => {
  const message = 'Hello json';
  const responseMessage = process.env.MESSAGE_STYLE == 'uppercase' ? message.toUpperCase() : message ; 
  res.send({"message": responseMessage});
})

app.use('/public', express.static(__dirname + '/public'));



































 module.exports = app;
