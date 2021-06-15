function funciones() {
    checkSesion();
    mostrarPuntos();
    datos();
}

function checkSesion() {
    if (localStorage.getItem("Cookie_Sesion") == "false") {
        alert("NECESARIO INICIAR SESION");
        window.open("./inicioSesion.html", "_self");
    }
}

//Inactividad
function e(q) {
    document.body.appendChild(document.createTextNode(q));
    document.body.appendChild(document.createElement("BR"));
}

function inactividad() {
    //Solo se excedera el tiempo cuando la sesion cuente como iniciada
    if (localStorage.getItem("Cookie_Sesion") == "true") {
        alert("SESION EXPIRADA");
        localStorage.setItem("Cookie_Sesion", "false");
        window.open("./inicioSesion.html", "_self");
        localStorage.removeItem("user");
    }
}

var t = null;

function contadorInactividad() {
    t = setTimeout("inactividad()", 1800000); //30 min (1800000)
}

window.onblur = window.onmousemove = function() {
    if (t) clearTimeout(t);
    contadorInactividad();
}

function mostrarPuntos() {
    var usuario = localStorage.getItem("user");
    document.getElementById("nombreUsuario").innerHTML = localStorage.getItem("user")
    fetch("/cargarPuntos", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "usuario": usuario })
    }).then(response => response.text().then(function(text) {
        document.getElementById("puntos").innerHTML = text;
    }));
}

//Cerrar Sesion
function cerrarSesion() {
    localStorage.removeItem("user");
    localStorage.removeItem("pass");
    localStorage.removeItem("back");
    console.log(localStorage.getItem("back"))
    window.open("/index.html", "_self");
}

function coleccionNombre() {
    fetch("/coleccionNombre", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
        //body: JSON.stringify({"numColeccion": count})
    }).then(response => response.text().then(function(text) {

        localStorage.setItem("coleccionNombre", text);

    }));
};

function coleccionID() {
    fetch("/coleccionID", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
        //body: JSON.stringify({"numColeccion": count})
    }).then(response => response.text().then(function(text) {

        localStorage.setItem("coleccionID", text);
    }));
};

function cromoID() {
    fetch("/coleccionCromos", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },

    }).then(response => response.text().then(function(text) {
        localStorage.setItem("cromosID", text);
    }));

}

function cromoImagen() {
    return fetch("/coleccionCromosImagenes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => response.text().then(function(text) {
        return text;
    }));
}

var text;

async function datos() {
    text = await cromoImagen();
}

function table() {
    coleccionID()
    coleccionNombre()
    window.open("./comprar.html", "_self");
}

function buscarImagenes() {
    return fetch("/albumesUsuario", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "nombre": localStorage.getItem("user") })
    }).then(response => response.text().then(function(text) {
        return text;
    }));
}

function buscarNombres() {
    return fetch("/nombreColeccionesUsuario", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "nombre": localStorage.getItem("user") })
    }).then(response => response.text().then(function(text) {
        return text;
    }));
}

function estadoColeccion() {
    return fetch("/estadoColeccionesUsuario", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "nombre": localStorage.getItem("user") })
    }).then(response => response.text().then(function(text) {
        return text;
    }));
}

function calcularNumCromos() {
    return fetch("/calcularNumCromos", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "nombre": localStorage.getItem("user") })
    }).then(response => response.text().then(function(text) {
        return text;
    }));
}

async function cargarAlbumes() {
    var nombresAlbumes;
    var imgAlbumes;
    var estadosColeccion;
    var numCromos;
    imgAlbumes = await buscarImagenes();
    imgAlbumes = imgAlbumes.split(",");
    nombresAlbumes = await buscarNombres();
    nombresAlbumes = nombresAlbumes.split(",");
    estadosColeccion = await estadoColeccion();
    estadosColeccion = estadosColeccion.split(",");
    numCromos = await calcularNumCromos();
    numCromos = numCromos.split(",");
    for (var i = 0; i < imgAlbumes.length - 1; i++) {
        var newDiv = document.createElement('div');
        newDiv.id = 'album' + i;
        newDiv.className = 'album';
        document.getElementById('menu').appendChild(newDiv);

        newDiv = document.createElement('img');
        newDiv.id = 'img' + i;
        newDiv.className = 'image';
        newDiv.src = "data:image/png;base64," + imgAlbumes[i];
        newDiv.onclick = (function(i) {
            return function() {
                localStorage.setItem("cargarCromosUsuario", nombresAlbumes[i])
                // window.open("./cromosUsuario.html", "_self");
                document.getElementById("menu").style.display = "none"
                document.getElementById("tituloColecciones").style.display = "none"
                cargarCromos();
            }
        })(i);
        document.getElementById('album' + i).appendChild(newDiv);

        newDiv = document.createElement('div');
        newDiv.id = 'texto' + i;
        newDiv.className = 'texto';
        document.getElementById('album' + i).appendChild(newDiv);

        newDiv = document.createElement('b');
        newDiv.id = 'bold1' + i;
        newDiv.className = 'bold';
        newDiv.innerHTML = "Nombre:";
        document.getElementById('texto' + i).appendChild(newDiv);

        newDiv = document.createElement('text');
        newDiv.id = 'text' + i;
        newDiv.className = 'text';
        newDiv.innerHTML = nombresAlbumes[i];
        document.getElementById('texto' + i).appendChild(newDiv);

        newDiv = document.createElement('b');
        newDiv.id = 'bold2' + i;
        newDiv.className = 'bold';
        newDiv.innerHTML = "Estado:";
        document.getElementById('texto' + i).appendChild(newDiv);

        newDiv = document.createElement('text');
        newDiv.id = 'estado' + i;
        newDiv.className = 'estado';
        newDiv.innerHTML = estadosColeccion[i];
        document.getElementById('texto' + i).appendChild(newDiv);

        newDiv = document.createElement('b');
        newDiv.id = 'bold3' + i;
        newDiv.className = 'bold';
        newDiv.innerHTML = "Número de cromos:";
        document.getElementById('texto' + i).appendChild(newDiv);

        newDiv = document.createElement('text');
        newDiv.id = 'numCromos' + i;
        newDiv.className = 'numCromos';
        newDiv.innerHTML = numCromos[i];
        document.getElementById('texto' + i).appendChild(newDiv);
    }
}

async function cargarCromos() {
    var imgCromo;
    var nombreCromo;
    imgCromo = await cargarImagenesCromos();
    imgCromo = imgCromo.split(',')
    nombreCromo = await cargarNombresCromo();
    nombreCromo = nombreCromo.split(',')

    document.getElementById("menuCromos").innerHTML = '';

    for (var i = 0; i < imgCromo.length - 1; i++) {
        var newDiv = document.createElement('div');
        newDiv.id = 'cromo' + i;
        newDiv.className = 'cromos';
        document.getElementById('menuCromos').appendChild(newDiv);

        newDiv = document.createElement('img');
        newDiv.id = 'img' + i;
        newDiv.className = 'image';
        newDiv.src = "data:image/png;base64," + imgCromo[i];
        document.getElementById('cromo' + i).appendChild(newDiv);

        newDiv = document.createElement('b');
        newDiv.id = 'nombreCromo' + i;
        newDiv.className = 'nombreCromo';
        newDiv.innerHTML = "Nombre:";
        document.getElementById('cromo' + i).appendChild(newDiv);

        newDiv = document.createElement('text');
        newDiv.id = 'text' + i;
        newDiv.className = 'text';
        newDiv.innerHTML = nombreCromo[i];
        document.getElementById('cromo' + i).appendChild(newDiv);

    }

    document.getElementById("tituloColeccion").innerHTML = localStorage.getItem("cargarCromosUsuario");
    document.getElementById("menuCromos").style.display = "grid";
    document.getElementById("tituloColeccion").style.display = "block";
}

function cargarImagenesCromos() {
    return fetch("/imagenCromosUsuario", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "nombreAlbum": localStorage.getItem("cargarCromosUsuario"), "nombreUsuario": localStorage.getItem("user") })
    }).then(response => response.text().then(function(text) {
        return text;
    }));
}

function cargarNombresCromo() {
    return fetch("/nombreCromosUsuario", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "nombreAlbum": localStorage.getItem("cargarCromosUsuario"), "nombreUsuario": localStorage.getItem("user") })
    }).then(response => response.text().then(function(text) {
        return text;
    }));
}

function volver() {
    document.getElementById("menuCromos").style.display = "none";
    document.getElementById("tituloColeccion").style.display = "none";
    document.getElementById("menu").style.display = "grid";
    document.getElementById("tituloColecciones").style.display = "block";
}

function mostrarAlbumes() {
    window.open("./comprarAlbumes.html", "_self");
}

//Boton atras
window.onbeforeunload = function(e) {
    localStorage.setItem("back", "true");
};