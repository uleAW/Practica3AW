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

window.onblur = window.onmousemove = function () {
    if (t) clearTimeout(t);
    contadorInactividad();
}

function mostrarPuntos() {
    var usuario = localStorage.getItem("user");
    fetch("/cargarPuntos", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"usuario": usuario})
    }).then(response => response.text().then(function (text) {
        document.getElementById("puntos").value = text;
    }));
}

function abrirPagCromo() {
    window.open("./cromo.html", "_self");
}

function cerrarSesion() {
    localStorage.removeItem("user");
    localStorage.removeItem("pass");
    window.open("/index.html", "_self");
}

function coleccionID() {

    fetch("/coleccionUsuarioID", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"numUsuario": localStorage.getItem("user")})
    }).then(response => response.text().then(function (text) {

        //if(localStorage.getItem("coleccionID")==null){
        console.log(text);
        localStorage.setItem("cromosUsuario", text);

    }));
};

function cromoID() {
    fetch("/coleccionCromos", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },

    }).then(response => response.text().then(function (text) {
        localStorage.setItem("cromosID", text);
    }));

}

function cromoImagen() {
    return fetch("/coleccionCromosImagenes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },

    }).then(response => response.text().then(function (text) {
        return text;
    }));

}

var text;
async function datos() {
    //localStorage.clear();
    coleccionID();
    cromoID();
    text = await cromoImagen();
    //coleccionNombre();
}

function volver() {
    window.open("./usuario.html", "_self");
}

var boolean = true;

function table() {
    var cromos = new Array();
    var imagenes = new Array();
    var IDCromo = localStorage.getItem("cromosID");
    var imgCromo = text;
    var IDCromos = IDCromo.split(",");
    var imgCromos = imgCromo.split(",");
    var cromoUsuario = localStorage.getItem("cromosUsuario");
    var cromoUsuarios = cromoUsuario.split(";");
    console.log(cromoUsuarios)
    console.log(IDCromos)
    for (var i = 0; i < IDCromos.length; i++) {
        for (var j = 0; j < cromoUsuarios.length; j++) {
            if (IDCromos[i] == cromoUsuarios[j] && IDCromos[i] != "") {
                console.log(i)
                cromos.push(IDCromos[i]);
                imagenes.push(imgCromos[i]);
            }
        }
    }

    tabla = "";
    tabla = tabla + "<table>";
    salir = false;
    for (var i = 0; i < imagenes.length; i++) {
        if (salir)
            break;
        tabla = tabla + "<tr>";
        for (var k = 0; k < 2; k++) {//el 2 de este for marca el numero de fotos que se van a mostrar en la misma fila
            if ((i * 2 + k) < imagenes.length) {
                tabla = tabla + "<td><img src=data:image/png;base64," + imagenes[i * 2 + k] +"></td>";
            } else {
                tabla = tabla + "<td></td>";
                salir = true;
            }
        }
        tabla = tabla + "</tr>";
    }
    tabla = "<button onclick=volver()>Volver</button>" + tabla;
    document.getElementById("coleccion").innerHTML = tabla;

}
