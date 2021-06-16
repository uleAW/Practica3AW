function funciones(){
    checkSesion();
}

//Evita cargar la pagina correctamente si se ha excedido la sesion
function checkSesion() {
    if (localStorage.getItem("Cookie_Sesion") == "false") {
        alert("NECESARIO INICIAR SESION");
        window.open("./inicioSesion.html", "_self");
    }
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

// Anañdir coleccion cogiendo los valores de los input
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

// Añadir cromo cogiendo los valores de los input
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

// Activa la coleccion del input
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

//Boton atras
window.onbeforeunload = function (e) {
    localStorage.setItem("back", "true");
};

//Cerrar Sesion (devuelve a la ventana principal)
function cerrarSesion() {
    localStorage.removeItem("user");
    localStorage.removeItem("pass");
    localStorage.removeItem("back");
    localStorage.removeItem("admin");
    window.open("/index.html", "_self");
}
