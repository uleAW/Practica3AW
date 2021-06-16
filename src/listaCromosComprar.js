function funciones(){
    checkSesion();
    table();
}

function checkSesion() {
    if (localStorage.getItem("Cookie_Sesion") == "false") {
        alert("NECESARIO INICIAR SESION");
        window.open("./inicioSesion.html", "_self");
    }
}

function imagenID(count) {
    fetch("/IDimagen", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "numColeccion": count })
    }).then(response => response.text().then(function(text) {
        localStorage.setItem("imagenID", text);
    }));

};

function table() {
    localStorage.removeItem("back")
    var ID = localStorage.getItem("coleccion");
    imagenID(ID);
    fetch("/cargarImagen", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "numColeccion": ID })
    }).then(response => {})

    fetch("/imagenDireccion", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => response.text().then(function(text) {
        var direccion = text.split(",");
        //var imgIDs = imgID.split(",");
        for (var i = 0; i < direccion.length - 1;) {
            var newDiv = document.createElement('div');
            newDiv.id = 'cromo' + i;
            newDiv.className = 'album';
            document.getElementById('menu').appendChild(newDiv);

            newDiv = document.createElement('img');
            newDiv.id = 'img' + i;
            newDiv.className = 'image';
            newDiv.src = "data:image/png;base64," + direccion[i];
            document.getElementById('cromo' + i).appendChild(newDiv);

            newDiv = document.createElement('div');
            newDiv.id = 'divAux' + i;
            newDiv.className = 'divAux';
            document.getElementById('cromo' + i).appendChild(newDiv);

            newDiv = document.createElement('div');
            newDiv.id = 'divAux2' + i;
            newDiv.className = 'texto';
            document.getElementById('divAux' + i).appendChild(newDiv);

            newDiv = document.createElement('b');
            newDiv.id = 'textNombreNegrita' + i;
            newDiv.className = 'textNombreNegrita';
            newDiv.innerHTML = "Nombre:";
            document.getElementById('divAux2' + i).appendChild(newDiv);

            newDiv = document.createElement('text');
            newDiv.id = 'textNombre' + i;
            newDiv.className = 'textNombre';
            newDiv.innerHTML = direccion[i + 2];
            document.getElementById('divAux2' + i).appendChild(newDiv);

            newDiv = document.createElement('b');
            newDiv.id = 'textNegritaPrecio' + i;
            newDiv.className = 'textNegritaPrecio';
            newDiv.innerHTML = "Precio:";
            document.getElementById('divAux2' + i).appendChild(newDiv);

            newDiv = document.createElement('text');
            newDiv.id = 'textPrecio' + i;
            newDiv.className = 'textPrecio';
            newDiv.innerHTML = direccion[i + 1];
            document.getElementById('divAux2' + i).appendChild(newDiv);

            newDiv = document.createElement('button');
            newDiv.id = 'buttonComprar' + i;
            newDiv.appendChild(document.createTextNode("Comprar"))
            document.getElementById('divAux' + i).appendChild(newDiv);
            document.getElementById('buttonComprar' + i).onclick = (function(i) {
                return function() {
                    comprarCromo(i);
                }
            })(i);

            newDiv = document.createElement('div');
            newDiv.id = 'errorAlbum' + i;
            newDiv.className = 'errorAlbum';
            document.getElementById('cromo' + i).appendChild(newDiv);

            newDiv = document.createElement('text');
            newDiv.id = 'textErrorAlbum' + i;
            newDiv.className = 'textErrorAlbum';
            newDiv.setAttribute("content", "Comprar");
            document.getElementById('errorAlbum' + i).appendChild(newDiv);
            i = i + 3;
        }
    }));
};

function comprarCromo(id) {
    // AQUI COGER EL NOMBRE DEL CROMO DE ALGUNA MANERA VER EN EL FUTURO
    var cromoID = document.getElementById("textNombre" + id).innerHTML
        // TAMBIEN TENDREMOS QUE COGER EL USUARIO QUE ESTA CONECTADO
    var usuario = localStorage.getItem("user");
    var numColeccion = localStorage.getItem("coleccion");
    fetch("/comprarCromo", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "cromo": cromoID, "usuario": usuario, "numColeccion": numColeccion })
    }).then(response => response.text().then(function(text) {
        if (response.status == 200) {
            document.getElementById("textErrorAlbum" + id).innerHTML = text;
            document.getElementById("errorAlbum" + id).style.visibility = "visible";
            setTimeout(function() {
                document.getElementById("errorAlbum" + id).style.visibility = "hidden";
            }, 3000);
        }
    }));
}