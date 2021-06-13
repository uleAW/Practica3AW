
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
    }).then(response => response.text().then(function(text){
        
            // Mostrar pagina del 
            localStorage.setItem("Nombre"+count, text);
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
    }).then(response => response.text().then(function(text){
        
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
function datos(){
	localStorage.clear();
	coleccionID();
	coleccionNombre();
}
function colecciones1(){

	//coleccionID();
	//coleccionNombre();
	
	var nombreColeccion=localStorage.getItem("coleccionNombre");
	//var nombreColeccion=sessionStorage.getItem("coleccionNombre");
	var nombresColecciones = nombreColeccion.split(",");
	var IDColeccion=localStorage.getItem("coleccionID");
	//var IDColeccion=sessionStorage.getItem("coleccionID");
	var IDColecciones = IDColeccion.split(",");
	//console.log(IDColeccion);
    //tabla="";
	tabla="<div class=menu>";
	for(var i=0; i<nombresColecciones.length-1; i++){
        tabla=tabla+"<div class=coleccion onclick="+table(IDColecciones[i])+";>"+
            "<div class=banner>"+
                "<div class=nombre>"+
                    nombresColecciones[i]+
                "</div>"+

            "</div>"+
            "<div class=info>"+
                "ROMPETE LA CABEZA RESOLVIENDO NUESTROS PUZZLES!"+
            "</div>"+
        "</div>";

		//tabla=tabla+"<p>"+"<button onclick=table("+IDColecciones[i]+")>mostrar cartas "+"</button></p>";
		//imagenNombre(IDColecciones[i]);
		//imagenDireccion(IDColecciones[i]);
		//tabla=tabla+"<table id="+nombresColecciones[i]+IDColecciones[i]+"></table>";
	}
    tabla=tabla+"</div>";
	//alert(tabla);
	document.getElementById("coleccion").innerHTML=tabla;
	//localStorage.removeItem("coleccionNombre");
	//localStorage.removeItem("coleccionID");

};
var boolean=true;
function table(ID){
	//imagenNombre(ID);//el 1 marca el id de de la coleccion.
    //imagenDireccion(ID);
	
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
    		document.getElementById("coleccion").innerHTML=tabla;
            // Mostrar pagina del usuario
            //console.log("Direccion"+count);
            //localStorage.setItem("Direccion"+count, text);
            //text;
        
    }));
    //alert(ID);
    //console.log(localStorage.getItem("Nombre"));
    /*Nombre=localStorage.getItem("Nombre"+ID);//uso localStorage por que no me deja usar variables globales ni locales,
    //Nombre=sessionStorage.getItem("Nombre");
    //Direccion=sessionStorage.getItem("Direccion");
    Direccion=localStorage.getItem("Direccion"+ID);
    Nombres= Nombre.split(",");
    Direcciones= Direccion.split(",");
    for(var i=1; i<=3; i++){
		console.log(localStorage.getItem("Direccion"+i)+"\n");
	}
    tabla="";
    tabla=tabla+"<table>";
    salir=false;
    for(var i=0; i<Nombres.length; i++){//el metodo es dinamico por lo que si son 8 o 11 fotos se mostraran bien 
        if(salir) 
        break;
        for(var j=0;j<2;j++){//el 2 de este for no lo toqueis, sirve para que muertre el nombre y debajo la foto
            tabla=tabla+"<tr>";
            for(var k=0;k<2;k++){//el 2 de este for marca el numero de fotos que se van a mostrar en la misma fila
                if((i*2+k)<Nombres.length){
                    if(j==0)
                        tabla=tabla +"<td>"+Nombres[i*2+k]+"</td>";
                    if(j==1)
                        tabla=tabla+"<td><img src="+Direcciones[i*2+k]+"></td>";
                }else{
                    tabla=tabla+"<td></td>";
                    salir=true;
                }
            }
            tabla=tabla+"</tr>"
        }

    }
    tabla=tabla+"</table>";
    //console.log(tabla);
    tabla=tabla+"<button onclick=colecciones1()>Volver</button>\n";
    document.getElementById("coleccion").innerHTML=tabla;
    
    //aqui se marca la tabla que se va a editar001
  //  localStorage.clear();
	/*if(boolean){
		boolean=false;
		table(ID);
		boolean=true;
	}*/
};