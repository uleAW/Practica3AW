const express = require('express')
const app = express()
const fs = require('fs')
const port = 5050
const host = '127.0.0.1'
const mysql = require('mysql');

// NO CAMBIAR IMPORTANTE
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({extended: true, limit: '50mb'}));

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

app.listen(port, () => {
    console.log(`Listening at http://${host}:${port}`)
})

app.post('/inicioSesion', function (req, res) {
    var data = req.body

    con.query("SELECT * FROM socios WHERE usuario = ? and contrasenia = ?", [data["usuario"], data["pass"]], function (err, result, fields) {
        try {
            if (err) throw err;
            if (result.length) {
                con.query("SELECT rol FROM socios WHERE usuario = ? and contrasenia = ?", [data["usuario"], data["pass"]], function (err, result, fields) {
                    try {
                        if (result[0].rol == "usuario") {
                            //Usuario
                            res.status(200).send();
                        } else {
                            //Admin
                            console.log("ADMIN")
                            res.status(201).send();
                        }
                    } catch (err) {
                        console.log(err);
                        res.status(404).send();
                    }
                })
            } else {
                res.status(202).send("Introduce los datos correctamente");
            }
        } catch (err) {
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
            res.status(200).send("Usuario registrado correctamente");
        } catch (err) {
            res.status(201).send("Ya existe un usuario con ese nombre");
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

    con.query("INSERT INTO colecciones (nombre) VALUES ?", [values], function (err, result, fields) {
        try {
            if (err) throw err;
            values2.push([ruta, data["precio"], result.insertId]);
            con.query("INSERT INTO albumes (imagen, precio, idColeccion) VALUES ?", [values2], function (err, result, fields) {
                try {
                    if (err) throw err;
                    fs.writeFile(ruta, buffer, function (err) {
                        try {
                            if (err) throw err;
                        } catch (err) {
                            res.status(404).send();
                        }
                    })
                    fs.mkdir(__dirname + "/media/colecciones/" + data["nombre"], (err) => {
                        if (err) throw err;
                    });
                    res.status(200).send("Coleccion añadida correctamente");
                } catch (err) {
                    console.log(err);
                    res.status(404).send();
                }
            });
        } catch (err) {
            console.log(err);
            res.status(201).send("ERROR: ya existe una coleccion con ese nombre");
        }
    });
});

var coleccionID;
app.post('/cargarImagen', function (req, res) {
    coleccionID = req.body.numColeccion;//
    console.log(coleccionID);
    res.end();
});

app.get('/imagenNombre', function (req, res) {
    var data = req.body
    console.log(data["numColeccion"]);
    con.query("SELECT nombre FROM cromos WHERE numColeccion = ?", coleccionID, function (err, result, fields) {
        var out = "";
        for (let item of result) {
            out = out + item.nombre + ",";
        }
        ;
        res.send(out);
    });


});
app.post('/coleccionCromos', function (req, res) {
    var data = req.body
    //console.log(data["numColeccion"]);
    con.query("SELECT codCromo FROM cromos", function (err, result, fields) {
        var out = "";
        for (let item of result) {
            out = out + item.codCromo + ",";
        }
        //console.log(result);
        res.send(out);
    });


});
app.post('/coleccionCromosImagenes', function (req, res) {
    var data = req.body
    //console.log(data["numColeccion"]);
    con.query("SELECT imagen FROM cromos", function (err, result, fields) {
        var out = "";
        for (let item of result) {
            var bitmap = fs.readFileSync(item.imagen);
            var data = Buffer(bitmap).toString('base64');
            out = out + data + ",";
        }
        //console.log(result);
        res.send(out);
    });


});
app.get('/imagenDireccion', function (req, res) {
    var data = req.body

    con.query("SELECT imagen FROM cromos WHERE numColeccion = ?", coleccionID, function (err, result, fields) {
        var out = "";
        for (let item of result) {
            var bitmap = fs.readFileSync(item.imagen);
            var data = Buffer(bitmap).toString('base64');
            out = out + data + ",";
        }
        ;
        res.send(out);
    });
});

app.post('/coleccionNombre', function (req, res) {
    //var data = req.body

    con.query("SELECT nombre FROM colecciones", function (err, result, fields) {
        var out = "";
        for (let item of result) {
            out = out + item.nombre + ",";
        }

        res.send(out);
    });
});
app.post('/coleccionID', function (req, res) {
    //var data = req.body

    con.query("SELECT numColeccion FROM colecciones", function (err, result, fields) {
        var out = "";
        for (let item of result) {
            out = out + item.numColeccion + ",";
        }

        res.send(out);
    });
});
app.post('/albumImg', function (req, res) {
    //var data = req.body

    con.query("SELECT imagen FROM albumes", function (err, result, fields) {
        var out = "";
        for (let item of result) {
            out = out + item.imagen + ",";
        }

        res.send(out);
    });
});
app.post('/albumColeccion', function (req, res) {
    //var data = req.body

    con.query("SELECT idColeccion FROM albumes", function (err, result, fields) {
        var out = "";
        for (let item of result) {
            out = out + item.numColeccion + ",";
        }

        res.send(out);
    });
});

//SELECT precio, idAlbum FROM albumes WHERE idColeccion = (SELECT numColeccion FROM colecciones WHERE nombre = ?)
app.post('/coleccionUsuarioID', function (req, res) {
    var data = req.body

    con.query("SELECT codCromos FROM coleccionusuario WHERE numSocio = (SELECT numSocio FROM socios WHERE usuario = ?)", data["numUsuario"], function (err, result, fields) {
        var out = ";";
        for (let item of result) {
            out = out + item.codCromos + ";";
        }

        res.send(out);
    });
});

app.post('/aniadirCromo', function (req, res) {
    var values = [];
    var data = req.body

    con.query("SELECT numColeccion FROM colecciones WHERE nombre= ?", [data["coleccion"]], function (err, result, fields) {
        try {
            var ruta = __dirname + "/media/colecciones/" + data["coleccion"] + "/" + data["coleccion"] + "_" + data["nombre"] + ".png"
            values.push([data["nombre"], ruta, data["precio"], result[0].numColeccion]);
            var buffer = new Buffer(data["imagen"], 'base64');

            fs.writeFile(ruta, buffer, function (err) {
                if (err) throw err;
            });
            con.query("INSERT INTO cromos (nombre, imagen, precio, numColeccion) VALUES ?", [values], function (err, result, fields) {
                if (err) throw err;
                res.status(200).send("Cromo añadido correctamente");
            });
        } catch (err) {
            console.log(err);
            res.status(200).send("ERROR: no hay una coleccion con ese nombre");
        }
    });

});

app.post('/comprarCromo', function (req, res) {
    var values = [];
    var data = req.body;
    con.query("SELECT copias, precio, codCromo FROM cromos WHERE nombre = ?", [data["cromo"]], function (err, result, fields) {
        try {
            if (err) throw err;
            var precio = result[0].precio
            var copias = result[0].copias
            var idCromo = result[0].codCromo
            if (copias > 0) {
                // COMPROBAR TAMBIEN QUE TIENE MONEDAS SUFICIENTES
                con.query("SELECT puntos, numSocio FROM socios WHERE usuario = ?", [data["usuario"]], function (err, result, fields) {
                    if (err) throw err;
                    var numSocio = result[0].numSocio;
                    var puntos = result[0].puntos
                    if (puntos >= precio) {
                        con.query("SELECT numColeccion FROM colecciones WHERE nombre = ?", [data["nombreColeccion"]], function (err, result, fields) {
                            if (err) throw err;
                            var numColeccion = result[0].numColeccion
                            values.push(["completada parcialmente", numColeccion, numSocio, idCromo + ";"]);
                            // AQUI PONER QUERY PARA ASIGNAR EL CROMO AL USUARIO
                            con.query("SELECT * FROM coleccionusuario WHERE numColeccion = ?", [numColeccion], function (err, result, fields) {
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
                                        res.status(200).send("Cromo comprado correctamente");
                                    });
                                } else {
                                    var cromos = result[0].codCromos;
                                    var datos = []
                                    var album = result[0].idAlbum;
                                    if (cromos != '') {
                                        datos = cromos.split(';');
                                    }
                                    if (datos.indexOf(idCromo.toString()) === -1) {
                                        con.query("SELECT * FROM cromos WHERE  numColeccion = ?", numColeccion, function (err, result, fields) {
                                            try {
                                                if (err) throw err;
                                                var estado = "completada";
                                                for (var i = 0; i < result.length; i++) {
                                                    if (result[i].codCromo != idCromo.toString()) {
                                                        if (datos.indexOf(result[i].codCromo.toString()) == -1) {
                                                            estado = "completada parcialmente"
                                                        }
                                                    }
                                                }
                                                if (album == null) {
                                                    estado = "completada parcialmente"
                                                }
                                                con.query("UPDATE coleccionusuario SET codCromos = concat(codCromos, ?), estado = ? WHERE numSocio = ? AND numColeccion = ?", [idCromo + ";", estado, numSocio, parseInt(numColeccion)], function (err, result, fields) {
                                                    if (err) throw err;
                                                });
                                                con.query("UPDATE cromos SET copias = copias - 1 WHERE nombre = ?", [data["cromo"]], function (err, result, fields) {
                                                    if (err) throw err;
                                                });
                                                con.query("UPDATE socios SET puntos = puntos - ? WHERE usuario = ?", [precio, data["usuario"]], function (err, result, fields) {
                                                    if (err) throw err;
                                                    res.status(200).send("Cromo comprado correctamente");
                                                });
                                            } catch (err) {
                                                console.log(err);
                                                res.status(404).send();
                                            }
                                        });
                                    } else {
                                        res.status(200).send("ERROR: ya tienes este cromo");
                                    }
                                }
                            });
                        });
                    } else {
                        res.status(200).send("ERROR: no tienes suficientes puntos para comprar ese cromo");
                    }
                });
            } else {
                res.status(200).send("ERROR: no hay copias disponibles");
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
                    // AQUI PONER QUERY PARA ASIGNAR EL ALBUM AL USUARIO
                    con.query("SELECT numColeccion FROM colecciones WHERE nombre = ?", [data["album"]], function (err, result, fields) {
                        if (err) throw err;
                        var idColeccion = result[0].numColeccion
                        con.query("SELECT * FROM coleccionusuario WHERE numColeccion = ? and numSocio = ?", [idColeccion, numSocio], function (err, result, fields) {
                            //Si esta vacia, solo he comprado el album
                            if (result.length == 0) {
                                values.push([idAlbum, "no iniciada", idColeccion, numSocio, '']);
                                con.query("INSERT INTO coleccionusuario (idAlbum, estado, numColeccion, numSocio, codCromos) VALUES ?", [values], function (err, result, fields) {
                                        if (err) throw err;
                                        // ACTUALIZAMOS LOS PUNTOS DEL USUARIO
                                        con.query("UPDATE socios SET puntos = puntos - ? WHERE usuario = ?", [precio, data["usuario"]], function (err, result, fields) {
                                            if (err) throw err;
                                            res.status(200).send("Album comprado correctamente");
                                        });
                                    }
                                );
                            } else {
                                if (result[0].idAlbum == null) {
                                    var cromos = result[0].codCromos
                                    var datos = cromos.split(';')
                                    con.query("SELECT * FROM cromos WHERE  numColeccion = ?", idColeccion, function (err, result, fields) {
                                        try {
                                            if (err) throw err;
                                            var estado = "completada";
                                            for (var i = 0; i < result.length; i++) {
                                                if (datos.indexOf(result[i].codCromo.toString()) == -1) {
                                                    estado = "completada parcialmente"
                                                }
                                            }
                                            con.query("UPDATE coleccionusuario SET idAlbum = ?, estado = ? WHERE numSocio = ? AND numColeccion = ?", [idAlbum, estado, numSocio, parseInt(idColeccion)], function (err, result, fields) {
                                                if (err) throw err;
                                                con.query("UPDATE socios SET puntos = puntos - ? WHERE usuario = ?", [precio, data["usuario"]], function (err, result, fields) {
                                                    if (err) throw err;
                                                    res.status(200).send("Album comprado correctamente");
                                                });
                                            });
                                        } catch (err) {
                                            console.log(err);
                                            res.status(404).send();
                                        }
                                    });
                                } else {
                                    res.status(200).send("ERROR: ya tienes comprado este album");
                                }
                            }
                            if (err) throw err;
                        });
                    });
                } else {
                    res.status(200).send("ERROR: no tienes suficientes puntos para comprar el album");
                }
            });
        } catch (err) {
            console.log(err);
            res.status(404).send();
        }
    })
    ;
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

app.post('/addPuntos', function (req, res) {
    var data = req.body;
    con.query("UPDATE socios SET puntos = puntos + ? WHERE usuario = ?", [data["puntos"], data["usuario"]], function (err, result, fields) {
        try {
            if (err) throw err;
            res.status(200).send();
        } catch (err) {
            console.log(err);
        }
    });
});

app.post('/cargarInfoCromo', function (req, res) {
    var data = req.body;
    var nombre = data["nombreColeccion"]
    con.query("SELECT * FROM cromos WHERE nombre = ? and numColeccion = (SELECT numColeccion FROM colecciones WHERE nombre = ?)", [data["nombreCromo"], data["nombreColeccion"]], function (err, result, fields) {
        try {
            if (err) throw err;
            var out = "";
            var bitmap = fs.readFileSync(result[0].imagen);
            var data = Buffer(bitmap).toString('base64');
            out = out + result[0].nombre + ",";
            out = out + data + ",";
            out = out + result[0].precio.toString() + ",";
            out = out + result[0].copias.toString() + ",";
            out = out + nombre + ",";
            res.send(out);
        } catch (err) {
            console.log(err);
        }
    });
});

app.post("/activarColeccion", function (req, res) {
    var data = req.body;
    con.query("UPDATE colecciones SET estado='activa' WHERE nombre = ?", [data["nombre"]], function (err, result, fields) {
        try {
            if (err) throw err;
            if (result.affectedRows == 0) {
                res.status(200).send("ERROR: no existe una coleccion con ese nombre");
            } else {
                res.status(200).send("Colección activada correctamente");
            }
        } catch (err) {
            console.log(err);
        }
    });
});