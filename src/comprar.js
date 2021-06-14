
//la variable count es el id de la colección
function imagenID(count) {
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
    fetch("/imagenID", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        //body: JSON.stringify({"numColeccion": "1"})
    }).then(response => response.text().then(function(text){
        
            // Mostrar pagina del 
            localStorage.setItem("imagenID", text);
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
    }).then(response => response.text().then(function(text){
        
            // Mostrar pagina del usuario
            console.log("Direccion"+count);
            localStorage.setItem("Direccion"+count, text);
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
    }).then(response => response.text().then(function(text){
        
            	localStorage.setItem("coleccionNombre", text);


        
    }));
};
function coleccionID() {

    fetch("/coleccionID", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
        //body: JSON.stringify({"numColeccion": count})
    }).then(response => response.text().then(function(text){
        
            	localStorage.setItem("coleccionID", text);

        
    }));
};
var IDColeccion;
var nombreColeccion;
function datos(){
	//coleccionID();
	//coleccionNombre();
    colecciones1();
}
function colecciones1(){

	//coleccionID();
	//coleccionNombre();
	
	//var =localStorage.getItem("coleccionNombre");
	var nombreColeccion=localStorage.getItem("coleccionNombre");
	var nombresColecciones = nombreColeccion.split(",");
	
    var IDColeccion=localStorage.getItem("coleccionID");
	var IDColecciones = IDColeccion.split(",");
	console.log(IDColeccion);
    tabla="";
	//tabla="<div class=menu>";
	for(var i=0; i<nombresColecciones.length-1; i++){
            var newDiv = document.createElement('div');
            newDiv.id='pasatiempo'+i;
            newDiv.className='pasatiempo';
            newDiv.onclick=(function(i){return function() { table(i); }})(i);
            document.getElementById('menu').appendChild(newDiv);
            //document.getElementById('pasatiempo'+i).onclick=function() { table(IDColecciones[i]); };;
                
            newDiv = document.createElement('div');
            newDiv.id='banner'+i;
            newDiv.className='banner';
            document.getElementById('pasatiempo'+i).appendChild(newDiv);

            newDiv = document.createElement('div');
            newDiv.id='info'+i;
            newDiv.className='info';
            newDiv.innerHTML='VER CROMOS';
            document.getElementById('pasatiempo'+i).appendChild(newDiv);

            newDiv = document.createElement('div');
            newDiv.id='nombre'+i;
            newDiv.className='nombre';
            newDiv.innerHTML=nombresColecciones[i];
            document.getElementById('banner'+i).appendChild(newDiv);
        }


};
var boolean=true;
var count=0;
function table(ID){
	//imagenNombre(ID);//el 1 marca el id de de la coleccion.
    //imagenDireccion(ID);
    count=count+1;
	console.log(ID);
    var IDColeccion=localStorage.getItem("coleccionID");
    var IDColecciones = IDColeccion.split(",");
    imagenID(ID);
    localStorage.setItem("coleccion", IDColecciones[ID]);
    window.open("./cromos.html", "_self");
    
};