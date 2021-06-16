function funciones() {
    checkSesion();
    table();
}

//Evita cargar la pagina correctamente si se ha excedido la sesion
function checkSesion() {
    if (localStorage.getItem("Cookie_Sesion") == "false") {
        alert("NECESARIO INICIAR SESION");
        window.open("./inicioSesion.html", "_self");
    }
}

function table() {
    localStorage.removeItem("back")
    var ID = localStorage.getItem("coleccion");
    fetch("/imagenDireccion", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"numColeccion": ID})
    }).then(response => response.text().then(function (text) {
        var direccion = text.split(",");
        //var imgIDs = imgID.split(",");
        for (var i = 0; i < direccion.length - 1;) {
            var newDiv = document.createElement('div');
            newDiv.id = 'album' + i;
            newDiv.className = 'album';
            document.getElementById('menu').appendChild(newDiv);

            newDiv = document.createElement('img');
            newDiv.id = 'img' + i;
            newDiv.className = 'image';
            newDiv.src = "data:image/png;base64," + direccion[i];
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
            newDiv.innerHTML = direccion[i + 2];
            document.getElementById('texto' + i).appendChild(newDiv);

            i = i + 3;
        }
    }));
};

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