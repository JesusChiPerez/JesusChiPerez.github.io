/* Declaraciones Extra 
Esta función ConversarColoresHTML_RGB(colorHtml) convierte un color en formato HTML hexadecimal en un arreglo RGB:

Remueve el símbolo "#" del inicio del color HTML.
Define un arreglo notacionHTML que mapea los caracteres hexadecimales a sus valores numéricos equivalentes.
Divide el color HTML en tres partes correspondientes a los componentes rojo, verde y azul.
Retorna un arreglo rgb que contiene los valores de los componentes rojo, verde y azul del color.*/
function ConversarColoresHTML_RGB(colorHtml)
{
    let htmlColor = colorHtml
    htmlColor = htmlColor.replace("#", "")
    let notacionHTML = new Array()
    notacionHTML[0] = "0"
    notacionHTML[1] = "1"
    notacionHTML[2] = "2"
    notacionHTML[3] = "3"
    notacionHTML[4] = "4"
    notacionHTML[5] = "5"
    notacionHTML[6] = "6"
    notacionHTML[7] = "7"
    notacionHTML[8] = "8"
    notacionHTML[9] = "9"
    notacionHTML[10] = "a"
    notacionHTML[11] = "b"
    notacionHTML[12] = "c"
    notacionHTML[13] = "d"
    notacionHTML[14] = "e"
    notacionHTML[15] = "f"
    let rgb = new Array();
    rgb[0] = htmlColor.slice(0, -4);
    rgb[1] = htmlColor.slice(2, -2);
    rgb[2] = htmlColor.slice(4);
/*Este bloque de código realiza la conversión de los componentes del color de formato hexadecimal a decimal:

Itera sobre los tres componentes de color (rojo, verde y azul).
Para cada componente, busca el valor correspondiente en el arreglo notacionHTML y calcula el valor decimal asociado al par de caracteres hexadecimales.
Retorna un nuevo arreglo que contiene los valores decimales de los componentes rojo, verde y azul del color. */
    for(let i = 0; i < rgb.length; i++)
    {
        let a;
        let b;
        for (let j = 0; j < notacionHTML.length; j++)
        {
            if(rgb[i][0] == notacionHTML[j])
            {
                a = j
            }

            if(rgb[i][1] == notacionHTML[j])
            {
                b = j
            }
        }
        rgb[i] = (16 * a) + b
    }

    return new Array(rgb[0], rgb[1], rgb[2])
}

//Variables del Contenedor
var colorCaregoria = new Array(10);
colorCaregoria[0] = "red";
colorCaregoria[1] = "blue";
colorCaregoria[2] = "pink";
colorCaregoria[3] = "violet";
colorCaregoria[4] = "aquamarine";
colorCaregoria[5] = "orange";
colorCaregoria[6] = "coral";
colorCaregoria[7] = "lime";
colorCaregoria[8] = "yellow";                                                                                                                                                              
colorCaregoria[9] = "cyan";

//Clase para definir los elementos quimicos
class ElementoQuimico
{
    constructor(nombre, simbolo, numProtones, numElectrones, numNeutrones, masaAtomica, categoria, metal, colorElemento, electronegatividad)
    {
        /*No parametro*/this.indexObject = numProtones - 1;
        this.nombre = nombre;
        this.simbolo = simbolo;
        this.protones = numProtones;
        this.electrones = numElectrones;
        this.neutrones = numNeutrones;
        /*No parametro*/this.numeroAtomico = this.protones;
        this.masaAtomica = masaAtomica;
        /*No parametro*/this.celdaTablaPeriodica = document.getElementById("celda" + this.simbolo);
        this.categoria = categoria;
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
        this.metal = metal;
        this.colorElemento = colorElemento;
        this.electronegatividad = electronegatividad;
        /*No parametro*/this.descripcion;
    }
    /*
La función Inicio() inicializa los datos de un elemento de la tabla periódica en su representación HTML:

Asigna el número atómico al primer hijo del elemento de la tabla periódica.
Asigna el símbolo al segundo hijo del elemento de la tabla periódica.
Asigna el nombre al tercer hijo del elemento de la tabla periódica.
Configura un evento onclick para el elemento de la tabla periódica, que llama a la función clickElementoCeldaTP() con el número de protones menos uno como 
argumento. Esto podría ser para proporcionar la información del elemento cuando se hace clic en él en la tabla periódica. */
    Inicio()
    {
        this.celdaTablaPeriodica.children[0].innerHTML = this.numeroAtomico;
        this.celdaTablaPeriodica.children[1].innerHTML = this.simbolo;
        this.celdaTablaPeriodica.children[2].innerHTML = this.nombre;
        this.celdaTablaPeriodica.setAttribute("onclick", `clickElementoCeldaTP(${this.protones - 1})`);
    }
    OnLoad()
    {

    }

    BrilloOscuroColorElemento()
    {
        for (let i = 0; i < 3; i++)
        {
            if(ConversarColoresHTML_RGB(this.colorElemento)[i] > 127)
            {
                return true;
            }
        }
        
        return false;
    }
//cambiar el color del elemento
    CambiarColorElemento()
    {
        this.celdaTablaPeriodica.style.backgroundColor = this.colorElemento;
        this.celdaTablaPeriodica.style.color = "black"
        
        if(this.BrilloOscuroColorElemento() == true)
        {
            this.celdaTablaPeriodica.style.color = "black"
            this.celdaTablaPeriodica.style.borderColor = "white"
        }
        else
        {
            this.celdaTablaPeriodica.style.color = "white"
            this.celdaTablaPeriodica.style.borderColor = "black"
        }
    }
//cambiar color de la categoria
    CambiarColorCategoria()
    {
        this.celdaTablaPeriodica.style.backgroundColor = colorCaregoria[this.categoria];
        this.celdaTablaPeriodica.style.color = "black"
    }

    CambiarColorMasaAtomica()
    {
        let masaAtomicaMaxima = 295
        let masaAtomicaFraccion = this.masaAtomica / masaAtomicaMaxima
        let colorMaximo = 510
        let intensidadColor = masaAtomicaFraccion * colorMaximo

        if(intensidadColor <= 255) //claro
        {
            this.celdaTablaPeriodica.style.backgroundColor = `rgb(255, ${255 - intensidadColor}, ${255 - intensidadColor})`
        }
        else if(intensidadColor > 255)
        {
            this.celdaTablaPeriodica.style.backgroundColor = `rgb(${255 - (intensidadColor - 255)}, 0, 0)`
        }

        if(intensidadColor <= 319)
        {
            this.celdaTablaPeriodica.style.color = "black"
            this.celdaTablaPeriodica.style.borderColor = "white"
        }
        else
        {
            this.celdaTablaPeriodica.style.color = "white"
            this.celdaTablaPeriodica.style.borderColor = "black"
        }
    }
//cambiar color de la electronegatividas
    CambiarColorElectronegatividad()
    {
        let electronegatividadMaxima = 4.00;
        let electronegatividadFraccion = this.electronegatividad / electronegatividadMaxima;
        let colorMaximo = 510
        let intensidadColor = electronegatividadFraccion * colorMaximo;

        if(intensidadColor <= 255) //claro
        {
            this.celdaTablaPeriodica.style.background = `rgb(${255 - intensidadColor}, ${255 - intensidadColor}, 255)`
        }
        else if(intensidadColor > 255)
        {
            this.celdaTablaPeriodica.style.background = `rgb(0, 0, ${255 - (intensidadColor - 255)})`
        }

        if(intensidadColor <= 319)
        {
            this.celdaTablaPeriodica.style.color = "black"
            this.celdaTablaPeriodica.style.borderColor = "white"
        }
        else
        {
            this.celdaTablaPeriodica.style.color = "white"
            this.celdaTablaPeriodica.style.borderColor = "black"
        }
    }
//cambiar color del metal
    CambiarColorMetal()
    {
        if(this.metal == true)
        {
            this.celdaTablaPeriodica.style.backgroundColor = "#000000"
            this.celdaTablaPeriodica.style.color = "white"
            this.celdaTablaPeriodica.style.borderColor = "black"
        }
        else
        {
            this.celdaTablaPeriodica.style.backgroundColor = "#ffffff"
            this.celdaTablaPeriodica.style.color = "black"
            this.celdaTablaPeriodica.style.borderColor = "white"
        }
    }
}

//inicializa los datos a ingresar por elemento quimico
//nombre, simbolo, numProtones, numElectrones, numNeutrones, masaAtomica, categoria, metal, colorElemento, electronegatividad
var EQ = new Array();

EQ[0] = new ElementoQuimico("Hidrógeno", "H", 1, [1], 0, 1.00794, 7, false, "#ffffff", 2.20);
EQ[0].descripcion = "El hidrógeno es un gas explosivo, uno de los elementos más ligeros del Universo, y a la vez presente en el 90% de todos los átomos. Lo encontramos en el sol, en las estrellas, en el agua y en las moléculas que dan vida. <br/><strong>Orbitales:</strong> 1S "; 


EQ[1] = new ElementoQuimico("Helio", "He", 2, [2], 2, 4.002602, 9, false, "#bbffff", 0);
EQ[1].descripcion = "El helio es un gas inerte, y también uno de los elementos más ligeros de la tabla periódica. Lo encontramos presente en la fusión nuclear que ocurre en el sol y las estrellas, así como en globos aerostáticos, los láseres y el refrigerante para temperaturas extremadamente bajas. <br/><strong>Orbitales:</strong> 1s";

EQ[2] = new ElementoQuimico("Litio", "Li", 3, [2, 1], 4, 6.941, 0, true, "#d49cff", 0.98);
EQ[2].descripcion = "El litio es el metal más ligero de toda la tabla periódica, además es muy suave y reactivo. Este liviano metal se utiliza para crear aleaciones de aluminio, utensilios para la cocina, principalmente porque es muy resistente. <br/><strong>Orbitales:</strong> 1s, 2s";

EQ[3] = new ElementoQuimico("Berilio", "Be", 4, [2, 2], 5, 9.012182, 1,true, "#ceff00", 1.57);
EQ[3].descripcion = "El berilio es un metal ligero que no genera chispas, es muy utilizado para crear aleaciones de cobre, en la industria aeroespacial, máquinas de rayos x. Además, está presente en piedras preciosas como las esmeraldas y la aguamarina. <br/><strong>Orbitales:</strong> 1s, 2s";

EQ[4] = new ElementoQuimico("Boro", "B", 5, [2, 3], 6, 10.811, 6, true, "#fec4c3", 2.04);
EQ[4].descripcion = "El boro es un metaloide color negro sólido, muy resistente. Se utiliza para equipamiento deportivo, como por ejemplo en palos de golf y raquetas de tenis. Podemos encontrarlo también en fertilizantes, los preciados semiconductores y el vidrio borosilicatado, muy resistente al calor. <br/><strong>Orbitales:</strong> 1s, 2s, 2p";

EQ[5] = new ElementoQuimico("Carbono", "C", 6, [2, 4], 9, 12.0107, 7, false, "#808080", 2.55);
EQ[5].descripcion = "El carbón es un elemento blando, considerado la base de las moléculas orgánicas de la vida, CO2, como podrían ser por ejemplo: animales, las plantas, madera, papel, telas, plásticos y aceites. <br/><strong>Orbitales:</strong> 1s, 2s, 2p";

EQ[6] = new ElementoQuimico("Nitrógeno", "N", 7, [2, 5], 7, 14.0067, 7, false, "#0000ff", 3.04);
EQ[6].descripcion = "El nitrógeno es un gas incoloro, presente en el aire en un porcentaje del 78%. Lo podemos encontrar también en moléculas orgánicas, proteínas, músculos, en el ADN, el amoniaco, fertilizantes, explosivos como el TNT o refrigerantes. <br/><strong>Orbitales:</strong> 1s, 2s, 2p";

EQ[7] = new ElementoQuimico("Oxígeno", "O", 8, [2, 6], 8, 15.9994, 7, false, "#ff0000", 3.44);
EQ[7].descripcion = "El oxígeno es un gas incoloro, presente en un 21% del aire, el agua y en el 65% del cuerpo humano. Lo podemos encontrar en moléculas orgánicas, en la sangre, permite la respiración, la existencia de fuego, la mitad de la corteza terrestre, los minerales y los óxidos. <br/><strong>Orbitales:</strong> 1s, 2s, 2p";

EQ[8] = new ElementoQuimico("Flúor", "F", 9, [2, 7], 10, 18.998403, 8, false, "#9bc5ff", 3.98);
EQ[8].descripcion = "El flúor es un gas venenoso de color amarillento, y a la vez el elemento más reactivo:fluorita para iluminación incandescente. Está presente en la pasta de dientes, los utensilios de cocina antiadherentes como el Teflón, y en refrigerantes CFC Freón. <br/><strong>Orbitales:</strong> 1s, 2s, 2p";

EQ[9] = new ElementoQuimico("Neón", "Ne", 10, [2, 8], 10, 20.1797, 9, false, "#c2e7f9", 0);
EQ[9].descripcion = "El neón es un gas inerte presente en los tubos de neón. De un color rojo anaranjado, es muy utilizado para carteles publicitarios, láseres, y refrigerantes para fríos extremos. <br/><strong>Orbitales:</strong> 1s, 2s, 2p";

EQ[10] = new ElementoQuimico("Sodio", "Na", 11, [2, 8, 1], 12, 22.98976, 0, true, "#bc7cf6", 0.93);
EQ[10].descripcion = "El sodio es un metal blando, muy reactivo. Está presente en la sal (NaCl), los nervios, el bicarbonato de sodio, antiácidos, productos de limpieza como la lejía, el jabón y el carbonato de sodio. También podemos encontrar sodio en el vidrio, la fabricación de papel, y las farolas. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s";

EQ[11] = new ElementoQuimico("Magnesio", "Mg", 12, [2, 8, 2], 12, 24.3050, 1, true, "#a4fe06", 1.31);
EQ[11].descripcion = "El magnesio es un metal ligero. Está presente en la clorofila de las plantas verdes, los polvos de talco, basalto, las aleaciones de aluminio (por ejemplo, en automóviles, aviones y bicicletas). También podemos hallarlo en bengalas, y antiácidos. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s";

EQ[12] = new ElementoQuimico("Aluminio", "Al", 13, [2, 8, 3], 14, 26.98153, 5, true, "#ccbaba", 1.61);
EQ[12].descripcion = "El aluminio es un metal ligero que no se corroe. Considerado un metal común, podemos encontrarlo en utensilios de cocina, latas, láminas, maquinaria, todo tipo de automóviles, aviones, bicicletas, y feldespato. También debemos saber que el aluminio está presente en el granito, la arcilla, la cerámica, el corindón, y las gemas preciosas. <br/><strong>Orbitales:</strong>  1s, 2s, 2p, 3s, 3p ";

EQ[13] = new ElementoQuimico("Silicio", "Si", 14, [2, 8, 4], 14, 28.0855, 6, true, "#9aaead", 1.90);
EQ[13].descripcion = "El silicio es un cuarzo metaloide duro, presente en elementos como el granito, la arena, tierra, arcilla, cerámica, o vidrio. También lo podemos encontrar en las algas, diatomeas, semiconductores, chips de ordenador, o caucho de silicona. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p";

EQ[14] = new ElementoQuimico("Fósforo", "P", 15, [2, 8, 5], 16, 30.97696, 7, false, "#ff9900", 2.19);
EQ[14].descripcion = "El fósforo es un sólido ceroso blanco brillante, que puede presentarse también en formas rojas y negras. Está presente en elementos como los huesos, el ADN, los fosfatos que almacenan energía y fertilizantes. También lo encontramos en ácidos, detergentes, y fósforos (valga la redundancia). <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p ";

EQ[15] = new ElementoQuimico("Azufre", "S", 16, [2, 8, 6], 16, 32.065, 7, false, "#c2c305", 2.58);
EQ[15].descripcion = "El azufre es un elemento sólido amarillo y quebradizo. Podemos encontrarlo en cabellos, los huevos, cebollas, y ajos. También está presente en aguas termales, los volcanes, el yeso, el caucho, los ácidos, y la fabricación de papel. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p";

EQ[16] = new ElementoQuimico("Cloro", "Cl", 17, [2, 8, 7], 18, 35.453, 8, false, "#2ef22c", 3.16);
EQ[16].descripcion = "El cloro es un gas venenoso verdoso presente en elementos como la sal (NaCl) y la lejía. También podemos encontrarlo en el ácido estomacal, desinfectantes, agua potable, piscinas, tubos, botellas y todo tipo de derivados de plástico PVC. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p" ;

EQ[17] = new ElementoQuimico("Argón", "Ar", 18, [2, 8, 8], 22, 39.948, 9, false, "#9bdae9", 0);
EQ[17].descripcion = "El argón es un gas inerte, presente en el 1% del aire. Se trata del gas inerte más abundante en la Tierra, cuyo uso está destinado principalmente en bombillas, tubos de neón, láseres, y gases para soldadura. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p";

EQ[18] = new ElementoQuimico("Potasio", "K", 19, [2, 8, 8, 1], 20, 39.0983, 0, true, "#a558dc", 0.82);
EQ[18].descripcion = "El potasio es un metal blando, muy reactivo. Está presente en sales, nervios, así como en muchos nutrientes de las frutas y verduras. También lo podemos encontrar en el jabón, los fertilizantes, los fósforos y la pólvora. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s";

EQ[19] = new ElementoQuimico("Calcio", "Ca", 20, [2, 8, 8, 2], 20, 40.078, 1, true, "#50ff04", 1.00);
EQ[19].descripcion = "El calcio es un metal blando que está presente en los dientes, leche, hojas, verduras y conchas. También podemos encontrarlo en elementos como los corales, la piedra caliza, la tiza, el yeso, el mortero, el cemento, el mármol y los antiácidos. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s"

EQ[20] = new ElementoQuimico("Escandio", "Sc", 21, [2, 8, 9, 2], 24, 44.95591, 4, true, "#ebebeb", 1.36);
EQ[20].descripcion = "El escandio es un metal suave y ligero, muy presente en aleaciones de aluminio, en bicicletas de carrera, luces de estadio, los ladrillos de los hornos, y en aguamarinas. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d"

EQ[21] = new ElementoQuimico("Titanio", "Ti", 22, [2, 8, 10, 2], 26, 47.867, 4, true, "#cccccc", 1.54);
EQ[21].descripcion = "El titanio es un metal ligero, de los más fuerte,y muy resistente al calor. Está muy presente en la industria aeroespacial, las bicicletas de carreras, articulaciones artificiales, la pintura blanca, y los zafiros azules. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d ";

EQ[22] = new ElementoQuimico("Vanadio", "V", 23, [2, 8, 11, 2], 27, 50.9415, 4, true, "#b3b3b3", 1.63);
EQ[22].descripcion = "El vanadio es un metal duro. Está presente en elementos como el acero duro, pero también en otros como estructuras de construcción, vehículos, muelles, los ejes de transmisión, herramientas de todo tipo, industria aeroespacial y los zafiros violetas. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d";

EQ[23] = new ElementoQuimico("Cromo", "Cr", 24, [2, 8, 13, 1], 24, 51.9962, 4, true, "#a3add1", 1.66);
EQ[23].descripcion = "El cromo es un metal duro y brillante. Presente en el acero inoxidable (Fe-Cr-Ni), los utensilios de cocina, y los calentadores de nicromo. También lo encontramos en las molduras de automóviles, pinturas, cintas de grabación, esmeraldas y rubíes. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d";

EQ[24] = new ElementoQuimico("Manganeso", "Mn", 25, [2, 8, 13, 2], 20, 51.9962, 4, true, "#b394d1", 1.55);
EQ[24].descripcion = "El manganeso es un metal duro, capaz de crear un acero muy resistente. Lo podemos encontrar en excavadoras, trituradoras de rocas, rieles, arados para la agricultura, hachas, baterías, fertilizantes y amatistas. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d";

EQ[25] = new ElementoQuimico("Hierro", "Fe", 26, [2, 8, 14, 2], 29, 55.845, 4, true, "#e68542", 1.83);
EQ[25].descripcion = "El hierro es un metal de dureza media, y además es magnético. Las aleaciones de acero, por ejemplo, son principalmente de hierro. También lo podemos encontrar en estructuras de todo tipo, vehículos e imanes. No podemos olvidar que también se halla en el núcleo de la Tierra, las rocas rojas y la sangre de todos los animales. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d";

EQ[26] = new ElementoQuimico("Cobalto", "Co", 27, [2, 8, 15, 2], 33, 58.93319, 4, true, "#f2a6b3", 1.91);
EQ[26].descripcion = "El cobalto es un metal duro, magnético, capaz de crear un acero duro. Lo podemos encontrar en herramientas de corte, todo tipo de turbinas, imanes (Al-Ni-Co), vidrio azul y cerámica, así como en la vitamina B-12. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d";

EQ[27] = new ElementoQuimico("Niquel", "Ni", 28, [2, 8, 17, 1], 34, 58.6934, 4, true, "#6bd96b", 1.88);
EQ[27].descripcion = "El níquel es un metal de dureza media, magnético, capaz de crear acero inoxidable (Fe-Cr-Ni). Podemos encontrarlo, por ejemplo, en utensilios de cocina, calentadores de nicromo, monedas y baterías. Es uno de los elementos del núcleo de la Tierra. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d";

EQ[28] = new ElementoQuimico("Cobre", "Cu", 29, [2, 8, 18, 1], 25, 63.546, 4, true, "#d19c45", 1.90);
EQ[28].descripcion = "El cobre es un metal coloreado, un excelente conductor del calor y la electricidad. Está presente en todo tipo de cables, utensilios de cocina, y el latón (Cu-Zn). También lo encontramos en el bronce (Cu-Sn), las monedas, y tuberías. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d";

EQ[29] = new ElementoQuimico("Zinc", "Zn", 30, [2, 8, 18, 2], 35, 65.38, 4, true, "#9699bf", 1.65);
EQ[29].descripcion = "El zinc es un metal no corrosivo. Está presente en el acero galvanizado, el latón (Cu-Zn), las baterías, y la pintura blanca. También podemos encontrarlo en los fósforos de televisores, así como en las lámparas y el fertilizante. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d";

EQ[30] = new ElementoQuimico("Galio", "Ga", 31, [2, 8, 18, 3], 39, 69.723, 5, true, "#cca6a6", 1.81);
EQ[30].descripcion = "El galio es un metal blando, que se derrite con el calor. Lo podemos encontrar en semiconductores, los diodos emisores de luz (LED). También está presente en luces de señalización y en pequeños láseres. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p";

EQ[31] = new ElementoQuimico("Germanio", "Ge", 32, [2, 8, 18, 4], 41, 72.64, 6, true, "#87a5a7", 2.01);
EQ[31].descripcion = "El germanio está presente en semiconductores y forma parte de los metaloides frágiles. También lo podemos encontrar en transistores, rectificadores, diodos, fotocélulas, lentes y algunos tipos de ventanas infrarrojas. <br/><strong>Orbitales:</strong>1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p";

EQ[32] = new ElementoQuimico("Arsénico", "As", 33, [2, 8, 18, 5], 42, 64.92160, 6, true, "#cb9be7", 2.18);
EQ[32].descripcion = "El arsénico es un metaloide quebradizo. Lo podemos encontrar en algunos venenos, semiconductores, diodos emisores de luz (LED), luces de señal y láseres de pequeño tamaño. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p";

EQ[33] = new ElementoQuimico("Selenio", "Se", 34, [2, 8, 18, 6], 45, 78.96, 7, false, "#ffb300", 2.55);
EQ[33].descripcion = "Es insoluble en agua y alcohol, ligeramente soluble en disulfuro de carbono y soluble en éter. Presenta el efecto fotoeléctrico, convirtiendo la luz en electricidad, y, además, su conductividad eléctrica aumenta al exponerlo a la luz. Por debajo de su punto de fusión es un material semiconductor tipo p, y se encuentra en su forma natural. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p";

EQ[34] = new ElementoQuimico("Bromo", "Br", 35, [2, 8, 18, 7], 45, 79.904, 8, false, "#ba3838", 2.96);
EQ[34].descripcion = "El bromo es un líquido rojo oscuro, con características desinfectantes. Es muy utilizado en piscinas y spas, así como en películas fotográficas, retardantes de llama, gas con plomo y algunos tipos de sedantes <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p" ;

EQ[35] = new ElementoQuimico("Kriptón", "Kr", 36, [2, 8, 18, 8], 48, 83.798, 9, false, "#7bc8da", 3.00);
EQ[35].descripcion = "El kriptón es un gas inerte. Lo encontramos en accesorios como lámparas de alta intensidad, faros, linternas, y farolillos. También lo podemos encontrar en accesorios de más intensidad como los tubos de neón y los láseres. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p";

EQ[36] = new ElementoQuimico("Rubidio", "Rb", 37, [2, 8, 18, 8, 1], 48, 85.4678, 0, true, "#8e42c0", 0.82);
EQ[36].descripcion = "Es un metal alcalino blando, de color plateado blanco brillante que empaña rápidamente al aire, muy reactivo. Al igual que los demás elementos del grupo 1 puede arder espontáneamente en aire con llama de color violeta amarillento, reacciona violentamente con el agua desprendiendo hidrógeno y forma amalgama con mercurio. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s";

EQ[37] = new ElementoQuimico("Estroncio", "Sr", 38, [2, 8, 18, 8, 2], 50, 87.62, 1, true, "#00ff00", 0.95);
EQ[37].descripcion = "El estroncio está presente en fuegos artificiales. Es un elemento de metal rojo suave, utilizado también en la fabricación de bengalas, fósforos, baterías nucleares. También se utiliza para los diagnósticos médicos y se puede hallar en la lluvia radiactiva. <br/><strong>Orbitales:</strong>1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s";

EQ[38] = new ElementoQuimico("Itrio", "Y", 39, [2, 8, 18, 9, 2], 50, 88.90585, 4, true, "#acfefc", 1.22);
EQ[38].descripcion = "El itrio es un metal plateado, brillante, ligero, dúctil y maleable. Su punto de ebullición es de 3609 K. Químicamente se asemeja a los lantánidos. Es bastante estable en el aire, ya que arde por encima de los 600 K, pero reactivo en ciertas condiciones. El polvo del metal y sus virutas pueden encenderse a temperatura ambiente. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d";

EQ[39] = new ElementoQuimico("Zirconio", "Zr", 40, [2, 8, 18, 10, 2], 51, 91.224, 4, true, "#a7e9e7", 1.60);
EQ[39].descripcion = "El circonio es un metal resistente a los neutrones que no sufre corrosión. Está presente en tuberías químicas, reactores nucleares para la generación de energía, ladrillos de horno, algunos abrasivos y gemas de circón. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d";

EQ[40] = new ElementoQuimico("Niobio", "Nb", 41, [2, 8, 18, 12, 1], 52, 92.90638, 4, true, "#8fd0d6", 1.60);
EQ[40].descripcion = "El niobio es un metal que no sufre corrosión, cuyo alto punto de fusión permite que esté presente tuberías químicas, superconductores, trenes de levitación magnética e imanes.<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d ";

EQ[41] = new ElementoQuimico("Molibdeno", "Mo", 42, [2, 8, 18, 13, 1], 54, 95.96, 4, true, "#70c4c4", 2.16);
EQ[41].descripcion = "El molibdeno es un metal con un alto punto de fusión, lo que hace que esté presente en acero duro, algunas herramientas de corte, brocas, placas de blindaje, cañones de armas, y muchos fertilizantes. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d";

EQ[42] = new ElementoQuimico("Tecnecio", "Tc", 43, [2, 8, 18, 14, 1], 55, 98, 4, true, "#4db4b3", 1.90);
EQ[42].descripcion = "El tecnecio es un elemento radiactivo, de larga vida. Se trata del primer elemento hecho por el hombre. Aunque aparentemente solo hay rastros en la Tierra, también hemos encontrado tecnecio estrellas. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d";

EQ[43] = new ElementoQuimico("Rutenio", "Ru", 44, [2, 8, 18, 15, 1], 57, 101.07, 4, true, "#35a5a6", 2.20);
EQ[43].descripcion = "El rutenio es un metal duro resistente a la corrosión. Está presente en algunos contactos eléctricos, interruptores de hoja, algunas puntas de bolígrafo, catalizadores, y es muy utilizado en la producción de hidrógeno. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d";

EQ[44] = new ElementoQuimico("Rodio", "Rh", 45, [2, 8, 28, 16, 1], 58, 102.9055, 4, true, "#1396a8", 2.28);
EQ[44].descripcion = "El rodio es un metal duro y brillante que no sufre corrosión. Está presente en materiales de laboratorio, reflectores, y contactos eléctricos. También lo podemos encontrar en termopares, catalizadores, y controladores de contaminación. <br/><strong>Orbitales:</strong>1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d";

EQ[45] = new ElementoQuimico("Paladio", "Pd",46,[2,8,18,18], 60, 106.42,4, true,"#0a869e", 2.20);
EQ[45].descripcion ="El paladio es un metal duro que no sufre corrosión. Es capaz de absorber hidrógeno y está presente en material de laboratorio, contactos eléctricos, técnicas de odontología, catalizadores, controladores de contaminación. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d";

EQ[46]= new ElementoQuimico("Plata", "Ag", 47, [2,8,18,18,1], 61, 107.8682, 4, true,"#e7e7ff", 1.93);
EQ[46].descripcion="La plata es un metal suave y muy brillante. Se trata del mejor conductor de electricidad de todos los elementos. Es muy utilizado en accesorios de joyería, y platería. También se utiliza para acuñar monedas, en odontología, y en la fabricación de películas fotográficas. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d";

EQ[47]=new ElementoQuimico("Cadmio","Cd", 48,[2,8,18,18,2], 64, 112.411,4, true, "#fee1a7", 1.69);
EQ[47].descripcion="El cadmio es un metal blando resistente a la corrosión. Es un elemento tóxico que puede crear acero galvanizado, presente en pilas de NiCd, pinturas rojas y amarillas, y rociadores contra incendios. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d";

EQ[48] = new ElementoQuimico("Indio", "In", 49, [2, 8, 18, 18, 3], 66, 114.818, 5, true, "#b9918f", 1.78);
EQ[48].descripcion = "El indio es un metal blando. Está presente en soldaduras, sellos de vidrio y revestimientos de vidrio. Lo podemos encontrar igualmente en pantallas de cristal líquido (LCD), semiconductores, diodos y fotocélulas. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p";

EQ[49] = new ElementoQuimico("Estaño", "Sn", 50, [2, 8, 18, 18, 4], 69, 114.818, 5, true, "#869a9b", 1.96);
EQ[49].descripcion = "El estaño es un metal blando que no sufre corrosión. Es muy utilizado en soldaduras, latas de comida, la fabricación de bronce (Cu-Sn), y vasos de peltre. También está presente en la fabricación de vidrio, y rociadores contra incendios <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p";

EQ[50] = new ElementoQuimico("Antimonio", "Sb", 51, [2, 8, 18, 18, 5], 71, 121.760, 6, true, "#b284c4", 2.05);
EQ[50].descripcion = "El antimonio es un elemento metaloide quebradizo. Es muy utilizado en soldaduras, endurecedores de plomo, y baterías. También está presente en otros accesorios como balas, semiconductores, fotocélulas, fósforos, y retardante de llama. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p";

EQ[51] = new ElementoQuimico("Telurio", "Te", 52, [2, 8, 18, 18, 6], 76, 127.60, 6, true, "#dd9606", 2.10);
EQ[51].descripcion = "El telurio es un metaloide quebradizo. Es un elemento muy utilizado en aleaciones, fabricación de semiconductores, fotocopiadoras, cd ’s, frigoríficos y generadores termoeléctricos. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p";

EQ[52] = new ElementoQuimico("Yodo", "I", 53, [2, 8, 18, 18, 7], 74, 126.9044, 8, false, "#ab06aa", 2.66);
EQ[52].descripcion = "El yodo es un elemento sólido color violeta y negro. Se utiliza como desinfectante para heridas y para el tratamiento del agua potable. Este elemento, agregado a la sal, se utiliza para prevenir enfermedades de la tiroides, y en la fabricación de películas fotográfica. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p";

EQ[53] = new ElementoQuimico("Xenón", "Xe", 54, [2, 8, 18, 18, 8], 77, 131.293, 9, false, "#5cb2c1", 2.60);
EQ[53].descripcion = "El xenón es un gas inerte, muy utilizado en la fabricación de lámparas de alta intensidad, faros, y focos para estadios. También lo podemos encontrar en proyectores, luces estroboscópicas, láseres, y motores iónicos para naves espaciales. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p";

EQ[54] = new ElementoQuimico("Cesio", "Cs", 55, [2, 8, 18, 18, 8, 1], 78, 132.9054, 0, true, "#7424a9", 0.79);  
EQ[54].descripcion = "Reacciona en forma vigorosa con oxígeno para formar una mezcla de óxidos. En aire húmedo, el calor de oxidación puede ser suficiente para fundir y prender el metal. El cesio no reacciona con nitrógeno para formar nitruros, pero reacciona con el hidrógeno a temperaturas altas para producir un hidruro muy estable; reacciona en forma violenta con el agua y aun con hielo a temperaturas de hasta -116 °C (-177 °F) así como con los halógenos, amoníaco y monóxido de carbono. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s";

EQ[55] = new ElementoQuimico("Bario", "Ba", 56, [2, 8, 18, 18, 8, 2], 81, 137.327, 1, true, "#00d900", 0.89);
EQ[55].descripcion = "El bario es un metal blando. Es un elemento muy utilizado en la fluoroscopia y fuegos artificiales. Es también utilizado como blanqueador y relleno para papel. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s";

EQ[56] = new ElementoQuimico("Lantano", "La", 57, [2,8,18,18,9,2], 82, 138.9054, 2, true, "#94dafe", 1.10);
EQ[56].descripcion = "El lantano es un metal blando. Es muy utilizado para la fabricación de vidrio óptico, lentes para telescopio, y lentes para cámara. También lo encontramos en la fabricación de pedernales para encendedores, y lámparas de arco. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f";

EQ[57] = new ElementoQuimico("Cerio","Ce" ,58, [2,8,18,19,9,2], 82, 140.116, 2, true, "#f9ffcf", 1.10);
EQ[57].descripcion = "El cerio es un metal blando. Se trata de uno de los metales más raros de la tierra. Podemos encontrarlo en pedernales, lámparas de arco y hornos. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f" ;

EQ[58]=new ElementoQuimico("Praseodimio","Pr",59 ,[2,8,18,21,8,2], 82, 140.9076, 2, true, "#dcffd5", 1.12);
EQ[58].descripcion = "El praseodimio es un metal blando. Es muy utilizado en la fabricación de gafas protectoras, pedernales, algunos tipos de lámparas, vidrio amarillo e imanes <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f" ;

EQ[59]=new ElementoQuimico("Neodimio", "Nd", 60, [2,8,18,22,8,2], 85, 144.242, 2, true, "#cdffd3", 1.14);
EQ[59].descripcion = "El neodimio es un metal blando. Es muy utilizado en la fabricación de imanes fuertes (Nd-Fe-B), motores eléctricos de todo tipo, altavoces y auriculares. También encontramos neodimio en láseres, y pedernales para encendedores. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f";

EQ[60]=new ElementoQuimico("Prometio", "Pm", 61, [2,8,18,23,8,2], 146, 145, 2, true, "#b1ffd0", 0);
EQ[60].descripcion = "El prometio es un material radioactivo de larga duración. Es un elemento creado por el hombre. Cierto es que existen pequeños rastros en la naturaleza, pero se trata de un elemento artificial. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f";

EQ[61]=new ElementoQuimico("Samario", "Sm", 62, [2,8,18,24,8,2], 88, 150.36, 2, true, "#a7fed1", 1.17);
EQ[61].descripcion = "El samario es un metal blando. Está presente en imanes (Sm-Co), algunos motores eléctricos, altavoces y auriculares. También podemos encontrar el samario en sensores infrarrojos, así como en vidrios absorbentes de infrarrojos. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f";

EQ[62] = new ElementoQuimico("Europio","Eu", 63, [2,8,18,25,8,2], 89, 151.964, 2, true, "#80ffd1", 0)
EQ[62].descripcion="El europio es un metal blando. Está presente en fósforos de televisores a color, así como en lámparas fluorescentes tricromáticas. También podemos encontrar europio en pintura fluorescente, y láseres. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f"

EQ[63] = new ElementoQuimico("Gadolinio", "Gd", 64, [2, 8, 18, 25, 9, 2], 63, 157.25, 2, true, "#5dfed4", 1.20);
EQ[63].descripcion = "El gadolinio es un metal blando magnético. Se trata del mejor absorbente de neutrones, y además se utiliza como intensificador de contraste para imágenes por resonancia magnética (IRM), fósforos, y la realización de radiografías con neutrones. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f";

EQ[64] = new ElementoQuimico("Terbio", "Tb", 65, [2, 8, 18, 27, 8, 2], 94, 158.9253, 2, true, "#43fed3", 0);
EQ[64].descripcion = "El terbio es un metal blando. Está presente en fósforos de televisores a color y lámparas fluorescentes tricromáticas. También podemos encontrarlo en cd’ s para ordenador, materiales magnetostrictivos inteligentes y el Terfenol-D. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f";

EQ[65] = new ElementoQuimico("Disprosio", "Dy", 66, [2, 8, 18, 28, 8, 2], 96, 162.500, 2, true, "#29fed0", 1.22);
EQ[65].descripcion = "El disprosio es un metal blando. Está presente en barras de control nuclear, y fósforos. También lo encontramos en cd’ s de todo tipo, materiales inteligentes magnetostrictivos y Terfenol-D. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f";

EQ[66] = new ElementoQuimico("Holmio", "Ho", 67, [2, 8, 18, 29, 8, 2], 98, 164.9303, 2, true, "#06feb2", 1.23);
EQ[66].descripcion = "El holmio es un metal blando. Es muy utilizado para láseres infrarrojos, cirugía láser, telémetros láser seguros para los ojos, y filtros de vidrio amarillo. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f";

EQ[67] = new ElementoQuimico("Erbio", "Er", 68, [2, 8, 18, 30, 8, 2], 99, 167.259, 2, true, "#02ec95", 1.24);
EQ[67].descripcion = "El erbio es un metal blando. Es muy utilizado en la fabricación de amplificadores de señal de fibra óptica, láseres infrarrojos, y cirugía láser. También podemos encontrarlo en el vidrio rosa, las gafas de sol, y las aleaciones de vanadio. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f";

EQ[68] = new ElementoQuimico("Tulio", "Tm", 69, [2, 8, 18, 31, 8, 2], 100, 168.9342, 2, true, "#09db6e", 1.25);
EQ[68].descripcion = "El tulio es un metal blando. Se trata del metal estable más raro de la tierra. Se utiliza en la fabricación de láseres infrarrojos, en cirugía láser, y está presente en los fósforos. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f";

EQ[69] = new ElementoQuimico("Iterbio", "Yb", 70, [2, 8, 18, 32, 8, 2], 103, 173.054, 2, true, "#07cb4d", 0.00);
EQ[69].descripcion = "El iterbio es un metal blando. Es muy utilizado en la fabricación de amplificadores de señal de fibra óptica, láseres de fibra infrarroja, y la creación de aleaciones de acero inoxidable. <br/><strong>Orbitales:</strong>1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f";

EQ[70] = new ElementoQuimico("Lutecio", "Lu", 71, [2, 8, 18, 32, 9, 2], 104, 174.9668, 2, true, "#06bc34", 1.27);
EQ[70].descripcion = "El lutecio es un metal blando. Se trata de uno de los metales más raros y densos de la tierra, y a la vez de los más duros. Es muy utilizado en terapia fotodinámica para combatir el cáncer. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f";

EQ[71] = new ElementoQuimico("Hafnio", "Hf", 72, [2, 8, 18, 32, 10, 2], 106, 178.49, 4, true, "#6cceff", 1.30);
EQ[71].descripcion = "El hafnio es un metal no corrosivo. Es muy utilizado para absorber neutrones, y también en las barras de control de reactores nucleares en submarinos. También lo encontramos en los electrodos de plasma. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d";

EQ[72] = new ElementoQuimico("Tantalio", "Ta", 73, [2, 8, 18, 32, 11, 2], 108, 180.9478, 4, true, "#66b8ff", 1.50);
EQ[72].descripcion = "El tántalo es un metal resistente a la corrosión. Su alto punto de fusión hace que se utilice en la fabricación de material de laboratorio. También lo encontramos en herramientas quirúrgicas, articulaciones artificiales, algunos tipos de condensadores, y teléfonos móviles. <br/><strong>Orbitales:</strong>  1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d";

EQ[73] = new ElementoQuimico("Wolframio", "W", 74, [2, 8, 18, 32, 12, 2], 110, 183.84, 4, true, "#30ace2", 2.36);
EQ[73].descripcion = "El wolframio es un metal denso y con un alto punto de fusión. Es muy utilizado para la fabricación de filamentos en lámparas y televisores. También lo encontramos en herramientas de corte, abrasivos, y termopares.<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d";

EQ[74] = new ElementoQuimico("Renio", "Re", 75, [2, 8, 18, 32, 13, 2], 111, 186.207, 4, true, "#3598c1", 1.90);
EQ[74].descripcion = "El renio es un metal denso con un alto punto de fusión. Es muy utilizado en la fabricación de motores de cohetes espaciales, bobinas para la calefacción, y filamentos de laboratorio. También podemos encontrarlo en contactos eléctricos, termopares, y todo tipo de catalizadores.<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d";

EQ[75] = new ElementoQuimico("Osmio", "Os", 76, [2, 8, 18, 32, 14, 2], 114, 190.23, 4, true, "#3587af", 2.20);
EQ[75].descripcion = "El osmio es un metal duro no corrosivo. Su alto punto de fusión y su gran densidad, hace de este elemento, el elemento perfecto para la fabricación de contactos eléctricos, puntas de todo tipo de bolígrafos, agujas, polvo para huellas dactilares (los polvos que se echan sobre una superficie para ver si existe rastro de huellas dactilares).<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d";

EQ[76] = new ElementoQuimico("Irdio", "Ir", 77, [2, 8, 18, 32, 15, 2], 177, 192.217, 4, true, "#2472a2", 2.20);
EQ[76].descripcion = "El iridio es un metal duro no corrosivo. Se trata de un elemento de una gran densidad, al igual que el osmio. Por sus características, se trata de un componente indispensable para la fabricación de material de laboratorio, bujías para los motores, puntas de bolígrafo, y agujas de todo tipo.<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d";

EQ[77] = new ElementoQuimico("Platino", "Pt", 78, [2, 8, 18, 32, 17, 1], 117, 195.084, 4, true, "#f6f1db", 2.28);
EQ[77].descripcion = "El platino es un metal denso no corrosivo. Por sus características, lo encontramos en la fabricación de material de laboratorio, todo tipo de bujías, y catalizadores. También podemos encontrar platino en aparatos de control de la contaminación, para el craqueo de petróleo, y el procesamiento de grasas vegetales y animales.<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d";

EQ[78] = new ElementoQuimico("Oro", "Au", 79, [2, 8, 18, 32, 18, 1], 118, 196.9665, 4, true, "#d9d926", 2.54);
EQ[78].descripcion = "El oro es un elemento maleable. Se trata de un elemento de color denso que no se empaña y que crea unas joyas únicas. También es muy utilizado para acuñar monedas, la creación de pan de oro ultrafino, y la fabricación de contactos eléctricos.<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d";

EQ[79] = new ElementoQuimico("Mercurio", "Hg", 80, [2, 8, 18, 32, 18, 2], 121, 200.59, 4, true, "#c2c4d0", 2.00);
EQ[79].descripcion = "El hidrargirio, también conocido popularmente como mercurio, es un metal líquido, muy tóxico. Es utilizado principalmente para la fabricación de termómetros, barómetros, termostatos, iluminación de farolas, lámparas fluorescentes, así como muchos utensilios y herramientas de odontología.<br/><strong>Orbitales:</strong>  1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d";

EQ[80] = new ElementoQuimico("Talio", "Tl", 81, [2, 8, 18, 32, 18, 3], 123, 204.3833, 5, true, "#b77368", 1.62);
EQ[80].descripcion = "El talio forma parte de los denominados metales blandos,. Es un tipo de metal tóxico, utilizado en las aleaciones de mercurio de bajo punto de fusión. Lo podemos encontrar en termómetros de baja temperatura, las lámparas submarinas, y algunos tipos de fotocélulas.<br/><strong>Orbitales:</strong>1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p";

EQ[81] = new ElementoQuimico("Plomo", "Pb", 82, [2, 8, 18, 32, 18, 4], 125, 207.2, 5, true, "#757984", 2.23);
EQ[81].descripcion = "El plomo es un metal denso no corrosivo. Se trata de un elemento tóxico, muy utilizado en la fabricación de pesos, muchos tipos de soldaduras, baterías, diferentes tipos de balas, cristal, plomería vieja, y escudos para la radiación.<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p";

EQ[82] = new ElementoQuimico("Bismuto", "Bi", 83, [2, 8, 18, 32, 18, 5], 126, 208.9804, 5, true, "#b26cc5", 2.02);
EQ[82].descripcion = "El bismuto es un metal quebradizo con un bajo punto de fusión. Por sus características es muy utilizado para la fabricación de soldaduras, fusibles para sistemas eléctricos, y rociadores contra incendios. También podemos encontrar el bismuto en algunos tipos de pigmentos cosméticos.<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p";

EQ[83] = new ElementoQuimico("Polonio", "Po", 84, [	2, 8, 18, 32, 18, 6], 126, 210, 6, true, "#c07a0a", 2.00);
EQ[83].descripcion = "El polonio es un material radiactivo, de larga duración. Se trata del primer elemento radiactivo encontrado, con muy pequeños rastros de él en la naturaleza. Está presente en accesorios como cepillos antiestáticos, y forma parte de la composición del tabaco.<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p";

EQ[84] = new ElementoQuimico("Astato", "At", 85, [ 2, 8, 18, 32, 18, 7], 125, 210, 8, false, "#926c5f", 2.20);
EQ[84].descripcion = "El astato es un elemento radiactivo, de corta duración. Existen muypequeños rastros de este elemento en la naturaleza, y es muy utilizado en la medicina contra el cáncer.<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p";

EQ[85] = new ElementoQuimico("Radón", "Rn", 86, [ 2, 8, 18, 32, 18, 8], 134, 220, 9, false, "#599db0", 0.00);
EQ[85].descripcion = "El radón es un gas radiactivo, de vida corta duración. Este elemento es considerado unpeligro ambiental, y es utilizado principalmente en implantes quirúrgicos para el tratamiento del cáncer.<br/><strong>Orbitales:</strong>1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p";

EQ[86] = new ElementoQuimico("Francio", "Fr", 87, [ 2, 8, 18, 32, 18, 8, 1], 136, 223, 0, true, "#5c0587", 0.70);
EQ[86].descripcion = "El francio es un elemento a base de átomos radiactivos, de corta duración. Es más grandes que el cesio, y existen pequeños rastros en la naturaleza. Es muy utilizado en trampas de láser para átomos, o trampas atómicas.<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s";

EQ[87] = new ElementoQuimico("Radio", "Ra", 88, [2, 8, 18, 32, 18, 8, 2], 138, 226, 1, true, "#059905", 0.90);
EQ[87].descripcion = "El radio es un elemento radiactivo, y de larga vida. Está presente en muchosrelojes luminosos (ahora prohibidos). También es utilizado en la producción médica de radón, el uso de radiografías, y el presente en desechos radiactivos.<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s";

EQ[88] = new ElementoQuimico("Actinio", "Ac", 89, [2, 8, 18, 32, 18, 9, 2], 138, 227, 3, true, "#8ebbff", 1.10);
EQ[88].descripcion = "El actinio es un elemento radiactivo, de larga vida. Existen pequeños rastros de este elemento en la naturaleza, y es muy utilizado en la medicina contra el cáncer, siendo fuente de neutrones, y presente en residuos radiactivos.<br/><strong>Orbitales:</strong>  1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[89] = new ElementoQuimico("Torio", "Th", 90, [2, 8, 18, 32, 18, 10, 2], 142, 232.0380, 3, true, "#08c6ff", 1.30);
EQ[89].descripcion = "El torio es un elemento radiactivo. Se trata del elemento radiactivo más abundante y de más larga vida, por lo que es utilizado como combustible de reactores nuclear.<br/><strong>Orbitales:</strong>1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[90] = new ElementoQuimico("Protactinio", "Pa", 91, [2, 8, 18, 32, 20, 9, 2], 140, 231.0358, 3, true, "#07b5fe", 1.50);
EQ[90].descripcion = "El protactinio es un elemento radioactivo. Es un elemento de larga vida, conpequeños rastros en la naturaleza, sin usos, y presente en residuos radiactivos.<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[91] = new ElementoQuimico("Uranio", "U", 92, [2, 8, 18, 32, 21, 9, 2], 146, 238.0289, 3, true, "#00a5ff", 1.38);
EQ[91].descripcion = "El uranio es un combustible de reactores nucleares denso. Su composición es de vida larga y radiactiva, por lo que es utilizado en armas nucleares, contrapesos, y balas perforantes.<br/><strong>Orbitales:</strong>1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[92] = new ElementoQuimico("Neptunio", "Np", 93, [2, 8, 18, 32, 22, 9, 2], 144, 237, 3, true, "#069bff", 1.36);
EQ[92].descripcion = "El neptunio es un elemento radiactivo, de larga vida. Cuenta conpequeños rastros en la naturaleza, y es utilizado en los detectores de neutrones, dosímetros, muy posiblemente en armas nucleares, y está presente en desechos radiactivos.<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[93] = new ElementoQuimico("Plutonio", "Pu", 94, [2, 8, 18, 32, 24, 8, 2], 150, 244, 3, true, "#078afe", 1.28);
EQ[93].descripcion = "El plutonio es un elemento radiactivo, y de larga vida. Cuenta conpequeños rastros en la naturaleza, y es utilizado tanto como combustible de reactores nucleares, como combustible para de naves espaciales, y armamento nuclear.<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[94] = new ElementoQuimico("Americio", "Am", 95, [2, 8, 18, 32, 25, 8, 2], 148, 243, 3, true, "#727cf5", 1.30);
EQ[94].descripcion = "El americio es un elemento radiactivo, de larga vida. Nunca ha sido encontrado en la naturaleza, pero artificialmente está presente en detectores de humo, medidores de espesor de lámina, y desechos radiactivos.<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[95] = new ElementoQuimico("Curio", "Cm", 96, [2, 8, 18, 32, 25, 9, 2], 151, 247, 3, true, "#937ce8", 1.30);
EQ[95].descripcion = "El curio es un elemento radiactivo, de larga vida. Nunca ha sido encontrado en la naturaleza, pero artificialmente lo encontramos en instrumentos científicos, analizadores de minerales, y desechos radiactivos.<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[96] = new ElementoQuimico("Berkelio", "Bk", 97, [2, 8, 18, 32, 27, 8, 2], 150, 247, 3, true, "#a36de7", 1.30);
EQ[96].descripcion = "El berkelio es un elemento radiactivo, de larga vida. Nunca ha sido encontrado en la naturaleza, sin usos, y presente en los residuos radiactivos.<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[97] = new ElementoQuimico("Californio", "Cf", 98, [2, 8, 18, 32, 28, 8, 2], 153, 251, 3, true, "#b44bdc", 1.30);
EQ[97].descripcion = "El californio es un elemento radiactivo, de larga vida. Nunca ha sido encontrado en la naturaleza, pero artificialmente lo encontramos en instrumentos científicos, analizadores de minerales, y desechos radiactivos.<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[98] = new ElementoQuimico("Einstenio", "Es", 99, [2, 8, 18, 32, 29, 8, 2], 153, 252, 3, true, "#c32cdd", 1.30);
EQ[98].descripcion = "Su método de obtención consiste en irradiar aproximadamente 1 kg de Pu-239 en un reactor para generar Pu-242. Este Pu-242 se introduce en bolas de óxido de plutonio y aluminio en polvo. Posteriormente estas bolas se introducen en varillas y se irradian. Finalmente, se introducen las varillas en un reactor isotópico de alto flujo. Tras todo esto se separa el einstenio del californio. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[99] = new ElementoQuimico("Fermio", "Fm", 100, [2, 8, 18, 32, 30, 8, 2], 157, 257, 3, true, "#c22cc9", 1.30);
EQ[99].descripcion = "No se encuentra en la naturaleza; su descubrimiento y producción se alcanza por transmutación artificial de elementos más ligeros. es un elemento químico radiactivo. La fisión espontánea es el modo principal de decaimiento para 244Fm, 256Fm y 258Fm. El isótopo con vida más larga es 257Fm, el cual tiene una vida media de unos 100 días.<br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[100] = new ElementoQuimico("Mandelevio", "Md", 101, [2, 8, 18, 32, 31, 8, 2], 157, 258, 3, true, "#cb14a0", 1.30);
EQ[100].descripcion = "Lo identificaron Albert Ghiorso, Bernard G. Harvey, Gregory R. Choppin, Stanley G. Thompson y Glenn T. Seaborg el 19 de febrero de 1955 mediante el bombardeo del isótopo einstenio-253 con iones helio en el ciclotrón de 60 pulgadas de la Universidad de California en Berkeley. El isótopo producido fue el 256-Md (vida media de 76 minutos). El isótopo 258-Md (55 días) se ha obtenido por bombardeo de un isótopo del einstenio con iones helio.<br/><strong>Orbitales:</strong>  1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[101] = new ElementoQuimico("Nobelio", "No", 102, [2, 8, 18, 32, 32, 8, 2], 157, 259, 3, true, "#cb14a0", 1.30);
EQ[101].descripcion = "Su decaimiento se realiza por emisión de partículas alfa, es decir, un ion de helio doblemente cargado. Hasta la fecha solo se han producido cantidades atómicas del elemento. El nobelio es el décimo elemento más pesado que el uranio producido sintéticamente y el 14.º miembro de los actínidos. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[102] = new ElementoQuimico("Laurencio", "Lr", 103, [2, 8, 18, 32, 32, 8, 2], 159, 262, 3, true, "#d30687", 0.00);
EQ[102].descripcion = "También es un elemento sintético radiactivo de la tabla periódica de los elementos. Los primeros átomos de lawrencio fueron producidos al bombardear un blanco de tres miligramos, compuesto de tres isótopos de californio con núcleos de boro-10 y boro-11 del Acelerador lineal de iones pesados. Todos los isótopos del lawrencio son radiactivos; su isótopo más estable conocido es 266Lr, con un período de semidesintegración de aproximadamente 11 horas.4​ Todos los demás isótopos, excepto 260Lr, 261Lr, 262Lr y 266Lr, se desintegran con una vida menor a un minuto. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[103] = new ElementoQuimico("Rutherfordio", "Rf", 104, [2, 8 , 18, 32, 32, 10, 2], 153, 261, 4, true, "#da0473", 0);
EQ[103].descripcion = "Su nombre fue elegido en honor del Barón Ernest Rutherford, científico colaborador del modelo atómico y física nuclear. Este es un elemento sintético altamente radiactivo cuyo isótopo más estable es el 261Rf con una vida media de aproximadamente 13 horas. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[104] = new ElementoQuimico("Dubnio", "Db", 105, [2, 8, 18, 32, 32, 11, 2], 157, 262, 4, true, "#dc056d", 0.00);
EQ[104].descripcion = "Es un elemento sintético y radiactivo; y su isótopo más estable conocido, dubnio-268, tiene un período de semidesintegración de aproximadamente veintiocho horas. Se produjeron cantidades microscópicas de dubnio en laboratorios de la Unión Soviética y California. Fue descubierto por el ruso Georgii Flerov en 1967-1970, y por el estadounidense Albert Ghiorso en 1970. Cuando se descubrió, la prioridad del descubrimiento y por lo tanto el nombramiento del elemento, se disputó entre los científicos soviéticos y estadounidenses, que unos propusieron llamarlo Nielsbohrio y los otros Hahnio, aunque estos nombres no fueron reconocidos internacionalmente. <br/><strong>Orbitales:</strong>  1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[105] = new ElementoQuimico("Seaborgio", "Sg", 106, [2, 8, 18, 32, 32, 12, 2], 160, 266, 4, true, "#e00664", 0.00);
EQ[105].descripcion = "Es un elemento sintético cuyo isótopo más estable es el 271Sg que tiene una vida media de 2,4 minutos. Su naturaleza química es similar a la del wolframio. Existen 12 isótopos conocidos del seaborgio, el de mayor vida media es el 271Sg que decae por desintegración alfa y fisión espontánea. Tiene una vida media de 2,4 minutos. El isótopo encontrado de menor vida media es el 258Sg que también sufre desintegración alfa y fisión espontánea. Su vida media es de 2,9 ms. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[106] = new ElementoQuimico("Bohrio", "Bh", 107, [2, 8, 18, 32, 32, 13, 2], 157, 264, 4, true, "#e8054d", 0.00);
EQ[106].descripcion = "Fue sintetizado e identificado sin ambigüedad en 1981 por un equipo de Darmstadt, Alemania, equipo dirigido por P. Armbruster y G. Müzenberg. La reacción usada para producir el elemento fue propuesta y aplicada en 1976 por un grupo de Dubna (cerca de Moscú), que estaba bajo la guía de Yuri Oganesián. Un blanco de 209Bi fue bombardeado por un haz de proyectiles de 54Cr. La mejor técnica par identificar un nuevo isótopo es su correlación genética con isótopos conocidos a través de una cadena de desintegración radiactiva. En general, estas cadenas de decaimiento se interrumpen por fisión espontánea. Con el fin de aplicar el análisis de cadena de decaimiento deberían producirse aquellos isótopos que son más estables frente a la fisión espontánea, es decir, isótopos con números impares de protones y neutrones. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[107] = new ElementoQuimico("Hassio", "Hs", 108, [2, 8, 16, 32, 32, 16, 2], 169, 277, 4, true, "#ea0641", 0.00);
EQ[107].descripcion = "Su isótopo más estable es el Hs-269, que tiene un periodo de semidesintegración de 9,7 segundos. Fue sintetizado por primera vez en 1984 por el grupo de investigación alemán Gesellschaft für Schwerionenforschung localizado en Darmstadt. El nombre hasio propuesto por el grupo se debe al estado alemán de Hesse en el que se encuentra el GSI. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[108] = new ElementoQuimico("Meitnerio", "Mt", 109, [2, 8, 18, 32, 32, 15, 2], 159, 268, 4, true, "#f10438", 0.00);
EQ[108].descripcion = "Es un elemento sintético cuyo isótopo más estable es el 278Mt, cuya vida media es de 7,6 s. Fue encontrado por accidente en 1982 por Peter Armbruster y Gottfried Münzenberg en el Instituto de Investigación de iones Pesados (Gesellschaft für Schwerionenforschung) en Darmstadt. El equipo lo consiguió bombardeando bismuto-209 con núcleos acelerados de hierro-58. La creación de este elemento demostró que las técnicas de fusión nuclear podían ser usadas para crear nuevos núcleos pesados. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[109] = new ElementoQuimico("Darmstatio", "Ds", 110, [2, 8, 18, 32, 32, 16, 2], 161, 271, 4, true, "#f5022e", 0.00);
EQ[109].descripcion = "Es un elemento sintético que decae rápidamente; sus isótopos de números másicos entre 267 y 273 tienen periodos de semidesintegración del orden de los microsegundos. Fue sintetizado por primera vez el miércoles 9 de noviembre de 1994 en la Gesellschaft für Schwerionenforschung en Darmstadt, Alemania, por P. Armbruster, S. Hofmann, G. Münzenberg y otros. <br/><strong>Orbitales:</strong>1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[110] = new ElementoQuimico("Roentgenio", "Rg", 111, [2, 8, 18, 32, 32, 17, 2], 161, 272, 4, true, "#f50630", 0.00);
EQ[110].descripcion = "Fue descubierto en 1994 por científicos alemanes en Darmstadt. En noviembre del 2004 recibió el nombre de roentgenio en honor a Wilhelm Conrad Roentgen (1845-1923), premio Nobel de Física, descubridor de los rayos X. El roentgenio se obtiene a través del bombardeo de hojas de bismuto (Bi) con iones de níquel (Ni), decayendo en 15 milisegundos. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[111] = new ElementoQuimico("Copernicio", "Cn", 112, [2, 8, 18, 32, 32, 18, 2], 173, 285, 4, true, "#f6052f", 0.00);
EQ[111].descripcion = "Su apariencia física no se conoce aún, pero podría calcularse, sabiendo que por ahora el isótopo conocido, de 285 de masa atómica, tiene una vida media de 0,24 ms. Se trata de un elemento químico superpesado que, en ese entonces, a falta de un nombre (tienen el privilegio de elegirlo), se llamaba unumbio, que en latín significa «uno uno dos». Este elemento, que en realidad fue descubierto en 1996, ve así confirmada su existencia, aunque sólo han conseguido producir literalmente cuatro átomos de él. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[112] = new ElementoQuimico("Nihonio", "Nh", 113, [2, 8, 18, 32, 32, 18, 3], 171, 284, 5, true, "#fa042b", 0.00);
EQ[112].descripcion = "Es un elemento transactínido del bloque p, y es miembro del séptimo período dentro del grupo del boro, aunque no se realizó ningún experimento químico que haya confirmado que este se comporte como el homólogo más pesado que el talio dentro de este grupo. Se cree que el nihonio tenga algunas propiedades similares a la de sus homólogos más livianos, es decir, boro, aluminio, galio, indio y talio, aunque también debería mostrar varias diferencias con estos. A diferencia de otros elementos del bloque p, se prevé que muestre algunas características de metales de transición. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f"

EQ[113] = new ElementoQuimico("Flerovio", "Fl", 114, [2, 8, 18, 32, 32, 18, 4], 175, 289, 5, true, "#ff051e", 0.00);
EQ[113].descripcion = "Se han observado alrededor de 80 desintegraciones de átomos de flerovio, 50 de ellas directamente y 30 de la desintegración de los elementos más pesados livermorio y oganesón. Todas las desintegraciones han sido asignadas a los cuatro isótopos vecinos con números de masa 286-289. El isótopo de más larga vida conocido actualmente es el 289Fl114 con una vida media de aproximadamente 2,6 s, aunque hay evidencias de un isómero, 289bFl114, con una vida media de aproximadamente 66 s, que sería uno de los núcleos más longevos en la región de los elementos superpesados. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[114] = new ElementoQuimico("Moscovio", "Mc", 115, [2, 8, 18, 32, 32, 18, 5], 173, 288, 5, true, "#ff0423", 0.00);
EQ[114].descripcion = "Actualmente se conocen cuatro isótopos desde 287Mc hasta 290Mc. Se prevé que el isótopo más estable del moscovio sea el 299Mc, que contiene el número mágico de 184 neutrones. El isótopo con mayor número de neutrones conocido hasta la fecha es el 290Mc, con 175 neutrones. Es muy inestable, con una vida media de milésimas de segundo. Su nombre hace referencia a la provincia de Moscú, región a la que pertenece la ciudad rusa donde se descubrió, Dubná. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[115] = new  ElementoQuimico("Livermorio", "Lv", 116, [2, 8, 18, 32, 32, 18, 6], 176, 292, 5, true, "#ff0520", 0.00);
EQ[115].descripcion = "Por su inestabilidad, vida media tan reducida y dificultad de obtención, en la actualidad son nulas las aplicaciones industriales, comerciales o propagandísticas de este elemento muy pesado por lo que su aplicación se relega sólo a la investigación científica. <br/><strong>Orbitales:</strong>1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[116] = new ElementoQuimico("Teneso", "Ts", 117, [2, 8, 18, 32, 32, 18, 7], 177, 294, 8, false, "#ff0423", 0.00);
EQ[116].descripcion = "En un experimento en 2011, se creó directamente uno de sus productos de desintegración, confirmando parcialmente los resultados del experimento inicial; el experimento, además, fue repetido con éxito en 2012. es probable que el teneso tenga propiedades significativamente diferentes de las del resto de elementos del grupo, aunque se prevé que el punto de fusión, el punto de ebullición y la primera energía de ionización sigan las tendencias periódicas. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";

EQ[117] = new ElementoQuimico("Oganesón", "Og", 118, [2, 8, 18, 32, 32, 18, 8], 176, 294, 9, false, "#ff0222", 0.00);
EQ[117].descripcion = "Es radiactivo y altamente inestable, por lo que desde 2002 solo se han detectado tres o posiblemente cuatro átomos del isótopo 294Og.13​ Si bien este hecho no posibilita un estudio experimental adecuado que pueda caracterizar sus propiedades y sus posibles compuestos, varios cálculos teóricos han permitido predecir muchas de sus cualidades, incluidas algunas inesperadas. Si bien inicialmente se pensaba que era un gas, ahora se supone que es un sólido bajo condiciones normales de presión y temperatura. <br/><strong>Orbitales:</strong> 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f";