function funciones(){
    checkSesion();
    table();
}

function checkSesion() {
    if (localStorage.getItem("Cookie_Sesion") == "false") {
        alert("NECESARIO INICIAR SESION");
        window.open("./inicioSesion.html", "_self");
    }
}

function table() {
    var ID = localStorage.getItem("coleccion");
    fetch("/cargarImagen", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"numColeccion": ID})
    }).then(response => {

    })
    fetch("/imagenDireccion", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify({"numColeccion": "1"})
    }).then(response => response.text().then(function (text) {

        var direccion = text.split(",");
        var tabla = "";
        tabla = tabla + "<table>";
        var salir = false;
        for (var i = 0; i < direccion.length; i++) {
            if (salir)
                break;
            tabla = tabla + "<tr>";
            for (var k = 0; k < 2; k++) {//el 2 de este for marca el numero de fotos que se van a mostrar en la misma fila
                if ((i * 2 + k) < direccion.length && direccion[i * 2 + k] != "") {
                    tabla = tabla + "<td><img src=data:image/png;base64," + direccion[i * 2 + k] + "></td>";
                } else {
                    tabla = tabla + "<td></td>";
                    salir = true;
                }
            }
            tabla = tabla + "</tr>";
        }
        tabla = "<button onclick=colecciones1()>Volver</button>" + tabla;
        document.write(tabla);
        //document.getElementById("coleccion").innerHTML=tabla;
        // Mostrar pagina del usuario
        //console.log("Direccion"+count);
        //localStorage.setItem("Direccion"+count, text);
        //text;
    }));
};

function colecciones1() {
    window.open("./colecciones.html", "_self");
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