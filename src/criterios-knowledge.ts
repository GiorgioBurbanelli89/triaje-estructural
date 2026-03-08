/**
 * Base de conocimiento extraida del documento:
 * "CRITERIOS DE DISENO Y DETALLES ESTRUCTURALES"
 *
 * Contiene procedimientos de reparacion y proteccion de estructuras de hormigon armado.
 * Se usa como contexto adicional para que Claude proporcione recomendaciones
 * basadas en este documento tecnico.
 */

export const CRITERIOS_DISENO_KNOWLEDGE = `
=== DOCUMENTO DE REFERENCIA: CRITERIOS DE DISENO Y DETALLES ESTRUCTURALES ===

CAPITULO 6: PROCEDIMIENTOS DE REPARACION

6.7 PROCEDIMIENTOS DE REPARACION
6.7.1 Reparaciones superficiales localizadas
6.7.2 Reparaciones superficiales generalizadas
6.7.3 Reparaciones profundas localizadas
6.7.4 Reparaciones profundas localizadas (continuacion)
6.7.5 Reparaciones profundas generalizadas
6.7.6-6.7.8 Reparaciones profundas generalizadas (variantes)
6.7.9-6.7.11 Reparaciones profundas generalizadas (variantes adicionales)
6.7.5 Reparacion de pilotes mediante encamisetado
6.7.6 Fisuras y/o grietas sin movimiento
6.7.7 Detalle de empalmes por traslape
6.7.8 Detalle de empalmes por soldadura
6.7.9 Detalle de anclaje – sistema de anclaje adhesivo
6.7.10 Detalle distribucion de armadura

CAPITULO 7: PROCEDIMIENTOS DE REPARACION Y PROTECCION DE ARMADURAS
Autores: Arlindo Goncalves, Carmen Andrade, Marta Castellote

INTRODUCCION:
En este capitulo se presenta un resumen del fenomeno de la corrosion de armaduras en las estructuras de hormigon, seguido de todas las formas conocidas y consagradas de reparacion y proteccion de armaduras.

7.1 TECNICAS O METODOS ELECTROQUIMICOS DE PROTECCION
Las tecnicas electroquimicas de proteccion/reparacion de estructuras danadas por corrosion de armaduras son tres:
1. Proteccion catodica (PC)
2. Extraccion electroquimica de cloruros (EEC)
3. Realcalinizacion (RAE)

La proteccion catodica es la mas antigua, utilizada ampliamente para estructuras de acero en agua (barcos, plataformas petroliferas) asi como enterradas (tuberias). Sus principios se conciben en el siglo XIX, pero no comienza a aplicarse a estructuras de hormigon armado hasta 1955 (estructuras sumergidas o enterradas). A principio de los anos 70 se utiliza para estructuras aereas, y en los anos 90 pasa a ser utilizada con caracter preventivo (prevencion catodica). La proteccion catodica esta regulada y normalizada: EN 12696.

CAPITULO 8: PROTECCION Y MANTENIMIENTO DE ESTRUCTURAS DE HORMIGON

8.7 LAMINAS Y PLACAS METALICAS ADHERIDAS AL HORMIGON CON ADHESIVO EPOXI
Alcance: refuerzos estructurales permanentes que mantienen la estetica y la geometria original. No deben ser usados en situaciones de temperaturas elevadas (> 55 C).
Sustrato: retirar capa de mortero y pintura, eliminar por escarificacion la capa superficial del hormigon. Obtener una superficie plana y rugosa. Si fuera necesario llenar las cavidades y nivelar con mortero tixotropico de base epoxi, aplicada sobre puente de adherencia de adhesivo epoxi de baja viscosidad. Limpiar con chorro de aire comprimido o acetona. Las placas metalicas deben ser preparadas con chorro de arena o lijadas con equipo electrico, maximo 2 horas antes de colocadas.
Preparacion: adicionar componente endurecedor al componente resina; mezclar y homogeneizar por 3 minutos.
Aplicacion: conforme al diseno. Laminas de acero con orificios de 3 mm cada 15 cm, espesor maximo 4 mm. Fijar con tornillos y tuercas embebidos con expansor de anclaje de base poliester tixotropico. Adhesivo epoxi con espesores de 2 a 3 mm. Presionar hasta espesor uniforme inferior a 1.5 mm.

8.8 REFUERZOS DE EMERGENCIA

8.8.1 Laminas y placas metalicas soldadas
Alcance: refuerzos de emergencia y provisional en caso de colapso (sobrecargas excesivas e incendios).
Aplicacion: ajustar angulos metalicos en aristas de columnas y vigas. Calentar laminas a ~100 C. Soldar laminas y placas que hacen funcion de estribos y armadura principal a los angulos. Con enfriamiento ocurre compresion del elemento estructural, garantizando adherencia y aumento rapido de capacidad de soporte.

8.8.2 Vigas y losas
Las vigas y losas deben ser apuntaladas y acunadas evitando forzarlas mucho. La recuperacion y refuerzo definitivo debe seguir las recomendaciones de este manual. En la mayoria de los casos es preferible demoler las losas y reconstruirlas.

8.8.3 Columnas y muros: hormigon lanzado
En columnas cizalladas: envolver con armadura de refuerzo helicoidal y aplicar hormigon lanzado con aditivo acelerador de fraguado. Alternativa: envolver con placas y laminas metalicas soldadas.
Para muros de hormigon o albanileria: fijar malla a la superficie y lanzar hormigon con aditivo acelerador de fraguado.

8.9 REFUERZOS EN VIGAS

8.9.1 Refuerzo de flexion con microhormigon fluido
Alcance: refuerzos donde la mayor dimension de la seccion no supera 30 cm.
Sustrato: hormigon demolido con superficie en pendiente 3 a 1, escarificado y seco, con puente de adherencia de adhesivo epoxi de baja viscosidad.
Preparacion: agua/polvo de 0.12 a 0.14, durante 3 minutos, homogeneizar 3 minutos mas.
Aplicacion: perforar viga y colocar nuevos estribos a minimo 20 cm de cara inferior, fijar con expansor de anclaje poliester tixotropico. Acero de refuerzo longitudinal distanciado ~1 cm vertical, ~2 cm horizontal. Longitud de anclaje minima 5 cm. Cimbras hermeticas y rigidas. Verter microhormigon por un solo lado sin interrupcion.
Terminacion: descimbrar despues de 48 horas minimo.
Curado: humedo por 7 dias o membrana de curado acrilica. Evitar sol directo primeras 30 horas.
Cuidados: apuntalar la estructura descargando la viga. Retirar puntales despues de 7 dias.

8.9.2 Refuerzo de flexion con hormigon
Alcance: refuerzos con cualquier dimension.
Sustrato: seco, con puente de adherencia de adhesivo epoxi de baja viscosidad.
Preparacion: agua/cemento <= 0.50; revenimiento 10-15 cm; aditivo superfluidificante; agregado grueso maximo 1/5 de menor dimension.
Aplicacion: similar a 8.9.1 pero con hormigon convencional. Compactar con vibradores.
Terminacion: mortero polimerico de base cemento de baja contraccion.
Curado: saturado de agua por 14 dias o membrana de curado.
Cuidados: retirar puntales despues de 21 dias.

8.9.3 Refuerzo de flexion con hormigon lanzado
Alcance: cualquier dimension.
Sustrato: saturado con superficie seca sin encharcamientos.
Preparacion: agregado grueso <= 19 mm; dosificacion 1:2 a 2.5 (cemento:arena+agregado); agua/cemento 0.35-0.50.
Aplicacion: iniciar por cantos y cavidades, capas sucesivas de 5 cm. Usar aditivo acelerador de fraguado.
Curado: humedo 14 dias. Evitar sol directo primeras 30 horas.

8.9.4 Refuerzo de flexion con laminas/placas metalicas adheridas con epoxi
Alcance: refuerzos permanentes. No usar > 55 C.
Sustrato: eliminar revestimientos, escarificar, superficie plana y rugosa. Placas preparadas con chorro de arena, maximo 2 horas antes.
Aplicacion: placas con orificios 3 mm cada 15 cm, espesor maximo 4 mm. Fijar con tornillos. Adhesivo epoxi 2-3 mm. Presionar hasta espesor uniforme < 1.5 mm.
Terminacion: retirar apuntalamiento despues de 48 horas.
Curado: poner en carga despues de 7 dias.

8.9.5 Refuerzo de corte con mortero epoxi
Alcance: conservacion de geometria original.
Sustrato: cortar con cortadora de disco (<= 0.5 cm verticales, >= 1.0 cm horizontales). Ranura 3x3 cm.
Aplicacion: varilla corrugada, longitudes de traslape para anclaje recto, o ganchos rectos con expansor de anclaje poliester tixotropico. Mortero tixotropico de base epoxi correctamente compactado.
Terminacion: frota metalica. Poner en carga despues de 7 dias.
Curado: proteger de radiacion solar directa primeras 5 horas.

8.9.6 Refuerzo de corte con laminas/placas metalicas adheridas con epoxi
Alcance: refuerzos permanentes, no usar > 55 C.
Sustrato y aplicacion: similar a 8.9.4 pero orientado al refuerzo de cortante en vigas.
Terminacion: retirar apuntalamiento despues de 48 horas.
Curado: poner en carga despues de 7 dias.

8.9.7 Refuerzo de torsion con mortero o microhormigon fluido
Alcance: espesor <= 6 cm: mortero fluido; espesor <= 30 cm: microhormigon fluido.
Sustrato: hormigon demolido con inclinacion 3 a 1, escarificado y seco con adhesivo epoxi.
Preparacion: agua/polvo 0.12-0.14 para mortero; 0.12 para microhormigon.
Aplicacion: acero longitudinal distanciado ~1 cm vertical, ~2 cm horizontal. Anclaje minimo 6 cm. Verter por un solo lado hasta que aparezca del otro.
Curado: humedo 7 dias. Evitar sol directo primeras 36 horas.
Cuidados: retirar puntales despues de 7 dias.

8.9.8 Refuerzo de torsion con hormigon
Alcance: cualquier dimension.
Sustrato: seco con adhesivo epoxi de baja viscosidad.
Preparacion: agua/cemento 0.50; revenimiento 10-15 cm; aditivo superplastificante; agregado grueso 1/4 de menor dimension.
Aplicacion: verter por un solo lado, compactar con vibradores.
Curado: saturado 14 dias o membrana de curado.
Cuidados: retirar puntales despues de 21 dias.

8.9.9 Refuerzo de torsion con hormigon lanzado
Alcance: cualquier dimension.
Sustrato: saturado con superficie seca.
Preparacion: agregado grueso <= 19 mm; dosificacion 1:2 a 2.5; agua/cemento 0.35-0.50.
Aplicacion: capas secuenciales <= 5 cm. Aditivo acelerador de fraguado.
Curado: humedo 14 dias. Evitar sol directo primeras 36 horas.

8.9.10 Refuerzo de torsion con laminas/placas metalicas adheridas con epoxi
Alcance: refuerzos permanentes, no usar > 55 C.
Sustrato: eliminar revestimientos, escarificar, superficie plana y rugosa. Placas con chorro de arena, maximo 2 horas antes.
Aplicacion: placas con orificios 3 mm cada 15 cm, espesor maximo 4 mm. Adhesivo epoxi 2-3 mm. Presionar hasta espesor < 1.5 mm.
Terminacion: retirar apuntalamiento despues de 48 horas.
Curado: poner en carga despues de 7 dias.

=== NOTAS GENERALES DEL DOCUMENTO ===

MATERIALES CLAVE MENCIONADOS:
- Adhesivo de base epoxi (baja viscosidad) - puentes de adherencia
- Mortero tixotropico de base epoxi - relleno de cavidades
- Expansor de anclaje de base poliester (tixotropico) - anclajes
- Microhormigon fluido - refuerzos de seccion pequena
- Hormigon lanzado (shotcrete) - refuerzos de emergencia y generales
- Membrana de curado acrilica - curado alternativo
- Aditivo acelerador de fraguado - aplicaciones de emergencia
- Aditivo superfluidificante/superplastificante - hormigon de refuerzo

TIEMPOS CLAVE:
- Descimbrar: minimo 48 horas
- Curado humedo: 7-14 dias segun metodo
- Poner en carga (epoxi): despues de 7 dias
- Retirar puntales: 7-21 dias segun metodo
- Evitar sol directo: primeras 30-36 horas
- Preparacion de placas: maximo 2 horas antes de colocar

DIMENSIONES Y PROPORCIONES CLAVE:
- Espesor adhesivo epoxi: 2-3 mm aplicacion, < 1.5 mm final
- Placas metalicas: espesor maximo 4 mm, orificios 3 mm cada 15 cm
- Pendiente de demolicion: 3 a 1
- Distancia acero nuevo-existente: ~1 cm vertical, ~2 cm horizontal
- Ranura para cortante: 3x3 cm
- Longitud de anclaje minima: 5-6 cm
- Capas de hormigon lanzado: <= 5 cm
- Agregado grueso maximo: 19 mm (lanzado), 1/4-1/5 menor dimension (colado)
- Relacion agua/cemento: 0.35-0.50 (lanzado), <= 0.50 (colado)
- Temperatura maxima para epoxi: 55 C
`;
