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
            if (result.length) {
                ///
                con.query("SELECT rol FROM socios WHERE usuario = ? and contrasenia = ?", [data["usuario"], data["pass"]], function (err, result, fields) {
                    try {
                        if (result == "usuario") {
                            //Usuario
                            res.status(200).send();
                        } else {
                            //Admin
                            res.status(201).send();
                        }
                    } catch (err) {
                        console.log(err);
                        res.status(404).send();
                    }
                });
                ///
                res.status(200).send();
            } else {
                res.status(300).send();
            }
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
    var ruta = __dirname + "/media/albumes/" + data["nombre"] + ".png"
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
                    res.status(200).send();
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

var coleccionID;
app.post('/cargarImagen', function (req, res) {
    coleccionID = req.body.numColeccion;//data["numColeccion"];
    console.log(coleccionID);
    res.end();
});

app.get('/imagenNombre', function (req, res) {
    //var data = req.body
    //console.log(nombre);
    con.query("SELECT nombre FROM cromos WHERE numColeccion = ?", coleccionID, function (err, result, fields) {
        var out = "";
        for (let item of result) {
            out = out + item.nombre + ",";
        }
        ;
        res.send(out);
    });


});

app.get('/imagenDireccion', function (req, res) {
    var data = req.body

    con.query("SELECT imagen FROM cromos WHERE numColeccion = ?", coleccionID, function (err, result, fields) {
        var out = "";
        for (let item of result) {
            out = out + item.imagen + ",";
        }
        ;
        res.send(out);
    });
});

app.listen(port, () => {
    console.log(`Listening at http://${host}:${port}`)
})

app.post('/aniadirCromo', function (req, res) {
    var values = [];
    var data = req.body
    var ruta = __dirname + "/media/albumes/" + data["coleccion"] + "_" + data["nombre"] + ".png"

    values.push([data["nombre"], ruta, data["precio"], data["coleccion"]]);

    var buffer = new Buffer(data["imagen"], 'base64');

    fs.writeFile(ruta, buffer, function (err) {
        try {
            if (err) throw err;
        } catch (err) {
            res.status(404).send();
        }
    })

    con.query("INSERT INTO cromos (nombre, imagen, precio, numColeccion) VALUES ?", [values], function (err, result, fields) {
        try {
            if (err) throw err;
            res.status(200).send();
        } catch (err) {
            console.log(err);
            res.status(404).send();
        }
    });
});

app.post('/comprarCromo', function (req, res) {
    var values = [];
    var data = req.body;
    con.query("SELECT copias, precio FROM cromos WHERE nombre = ?", [data["cromo"]], function (err, result, fields) {
        try {
            if (err) throw err;
            var precio = result[0].precio
            var copias = result[0].copias
            if (copias > 0) {
                // COMPROBAR TAMBIEN QUE TIENE MONEDAS SUFICIENTES
                con.query("SELECT puntos, numSocio FROM socios WHERE usuario = ?", [data["usuario"]], function (err, result, fields) {
                    if (err) throw err;
                    var numSocio = result[0].numSocio;
                    var puntos = result[0].puntos
                    if (puntos >= precio) {
                        values.push(["completada parcialmente", data["idcoleccion"], numSocio, data["idcromo"] + ";"]);
                        // AQUI PONER QUERY PARA ASIGNAR EL CROMO AL USUARIO
                        con.query("SELECT * FROM coleccionusuario WHERE numColeccion = ?", [data["idcoleccion"]], function (err, result, fields) {
                            //Si esta vacia, es el primer cromo de la coleccion
                            if (result.length == 0) {
                                con.query("INSERT INTO coleccionusuario (estado, numColeccion, numSocio, codCromos) VALUES ?", [values], function (err, result, fields) {
                                    if (err) throw err;
                                });
                                con.query("UPDATE cromos SET copias = copias - 1 WHERE nombre = ?", [data["cromo"]], function (err, result, fields) {
                                    if (err) throw err;
                                });
                                con.query("UPDATE socios SET puntos = puntos - ? WHERE usuario = ?", [precio, data["usuario"]], function (err, result, fields) {
                                    if (err) throw err;
                                    res.status(200).send();
                                });
                            } else {
                                var cromos = result[0].codCromos;
                                var datos = cromos.split(';');
                                console.log(datos.indexOf(data["idcromo"])===-1);
                                if (datos.indexOf(data["idcromo"]) === -1) {
                                    con.query("UPDATE coleccionusuario SET codCromos = concat(codCromos,?) WHERE numSocio = ? AND numColeccion = ?", [data["idcromo"] + ";", numSocio, parseInt(data["idcoleccion"])], function (err, result, fields) {
                                        if (err) throw err;
                                    });
                                    con.query("UPDATE cromos SET copias = copias - 1 WHERE nombre = ?", [data["cromo"]], function (err, result, fields) {
                                        if (err) throw err;
                                    });
                                    con.query("UPDATE socios SET puntos = puntos - ? WHERE usuario = ?", [precio, data["usuario"]], function (err, result, fields) {
                                        if (err) throw err;
                                        res.status(200).send();
                                    });
                                } else {
                                    console.log("YA TIENE EL CROMO");
                                    res.status(404).send();
                                }
                            }
                            if (err) throw err;
                        });
                    } else {
                        res.status(404).send();
                    }
                });
            } else {
                // DEVOLVER MENSAJE DE QUE NO HAY CROMOS DISPONIBLES
                res.status(404).send();
            }
        } catch (err) {
            console.log(err);
            res.status(404).send();
        }
    });
});

app.post('/comprarAlbum', function (req, res) {
    var values = [];
    var data = req.body;
    con.query("SELECT precio, idAlbum FROM albumes WHERE idColeccion = (SELECT numColeccion FROM colecciones WHERE nombre = ?)", [data["album"]], function (err, result, fields) {
        try {
            if (err) throw err;
            var precio = result[0].precio
            var idAlbum = result[0].idAlbum
            con.query("SELECT numSocio, puntos FROM socios WHERE usuario = ?", [data["usuario"]], function (err, result, fields) {
                if (err) throw err;
                if (result[0].puntos >= precio) {
                    var numSocio = result[0].numSocio
                    values.push([idAlbum, "no iniciada", data["idcoleccion"], numSocio]);
                    // AQUI PONER QUERY PARA ASIGNAR EL ALBUM AL USUARIO
                    con.query("SELECT * FROM coleccionusuario WHERE numColeccion = ?", [data["idcoleccion"]], function (err, result, fields) {
                        //Si esta vacia, solo he comprado el album
                        if (result.length == 0) {
                            con.query("INSERT INTO coleccionusuario (idAlbum, estado, numColeccion, numSocio) VALUES ?", [values], function (err, result, fields) {
                                try {
                                    if (err) throw err;
                                    con.query("UPDATE socios SET puntos = puntos - ? WHERE usuario = ?", [precio, data["usuario"]], function (err, result, fields) {
                                        if (err) throw err;
                                        res.status(200).send();
                                    });
                                } catch (err) {
                                    console.log(err);
                                    res.status(404).send();
                                }
                            });
                        } else {
                            if (result[0].idAlbum == null) {
                                con.query("UPDATE coleccionusuario SET idAlbum = ? WHERE numSocio = ? AND numColeccion = ?", [idAlbum, numSocio, parseInt(data["idcoleccion"])], function (err, result, fields) {
                                    try {
                                        if (err) throw err;
                                        con.query("UPDATE socios SET puntos = puntos - ? WHERE usuario = ?", [precio, data["usuario"]], function (err, result, fields) {
                                            if (err) throw err;
                                            res.status(200).send();
                                        });
                                    } catch (err) {
                                        // Ya tiene el album comprado
                                        console.log(err);
                                        res.status(404).send();
                                    }
                                });
                            } else {
                                console.log("COMPRADO");
                                // ya tiene el album comprado
                                res.status(404).send();
                            }
                        }
                        if (err) throw err;
                    });
                    res.status(200).send();
                } else {
                    console.log("No tiene puntos")
                    res.status(404).send();
                }
            });
        } catch (err) {
            console.log(err);
            res.status(404).send();
        }
    });
});

app.post('/cargarPuntos', function (req, res) {
    var data = req.body;
    con.query("SELECT puntos FROM socios WHERE usuario = ?", data["usuario"], function (err, result, fields) {
        try {
            if (err) throw err;
            var puntos = result[0].puntos
            res.status(200).send(puntos.toString());
        } catch (err) {
            console.log(err);
        }
    });
});

app.post('/cargarInfoCromo', function (req, res) {
    var data = req.body;
    con.query("SELECT * FROM cromos WHERE codCromo = ?", data["idCromo"], function (err, result, fields) {
        try {
            if (err) throw err;
            var out = "";
            var bitmap = fs.readFileSync(result[0].imagen);
            var data = Buffer(bitmap).toString('base64');
            out = out + result[0].nombre + ",";
            out = out + data + ",";
            out = out + result[0].precio.toString() + ",";
            out = out + result[0].copias.toString() + ",";
            out = out + result[0].numColeccion + ",";
            res.send(out);
        } catch (err) {
            console.log(err);
        }
    });
});


// EJEMPLO DE QUERY CUANDO HAYA QUE HACER UNA QUERY SE HACE ASÍ
con.query("SELECT * FROM colecciones", function (err, result, fields) {
    try {
        if (err) throw err;
        // console.log(result);
    } catch (err) {
        console.log(err);
    }
});