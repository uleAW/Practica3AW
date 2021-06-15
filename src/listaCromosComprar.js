function imagenID(count) {
    fetch("/IDimagen", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"numColeccion": count})
    }).then(response => response.text().then(function (text) {
        localStorage.setItem("imagenID", text);
    }));

};

function table() {
    var ID = localStorage.getItem("coleccion");
    imagenID(ID);
    fetch("/cargarImagen", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"numColeccion": ID})
    }).then(response => {
    })

    fetch("/imagenDireccion", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(response => response.text().then(function (text) {
        var direccion = text.split(",");
        //var imgIDs = imgID.split(",");
        for (var i = 0; i < direccion.length - 1;) {
            var newDiv = document.createElement('div');
            newDiv.id = 'cromo' + i;
            newDiv.className = 'cromos';
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

            newDiv = document.createElement('text');

            newDiv.id = 'textNombre' + i;
            newDiv.className = 'textNombre';
            newDiv.innerHTML = direccion[i + 2];
            document.getElementById('divAux' + i).appendChild(newDiv);
            document.getElementById("divAux"+i).insertBefore(document.createTextNode("Nombre: "), newDiv);

            newDiv = document.createElement('text');
            newDiv.id = 'textPrecio' + i;
            newDiv.className = 'textPrecio';
            newDiv.innerHTML = "Precio: "+direccion[i + 1];
            document.getElementById('divAux' + i).appendChild(newDiv);

            newDiv = document.createElement('button');
            newDiv.id = 'buttonComprar' + i;
            newDiv.appendChild(document.createTextNode("Comprar"))
            document.getElementById('divAux' + i).appendChild(newDiv);
            document.getElementById('buttonComprar' + i).onclick = (function (i) {
                return function () {
                    comprarCromo(i);
                }
            })(i);

            newDiv = document.createElement('div');
            newDiv.id = 'errorComprarCromo' + i;
            newDiv.className = 'errorComprarCromo';
            document.getElementById('cromo' + i).appendChild(newDiv);

            newDiv = document.createElement('text');
            newDiv.id = 'textErrorComprarCromo' + i;
            newDiv.className = 'textErrorComprarCromo';
            newDiv.setAttribute("content", "Comprar");
            document.getElementById('errorComprarCromo' + i).appendChild(newDiv);
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
        body: JSON.stringify({"cromo": cromoID, "usuario": usuario, "numColeccion": numColeccion})
    }).then(response => response.text().then(function (text) {
        if (response.status == 200) {
            document.getElementById("textErrorComprarCromo" + id).innerHTML = text;
            document.getElementById("errorComprarCromo" + id).style.display = "block";
            setTimeout(function () {
                document.getElementById("errorComprarCromo" + id).style.display = "none";
            }, 3000);
        } else {
            console.log("Error al comprar el cromo")
        }
    }));
}