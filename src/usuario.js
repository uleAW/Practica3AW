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
    }
}
var t=null;
function contadorInactividad() {
    t=setTimeout("inactividad()",18000); //30 min (1800000)
}
window.onblur=window.onmousemove=function() {
    if(t) clearTimeout(t);
    contadorInactividad();
}