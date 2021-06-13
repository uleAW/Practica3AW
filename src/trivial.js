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
	if(document.getElementById("res41").checked){
		puntos = puntos+10;
	}
	if(document.getElementById("res42").checked){
		puntos = puntos+10;
	}
	if(document.getElementById("res43").checked){
		puntos = puntos+10;
	}
	if(document.getElementById("res44").checked){
		puntos = puntos+10;
	}
	if(document.getElementById("res45").checked == false){
		puntos = puntos+10;
	}

	//Pregunta 5
	if(document.getElementById("res53").checked){
		puntos = puntos+50;
	}

	//Pregunta 6
	if(document.getElementById("res62").checked){
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
	if(document.getElementById("res152").checked){
		puntos = puntos+50;
	}

	//Pregunta 16
	if(document.getElementById("res165").checked){
		puntos = puntos+50;
	}

	//Pregunta 17
	if(document.getElementById("res173").checked){
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

	//Pregunta 20 (MAL)
	if(document.getElementById("res203").checked){
		puntos = puntos+50;
	}

	if(puntos == 1000){
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