function funciones(){
    checkSesion();
    datos();
}

function checkSesion() {
    if (localStorage.getItem("Cookie_Sesion") == "false") {
        alert("NECESARIO INICIAR SESION");
        window.open("./inicioSesion.html", "_self");
    }
}

function datos() {
    cargarAlbumes();
}

function buscarImagenes() {
    return fetch("/albumesUsuario1", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"nombre": localStorage.getItem("user")})
    }).then(response => response.text().then(function (text) {
        return text;
    }));
}

function buscarPrecio() {
    return fetch("/albumesPrecio1", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"nombre": localStorage.getItem("user")})
    }).then(response => response.text().then(function (text) {
        return text;
    }));
}

function albumID() {
    return fetch("/albumID", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"nombre": localStorage.getItem("user")})
    }).then(response => response.text().then(function (text) {
        return text;
    }));
}

async function cargarAlbumes() {
    var nombresAlbumes;
    var imgAlbumes;
    var estadosColeccion;
    var albumIDs;
    imgAlbumes = await buscarImagenes();
    imgAlbumes = imgAlbumes.split(",");
    precioAlbumes = await buscarPrecio();
    precioAlbumes = precioAlbumes.split(",");
    albumIDs = await albumID();
    albumIDs = albumIDs.split(",");
    //estadosColeccion = await estadoColeccion();
    //estadosColeccion = estadosColeccion.split(",");
    var out = ""
    for (var i = 0; i < imgAlbumes.length - 1; i++) {
        var newDiv = document.createElement('div');
        newDiv.id = 'cromo' + i;
        newDiv.className = 'cromos';
        document.getElementById('menu').appendChild(newDiv);

        newDiv = document.createElement('img');
        newDiv.id = 'img' + i;
        newDiv.className = 'image';
        newDiv.src = "data:image/png;base64," + imgAlbumes[i];
        document.getElementById('cromo' + i).appendChild(newDiv);

        newDiv = document.createElement('div');
        newDiv.id = 'divAux' + i;
        newDiv.className = 'divAux';
        document.getElementById('cromo' + i).appendChild(newDiv);

        newDiv = document.createElement('text');

        /*newDiv.id = 'textNombre' + i;
        newDiv.className = 'textNombre';
        newDiv.innerHTML = direccion[i + 2];
        document.getElementById('divAux' + i).appendChild(newDiv);
        document.getElementById("divAux"+i).insertBefore(document.createTextNode("Nombre: "), newDiv);*/

        newDiv = document.createElement('text');
        newDiv.id = 'textPrecio' + i;
        newDiv.className = 'textPrecio';
        newDiv.innerHTML = "Precio: "+precioAlbumes[i];
        document.getElementById('divAux' + i).appendChild(newDiv);

        newDiv = document.createElement('button');
        newDiv.id = 'buttonComprar' + i;
        newDiv.appendChild(document.createTextNode("Comprar"))
        document.getElementById('divAux' + i).appendChild(newDiv);
        document.getElementById('buttonComprar' + i).onclick = (function (i) {
            return function () {
                comprarAlbum(albumIDs[i], i);
            }
        })(i);

        newDiv = document.createElement('div');
        newDiv.id = 'errorAlbum' + i;
        newDiv.className = 'errorAlbum';
        document.getElementById('cromo' + i).appendChild(newDiv);

        newDiv = document.createElement('text');
        newDiv.id = 'textErrorAlbum' + i;
        newDiv.className = 'textErrorAlbum';
        newDiv.setAttribute("content", "Comprar");
        document.getElementById('errorAlbum' + i).appendChild(newDiv);

        //out = out + "<p><img src= data:image/png;base64," + imgAlbumes[i] + "> Precio: " + precioAlbumes[i] + "<button onclick=comprarAlbum("+
        //albumIDs[i] + ")>Comprar albumes </button><div id='errorAlbum" + albumIDs[i] + "'><text id='textErrorAlbum" + albumIDs[i] + "'></text></div></p>";
    }
}

function comprarAlbum(ID, i) {
    fetch("/comprarAlbum", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"usuario": localStorage.getItem("user"), "album": ID})
    }).then(response => response.text().then(function (text) {
        document.getElementById("textErrorAlbum" + i).innerHTML = text;
        document.getElementById("errorAlbum" + i).style.display = "block";
        setTimeout(function () {
            document.getElementById("errorAlbum" + i).style.display = "none";
        }, 3000);
    }));
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

window.onblur = window.onmousemove = function () {
    if (t) clearTimeout(t);
    contadorInactividad();
}