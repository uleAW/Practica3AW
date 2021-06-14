function funciones() {
    checkSesion();
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

function aniadirColeccion() {
    var nombre = document.getElementById("nombreAniadirColeccion").value
    var imagen = document.getElementById("imgAniadirAlbum").files[0]
    var precioAlbum = document.getElementById("precioAniadirAlbum").value
    var reader = new FileReader()

    reader.onload = function (event) {

        var data = event.target.result.replace("data:" + imagen.type + ";base64,", '');
        fetch("/aniadirColeccion", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"nombre": nombre, "imagen": data, "precio": precioAlbum})
        }).then(response => response.text().then(function (text) {
            document.getElementById("textErrorAniadirColeccion").innerHTML = text;
            document.getElementsByClassName("errorAniadirColeccion")[0].style.display = "block";
            setTimeout(function () {
                document.getElementsByClassName("errorAniadirColeccion")[0].style.display = "none";
            }, 3000);
        }));
    }
    if (imagen === undefined) {
        document.getElementById("textErrorAniadirColeccion").innerHTML = "ERROR: debes seleccionar una imagen de album";
        document.getElementsByClassName("errorAniadirColeccion")[0].style.display = "block";
        setTimeout(function () {
            document.getElementsByClassName("errorAniadirColeccion")[0].style.display = "none";
        }, 3000);
    } else {
        reader.readAsDataURL(imagen);
    }
}

function aniadirCromo() {

    var nombre = document.getElementById("nombreAniadirCromo").value
    var imagen = document.getElementById("imgAniadirCromo").files[0]
    var precioCromo = document.getElementById("precioAniadirCromo").value
    var coleccion = document.getElementById("coleccionAniadirCromo").value
    var reader = new FileReader()

    reader.onload = function (event) {

        var data = event.target.result.replace("data:" + imagen.type + ";base64,", '');
        fetch("/aniadirCromo", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"nombre": nombre, "imagen": data, "precio": precioCromo, "coleccion": coleccion})
        }).then(response => response.text().then(function (text) {
            document.getElementById("textErrorAniadirCromo").innerHTML = text;
            document.getElementsByClassName("errorAniadirCromo")[0].style.display = "block";
            setTimeout(function () {
                document.getElementsByClassName("errorAniadirCromo")[0].style.display = "none";
            }, 3000);
        }));
    }
    reader.readAsDataURL(imagen);
}

function activarColeccion() {
    var nombre = document.getElementById("nombreActivarColeccion").value
    fetch("/activarColeccion", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"nombre": nombre})
    }).then(response => response.text().then(function (text) {
        document.getElementById("textErrorActivarColeccion").innerHTML = text;
        document.getElementsByClassName("errorActivarColeccion")[0].style.display = "block";
        setTimeout(function () {
            document.getElementsByClassName("errorActivarColeccion")[0].style.display = "none";
        }, 3000);
    }));
}
