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
    // AQUI COGER EL NOMBRE DEL CROMO DE ALGUNA MANERA VER EN EL FUTURO
    var nombre = "aa";
    // TAMBIEN TENDREMOS QUE COGER EL USUARIO QUE ESTA CONECTADO
    var usuario = "aaa"
    fetch("/comprarAlbum", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"album": nombre, "usuario": usuario})
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

//Inactividad
function e(q) {
    document.body.appendChild( document.createTextNode(q) );
    document.body.appendChild( document.createElement("BR") );
}
function inactividad() {
    alert("TIEMPO DE SESION EXCEDIDO");
    window.top.close();
    //abrir_ventana("http://127.0.0.1:5050/src/inicioSesion.html");
}
var t=null;
function contadorInactividad() {
    t=setTimeout("inactividad()",1800); //30 min (1800000)
}
window.onblur=window.onmousemove=function() {
    if(t) clearTimeout(t);
    contadorInactividad();
}
function abrir_ventana(pagina) {
    window.open(pagina);
}
