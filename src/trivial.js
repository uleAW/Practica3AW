function funciones() {
    cargaRandom();
    desmarcar();
}

function desmarcar() {

    //Borro todos las preguntas con 4 opciones
    for (var i = 1; i <= 20; i++) {
        for (var j = 1; j <= 4; j++) {
            if (i != 8 && i != 15) {
                document.getElementById("res" + i + j).checked = false;
            }
        }
    }
    document.getElementById("res45").checked = false;
    document.getElementById("res165").checked = false;

    //Pregunta 8
    for (var i = 1; i <= 3; i++) {
        document.getElementById("res8" + i).checked = false;
    }

    //Pregunta 14
    for (var i = 1; i <= 2; i++) {
        document.getElementById("res15" + i).checked = false;
    }

}

//Carga aleatoria de 4 preguntas en el crucigrama
function cargaRandom() {

    var lista = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    var val;
    //Genero los valores de las 4 preguntas que apareceran
    for (var i = 0; i < 4; i++) {
        val = Math.round(Math.random() * (lista.length - 1) + 1);
        if (lista.includes(val)) {
            //Borro el elemento del array para no repetirlo
            var j = lista.indexOf(val);
            lista.splice(j, 1);
            document.getElementById("pregunta" + val).style.display = "block";
            //Si el ya se ha elegido, repito el proceso hasta que el numero no se haya elegido antes
        } else {
            i--;
        }
    }
}

function comprobar() {
    var puntos = 0;

    //Pregunta 1
    if (document.getElementById("res11").checked) {
        puntos = puntos + 50;
    }

    //Pregunta 2
    if (document.getElementById("res24").checked) {
        puntos = puntos + 50;
    }

    //Pregunta 3
    if (document.getElementById("res31").checked) {
        puntos = puntos + 50;
    }

    //Pregunta 4 (checkBox) ------
    if (document.getElementById("res45").checked == false) {
        var todas = 0;
        if (document.getElementById("res41").checked) {
            todas++;
            puntos = puntos + 10;
        }
        if (document.getElementById("res42").checked) {
            todas++;
            puntos = puntos + 10;
        }
        if (document.getElementById("res43").checked) {
            todas++;
            puntos = puntos + 10;
        }
        if (document.getElementById("res44").checked) {
            todas++;
            puntos = puntos + 10;
        }
        if (todas == 4) {
            puntos = puntos + 10;
        }
    }

    //Pregunta 5
    if (document.getElementById("res53").checked) {
        puntos = puntos + 50;
    }

    //Pregunta 6
    if (document.getElementById("res63").checked) {
        puntos = puntos + 50;
    }

    //Pregunta 7
    if (document.getElementById("res71").checked) {
        puntos = puntos + 50;
    }

    //Pregunta 8
    if (document.getElementById("res83").checked) {
        puntos = puntos + 50;
    }

    //Pregunta 9
    if (document.getElementById("res93").checked) {
        puntos = puntos + 50;
    }

    //Pregunta 10
    if (document.getElementById("res102").checked) {
        puntos = puntos + 50;
    }

    //Pregunta 11
    if (document.getElementById("res112").checked) {
        puntos = puntos + 50;
    }

    //Pregunta 12
    if (document.getElementById("res124").checked) {
        puntos = puntos + 50;
    }

    //Pregunta 13
    if (document.getElementById("res132").checked) {
        puntos = puntos + 50;
    }

    //Pregunta 14
    if (document.getElementById("res142").checked) {
        puntos = puntos + 50;
    }

    //Pregunta 15
    if (document.getElementById("res151").checked) {
        puntos = puntos + 50;
    }

    //Pregunta 16
    if (document.getElementById("res165").checked) {
        puntos = puntos + 50;
    }

    //Pregunta 17
    if (document.getElementById("res171").checked) {
        puntos = puntos + 50;
    }

    //Pregunta 18
    if (document.getElementById("res181").checked) {
        puntos = puntos + 50;
    }

    //Pregunta 19
    if (document.getElementById("res193").checked) {
        puntos = puntos + 50;
    }

    //Pregunta 20
    if (document.getElementById("res204").checked) {
        puntos = puntos + 50;
    }

    if (puntos == 200) {
        alert("TODAS CORRECTAS")
        puntos = puntos + 300;
    }

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

//Inactividad
function e(q) {
    document.body.appendChild(document.createTextNode(q));
    document.body.appendChild(document.createElement("BR"));
}

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

window.onblur = window.onmousemove = function() {
    if (t) clearTimeout(t);
    contadorInactividad();
}