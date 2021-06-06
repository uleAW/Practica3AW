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
        if (response.status == 200) {
            // Mostrar pagina del usuario
            console.log("Usuario conectado")
        } else {
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