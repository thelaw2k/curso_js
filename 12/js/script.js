// Aplicacion para calcular el importe total y unitario en cuotas en base a una tasa de interes

function calculo_cuotas(){

    let acumulado = 0;
    let arr_cuotas = [""];
    let credito_completo = "";

    //Hago desaparecer el texto y boton de inicio, solo para demostrar como interactuo con el DOM
    document.getElementById("principal").hidden = true;
    document.getElementById("boton").hidden = true;

    do{
        n1 = prompt("Ingrese Capital","10000");
    }while(n1.trim() == "")

    do{
        n2 = prompt("Ingrese la cantidad de cuotas","12");
    }while(n2.trim() == "")

    do{
        n3 = prompt("Ingrese tasa de interes","7.5");
    }while(n3.trim() == "")

    //Creo Objeto con propiedades y funciones
    const credito = {
        importe_capital: n1,
        numero_cuotas: n2,
        tasa_interes: n3,

        presentacion: function() {
            return "Simularemos un prestamo de "+ this.importe_capital +" en "+ this.numero_cuotas +" cuotas con una tasa de interes del "+ this.tasa_interes +"%"
        },

        capitalXcuota: function(){
            return Number(this.importe_capital / this.numero_cuotas).toFixed(2);
        },

        interesXcuota: function() {
            return (Number(this.importe_capital / this.numero_cuotas) * this.tasa_interes / 100).toFixed(2);
        },

        importeXcuota: function() {
            return (Number(this.importe_capital / this.numero_cuotas) + Number(this.importe_capital / this.numero_cuotas) * this.tasa_interes / 100).toFixed(2);
        }
    };

    //Convierto el objeto en JSON y lo mando a LocalStorage
    const creditojson = JSON.stringify(credito);
    localStorage.setItem("creditoMem", creditojson);


    //Convierto el JSON en objeto y lo mando al DOM
    const creditoObj = JSON.parse(localStorage.getItem("creditoMem"));
    document.getElementById("pantalla2").innerHTML = creditoObj.importe_capital+" Se muestra desde LocalStorage";
    

    //Ejecuto una funcion del objeto
    document.getElementById("pantalla0").innerHTML = credito.presentacion();
    //console.log("capitalXcuota: "+credito.capitalXcuota());
    //console.log("interesXcuota: "+credito.interesXcuota());
    //console.log("importeXcuota: "+credito.importeXcuota());


    function Acumular(imp){
        return acumulado += Number(imp);
    }
  
    let inicio = Date.now();
    
    // Muestro los datos de cada cuota
    for(i=1;i<Number(credito.numero_cuotas)+1;i++){
        credito_completo = credito_completo + ("Cuota nro "+ i +": Capital $"+ credito.capitalXcuota() +" Interes $"+ credito.interesXcuota() +" Total $"+ (credito.importeXcuota())+" Acumulado $"+ Acumular(credito.importeXcuota()).toFixed(2)+"<br/>");

        // Creo Array para buscar la cuota luego de hacer los calculos
        arr_cuotas.push("Cuota nro "+ i +": Capital $"+ credito.capitalXcuota() +" Interes $"+ credito.interesXcuota() +" Total $"+ (credito.importeXcuota()));//+" Acumulado $"+ Acumular(credito.importeXcuota()).toFixed(2));

    }

    document.getElementById("pantalla1").innerHTML = credito_completo

    let final = Date.now();
    let ejecucion =  final - inicio;
    console.log("Tiempo de ejecucion del for "+ ejecucion + " milisegundos.")

    do{
        busqueda_cuota = prompt("Ingrese el numero de cuota que quiere ver","1");
    }while(busqueda_cuota.trim() == "")

    document.getElementById("pantalla2").innerHTML = arr_cuotas[busqueda_cuota];

    document.getElementById("boton").hidden = false;
}