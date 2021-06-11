var Nombre;
//la variable count es el id de la colección
function imagenNombre(count) {

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
            localStorage.setItem("Nombre", text);
            //Nombre = text;

        
    }));
    //nsole.log(Nombre);

};
var Direccion;
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
            //console.log(text);
            localStorage.setItem("Direccion", text);
            //text;
        
    }));
};

function table(){//sobre dudas del codigo o ampliaciones consultarme, soy Mario
    imagenNombre(1);//el 1 marca el id de de la coleccion.
    imagenDireccion(1);
    //console.log(Nombre);
    Nombre=localStorage.getItem("Nombre");//uso localStorage por que no me deja usar variables globales ni locales,
    Direccion=localStorage.getItem("Direccion");
    Nombres= Nombre.split(",");
    Direcciones= Direccion.split(",");
    tabla="";
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
    document.getElementById("coleccion").innerHTML=tabla;//aqui se marca la tabla que se va a editar
};