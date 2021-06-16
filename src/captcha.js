let captcha = new Array();

function createCaptcha() {
    const activeCaptcha = document.getElementById("captcha");
    for (q = 0; q < 6; q++) {
        if (q % 2 == 0) {
            captcha[q] = String.fromCharCode(Math.floor(Math.random() * 26 + 65));
        } else {
            captcha[q] = Math.floor(Math.random() * 10 + 0);
        }
    }
    theCaptcha = captcha.join("");
    activeCaptcha.innerHTML = `${theCaptcha}`;
}

function validateCaptcha() {
    const errCaptcha = document.getElementById("errCaptcha");
    const reCaptcha = document.getElementById("reCaptcha");
    recaptcha = reCaptcha.value;
    let validateCaptcha = 0;
    for (var z = 0; z < 6; z++) {
        if (recaptcha.charAt(z) != captcha[z]) {
            validateCaptcha++;
        }
    }
    if (recaptcha == "") {
        errCaptcha.innerHTML = "El captcha debe estar relleno";
    } else if (validateCaptcha > 0 || recaptcha.length > 6) {
        errCaptcha.innerHTML = "Captcha erroneo";
    } else {
        var puntos = 50;
        errCaptcha.innerHTML = "Correcto";
        //Sumo los puntos al usuario
        if (localStorage.getItem("user") != null) {
            fetch("/addPuntos", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "usuario": localStorage.getItem("user"), "puntos": puntos })
            }).then(response => response.text().then(function(text) {
                alert("Su balance de puntos es de: +" + puntos)
            }));
        } else {
            //INICIAR SESION y ADD PUNTOS
            alert("INICIA SESION para ganar puntos")
        }
    }
}

//Inactividad
//Los pasatiempos no requieren sesiones, pero si esta iniciada, expira igual solo que no le pide que se vuelva a autenticar
function inactividad() {
    //Solo se excedera el tiempo cuando la sesion cuente como iniciada
    if (localStorage.getItem("Cookie_Sesion") == "true") {
        alert("SESION EXPIRADA");
        localStorage.setItem("Cookie_Sesion", "false");
        localStorage.removeItem("user");
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