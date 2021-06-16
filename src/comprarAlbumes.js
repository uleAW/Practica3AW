function funciones() {
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
    localStorage.removeItem("back")
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

function buscarNombres() {
    return fetch("/coleccionNombre", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => response.text().then(function (text) {
        return text;
    }));
}

// Muestra todos los albumes disponibles para comprar
async function cargarAlbumes() {
    var nombresAlbumes;
    var imgAlbumes;
    var albumIDs;
    var precioAlbumes;
    imgAlbumes = await buscarImagenes();
    imgAlbumes = imgAlbumes.split(",");
    precioAlbumes = await buscarPrecio();
    precioAlbumes = precioAlbumes.split(",");
    albumIDs = await albumID();
    albumIDs = albumIDs.split(",");
    nombresAlbumes = await buscarNombres();
    nombresAlbumes = nombresAlbumes.split(",");
    for (var i = 0; i < imgAlbumes.length - 1; i++) {
        var newDiv = document.createElement('div');
        newDiv.id = 'cromo' + i;
        newDiv.className = 'album';
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

        newDiv = document.createElement('div');
        newDiv.id = 'divAux2' + i;
        newDiv.className = 'texto';
        document.getElementById('divAux' + i).appendChild(newDiv);

        newDiv = document.createElement('b');
        newDiv.id = 'textNombreNegrita' + i;
        newDiv.className = 'textNombreNegrita';
        newDiv.innerHTML = "Nombre:";
        document.getElementById('divAux2' + i).appendChild(newDiv);

        newDiv = document.createElement('text');
        newDiv.id = 'textNombre' + i;
        newDiv.className = 'textNombre';
        newDiv.innerHTML = nombresAlbumes[i];
        document.getElementById('divAux2' + i).appendChild(newDiv);

        newDiv = document.createElement('b');
        newDiv.id = 'textNegritaPrecio' + i;
        newDiv.className = 'textNegritaPrecio';
        newDiv.innerHTML = "Precio:";
        document.getElementById('divAux2' + i).appendChild(newDiv);

        newDiv = document.createElement('text');
        newDiv.id = 'textPrecio' + i;
        newDiv.className = 'textPrecio';
        newDiv.innerHTML = precioAlbumes[i];
        document.getElementById('divAux2' + i).appendChild(newDiv);

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
    }
}

// Compra un album si clickas al boton
function comprarAlbum(ID, i) {
    fetch("/comprarAlbum", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"usuario": localStorage.getItem("user"), "album": ID})
    }).then(response => response.text().then(function (text) {
        document.getElementById("textErrorAlbum" + i).innerHTML = text;
        document.getElementById("errorAlbum" + i).style.visibility = "visible";
        setTimeout(function () {
            document.getElementById("errorAlbum" + i).style.visibility = "hidden";
        }, 3000);
    }));
}

//Inactividad
//Si las sesion expira nos expulsa de la pagina y crea la cookie Cookie_Sesion para impedir volver atras autenticado
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

//Se inicializa el contador a 30 minutos (en milisegundos)
function contadorInactividad() {
    t = setTimeout("inactividad()", 1800000); //30 min (1800000)
}

//Si se mueve el raton, se resetea el contador
window.onblur = window.onmousemove = function () {
    if (t) clearTimeout(t);
    contadorInactividad();
}