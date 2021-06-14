function imagenID(count) {
    var aux;
    //alert(count);
    /*fetch("/cargarImagen", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"numColeccion": count})
    }).then(response => {
        
    });*/
    fetch("/IDimagen", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"numColeccion": count})
    }).then(response => response.text().then(function(text){
        
            // Mostrar pagina del 
            localStorage.setItem("imagenID", text);
            //Nombre = text;

        
    }));

};
function table() {
    //imagenNombre(ID);//el 1 marca el id de de la coleccion.
    //imagenDireccion(ID);
    var ID = localStorage.getItem("coleccion");
    imagenID(ID);
    //localStorage.clear();//sobre dudas del codigo o ampliaciones consultarme, soy Mario
    //imagenNombre(ID);//el 1 marca el id de de la coleccion.
    //imagenDireccion(ID);
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
        //body: JSON.stringify({"numColeccion": "1"})
    }).then(response => response.text().then(function (text) {

        var direccion = text.split(",");
        //var imgIDs = imgID.split(",");
        var tabla = "";
        tabla = tabla + "<table>";
        var salir = false;
        for (var i = 0; i < direccion.length - 1; i++) {
            var newDiv = document.createElement('div');
            newDiv.id = 'cromo' + i;
            newDiv.className = 'cromos';
            document.getElementById('menu').appendChild(newDiv);
        

            newDiv = document.createElement('img');
            newDiv.id = 'img' + i;
            newDiv.className = 'image';
            newDiv.src = "data:image/png;base64," + direccion[i];
            document.getElementById('cromo' + i).appendChild(newDiv);
            document.getElementById('cromo'+i).onclick=(function(i){return function() { abrirPagCromo(i); }})(i);
            

    }

    }));
};
function abrirPagCromo(ID) {
    
    var imgID = localStorage.getItem("imagenID");
    var imgIDs = imgID.split(",");
    localStorage.setItem("cromoID", imgIDs[ID]);
    window.open("./cromo.html", "_self");
}
function colecciones1() {
    window.open("./comprar.html", "_self");
}