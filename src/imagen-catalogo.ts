/**
 * Catalogo de imagenes de referencia del documento tecnico
 * "Criterios de Diseno y Detalles Estructurales"
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
];

/** Genera la lista compacta de imagenes para el system prompt */
export function generarListaImagenes(): string {
  return CATALOGO_IMAGENES.map(img => `${img.id}: ${img.descripcion}`).join("\n");
}

/** Busca una imagen por su ID */
export function buscarImagen(id: string): ImagenReferencia | undefined {
  return CATALOGO_IMAGENES.find(img => img.id === id);
}
