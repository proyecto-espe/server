let app= require('express')();
const http = require('http').Server(app);
const port = 3000;
const ip = "172.31.84.194";
var bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

//cabeceras CORS
app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
})
//routes
app.use(require('./routes/natacion'))

http.listen(port, ip, () => {
  console.log(`Server running at port: ${port}`);
});

