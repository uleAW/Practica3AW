function comprarCromo() {
    // AQUI COGER EL NOMBRE DEL CROMO DE ALGUNA MANERA VER EN EL FUTURO
    var nombre = "aaaa";
    // TAMBIEN TENDREMOS QUE COGER EL USUARIO QUE ESTA CONECTADO
    var usuario = "aaa"
    fetch("/comprarCromo", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"cromo": nombre, "usuario": usuario})
    }).then(response => {
        if (response.status == 200) {
            // Mostrar mensaje de que el cromo se ha comprado correctamente
            console.log("Cromo comprado")
        } else {
            // Mostrar error de conexion
            console.log("Error al comprar el cromo")
        }
    })
}

function comprarAlbum() {
    //CAMBIAR
    var nombreColeccion = "aa";
    var usuario = localStorage.getItem("user")
    fetch("/comprarAlbum", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"album": nombreColeccion, "usuario": usuario})
    }).then(response => {
        if (response.status == 200) {
            // Mostrar mensaje de que el cromo se ha comprado correctamente
            console.log("Album comprado")
        } else {
            // Mostrar error de conexion
            console.log("Error al comprar el album")
        }
    })
}
