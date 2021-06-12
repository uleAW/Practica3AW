function funciones(){
	consulta();
}

function consulta(){
	//var id = localStorage.getItem("IDcromo");
	var id = "1";
    fetch("/cargarInfoCromo", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"idCromo": id})
    }).then(response => response.text().then(function(text){
    	datos = text.split(",");
        document.getElementById("nombre").value = datos[0];       
        document.getElementById("imagen").src = datos[1];   
        document.getElementById("precio").value = datos[2];   
        document.getElementById("copias").value = datos[3];   
        document.getElementById("numColeccion").value = datos[4];     
    }));
}

//SEVI (Repasar)
function comprar(){
	if(document.getElementById("copias").value != "0"){
		//No tiene dinero suficiente
		if(localStorage.getItem("puntos") < document.getElementById("precio")){
			alert("Dinero Insuficiente");
		}else{
			alert("Compra realizada");
			//Actualizar la base de datos y la pagina
			document.getElementById("copias").value = document.getElementById("copias").value-1; 
			//ACTUALIZAR BBDD   
		}
	}else{
		alert("No quedan copias disponibles");
	}
}