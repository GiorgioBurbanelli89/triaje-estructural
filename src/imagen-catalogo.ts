/**
 * Catalogo de imagenes de referencia de los documentos tecnicos:
 * 1. "Criterios de Diseno y Detalles Estructurales" (prefijo p)
 * 2. FEMA 547 "Rehabilitacion Sismica" (prefijo f)
 * 3. "Guia Reparacion Estructuras ACI 224" (prefijo g)
 * Cada imagen esta mapeada a su figura y descripcion para que la IA seleccione la mas relevante.
 */

export interface ImagenReferencia {
  id: string;
  archivo: string;
  figura: string;
  descripcion: string;
}

export const CATALOGO_IMAGENES: ImagenReferencia[] = [
  { id: "p4", archivo: "pagina_4_img_1.png", figura: "Fig 6.6", descripcion: "Reparacion en losas, vigas y superficies verticales - preparacion y mezcla de materiales" },
  { id: "p9", archivo: "pagina_9_img_1.png", figura: "Fig 6.6.8", descripcion: "Grout en reparaciones sumergidas" },
  { id: "p10", archivo: "pagina_10_img_1.png", figura: "Fig 6.6.9", descripcion: "Sobrecapas (overlays) - materiales de reparacion: cemento portland, latex, microsilice, mortero polimerico" },
  { id: "p11", archivo: "pagina_11_img_1.png", figura: "Fig 6.7.1", descripcion: "Reparaciones superficiales localizadas" },
  { id: "p12", archivo: "pagina_12_img_1.png", figura: "Fig 6.7.2", descripcion: "Reparaciones superficiales generalizadas" },
  { id: "p13", archivo: "pagina_13_img_1.png", figura: "Fig 6.7.3", descripcion: "Reparaciones profundas localizadas" },
  { id: "p14", archivo: "pagina_14_img_1.png", figura: "Fig 6.7.4", descripcion: "Reparaciones profundas localizadas (continuacion)" },
  { id: "p15", archivo: "pagina_15_img_1.png", figura: "Fig 6.7.5", descripcion: "Reparaciones profundas generalizadas - columnas tramo superior (inyeccion y llenado)" },
  { id: "p16", archivo: "pagina_16_img_1.png", figura: "Fig 6.7.6", descripcion: "Reparaciones profundas generalizadas (variante)" },
  { id: "p17", archivo: "pagina_17_img_1.png", figura: "Fig 6.7.7", descripcion: "Reparaciones profundas generalizadas - columnas tramo inferior" },
  { id: "p18", archivo: "pagina_18_img_1.png", figura: "Fig 6.7.8", descripcion: "Reparaciones profundas generalizadas (variante adicional)" },
  { id: "p19", archivo: "pagina_19_img_1.png", figura: "Fig 6.7.9", descripcion: "Reparaciones profundas generalizadas - vigas" },
  { id: "p20", archivo: "pagina_20_img_1.png", figura: "Fig 6.7.11", descripcion: "Reparaciones profundas generalizadas - losas y elementos horizontales" },
  { id: "p22", archivo: "pagina_22_img_1.png", figura: "Fig 6.7.13", descripcion: "Reparacion de pilotes mediante encamisetado" },
  { id: "p23", archivo: "pagina_23_img_1.png", figura: "Fig 6.7.14", descripcion: "Reparacion de pilotes mediante encamisetado (detalle)" },
  { id: "p24", archivo: "pagina_24_img_1.png", figura: "Fig 6.7.15", descripcion: "Fisuras y grietas sin movimiento - inyeccion" },
  { id: "p25", archivo: "pagina_25_img_1.png", figura: "Fig 6.7.16", descripcion: "Fisuras y grietas sin movimiento (detalle) y empalmes por traslape" },
  { id: "p26", archivo: "pagina_26_img_1.png", figura: "Fig 6.7.17", descripcion: "Detalle de empalmes por traslape" },
  { id: "p28", archivo: "pagina_28_img_1.png", figura: "Fig 6.7.17b", descripcion: "Empalmes por soldadura (detalle)" },
  { id: "p29", archivo: "pagina_29_img_1.png", figura: "Fig 6.7.18", descripcion: "Detalle de empalme por soldadura" },
  { id: "p30", archivo: "pagina_30_img_1.png", figura: "Fig 6.7.19", descripcion: "Detalle de anclaje - sistema de anclaje adhesivo" },
  { id: "p31", archivo: "pagina_31_img_1.png", figura: "Fig 6.7.20", descripcion: "Detalle distribucion de armadura y sistemas de proteccion contra corrosion (PC, EEC, RAE)" },
  { id: "p33", archivo: "pagina_33_img_1.png", figura: "Fig 8.8.1", descripcion: "Refuerzo de emergencia con laminas metalicas soldadas en columnas y vigas" },
  { id: "p34a", archivo: "pagina_34_img_1.png", figura: "Fig 8.8.2", descripcion: "Refuerzo de emergencia en vigas y losas - apuntalamiento" },
  { id: "p34b", archivo: "pagina_34_img_2.png", figura: "Fig 8.8.3", descripcion: "Refuerzo de emergencia en columnas y muros con hormigon lanzado (shotcrete)" },
  { id: "p35", archivo: "pagina_35_img_1.png", figura: "Fig 8.9.1", descripcion: "Refuerzo de flexion en vigas con microhormigon fluido" },
  { id: "p36", archivo: "pagina_36_img_1.png", figura: "Fig 8.9.2", descripcion: "Refuerzo de flexion en vigas con hormigon colado" },
  { id: "p37", archivo: "pagina_37_img_1.png", figura: "Fig 8.9.3", descripcion: "Refuerzo de flexion en vigas con hormigon lanzado (shotcrete)" },
  { id: "p38", archivo: "pagina_38_img_1.png", figura: "Fig 8.9.4", descripcion: "Refuerzo de flexion en vigas con laminas o placas metalicas adheridas con epoxi" },
  { id: "p40a", archivo: "pagina_40_img_1.png", figura: "Fig 8.9.6", descripcion: "Refuerzo de corte en vigas con laminas o placas metalicas adheridas con epoxi" },
  { id: "p40b", archivo: "pagina_40_img_2.png", figura: "Fig 8.9.7", descripcion: "Refuerzo de torsion en vigas con mortero o microhormigon fluido" },
  { id: "p41", archivo: "pagina_41_img_1.png", figura: "Fig 8.9.8", descripcion: "Refuerzo de torsion en vigas con hormigon colado" },
  { id: "p42", archivo: "pagina_42_img_1.png", figura: "Fig 8.9.9", descripcion: "Refuerzo de torsion en vigas con hormigon lanzado" },
  { id: "p43", archivo: "pagina_43_img_1.png", figura: "Fig 8.9.10", descripcion: "Refuerzo de torsion en vigas con laminas o placas metalicas adheridas con epoxi" },

  // ─── FEMA 547: Rehabilitacion Sismica ─────────────────
  { id: "f1", archivo: "fema_image1.png", figura: "FEMA 13.4.2-3", descripcion: "Refuerzo de viga de acoplamiento profunda en muro de corte - concreto nuevo con estribos X" },
  { id: "f2", archivo: "fema_image2.png", figura: "FEMA 13.4.2-3b", descripcion: "Detalle de transferencia de corte losa-muro de corte" },
  { id: "f5", archivo: "fema_image5.png", figura: "FEMA 12.4.3-1", descripcion: "Colector en diafragma de concreto - barras nuevas y dowels perforados" },
  { id: "f10", archivo: "fema_image10.png", figura: "FEMA 12.4.1-2B", descripcion: "Conexion tipica a viga de concreto existente con marco arriostrado" },
  { id: "f11", archivo: "fema_image11.png", figura: "FEMA 8.4.1-1", descripcion: "Conexion completamente soldada en marco arriostrado de acero (SCBF)" },
  { id: "f13", archivo: "fema_image13.png", figura: "FEMA 8.4.1-2", descripcion: "Conexion compacta de marco arriostrado de acero" },
  { id: "f15", archivo: "fema_image15.png", figura: "FEMA 12.4.3-3", descripcion: "Colector de concreto en viga existente - detalle de vaciado y estribos" },
  { id: "f17", archivo: "fema_image17.png", figura: "FEMA 12.4.4-1A", descripcion: "Rehabilitacion sismica de columna con encamisado FRP - rectangular con zonas de mejora" },
  { id: "f19", archivo: "fema_image19.png", figura: "FEMA 12.4.4-1B", descripcion: "Rehabilitacion sismica de columna circular con encamisado FRP" },
  { id: "f20", archivo: "fema_image20.png", figura: "FEMA 12.4.4-2a", descripcion: "Encamisado de columna de concreto con nueva capa de concreto armado" },
  { id: "f21", archivo: "fema_image21.png", figura: "FEMA 12.4.4-2b", descripcion: "Encamisado de columna con platinas de acero" },
  { id: "f23", archivo: "fema_image23.png", figura: "FEMA 8.4.5-1", descripcion: "Placa base modificada para resistir tension sismica columna-cimentacion" },
  { id: "f25", archivo: "fema_image25.png", figura: "FEMA 8.4.7-1", descripcion: "Empalme soldado de columna reforzado segun AISC sismico" },
  { id: "f27", archivo: "fema_image27.png", figura: "FEMA 5.4.1-6B", descripcion: "Conexion de revestimiento a estructura de madera con angulos de acero" },
  { id: "f31", archivo: "fema_image31.png", figura: "FEMA 5.4.1-13", descripcion: "Reduccion de altura efectiva de muro de corte esbelto con correa colectora" },
  { id: "f33", archivo: "fema_image33.png", figura: "FEMA 23.9.3-1", descripcion: "Mejoramiento del suelo bajo cimentacion superficial - inyeccion en suelo licuable" },
  { id: "f34", archivo: "fema_image34.png", figura: "FEMA 23.9.3-2", descripcion: "Seccion transversal de grout inyectado bajo zapata en suelo licuable" },

  // ─── Guia Reparacion Estructuras (ACI 224) ─────────────
  { id: "g1", archivo: "guia_image1.png", figura: "Guia Fig 1.1", descripcion: "Longitudes de traslape requeridas segun tipo de elemento estructural" },
  { id: "g5", archivo: "guia_image5.png", figura: "Guia Fig 1.2", descripcion: "Tipos de traslape de barras en elementos verticales (columnas)" },
  { id: "g8", archivo: "guia_image8.png", figura: "Guia Fig 2.1", descripcion: "Encofrado y vaciado en vigas y columnas - equipo y herramientas" },
  { id: "g9", archivo: "guia_image9.png", figura: "Guia Fig 3.1", descripcion: "Empaquetamiento seco (Dry Packing) en cavidad vertical" },
  { id: "g10", archivo: "guia_image10.png", figura: "Guia Fig 4.1", descripcion: "Inyeccion de grout entre agregado precolocado - proceso progresivo" },
  { id: "g11", archivo: "guia_image11.png", figura: "Guia Fig 5.1", descripcion: "Concreto lanzado (shotcrete) via seca - proceso en boquilla" },
  { id: "g12", archivo: "guia_image12.png", figura: "Guia Fig 5.2", descripcion: "Concreto lanzado (shotcrete) via humeda - esquema del proceso" },
  { id: "g13", archivo: "guia_image13.png", figura: "Guia Fig 6.1", descripcion: "Inyeccion de fisuras y grietas - en vigas, losas y muros con equipo" },
  { id: "g14", archivo: "guia_image14.png", figura: "Guia Fig 7.1", descripcion: "Grout en reparaciones sumergidas - encofrado hermetico para pilotes" },
  { id: "g17", archivo: "guia_image17.png", figura: "Guia Fig 9.1", descripcion: "Reparacion manual con mortero de reparacion" },
  { id: "g28", archivo: "guia_image28.png", figura: "Guia Fig 9.4", descripcion: "Reparacion de viga - refuerzo de seccion en zona danada" },
  { id: "g29", archivo: "guia_image29.png", figura: "Guia Fig 10.1", descripcion: "Patron de fisuras por retraccion hidraulica y termica" },
  { id: "g31", archivo: "guia_image31.png", figura: "Guia Fig 11.1", descripcion: "Fisuracion por reaccion alcalis-agregado - patron en red tipo cocodrilo" },
  { id: "g36", archivo: "guia_image36.png", figura: "Guia Fig 12.2", descripcion: "Fisuras por compresion en zona superior de viga" },
  { id: "g39", archivo: "guia_image39.png", figura: "Guia Fig 12.4", descripcion: "Fisuras de flexion en losa - vista inferior" },
  { id: "g40", archivo: "guia_image40.png", figura: "Guia Fig 12.5", descripcion: "Fisuras por torsion en losa - patron diagonal a 45 grados" },
  { id: "g41", archivo: "guia_image41.png", figura: "Guia Fig 12.6", descripcion: "Fisuras por torsion en viga - patron espiral" },
  { id: "g42", archivo: "guia_image42.png", figura: "Guia Fig 13.1", descripcion: "Corrosion por carbonatacion - descascaramiento y barras expuestas" },
  { id: "g43", archivo: "guia_image43.png", figura: "Guia Fig 14.1", descripcion: "Oquedades superficiales por consolidacion deficiente del hormigon" },
  { id: "g44", archivo: "guia_image44.png", figura: "Guia Fig 14.2", descripcion: "Oquedades por deficiencias en posicionamiento del acero" },
];

/** Genera la lista compacta de imagenes para el system prompt */
export function generarListaImagenes(): string {
  return CATALOGO_IMAGENES.map(img => `${img.id}: ${img.descripcion}`).join("\n");
}

/** Busca una imagen por su ID */
export function buscarImagen(id: string): ImagenReferencia | undefined {
  return CATALOGO_IMAGENES.find(img => img.id === id);
}
