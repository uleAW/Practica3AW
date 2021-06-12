function funciones(){
    checkSesion();
    mostrarPuntos();
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

function mostrarPuntos(){
    var usuario = localStorage.getItem("user");
    fetch("/cargarPuntos", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"usuario": usuario})
    }).then(response => response.text().then(function(text){
            document.getElementById("puntos").value = text;      
    }));
}

function abrirPagCromo(){
    window.open("http://127.0.0.1:5050/src/cromo.html","_self");
}