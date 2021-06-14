function funciones(){

}

function comprobar(){
	var puntos = 0;

	//Pregunta 1
	if(document.getElementById("res11").checked){
		puntos = puntos+50;
	}

	//Pregunta 2
	if(document.getElementById("res24").checked){
		puntos = puntos+50;
	}

	//Pregunta 3
	if(document.getElementById("res31").checked){
		puntos = puntos+50;
	}

	//Pregunta 4 (checkBox) ------
	if(document.getElementById("res45").checked == false){
		var todas = 0;
		if(document.getElementById("res41").checked){
			todas++;
			puntos = puntos+10;
		}
		if(document.getElementById("res42").checked){
			todas++;
			puntos = puntos+10;
		}
		if(document.getElementById("res43").checked){
			todas++;
			puntos = puntos+10;
		}
		if(document.getElementById("res44").checked){
			todas++;
			puntos = puntos+10;
		}
		if(todas == 4){
			puntos = puntos+10;
		}
	}

	//Pregunta 5
	if(document.getElementById("res53").checked){
		puntos = puntos+50;
	}

	//Pregunta 6
	if(document.getElementById("res63").checked){
		puntos = puntos+50;
	}

	//Pregunta 7
	if(document.getElementById("res71").checked){
		puntos = puntos+50;
	}

	//Pregunta 8
	if(document.getElementById("res83").checked){
		puntos = puntos+50;
	}

	//Pregunta 9
	if(document.getElementById("res93").checked){
		puntos = puntos+50;
	}

	//Pregunta 10
	if(document.getElementById("res102").checked){
		puntos = puntos+50;
	}

	//Pregunta 11
	if(document.getElementById("res112").checked){
		puntos = puntos+50;
	}

	//Pregunta 12
	if(document.getElementById("res124").checked){
		puntos = puntos+50;
	}

	//Pregunta 13
	if(document.getElementById("res132").checked){
		puntos = puntos+50;
	}

	//Pregunta 14
	if(document.getElementById("res142").checked){
		puntos = puntos+50;
	}

	//Pregunta 15
	if(document.getElementById("res151").checked){
		puntos = puntos+50;
	}

	//Pregunta 16
	if(document.getElementById("res165").checked){
		puntos = puntos+50;
	}

	//Pregunta 17
	if(document.getElementById("res171").checked){
		puntos = puntos+50;
	}

	//Pregunta 18
	if(document.getElementById("res181").checked){
		puntos = puntos+50;
	}

	//Pregunta 19
	if(document.getElementById("res193").checked){
		puntos = puntos+50;
	}

	//Pregunta 20
	if(document.getElementById("res204").checked){
		puntos = puntos+50;
	}

	if(puntos == 200){
		alert("TODAS CORRECTAS")
		puntos = puntos+300;
	}

	//Sumo los puntos al usuario
	if(localStorage.getItem("user") != null){
        fetch("/addPuntos", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"usuario": localStorage.getItem("user"), "puntos": puntos})
    }).then(response => response.text().then(function (text) {
        alert("Su balance de puntos es de: +"+puntos)
    }));
    }else{
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

window.onblur = window.onmousemove = function () {
    if (t) clearTimeout(t);
    contadorInactividad();
}