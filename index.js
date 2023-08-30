let app= require('express')();
const http = require('http').Server(app);
const cors = require('cors');
const port = 3000;
const ip = "172.31.84.194";
var bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
};

app.use(cors(corsOptions));
//routes
app.use(require('./routes/natacion'))

http.listen(port, ip, () => {
  console.log(`Server running at port: ${port}`);
});

