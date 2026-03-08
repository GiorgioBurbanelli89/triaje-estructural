# Triaje Estructural - Guia Completa de Desarrollo

## Descripcion del Proyecto

App Android para triaje de ingenieria estructural con inteligencia artificial.
Permite tomar fotos de fallas estructurales o describir problemas por texto y obtener un diagnostico automatizado con nivel de peligro (critico/alto/medio/bajo), recomendaciones de reparacion y metodos basados en el documento tecnico "Criterios de Diseno y Detalles Estructurales".

**Toda la interfaz esta en espanol.**

**Repositorio:** https://github.com/GiorgioBurbanelli89/triaje-estructural

---

## Stack Tecnologico

| Componente | Tecnologia |
|---|---|
| Frontend | HTML + CSS + TypeScript puro (sin framework) |
| Bundler | Vite 6.x |
| Empaquetado movil | Capacitor 7.2 |
| IA principal | Google Gemini API (gemini-2.0-flash) - **GRATIS** |
| IA alternativa | Claude API (claude-sonnet-4-20250514) - de pago |
| Camara | @capacitor/camera |
| Almacenamiento | localStorage |
| Build Android | Gradle + Android SDK 35 |
| Java | JDK 21 (Eclipse Adoptium Temurin) |

> Arquitectura basada en el proyecto **Hekatan Calc** (Vite + Capacitor + TypeScript puro).

---

## Historial Completo de Pasos

### FASE 1: Diseno inicial con React Native + Expo (DESCARTADO)

Se inicio con React Native + Expo + TypeScript. Archivos creados:

1. `src/types/index.ts` - Tipos TypeScript (NivelPeligro, ResultadoTriaje, Reporte)
2. `src/constants/triageLevels.ts` - Colores por nivel de peligro
3. `src/services/claudeService.ts` - Servicio Claude API via fetch
4. `src/utils/storage.ts` - Helpers de AsyncStorage
5. `src/components/DangerBadge.tsx` - Componente badge de peligro
6. `src/components/ReportCard.tsx` - Tarjeta de reporte
7. `src/screens/HomeScreen.tsx` - Pantalla de inicio
8. `src/screens/CameraScreen.tsx` - Pantalla de camara
9. `src/screens/ResultScreen.tsx` - Pantalla de resultados
10. `src/screens/HistoryScreen.tsx` - Lista de evaluaciones
11. `src/screens/SettingsScreen.tsx` - Configuracion de API key
12. `App.tsx` - Navegacion con React Navigation
13. `app.json` - Configuracion de Expo

**Problemas encontrados:**
- `FileSystem.EncodingType.Base64` → cambiado a string literal `'base64'` (cambio de API en expo-file-system)
- Generar APK con Expo requeria cuenta de EAS Build → se decidio migrar a Capacitor

**Conclusion:** Se descarto React Native + Expo y se migro a la arquitectura de Hekatan (Vite + Capacitor).

---

### FASE 2: Guia de Reparacion (datos iniciales)

14. `src/constants/repairMethods.ts` - Base de datos inicial con 10 tipos de falla y metodos de reparacion:

| # | Tipo de Falla | Nivel | Metodos |
|---|---|---|---|
| 1 | Grietas por Flexion | Medio | Inyeccion Epoxica, CFRP |
| 2 | Grietas por Cortante | Alto | Encamisado Concreto, Estribos CFRP |
| 3 | Columna Danada | Critico | Encamisado Concreto, Encamisado Metalico |
| 4 | Corrosion del Acero | Alto | Reparacion Localizada |
| 5 | Asentamiento Diferencial | Critico | Micropilotes |
| 6 | Grietas en Muros | Medio | Inyeccion Mortero, Malla y Aplanado |
| 7 | Desprendimiento Recubrimiento | Medio | Parcheo Polimerico |
| 8 | Humedad y Filtraciones | Bajo | Impermeabilizacion Integral |
| 9 | Losa Agrietada | Medio | CFRP, Sobrelosa |
| 10 | Cimentacion Danada | Critico | Ampliacion de Zapatas |

---

### FASE 3: Migracion a Capacitor (proyecto triaje-capacitor)

Se creo `triaje-capacitor/` siguiendo la arquitectura de Hekatan:

#### Paso 1: Estructura del proyecto

```
triaje-capacitor/
  package.json          # Dependencias npm
  capacitor.config.ts   # Config de Capacitor
  tsconfig.json         # Config de TypeScript
  vite.config.ts        # Config de Vite
  src/
    index.html          # HTML principal (5 pantallas + tabs)
    styles.css          # Estilos CSS completos
    main.ts             # Logica: camara, APIs, navegacion
    guia-data.ts        # Base de datos de reparacion
    criterios-knowledge.ts  # Conocimiento del documento tecnico
  dist/                 # Build de produccion (generado por Vite)
  android/              # Proyecto Android (generado por Capacitor)
```

#### Paso 2: Configuracion de proyecto

15. **`package.json`** - Dependencias:
```json
{
  "dependencies": {
    "@capacitor/android": "^7.2.0",
    "@capacitor/camera": "^7.0.0",
    "@capacitor/core": "^7.2.0",
    "@capacitor/preferences": "^7.0.0"
  },
  "devDependencies": {
    "@capacitor/cli": "^7.2.0",
    "typescript": "^5.8.3",
    "vite": "^6.3.5"
  }
}
```

16. **`capacitor.config.ts`**:
```typescript
import type { CapacitorConfig } from '@capacitor/cli';
const config: CapacitorConfig = {
  appId: 'com.doris.triajestructural',
  appName: 'Triaje Estructural',
  webDir: 'dist',
  android: { backgroundColor: '#0F172A' },
  server: { androidScheme: 'https' }
};
export default config;
```

17. **`tsconfig.json`** - Target ES2020, modulos ESNext

18. **`vite.config.ts`** - Root en `src/`, output en `../dist`, target `es2020`, port `4621`

#### Paso 3: Interfaz de usuario (HTML + CSS)

19. **`src/index.html`** - App con 5 pantallas:
- `page-inicio` - Botones de foto, campo de texto para describir problemas, features
- `page-resultado` - Resultado del analisis con badge de peligro
- `page-historial` - Lista de evaluaciones previas (ultimas 50)
- `page-guia` - Guia de reparacion expandible con 18 categorias
- `page-config` - Selector de proveedor IA (Gemini/Claude) + API keys
- Barra de tabs inferior con 4 botones (Inicio, Historial, Guia, Config)
- Overlay de carga con spinner

20. **`src/styles.css`** - Estilos completos:
- Variables CSS para colores de triaje: critico (#DC2626), alto (#EA580C), medio (#CA8A04), bajo (#16A34A)
- Diseno mobile-first con safe-area-inset
- Componentes: badges, cards, botones, tabs, loading overlay
- Guia con tarjetas expandibles/colapsables
- Selector de proveedor IA (GRATIS/DE PAGO badges)
- Campo de texto para modo descripcion
- Separador visual entre modos foto y texto

#### Paso 4: Logica de la aplicacion

21. **`src/main.ts`** - Logica principal (v2.0):

**Navegacion:** Sistema de paginas con clase `.active` y tabs inferiores

**Captura de imagen:**
- Intenta `@capacitor/camera` (nativo en Android)
- Fallback a `<input type="file">` para web
- Soporte para camara y galeria

**Dual provider system:**
```typescript
type Provider = "gemini" | "claude";
```
- Google Gemini (GRATIS por defecto): `gemini-2.0-flash` via `generativelanguage.googleapis.com`
- Claude (de pago, opcional): `claude-sonnet-4-20250514` via `api.anthropic.com`

**Analisis por foto (Google Gemini):**
```typescript
const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`;
// Envia system_instruction + imagen base64 inline_data + texto
// generationConfig: maxOutputTokens 2048, temperature 0.3
```

**Analisis por foto (Claude):**
```typescript
const url = "https://api.anthropic.com/v1/messages";
// Headers: x-api-key, anthropic-version, anthropic-dangerous-direct-browser-access
// Envia system + messages con type "image" source base64
```

**Analisis por texto (ambos proveedores):**
- Mismas funciones pero sin inline_data/image
- Solo envia la descripcion textual del usuario
- Misma calidad de diagnostico

**System prompt compartido:**
- Perito estructural con 30 anos de experiencia
- Incluye CRITERIOS_DISENO_KNOWLEDGE completo como contexto
- Responde en JSON: tipo_falla, nivel_peligro, debe_desalojar, descripcion, recomendaciones[], urgencia

**Almacenamiento:** localStorage para API keys (Gemini + Claude), proveedor seleccionado, historial (50 reportes)

**Renderizado:** Funciones separadas para resultado con imagen vs resultado con texto, parte comun compartida

22. **`src/guia-data.ts`** - 18 categorias de fallas con ~40+ metodos de reparacion

23. **`src/criterios-knowledge.ts`** - Base de conocimiento extraida del documento PDF "Criterios de Diseno y Detalles Estructurales" (Capitulos 6, 7 y 8)

#### Paso 5: Instalacion de dependencias

```bash
cd triaje-capacitor
npm install
```
Resultado: 109 paquetes, 0 vulnerabilidades.

#### Paso 6: Build de la web app

```bash
npx vite build
```
Resultado: build en ~900ms, genera dist/index.html + assets CSS/JS

#### Paso 7: Agregar plataforma Android

```bash
npx cap add android
npx cap sync android
```
Genera carpeta `android/` con:
- `MainActivity.java` (paquete `com.doris.triajestructural`)
- `AndroidManifest.xml` con permisos de camara
- Web assets en `android/app/src/main/assets/public/`

---

### FASE 4: Instalacion de herramientas de build

#### Paso 8: Instalar JDK 21

Capacitor 7.2 requiere Java 21 (Java 17 fallo con `invalid source release: 21`).

```bash
winget install --id EclipseAdoptium.Temurin.21.JDK
```
Instalado en: `C:\Program Files\Eclipse Adoptium\jdk-21.0.10.7-hotspot`

#### Paso 9: Instalar Android SDK

```bash
# Descargar command-line tools
curl -L -o cmdline-tools.zip "https://dl.google.com/android/repository/commandlinetools-win-11076708_latest.zip"

# Instalar SDK platform y build-tools
sdkmanager "platform-tools" "platforms;android-35" "build-tools;35.0.0"
```
SDK en: `C:\Users\Backup-PC\Android\Sdk`

#### Paso 10: Configurar local.properties

```properties
sdk.dir=C:\\Users\\Backup-PC\\Android\\Sdk
```

---

### FASE 5: Generacion del APK

#### Paso 11: Compilar APK

```bash
export JAVA_HOME="C:/Program Files/Eclipse Adoptium/jdk-21.0.10.7-hotspot"
export ANDROID_SDK_ROOT="C:/Users/Backup-PC/Android/Sdk"
cd triaje-capacitor/android
./gradlew assembleDebug
```
**BUILD SUCCESSFUL** (primera vez ~3 min, reconstrucciones ~8 seg)

#### Paso 12: APK final

```bash
cp android/app/build/outputs/apk/debug/app-debug.apk ../TriajeEstructural.apk
```
APK: **`TriajeEstructural.apk`** (~6.3 MB)

---

### FASE 6: Integracion del documento tecnico

#### Paso 13: Extraccion del documento PDF

Se creo `extract_document.py` usando PyMuPDF (fitz) para extraer texto e imagenes del PDF "CRITERIOS DE DISENO Y DETALLES ESTRUCTURALES.docx.pdf":

```python
import fitz
doc = fitz.open(PDF_PATH)
# Extrae texto pagina por pagina → criterios_completo.txt + criterios_paginas.json
# Extrae imagenes → images/pagina_X_img_Y.png (40+ imagenes)
```

Archivos generados en `triaje-estructural/src/knowledge/`:
- `text/criterios_completo.txt` - Texto completo extraido
- `text/criterios_paginas.json` - Texto por pagina
- `images/` - 40+ imagenes PNG del documento
- `criteriosDiseno.ts` - Version estructurada en TypeScript

#### Paso 14: Integracion en la app

24. **`src/criterios-knowledge.ts`** - Conocimiento del documento como template literal exportado:
- Capitulo 6: Procedimientos de reparacion (superficiales, profundas, pilotes, empalmes)
- Capitulo 7: Proteccion electroquimica (PC, EEC, RAE)
- Capitulo 8: Refuerzos estructurales (microhormigon, hormigon, lanzado, laminas metalicas)
- Materiales clave, tiempos, dimensiones y proporciones

25. Se agregaron 8 categorias nuevas a `guia-data.ts` basadas en el documento:

| # | Categoria | Nivel | Metodos |
|---|---|---|---|
| 11 | Refuerzo de Emergencia | Critico | Laminas soldadas, Shotcrete, Muros |
| 12 | Vigas - Flexion | Alto | Microhormigon, Hormigon, Lanzado, Laminas |
| 13 | Vigas - Cortante | Alto | Mortero Epoxi, Placas Metalicas |
| 14 | Vigas - Torsion | Alto | Mortero/Microhormigon, Hormigon colado |
| 15 | Proteccion Armaduras | Alto | PC, EEC, RAE |
| 16 | Reparaciones Superficiales | Medio | Localizada, Generalizada |
| 17 | Reparaciones Profundas | Alto | Localizada, Generalizada, Pilotes |
| 18 | Empalmes y Anclajes | Medio | Traslape, Soldadura, Adhesivo |

26. Se incluyo el conocimiento en el system prompt de la IA para que las recomendaciones se basen en el documento tecnico.

---

### FASE 7: API gratuita + modo texto

#### Paso 15: Integracion de Google Gemini (GRATIS)

Se reescribio `main.ts` para soportar dos proveedores:
- **Google Gemini** (por defecto, GRATIS): modelo `gemini-2.0-flash`
- **Claude** (opcional, de pago): modelo `claude-sonnet-4-20250514`

Selector de proveedor en pantalla de Configuracion con badges GRATIS/DE PAGO.

#### Paso 16: Modo de analisis por texto

Se agrego textarea en la pantalla de inicio para que el usuario pueda describir la falla por escrito sin necesidad de tomar foto. La IA analiza la descripcion y da el mismo diagnostico.

#### Paso 17: Mas fallas de cimentacion

Se agregaron 3 metodos nuevos a "Asentamiento Diferencial":
- Inyeccion de Lechada (Grouting)
- Nivelacion con Gatos Hidraulicos
- Pilas de Cimentacion Profunda

#### Paso 18: Rebuild final

```bash
npx vite build && npx cap sync android
export JAVA_HOME="C:/Program Files/Eclipse Adoptium/jdk-21.0.10.7-hotspot"
export ANDROID_SDK_ROOT="C:/Users/Backup-PC/Android/Sdk"
cd android && ./gradlew assembleDebug
```
BUILD SUCCESSFUL en 8 segundos. APK copiado a `TriajeEstructural.apk`.

---

### FASE 8: Subida a GitHub

#### Paso 19: Crear repositorio

```bash
cd triaje-capacitor
git init && git checkout -b main
# Crear .gitignore (node_modules, dist, builds, local.properties, apk)
git add -A
git commit -m "App Triaje Estructural v2.0 - Android"
gh repo create triaje-estructural --public --source . --push
```

Repositorio: https://github.com/GiorgioBurbanelli89/triaje-estructural

---

## Estructura Final de Archivos

```
triaje-capacitor/
├── .gitignore
├── package.json              # Dependencias npm
├── package-lock.json
├── capacitor.config.ts       # Config de Capacitor (appId, webDir)
├── tsconfig.json             # Config de TypeScript (ES2020)
├── vite.config.ts            # Config de Vite (root: src, out: dist)
├── src/
│   ├── index.html            # HTML principal (5 pantallas + tabs)
│   ├── styles.css            # Estilos CSS (mobile-first, triaje colors)
│   ├── main.ts               # Logica: Gemini/Claude, foto/texto, navegacion
│   ├── guia-data.ts          # 18 categorias, 40+ metodos de reparacion
│   └── criterios-knowledge.ts # Documento tecnico como contexto IA
├── dist/                     # Build de produccion (generado)
└── android/                  # Proyecto Android (generado por Capacitor)
    ├── local.properties      # Ruta al Android SDK
    ├── gradlew / gradlew.bat
    ├── app/
    │   ├── build.gradle
    │   └── src/main/
    │       ├── AndroidManifest.xml
    │       ├── assets/public/   # Web app copiada aqui
    │       └── java/.../MainActivity.java
    └── gradle/
```

---

## Como Instalar en el Celular

1. Copiar `TriajeEstructural.apk` al celular (USB, WhatsApp, Drive, etc.)
2. Abrir el archivo en el celular
3. Habilitar instalacion de fuentes desconocidas si lo pide
4. Instalar y abrir "Triaje Estructural"
5. Ir a **Config** > obtener API key gratis en https://aistudio.google.com/apikey
6. Pegar la key y guardar
7. Listo: evaluar con foto o con texto

---

## Como Reconstruir el APK (despues de cambios)

```bash
# 1. Build de la web app
cd "C:\Users\Backup-PC\Documents\DORIS\app triaje\triaje-capacitor"
npx vite build

# 2. Sincronizar con Android
npx cap sync android

# 3. Generar APK
export JAVA_HOME="C:/Program Files/Eclipse Adoptium/jdk-21.0.10.7-hotspot"
export ANDROID_SDK_ROOT="C:/Users/Backup-PC/Android/Sdk"
cd android
./gradlew assembleDebug

# 4. Copiar APK
cp app/build/outputs/apk/debug/app-debug.apk "../../TriajeEstructural.apk"
```

**En Windows CMD (alternativa):**
```cmd
set JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-21.0.10.7-hotspot
set ANDROID_SDK_ROOT=C:\Users\Backup-PC\Android\Sdk
cd android
gradlew.bat assembleDebug
```

---

## Funcionamiento de la App

### Pantallas

| Pantalla | Descripcion |
|---|---|
| Inicio | Botones para foto/galeria + campo de texto para describir problemas |
| Resultado | Badge de peligro, alerta de desalojo, tipo de falla, descripcion, urgencia, recomendaciones |
| Historial | Lista de evaluaciones (ultimas 50) con icono de modo (foto/texto) |
| Guia | 18 categorias expandibles, cada una con metodos detallados (materiales + pasos) |
| Config | Selector de proveedor IA (Gemini GRATIS / Claude pago) + campos de API key |

### Niveles de Peligro (Triaje)

| Nivel | Color | Icono | Criterio |
|---|---|---|---|
| CRITICO | Rojo #DC2626 | rojo | Colapso inminente, desalojar inmediatamente |
| ALTO | Naranja #EA580C | naranja | Peligro significativo, reparacion urgente |
| MEDIO | Amarillo #CA8A04 | amarillo | Requiere atencion programada |
| BAJO | Verde #16A34A | verde | Sin peligro inmediato, monitorear |

### Flujo de Uso

```
MODO FOTO:
  Usuario abre app → Toca "Evaluar con Foto" → Camara/galeria
  → Spinner "Analizando estructura..." → Imagen se envia a Gemini/Claude (base64)
  → IA responde JSON → Resultado con nivel de peligro → Se guarda en historial

MODO TEXTO:
  Usuario abre app → Escribe descripcion de la falla
  → Toca "Analizar Descripcion" → Spinner
  → Texto se envia a Gemini/Claude → Resultado → Se guarda en historial
```

### APIs utilizadas

**Google Gemini (GRATIS):**
```
POST https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=API_KEY
Body: { system_instruction, contents[{ parts[{ inline_data / text }] }], generationConfig }
```

**Claude (DE PAGO):**
```
POST https://api.anthropic.com/v1/messages
Headers: x-api-key, anthropic-version: 2023-06-01, anthropic-dangerous-direct-browser-access: true
Body: { model, max_tokens, system, messages[{ role, content[{ type: image/text }] }] }
```

---

## Herramientas Instaladas en el Sistema

| Herramienta | Version | Ubicacion |
|---|---|---|
| JDK 21 | 21.0.10.7 | `C:\Program Files\Eclipse Adoptium\jdk-21.0.10.7-hotspot` |
| Android SDK | 35 | `C:\Users\Backup-PC\Android\Sdk` |
| Build Tools | 35.0.0 | Dentro del SDK |
| Node.js | (preinstalado) | Global |
| npm | (preinstalado) | Global |
| GitHub CLI | (preinstalado) | Global |
| Python + PyMuPDF | (para extract_document.py) | Global |

---

## Como Continuar el Desarrollo

### Mejoras sugeridas para la app

1. **Modo offline parcial:** Almacenar las ultimas respuestas de la IA en cache para consultar sin internet. La guia y el historial ya funcionan offline.

2. **Exportar reportes a PDF:** Agregar boton para generar PDF del diagnostico con imagen, resultado y recomendaciones. Se puede usar jsPDF o html2canvas.

3. **Galeria de imagenes de referencia:** Mostrar imagenes ejemplo de cada tipo de falla en la guia de reparacion, usando las 40+ imagenes extraidas del documento en `triaje-estructural/src/knowledge/images/`.

4. **Mapa de evaluaciones:** Integrar geolocalizacion (@capacitor/geolocation) para registrar ubicacion de cada evaluacion y mostrar en un mapa.

5. **Compartir diagnostico:** Boton para compartir el resultado via WhatsApp, email o generar un enlace.

6. **Modo comparativo:** Permitir tomar varias fotos del mismo elemento en diferentes fechas para comparar evolucion del dano.

7. **Base de datos local con SQLite:** Migrar de localStorage a SQLite (@capacitor-community/sqlite) para mejor rendimiento con muchos registros.

8. **Firma digital del APK:** Para publicar en Google Play Store:
```bash
# Generar keystore
keytool -genkey -v -keystore release-key.keystore -alias triaje -keyalg RSA -keysize 2048 -validity 10000

# Build release
./gradlew assembleRelease
```

9. **Notificaciones:** Recordatorios para seguimiento de estructuras evaluadas como criticas.

10. **Multi-idioma:** Agregar soporte para ingles y portugues ademas del espanol.

### Agregar nuevas fallas a la guia

Editar `src/guia-data.ts` y agregar al array `GUIA_REPARACION`:

```typescript
{
  id: "nueva_falla",
  falla: "Nombre de la Falla",
  descripcion: "Descripcion general...",
  nivel_tipico: "critico|alto|medio|bajo",
  metodos: [
    {
      nombre: "Nombre del Metodo",
      descripcion: "Descripcion del metodo...",
      cuando_usar: "Cuando aplicar este metodo...",
      materiales: ["Material 1", "Material 2"],
      pasos: ["Paso 1", "Paso 2", "Paso 3"]
    }
  ]
}
```

### Agregar conocimiento tecnico para la IA

Editar `src/criterios-knowledge.ts` y agregar al template literal `CRITERIOS_DISENO_KNOWLEDGE` la informacion adicional. Este texto se envia como contexto al modelo de IA en cada consulta.

### Cambiar de proveedor de IA

El sistema ya soporta dos proveedores. Para agregar un tercero (ej. OpenAI):

1. Agregar tipo al union: `type Provider = "gemini" | "claude" | "openai";`
2. Crear funciones `callOpenAIImage()` y `callOpenAIText()`
3. Agregar boton en el selector de proveedor en `index.html`
4. Agregar campo de API key en config
5. Actualizar `getCurrentKey()` y `getProviderName()`

### Flujo para reconstruir despues de cambios

```bash
# 1. Hacer cambios en src/
# 2. Build + sync + APK
cd triaje-capacitor
npx vite build && npx cap sync android
export JAVA_HOME="C:/Program Files/Eclipse Adoptium/jdk-21.0.10.7-hotspot"
export ANDROID_SDK_ROOT="C:/Users/Backup-PC/Android/Sdk"
cd android && ./gradlew assembleDebug
cp app/build/outputs/apk/debug/app-debug.apk "../../TriajeEstructural.apk"

# 3. Commit y push
cd ..
git add -A && git commit -m "descripcion del cambio" && git push
```

---

## Errores Conocidos y Soluciones

| Error | Causa | Solucion |
|---|---|---|
| `invalid source release: 21` | JDK 17 en vez de JDK 21 | Instalar JDK 21: `winget install --id EclipseAdoptium.Temurin.21.JDK` |
| `gradlew.bat: command not found` | Ejecutar desde bash | Usar `./gradlew` con `export JAVA_HOME=...` o usar CMD con `gradlew.bat` |
| `FileSystem.EncodingType.Base64` | API cambio en expo-file-system | Usar string literal `'base64'` (solo aplica a version Expo descartada) |
| `UNIMPLEMENTED` al usar camara | Capacitor Camera no disponible en web | El codigo ya tiene fallback a `<input type="file">` |
| API key vacia | Usuario no configuro key | La app muestra alerta y redirige a Config |
| JSON parse error en respuesta IA | Respuesta con markdown code blocks | `parseJsonResponse()` ya limpia bloques ``` antes de parsear |

---

## Notas Importantes

- Las API keys se almacenan **localmente** en localStorage. Nunca se envian a terceros.
- Google Gemini API es **gratuita** con limites generosos (15 RPM, 1M TPM).
- La app funciona **sin internet** para ver historial y guia. La evaluacion requiere conexion.
- El APK es tipo **debug** (no firmado). Para Google Play se necesita `assembleRelease` con keystore.
- El header `anthropic-dangerous-direct-browser-access: true` es necesario para Claude desde webview.
- El documento "Criterios de Diseno" se integro tanto en la guia visual como en el contexto de la IA.
