const express = require('express')
const app = express()
const port = 5050
const host = '127.0.0.1'
const mysql = require('mysql');

//Permite servir paginas estaticas con cualquier extension
app.use(express.static(__dirname + '/'));

//Listener post
app.post('/', function (req, res) {
    console.log("POST");
});

//Listener get
app.get('/',function (req, res) {
    console.log("GET");
});

app.listen(port, () => {
    console.log(`Listening at http://${host}:${port}`)
})

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "insertaTuContrasenia",
    port: 3006,
    database: "kiosko"
})

// EJEMPLO DE QUERY CUANDO HAYA QUE HACER UNA QUERY SE HACE ASÍ
con.connect(function(err) {
    if (err) throw err;
    con.query("SELECT * FROM colecciones", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});
