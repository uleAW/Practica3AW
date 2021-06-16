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
    password: "aaaa",
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

app.listen(port, () => {
    console.log(`Listening at http://${host}:${port}`)
})

//Realiza la autenticacion del usuario, segun sea usuario, admin. Avisa si los datos son incorrectos
app.post('/inicioSesion', function (req, res) {
    var data = req.body
    //Busca el usuario con 'x' nombre e 'y' password
    con.query("SELECT * FROM socios WHERE usuario = ? and contrasenia = ?", [data["usuario"], data["pass"]], function (err, result, fields) {
        try {
            if (err) throw err;
            if (result.length) {
                //Comprueba el rol del usuario y envia un estado 200 para usuario y 201 para admin
                con.query("SELECT rol FROM socios WHERE usuario = ? and contrasenia = ?", [data["usuario"], data["pass"]], function (err, result, fields) {
                    try {
                        if (result[0].rol == "usuario") {
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
                })
            } else {
                res.status(202).send("Introduce los datos correctamente");
            }
        } catch (err) {
            res.status(404).send();
        }
    });
});

// Devuelve el id de los albumes que estan activos
app.post("/albumID", function (req, res) {
    con.query("SELECT idAlbum FROM albumes WHERE idColeccion IN (SELECT numColeccion FROM colecciones WHERE estado <> 'inactiva')", function (err, result, fields) {
        try {
            if (err) throw err;
            var out = "";
            for (let item of result) {
                out = out + item.idAlbum + ",";
            }
            res.status(200).send(out);
        } catch (err) {
            console.log(err);
        }
    });
});

// Devuelve la imagen de los albumes que estan activos
app.post("/albumesUsuario1", function (req, res) {
    con.query("SELECT imagen FROM albumes WHERE idColeccion IN (SELECT numColeccion FROM colecciones WHERE estado <> 'inactiva')", function (err, result, fields) {
        try {
            if (err) throw err;
            var out = "";
            for (let item of result) {
                var bitmap = fs.readFileSync(__dirname + item.imagen);
                var data = Buffer(bitmap).toString('base64');
                out = out + data + ",";
            }
            res.status(200).send(out);
        } catch (err) {
            console.log(err);
        }
    });
});

// Devuelve el precio de los albumes que estan activos
app.post("/albumesPrecio1", function (req, res) {
    var data = req.body;
    con.query("SELECT precio FROM albumes WHERE idColeccion IN (SELECT numColeccion FROM colecciones WHERE estado <> 'inactiva')", function (err, result, fields) {
        try {
            if (err) throw err;
            var out = "";
            for (let item of result) {
                out = out + item.precio + ",";
            }
            res.status(200).send(out);
        } catch (err) {
            console.log(err);
        }
    });
});

//Registra a un usuario en la base de datos, CON ROL USUARIO
app.post('/registrar', function (req, res) {
    var values = [];
    var data = req.body

    values.push([data['usuario'], data['pass']]);

    con.query("INSERT INTO socios (usuario, contrasenia) VALUES ?", [values], function (err, result, fields) {
        //Devuelve un estado 200 si se ha registrado correctamente, 201 en caso contrario
        try {
            if (err) throw err;
            res.status(200).send("Usuario registrado correctamente");
        } catch (err) {
            res.status(201).send("Ya existe un usuario con ese nombre");
        }
    });
});

// Añade una coleccion a la base de datos
app.post('/aniadirColeccion', function (req, res) {
    var values = [];
    var data = req.body
    var ruta = "/media/albumes/" + data["nombre"] + ".png"
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
                    fs.writeFile(__dirname + ruta, buffer, function (err) {
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
    res.end();
});

// Busca el nombre de los cromos de una coleccion
app.get('/imagenNombre', function (req, res) {
    var data = req.body
    con.query("SELECT nombre FROM cromos WHERE numColeccion = ?", coleccionID, function (err, result, fields) {
        var out = "";
        for (let item of result) {
            out = out + item.nombre + ",";
        }
        ;
        res.status(200).send(out);
    });
});

// Busca el id de los cromos de una coleccion
app.get('/imagenID', function (req, res) {
    var data = req.body
    con.query("SELECT codCromo FROM cromos WHERE numColeccion = ?", coleccionID, function (err, result, fields) {
        var out = "";
        res.status(200).send(out);
    });
});

// Busca el id de los cromos de una coleccion
app.post('/IDimagen', function (req, res) {
    var data = req.body
    con.query("SELECT codCromo FROM cromos WHERE numColeccion = ?", data["numColeccion"], function (err, result, fields) {
        var out = "";
        for (let item of result) {
            out = out + item.codCromo + ",";
        }
        res.status(200).send(out);
    });
});

// Busca el id de los cromos
app.post('/coleccionCromos', function (req, res) {
    var data = req.body
    con.query("SELECT codCromo FROM cromos", function (err, result, fields) {
        var out = "";
        for (let item of result) {
            out = out + item.codCromo + ",";
        }
        res.status(200).send(out);
    });
});

// Busca la imagen de los cromos de una coleccion
app.post('/coleccionCromosImagenes', function (req, res) {
    var data = req.body
    con.query("SELECT imagen FROM cromos", function (err, result, fields) {
        var out = "";
        for (let item of result) {
            var bitmap = fs.readFileSync(__dirname + item.imagen);
            var data = Buffer(bitmap).toString('base64');
            out = out + data + ",";
        }
        res.status(200).send(out);
    });
});

// Devuelve la imagen precio y nombre de un cromo a partir del nombre de la coleccion
app.post('/imagenDireccion', function (req, res) {
    var data = req.body
    con.query("SELECT imagen, precio, nombre FROM cromos WHERE numColeccion = (SELECT numColeccion FROM colecciones WHERE nombre = ?)", [data["numColeccion"]], function (err, result, fields) {
        var out = "";
        for (let item of result) {
            var bitmap = fs.readFileSync(__dirname + item.imagen);
            var data = Buffer(bitmap).toString('base64');
            out = out + data + ",";
            out = out + item.precio + ",";
            out = out + item.nombre + ",";
        }
        res.status(200).send(out);
    });
});

// Deuvelve el nombre de las colecciones activas
app.post('/coleccionNombre', function (req, res) {
    //var data = req.body
    con.query("SELECT nombre FROM colecciones WHERE estado <> 'inactiva'", function (err, result, fields) {
        var out = "";
        for (let item of result) {
            out = out + item.nombre + ",";
        }
        res.status(200).send(out);
    });
});

// Devuelve el id de las colecciones
app.post('/coleccionID', function (req, res) {
    con.query("SELECT numColeccion FROM colecciones", function (err, result, fields) {
        var out = "";
        for (let item of result) {
            out = out + item.numColeccion + ",";
        }
        res.status(200).send(out);
    });
});

// Deuvelve la imagen de los albumes
app.post('/albumImg', function (req, res) {
    con.query("SELECT imagen FROM albumes", function (err, result, fields) {
        var out = "";
        for (let item of result) {
            out = out + item.imagen + ",";
        }
        res.status(200).send(out);
    });
});

// Deuvelve el id de los albumes
app.post('/albumColeccion', function (req, res) {
    con.query("SELECT idColeccion FROM albumes", function (err, result, fields) {
        var out = "";
        for (let item of result) {
            out = out + item.numColeccion + ",";
        }
        res.status(200).send(out);
    });
});

// Devuelve los cromos de las colecciones del usuario
app.post('/coleccionUsuarioID', function (req, res) {
    var data = req.body
    con.query("SELECT codCromos FROM coleccionusuario WHERE numSocio = (SELECT numSocio FROM socios WHERE usuario = ?)", data["numUsuario"], function (err, result, fields) {
        var out = ";";
        for (let item of result) {
            out = out + item.codCromos + ";";
        }
        res.status(200).send(out);
    });
});

// Añade un cromo a la base de datos
app.post('/aniadirCromo', function (req, res) {
    var values = [];
    var data = req.body
    con.query("SELECT numColeccion FROM colecciones WHERE nombre= ?", [data["coleccion"]], function (err, result, fields) {
        try {
            var ruta = "/media/colecciones/" + data["coleccion"] + "/" + data["coleccion"] + "_" + data["nombre"] + ".png"
            values.push([data["nombre"], ruta, data["precio"], result[0].numColeccion]);
            var buffer = new Buffer(data["imagen"], 'base64');

            con.query("INSERT INTO cromos (nombre, imagen, precio, numColeccion) VALUES ?", [values], function (err, result, fields) {
                try {
                    if (err) throw err;
                    fs.writeFile(__dirname + ruta, buffer, function (err) {
                        try {
                            if (err) throw err;
                            res.status(200).send("Cromo añadido correctamente");
                        } catch (err) {
                            res.status(200).send("ERROR: ya existe un cromo con ese nombre");
                        }
                    });
                } catch (err) {
                    res.status(200).send("ERROR: ya existe un cromo con ese nombre");
                }
            });
        } catch (err) {
            console.log(err);
            res.status(200).send("ERROR: no hay una coleccion con ese nombre");
        }
    });
});

// Compra un cromo
app.post('/comprarCromo', function (req, res) {
    var values = [];
    var data = req.body;
    //OBTENEMOS EL NUMERO DE COPIAS Y EL PRECIO DEL CROMO
    con.query("SELECT copias, precio, codCromo FROM cromos WHERE nombre = ?", [data["cromo"]], function (err, result, fields) {
        try {
            if (err) throw err;
            var codCromo = result[0].codCromo
            var precio = result[0].precio
            var copias = result[0].copias
            if (copias > 0) {
                // COMPROBAR TAMBIEN QUE TIENE MONEDAS SUFICIENTES
                con.query("SELECT puntos, numSocio FROM socios WHERE usuario = ?", [data["usuario"]], function (err, result, fields) {
                    if (err) throw err;
                    var numSocio = result[0].numSocio;
                    var puntos = result[0].puntos
                    if (puntos >= precio) {
                        if (err) throw err;

                        // AQUI PONER QUERY PARA ASIGNAR EL CROMO AL USUARIO
                        con.query("SELECT * FROM coleccionusuario WHERE numColeccion = (SELECT numColeccion FROM colecciones WHERE nombre = ?) AND numSocio = (SELECT numSocio FROM socios WHERE usuario = ?)", [data["numColeccion"], data["usuario"]], function (err, result, fields) {
                            //Si esta vacia, es el primer cromo de la coleccion
                            if (result.length == 0) {
                                con.query("SELECT numColeccion FROM colecciones WHERE nombre = ?", [data["numColeccion"]], function (err, result, fields) {
                                    values.push(["completada parcialmente", result[0].numColeccion, numSocio, codCromo + ";"]);
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
                                });
                            } else {
                                var cromos = result[0].codCromos;
                                var datos = []
                                var album = result[0].idAlbum;
                                if (cromos != '') {
                                    datos = cromos.split(';');
                                }
                                if (datos.indexOf(codCromo.toString()) === -1) {
                                    con.query("SELECT * FROM cromos WHERE numColeccion = (SELECT numColeccion FROM colecciones WHERE nombre = ?)", data["numColeccion"], function (err, result, fields) {
                                        try {
                                            if (err) throw err;
                                            var estado = "completada";
                                            for (var i = 0; i < result.length; i++) {
                                                if (result[i].codCromo != codCromo.toString()) {
                                                    if (datos.indexOf(result[i].codCromo.toString()) == -1) {
                                                        estado = "completada parcialmente"
                                                    }
                                                }
                                            }
                                            if (album == null) {
                                                estado = "completada parcialmente"
                                            }
                                            con.query("UPDATE coleccionusuario SET codCromos = concat(codCromos, ?), estado = ? WHERE numSocio = ? AND numColeccion = (SELECT numColeccion FROM colecciones WHERE nombre = ?)", [codCromo + ";", estado, numSocio, data["numColeccion"]], function (err, result, fields) {
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

// Compra un album
app.post('/comprarAlbum', function (req, res) {
    var values = [];
    var data = req.body;
    con.query("SELECT nombre FROM colecciones WHERE numColeccion = (SELECT idColeccion FROM albumes WHERE idAlbum = ?)", [data["album"]], function (err, result, fields) {
        try {
            if (err) throw err;
            var album = result[0].nombre;
            con.query("SELECT precio, idAlbum FROM albumes WHERE idColeccion = (SELECT numColeccion FROM colecciones WHERE nombre = ?)", album, function (err, result, fields) {
                try {
                    if (err) throw err;
                    var precio = result[0].precio
                    var idAlbum = result[0].idAlbum
                    con.query("SELECT numSocio, puntos FROM socios WHERE usuario = ?", [data["usuario"]], function (err, result, fields) {
                        if (err) throw err;
                        if (result[0].puntos >= precio) {
                            var numSocio = result[0].numSocio
                            // AQUI PONER QUERY PARA ASIGNAR EL ALBUM AL USUARIO
                            con.query("SELECT numColeccion FROM colecciones WHERE nombre = ?", album, function (err, result, fields) {
                                if (err) throw err;
                                var idColeccion = result[0].numColeccion
                                con.query("SELECT * FROM coleccionusuario WHERE numColeccion = ? and numSocio = ?", [idColeccion, numSocio], function (err, result, fields) {
                                    //COMPROBAMOS SI YA EXISTE LA COLECCION
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
            });
        } catch (err) {
            console.log(err);
        }
    });
});

//Carga los puntos que tiene el usuario
app.post('/cargarPuntos', function (req, res) {
    var data = req.body;
    con.query("SELECT puntos FROM socios WHERE usuario = ?", data["usuario"], function (err, result, fields) {
        try {
            if (err) throw err;
            var puntos = result[0].puntos
            res.status(200).send(puntos.toString());
        } catch (err) {
            //console.log(err);
        }
    });
});

//Suma los puntos al usuario tras realizar una actividad
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

// Devuelve los datos relevantes en un cromo
app.post('/cargarInfoCromo', function (req, res) {
    var data = req.body;
    con.query("SELECT * FROM cromos WHERE codCromo = ?", [data["cromoID"]], function (err, result, fields) {
        try {
            if (err) throw err;
            var out = "";
            var bitmap = fs.readFileSync(__dirname + result[0].imagen);
            var data = Buffer(bitmap).toString('base64');
            out = out + result[0].nombre + ",";
            out = out + data + ",";
            out = out + result[0].precio.toString() + ",";
            out = out + result[0].copias.toString() + ",";
            res.status(200).send(out);
        } catch (err) {
            console.log(err);
        }
    });
});

// Activa una coleccion en la bd
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

// Busca las imagenes de los albumes de un usuario
app.post("/albumesUsuario", function (req, res) {
    var data = req.body;
    con.query("SELECT imagen FROM albumes WHERE idAlbum IN (SELECT idAlbum FROM coleccionusuario WHERE numSocio = (SELECT numSocio FROM socios WHERE usuario = ?))", [data["nombre"]], function (err, result, fields) {
        try {
            if (err) throw err;
            var out = "";
            for (let item of result) {
                var bitmap = fs.readFileSync(__dirname + item.imagen);
                var data = Buffer(bitmap).toString('base64');
                out = out + data + ",";
            }
            res.status(200).send(out);
        } catch (err) {
            console.log(err);
        }
    });
});

// Busca la imagen, nombre, estado y cromos de una coleccion del usuario
app.post("/nombreColeccionesUsuario", function (req, res) {
    var data = req.body;
    con.query("SELECT c.imagen, a.nombre, b.estado, b.codCromos FROM colecciones a JOIN coleccionusuario b ON a.numColeccion = b.numColeccion JOIN albumes c ON b.idAlbum = c.idAlbum WHERE b.numSocio = (SELECT numSocio FROM socios WHERE usuario = ?)", [data["nombre"]], function (err, result, fields) {
        try {
            if (err) throw err;
            var out = "";
            for (let item of result) {
                var bitmap = fs.readFileSync(__dirname + item.imagen);
                var data = Buffer(bitmap).toString('base64');
                out = out + data + ",";
                out = out + item.nombre + ",";
                out = out + item.estado + ",";
                out = out + (item.codCromos.split(';').length - 1) + ",";
            }
            res.status(200).send(out);
        } catch (err) {
            console.log(err);
        }
    });
});

// Busca el estado de las colecciones del usuario
app.post("/estadoColeccionesUsuario", function (req, res) {
    var data = req.body;
    con.query("SELECT estado FROM coleccionUsuario WHERE numSocio = (SELECT numSocio FROM socios WHERE usuario = ?)", [data["nombre"]], function (err, result, fields) {
        try {
            if (err) throw err;
            var out = "";
            for (let item of result) {
                out = out + item.estado + ",";
            }
            res.status(200).send(out);
        } catch (err) {
            console.log(err);
        }
    });
});

// Busca la imagen de los cromos de una coleccion de un usuario
app.post("/imagenCromosUsuario", function (req, res) {
    var data = req.body;
    con.query("SELECT codCromos FROM coleccionusuario WHERE numColeccion = (SELECT numColeccion FROM colecciones WHERE nombre = ?) and numSocio = (SELECT numSocio FROM socios WHERE usuario = ?)", [data["nombreAlbum"], data["nombreUsuario"]], function (err, result, fields) {
        try {
            if (err) throw err;
            var datos = result[0].codCromos.split(';');
            con.query("SELECT imagen FROM cromos WHERE codCromo IN (?)", [datos], function (err, result, fields) {
                try {
                    if (err) throw err;
                    var out = "";
                    for (let item of result) {
                        var bitmap = fs.readFileSync(__dirname + item.imagen);
                        var data = Buffer(bitmap).toString('base64');
                        out = out + data + ",";
                    }
                    res.status(200).send(out);
                } catch (err) {
                    console.log(err);
                }
            });
        } catch (err) {
            console.log(err);
        }
    });
});

// Busca el nombre cromos de una coleccion de un usuario
app.post("/nombreCromosUsuario", function (req, res) {
    var data = req.body;
    con.query("SELECT codCromos FROM coleccionusuario WHERE numColeccion = (SELECT numColeccion FROM colecciones WHERE nombre = ?) and numSocio = (SELECT numSocio FROM socios WHERE usuario = ?)", [data["nombreAlbum"], data["nombreUsuario"]], function (err, result, fields) {
        try {
            if (err) throw err;
            var datos = result[0].codCromos.split(';');
            con.query("SELECT nombre FROM cromos WHERE codCromo IN (?)", [datos], function (err, result, fields) {
                try {
                    if (err) throw err;
                    var out = "";
                    for (let item of result) {
                        out = out + item.nombre + ",";
                    }
                    res.status(200).send(out);
                } catch (err) {
                    console.log(err);
                }
            });
        } catch (err) {
            console.log(err);
        }
    });
});