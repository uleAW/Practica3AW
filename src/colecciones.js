function aniadirColeccion() {
    var nombre = document.getElementById("nombreAniadirColeccion").value
    var imagen = document.getElementById("imgAniadirAlbum").files[0]
    var precioAlbum = document.getElementById("precioAniadirAlbum").value
    var reader = new FileReader()

    reader.onload = function(event) {

        var data = event.target.result.replace("data:" + imagen.type+";base64,", '');
        fetch("/aniadirColeccion", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"nombre": nombre, "imagen": data, "precio": precioAlbum})
        }).then(response => {
            if (response.status == 200) {
                // Mostrar pagina de colecciones o volver a la pestaña de atras
                console.log("Colección añadida")
            } else {
                // Mostrar error de conexion
                console.log("Error al conectar")
            }
        })
    }
    reader.readAsDataURL(imagen);
}

function aniadirCromo() {

    var nombre = document.getElementById("nombreAniadirCromo").value
    var imagen = document.getElementById("imgAniadirCromo").files[0]
    var precioCromo = document.getElementById("precioAniadirCromo").value
    var coleccion = document.getElementById("coleccionAniadirCromo").value
    var reader = new FileReader()

    reader.onload = function(event) {

        var data = event.target.result.replace("data:" + imagen.type+";base64,", '');
        fetch("/aniadirCromo", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"nombre": nombre, "imagen": data, "precio": precioCromo, "coleccion": coleccion})
        }).then(response => {
            if (response.status == 200) {
                // Mostrar pagina de colecciones o volver a la pestaña de atras
                console.log("Cromo añadido")
            } else {
                // Mostrar error de conexion
                console.log("Error al conectar")
            }
        })
    }
    reader.readAsDataURL(imagen);
}

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
