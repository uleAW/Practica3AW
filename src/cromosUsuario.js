async function cargarCromos() {
    var imgCromo;
    var nombreCromo;
    imgCromo = await cargarImagenesCromos();
    imgCromo = imgCromo.split(',')
    nombreCromo = await cargarNombresCromo();
    nombreCromo = nombreCromo.split(',')
    for (var i = 0; i < imgCromo.length - 1; i++) {
        var newDiv = document.createElement('div');
        newDiv.id = 'cromo' + i;
        newDiv.className = 'cromos';
        document.getElementById('menu').appendChild(newDiv);
        //document.getElementById('pasatiempo'+i).onclick=function() { table(IDColecciones[i]); };;

        newDiv = document.createElement('img');
        newDiv.id = 'img' + i;
        newDiv.className = 'image';
        newDiv.src = "data:image/png;base64," + imgCromo[i];
        document.getElementById('cromo' + i).appendChild(newDiv);

        newDiv = document.createElement('text');
        newDiv.id = 'text' + i;
        newDiv.className = 'text';
        newDiv.innerHTML = nombreCromo[i];
        document.getElementById('cromo' + i).appendChild(newDiv);
    }
}

function cargarImagenesCromos() {
    return fetch("/imagenCromosUsuario", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"nombreAlbum": localStorage.getItem("cargarCromosUsuario"), "nombreUsuario": localStorage.getItem("user")})
    }).then(response => response.text().then(function (text) {
        return text;
    }));
}

function cargarNombresCromo() {
    return fetch("/nombreCromosUsuario", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"nombreAlbum": localStorage.getItem("cargarCromosUsuario"), "nombreUsuario": localStorage.getItem("user")})
    }).then(response => response.text().then(function (text) {
        return text;
    }));
}