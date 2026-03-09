/**
 * Base de conocimiento condensada del documento:
 * "CRITERIOS DE DISENO Y DETALLES ESTRUCTURALES"
 * Optimizada para reducir tokens en cada llamada a la API.
 */

export const CRITERIOS_DISENO_KNOWLEDGE = `
=== REFERENCIA: CRITERIOS DE DISENO Y DETALLES ESTRUCTURALES ===

CAP.6: REPARACIONES
- Superficiales: localizadas y generalizadas
- Profundas: localizadas, generalizadas, pilotes (encamisetado)
- Fisuras/grietas sin movimiento: inyeccion
- Empalmes: traslape, soldadura, anclaje adhesivo

CAP.7: PROTECCION ARMADURAS (corrosion)
Tecnicas electroquimicas: PC (proteccion catodica, norma EN 12696), EEC (extraccion de cloruros), RAE (realcalinizacion).

CAP.8: REFUERZOS ESTRUCTURALES

LAMINAS METALICAS CON EPOXI (8.7): Refuerzo permanente, no usar >55C. Sustrato escarificado, plano y rugoso. Placas: espesor max 4mm, orificios 3mm c/15cm, preparar con chorro de arena max 2h antes. Adhesivo epoxi 2-3mm, presionar a <1.5mm.

EMERGENCIA (8.8):
- Laminas soldadas: angulos en aristas, calentar a ~100C, soldar. Compresion por enfriamiento.
- Vigas/losas: apuntalar sin forzar. Preferible demoler losas y reconstruir.
- Columnas: armadura helicoidal + hormigon lanzado con acelerador. Muros: malla + hormigon lanzado.

REFUERZOS EN VIGAS (8.9) - 4 metodos por tipo de solicitacion:

| Metodo | Flexion | Cortante | Torsion |
| Microhormigon fluido | seccion<30cm, agua/polvo 0.12-0.14, cimbras hermeticas | - | espesor<6cm mortero, <30cm microhormigon |
| Hormigon colado | cualquier dim, a/c<=0.50, revenim 10-15cm, vibrar | - | cualquier dim, verter un lado, vibrar |
| Hormigon lanzado | cualquier dim, agreg<=19mm, capas 5cm, acelerador | - | cualquier dim, capas<=5cm, acelerador |
| Laminas epoxi | permanente, no>55C, placas 4mm, epoxi 2-3mm | ranura 3x3cm, varilla corrugada, mortero epoxi | permanente, no>55C |

Comun a todos: sustrato con pendiente 3:1, epoxi baja viscosidad como puente adherencia. Acero: ~1cm vertical, ~2cm horizontal. Anclaje min 5-6cm con expansor poliester.

TIEMPOS: descimbrar 48h min | curado humedo 7-14 dias | carga epoxi 7 dias | puntales 7-21 dias | evitar sol 30-36h | placas preparar max 2h antes.

MATERIALES: epoxi baja viscosidad, mortero tixotropico epoxi, expansor poliester, microhormigon fluido, shotcrete, membrana acrilica, acelerador fraguado, superplastificante.

DIMENSIONES: epoxi 2-3mm (final <1.5mm) | placas max 4mm c/orificios 3mm cada 15cm | pendiente demolicion 3:1 | ranura cortante 3x3cm | capas lanzado <=5cm | agregado max 19mm(lanzado) 1/4-1/5(colado) | a/c 0.35-0.50(lanzado) <=0.50(colado) | temp max epoxi 55C.
`;

/**
 * FEMA 547 — Tecnicas de Rehabilitacion Sismica de Edificios Existentes
 * Condensado por elemento estructural.
 */
export const FEMA_547_KNOWLEDGE = `
=== REFERENCIA: FEMA 547 — REHABILITACION SISMICA ===

COLUMNAS DE CONCRETO:
- Encamisado con concreto: aumenta seccion y acero, mejora resistencia axial y ductilidad. Rugosificar superficie existente, dowels perforados.
- Encamisado con platina de acero: no aumenta seccion significativamente, mejora confinamiento. Grout sin contraccion entre platina y columna.
- Encamisado con FRP (fibra de carbono/vidrio): incrementa confinamiento del nucleo, mejora ductilidad. Aplica rectangular y circular. Corrige: corte insuficiente, compresion insuficiente, traslape insuficiente.

VIGAS:
- Ampliacion de seccion: adicion de concreto/acero para mejorar capacidad de transferencia de carga y rigidez.
- Refuerzo de viga colectora: vigas insuficientes para transferir cargas de colector se refuerzan con concreto nuevo y dowels.
- Colector en viga existente: concreto nuevo ambos lados, estribos nuevos, dowels perforados, orificios de vaciado.

MUROS DE CORTE:
- Reduccion de capacidad de flexion para limitar demanda de corte (mejora desempeno sismico global).
- Refuerzo de viga de acoplamiento profunda: concreto nuevo en cara existente, estribos X, min 4 barras con estribos a 4" max.

CONEXIONES LOSA-MURO:
- Apoyo insuficiente de losas prefabricadas: dowels de anclaje, concreto nuevo.
- Transferencia de corte insuficiente diafragma-muro: colectores y cordones nuevos.

MARCOS ARRIOSTRADOS DE ACERO:
- Placas de nudo (gusset plates) para tolerancias de instalacion.
- Conexion soldada SCBF, conexion compacta, soldadura extensiva en campo.

CIMENTACIONES:
- Conexion columna-cimentacion: placa base modificada con pernos de anclaje para resistir tension sismica.
- Mejoramiento de suelo bajo zapatas: inyeccion de grout en suelo licuable hasta estrato denso (Fig 23.9.3).
- Empalme de columna: refuerzo de empalmes soldados/empernados segun AISC sismico.

DIAFRAGMAS:
- Colectores en diafragmas de concreto y prefabricado: cordones nuevos en bordes, aberturas y esquinas reentrantes.
- Conexion revestimiento-estructura madera: angulos de acero con clavos/tornillos (cortantes bajos).
`;

/**
 * Guia Practica de Reparacion de Estructuras de Hormigon
 * Basada en ACI 224.1R-93. Condensada por tecnica y diagnostico.
 */
export const GUIA_REPARACION_KNOWLEDGE = `
=== REFERENCIA: GUIA REPARACION ESTRUCTURAS (ACI 224) ===

PARTE 1 — TECNICAS DE REPARACION:

1. REPARACION ACERO REFUERZO: traslape (superponer barras con longitud minima) o soldadura (cuando no hay espacio). Losas, columnas, vigas.
2. ENCOFRADO Y VACIADO: molde temporal + hormigon nuevo. Compactacion: vibrador interno, manual con varilla, vibracion externa, o autocompactable.
3. EMPAQUETAMIENTO SECO (Dry Packing): mortero con poca agua a presion en cavidades pequenas y profundas. Horizontal, vertical o sobre cabeza.
4. AGREGADO PRECOLOCADO + GROUT: piedras gruesas en cavidad + inyeccion de grout liquido. Para superficies verticales dificiles de vibrar.
5. CONCRETO LANZADO (Shotcrete): proyectado a alta presion. Via seca (agua en boquilla) o via humeda (premezclado). Superficies verticales, inclinadas, horizontales.
6. INYECCION DE FISURAS: resina epoxi a presion en grietas. Penetra al fondo y une caras. De abajo hacia arriba.
7. GROUT SUMERGIDO: encofrado hermetico bajo agua + grout especial. Para pilotes de puentes y muelles.
8. SOBRECAPAS (Overlays): capa nueva sobre superficie existente. Para losas, tableros de puentes, pavimentos con deterioro superficial.
9. MORTERO MANUAL: aplicacion directa con herramientas. Superficial localizado, superficial generalizado, profundo localizado, profundo generalizado, vigas.

PARTE 2 — DIAGNOSTICO DE DANOS:

10. FISURAS POR RETRACCION: contraccion por perdida de agua o temperatura. Primeras horas/dias del vaciado. Generalmente no peligrosas.
11. REACCIONES QUIMICAS: alcalis-agregado (patron red/cocodrilo), agua de mar (cloruros/sulfatos), erosion por abrasion.
12. CARGAS EXCESIVAS: compresion en columnas (fisuras verticales), compresion en vigas (fisuras horizontales superiores), flexion (fisuras inferiores), cortante (fisuras diagonales cerca apoyos), torsion en losas (diagonales 45 en bordes), torsion en vigas (espirales).
13. CORROSION: carbonatacion (CO2 penetra, neutraliza alcalinidad, acero se oxida, oxido expande y revienta recubrimiento).
14. FALLAS CONSTRUCTIVAS: oquedades por mal vibrado, oquedades por mala ubicacion del acero, dosificacion deficiente.

TABLA RESUMEN — QUE TECNICA USAR:
| Problema | Tecnica recomendada |
| Grietas finas sin movimiento | Inyeccion epoxi (6) |
| Grietas con movimiento | Sellado flexible, NO inyeccion rigida |
| Desprendimiento superficial | Mortero manual (9) o sobrecapas (8) |
| Cavidad profunda puntual | Empaquetamiento seco (3) o vaciado (2) |
| Dano profundo generalizado | Encofrado+vaciado (2) o shotcrete (5) |
| Corrosion de acero | Reparar acero (1) + proteccion + mortero/vaciado |
| Pilotes bajo agua | Grout sumergido (7) |
| Superficie vertical profunda | Agregado precolocado+grout (4) |
`;
