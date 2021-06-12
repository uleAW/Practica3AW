// Cuando se haga click en el boton de iniciar sesion
function iniciarSesion() {
    var usuario = document.getElementById("usuario").value;
    var pass = document.getElementById("contrasenia").value;
    fetch("/inicioSesion", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"usuario": usuario, "pass": pass})
    }).then(response => {
        //Respuesta segun el rol del usuario
        alert(response.status);
        if (response.status == 200){
            // Mostrar pagina del usuario
            window.open("http://127.0.0.1:5050/src/usuario.html");
        } else {
            if(response.status == 201) {
                window.open("http://127.0.0.1:5050/src/admin.html");
            }
            // Mostrar error de conexion
            console.log("Error al conectar")
        }
    })
}

// Cuando se haga click en el boton de registrar
function registrar() {
    var usuario = document.getElementById("usuario").value;
    var pass = document.getElementById("contrasenia").value;

    fetch("/registrar", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"usuario": usuario, "pass": pass})
    }).then(response => {
        if (response.status == 200) {
            // CAMBIAR DE PAGINA
            console.log("Registrado");
        } else {
            // MOSTRAR MENSAJE DE ERROR
            console.log("Se produjo un error al crear el socio");
        }
    })
}

//Inactividad
function e(q) {
    document.body.appendChild( document.createTextNode(q) );
    document.body.appendChild( document.createElement("BR") );
}
function inactividad() {
    alert("TIEMPO DE SESION EXCEDIDO");
    history.forward();
    window.open("http://127.0.0.1:5050/src/inicioSesion.html","_self");
}
var t=null;
function contadorInactividad() {
    t=setTimeout("inactividad()",1800000); //30 min (1800000)
}
window.onblur=window.onmousemove=function() {
    if(t) clearTimeout(t);
    contadorInactividad();
}