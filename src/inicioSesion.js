// Cuando se haga click en el boton de iniciar sesion
function iniciarSesion() {
    var usuario = document.getElementById("usuario").value;
    var pass = document.getElementById("contrasenia").value;
    localStorage.setItem("pass", pass);
    fetch("/inicioSesion", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"usuario": usuario, "pass": pass})
    }).then(response => response.text().then(function (text) {
        //Respuesta segun el rol del usuario
        if (response.status == 200) {
            localStorage.setItem("Cookie_Sesion", "true");
            localStorage.setItem("user", usuario);
            // Mostrar pagina del usuario
            window.open("./usuario.html", "_self");
        } else {
            if (response.status == 201) {
                localStorage.setItem("Cookie_Sesion", "true");
                localStorage.setItem("user", usuario);
                localStorage.setItem("admin", "1");
                window.open("./admin.html", "_self");
            } else if (response.status == 202) {
                document.getElementById("textErrorInicioSesion").innerHTML = text;
                document.getElementsByClassName("errorInicioSesion")[0].style.visibility = "visible";
                setTimeout(function () {
                    document.getElementsByClassName("errorInicioSesion")[0].style.visibility = "hidden";
                }, 3000);
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
    }).then(response => response.text().then(function (text) {
        if (response.status == 200) {
            document.getElementById("textErrorInicioSesion").innerHTML = text;
            document.getElementsByClassName("errorInicioSesion")[0].style.visibility = "visible";
            setTimeout(function () {
                document.getElementsByClassName("errorInicioSesion")[0].style.visibility = "hidden";
            }, 3000);
        } else if (response.status == 201) {
            document.getElementById("textErrorInicioSesion").innerHTML = text;
            document.getElementsByClassName("errorInicioSesion")[0].style.visibility = "visible";
            setTimeout(function () {
                document.getElementsByClassName("errorInicioSesion")[0].style.visibility = "hidden";
            }, 3000);
        }
    }));
}

function checkSesion() {
    //Me salto la pantalla de autenticacion si quiere pasar del area usuario al perfil
    if(localStorage.getItem("back") == "true"){
        console.log(localStorage.getItem("back"));
        localStorage.removeItem("back");
        window.open("/index.html", "_self");
    }else{
        if (localStorage.getItem("user") != null) {
            fetch("/inicioSesion", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({"usuario": localStorage.getItem("user"), "pass": localStorage.getItem("pass")})
            }).then(response => {
                //Respuesta segun el rol del usuario
                if (response.status == 200) {
                    localStorage.setItem("Cookie_Sesion", "true");
                    // Mostrar pagina del usuario
                    window.open("./usuario.html", "_self");
                } else {
                    if (response.status == 201) {
                        localStorage.setItem("Cookie_Sesion", "true");
                        window.open("./admin.html", "_self");
                    }
                }
            });
        }
    }
}