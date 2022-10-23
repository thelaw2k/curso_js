/* Aplicacion para calcular el importe total y unitario en cuotas.
   Mas adelante compararé ese importe contra el importe de pago de contado.*/

let importe_contado;
let importe_en_cuotas;
let numero_cuotas;

function calculo_cuotas(){
    do{
    importe_contado = prompt("Ingrese importe a pagar en contado");
    }
    while(importe_contado.trim() == "")

    do{
    importe_en_cuotas = prompt("Ingrese importe a pagar en cuotas");
    }
    while(importe_en_cuotas.trim() == "")

    do{
    numero_cuotas = prompt("Ingrese la cantidad de cuotas");
    }
    while(numero_cuotas.trim() == "")

    //Muestra Importes de cada cuota en la consola
    let importe_cuota = Number(importe_en_cuotas / numero_cuotas);
    alert("Importe Total $" + importe_en_cuotas + " en " + numero_cuotas + " cuotas de $" + importe_cuota);

    numero_cuotas = Number(numero_cuotas);
    for(i=1;i<numero_cuotas+1;i++){
        console.log("Cuota nro " + i + ": $" + importe_cuota);
    }
}
