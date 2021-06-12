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
        if (response.status == 200){
            localStorage.setItem("Cookie_Sesion", "true");
            // Mostrar pagina del usuario
            window.open("http://127.0.0.1:5050/src/usuario.html","_self");
        } else {
            if(response.status == 201) {
                localStorage.setItem("Cookie_Sesion", "true");
                window.open("http://127.0.0.1:5050/src/admin.html","_self");
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