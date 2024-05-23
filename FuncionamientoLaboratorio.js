//hacen referencia a cada uno de los elementos en cuestion

var tablaPeriodica_Contenidos = document.getElementById('TablaPeriodica_Contenedor');

var espacioTablaPeriodica = document.getElementById('EspacioTablaPeriodica');
var tablaPeriodica = document.getElementById('TablaPeriodica');
var filasTablaPeriodica = document.getElementsByClassName('fila');
var celdasTablaPeriodica = document.getElementsByClassName('cuadrosCeldas');
var celdasElementos = document.getElementsByClassName('celdaElemento');

var contenedorContenidos = document.getElementById('ContenedorContenidos');

var divInformacion = document.getElementById('informacion');
var botonCambiaColorTP = document.getElementById('BotonCambiaColorTP');

var cambiadorColor = 4;
var guiaCategoria = document.getElementById('Guia').getElementsByTagName('li');
var Representacion = document.getElementById('Representacion');
/* diagrama */
var diagramaRepresentacion = new DiagramaHTMLElemQuimic(undefined , document.getElementById('ZonaDiagramaRepresentacion'), "ContenedorRepresentacion", 50, 20, 40)
var contenedorRepresentacion = document.getElementById('ContenedorRepresentacion');
var nucleo = contenedorRepresentacion.children[0];
var distanciaOrbitas = 40;
var contenedorOrbitas = contenedorRepresentacion.children[1];
var orbitasRepresentacion = contenedorRepresentacion.getElementsByClassName('orbita');
var contenedorElectron = contenedorRepresentacion.getElementsByClassName('contenedorElectron');
var representacionElectron = contenedorRepresentacion.getElementsByClassName('electron');

var moleculaPauling = new DiagramaMolecula("MoleculaPauling", document.getElementById('ContenedorMolecula'), 0, 0)
var zonaPauling = document.getElementById('ZonaExperimentoPauling')
var contenedorMolecula = document.getElementById('ContenedorMolecula')

/*Estas líneas de código definen variables que controlan aspectos de la tabla periódica en una página web. Incluyen 
configuraciones como la disposición horizontal o vertical de la tabla, el tamaño y margen entre las celdas, así como 
ajustes de escala y margen. Además, hay variables para gestionar la rotación, ajuste automático, visualización de órbitas 
y otros aspectos visuales y de comportamiento de la tabla. Estas variables proporcionan flexibilidad y control sobre cómo 
se muestra y se comporta la tabla periódica en la interfaz de usuario. */
var ordenHorizontalSiVerticalNo = false;

var celdaEscala = 60;
var celdaMargen = 4;
var escalaCeldaTP = celdaEscala;
var margenCeldaTP = celdaMargen;
var ajusteTabla = 0;
var numColumnasTP = 18;
var tablaEntraPantalla;
var inicioRotarIzquierdaDerecha = Math.random();
var FPS = 60;
var rotarSiNo = false;
var AjusteAutomaticoTP = false;
var visualizarOrbitas = true;

/* La función `cambiarEscalaTabla()` actualiza la escala de la tabla periódica cuando se hace clic en un botón de navegación. 

- Primero, encuentra el botón específico mediante su clase 'botonNav'.
- Incrementa la variable `ajusteTabla` en 1 y comprueba si excede un límite predefinido (en este caso, 3). Si lo hace, vuelve a 0.
- Luego, dependiendo del valor de `ajusteTabla`, actualiza el texto del botón para reflejar el ajuste de escala seleccionado: "Automático", "Original", "3/4" o "1/2".*/
function cambiarEscalaTabla()
{
    let botonCambiarEscala = document.getElementsByClassName('botonNav')[1];
    let limite = 3;
    ajusteTabla = ajusteTabla + 1
    ajusteTabla = ajusteTabla > limite? ajusteTabla = 0: ajusteTabla;

    switch (ajusteTabla)
    {
        case 0:
            botonCambiarEscala.innerHTML = "Ajustar tabla: Automático"
            break;
        case 1:
            botonCambiarEscala.innerHTML = "Ajustar tabla: Original"
            break;
        case 2:
            botonCambiarEscala.innerHTML = "Ajustar tabla: 3/4"
            break;
        case 3:
            botonCambiarEscala.innerHTML = "Ajustar tabla: 1/2"
            break;
    }
}

/*La función `AjustandoTablaPeriodica()` ajusta el tamaño y el margen de cada celda de la tabla periódica según la escala y el margen definidos previamente. Itera sobre
 todas las celdas de la tabla periódica y establece su ancho, alto y margen. Esto asegura que todas las celdas tengan las mismas dimensiones y se ajusten correctamente
  dentro de la tabla. */
function AjustandoTablaPeriodica()
{
    for (let index = 0; index < celdasTablaPeriodica.length; index++) 
    {
        celdasTablaPeriodica[index].style.width = escalaCeldaTP + 'px';
        celdasTablaPeriodica[index].style.height = escalaCeldaTP + 'px';
        celdasTablaPeriodica[index].style.margin = margenCeldaTP / 2 + 'px'
    }

    /* Ajustar el tamaño */
    for (let index = 0; index < filasTablaPeriodica.length; index++) 
    { 
        filasTablaPeriodica[index].style.width = ((escalaCeldaTP + margenCeldaTP) * numColumnasTP + 'px')
        filasTablaPeriodica[index].style.height = escalaCeldaTP + margenCeldaTP + 'px';
    }
        
    tablaPeriodica.style.width = filasTablaPeriodica[0].style.width;


    /* Ajustar a la pantalla */
    switch (ajusteTabla) {
        case 0: //ajuste automtico
            if(ordenHorizontalSiVerticalNo == true)
            {
                if(document.body.clientWidth >= (celdaEscala + celdaMargen) * numColumnasTP)
                {
                    escalaCeldaTP = celdaEscala;
                    margenCeldaTP = celdaMargen;
                }
                else if(document.body.clientWidth >= ((celdaEscala + celdaMargen) * 0.75 * numColumnasTP))
                {
                    escalaCeldaTP = celdaEscala * 0.75;
                    margenCeldaTP = celdaMargen * 0.75;
                }
                else if(document.body.clientWidth >= ((celdaEscala + celdaMargen) * 0.5 * numColumnasTP))
                {
                    escalaCeldaTP = celdaEscala * 0.5;
                    margenCeldaTP = celdaMargen * 0.5;
                }
                else
                {
                    escalaCeldaTP = celdaEscala * 0.5;
                    margenCeldaTP = celdaMargen * 0.5;
                }
            }
            else
            {
                if(document.body.clientWidth / 2 >= (celdaEscala + celdaMargen) * numColumnasTP)
                {
                    escalaCeldaTP = celdaEscala;
                    margenCeldaTP = celdaMargen;
                }
                else if(document.body.clientWidth / 2 >= ((celdaEscala + celdaMargen) * 0.75 * numColumnasTP))
                {
                    escalaCeldaTP = celdaEscala * 0.75;
                    margenCeldaTP = celdaMargen * 0.75;
                }
                else if(document.body.clientWidth / 2 >= ((celdaEscala + celdaMargen) * 0.5 * numColumnasTP))
                {
                    escalaCeldaTP = celdaEscala * 0.5;
                    margenCeldaTP = celdaMargen * 0.5;
                }
                else
                {
                    escalaCeldaTP = celdaEscala * 0.5;
                    margenCeldaTP = celdaMargen * 0.5;
                }
            }
            break;
        case 1:
            escalaCeldaTP = celdaEscala;
            margenCeldaTP = celdaMargen;
            break;
        case 2:
            escalaCeldaTP = celdaEscala * 0.75;
            margenCeldaTP = celdaMargen * 0.75;
            break;
        case 3:
            escalaCeldaTP = celdaEscala * 0.5;
            margenCeldaTP = celdaMargen * 0.5;
            break;
    }
}

function ordenarTablaP_Contenidos()//Tabla Periodica y el contenedor de contenidos
{
    let botonOrdenador = document.getElementsByClassName('botonNav')[0];

    if(ordenHorizontalSiVerticalNo == true)
    {
        ordenHorizontalSiVerticalNo = false
        tablaPeriodica_Contenidos.className = "distribucionVertical"
        tablaPeriodica_Contenidos.style.display = "grid"
        tablaPeriodica_Contenidos.style.gridTemplateColumns = "repeat(2, 1fr)"
        contenedorContenidos.style.display = "grid"
        contenedorContenidos.style.gridTemplateColumns = "repeat(1, 1fr)"
        contenedorContenidos.style.width = "100%"
        contenedorContenidos.style.overflow = "auto"
        botonOrdenador.innerHTML = "Orden: Vertical"
    }
    else
    {
        ordenHorizontalSiVerticalNo = true
        tablaPeriodica_Contenidos.className = "distribucionHorizontal"
        tablaPeriodica_Contenidos.style.gridTemplateColumns = "repeat(1, 1fr)"
        contenedorContenidos.style.display = "grid"
        contenedorContenidos.style.gridTemplateColumns = "repeat(3, 1fr)"
        contenedorContenidos.style.height = "400px"
        contenedorContenidos.style.width = "100%"
        contenedorContenidos.style.overflow = "auto"
        botonOrdenador.innerHTML = "Orden: Horizontal"
    }
}

/* La función `ordenarTablaP_ContenidosUpdate()` actualiza la disposición de la tabla periódica y su contenido en función de si la tabla se muestra en orden horizontal o vertical.

- Si la tabla se muestra horizontalmente (`ordenHorizontalSiVerticalNo` es `true`), establece la altura del elemento `espacioTablaPeriodica` para que coincida con la altura de la tabla periódica.
- Si la tabla se muestra verticalmente, establece la altura del elemento `contenedorContenidos` y del `espacioTablaPeriodica` para que coincidan con la altura de la tabla periódica. Esto asegura 
que el contenido al lado de la tabla también se ajuste correctamente.*/
function ordenarTablaP_ContenidosUpdate()
{
    if(ordenHorizontalSiVerticalNo == true)
    {
        espacioTablaPeriodica.style.height = tablaPeriodica.clientHeight + 'px'
    }
    else
    {
        contenedorContenidos.style.height = tablaPeriodica.clientHeight + 'px'
        espacioTablaPeriodica.style.height = tablaPeriodica.clientHeight + 'px'
    }
}

function ModificacionesCeldasElementos()//Añade informacion a las celdas
{
    for (let i = 0; i < celdasElementos.length; i++)
    {
        for (let j = 0; j < 3; j++)
        {
            var nuevaP = document.createElement("p");
            celdasElementos[i].appendChild(nuevaP);
        }
    }
}

function clickElementoCeldaTP(a)
{
    /* Informacion */
    let metalSiNo;
    if(EQ[a].metal == true)
    {
        metalSiNo = "sí"
    }
    else
    {
        metalSiNo = "no"
    }
    let datoCategoria;
    /* Categoria */
    switch(EQ[a].categoria)
    {
        case 0:
            datoCategoria = "alcalinos";
                break;
        case 1:
            datoCategoria = "alcalinotérreos"
                break;
        case 2:
            datoCategoria = "latánidos"
                break;
        case 3:
            datoCategoria = "actínados";
                break;
        case 4:
            datoCategoria = "metales de transición";
                break;
        case 5:
            datoCategoria = "otros metales";
                break;
        case 6:
            datoCategoria = "metaloides";
                break;
        case 7:
            datoCategoria = "otros no metales";
                break;
        case 8:
            datoCategoria = "halógenos";
                break;
        case 9:
            datoCategoria = "gases nobles";
                break;
    }

    /* Este bloque de código actualiza dinámicamente un elemento HTML (`divInformacion`) con información sobre un elemento químico específico. 
    Configura el color de fondo del elemento según el color del elemento químico, y actualiza múltiples elementos secundarios dentro de `divInformacion` 
    con datos como el símbolo, nombre, número atómico, número de protones, electrones, neutrones, masa atómica, categoría, metalicidad, electronegatividad
     y descripción del elemento químico.*/
    divInformacion.style.backgroundColor = EQ[a].colorElemento;
    divInformacion.children[0].innerHTML = EQ[a].simbolo + " - " + EQ[a].nombre + " - " + EQ[a].numeroAtomico;
    divInformacion.children[1].children[1].innerHTML = EQ[a].simbolo;
    divInformacion.children[1].children[1].innerHTML = EQ[a].protones;
    divInformacion.children[2].children[1].innerHTML = EQ[a].electrones;
    divInformacion.children[3].children[1].innerHTML = EQ[a].neutrones;
    divInformacion.children[4].children[1].innerHTML = EQ[a].masaAtomica;
    divInformacion.children[5].children[1].innerHTML = datoCategoria;
    divInformacion.children[6].children[1].innerHTML = metalSiNo;
    divInformacion.children[7].children[1].innerHTML = EQ[a].electronegatividad;
    divInformacion.children[8].children[1].innerHTML = EQ[a].descripcion;

    /* Representacion */
    inicioRotarIzquierdaDerecha = Math.random();

    diagramaRepresentacion.OtorgarDatos(a);
    diagramaRepresentacion.cambioElemento(a);
    diagramaRepresentacion.OrdenarElementos();
    diagramaRepresentacion.AjustarEscalaDiagrama();
    VisualizarOrbitas(); //estetica
}

/*
Esta función seccionGuia() configura visualmente la sección de guía en una página web. Realiza las siguientes acciones:

Itera sobre cada elemento de la lista guiaCategoria y establece su color según los colores definidos en el array colorCategoria.
Obtiene todos los elementos del formulario con el nombre infoPrincipal y selecciona el primero de ellos, marcándolo como seleccionado. */
function seccionGuia()
{
    for (let index = 0; index < guiaCategoria.length; index++)
    {
        guiaCategoria[index].style.color = colorCaregoria[index];
    }

    let opcionesFormulario = document.getElementsByName('infoPrincipal');
    
    opcionesFormulario[0].checked = true;
}
/* 
Esta función cambiarColorTP() cambia dinámicamente el color de los elementos en una tabla periódica. Realiza lo siguiente:

Incrementa el contador cambiadorColor y lo reinicia a 0 si supera el límite definido.
Itera sobre cada elemento en el array EQ que representa los elementos químicos.
Dependiendo del valor de cambiadorColor, llama a diferentes métodos de los elementos químicos para cambiar su color.
Actualiza el texto del botón botonCambiaColorTP para reflejar el tipo de color seleccionado.*/
function cambiarColorTP()
{
    let limite = 4;
    cambiadorColor++;
    cambiadorColor = cambiadorColor > limite? cambiadorColor = 0: cambiadorColor;
    
    for (let i = 0; i < EQ.length; i++)
    {
        switch (cambiadorColor)
        {
            case 0:
                EQ[i].CambiarColorElemento()
                botonCambiaColorTP.innerHTML = "Color: Elemento"
                break;
            case 1:
                EQ[i].CambiarColorCategoria()
                botonCambiaColorTP.innerHTML = "Color: Categoría"
                break;
            case 2:
                EQ[i].CambiarColorMasaAtomica()
                botonCambiaColorTP.innerHTML = "Color: Masa atómica"
                break;
            case 3:
                EQ[i].CambiarColorElectronegatividad()
                botonCambiaColorTP.innerHTML = "Color: Electronegatividad"
                break;
            case 4:
                EQ[i].CambiarColorMetal()
                botonCambiaColorTP.innerHTML = "Color: Metal"
                break;
        }
    }
}

/*
La función cambiarInfoPrincipal() se encarga de cambiar dinámicamente la información principal mostrada en la tabla periódica. Realiza lo siguiente:

Obtiene todos los elementos del formulario con el nombre 'infoPrincipal'.
Itera sobre estos elementos para encontrar cuál está marcado como seleccionado.
Según el valor seleccionado, actualiza el contenido de la primera celda de la tabla periódica (celdaTablaPeriodica) de cada elemento químico (EQ) 
con el valor correspondiente, que puede ser el número de protones, electrones, neutrones, masa atómica, electronegatividad o metalicidad. */
function cambiarInfoPrincipal()
{
    let opcionesFormulario = document.getElementsByName('infoPrincipal');
    let valor;

    for (let index = 0; index < opcionesFormulario.length; index++)
    {
        if(opcionesFormulario[index].checked == true)
        {
            valor = parseFloat(opcionesFormulario[index].value)
        }
    }

    switch (valor) {
        case 0:
            for (let index = 0; index < EQ.length; index++)
            {
                EQ[index].celdaTablaPeriodica.children[0].innerHTML = EQ[index].protones;
            }
            break;
        case 1:
            for (let index = 0; index < EQ.length; index++)
            {
                EQ[index].celdaTablaPeriodica.children[0].innerHTML = EQ[index].electrones;
            }
            break;
        case 2:
            for (let index = 0; index < EQ.length; index++)
            {
                EQ[index].celdaTablaPeriodica.children[0].innerHTML = EQ[index].neutrones;
            }
            break;
        case 3:
            for (let index = 0; index < EQ.length; index++)
            {
                EQ[index].celdaTablaPeriodica.children[0].innerHTML = EQ[index].masaAtomica;
            }
            break;
        case 4:
            for (let index = 0; index < EQ.length; index++)
            {
                EQ[index].celdaTablaPeriodica.children[0].innerHTML = EQ[index].electronegatividad;
            }
            break;
        case 5:
            for (let index = 0; index < EQ.length; index++)
            {
                EQ[index].celdaTablaPeriodica.children[0].innerHTML = EQ[index].metal;
            }
            break;
    }
}

/* La función inputBuscadorElementos() está diseñada para manejar la funcionalidad del buscador de elementos en la tabla periódica. Aquí está el resumen de lo que hace:

Obtiene el elemento de entrada de texto del buscador por su ID.
Detecta la tecla presionada, utilizando event.which || event.keyCode.
Si la tecla presionada es Enter (código 13), realiza lo siguiente:
Comprueba si se encontró un dato (inicialmente establecido como falso).
Itera sobre los elementos químicos en EQ.
Busca el nombre del elemento coincidente (mayúsculas y minúsculas).
Si se encuentra el nombre del elemento, llama a la función clickElementoCeldaTP() con el índice del elemento químico y establece datoEncontrado como verdadero.
Si no se encuentra el nombre, busca el símbolo del elemento (también con mayúsculas y minúsculas).
Si se encuentra el símbolo, realiza la misma acción.
Si aún no se ha encontrado el dato, busca por número de protones.
Si se encuentra el número de protones, realiza la misma acción.
Si no se encuentra el elemento, muestra una alerta indicando que no se encontró el elemento buscado. */
function inputBuscadorElementos(params){
    let inputBuscador = document.getElementById("BuscadorElementos")
    let tecla = event.wich || event.keyCode
    let datoEncontrado = false

    if(tecla == 13){
        if(datoEncontrado == false)
        {
            for (let j = 0; j < EQ.length; j++)//nombre
            {
                if(EQ[j].nombre == inputBuscador.value || EQ[j].nombre == inputBuscador.value.toLowerCase())
                {
                    clickElementoCeldaTP(EQ[j].indexObject)
                    datoEncontrado = true
                }
            }
        }

        if(datoEncontrado == false)
        {
            for (let j = 0; j < EQ.length; j++)//simbolo
            {
                if(EQ[j].simbolo == inputBuscador.value || EQ[j].simbolo.toLowerCase() == inputBuscador.value.toLowerCase())
                {
                    clickElementoCeldaTP(EQ[j].indexObject)
                    datoEncontrado = true
                }
            }
        }

        if(datoEncontrado == false)
        {
            for (let j = 0; j < EQ.length; j++)//numero
            {
                if(EQ[j].protones == parseFloat(inputBuscador.value))
                {
                    clickElementoCeldaTP(EQ[j].indexObject)
                    datoEncontrado = true
                }
            }
        }

        if(datoEncontrado == false){
            alert("No se encontro el elemento")
        }
    }
}


/* La función `ContenedorRepresentacionAjustes()` ajusta dinámicamente el tamaño del contenedor de representación
 para que se adapte al contenido del diagrama de representación. Calcula el tamaño mínimo necesario en función del
  tamaño del núcleo y las órbitas del diagrama, y luego compara este tamaño mínimo con el tamaño del contenedor. 
  Si el tamaño mínimo es menor que el tamaño del contenedor, el diagrama se ajusta al 100% del ancho y alto del contenedor. 
  En caso contrario, el diagrama conserva su tamaño mínimo calculado para asegurar que todo el contenido sea visible.*/
function ContenedorRepresentacionAjustes()
{
    let escalaMinimaX;
    let escalaMinimaY;
    escalaMinimaX = 0;
    escalaMinimaY = 0;

    escalaMinimaX = diagramaRepresentacion.nucleo.offsetWidth;
    escalaMinimaY = diagramaRepresentacion.nucleo.offsetWidth;

    for (let index = 0; index <= orbitasRepresentacion.length; index++)
    {
        escalaMinimaX += diagramaRepresentacion.distanciaOrbitas * 2;
    }
    for (let index = 0; index <= orbitasRepresentacion.length; index++)
    {
        escalaMinimaY += diagramaRepresentacion.distanciaOrbitas * 2;
    }

    if(escalaMinimaX < Representacion.offsetWidth)
    {
        diagramaRepresentacion.diagrama.style.width = "100%";
    }
    else
    {
        diagramaRepresentacion.diagrama.style.width = escalaMinimaX + 'px';
    }

    if(escalaMinimaY < Representacion.offsetHeight)
    {
        diagramaRepresentacion.diagrama.style.height = "100%";
    }
    else
    {
        diagramaRepresentacion.diagrama.style.height = escalaMinimaY + 'px';
    }
}

/*La función `rotandoOrbitas` se encarga de animar la rotación de las órbitas de un diagrama atómico. Primero, obtiene
 todas las órbitas del diagrama. Luego, define un arreglo llamado `segundosOrbitas` que contiene la duración de rotación 
 para cada órbita en segundos. A continuación, verifica si el diagrama debe rotar en sentido horario o antihorario según 
 el valor de `inicioRotarIzquierdaDerecha`. Luego, para cada órbita, calcula el ángulo actual de rotación, determina el 
 avance del ángulo de rotación en cada frame en función del tiempo y la velocidad de rotación deseada, y finalmente actualiza 
 el estilo de transformación CSS para rotar la órbita según el sentido de rotación. */
function rotandoOrbitas(objetoDiagrama)
{
    let diagrama = document.getElementById(objetoDiagrama.Id);
    let orbitas = diagrama.getElementsByClassName('orbita');

    let segundosOrbitas = new Array(7);
    segundosOrbitas[0] = 8;
    segundosOrbitas[1] = 6;
    segundosOrbitas[2] = 5;
    segundosOrbitas[3] = 4;
    segundosOrbitas[4] = 3;
    segundosOrbitas[5] = 2;
    segundosOrbitas[6] = 1;

    for (let i = 0; i < orbitas.length; i++)
    {
        if(orbitas[i].style.transform == "rotate(360deg)" || orbitas[i].style.transform == "rotate(-360deg)")
        {
            orbitas[i].style.transform = "rotate(0deg)";
        }
    }

    if(objetoDiagrama.rotarSiNo == true)
    {
        if(inicioRotarIzquierdaDerecha <= 0.5) //izquierda
        {
            for (let i = 0; i < orbitas.length; i++)
            {
                if(i % 2 == 0)//izquierda pares
                {
                    let anguloActual = orbitas[i].style.transform;
                    anguloActual = anguloActual.replace("rotate(", "");
                    anguloActual = anguloActual.replace("deg)", "");
                    anguloActual = parseFloat(anguloActual);
                    let avanceAngulo = 360 / segundosOrbitas[i] / FPS;
                    orbitas[i].style.transform = `rotate(${anguloActual - avanceAngulo}deg)`;
                }
                else//derecha nones
                {
                    let anguloActual = orbitas[i].style.transform;
                    anguloActual = anguloActual.replace("rotate(", "");
                    anguloActual = anguloActual.replace("deg)", "");
                    anguloActual = parseFloat(anguloActual);
                    let avanceAngulo = 360 / segundosOrbitas[i] / FPS;
                    orbitas[i].style.transform = `rotate(${anguloActual + avanceAngulo}deg)`;
                }
            }
        }
        else //derecha
        {
            for (let i = 0; i < orbitas.length; i++)
            {
                if(i % 2 == 0)//derecha pares
                {
                    let anguloActual = orbitas[i].style.transform;
                    anguloActual = anguloActual.replace("rotate(", "");
                    anguloActual = anguloActual.replace("deg)", "");
                    anguloActual = parseFloat(anguloActual);
                    let avanceAngulo = 360 / segundosOrbitas[i] / FPS;
                    orbitas[i].style.transform = `rotate(${anguloActual + avanceAngulo}deg)`;
                }
                else//izquierda nones
                {
                    let anguloActual = orbitas[i].style.transform;
                    anguloActual = anguloActual.replace("rotate(", "");
                    anguloActual = anguloActual.replace("deg)", "");
                    anguloActual = parseFloat(anguloActual);
                    let avanceAngulo = 360 / segundosOrbitas[i] / FPS;
                    orbitas[i].style.transform = `rotate(${anguloActual - avanceAngulo}deg)`;
                }
            }
        }
    }
    else
    {
        if(inicioRotarIzquierdaDerecha <= 0.5) //izquierda
        {
            for (let i = 0; i < orbitas.length; i++)
            {
                if(i % 2 == 0 && orbitas[i].style.transform != "rotate(0deg)")//izquierda pares
                {
                    let anguloActual = orbitas[i].style.transform;
                    anguloActual = anguloActual.replace("rotate(", "");
                    anguloActual = anguloActual.replace("deg)", "");
                    anguloActual = parseFloat(anguloActual);
                    let avanceAngulo = 360 / segundosOrbitas[i] / FPS;
                    orbitas[i].style.transform = `rotate(${anguloActual - avanceAngulo}deg)`;
                }
                else if(orbitas[i].style.transform != "rotate(0deg)")//derecha nones
                {
                    let anguloActual = orbitas[i].style.transform;
                    anguloActual = anguloActual.replace("rotate(", "");
                    anguloActual = anguloActual.replace("deg)", "");
                    anguloActual = parseFloat(anguloActual);
                    let avanceAngulo = 360 / segundosOrbitas[i] / FPS;
                    orbitas[i].style.transform = `rotate(${anguloActual + avanceAngulo}deg)`;
                }
            }
        }
        else //derecha
        {
            for (let i = 0; i < orbitas.length; i++)
            {
                if(i % 2 == 0 && orbitas[i].style.transform != "rotate(0deg)")//derecha pares
                {
                    let anguloActual = orbitas[i].style.transform;
                    anguloActual = anguloActual.replace("rotate(", "");
                    anguloActual = anguloActual.replace("deg)", "");
                    anguloActual = parseFloat(anguloActual);
                    let avanceAngulo = 360 / segundosOrbitas[i] / FPS;
                    orbitas[i].style.transform = `rotate(${anguloActual + avanceAngulo}deg)`;
                }
                else if(orbitas[i].style.transform != "rotate(0deg)")//izquierda nones
                {
                    let anguloActual = orbitas[i].style.transform;
                    anguloActual = anguloActual.replace("rotate(", "");
                    anguloActual = anguloActual.replace("deg)", "");
                    anguloActual = parseFloat(anguloActual);
                    let avanceAngulo = 360 / segundosOrbitas[i] / FPS;
                    orbitas[i].style.transform = `rotate(${anguloActual - avanceAngulo}deg)`;
                }
            }
        }
    }
}

/*La función `botonRotarOrbitas` controla el botón que inicia y detiene la rotación de las órbitas en un diagrama atómico. 
Si el estado de rotación (`rotarSiNo`) del objeto del diagrama es `true`, lo cambia a `false`, detiene la rotación y actualiza 
el texto del botón a "Girar". De lo contrario, si `rotarSiNo` es `false`, lo cambia a `true`, inicia la rotación y actualiza 
el texto del botón a "Detener". */
function botonRotarOrbitas(objetoDiagrama)
{
    let botonRotadorOrbitas = document.getElementById('botonRotarOrbitas')

    if(objetoDiagrama.rotarSiNo == true)
    {
        objetoDiagrama.rotarSiNo = false;
        botonRotadorOrbitas.innerHTML = "Girar"
    }
    else
    {
        objetoDiagrama.rotarSiNo = true;
        botonRotadorOrbitas.innerHTML = "Detener"
    }
    
}
/* La función `BotonVisualizadorOrbitas` maneja el botón que controla la visibilidad de las órbitas en un visualizador. Si `visualizarOrbitas` 
es `true`, cambia el texto del botón a "Orb: Invisibles" y establece el borde de las órbitas a transparente, luego cambia `visualizarOrbitas` a 
`false`. Si `visualizarOrbitas` es `false`, cambia el texto del botón a "Orb: Visibles" y establece el borde de las órbitas a blanco, luego cambia 
`visualizarOrbitas` a `true`.*/
function BotonVisualizadorOrbitas()
{
    let botonVisualizarOrb = document.getElementById('botonVisualizarOrbitas')

    if(visualizarOrbitas == true)
    {
        botonVisualizarOrb.innerHTML = "Orb: Invisibles";
        for (let index = 0; index < orbitasRepresentacion.length; index++)
        {
            orbitasRepresentacion[index].style.borderColor = "transparent";
        }
        visualizarOrbitas = false;
    }
    else
    {
        botonVisualizarOrb.innerHTML = "Orb: Visibles"
        for (let index = 0; index < orbitasRepresentacion.length; index++)
        {
            orbitasRepresentacion[index].style.borderColor = "white";
        }
        visualizarOrbitas = true;
    }
}


/* La función `VisualizarOrbitas` es utilizada para ajustar la estética y la visibilidad de las órbitas en un contexto específico. Si `visualizarOrbitas`
 es `true`, establece el borde de las órbitas a blanco, lo que las hace visibles. Si `visualizarOrbitas` es `false`, establece el borde de las órbitas a 
 transparente, lo que las hace invisibles.*/
function VisualizarOrbitas()//Esto solo es de estetica no le des tanta importancia
{
    let botonVisualizarOrb = document.getElementById('botonVisualizarOrbitas')

    if(visualizarOrbitas == true)
    {
        for (let index = 0; index < orbitasRepresentacion.length; index++)
        {
            orbitasRepresentacion[index].style.borderColor = "white";
        }
    }
    else
    {
        for (let index = 0; index < orbitasRepresentacion.length; index++)
        {
            orbitasRepresentacion[index].style.borderColor = "transparent";
        }
    }
}

/* La función `SoloHayNumeros` comprueba si una cadena contiene solo números. Recorre la cadena y verifica 
si cada carácter es un dígito del 0 al 9 o un punto decimal. Si encuentra algún carácter que no sea un número o un punto decimal, muestra una alerta y devuelve
 `false`, indicando que la cadena contiene 
caracteres no numéricos. Si todos los caracteres son números o puntos decimales, devuelve `true`, indicando que la cadena solo contiene números.*/
function SoloHayNumeros(stringDetectar)
{
    for (let i = 0; i < stringDetectar.length; i++)
    {
        if(stringDetectar[i] == "0" || stringDetectar[i] == "1" || stringDetectar[i] == "2" || stringDetectar[i] == "3" || stringDetectar[i] == "4" || stringDetectar[i] == "5"  || stringDetectar[i] == "6" || stringDetectar[i] == "7" || stringDetectar[i] == "8" || stringDetectar[i] == "9" || stringDetectar[i] == ".")
        {
            
        }
        else
        {
            alert('Solo debes agregar números, no debes agregar texto, caracteres o espacios')
            return false;
        }
    }

    return true;
}

/*La función `InputNuevaEscala` maneja la entrada de nuevas escalas para un diagrama. Recupera el valor del elemento 
de entrada especificado por su ID y verifica si se ha presionado la tecla Enter. Si se presiona Enter y el valor 
ingresado consiste solo en números, se convierte en un número flotante. Luego, según el índice proporcionado, actualiza
 la escala correspondiente en el diagrama. Si el valor es mayor que 1000, muestra una alerta advirtiendo sobre el posible 
 impacto en el rendimiento del navegador. Si no se ingresa ningún valor, no realiza ninguna acción. */
function InputNuevaEscala(idHTMLInputCabiaEscalas, index)
{
    let inputCambiaEscalas = document.getElementById(idHTMLInputCabiaEscalas)
    let valor = inputCambiaEscalas.value
    let tecla = event.wich || event.keyCode
    let indexReceptorCambios = index;
    if(tecla == 13)
    {
        if(SoloHayNumeros(valor) == true)
        {
            let nuevaEscala = parseFloat(valor);

            if(nuevaEscala <= 1000)
            {
                switch (indexReceptorCambios)
                {
                    case 0:
                        diagramaRepresentacion.escalaNucleoPx = nuevaEscala;
                        break;

                    case 1:
                        diagramaRepresentacion.escalaElectronesPx = nuevaEscala;
                        break;

                    case 2:
                        diagramaRepresentacion.distanciaOrbitas = nuevaEscala;
                        break;
                }
            }
            else if(nuevaEscala > 1000)
            {
                alert("¡ALTO AHÍ!, no quieres que explote el navegador ¿Verdad?")
            }
            else if(valor == "")
            {
                
            }
        }
    }
}

/*Las funciones `ApareceReferenciaInput` y `DesapareceReferenciaInput` se utilizan para mostrar u ocultar un letrero que sirve como referencia para un input.
 Ambas funciones toman un índice como argumento para identificar qué letrero se debe mostrar u ocultar. 

La función `AjustarEscalaPauling` ajusta la escala de un diagrama llamado "moleculaPauling" para que se ajuste dentro de un área llamada "zonaPauling". 
Si el ancho del diagrama es mayor o igual que el ancho de la zona, el contenedor del diagrama se ajusta al ancho del diagrama. Si la altura del diagrama 
es mayor que la altura de la zona, el contenedor del diagrama se ajusta a la altura del diagrama. Estos ajustes aseguran que el diagrama se ajuste 
correctamente dentro de su área designada. */
function ApareceReferenciaInput(indexSpan)
{
    let spanLetrero = document.getElementsByClassName('cartelInputRepresentacion')[indexSpan];
    spanLetrero.className = "cartelInputRepresentacion letreroVisible"
}

function DesapareceReferenciaInput(indexSpan)
{
    let spanLetrero = document.getElementsByClassName('cartelInputRepresentacion')[indexSpan];
    spanLetrero.className = "cartelInputRepresentacion letreroInvisible"
}

function AjustarEscalaPauling()
{

    if(moleculaPauling.diagramaMolecula.clientWidth >= zonaPauling.clientWidth)
    {
        contenedorMolecula.style.width = moleculaPauling.diagramaMolecula.style.width
    }
    else
    {
        contenedorMolecula.style.width = '100%'
    }

    if(moleculaPauling.diagramaMolecula.clientHeight > zonaPauling.clientHeight)
    {
        contenedorMolecula.style.height = moleculaPauling.diagramaMolecula.style.height
    }
    else
    {
        contenedorMolecula.style.height = '100%'
    }

    PosicionarRespectoAlPadre(moleculaPauling.diagramaMolecula, 0.5, 0.5, contenedorMolecula)
}

/* La función `BotonAplicarCambiosPauling` se encarga de manejar la acción del botón para aplicar cambios en un diagrama molecular según los datos ingresados en inputs.
 Esta función busca los datos ingresados en los inputs y verifica si corresponden a nombres, símbolos o números atómicos de elementos químicos. Si encuentra coincidencias,
  llama a la función `ReemplazarElementos` del objeto `moleculaPauling` para aplicar los cambios. Si no encuentra coincidencias o faltan datos en los inputs, muestra alertas
   correspondientes. Además, hay una variable `verResultadosMolecula` que se utiliza para controlar la visibilidad de los resultados del diagrama molecular.*/
function BotonAplicarCambiosPauling(activar)
{
    let inputAtomo = document.getElementsByClassName("inputAtomoPauling")
    let atomo = new Array(2)
    let recomendacionesAlerta = " Solo debes escribir un nombre, simbolo o número atómico, no pongas espacios, revisa que lo hayas escrito bien"
    let tecla = event.wich || event.keyCode

    //Nombre
    if(tecla == 13 || activar == true)
    {
        for (let i = 0; i < inputAtomo.length; i++)
        {
            let datoEncontrado = false;

            if(datoEncontrado == false)
            {
                for (let j = 0; j < EQ.length; j++)//nombre
                {
                    if(EQ[j].nombre == inputAtomo[i].value || EQ[j].nombre == inputAtomo[i].value.toLowerCase())
                    {
                        atomo[i] = EQ[j].indexObject
                        datoEncontrado = true
                    }
                }
            }

            if(datoEncontrado == false)
            {
                for (let j = 0; j < EQ.length; j++)//simbolo
                {
                    if(EQ[j].simbolo == inputAtomo[i].value || EQ[j].simbolo.toLowerCase() == inputAtomo[i].value.toLowerCase())
                    {
                        atomo[i] = EQ[j].indexObject
                        datoEncontrado = true
                    }
                }
            }

            if(datoEncontrado == false)
            {
                for (let j = 0; j < EQ.length; j++)//numero
                {
                    if(EQ[j].protones == parseFloat(inputAtomo[i].value))
                    {
                        atomo[i] = EQ[j].indexObject
                        datoEncontrado = true
                    }
                }
            }
        }

        if(atomo[0] != undefined && atomo[1] != undefined)
        {
            moleculaPauling.ReemplazarElementos(atomo[0], atomo[1])
        }
        else if(inputAtomo[0].value == "" || inputAtomo[1].value == "")
        {
            alert("Te falto rellenar algo")
        }
        else
        {
            if(atomo[0] == undefined && atomo[1] == undefined)
            {
                alert(`No se encontró a "${inputAtomo[0].value}" ni a "${inputAtomo[1].value}". ` + recomendacionesAlerta)
            }
            else if(atomo[0] == undefined)
            {
                alert(`No se encontró a "${inputAtomo[0].value}". ` + recomendacionesAlerta)
            }
            else
            {
                alert(`No se encontró a "${inputAtomo[1].value}". ` + recomendacionesAlerta)
            }
        }
    }
}

var verResultadosMolecula = false

/*La función `VisualizarResultadosMolecula` controla la visibilidad de los resultados de un diagrama molecular en la interfaz de usuario. 
Cuando se activa, cambia el ancho de la zona donde se muestra el diagrama molecular para hacer espacio para los resultados, y muestra los
 resultados haciendo visible el elemento HTML correspondiente. Además, cambia el texto del botón asociado para indicar que los resultados
  están visibles. Cuando se desactiva, oculta los resultados y restablece el ancho de la zona a su valor original, y cambia el texto del
   botón para indicar que los resultados están ocultos. La variable `verResultadosMolecula` se utiliza para controlar el estado de visibilidad 
   de los resultados. */
function VisualizarResultadosMolecula()
{
    let resultados = document.getElementById("ResultadosPauling")
    let botonVerResultados = document.getElementById("BotonVerResultados")

    verResultadosMolecula = verResultadosMolecula == true? verResultadosMolecula = false: verResultadosMolecula = true

    if(verResultadosMolecula == true)
    {
        zonaPauling.style.width = "75%"
        resultados.style.visibility = "visible"
        botonVerResultados.innerHTML = "Resultados: O"
    }
    else
    {
        zonaPauling.style.width = "100%"
        resultados.style.visibility = "hidden"
        botonVerResultados.innerHTML = "Resultados: X"
    }
}

/*La función `InformacionResultadosPauling` muestra información sobre los resultados de un análisis molecular en la interfaz de usuario.
 Recibe como parámetros la molécula analizada y un indicador booleano para activar la función. Detecta la pulsación de la tecla "Enter" y
  asigna los datos de la molécula a los elementos HTML correspondientes, como la formulación general y el tipo de enlace (iónico, covalente o metálico). */
function InformacionResultadosPauling(molecula, activar)
{
    let tecla
    try{
        tecla = event.wich || event.keyCode
    } catch (error)
    {
        
    }

    let resultados = document.getElementById("ResultadosPauling")
    let datosRellenar = resultados.getElementsByClassName("datoMolecula")
    /* Asiganando datos */
    if(tecla == 13 || activar == true)
    {
        datosRellenar[0].innerHTML = molecula.formulacionGeneral

        switch (molecula.tipoEnlace)
        {
            case 0:
                datosRellenar[1].innerHTML = "iónico"
                break;
            case 1:
                datosRellenar[1].innerHTML = "covalente"
                break;
            case 2:
                datosRellenar[1].innerHTML = "metalico"
                break;
        }
    }
}

/*La función `Start` realiza varias acciones al iniciar la aplicación:

1. Ordena el contenido de la tabla periódica.
2. Realiza modificaciones en las celdas de elementos.
3. Inicia cada elemento químico (EQ) con su configuración inicial.
4. Configura la sección de guía.
5. Cambia el color de la tabla periódica.
6. Muestra información sobre los resultados de la simulación molecular de Pauling. */
/* */

function Start()
{
    ordenarTablaP_Contenidos()

    ModificacionesCeldasElementos()

    for (let i = 0; i < EQ.length; i++) 
    {
        EQ[i].Inicio();
    }

    seccionGuia();

    cambiarColorTP();

    /* Simulaciones */
    InformacionResultadosPauling(moleculaPauling, true)
}

/*La función `StartUpdate` se encarga de actualizar diversos elementos de la aplicación:

1. Ordena y ajusta el contenido de la tabla periódica para que se adapte correctamente al espacio disponible.
2. Aplica estilos y tamaños de fuente a las celdas de elementos.
3. Establece el estilo del diagrama de representación.
4. Actualiza la información principal mostrada en la tabla periódica.
5. Realiza la rotación de las órbitas en el diagrama de representación.
6. Ajusta el contenedor de la representación molecular de Pauling.
7. Realiza ajustes específicos para las simulaciones. */
function StartUpdate()
{

    ordenarTablaP_ContenidosUpdate()

    AjustandoTablaPeriodica();

    /* Border Radius TP */
    tablaPeriodica.style.borderRadius = escalaCeldaTP * 0.20 + 'px'

    /* Contenido de la celda */0
    for (let i = 0; i < celdasElementos.length; i++)
    {
        celdasElementos[i].children[0].style.fontSize = escalaCeldaTP * 0.2 + 'px';
        celdasElementos[i].children[1].style.fontSize = escalaCeldaTP * 0.4 + 'px';
        celdasElementos[i].children[2].style.fontSize = escalaCeldaTP * 0.2 + 'px';
    }

    diagramaRepresentacion.EstiloDiagrama();

    cambiarInfoPrincipal()

    rotandoOrbitas(diagramaRepresentacion);

    ContenedorRepresentacionAjustes();

    /* Simulaciones */
    AjustarEscalaPauling()
}

/* La función `StartUpdateBajo` se encarga de ordenar los elementos en el diagrama de representación. Esto asegura que los elementos
 se muestren correctamente y estén organizados de acuerdo con ciertos criterios definidos en la lógica de la aplicación.*/
function StartUpdateBajo()
{
    diagramaRepresentacion.OrdenarElementos();
}