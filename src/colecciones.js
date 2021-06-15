//la variable count es el id de la colección
function imagenNombre(count) {
    var aux;
    //alert(count);
    fetch("/cargarImagen", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"numColeccion": count})
    }).then(response => {

    })
    fetch("/imagenNombre", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify({"numColeccion": "1"})
    }).then(response => response.text().then(function (text) {

        // Mostrar pagina del
        localStorage.setItem("Nombre" + count, text);
        //Nombre = text;


    }));

};

function imagenDireccion(count) {

    fetch("/cargarImagen", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"numColeccion": count})
    }).then(response => {

    })
    fetch("/imagenDireccion", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify({"numColeccion": "1"})
    }).then(response => response.text().then(function (text) {

        // Mostrar pagina del usuario
        console.log("Direccion" + count);
        localStorage.setItem("Direccion" + count, text);
        //text;

    }));
};

function coleccionNombre() {

    fetch("/coleccionNombre", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
        //body: JSON.stringify({"numColeccion": count})
    }).then(response => response.text().then(function (text) {

        // Mostrar pagina del
        //console.log(text);
        //if(localStorage.getItem("coleccionNombre")==null){
        localStorage.setItem("coleccionNombre", text);
        /*}else{
            localStorage.removeItem("coleccionNombre");
            localStorage.setItem("coleccionNombre", text);
        }*/

        //sessionStorage.setItem("coleccionNombre", text);
        //Nombre = text;


    }));
};

function coleccionID() {

    fetch("/coleccionID", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
        //body: JSON.stringify({"numColeccion": count})
    }).then(response => response.text().then(function (text) {

        // Mostrar pagina del
        //console.log(text);
        //if(localStorage.getItem("coleccionID")==null){
        localStorage.setItem("coleccionID", text);
        /*}else{
            localStorage.removeItem("coleccionID");
            localStorage.setItem("coleccionID", text);
        }*/
        //sessionStorage.setItem("coleccionID", text);
        //localStorage.setItem("coleccionID", text);
        //Nombre = text;


    }));
};

function datos() {
    colecciones1();
}

function colecciones1() {

    //coleccionID();
    //coleccionNombre();

    //var =localStorage.getItem("coleccionNombre");
    var nombreColeccion = localStorage.getItem("coleccionNombre");
    var nombresColecciones = nombreColeccion.split(",");

    var IDColeccion = localStorage.getItem("coleccionID");
    var IDColecciones = IDColeccion.split(",");
    console.log(IDColeccion);
    tabla = "";
    //tabla="<div class=menu>";
    for (var i = 0; i < nombresColecciones.length - 1; i++) {
        var newDiv = document.createElement('div');
        newDiv.id = 'pasatiempo' + i;
        newDiv.className = 'pasatiempo';
        newDiv.onclick = (function (i) {
            return function () {
                table(i);
            }
        })(i);
        document.getElementById('menu').appendChild(newDiv);
        //document.getElementById('pasatiempo'+i).onclick=function() { table(IDColecciones[i]); };;

        newDiv = document.createElement('div');
        newDiv.id = 'banner' + i;
        newDiv.className = 'banner';
        document.getElementById('pasatiempo' + i).appendChild(newDiv);

        newDiv = document.createElement('div');
        newDiv.id = 'info' + i;
        newDiv.className = 'info';
        newDiv.innerHTML = 'VER CROMOS';
        document.getElementById('pasatiempo' + i).appendChild(newDiv);

        newDiv = document.createElement('div');
        newDiv.id = 'nombre' + i;
        newDiv.className = 'nombre';
        newDiv.innerHTML = nombresColecciones[i];
        document.getElementById('banner' + i).appendChild(newDiv);


        //ocument.getElementById('pasatiempo'+i).onclick=table(i);


        /*tabla=tabla+"<div class=pasatiempo onclick="+table(IDColecciones[i])+";>"+
            "<div class=banner>"+
                "<div class=nombre>"+
                    nombresColecciones[i]+
                "</div>"+

            "</div>"+
            "<div class=info>"+
                "ROMPETE LA CABEZA RESOLVIENDO NUESTROS PUZZLES!"+
            "</div>"+
        "</div>";*/

        //tabla=tabla+"<p>"+"<button onclick=table("+IDColecciones[i]+")>mostrar cartas "+"</button></p>";
        //imagenNombre(IDColecciones[i]);
        //imagenDireccion(IDColecciones[i]);
        //tabla=tabla+"<table id="+nombresColecciones[i]+IDColecciones[i]+"></table>";
    }
    //tabla=tabla+"</div>";
    //alert(tabla);
    //document.write(tabla);
    //document.getElementById("coleccion").innerHTML=tabla;
    //localStorage.removeItem("coleccionNombre");
    //localStorage.removeItem("coleccionID");

};

var count = 0;

function table(ID) {
    //imagenNombre(ID);//el 1 marca el id de de la coleccion.
    //imagenDireccion(ID);
    count = count + 1;
    console.log(ID);
    var IDColeccion = localStorage.getItem("coleccionID");
    var IDColecciones = IDColeccion.split(",");
    localStorage.setItem("coleccion", IDColecciones[ID]);
    window.open("./cromos.html", "_self");
    //console.log(count);
    //localStorage.clear();//sobre dudas del codigo o ampliaciones consultarme, soy Mario
    //imagenNombre(ID);//el 1 marca el id de de la coleccion.
    //imagenDireccion(ID);
    /*fetch("/cargarImagen", {
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
    }).then(response => response.text().then(function(text){
        
            Direccion=text.split(",");
            tabla="";
    		tabla=tabla+"<table>";
    		salir=false;
    		for(var i=0; i<Direccion.length; i++){
    			if(salir) 
       				break;
       			tabla=tabla+"<tr>";
            	for(var k=0;k<2;k++){//el 2 de este for marca el numero de fotos que se van a mostrar en la misma fila
                	if((i*2+k)<Direccion.length){
                        tabla=tabla+"<td><img src=data:image/png;base64,"+Direccion[i*2+k]+"></td>";
                	}else{
                    	tabla=tabla+"<td></td>";
                    	salir=true;
                	}
            	}
            	tabla=tabla+"</tr>";
            }
            tabla="<button onclick=colecciones1()>Volver</button>"+tabla;
    		document.write(tabla);
            //document.getElementById("coleccion").innerHTML=tabla;
            // Mostrar pagina del usuario
            //console.log("Direccion"+count);
            //localStorage.setItem("Direccion"+count, text);
            //text;
        
    }));*/
};