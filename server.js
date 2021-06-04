const express = require('express')
const app = express()
const port = 5050
const host = '127.0.0.1'
const path = require('path')


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