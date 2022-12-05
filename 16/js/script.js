// Aplicacion para calcular el importe total y unitario en cuotas en base a una tasa de interes

//Oculto el div que muestra el formulario y los resultados
document.getElementById("contenido").hidden = true;
document.getElementById("pantalla1").hidden = true;
document.getElementById("pantalla2").hidden = true;

//Funcion que se ejecuta cuando inciamos la aplicacion
//Oculta boton de inicio y muestra el formulario
//solo para demostrar como interactuo con el DOM
function comienza_ejecucion(){
    document.getElementById("footer").hidden = true;
    document.getElementById("contenido").hidden = false;
    document.getElementById("pantalla0").hidden = false;
    document.getElementById("pantalla1").hidden = true;
    document.getElementById("pantalla2").hidden = true;
    document.getElementById("pantalla1").innerHTML = "";
    document.getElementById("pantalla2").innerHTML = "";
}

function calculo_cuotas(){
    //inicio variables y arrays y prevengo el Submit del formulario
    event.preventDefault();
    let acumulado = 0;
    let arr_cuotas = [""];
    let credito_completo = "";
    let texto_tasa_cambio = 0;

    // Recupero los valores de los inputs
    n1 = document.forms["formulario"]["capital"].value;
    n2 = document.forms["formulario"]["cant_cuotas"].value;
    n3 = document.forms["formulario"]["tasa_interes"].value;

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

    
    //Busco la tasa de cambio a Dolar con una API
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b3010265c9mshc918b87255711d0p1bc22bjsn731e0059e135',
            'X-RapidAPI-Host': 'currency-exchange.p.rapidapi.com'
        }
    };    
    fetch('https://currency-exchange.p.rapidapi.com/exchange?from=ARS&to=USD&q=1.0', options)
        .then(response => response.json())
        .then(response => {
            document.getElementById("span_dolares").innerHTML = Number(response * credito.importe_capital).toFixed(2)
            //console.log("El valor en dolares del credito es de US$ " + Number(response * credito.importe_capital).toFixed(2))
        })
        .catch(err => console.error(err));


    //Convierto el objeto en JSON y lo mando a LocalStorage
    const creditojson = JSON.stringify(credito);
    localStorage.setItem("creditoMem", creditojson);

    //Convierto el JSON en objeto y lo mando al DOM en DIV pantalla1
    //Ejecuto una funcion del objeto
    const creditoObj = JSON.parse(localStorage.getItem("creditoMem"));
    document.getElementById("pantalla1").innerHTML = creditoObj.importe_capital+' Se muestra desde LocalStorage<br />' + credito.presentacion() + '<br />El valor en dolares del credito es de US$ <span id="span_dolares"></span>';
    
    // Acumulo importes de cuotas para mostrar el total pagado en cada una de las cuotas
    function Acumular(imp){
        return acumulado += Number(imp);
    }
  
    // Inicio contador de tiempo para saber el tiempo de ejecucion del script
    let inicio = Date.now();
    
    // Muestro los datos de cada cuota
    for(i=1;i<Number(credito.numero_cuotas)+1;i++){
        credito_completo = credito_completo + ("Cuota nro "+ i +": Capital $"+ credito.capitalXcuota() +" Interes $"+ credito.interesXcuota() +" Total $"+ (credito.importeXcuota())+" Acumulado $"+ Acumular(credito.importeXcuota()).toFixed(2)+"<br/>");

        // Creo Array para buscar la cuota luego de hacer los calculos
        arr_cuotas.push("Cuota nro "+ i +": Capital $"+ credito.capitalXcuota() +" Interes $"+ credito.interesXcuota() +" Total $"+ (credito.importeXcuota()));//+" Acumulado $"+ Acumular(credito.importeXcuota()).toFixed(2));
    }

    document.getElementById("pantalla2").innerHTML = credito_completo

    // Muestro resultados, el boton de inicio nuevamente y oculto el formulario
    document.getElementById("pantalla1").hidden = false;
    document.getElementById("pantalla2").hidden = false;
    document.getElementById("footer").hidden = false;
    document.getElementById("pantalla0").hidden = true;

    // Finalizo contador de tiempo e imprimo el resultado en la consola
    let final = Date.now();
    let ejecucion =  final - inicio;
    console.log("Tiempo de ejecucion del for "+ ejecucion + " milisegundos.")
}