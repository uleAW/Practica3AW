const express = require('express')
const app = express()
const fs = require('fs')
const port = 5050
const host = '127.0.0.1'
const mysql = require('mysql');
const bodyParser = require('body-parser');
require('body-parser-xml')(bodyParser);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw({limit:  '10mb'}))

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "admin1",
    port: 3306,
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

//Imagenes (/src/index es el directorio)
app.post('/src/index', function (req,res){
    console.log("ENVIADO");
    console.log(req.body);
})

app.post('/aniadirColeccion', function (req, res) {
    var values = [];
    var data = req.body

    // values.push([data['usuario'], data['pass']]);

    var buffer = new Buffer(data["imagen"], 'base64');
    console.log(buffer)
    fs.writeFile(__dirname + "/media/albumes/1.png", buffer, function (err) {
        try {
            if (err) throw err;

        } catch (err) {
            res.status(404).send();
        }
    })
    con.query("INSERT INTO colecciones (nombre, estado) VALUES ?", [values], function (err, result, fields) {
        try {
            if (err) throw err;
            res.status(200).send();
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
