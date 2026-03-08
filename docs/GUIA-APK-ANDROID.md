# Guia: Triaje Estructural - APK Android con IA

## Que es esta app?

**Triaje Estructural** es una app Android que evalua danos en estructuras de concreto armado usando inteligencia artificial (Google Gemini, gratis). Tomas una foto o describes el problema y la IA te da:

- Nivel de peligro (CRITICO / ALTO / MEDIO / BAJO)
- Diagrama tecnico de referencia del documento "Criterios de Diseno y Detalles Estructurales"
- Recomendaciones de reparacion basadas en normas tecnicas
- Alerta de desalojo si es necesario

---

## Instalacion del APK en Android

### Paso 1: Descargar el APK
Descarga `triaje-estructural.apk` desde este repositorio.

### Paso 2: Permitir instalacion de fuentes desconocidas
1. Ve a **Configuracion > Seguridad** en tu telefono
2. Activa **"Fuentes desconocidas"** o **"Instalar apps desconocidas"**
3. En Android 8+, puede pedir permiso por app (dale permiso al navegador o gestor de archivos)

### Paso 3: Instalar
1. Abre el archivo `triaje-estructural.apk` desde tu gestor de archivos
2. Toca **"Instalar"**
3. Abre la app **"Triaje Estructural"**

### Paso 4: Configurar API Key de Gemini (GRATIS)
1. En la app, ve a la pestana **Config** (icono de engranaje)
2. Toca el enlace a [Google AI Studio](https://aistudio.google.com/apikey)
3. Inicia sesion con tu cuenta de Google
4. Crea una API Key (es gratis)
5. Copia la key y pegala en la app
6. Toca **"Guardar API Key Gemini"**

---

## Como usar la app

### Opcion 1: Evaluar con foto
- Toca **"Evaluar con Foto"** para tomar una foto de la falla
- O toca **"Seleccionar de Galeria"** para usar una foto existente

### Opcion 2: Descripcion con cuestionario guiado
1. En la pantalla principal, selecciona el **elemento afectado** (columna, viga, losa, muro, etc.)
2. Selecciona el **tipo de dano** (grietas, corrosion, desprendimiento, etc.)
3. Opcionalmente describe detalles adicionales en el campo de texto
4. Toca **"Analizar Problema"**
5. Responde el **cuestionario de 7 pasos** (todos opcionales):
   - Tipo de elemento
   - Tipo de dano
   - Profundidad del dano
   - Detalle de grietas (si aplica)
   - Extension (localizado/generalizado)
   - Movimiento de grietas (si aplica)
   - Severidad percibida
6. Revisa el **resumen** y toca **"Analizar con IA"**

### Resultado
La IA devuelve:
- **Nivel de peligro** con codigo de color
- **Diagrama de referencia** del documento tecnico con la figura correspondiente
- **Descripcion** del problema detectado
- **Recomendaciones** de reparacion con referencias a procedimientos especificos
- **Alerta de desalojo** si el nivel es critico

---

## Stack Tecnico

| Componente | Tecnologia |
|---|---|
| Frontend | HTML + CSS + TypeScript (sin frameworks) |
| Build | Vite 6.x |
| Mobile | Capacitor 7.2 (Android) |
| IA (gratis) | Google Gemini 2.5 Flash |
| IA (pago) | Claude de Anthropic (opcional) |

---

## Como se desarrollo y pruebo con Claude Code + Preview

### Estructura del proyecto

```
triaje-capacitor/
  src/
    index.html          # HTML principal (SPA, 6 paginas)
    main.ts             # Logica principal, cuestionario, API calls
    styles.css          # Estilos completos
    criterios-knowledge.ts  # Base de conocimiento condensada
    imagen-catalogo.ts      # Catalogo de 48 imagenes de referencia
    guia-data.ts            # Datos de la guia de reparacion
    images/                 # Imagenes originales (dev)
  public/
    images/             # Imagenes estaticas (Vite las copia al build)
  android/              # Proyecto Android (Capacitor)
  vite.config.ts        # Configuracion de Vite
  capacitor.config.ts   # Configuracion de Capacitor
```

### Configuracion de Preview en Claude Code

Para poder previsualizar la app directamente desde Claude Code, se usa la herramienta **Claude Preview** con un servidor de desarrollo de Vite.

#### 1. Archivo `.claude/launch.json`

Se crea este archivo en la raiz del proyecto para que Claude Code sepa como levantar el servidor:

```json
{
  "version": "0.0.1",
  "configurations": [
    {
      "name": "triaje-dev",
      "runtimeExecutable": "node",
      "runtimeArgs": ["node_modules/vite/bin/vite.js", "--port", "4621", "--host", "127.0.0.1"],
      "port": 4621
    }
  ]
}
```

**Nota importante:** En Windows, `npx` puede fallar con errores ENOENT en algunos entornos. Por eso se usa `node node_modules/vite/bin/vite.js` directamente en vez de `npx vite`.

#### 2. Configuracion de Vite (`vite.config.ts`)

```typescript
import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  publicDir: "../public",    // Para que copie las imagenes de referencia
  build: {
    outDir: "../dist",
    emptyOutDir: true,
    target: "es2020",
  },
  server: {
    port: 4621,
    open: true,
  },
});
```

Puntos clave:
- `root: "src"` - El codigo fuente esta dentro de `src/`
- `publicDir: "../public"` - Las imagenes estaticas estan en `public/images/`. Como root es `src`, hay que subir un nivel con `../`
- Esto es critico: sin `publicDir`, las imagenes de referencia NO se incluyen en el build y no aparecen en el APK

#### 3. Flujo de trabajo con Preview

Desde Claude Code, el flujo es:

```
1. preview_start("triaje-dev")     → Levanta Vite en puerto 4621
2. preview_screenshot()            → Captura pantalla para ver el estado
3. preview_click(".selector")      → Interactua con la app
4. preview_fill("#input", "texto") → Llena formularios
5. preview_eval("js code")         → Ejecuta JS para debug
6. preview_snapshot()              → Arbol de accesibilidad (texto exacto)
7. preview_inspect(".selector")    → Inspecciona CSS/layout
```

Esto permite:
- Ver la app tal cual se ve en un navegador movil
- Hacer click en botones, llenar campos, navegar
- Verificar que las llamadas a Gemini funcionan
- Confirmar que las imagenes de referencia se cargan
- Probar el flujo completo sin necesidad de instalar el APK

#### 4. Build y generacion del APK

```bash
# 1. Build de Vite (genera dist/ con todo incluido)
node node_modules/vite/bin/vite.js build

# 2. Sincronizar con Capacitor (copia dist/ a android/assets/)
npx cap sync android

# 3. Compilar APK
cd android && ./gradlew assembleDebug

# 4. El APK queda en:
# android/app/build/outputs/apk/debug/app-debug.apk
```

### Imagenes de referencia

Las 48 imagenes provienen del documento tecnico "Criterios de Diseno y Detalles Estructurales". Cubren:

- Reparaciones superficiales y profundas (localizadas y generalizadas)
- Reparacion de pilotes por encamisetado
- Inyeccion de fisuras y grietas
- Empalmes por traslape y soldadura
- Proteccion contra corrosion
- Refuerzos de emergencia
- Refuerzos de flexion, cortante y torsion en vigas

Gemini selecciona automaticamente la imagen mas relevante segun el diagnostico.

---

## Requisitos de desarrollo

- Node.js 18+
- JDK 21 (Temurin recomendado)
- Android SDK 35
- Gradle (incluido en el proyecto Android)

---

## Licencia

Proyecto educativo basado en "Criterios de Diseno y Detalles Estructurales".
