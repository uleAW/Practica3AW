
function coleccionNombre() {

    fetch("/coleccionNombre", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        }
        //body: JSON.stringify({"numColeccion": count})
    }).then(response => response.text().then(function(text){
        
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

    fetch("/coleccionUsuarioID", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"numUsuario": "1"})
    }).then(response => response.text().then(function(text){
        
            // Mostrar pagina del 
            //console.log(text);
            //if(localStorage.getItem("coleccionID")==null){
                console.log(text);
            	localStorage.setItem("cromosUsuario", text);
            /*}else{
            	localStorage.removeItem("coleccionID");
            	localStorage.setItem("coleccionID", text);
            }*/
            //sessionStorage.setItem("coleccionID", text);
            //localStorage.setItem("coleccionID", text);
            //Nombre = text;

        
    }));
};
function cromoID(){
    fetch("/coleccionCromos", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        
    }).then(response => response.text().then(function(text){
            localStorage.setItem("cromosID", text);
    }));
    
}
function cromoImagen(){
    fetch("/coleccionCromosImagenes", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        
    }).then(response => response.text().then(function(text){
            localStorage.setItem("cromosImagenes", text);
    }));
    
}
function datos(){
	localStorage.clear();
	coleccionID();
    cromoID();
    cromoImagen();
	//coleccionNombre();
}
function colecciones1(){

	//coleccionID();
	//coleccionNombre();
	
	//var nombreColeccion=localStorage.getItem("coleccionNombre");
	//var nombreColeccion=sessionStorage.getItem("coleccionNombre");
	//var nombresColecciones = nombreColeccion.split(",");
	var IDColeccion=localStorage.getItem("coleccionID");
	//var IDColeccion=sessionStorage.getItem("coleccionID");
	var IDColecciones = IDColeccion.split(",");
	//console.log(IDColeccion);
	tabla="";
	for(var i=0; i<IDColecciones.length-1; i++){
		tabla=tabla+"<p>"+"<button onclick=table("+IDColecciones[i]+")>mostrar cartas</button></p>";
		//imagenNombre(IDColecciones[i]);
		//imagenDireccion(IDColecciones[i]);
		//tabla=tabla+"<table id="+nombresColecciones[i]+IDColecciones[i]+"></table>";
	}
	//alert(tabla);
	document.getElementById("coleccion").innerHTML=tabla;
	//localStorage.removeItem("coleccionNombre");
	//localStorage.removeItem("coleccionID");

};
var boolean=true;
function table(){
            var cromos = new Array();
            var imagenes = new Array();
            var IDCromo = localStorage.getItem("cromosID");
            var imgCromo = localStorage.getItem("cromosImagenes");
            var IDCromos = IDCromo.split(",");
            var imgCromos = imgCromo.split(",");
            var cromoUsuario = localStorage.getItem("cromosUsuario");
            var cromoUsuarios =cromoUsuario.split(";");

            for(var i=0;i<IDCromos.length;i++){
                for(var j=0;j<cromoUsuarios.length;j++){
                    if(IDCromos[i]==cromoUsuarios[j]){
                        cromos.push(IDCromos[i]);
                        imagenes.push(imgCromos[i]);
                    }
                }
            }

            console.log(imagenes);
            tabla="";
    		tabla=tabla+"<table>";
    		salir=false;
    		for(var i=0; i<imagenes.length; i++){
    			if(salir) 
       				break;
       			tabla=tabla+"<tr>";
            	for(var k=0;k<2;k++){//el 2 de este for marca el numero de fotos que se van a mostrar en la misma fila
                	if((i*2+k)<imagenes.length){
                        tabla=tabla+"<td><img src="+imagenes[i*2+k]+"></td>";
                	}else{
                    	tabla=tabla+"<td></td>";
                    	salir=true;
                	}
            	}
            	tabla=tabla+"</tr>";
            }
            //tabla="<button onclick=colecciones1()>Volver</button>"+tabla;
    		document.getElementById("coleccion").innerHTML=tabla;
            // Mostrar pagina del usuario
            //console.log("Direccion"+count);
            //localStorage.setItem("Direccion"+count, text);
            //text;*/
        

}
