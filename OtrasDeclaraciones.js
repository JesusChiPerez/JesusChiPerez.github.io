// se encarga de posicionar un elemento HTML con respecto a su elemento padre, 
//utilizando coordenadas proporcionales en lugar de valores absolutos
function PosicionarRespectoAlPadre(elemento, posX, posY, padre)
{
    if(posX != undefined)
    {
        elemento.style.left = (padre.clientWidth * posX) - (elemento.offsetWidth / 2) + 'px';
    }
    if(posY != undefined)
    {
        elemento.style.top = (padre.clientHeight * posY) - (elemento.offsetHeight / 2) + 'px';
    }
}

class DiagramaHTMLElemQuimic
{
    constructor(indexElemQuimic, padreDiagrama ,idHTML, escalaNucleoPx, escalaElectronesPx, margenOrbitasPx, colorElectron)
    {
        /* Datos heredados */
        this.protones
        this.nombre;
        this.simbolo;
        this.protones;
        this.electrones;
        this.neutrones;
        this.numeroAtomico;
        this.masaAtomica;
        this.celdaTablaPeriodica;
        this.categoria;
        
        /*0 = Alcalinos
        1 = Alcalinotérreos
        2 = Latánidos
        3 = Actínidos
        4 = Metales de transición
        5 = Otros metales
        6 = Metaloides
        7 = Otros no metales
        8 = Halógenos
        9 = Gases nobles*/
        this.metal;
        this.colorElemento;
        this.electronegatividad;
        this.descripcion;

        /*----------------Datos propios-------------*/
        this.distanciaOrbitas = margenOrbitasPx;
        this.Id = idHTML;

        /* datos Estilo */
        this.escalaNucleoPx = escalaNucleoPx
        this.escalaElectronesPx = escalaElectronesPx

        /* Datos extras */
        this.inicioRotarIzquierdaDerecha = Math.random();
        this.rotarSiNo = true;
        this.FPS = 60;
        this.animacion;
//El código verifica si una variable está indefinida y, en caso afirmativo,
// inicializa propiedades de un objeto con referencias a elementos HTML en el documento.
        if(indexElemQuimic == undefined)
        {
            this.crear(padreDiagrama, idHTML);
            this.diagrama = document.getElementById(idHTML);
            this.nucleo = this.diagrama.children[0];
            this.contenedorOrbitas = this.diagrama.children[1];
            this.orbitas = this.contenedorOrbitas.children;
            this.contenedorElectron = this.diagrama.getElementsByClassName('contenedorElectron');
            this.electron = this.diagrama.getElementsByClassName('electron');
        }
//En caso contrario, realiza inicializaciones similares y ejecuta varias operaciones adicionales,
// como asignar datos, cambiar elementos, aplicar estilos, ajustar la escala y ordenar elementos.
        else
        {
            this.crear(padreDiagrama, idHTML);
            this.diagrama = document.getElementById(idHTML);
            this.nucleo = this.diagrama.children[0];
            this.contenedorOrbitas = this.diagrama.children[1];
            this.orbitas = this.contenedorOrbitas.children;
            this.contenedorElectron = this.diagrama.getElementsByClassName('contenedorElectron');
            this.electron = this.diagrama.getElementsByClassName('electron');
            this.OtorgarDatos(indexElemQuimic);
            this.cambioElemento(indexElemQuimic);
            this.EstiloDiagrama(colorElectron);
            this.AjustarEscalaDiagrama();
            this.OrdenarElementos();
        }
    }
//La función OtorgarDatos(indexEQ) asigna valores a las propiedades de un objeto basándose en un índice dado indexEQ, 
//utilizando datos almacenados en un arreglo llamado EQ.
    OtorgarDatos(indexEQ)
    {
        this.nombre = EQ[indexEQ].nombre;
        this.simbolo = EQ[indexEQ].simbolo;
        this.protones = EQ[indexEQ].protones;
        this.electrones = EQ[indexEQ].electrones;
        this.neutrones = EQ[indexEQ].neutrones;
        this.numeroAtomico = EQ[indexEQ].numeroAtomico;
        this.masaAtomica = EQ[indexEQ].masaAtomica;
        this.celdaTablaPeriodica = EQ[indexEQ].celdaTablaPeriodica;
        this.categoria = EQ[indexEQ].categoria;
        this.metal = EQ[indexEQ].metal;
        this.colorElemento = EQ[indexEQ].colorElemento;
        this.electronegatividad = EQ[indexEQ].electronegatividad;
        this.descripcion = EQ[indexEQ].descripcion;
    }
//La función crear(padreDiagrama, idHTML) crea elementos HTML en el documento. Estos elementos forman una 
//representación visual con un contenedor principal identificado por un ID y dos subcontenedores para el núcleo 
//y las órbitas.
    crear(padreDiagrama ,idHTML)
    {
        let representacionDiagrama = document.createElement('div')
        representacionDiagrama.id = idHTML
        padreDiagrama.appendChild(representacionDiagrama)

        let diagramaNucleo = document.createElement('div')
        diagramaNucleo.className = "nucleo"

        let diagramaContenedorOrbitas = document.createElement('div')
        diagramaContenedorOrbitas.className = "contenedorOrbitas"

        representacionDiagrama.appendChild(diagramaNucleo);
        representacionDiagrama.appendChild(diagramaContenedorOrbitas)
    }
/*
La función cambioElemento(a) actualiza la representación visual de un elemento químico en la página web:

Genera una dirección inicial de rotación aleatoria.
Cambia el color de fondo del núcleo al color del elemento.
Elimina las órbitas anteriores.
Crea nuevas órbitas y electrones según la información proporcionada.
Reinicia la rotación de las órbitas.
Actualiza el contenido del núcleo con el símbolo del elemento químico correspondiente. */
    cambioElemento(a)
    {
        this.inicioRotarIzquierdaDerecha = Math.random();

        this.nucleo.style.backgroundColor = this.colorElemento;

        for (let index = this.contenedorOrbitas.childElementCount - 1; index >= 0; index--)
        {
            this.contenedorOrbitas.removeChild(this.orbitas[index]);
        }

        for (let i = 0; i < this.electrones.length; i++)
        {
            let orbita = document.createElement('div');
            orbita.className = "orbita";
            this.contenedorOrbitas.appendChild(orbita);
            for (let j = 0; j < this.electrones[i]; j++)
            {
                let electron = document.createElement('div');
                electron.className = "electron";
                let contenedorElectron = document.createElement('div')
                contenedorElectron.className = 'contenedorElectron'
                orbita.appendChild(contenedorElectron);
                contenedorElectron.appendChild(electron);
            }
        }

        for (let i = 0; i < this.orbitas.length; i++)
        {
            this.orbitas[i].style.transform = "rotate(0deg)";
        }

        this.nucleo.innerHTML = EQ[a].simbolo;
    }
/*La función EstiloDiagrama(colorElectron) establece el estilo visual del diagrama químico:

Ajusta el tamaño del núcleo y de los electrones según las escalas proporcionadas.
Establece el tamaño de la fuente y los rellenos del núcleo para centrar su contenido.
Asigna el color de fondo proporcionado a todos los electrones en el diagrama. */
    EstiloDiagrama(colorElectron)
    {
        this.nucleo = this.diagrama.children[0];

        this.nucleo.style.width = this.escalaNucleoPx + 'px'
        this.nucleo.style.height = this.escalaNucleoPx + 'px'

        for (let index = 0; index < this.electron.length; index++)
        {
            this.electron[index].style.width = this.escalaElectronesPx + 'px'
            this.electron[index].style.height = this.escalaElectronesPx + 'px'
        }

        this.nucleo.style.fontSize = this.nucleo.clientHeight * 0.5 + 'px';
        this.nucleo.style.paddingTop = this.nucleo.clientHeight * 0.25 + 'px';
        this.nucleo.style.paddingBottom = this.nucleo.clientHeight * 0.25 + 'px';

        for (let i = 0; i < this.electron.length; i++)
        {
            this.electron[i].style.backgroundColor = colorElectron;
        }
    }
/*La función AjustarEscalaDiagrama() ajusta la escala del diagrama químico para asegurar que todos los componentes sean visibles:

Calcula la escala mínima necesaria en las direcciones X e Y considerando el ancho y alto del núcleo y las distancias entre las órbitas.
Ajusta el ancho y alto del diagrama para que quepan todos los elementos, incluyendo el núcleo, las órbitas y los electrones. */
    AjustarEscalaDiagrama()
    {
        let escalaMinimaX;
        let escalaMinimaY;
        escalaMinimaX = 0;
        escalaMinimaY = 0;

        escalaMinimaX = this.nucleo.offsetWidth;
        escalaMinimaY = this.nucleo.offsetHeight;

        for (let index = 0; index < this.orbitas.length; index++)
        {
            escalaMinimaX += this.distanciaOrbitas * 2;
        }
        for (let index = 0; index < this.orbitas.length; index++)
        {
            escalaMinimaY += this.distanciaOrbitas * 2;
        }

        this.diagrama.style.width = escalaMinimaX + this.escalaElectronesPx + 'px'
        this.diagrama.style.height = escalaMinimaY + this.escalaElectronesPx + 'px'
    }
/*
La función OrdenarElementos() organiza visualmente los componentes del diagrama químico:

Centra el núcleo en el diagrama.
Para cada órbita:
Ajusta su ancho y alto para que aumenten proporcionalmente con cada órbita.
Centra la órbita en el diagrama. */
    OrdenarElementos()
    {
        for (let h = 0; h < 2; h++)
        {
            PosicionarRespectoAlPadre(this.nucleo, 0.5, 0.5, this.diagrama);

            for (let index = 0; index < this.orbitas.length; index++)
            {
                this.orbitas[index].style.width = this.nucleo.clientWidth + ((index + 1) * this.distanciaOrbitas * 2) + 'px';
                this.orbitas[index].style.height = this.nucleo.clientHeight + ((index + 1) * this.distanciaOrbitas * 2) + 'px';
                PosicionarRespectoAlPadre(this.orbitas[index], 0.5, 0.5, this.diagrama);
            }
/*
Este fragmento de código ajusta la posición y el tamaño de los electrones dentro de cada órbita del diagrama químico:

Itera sobre cada órbita.
Dentro de cada órbita, itera sobre cada electrón.
Centra cada electrón dentro de su órbita.
Establece el ancho y alto de cada electrón para que coincida con el de su órbita.
Centra verticalmente cada electrón dentro de su órbita. */
            for (let i = 0; i < this.orbitas.length; i++)
            {
                for (let j = 0; j < this.orbitas[i].childElementCount; j++)
                {
                    PosicionarRespectoAlPadre(this.orbitas[i].children[j], 0.5, 0.5, this.orbitas[i]);

                    this.orbitas[i].children[j].style.width = this.orbitas[i].style.width;
                    this.orbitas[i].children[j].style.height = this.orbitas[i].style.height;

                    PosicionarRespectoAlPadre(this.orbitas[i].children[j].children[0], 0.5, 0, this.orbitas[i].children[j])
                }
            }
/*Este bloque de código ajusta el ángulo de rotación de los electrones dentro de cada órbita del diagrama químico:

Calcula la distancia entre cada ángulo basada en el número de electrones en la órbita.
Si la cantidad de electrones en la órbita es par, establece un ángulo inicial de -90 grados.
Itera sobre cada electrón en la órbita y aplica una rotación igual entre ellos utilizando el ángulo inicial y la distancia entre ángulos calculada anteriormente. */
            for (let i = 0; i < this.orbitas.length; i++)
            {
                let distanciaAngulos = 360 / this.orbitas[i].childElementCount;
                let inicioAngulo;
                if(this.orbitas[i].childElementCount % 2 == 0)
                {
                    inicioAngulo = -90;

                    for (let j = 0; j < this.orbitas[i].childElementCount; j++)
                    {
                        this.orbitas[i].children[j].style.transform = `rotate(${inicioAngulo}deg)`;
                        inicioAngulo += distanciaAngulos;
                    }
                }
/*Este bloque de código complementa el bloque anterior para el caso en que la cantidad de electrones en la órbita sea impar:

1. Establece un ángulo inicial de 0 grados.
2. Itera sobre cada electrón en la órbita y aplica una rotación igual entre ellos utilizando el ángulo inicial y la distancia entre ángulos calculada anteriormente. */
                else
                {
                    inicioAngulo = 0;

                    for (let j = 0; j < this.orbitas[i].childElementCount; j++)
                    {
                        this.orbitas[i].children[j].style.transform = `rotate(${inicioAngulo}deg)`;
                        inicioAngulo += distanciaAngulos;
                    }
                }
            }
        }
    }
}
/*
Este constructor crea un objeto para representar una molécula:

Crea y configura la estructura de la molécula en el documento HTML.
Establece propiedades relacionadas con la escala y distancia de los componentes del diagrama.
Crea objetos para representar los átomos que componen la molécula.
Ajusta la escala de la molécula para asegurar su visibilidad.
Aplica estilos visuales a la molécula.
Define propiedades para almacenar datos específicos de la molécula, como su formulación general y tipo de enlace.
Inicializa estos datos llamando al método DefiniendoDatos(). */
class DiagramaMolecula
{
    constructor(idMolecula, padreMolecula, indexAtomo0, indexAtomo1)
    {
        /* diagrama */
        this.Crear(idMolecula, padreMolecula)
        this.diagramaMolecula = document.getElementById(idMolecula)
        this.escalaNucleoPx = 50
        this.escalaElectronesPx = 20
        this.distanciaOrbitas = 40
        this.objetoAtomo = new Array(2)
        this.CambioElementos(indexAtomo0, indexAtomo1)
        this.AjustarEscalaMolecula();
        this.EstiloMolecula();

        /* Datos molecula */
        this.formulacionGeneral;
        this.tipoEnlace;
        this.DefiniendoDatos();
    }
/* La función Crear(idMolecula, padreMolecula) se encarga de crear un elemento <div> en el documento HTML para representar una molécula. Aquí está lo que hace:

Utiliza document.createElement('div') para crear un nuevo elemento <div>.
Le asigna el ID especificado por idMolecula.
Agrega este elemento como hijo del elemento padre especificado por padreMolecula.*/
    Crear(idMolecula, padreMolecula)
    {
        let molecula = document.createElement('div')
        molecula.id = idMolecula
        padreMolecula.appendChild(molecula)
    }
/*La función `CambioElementos(indexAtomo0, indexAtomo1)` crea y configura dos objetos `DiagramaHTMLElemQuimic` para representar dos átomos de una molécula. Cada objeto se configura con parámetros específicos, como el índice del átomo, el elemento padre donde se mostrará, un ID único, escalas de tamaño
 y distancia, y un color particular. Estos objetos se almacenan en un arreglo para su posterior uso. */
    CambioElementos(indexAtomo0, indexAtomo1)
    {
        this.objetoAtomo[0] = new DiagramaHTMLElemQuimic(indexAtomo0, this.diagramaMolecula, "diagrama0", 50, 20, 40, "red");
        this.objetoAtomo[1] = new DiagramaHTMLElemQuimic(indexAtomo1, this.diagramaMolecula, "diagrama1", this.escalaNucleoPx, this.escalaElectronesPx, this.distanciaOrbitas, "blue")
    }
/* La función `AjustarEscalaMolecula()` ajusta el tamaño del contenedor de la molécula para que quepan los diagramas de los átomos. Calcula el ancho sumando los anchos de los diagramas de los átomos y ajusta la altura
 al diagrama más alto entre los dos átomos.*/
    AjustarEscalaMolecula()
    {
        this.diagramaMolecula.style.width = this.objetoAtomo[0].diagrama.clientWidth + this.objetoAtomo[1].diagrama.clientWidth - this.objetoAtomo[0].escalaElectronesPx +'px';

        if(this.objetoAtomo[0].diagrama.clientHeight >= this.objetoAtomo[1].diagrama.clientHeight)
        {
            this.diagramaMolecula.style.height = this.objetoAtomo[0].diagrama.clientHeight + 'px'
        }
        else
        {
            this.diagramaMolecula.style.height = this.objetoAtomo[1].diagrama.clientHeight + 'px'
        }
    }
/*La función `EstiloMolecula()` aplica estilos a los diagramas de los átomos dentro del contenedor de la molécula:

1. Establece la posición de los diagramas de los átomos como "absolute".
2. Posiciona los diagramas de los átomos horizontalmente centrados dentro del contenedor de la molécula.
3. Alinea el primer diagrama del átomo a la izquierda (`left: 0%`) y el segundo diagrama del átomo a la derecha (`right: 0%`). */
    EstiloMolecula()
    {
        this.objetoAtomo[0].diagrama.style.position = "absolute"
        this.objetoAtomo[1].diagrama.style.position = "absolute"

        PosicionarRespectoAlPadre(this.objetoAtomo[0].diagrama, undefined, 0.5, this.diagramaMolecula)
        PosicionarRespectoAlPadre(this.objetoAtomo[1].diagrama, undefined, 0.5, this.diagramaMolecula)

        this.objetoAtomo[0].diagrama.style.left = '0%'
        this.objetoAtomo[1].diagrama.style.right = '0%'
    }
/* La función `DefiniendoDatos()` determina ciertos datos sobre la molécula basándose en las propiedades de los átomos que la componen:

1. Si los símbolos de los átomos son iguales, asigna la formulación general con el primer símbolo seguido de "2".
2. Si el electronegatividad del primer átomo es menor que la del segundo, asigna la formulación general con los símbolos en el orden original.
3. Si el electronegatividad del primer átomo es mayor que la del segundo, asigna la formulación general con los símbolos intercambiados.
4. Si el número de protones del primer átomo es menor que el del segundo, asigna la formulación general con los símbolos en el orden original.
5. En cualquier otro caso, asigna la formulación general con los símbolos intercambiados.
6. Si los átomos son de diferentes tipos (metal y no metal), asigna el tipo de enlace como ionico (0).
7. Si ambos átomos son no metales, asigna el tipo de enlace como covalente (1).
8. Si ambos átomos son metales, asigna el tipo de enlace como metálico (2).*/ 
    DefiniendoDatos()
    {
        if (this.objetoAtomo[0].simbolo == this.objetoAtomo[1].simbolo)
        {
            this.formulacionGeneral = this.objetoAtomo[0].simbolo + 2
            console.log("a")
        }
        else if(this.objetoAtomo[0].electronegatividad < this.objetoAtomo[1].electronegatividad)
        {
            this.formulacionGeneral = this.objetoAtomo[0].simbolo + this.objetoAtomo[1].simbolo
            console.log("b")
        }
        else if(this.objetoAtomo[0].electronegatividad > this.objetoAtomo[1].electronegatividad)
        {
            this.formulacionGeneral = this.objetoAtomo[1].simbolo + this.objetoAtomo[0].simbolo
            console.log("c")
        }
        else if (this.objetoAtomo[0].protones < this.objetoAtomo[1].protones)
        {
            this.formulacionGeneral = this.objetoAtomo[0].simbolo + this.objetoAtomo[1].simbolo
            console.log("d")
        }
        else
        {
            this.formulacionGeneral = this.objetoAtomo[1].simbolo + this.objetoAtomo[0].simbolo
            console.log("e")
        }

        if(this.objetoAtomo[0].metal != this.objetoAtomo[1].metal)
        {
            this.tipoEnlace = 0 //ionico
        }
        else if(this.objetoAtomo[0].metal == false && this.objetoAtomo[1].metal == false)
        {
            this.tipoEnlace = 1 //covalente
        }
        else if(this.objetoAtomo[0].metal == true && this.objetoAtomo[1].metal == true)
        {
            this.tipoEnlace = 2 //metalico
        }
    }
/*La función `ReemplazarElementos(indexAtomo0, indexAtomo1)` reemplaza los átomos de la molécula con nuevos átomos 
especificados por los índices `indexAtomo0` y `indexAtomo1`. Actualiza la representación visual de la molécula, 
ajusta su escala y aplica estilos, además de actualizar los datos moleculares relevantes. */
    ReemplazarElementos(indexAtomo0, indexAtomo1)
    {
        this.CambioElementos(indexAtomo0, indexAtomo1)
        this.AjustarEscalaMolecula()
        this.EstiloMolecula()

        /*Datos molecula*/
        this.DefiniendoDatos()
    }
}