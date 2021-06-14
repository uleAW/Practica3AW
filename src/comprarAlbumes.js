function datos(){
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

/*function buscarNombres() {
    return fetch("/nombreColeccionesUsuario1", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"nombre": localStorage.getItem("user")})
    }).then(response => response.text().then(function (text) {
        return text;
    }));
}*/
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
    //nombresAlbumes = await buscarNombres();
    //nombresAlbumes = nombresAlbumes.split(",");
    albumIDs = await albumID();
    albumIDs = albumIDs.split(",");
    //estadosColeccion = await estadoColeccion();
    //estadosColeccion = estadosColeccion.split(",");
    for (var i = 0; i < imgAlbumes.length - 1; i++) {
        var newDiv = document.createElement('div');
        newDiv.id = 'album' + i;
        newDiv.className = 'album';
        newDiv.onclick = (function (i) {
            return function () {
                localStorage.setItem("albumComprar", albumIDs[i])://aqui se guarda el ID
                window.open("./cromosUsuario.html", "_self");//aqui se guarda el 
            }
        })(i);
        document.getElementById('menu').appendChild(newDiv);

        newDiv = document.createElement('img');
        newDiv.id = 'img' + i;
        newDiv.className = 'image';
        newDiv.src = "data:image/png;base64," + imgAlbumes[i];
        document.getElementById('album' + i).appendChild(newDiv);

        /*newDiv = document.createElement('text');
        newDiv.id = 'text' + i;
        newDiv.className = 'text';
        newDiv.innerHTML = nombresAlbumes[i];
        document.getElementById('album' + i).appendChild(newDiv);*/
    }
}
