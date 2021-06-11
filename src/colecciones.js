function aniadirColeccion() {
    var nombre = document.getElementById("nombreAniadirColeccion").value
    var imagen = document.getElementById("imgAniadirAlbum").files[0]
    var precioAlbum = document.getElementById("precioAniadirAlbum").value
    var reader = new FileReader()

    reader.onload = function(event) {

        var data = event.target.result.replace("data:" + imagen.type+";base64,", '');
        console.log(data)
        fetch("/aniadirColeccion", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({"nombre": nombre, "imagen": data, "precio": precioAlbum})
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
    reader.readAsDataURL(imagen);
}
