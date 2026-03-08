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
