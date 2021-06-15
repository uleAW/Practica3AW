function funciones() {
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
        //var imgIDs = imgID.split(",");
        for (var i = 0; i < direccion.length - 1;) {
            var newDiv = document.createElement('div');
            newDiv.id = 'cromo' + i;
            newDiv.className = 'cromos';
            document.getElementById('menu').appendChild(newDiv);

            newDiv = document.createElement('img');
            newDiv.id = 'img' + i;
            newDiv.className = 'image';
            newDiv.src = "data:image/png;base64," + direccion[i];
            document.getElementById('cromo' + i).appendChild(newDiv);

            newDiv = document.createElement('div');
            newDiv.id = 'divAux' + i;
            newDiv.className = 'divAux';
            document.getElementById('cromo' + i).appendChild(newDiv);

            newDiv = document.createElement('text');

            newDiv.id = 'textNombre' + i;
            newDiv.className = 'textNombre';
            newDiv.innerHTML = direccion[i + 2];
            document.getElementById('divAux' + i).appendChild(newDiv);
            document.getElementById("divAux" + i).insertBefore(document.createTextNode("Nombre: "), newDiv);

            newDiv = document.createElement('text');
            newDiv.id = 'textPrecio' + i;
            newDiv.className = 'textPrecio';
            newDiv.innerHTML = "Precio: " + direccion[i + 1];
            document.getElementById('divAux' + i).appendChild(newDiv);
            i = i + 3;
        }
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