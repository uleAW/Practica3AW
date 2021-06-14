function datos() {
    cargarAlbumes();
}

function buscarImagenes() {
    return fetch("/albumesUsuario1", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"nombre": localStorage.getItem("user")})
    }).then(response => response.text().then(function (text) {
        return text;
    }));
}

function buscarPrecio() {
    return fetch("/albumesPrecio1", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"nombre": localStorage.getItem("user")})
    }).then(response => response.text().then(function (text) {
        return text;
    }));
}

function albumID() {
    return fetch("/albumID", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"nombre": localStorage.getItem("user")})
    }).then(response => response.text().then(function (text) {
        return text;
    }));
}

async function cargarAlbumes() {
    var nombresAlbumes;
    var imgAlbumes;
    var estadosColeccion;
    var albumIDs;
    imgAlbumes = await buscarImagenes();
    imgAlbumes = imgAlbumes.split(",");
    precioAlbumes = await buscarPrecio();
    precioAlbumes = precioAlbumes.split(",");
    albumIDs = await albumID();
    albumIDs = albumIDs.split(",");
    //estadosColeccion = await estadoColeccion();
    //estadosColeccion = estadosColeccion.split(",");
    var out = ""
    for (var i = 0; i < imgAlbumes.length - 1; i++) {
        /*var newDiv = document.createElement('div');
        newDiv.id = 'album' + i;
        newDiv.className = 'album';
        document.getElementById('menu').appendChild(newDiv);

        newDiv = document.createElement('img');
        newDiv.id = 'img' + i;
        newDiv.className = 'image';
        newDiv.src = "data:image/png;base64," + imgAlbumes[i];
        document.getElementById('album' + i).appendChild(newDiv);*/

        /*newDiv = document.createElement('text');
        newDiv.id = 'text' + i;
        newDiv.className = 'text';
        newDiv.innerHTML = nombresAlbumes[i];
        document.getElementById('album' + i).appendChild(newDiv);*/
        out = out + "<p><img src= data:image/png;base64," + imgAlbumes[i] + "> Precio: " + precioAlbumes[i] + "<button onclick=comprarAlbum("+
        albumIDs[i] + ")>Comprar albumes </button><div id='errorAlbum" + albumIDs[i] + "'><text id='textErrorAlbum" + albumIDs[i] + "'></text></div></p>";
    }
    document.write(out);
}

function comprarAlbum(ID) {
    console.log(localStorage.getItem("user"))
    fetch("/comprarAlbum", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"usuario": localStorage.getItem("user"), "album": ID})
    }).then(response => response.text().then(function (text) {
        document.getElementById("textErrorAlbum" + ID).innerHTML = text;
        document.getElementById("errorAlbum" + ID).style.display = "block";
        setTimeout(function () {
            document.getElementById("errorAlbum" + ID).style.display = "none";
        }, 3000);
    }));
}