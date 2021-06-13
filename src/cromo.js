function funciones(){
	checkSesion();
	consulta();
}

function consulta(){
    var nombreCromo = "adad"
    var nombreColeccion = "aa";
    fetch("/cargarInfoCromo", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"nombreCromo": nombreCromo, "nombreColeccion": nombreColeccion})
    }).then(response => response.text().then(function(text){
    	var datos = text.split(",");
    	console.log(datos)
        document.getElementById("nombre").innerHTML = datos[0];
        document.getElementById("imagen").setAttribute(
            'src', 'data:image/png;base64,' + datos[1]
        );
        document.getElementById("precio").innerHTML = datos[2];
        document.getElementById("copias").innerHTML = datos[3];
        document.getElementById("nombreColeccion").innerHTML = datos[4];
    }));
}

function comprarCromo() {
    // AQUI COGER EL NOMBRE DEL CROMO DE ALGUNA MANERA VER EN EL FUTURO
    var nombre = document.getElementById("nombre").innerHTML;
    // TAMBIEN TENDREMOS QUE COGER EL USUARIO QUE ESTA CONECTADO
    var usuario = localStorage.getItem("user");
    var nombreColeccion = document.getElementById("nombreColeccion").innerHTML;
    fetch("/comprarCromo", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"cromo": nombre, "usuario": usuario, "nombreColeccion": nombreColeccion})
    }).then(response => {
        if (response.status == 200) {
            // Mostrar mensaje de que el cromo se ha comprado correctamente
            console.log("Cromo comprado")
        } else {
            // Mostrar error de conexion
            console.log("Error al comprar el cromo")
        }
    })
}

function checkSesion(){
    if(localStorage.getItem("Cookie_Sesion") == "false"){
        alert("NECESARIO INICIAR SESION");
        window.open("http://127.0.0.1:5050/src/inicioSesion.html","_self");
    }
}

//Inactividad
function e(q) {
    document.body.appendChild( document.createTextNode(q) );
    document.body.appendChild( document.createElement("BR") );
}

function inactividad() {
    //Solo se excedera el tiempo cuando la sesion cuente como iniciada
    if(localStorage.getItem("Cookie_Sesion") == "true"){
        alert("SESION EXPIRADA");
        localStorage.setItem("Cookie_Sesion", "false");
        window.open("http://127.0.0.1:5050/src/inicioSesion.html","_self");   
        localStorage.removeItem("user");
    }
}

var t=null;
function contadorInactividad() {
    t=setTimeout("inactividad()",1800000); //30 min (1800000)
}

window.onblur=window.onmousemove=function() {
    if(t) clearTimeout(t);
    contadorInactividad();
}

function abrirPagCromo(){
    window.open("http://127.0.0.1:5050/src/cromo.html","_self");
}