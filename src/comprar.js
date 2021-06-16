function funciones() {
    checkSesion();
    datos();
}

//Comprueba si la sesion esta activa
function checkSesion() {
    if (localStorage.getItem("Cookie_Sesion") == "false") {
        alert("NECESARIO INICIAR SESION");
        window.open("./inicioSesion.html", "_self");
    }
}

//la variable count es el id de la colección
function imagenID(count) {
    fetch("/cargarImagen", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "numColeccion": count })
    }).then(response => {

    })
    fetch("/imagenID", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify({"numColeccion": "1"})
    }).then(response => response.text().then(function(text) {
        localStorage.setItem("imagenID", text);
    }));
};

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

function datos() {
    colecciones1();
}

function colecciones1() {

    var nombreColeccion = localStorage.getItem("coleccionNombre");
    var nombresColecciones = nombreColeccion.split(",");

    var IDColeccion = localStorage.getItem("coleccionID");
    var IDColecciones = IDColeccion.split(",");
    console.log(IDColeccion);
    tabla = "";
    //tabla="<div class=menu>";
    for (var i = 0; i < nombresColecciones.length - 1; i++) {
        var newDiv = document.createElement('div');
        newDiv.id = 'pasatiempo' + i;
        newDiv.className = 'pasatiempo';
        newDiv.onclick = (function(i) {
            return function() {
                localStorage.setItem("coleccion", nombresColecciones[i]);
                window.open("./listaCromosComprar.html", "_self");
            }
        })(i);
        document.getElementById('menu').appendChild(newDiv);
        //document.getElementById('pasatiempo'+i).onclick=function() { table(IDColecciones[i]); };;

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

var count = 0;

function table(ID) {
    imagenID(ID);
    count = count + 1;
    console.log(ID);
    var IDColeccion = localStorage.getItem("coleccionID");
    var IDColecciones = IDColeccion.split(",");



};

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