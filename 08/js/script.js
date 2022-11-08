// Aplicacion para calcular el importe total y unitario en cuotas en base a una tasa de interes

function calculo_cuotas(){

    let acumulado = 0;
    let arr_cuotas = [""];
    
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

    //Ejecuto una funcion del objeto
    console.log(credito.presentacion());
    //console.log("capitalXcuota: "+credito.capitalXcuota());
    //console.log("interesXcuota: "+credito.interesXcuota());
    //console.log("importeXcuota: "+credito.importeXcuota());


    function Acumular(imp){
        return acumulado += Number(imp);
    }
  
    let inicio = Date.now();
    
    // Muestro los datos de cada cuota
    for(i=1;i<Number(credito.numero_cuotas)+1;i++){
        console.log("Cuota nro "+ i +": Capital $"+ credito.capitalXcuota() +" Interes $"+ credito.interesXcuota() +" Total $"+ (credito.importeXcuota())+" Acumulado $"+ Acumular(credito.importeXcuota()).toFixed(2));

        // Creo Array para buscar la cuota luego de hacer los calculos
        arr_cuotas.push("Cuota nro "+ i +": Capital $"+ credito.capitalXcuota() +" Interes $"+ credito.interesXcuota() +" Total $"+ (credito.importeXcuota()));//+" Acumulado $"+ Acumular(credito.importeXcuota()).toFixed(2));

    }

    let final = Date.now();
    let ejecucion =  final - inicio;
    console.log("Tiempo de ejecucion del for "+ ejecucion + " milisegundos.")

    do{
        busqueda_cuota = prompt("Ingrese el numero de cuota que quiere ver","1");
    }while(busqueda_cuota.trim() == "")

    console.log(arr_cuotas[busqueda_cuota]);
}