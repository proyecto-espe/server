const express = require('express');
const router = express.Router();
var getConnection = require('../conexion');
const multer = require('multer');

// Mensaje de verificación
router.get('/', (req, res) => {
    res.send("Bienvenido")
})

//login

router.post('/login/', (req, res) => {

    const data = {
        username: req.body.username,
        password: req.body.password
    }

    const sql = 'SELECT * FROM usuario WHERE nombreusuario = ? AND contrasenausuario = ?';
    const params = [data.username, data.password];

    getConnection(function (err, conn) {
        if (err) {
            return res.sendStatus(400, 'Error en conexion');
        }
        
        conn.query(sql, params, function (err, rows) {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede conectar a la base de datos');
            }
            
            if(rows.length == 0){
                conn.release();
                return res.status(400).send('Credenciales incorrectas');
            }

            res.send(rows[0]);
            conn.release();
        })
    });
});

//Consultar preinscritos
router.get('/preinscritos', (req, res) => {
    getConnection(function (err, conn) {
        if (err) {
            return res.sendStatus(400, 'Error en conexion');
        }
        conn.query('SELECT * FROM preinscrito WHERE estadopreinscrito IN ("Revision", "Rechazado")', function (err, rows) {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede conectar a la base de datos')
            }
            
            res.send(rows);
            conn.release();

        })
    });
});

//Consultar inscritos
router.get('/preinscritosaprobados', (req, res) => {
    getConnection(function (err, conn) {
        if (err) {
            return res.sendStatus(400, 'Error en conexion');
        }
        conn.query('SELECT * FROM preinscrito WHERE estadopreinscrito IN ("Aprobado")', function (err, rows) {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede conectar a la base de datos')
            }
            res.send(rows);
            conn.release();

        })
    });
});

/************************************ */
//Insertar preinscrito
router.post('/preinscrito/', (req, res) => {
    const data = {
        apellidopreinscrito: req.body.apellidopreinscrito,
        nombrepreinscrito: req.body.nombrepreinscrito,
        cedulapreinscrito: req.body.cedulapreinscrito,
        edadpreinscrito: req.body.edadpreinscrito,
        sexopreinscrito: req.body.sexopreinscrito,
        emergenciapreinscrito: req.body.emergenciapreinscrito,
        telefonopreinscrito: req.body.telefonopreinscrito,
        tutorpreinscrito: req.body.tutorpreinscrito,
        cursopreinscrito: req.body.cursopreinscrito,
        correopreinscrito: req.body.correopreinscrito,
        fotopreinscrito: req.body.fotopreinscrito,
        vaucherinscrito: req.body.vaucherinscrito
    }
    //console.log(data);

    const query = "INSERT INTO preinscrito  (apellidopreinscrito, nombrepreinscrito, cedulapreinscrito, edadpreinscrito, sexopreinscrito, emergenciapreinscrito,  telefonopreinscrito, tutorpreinscrito, cursopreinscrito, correopreinscrito, fotopreinscrito, vaucherinscrito) VALUES (\'" + data.apellidopreinscrito + "\', \'" + data.nombrepreinscrito + "\', \'" + data.cedulapreinscrito + "\', \'" + data.edadpreinscrito + "\', \'" + data.sexopreinscrito + "\', \'" + data.emergenciapreinscrito + "\', \'" + data.telefonopreinscrito + "\', \'" + data.tutorpreinscrito + "\', \'" + data.cursopreinscrito + "\', \'" + data.correopreinscrito + "\', ?, ? )";

    getConnection(function (err, conn) {
        if (err) {
            console.log("No se puede conectar a la base de datos" + err);
        }
        conn.query(query, [data.fotopreinscrito, data.vaucherinscrito], function (err, result) {
            if (!err) {
                res.json({ status: 'Registro exitoso' });
            } else {
                console.log('generando error');
                console.log(err);
            }
            conn.release();
        })
    });
});

//Eliminar preinscrito
router.delete('/preinscrito/eliminar/:id', (req, res) => {
    const idPreinscrito = req.params.id;
    getConnection(function (err, conn) {
        if (err) {
            return res.sendStatus(400, 'Error en conexion');
        }
        conn.query('DELETE FROM preinscrito WHERE idpreinscrito = ?', [idPreinscrito], function (err, rows) {
            if (err) {
                conn.release();
                return res.sendStatus(400, 'No se puede conectar a la base de datos');
            }
            res.json({ status: 'Eliminación exitosa' });
            conn.release();
        });
    });
});

//Modificar estado preinscrito
router.put('/preinscrito/actualizar/:id', (req, res) => {
    const idPreinscrito = req.params.id;
    getConnection(function (err, conn) {
        const data = {
            fotopreinscrito: req.body.fotopreinscrito,
            estadopreinscrito: req.body.estadopreinscrito,
        }

        const query = "UPDATE preinscrito SET estadopreinscrito = \'" + data.estadopreinscrito + "\',fotopreinscrito = \'" + data.fotopreinscrito + "\' WHERE idpreinscrito= ?";

        if (err) {
            console.log("No se puede conectar a la base de datos" + err);
        }
        conn.query(query, idPreinscrito, function (err, result) {
            if (!err) {
                res.json({ status: 'Actualizacion exitosa' });
            } else {
                console.log(err);
            }
            //res.send(rows);
            conn.release();
        })
    });
});

//Modificar estado inscrito
router.put('/preinscrito/actualizar1/:id', (req, res) => {
    const idPreinscrito = req.params.id;
    getConnection(function (err, conn) {
        const data = {
            fotopreinscrito: req.body.fotopreinscrito,
            estadopreinscrito1: req.body.estadopreinscrito1,
            vaucherinscrito: req.body.vaucherinscrito
        }

        const query = "UPDATE preinscrito SET estadopreinscrito1 = \'" + data.estadopreinscrito1 + "\', fotopreinscrito= ?,  vaucherinscrito=? WHERE idpreinscrito= ?";

        if (err) {
            console.log("No se puede conectar a la base de datos" + err);
        }
        conn.query(query, [data.fotopreinscrito, data.vaucherinscrito, idPreinscrito], function (err, result) {
            if (!err) {
                res.json({ status: 'Actualizacion exitosa' });
            } else {
                console.log(err);
            }
            //res.send(rows);
            conn.release();
        })
    });
});


// Configurar multer para guardar los archivos en el servidor
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Ruta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    },
  });
  
  const upload = multer({ storage: storage });
  
  var getConnection = require('../conexion');
  
  // Insertar pago
  router.post('/pago/', upload.single('voucher'), (req, res) => {
    const data = {
        //nombre de columna bd = lo que viene del html
        cedulapago: req.body.cedulapago,
        nombrepago: req.body.nombrepago,
        cedulaestudiante: req.body.cedulaestudiante,
        nombreestudiante: req.body.nombreestudiante,
        fotopago: req.body.fotopago
    }

    const query = "INSERT INTO pago  (cedulapago, nombrepago, cedulaestudiante, nombreestudiante, fotopago) VALUES (\'" + data.cedulapago + "\', \'" + data.nombrepago + "\', \'" + data.cedulaestudiante + "\', \'" + data.nombreestudiante + "\', \'" + data.fotopago + "\')";

    getConnection(function (err, conn) {
        if (err) {
            console.log("No se puede conectar a la base de datos" + err);
        }
        conn.query(query, function (err, result) {
            if (!err) {
                res.json({ status: 'Registro exitoso' });
            } else {
                console.log(err);
            }
            conn.release();
        })
    });
});


module.exports = router;


