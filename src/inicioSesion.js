// Cuando se haga click en el boton de iniciar sesion
function iniciarSesion() {
    var usuario = document.getElementById("usuario").value;
    var pass = document.getElementById("contrasenia").value;
    localStorage.setItem("pass",pass);
    fetch("/inicioSesion", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"usuario": usuario, "pass": pass})
    }).then(response => response.text().then(function(text){
        //Respuesta segun el rol del usuario
        if (response.status == 200){
            localStorage.setItem("Cookie_Sesion", "true");
            localStorage.setItem("user", usuario);
            // Mostrar pagina del usuario
            window.open("./usuario.html","_self");
        } else {
            console.log(text);
            if(response.status == 201) {
                localStorage.setItem("Cookie_Sesion", "true");
                localStorage.setItem("user", usuario);
                window.open("./admin.html","_self");
            } else if(response.status == 202) {
                document.getElementById("textErrorInicioSesion").innerHTML = text;
                document.getElementsByClassName("errorInicioSesion")[0].style.visibility = "visible";
                setTimeout(function(){ document.getElementsByClassName("errorInicioSesion")[0].style.visibility = "hidden"; }, 3000);
            }
        }
    }));
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

function checkSesion(){
    if(localStorage.getItem("user") != null){
         fetch("/inicioSesion", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"usuario": localStorage.getItem("user"), "pass": localStorage.getItem("pass")})
    }).then(response => {
        //Respuesta segun el rol del usuario
        if (response.status == 200){
            localStorage.setItem("Cookie_Sesion", "true");
            // Mostrar pagina del usuario
            window.open("./usuario.html","_self");
        } else {
            if(response.status == 201) {
                localStorage.setItem("Cookie_Sesion", "true");
                window.open("./admin.html","_self");
            }
            // Mostrar error de conexion
            console.log("Error al conectar")
        }
    })
    }
}