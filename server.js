const express = require('express')
const app = express()
const fs = require('fs')
const port = 5050
const host = '127.0.0.1'
const mysql = require('mysql');

// NO CAMBIAR IMPORTANTE
app.use(express.urlencoded({extended: true}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Lr20jcxx%",
    port: 3006,
    database: "kiosko"
})

try {
    con.connect(function (err) {
        if (err) throw err;
    });
} catch (err) {
    console.log("Error al abrir la BD");
}

//Permite servir paginas estaticas con cualquier extension
app.use(express.static(__dirname + '/'));

// //Listener post
app.post('/', function (req, res) {
    console.log("POST");
});

// //Listener get
app.get('/', function (req, res) {
    console.log("GET");
});

app.post('/inicioSesion', function (req, res) {
    var data = req.body

    con.query("SELECT * FROM socios WHERE usuario = ? and contrasenia = ?", [data["usuario"], data["pass"]], function (err, result, fields) {
        try {
            if (err) throw err;
            if (result.length)
                res.status(200).send();
            else
                res.status(300).send();
        } catch (err) {
            console.log(err);
            res.status(404).send();
        }
    });
});


app.post('/registrar', function (req, res) {
    var values = [];
    var data = req.body

    values.push([data['usuario'], data['pass']]);

    con.query("INSERT INTO socios (usuario, contrasenia) VALUES ?", [values], function (err, result, fields) {
        try {
            if (err) throw err;
            res.status(200).send();
        } catch (err) {
            console.log(err);
            res.status(404).send();
        }
    });
});

app.post('/aniadirColeccion', function (req, res) {
    var values = [];
    var data = req.body
    var ruta = __dirname + "/media/albumes/"+data["nombre"] +".png"
    var values2 = [];
    values.push([data["nombre"]]);
    var buffer = new Buffer(data["imagen"], 'base64');

    fs.writeFile(ruta, buffer, function (err) {
        try {
            if (err) throw err;

        } catch (err) {
            res.status(404).send();
        }
    })
    con.query("INSERT INTO colecciones (nombre) VALUES ?", [values], function (err, result, fields) {
        try {
            if (err) throw err;
            values2.push([ruta, data["precio"], result.insertId]);
            con.query("INSERT INTO albumes (imagen, precio, idColeccion) VALUES ?", [values2], function (err, result, fields) {
                try {
                    if (err) throw err;
                } catch (err) {
                    console.log(err);
                    res.status(404).send();
                }
            });
        } catch (err) {
            console.log(err);
            res.status(404).send();
        }
    });
});

app.listen(port, () => {
    console.log(`Listening at http://${host}:${port}`)
})

// EJEMPLO DE QUERY CUANDO HAYA QUE HACER UNA QUERY SE HACE ASÍ
con.query("SELECT * FROM colecciones", function (err, result, fields) {
    try {
        if (err) throw err;
        console.log(result);
    } catch(err) {
        console.log(err);
    }
});
