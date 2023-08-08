var mysql = require('mysql')
var pool = mysql.createPool({
    host : 'aws-progavan.cit2cxontvuw.us-east-2.rds.amazonaws.com',
    port : 3306,
    user : 'mypasswd',
    password : 'mypasswd',
    database : 'progavan_proy'
});

var getConnection = function (cb){  //cb = connection base es un objeto
    pool.getConnection(function(err, connection){
        if(err){
            return cb(err);
        }
        cb(null, connection);
    });
};

module.exports = getConnection;

