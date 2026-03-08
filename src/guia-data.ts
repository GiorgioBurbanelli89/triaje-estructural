/**
 * Base de datos de metodos de reparacion por tipo de falla estructural
 * Incluye metodos del documento "Criterios de Diseno y Detalles Estructurales"
 */
export interface MetodoInfo {
  nombre: string;
  descripcion: string;
  cuando_usar: string;
  materiales: string[];
  pasos: string[];
}

export interface FallaInfo {
  id: string;
  falla: string;
  descripcion: string;
  nivel_tipico: string;
  metodos: MetodoInfo[];
}

export const GUIA_REPARACION: FallaInfo[] = [
  {
    id: "grietas_flexion",
    falla: "Grietas por Flexion",
    descripcion: "Grietas verticales o ligeramente inclinadas en la parte central de vigas y losas, causadas por esfuerzos de tension.",
    nivel_tipico: "medio",
    metodos: [
      {
        nombre: "Inyeccion Epoxica",
        descripcion: "Sellado de grietas mediante inyeccion de resina epoxica a presion, restaurando la capacidad estructural.",
        cuando_usar: "Grietas menores a 2mm de ancho que no comprometen el acero de refuerzo.",
        materiales: ["Resina epoxica de inyeccion", "Puertos de inyeccion", "Sellador superficial epoxicol", "Equipo de inyeccion a presion"],
        pasos: ["Limpiar la grieta con aire comprimido", "Instalar puertos de inyeccion cada 15-20 cm", "Sellar la superficie entre puertos", "Inyectar resina comenzando por el puerto mas bajo", "Dejar curar segun especificaciones", "Retirar puertos y lijar superficie"]
      },
      {
        nombre: "Refuerzo con Fibra de Carbono (CFRP)",
        descripcion: "Aplicacion de laminas de fibra de carbono adheridos con resina para aumentar la capacidad a flexion.",
        cuando_usar: "Cuando se requiere aumentar la capacidad de carga o la grieta es recurrente.",
        materiales: ["Laminas de fibra de carbono", "Resina de impregnacion", "Primer epoxicol", "Masilla de nivelacion"],
        pasos: ["Preparar la superficie (sandblasting o esmerilado)", "Aplicar primer epoxicol", "Nivelar irregularidades con masilla", "Aplicar resina de impregnacion", "Colocar lamina de CFRP", "Aplicar capa final de resina", "Curar por 7 dias minimo"]
      }
    ]
  },
  {
    id: "grietas_cortante",
    falla: "Grietas por Cortante",
    descripcion: "Grietas diagonales a 45 grados en vigas, columnas o muros, indicando esfuerzos de cortante excesivos.",
    nivel_tipico: "alto",
    metodos: [
      {
        nombre: "Encamisado de Concreto",
        descripcion: "Aumento de seccion del elemento mediante una capa adicional de concreto reforzado.",
        cuando_usar: "Dano severo que requiere aumentar la capacidad a cortante del elemento.",
        materiales: ["Concreto de alta resistencia", "Acero de refuerzo (estribos)", "Puente de adherencia", "Cimbra"],
        pasos: ["Retirar concreto danado", "Preparar superficie con puente de adherencia", "Colocar acero de refuerzo adicional", "Instalar cimbra", "Colar concreto de alta resistencia", "Curar por 28 dias"]
      },
      {
        nombre: "Estribos Externos con CFRP",
        descripcion: "Envolvimiento con fibra de carbono en forma de U o completa para resistir cortante.",
        cuando_usar: "Cuando el espacio no permite encamisado o se requiere intervencion rapida.",
        materiales: ["Tiras de fibra de carbono", "Resina epoxica", "Primer", "Masilla de nivelacion"],
        pasos: ["Preparar superficie del elemento", "Redondear esquinas (radio minimo 25mm)", "Aplicar primer y masilla", "Cortar tiras de CFRP al tamano", "Impregnar con resina y aplicar en forma de U", "Aplicar capa de acabado"]
      }
    ]
  },
  {
    id: "columna_danada",
    falla: "Columna Danada",
    descripcion: "Danos en columnas incluyendo aplastamiento, pandeo de barras, perdida de recubrimiento o agrietamiento severo.",
    nivel_tipico: "critico",
    metodos: [
      {
        nombre: "Encamisado de Concreto",
        descripcion: "Envolvimiento completo de la columna con concreto armado adicional, aumentando seccion y capacidad.",
        cuando_usar: "Dano estructural significativo con perdida de capacidad de carga.",
        materiales: ["Concreto f'c >= 300 kg/cm2", "Acero de refuerzo longitudinal y transversal", "Puente de adherencia", "Cimbra circular o rectangular"],
        pasos: ["Apuntalar la estructura", "Retirar concreto danado", "Limpiar y preparar acero existente", "Colocar refuerzo nuevo", "Instalar cimbra", "Colar concreto y vibrar", "Curar por minimo 28 dias"]
      },
      {
        nombre: "Encamisado Metalico",
        descripcion: "Colocacion de placas de acero soldadas alrededor de la columna con inyeccion de grout.",
        cuando_usar: "Reparacion de emergencia o cuando se necesita capacidad inmediata.",
        materiales: ["Placas de acero estructural", "Soldadura", "Grout no contractil", "Angulos y conectores"],
        pasos: ["Apuntalar estructura", "Preparar superficie de columna", "Fabricar y colocar camisa de acero", "Soldar uniones", "Inyectar grout entre camisa y columna", "Aplicar proteccion anticorrosiva"]
      }
    ]
  },
  {
    id: "corrosion",
    falla: "Corrosion del Acero de Refuerzo",
    descripcion: "Oxidacion del acero que causa expansion, agrietamiento y desprendimiento del concreto circundante.",
    nivel_tipico: "alto",
    metodos: [
      {
        nombre: "Reparacion Localizada",
        descripcion: "Remocion del concreto contaminado, limpieza del acero y reconstruccion con mortero de reparacion.",
        cuando_usar: "Corrosion localizada en areas especificas con perdida de seccion menor al 25%.",
        materiales: ["Mortero de reparacion polimerico", "Inhibidor de corrosion", "Puente de adherencia", "Proteccion superficial"],
        pasos: ["Delimitar area afectada", "Demoler concreto hasta 25mm detras del acero", "Limpiar acero (grado Sa 2.5)", "Aplicar inhibidor de corrosion", "Aplicar puente de adherencia", "Reconstruir con mortero de reparacion", "Aplicar proteccion superficial"]
      }
    ]
  },
  {
    id: "asentamiento",
    falla: "Asentamiento Diferencial",
    descripcion: "Movimiento desigual de la cimentacion que causa grietas diagonales en muros, desplome de elementos y deformacion de marcos.",
    nivel_tipico: "critico",
    metodos: [
      {
        nombre: "Micropilotes",
        descripcion: "Perforacion e instalacion de pilotes de pequeno diametro para transferir cargas a estratos resistentes.",
        cuando_usar: "Suelo con capacidad insuficiente en los primeros metros de profundidad.",
        materiales: ["Tubo de acero de perforacion", "Lechada de cemento", "Barra de acero central", "Cabezal de conexion"],
        pasos: ["Estudio geotecnico del subsuelo", "Disenar micropilotes segun cargas", "Perforar hasta estrato resistente", "Insertar armadura", "Inyectar lechada de cemento", "Conectar micropilote a cimentacion existente"]
      },
      {
        nombre: "Inyeccion de Lechada (Grouting)",
        descripcion: "Inyeccion de lechada de cemento o quimica al suelo para mejorar su capacidad portante y rellenar vacios.",
        cuando_usar: "Suelos con vacios, cavidades o baja capacidad de soporte que causan asentamientos localizados.",
        materiales: ["Lechada de cemento o resina de poliuretano", "Tubos de inyeccion (manguitos)", "Bomba de inyeccion a presion", "Packer para sellado de perforaciones"],
        pasos: ["Estudio geotecnico para ubicar zonas de debilidad", "Perforar hasta la profundidad requerida segun estudio", "Instalar tubos de inyeccion con manguitos", "Inyectar lechada a presion controlada de abajo hacia arriba", "Monitorear presion y volumen durante inyeccion", "Verificar estabilizacion con mediciones topograficas", "Esperar tiempo de fraguado antes de aplicar cargas"]
      },
      {
        nombre: "Nivelacion con Gatos Hidraulicos",
        descripcion: "Uso de gatos hidraulicos para nivelar la estructura afectada por asentamiento y posterior calce de cimentacion.",
        cuando_usar: "Cuando la estructura se ha inclinado por asentamiento diferencial y requiere nivelacion antes de refuerzo.",
        materiales: ["Gatos hidraulicos de alta capacidad", "Calzas metalicas o de concreto", "Grout expansivo o no contractil", "Instrumentos de nivelacion topografica"],
        pasos: ["Apuntalar toda la estructura antes de iniciar", "Instalar gatos hidraulicos en puntos estrategicos de la cimentacion", "Elevar lentamente la estructura monitoreando constantemente con nivel topografico", "Elevar en incrementos de maximo 5 mm por ciclo para evitar danos", "Insertar calzas permanentes conforme se va nivelando", "Rellenar espacios con grout no contractil o expansivo", "Retirar gatos despues del fraguado del grout (minimo 7 dias)", "Verificar nivelacion final y monitorear durante 6 meses"]
      },
      {
        nombre: "Pilas de Cimentacion Profunda",
        descripcion: "Construccion de pilas de concreto reforzado perforadas hasta estrato firme para soportar cargas de la estructura.",
        cuando_usar: "Cuando el suelo superficial es muy debil y se requiere transmitir cargas a gran profundidad (mas de 15 metros).",
        materiales: ["Concreto estructural f'c >= 250 kg/cm2", "Acero de refuerzo (armadura)", "Equipo de perforacion rotatoria", "Bentonita o polimero estabilizador", "Cabezal de conexion a cimentacion"],
        pasos: ["Realizar estudio geotecnico completo con perforaciones de sondeo", "Disenar pilas segun cargas actuantes y capacidad del estrato resistente", "Perforar con equipo rotatorio usando lodo bentonitico para estabilizar paredes", "Colocar armadura de acero prefabricada", "Colar concreto por metodo Tremie (de fondo hacia arriba)", "Conectar cabezal de pila a cimentacion existente mediante dados de concreto", "Curar y esperar minimo 28 dias antes de transferir cargas"]
      }
    ]
  },
  {
    id: "grietas_muros",
    falla: "Grietas en Muros de Mamposteria",
    descripcion: "Grietas en muros de tabique o block por movimiento estructural, asentamiento o sismo.",
    nivel_tipico: "medio",
    metodos: [
      {
        nombre: "Inyeccion de Mortero",
        descripcion: "Inyeccion de mortero fluido en grietas de muros de mamposteria para restaurar integridad.",
        cuando_usar: "Grietas finas a moderadas (hasta 5mm) en muros no estructurales o divisorios.",
        materiales: ["Mortero fluido de inyeccion", "Puertos de inyeccion", "Sellador superficial", "Bomba manual de inyeccion"],
        pasos: ["Limpiar la grieta", "Instalar puertos cada 20-30 cm", "Sellar superficie", "Inyectar mortero a baja presion", "Dejar fraguar 48 horas", "Retirar puertos y resanar"]
      },
      {
        nombre: "Malla y Aplanado Reforzado",
        descripcion: "Aplicacion de malla de acero electrosoldada con aplanado de mortero para reforzar el muro completo.",
        cuando_usar: "Dano extenso en el muro o cuando se requiere refuerzo sismico.",
        materiales: ["Malla electrosoldada 6x6-10/10", "Mortero 1:4 cemento-arena", "Conectores de anclaje", "Clavo de acero para fijacion"],
        pasos: ["Retirar aplanado existente", "Limpiar superficie del muro", "Fijar malla con conectores cada 40cm", "Humedecer superficie", "Aplicar primera capa de mortero (1cm)", "Aplicar segunda capa (1cm)", "Curar con agua por 7 dias"]
      }
    ]
  },
  {
    id: "desprendimiento",
    falla: "Desprendimiento de Recubrimiento",
    descripcion: "Caida o separacion de trozos de concreto del elemento, exponiendo el acero de refuerzo.",
    nivel_tipico: "medio",
    metodos: [
      {
        nombre: "Parcheo con Mortero Polimerico",
        descripcion: "Reparacion de areas con recubrimiento perdido mediante mortero de alta adherencia.",
        cuando_usar: "Areas de desprendimiento menores a 0.5 m2 sin dano al acero.",
        materiales: ["Mortero polimerico de reparacion", "Puente de adherencia", "Proteccion anticorrosiva para acero", "Membrana de curado"],
        pasos: ["Retirar concreto suelto completamente", "Cortar bordes en angulo recto", "Limpiar acero si esta expuesto", "Aplicar proteccion al acero", "Aplicar puente de adherencia", "Colocar mortero en capas de 15mm", "Aplicar membrana de curado"]
      }
    ]
  },
  {
    id: "humedad",
    falla: "Humedad y Filtraciones",
    descripcion: "Presencia de agua o humedad persistente en elementos de concreto, causando deterioro progresivo.",
    nivel_tipico: "bajo",
    metodos: [
      {
        nombre: "Impermeabilizacion Integral",
        descripcion: "Aplicacion de sistemas impermeabilizantes para detener infiltraciones y proteger el concreto.",
        cuando_usar: "Filtraciones activas o humedad recurrente en losas, muros de contencion o sotanos.",
        materiales: ["Impermeabilizante cristalino", "Sellador de grietas poliuretano", "Membrana impermeabilizante", "Dren interior si aplica"],
        pasos: ["Identificar origen de la filtracion", "Sellar grietas activas con poliuretano", "Preparar superficie (saturar con agua)", "Aplicar impermeabilizante cristalino", "Segunda capa a las 24 horas", "Curar con humedad por 3 dias"]
      }
    ]
  },
  {
    id: "losa_agrietada",
    falla: "Losa Agrietada",
    descripcion: "Grietas en losas de entrepiso o azotea por flexion excesiva, sobrecarga o contraccion del concreto.",
    nivel_tipico: "medio",
    metodos: [
      {
        nombre: "Refuerzo con CFRP por Debajo",
        descripcion: "Laminas de fibra de carbono adheridas en la cara inferior de la losa para aumentar resistencia a flexion.",
        cuando_usar: "Losas con deflexion excesiva o capacidad insuficiente para nuevas cargas.",
        materiales: ["Laminas CFRP", "Adhesivo epoxicol", "Primer", "Proteccion contra fuego si se requiere"],
        pasos: ["Apuntalar losa si es necesario", "Preparar superficie inferior", "Aplicar primer epoxicol", "Adherir laminas de CFRP", "Presionar para eliminar burbujas", "Curar 7 dias antes de retirar apuntalamiento"]
      },
      {
        nombre: "Sobrelosa de Refuerzo",
        descripcion: "Capa adicional de concreto armado colada sobre la losa existente para incrementar su capacidad.",
        cuando_usar: "Cuando se requiere aumentar significativamente la capacidad de la losa.",
        materiales: ["Concreto f'c=250 kg/cm2", "Malla electrosoldada o varillas", "Conectores de cortante", "Puente de adherencia"],
        pasos: ["Apuntalar la losa", "Picar superficie para generar rugosidad", "Instalar conectores de cortante", "Colocar refuerzo (malla o varillas)", "Aplicar puente de adherencia", "Colar concreto (espesor minimo 5cm)", "Curar 28 dias"]
      }
    ]
  },
  {
    id: "cimentacion",
    falla: "Cimentacion Danada",
    descripcion: "Danos en zapatas, losa de cimentacion o pilas por asentamiento, sobrecarga o deterioro del material.",
    nivel_tipico: "critico",
    metodos: [
      {
        nombre: "Ampliacion de Zapatas",
        descripcion: "Incremento del area de la zapata existente para reducir presiones sobre el suelo.",
        cuando_usar: "Zapatas subdimensionadas o incremento de cargas en la estructura.",
        materiales: ["Concreto estructural", "Acero de refuerzo", "Conectores de cortante", "Material de relleno compactado"],
        pasos: ["Excavar alrededor de zapata existente", "Apuntalar estructura si es necesario", "Picar superficie de zapata existente", "Perforar e instalar conectores", "Colocar acero de refuerzo", "Cimbrar y colar concreto", "Curar y rellenar excavacion"]
      }
    ]
  },

  // === METODOS DEL DOCUMENTO "CRITERIOS DE DISENO Y DETALLES ESTRUCTURALES" ===

  {
    id: "refuerzo_emergencia",
    falla: "Refuerzo de Emergencia",
    descripcion: "Intervencion inmediata en caso de colapso, sobrecargas excesivas o incendios. Procedimientos rapidos para estabilizar la estructura.",
    nivel_tipico: "critico",
    metodos: [
      {
        nombre: "Laminas Metalicas Soldadas",
        descripcion: "Refuerzo de emergencia provisional mediante angulos y laminas metalicas soldadas en columnas y vigas.",
        cuando_usar: "Caso de colapso inminente, sobrecargas excesivas o dano por incendio que requiere intervencion inmediata.",
        materiales: ["Angulos metalicos estructurales", "Laminas y placas de acero", "Equipo de soldadura", "Puntales telescopicos"],
        pasos: ["Ajustar angulos metalicos en las aristas de columnas y vigas", "Calentar las laminas a aproximadamente 100 C", "Soldar las laminas y placas que haran funcion de estribos y armadura principal a los angulos", "Con el enfriamiento a temperatura ambiente ocurre compresion del elemento (garantiza adherencia)", "Verificar estabilidad del refuerzo provisional"]
      },
      {
        nombre: "Hormigon Lanzado en Columnas",
        descripcion: "Envolvimiento con armadura helicoidal y aplicacion de hormigon lanzado (shotcrete) con acelerador de fraguado.",
        cuando_usar: "Columnas cizalladas o severamente danadas que requieren estabilizacion rapida.",
        materiales: ["Armadura de refuerzo helicoidal", "Hormigon lanzado (shotcrete)", "Aditivo acelerador de fraguado", "Malla de refuerzo"],
        pasos: ["Evaluar y asegurar el area de trabajo", "Envolver la columna con armadura de refuerzo helicoidal", "Preparar mezcla de hormigon lanzado con aditivo acelerador", "Aplicar hormigon lanzado en capas sucesivas de 5 cm", "Alternativa: envolver con placas y laminas metalicas soldadas"]
      },
      {
        nombre: "Refuerzo de Emergencia en Muros",
        descripcion: "Fijacion de malla y aplicacion de hormigon lanzado para estabilizacion rapida de muros danados.",
        cuando_usar: "Muros de hormigon o albanileria con dano severo que amenazan colapso.",
        materiales: ["Malla de refuerzo", "Hormigon lanzado premezclado", "Aditivo acelerador de fraguado", "Conectores de fijacion"],
        pasos: ["Fijar una malla a la superficie del muro", "Preparar hormigon lanzado con aditivo acelerador de fraguado", "Lanzar hormigon sobre la malla en capas uniformes", "Puede usarse material premezclado y ensacado para facilitar operaciones en sitio", "La reparacion definitiva debera seguir procedimientos especificos del manual"]
      }
    ]
  },
  {
    id: "refuerzo_vigas_flexion",
    falla: "Vigas con Dano por Flexion",
    descripcion: "Vigas que requieren refuerzo por perdida de capacidad a flexion, deflexion excesiva o aumento de cargas. Procedimientos del documento Criterios de Diseno.",
    nivel_tipico: "alto",
    metodos: [
      {
        nombre: "Refuerzo con Microhormigon Fluido",
        descripcion: "Recrecimiento de la seccion de la viga con microhormigon fluido de alta resistencia para secciones menores a 30 cm.",
        cuando_usar: "Refuerzos donde la mayor dimension de la seccion no supera los 30 cm.",
        materiales: ["Microhormigon fluido", "Adhesivo epoxi de baja viscosidad (puente de adherencia)", "Expansor de anclaje poliester tixotropico", "Acero de refuerzo longitudinal", "Cimbra hermetica y rigida"],
        pasos: ["Apuntalar la estructura descargando la viga", "Demoler hormigon con superficie en pendiente 3 a 1, escarificar", "Aplicar puente de adherencia (adhesivo epoxi baja viscosidad) sobre sustrato seco", "Perforar viga y colocar nuevos estribos a minimo 20 cm de cara inferior", "Colocar acero de refuerzo longitudinal distanciado ~1 cm vertical, ~2 cm horizontal", "Fijar puntas del acero a pilares con expansor de anclaje (longitud minima 5 cm)", "Preparar microhormigon: agua/polvo 0.12 a 0.14, mezclar 3+3 minutos", "Instalar cimbra, aplicar adhesivo epoxi, verter microhormigon por un solo lado sin interrupcion", "Descimbrar despues de 48 horas minimo", "Curado humedo 7 dias o membrana acrilica. Evitar sol directo primeras 30 horas", "Retirar puntales despues de 7 dias"]
      },
      {
        nombre: "Refuerzo con Hormigon Convencional",
        descripcion: "Aumento de seccion de viga con hormigon convencional para cualquier dimension de refuerzo.",
        cuando_usar: "Refuerzos con cualquier dimension donde se dispone de espacio para cimbra.",
        materiales: ["Hormigon con relacion a/c <= 0.50", "Aditivo superfluidificante", "Adhesivo epoxi baja viscosidad", "Acero de refuerzo", "Cimbra hermetica", "Vibradores"],
        pasos: ["Apuntalar estructura descargando la viga", "Preparar sustrato seco con puente de adherencia epoxi", "Colocar acero de refuerzo nuevo distanciado del existente", "Preparar hormigon: a/c <= 0.50, revenimiento 10-15 cm, superfluidificante", "Instalar cimbra, aplicar epoxi, colar hormigon y compactar con vibradores", "Terminacion con mortero polimerico de baja contraccion", "Curado saturado con agua por 14 dias", "Retirar puntales despues de 21 dias"]
      },
      {
        nombre: "Refuerzo con Hormigon Lanzado",
        descripcion: "Aplicacion de hormigon proyectado (shotcrete) para refuerzo de vigas sin necesidad de cimbra.",
        cuando_usar: "Refuerzos de cualquier dimension, especialmente cuando el acceso para cimbra es limitado.",
        materiales: ["Hormigon lanzado (agregado grueso <= 19 mm)", "Aditivo acelerador de fraguado", "Acero de refuerzo", "Membrana de curado acrilica"],
        pasos: ["Apuntalar la estructura", "Saturar sustrato dejando superficie seca sin encharcamientos", "Preparar mezcla: dosificacion 1:2 a 2.5 (cemento:arena+agregado), a/c 0.35-0.50", "Iniciar lanzado por cantos y cavidades, revistiendo el acero de refuerzo", "Aplicar capas sucesivas de 5 cm hasta alcanzar espesor deseado", "Usar aditivo acelerador de fraguado para disminuir rebote", "Eliminar sobrantes con enrasado", "Curado humedo 14 dias. Evitar sol directo primeras 30 horas"]
      },
      {
        nombre: "Laminas Metalicas Adheridas con Epoxi",
        descripcion: "Placas de acero adheridas con adhesivo epoxi para refuerzo permanente de flexion en vigas.",
        cuando_usar: "Refuerzos permanentes donde se requiere mantener la geometria original. No usar a temperaturas > 55 C.",
        materiales: ["Placas de acero (espesor max 4 mm)", "Adhesivo epoxi baja viscosidad", "Adhesivo epoxi para tratamiento de acero", "Tornillos y tuercas de anclaje", "Expansor de anclaje poliester tixotropico", "Puntales telescopicos"],
        pasos: ["Eliminar revestimientos de pintura y mortero, escarificar hormigon", "Preparar superficie plana y rugosa, rellenar cavidades con mortero epoxi tixotropico", "Preparar placas con chorro de arena o lijado electrico (max 2 horas antes)", "Preparar adhesivo: mezclar endurecedor + resina por 3 minutos", "Hacer orificios de 3 mm cada 15 cm en las placas para escape de aire", "Aplicar adhesivo epoxi en superficie de hormigon (2-3 mm de espesor)", "Aplicar adhesivo de tratamiento en superficie de las placas", "Presionar placas con tornillos y puntales hasta espesor adhesivo < 1.5 mm", "Retirar apuntalamiento despues de 48 horas", "Poner en carga despues de 7 dias"]
      }
    ]
  },
  {
    id: "refuerzo_vigas_cortante",
    falla: "Vigas con Dano por Cortante",
    descripcion: "Vigas que presentan grietas diagonales por esfuerzos cortantes excesivos. Procedimientos de refuerzo del documento Criterios de Diseno.",
    nivel_tipico: "alto",
    metodos: [
      {
        nombre: "Refuerzo con Mortero Epoxi",
        descripcion: "Insercion de acero adicional en ranuras rellenas con mortero epoxi para aumentar capacidad a cortante conservando geometria.",
        cuando_usar: "Cuando se requiere conservar la geometria original de la viga.",
        materiales: ["Mortero tixotropico de base epoxi", "Varilla corrugada de refuerzo", "Adhesivo epoxi baja viscosidad", "Expansor de anclaje poliester tixotropico", "Cortadora de disco"],
        pasos: ["Cortar ranura con cortadora de disco: <= 0.5 cm verticales, >= 1.0 cm horizontales", "Escarificar ranura de 3x3 cm", "Limpiar superficie con chorro de aire seco comprimido y acetona", "Lijar y limpiar acero de refuerzo hasta condicion de metal blanco", "Preparar mortero epoxi: mezclar endurecedor + resina 3 min, agregar agregados 3 min mas", "Aplicar puente de adherencia epoxi respetando tiempo de manipulacion", "Colocar varilla corrugada con anclaje recto o ganchos (expansor poliester tixotropico)", "Llenar ranura con mortero epoxi tixotropico, compactar correctamente", "Terminacion con frota metalica", "Poner en carga despues de 7 dias. Proteger del sol primeras 5 horas"]
      },
      {
        nombre: "Placas Metalicas para Cortante",
        descripcion: "Placas de acero adheridas con epoxi orientadas al refuerzo de cortante en vigas. Refuerzo permanente.",
        cuando_usar: "Refuerzos permanentes de cortante donde se requiere mantener estetica y geometria. No usar > 55 C.",
        materiales: ["Placas de acero (espesor max 4 mm, orificios 3 mm cada 15 cm)", "Adhesivo epoxi baja viscosidad", "Adhesivo epoxi para tratamiento de acero", "Tornillos y tuercas", "Puntales telescopicos"],
        pasos: ["Eliminar revestimientos y escarificar hormigon, obtener superficie plana y rugosa", "Preparar placas con chorro de arena max 2 horas antes de colocar", "Mezclar componentes del adhesivo por 3 minutos", "Aplicar adhesivo epoxi en hormigon (2-3 mm) y en placas (tratamiento de acero)", "Presionar placas con tornillos y puntales telescopicos hasta adhesivo < 1.5 mm", "Retirar apuntalamiento despues de 48 horas", "Eliminar sobrantes de adhesivo antes del endurecimiento", "Poner en carga despues de 7 dias"]
      }
    ]
  },
  {
    id: "refuerzo_vigas_torsion",
    falla: "Vigas con Dano por Torsion",
    descripcion: "Vigas sometidas a esfuerzos de torsion que presentan grietas helicoidales o dano por giro. Procedimientos del documento Criterios de Diseno.",
    nivel_tipico: "alto",
    metodos: [
      {
        nombre: "Mortero o Microhormigon Fluido para Torsion",
        descripcion: "Recrecimiento de seccion con mortero fluido (espesor <= 6 cm) o microhormigon fluido (espesor <= 30 cm).",
        cuando_usar: "Vigas con dano por torsion donde se requiere aumentar la seccion. Mortero para espesores hasta 6 cm, microhormigon hasta 30 cm.",
        materiales: ["Mortero fluido de base cemento o microhormigon fluido", "Adhesivo epoxi baja viscosidad", "Acero de refuerzo longitudinal", "Expansor de anclaje poliester tixotropico", "Cimbra hermetica"],
        pasos: ["Apuntalar estructura descargando la viga", "Demoler hormigon con inclinacion 3 a 1, escarificar, dejar seco", "Aplicar puente de adherencia (adhesivo epoxi baja viscosidad)", "Colocar acero longitudinal distanciado ~1 cm vertical, ~2 cm horizontal", "Anclar puntas a pilares con expansor poliester tixotropico (minimo 6 cm)", "Preparar mezcla: agua/polvo 0.12-0.14 (mortero) o 0.12 (microhormigon)", "Instalar cimbra, aplicar epoxi, verter por un solo lado hasta que aparezca del otro", "Descimbrar despues de 48 horas, cortar sobrantes de abajo hacia arriba", "Curado humedo 7 dias. Evitar sol directo primeras 36 horas", "Retirar puntales despues de 7 dias"]
      },
      {
        nombre: "Hormigon Colado para Torsion",
        descripcion: "Refuerzo de torsion con hormigon convencional colado en cimbra para cualquier dimension.",
        cuando_usar: "Refuerzos de torsion de cualquier dimension donde se dispone de espacio para cimbra.",
        materiales: ["Hormigon con a/c 0.50, revenimiento 10-15 cm", "Aditivo superplastificante", "Adhesivo epoxi baja viscosidad", "Acero de refuerzo longitudinal", "Cimbra", "Vibradores"],
        pasos: ["Apuntalar estructura", "Preparar sustrato seco con adhesivo epoxi de baja viscosidad", "Colocar acero longitudinal distanciado del existente", "Anclar a pilares con expansor poliester (minimo 6 cm)", "Preparar hormigon: a/c 0.50, superplastificante, agregado grueso 1/4 menor dimension", "Cimbrar, colar por un solo lado hasta aparecer del otro, vibrar", "Curado saturado 14 dias o membrana acrilica", "Retirar puntales despues de 21 dias"]
      }
    ]
  },
  {
    id: "proteccion_armaduras",
    falla: "Proteccion de Armaduras (Corrosion Avanzada)",
    descripcion: "Tecnicas electroquimicas de proteccion y reparacion para estructuras con corrosion avanzada de armaduras de acero en hormigon.",
    nivel_tipico: "alto",
    metodos: [
      {
        nombre: "Proteccion Catodica (PC)",
        descripcion: "Tecnica electroquimica para detener la corrosion del acero de refuerzo mediante corriente electrica aplicada.",
        cuando_usar: "Estructuras con corrosion activa generalizada, especialmente en ambientes marinos, sumergidos o con exposicion a cloruros. Norma EN 12696.",
        materiales: ["Anodos de sacrificio o sistema de corriente impresa", "Fuente de corriente continua (si es impresa)", "Electrodos de referencia", "Cableado y conexiones electricas", "Sistema de monitoreo"],
        pasos: ["Evaluacion del estado de corrosion y extension del dano", "Disenar sistema catodico segun condiciones del elemento", "Instalar anodos (sacrificio) o anodos inertes (corriente impresa)", "Conectar sistema electrico y electrodos de referencia", "Ajustar corriente de proteccion segun criterios de la norma EN 12696", "Monitorear periodicamente el potencial de proteccion", "Mantenimiento regular del sistema"]
      },
      {
        nombre: "Extraccion Electroquimica de Cloruros (EEC)",
        descripcion: "Proceso electroquimico para remover iones cloruro del hormigon contaminado sin demoler el concreto.",
        cuando_usar: "Estructuras contaminadas por cloruros (ambiente marino, sales de deshielo) donde la demolicion no es viable.",
        materiales: ["Anodo temporal externo", "Electrolito (solucion de agua)", "Fuente de corriente continua", "Celulosa o material absorbente", "Sistema de monitoreo de cloruros"],
        pasos: ["Analizar concentracion de cloruros en el hormigon", "Instalar anodo temporal sobre la superficie", "Aplicar electrolito entre anodo y superficie del hormigon", "Aplicar corriente continua durante 4-8 semanas", "Los iones cloruro migran del hormigon hacia el anodo", "Monitorear reduccion de cloruros periodicamente", "Retirar sistema cuando concentracion sea aceptable"]
      },
      {
        nombre: "Realcalinizacion (RAE)",
        descripcion: "Tecnica electroquimica para restaurar la alcalinidad del hormigon carbonatado y repasivar las armaduras.",
        cuando_usar: "Estructuras donde el hormigon ha perdido su alcalinidad por carbonatacion, causando inicio de corrosion.",
        materiales: ["Anodo temporal externo", "Solucion alcalina (carbonato de sodio)", "Fuente de corriente continua", "Material absorbente", "Indicador de pH (fenolftaleina)"],
        pasos: ["Evaluar profundidad de carbonatacion con fenolftaleina", "Instalar anodo temporal sobre la superficie", "Aplicar solucion alcalina entre anodo y hormigon", "Aplicar corriente continua durante 1-2 semanas", "Los iones alcalinos penetran en el hormigon restaurando el pH", "Verificar realcalinizacion con indicadores", "Retirar sistema y aplicar proteccion superficial"]
      }
    ]
  },
  {
    id: "reparacion_superficial",
    falla: "Reparaciones Superficiales de Hormigon",
    descripcion: "Procedimientos para reparar danos superficiales localizados o generalizados en elementos de hormigon armado. Basado en Criterios de Diseno Cap. 6.",
    nivel_tipico: "medio",
    metodos: [
      {
        nombre: "Reparacion Superficial Localizada",
        descripcion: "Intervencion en areas especificas con dano superficial limitado (desprendimientos, desgaste, impactos menores).",
        cuando_usar: "Dano superficial en areas pequenas y delimitadas, sin afectacion del acero de refuerzo.",
        materiales: ["Mortero de reparacion polimerico", "Puente de adherencia epoxi", "Proteccion superficial", "Herramienta de escarificacion", "Membrana de curado"],
        pasos: ["Delimitar el area danada con corte perimetral", "Retirar hormigon deteriorado hasta llegar a material sano", "Escarificar la superficie para mejorar adherencia", "Limpiar con aire comprimido, eliminar polvo y particulas sueltas", "Aplicar puente de adherencia (adhesivo epoxi baja viscosidad)", "Aplicar mortero de reparacion en capas de maximo 15 mm", "Dar terminacion acorde al acabado original", "Aplicar membrana de curado o curado humedo por 7 dias"]
      },
      {
        nombre: "Reparacion Superficial Generalizada",
        descripcion: "Intervencion en grandes superficies con dano extendido por deterioro, exposicion ambiental o carbonatacion.",
        cuando_usar: "Dano superficial extendido en grandes areas de elementos estructurales.",
        materiales: ["Mortero de reparacion proyectable o aplicable", "Puente de adherencia epoxi", "Malla de refuerzo si se requiere", "Proteccion superficial impermeabilizante", "Equipo de proyeccion si aplica"],
        pasos: ["Evaluar la extension total del dano superficial", "Retirar hormigon deteriorado en toda el area afectada", "Escarificar superficie para generar rugosidad adecuada", "Limpiar completamente la superficie", "Aplicar puente de adherencia sobre sustrato preparado", "Aplicar mortero de reparacion en capas uniformes", "Si el area es grande, considerar proyeccion mecanica", "Dar acabado final y aplicar proteccion superficial", "Curado humedo por minimo 7 dias"]
      }
    ]
  },
  {
    id: "reparacion_profunda",
    falla: "Reparaciones Profundas de Hormigon",
    descripcion: "Procedimientos para reparar danos profundos que afectan el nucleo del elemento y pueden comprometer el acero de refuerzo. Basado en Criterios de Diseno Cap. 6.",
    nivel_tipico: "alto",
    metodos: [
      {
        nombre: "Reparacion Profunda Localizada",
        descripcion: "Intervencion en areas especificas con dano que alcanza o supera el acero de refuerzo.",
        cuando_usar: "Dano profundo en areas delimitadas con exposicion o afectacion del acero de refuerzo.",
        materiales: ["Mortero de reparacion de alta resistencia", "Puente de adherencia epoxi", "Proteccion anticorrosiva para acero", "Inhibidor de corrosion", "Cimbra si se requiere", "Concreto de reparacion"],
        pasos: ["Delimitar area y demoler hormigon hasta 25 mm detras del acero de refuerzo", "Limpiar acero expuesto hasta grado Sa 2.5 (metal blanco)", "Evaluar perdida de seccion del acero (si > 25%, requiere refuerzo adicional)", "Aplicar inhibidor de corrosion al acero", "Aplicar proteccion anticorrosiva", "Aplicar puente de adherencia al sustrato de hormigon", "Colocar mortero o concreto de reparacion en capas adecuadas", "Si la profundidad es grande, usar cimbra y concreto colado", "Curar por minimo 7 dias (mortero) o 28 dias (concreto)"]
      },
      {
        nombre: "Reparacion Profunda Generalizada",
        descripcion: "Intervencion en grandes areas con dano profundo extendido, requiriendo reconstruccion significativa del elemento.",
        cuando_usar: "Dano profundo extendido que afecta grandes porciones del elemento estructural.",
        materiales: ["Concreto de alta resistencia", "Acero de refuerzo adicional si es necesario", "Puente de adherencia epoxi", "Conectores de cortante", "Cimbra rigida", "Vibradores"],
        pasos: ["Apuntalar la estructura si es necesario", "Demoler todo el hormigon danado hasta material sano", "Limpiar y evaluar todo el acero de refuerzo expuesto", "Reparar o reemplazar acero danado", "Instalar conectores de cortante si se requiere", "Aplicar puente de adherencia al sustrato sano", "Instalar cimbra rigida y hermetica", "Colar concreto de alta resistencia con vibracion adecuada", "Descimbrar despues de 48 horas minimo", "Curado saturado por 14-28 dias segun especificacion"]
      },
      {
        nombre: "Reparacion de Pilotes mediante Encamisetado",
        descripcion: "Envolvimiento de pilotes danados con camisa de concreto o metal para restaurar capacidad estructural.",
        cuando_usar: "Pilotes con dano por corrosion, impacto o deterioro que requieren restauracion de su seccion y capacidad.",
        materiales: ["Camisa metalica o cimbra circular", "Concreto o grout de alta resistencia", "Proteccion anticorrosiva", "Conectores de anclaje", "Equipo de inyeccion si es necesario"],
        pasos: ["Limpiar superficie del pilote eliminando material suelto", "Tratar acero expuesto con proteccion anticorrosiva", "Instalar camisa metalica o cimbra alrededor del pilote", "Sellar la base de la camisa para evitar fugas", "Inyectar grout o colar concreto entre camisa y pilote", "Asegurar vibracion o flujo adecuado para evitar vacios", "Aplicar proteccion anticorrosiva exterior si es camisa metalica", "Curar segun especificaciones del material utilizado"]
      }
    ]
  },
  {
    id: "empalmes_anclajes",
    falla: "Empalmes y Anclajes de Acero",
    descripcion: "Procedimientos para empalmes por traslape, soldadura y sistemas de anclaje adhesivo en acero de refuerzo. Basado en Criterios de Diseno Cap. 6.",
    nivel_tipico: "medio",
    metodos: [
      {
        nombre: "Empalme por Traslape",
        descripcion: "Union de barras de acero de refuerzo mediante traslape con longitud adecuada segun normativa.",
        cuando_usar: "Union de barras de refuerzo en zonas donde se permite traslape segun el diseno estructural.",
        materiales: ["Barras de acero corrugado del mismo diametro", "Alambre de amarre", "Separadores"],
        pasos: ["Verificar longitud de traslape requerida segun diametro y resistencia", "Preparar barras con extremos rectos y limpios", "Traslapar barras con longitud especificada por el diseno", "Amarrar con alambre de amarre en varios puntos", "Asegurar recubrimiento minimo especificado", "Verificar alineacion y posicion correcta"]
      },
      {
        nombre: "Empalme por Soldadura",
        descripcion: "Union de barras de acero de refuerzo mediante soldadura calificada segun normativa.",
        cuando_usar: "Cuando el traslape no es viable por espacio o cuando se requiere continuidad total del refuerzo.",
        materiales: ["Barras de acero soldable", "Electrodo de soldadura compatible", "Equipo de soldadura calificado", "Equipo de proteccion personal"],
        pasos: ["Verificar soldabilidad del acero (composicion quimica adecuada)", "Preparar extremos de las barras (biselado si se requiere)", "Precalentar si el diametro de barra lo requiere", "Realizar soldadura segun procedimiento calificado", "Inspeccionar soldadura visualmente", "Realizar ensayos no destructivos si se especifica", "Proteger la junta contra corrosion si esta expuesta"]
      },
      {
        nombre: "Sistema de Anclaje Adhesivo",
        descripcion: "Fijacion de barras de acero en hormigon existente mediante perforacion e inyeccion de adhesivo epoxi o poliester.",
        cuando_usar: "Para anclar refuerzo nuevo en elementos de hormigon existentes (ampliaciones, refuerzos, conexiones).",
        materiales: ["Barras de acero corrugado", "Adhesivo de anclaje (epoxi o poliester tixotropico)", "Broca del diametro adecuado", "Equipo de perforacion", "Cepillo para limpieza de perforacion"],
        pasos: ["Perforar hormigon con diametro y profundidad segun diseno", "Limpiar la perforacion con cepillo y aire comprimido (3 veces minimo)", "Verificar que la perforacion este seca y libre de polvo", "Inyectar adhesivo desde el fondo de la perforacion hacia afuera", "Insertar barra de acero con movimiento rotatorio", "Verificar que el adhesivo rellene completamente el espacio anular", "No mover la barra durante el tiempo de curado del adhesivo", "Tiempo de curado tipico: 24-48 horas segun producto y temperatura"]
      }
    ]
  }
];
