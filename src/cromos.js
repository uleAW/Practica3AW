function table(){
	//imagenNombre(ID);//el 1 marca el id de de la coleccion.
    //imagenDireccion(ID);
	var ID=localStorage.getItem("coleccion");
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
        
    }));
};
function colecciones1(){
    window.open("./consultarColeccion.html", "_self");
}