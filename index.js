let app= require('express')();
const http = require('http').Server(app);
const express = require('express'); 

const hostname = '127.0.0.1';
const port = 3000;

//var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

//app.use(express.json());

//cabeceras CORS
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
})

//routes
app.use(require('./routes/natacion'))

http.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

