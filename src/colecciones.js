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

function coleccionNombre() {
    fetch("/coleccionNombre", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.text().then(function (text) {
        localStorage.setItem("coleccionNombre", text);
    }));
};

function coleccionID() {

    fetch("/coleccionID", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.text().then(function (text) {
        localStorage.setItem("coleccionID", text);
    }));
};

function datos() {
    colecciones1();
    localStorage.removeItem("back")
}

function colecciones1() {

    var nombreColeccion = localStorage.getItem("coleccionNombre");
    var nombresColecciones = nombreColeccion.split(",");

    for (var i = 0; i < nombresColecciones.length - 1; i++) {
        var newDiv = document.createElement('div');
        newDiv.id = 'pasatiempo' + i;
        newDiv.className = 'pasatiempo';
        newDiv.onclick = (function (i) {
            return function () {
                localStorage.setItem("coleccion", nombresColecciones[i]);
                window.open("./cromos.html", "_self");
            }
        })(i);
        document.getElementById('menu').appendChild(newDiv);

        newDiv = document.createElement('div');
        newDiv.id = 'banner' + i;
        newDiv.className = 'banner';
        document.getElementById('pasatiempo' + i).appendChild(newDiv);

        newDiv = document.createElement('div');
        newDiv.id = 'info' + i;
        newDiv.className = 'info';
        newDiv.innerHTML = 'VER CROMOS DE LA COLECCION ' + nombresColecciones[i];
        document.getElementById('pasatiempo' + i).appendChild(newDiv);

        newDiv = document.createElement('div');
        newDiv.id = 'nombre' + i;
        newDiv.className = 'nombre';
        newDiv.innerHTML = nombresColecciones[i];
        document.getElementById('banner' + i).appendChild(newDiv);
    }
};

//Inactividad
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