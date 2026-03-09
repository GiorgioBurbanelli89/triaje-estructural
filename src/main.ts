/**
 * Triaje Estructural — App principal v2.0
 * Evaluacion de danos estructurales con IA (Google Gemini GRATIS / Claude opcional)
 * Soporta analisis por foto y por descripcion de texto
 */
import { GUIA_REPARACION } from "./guia-data.js";
import { CRITERIOS_DISENO_KNOWLEDGE, FEMA_547_KNOWLEDGE, GUIA_REPARACION_KNOWLEDGE } from "./criterios-knowledge.js";
import { generarListaImagenes, buscarImagen } from "./imagen-catalogo.js";

// ─── Interfaces ──────────────────────────────────────
interface ResultadoTriaje {
  tipo_falla: string;
  nivel_peligro: "critico" | "alto" | "medio" | "bajo";
  debe_desalojar: boolean;
  descripcion: string;
  recomendaciones: string[];
  tecnicas_reparacion?: string[];
  urgencia: string;
  imagen_referencia?: string;
}

interface Reporte {
  id: string;
  fecha: string;
  imagen_base64: string;
  resultado: ResultadoTriaje;
  modo: "foto" | "texto";
  texto_original?: string;
}

type Provider = "gemini" | "claude";

// ─── Cuestionario: Data ─────────────────────────────
interface QuestionOption {
  value: string;
  label: string;
  icon: string;
}

interface QuestionStep {
  id: string;
  title: string;
  subtitle: string;
  options: QuestionOption[];
  multiSelect: boolean;
  conditional?: (answers: Record<string, string>) => boolean;
  subQuestion?: {
    id: string;
    title: string;
    options: QuestionOption[];
  };
}

const QUESTION_STEPS: QuestionStep[] = [
  {
    id: "elemento", title: "Tipo de Elemento",
    subtitle: "Selecciona el elemento estructural afectado",
    multiSelect: false,
    options: [
      { value: "columna", label: "Columna", icon: "🏛️" },
      { value: "viga", label: "Viga", icon: "📏" },
      { value: "losa", label: "Losa", icon: "⬜" },
      { value: "muro", label: "Muro", icon: "🧱" },
      { value: "cimentacion", label: "Cimentacion", icon: "🔲" },
      { value: "pilote", label: "Pilote", icon: "🔩" },
    ]
  },
  {
    id: "dano", title: "Tipo de Dano",
    subtitle: "Que tipo de dano observas?",
    multiSelect: false,
    options: [
      { value: "grietas", label: "Grietas\nFisuras", icon: "⚡" },
      { value: "corrosion", label: "Corrosion\nOxidacion", icon: "🟤" },
      { value: "desprendimiento", label: "Despren-\ndimiento", icon: "💥" },
      { value: "deformacion", label: "Deformacion\nPandeo", icon: "〰️" },
      { value: "hundimiento", label: "Hundimiento", icon: "⬇️" },
      { value: "humedad", label: "Humedad\nFiltracion", icon: "💧" },
    ]
  },
  {
    id: "profundidad", title: "Profundidad del Dano",
    subtitle: "Hasta donde penetra el dano?",
    multiSelect: false,
    options: [
      { value: "pintura", label: "Solo pintura\no enlucido", icon: "🎨" },
      { value: "recubrimiento", label: "Concreto\nsuperficial", icon: "🔳" },
      { value: "estructural", label: "Concreto\nestructural", icon: "🧊" },
      { value: "acero_visible", label: "Acero\nvisible", icon: "🔧" },
      { value: "acero_oxidado", label: "Acero\noxidado", icon: "🟫" },
    ]
  },
  {
    id: "grietas_detalle", title: "Orientacion de Grietas",
    subtitle: "Como se orientan las grietas?",
    multiSelect: false,
    conditional: (a) => a["dano"] === "grietas",
    options: [
      { value: "diagonal_45", label: "Diagonal\n45°", icon: "↗️" },
      { value: "horizontal", label: "Horizontal", icon: "➡️" },
      { value: "vertical", label: "Vertical", icon: "⬆️" },
      { value: "helicoidal", label: "Helicoidal\nEspiral", icon: "🌀" },
      { value: "mapa", label: "Ramificadas\nMapa", icon: "🕸️" },
    ],
    subQuestion: {
      id: "grietas_ancho", title: "Ancho aproximado de grietas",
      options: [
        { value: "<0.3mm", label: "<0.3mm", icon: "" },
        { value: "0.3-1mm", label: "0.3-1mm", icon: "" },
        { value: "1-3mm", label: "1-3mm", icon: "" },
        { value: ">3mm", label: ">3mm", icon: "" },
      ]
    }
  },
  {
    id: "extension", title: "Extension del Dano",
    subtitle: "El dano es localizado o se extiende en varias zonas?",
    multiSelect: false,
    options: [
      { value: "localizado", label: "Localizado\n(area pequena)", icon: "📍" },
      { value: "generalizado", label: "Generalizado\n(varias zonas)", icon: "🗺️" },
    ]
  },
  {
    id: "movimiento", title: "Movimiento de Grietas",
    subtitle: "Las grietas estan estables o siguen creciendo?",
    multiSelect: false,
    conditional: (a) => a["dano"] === "grietas",
    options: [
      { value: "sin_movimiento", label: "Estable\n(sin cambios)", icon: "🔒" },
      { value: "con_movimiento", label: "Activa\n(sigue creciendo)", icon: "📈" },
      { value: "no_se", label: "No estoy\nseguro", icon: "❓" },
    ]
  },
  {
    id: "severidad", title: "Severidad Percibida",
    subtitle: "Como evaluas la gravedad de la situacion?",
    multiSelect: false,
    options: [
      { value: "estetico", label: "Solo\nestetico", icon: "🟢" },
      { value: "preocupante", label: "Preocupante\npero estable", icon: "🟡" },
      { value: "peligroso", label: "Parece\npeligroso", icon: "🟠" },
      { value: "emergencia", label: "Emergencia\nColapso", icon: "🔴" },
    ]
  }
];

// ─── State ──────────────────────────────────────────
let geminiKey = "";
let claudeKey = "";
let provider: Provider = "gemini";
let historial: Reporte[] = [];
let currentImageBase64 = "";
let qCurrentStep = 0;
let qAnswers: Record<string, string> = {};
let qOriginalText = "";
let qIsSummary = false;

// ─── DOM refs ────────────────────────────────────────
const pages = document.querySelectorAll(".page") as NodeListOf<HTMLElement>;
const tabBtns = document.querySelectorAll(".tab-btn") as NodeListOf<HTMLButtonElement>;
const btnCapturar = document.getElementById("btnCapturar") as HTMLButtonElement;
const btnGaleria = document.getElementById("btnGaleria") as HTMLButtonElement;
const btnAnalizarTexto = document.getElementById("btnAnalizarTexto") as HTMLButtonElement;
const textoProblema = document.getElementById("textoProblema") as HTMLTextAreaElement;
const btnToggleDescripcion = document.getElementById("btnToggleDescripcion") as HTMLButtonElement;
const descripcionPanel = document.getElementById("descripcionPanel") as HTMLDivElement;
const toggleDescArrow = document.getElementById("toggleDescArrow") as HTMLSpanElement;
const quickChips = document.querySelectorAll(".quick-chip") as NodeListOf<HTMLButtonElement>;
let quickSelections: Record<string, string> = {};

// Config: Gemini
const geminiKeyInput = document.getElementById("geminiKeyInput") as HTMLInputElement;
const btnGuardarGemini = document.getElementById("btnGuardarGemini") as HTMLButtonElement;
const geminiKeyStatus = document.getElementById("geminiKeyStatus") as HTMLDivElement;

// Config: Claude
const apiKeyInput = document.getElementById("apiKeyInput") as HTMLInputElement;
const btnGuardarKey = document.getElementById("btnGuardarKey") as HTMLButtonElement;
const keyStatus = document.getElementById("keyStatus") as HTMLDivElement;

// Config: Provider selector
const configGemini = document.getElementById("configGemini") as HTMLDivElement;
const configClaude = document.getElementById("configClaude") as HTMLDivElement;
const btnProviderGemini = document.getElementById("btnProviderGemini") as HTMLButtonElement;
const btnProviderClaude = document.getElementById("btnProviderClaude") as HTMLButtonElement;

const resultBody = document.getElementById("resultBody") as HTMLDivElement;
const historialBody = document.getElementById("historialBody") as HTMLDivElement;
const guiaBody = document.getElementById("guiaBody") as HTMLDivElement;
const loadingOverlay = document.getElementById("loadingOverlay") as HTMLDivElement;

// Cuestionario DOM refs
const cuestionarioBody = document.getElementById("cuestionarioBody") as HTMLDivElement;
const qStepContainer = document.getElementById("qStepContainer") as HTMLDivElement;
const qProgressBar = document.getElementById("qProgressBar") as HTMLDivElement;
const cuestionarioStep = document.getElementById("cuestionarioStep") as HTMLSpanElement;
const btnQSkip = document.getElementById("btnQSkip") as HTMLButtonElement;
const btnQNext = document.getElementById("btnQNext") as HTMLButtonElement;
const btnQSkipAll = document.getElementById("btnQSkipAll") as HTMLButtonElement;
const btnCuestionarioBack = document.getElementById("btnCuestionarioBack") as HTMLButtonElement;

// ─── System Prompt (shared, optimized for low token usage) ─────
const IMAGENES_LISTA = generarListaImagenes();

const SYSTEM_PROMPT = `Perito estructural experto. Analiza la informacion y diagnostica.
Responde SOLO JSON valido (sin markdown):
{"tipo_falla":"string","nivel_peligro":"critico|alto|medio|bajo","debe_desalojar":bool,"descripcion":"string","recomendaciones":["string"],"tecnicas_reparacion":["string"],"urgencia":"string","imagen_referencia":"id"}

Niveles: CRITICO=colapso inminente,desalojar. ALTO=peligro,reparar urgente. MEDIO=atencion programada. BAJO=monitorear.
Sin falla clara: nivel_peligro="bajo".

IMPORTANTE: Distinguir entre danos superficiales (pintura, enlucido, recubrimiento) y danos estructurales (concreto, acero). Una columna tiene capas: pintura > enlucido > recubrimiento > concreto > acero. Grietas solo en enlucido/pintura son BAJO o MEDIO. Grietas que penetran al concreto estructural son ALTO o CRITICO. Si la descripcion no especifica profundidad, preguntar en la descripcion que podria ser superficial.

TECNICAS DE REPARACION: En "tecnicas_reparacion" indica las tecnicas aplicables segun el dano, citando SIEMPRE la norma de origen. Formato: "Nombre tecnica (Norma: seccion)". Ejemplos:
- "Inyeccion de fisuras con epoxi (Guia ACI 224: Tecnica 6)"
- "Encamisado con FRP (FEMA 547: Cap.12.4.4)"
- "Refuerzo de emergencia con laminas soldadas (Criterios de Diseno: Cap.8.8)"
- "Shotcrete via seca (Guia ACI 224: Tecnica 5)"
- "Encamisado de concreto armado (FEMA 547: Cap.12.4.4)"
Incluir al menos 2-3 tecnicas relevantes.

Para imagen_referencia, elige el ID mas relevante de esta lista:
${IMAGENES_LISTA}

Basa recomendaciones en estos documentos tecnicos:
${CRITERIOS_DISENO_KNOWLEDGE}
${FEMA_547_KNOWLEDGE}
${GUIA_REPARACION_KNOWLEDGE}`;

// ─── Navigation ──────────────────────────────────────
function navigateTo(pageId: string) {
  pages.forEach(p => p.classList.remove("active"));
  const target = document.getElementById(`page-${pageId}`);
  if (target) target.classList.add("active");

  tabBtns.forEach(btn => {
    btn.classList.toggle("active", btn.getAttribute("data-tab") === pageId);
  });

  if (pageId === "historial") renderHistorial();
}

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const tab = btn.getAttribute("data-tab");
    if (tab) navigateTo(tab);
  });
});

document.querySelectorAll("[data-nav]").forEach(btn => {
  btn.addEventListener("click", () => {
    const target = (btn as HTMLElement).getAttribute("data-nav");
    if (target) navigateTo(target);
  });
});

// ─── Storage (localStorage) ──────────────────────────
function loadData() {
  geminiKey = localStorage.getItem("triaje_geminikey") || "";
  claudeKey = localStorage.getItem("triaje_apikey") || "";
  provider = (localStorage.getItem("triaje_provider") as Provider) || "gemini";

  geminiKeyInput.value = geminiKey;
  apiKeyInput.value = claudeKey;

  updateProviderUI();

  try {
    historial = JSON.parse(localStorage.getItem("triaje_historial") || "[]");
  } catch { historial = []; }
}

function saveGeminiKey(key: string) {
  geminiKey = key;
  localStorage.setItem("triaje_geminikey", key);
}

function saveClaudeKey(key: string) {
  claudeKey = key;
  localStorage.setItem("triaje_apikey", key);
}

function saveProvider(p: Provider) {
  provider = p;
  localStorage.setItem("triaje_provider", p);
}

function saveHistorial() {
  if (historial.length > 50) historial = historial.slice(-50);
  localStorage.setItem("triaje_historial", JSON.stringify(historial));
}

// ─── Provider UI ─────────────────────────────────────
function updateProviderUI() {
  btnProviderGemini.classList.toggle("active", provider === "gemini");
  btnProviderClaude.classList.toggle("active", provider === "claude");
  configGemini.style.display = provider === "gemini" ? "block" : "none";
  configClaude.style.display = provider === "claude" ? "block" : "none";
}

btnProviderGemini.addEventListener("click", () => {
  saveProvider("gemini");
  updateProviderUI();
});

btnProviderClaude.addEventListener("click", () => {
  saveProvider("claude");
  updateProviderUI();
});

// ─── Get current API key ─────────────────────────────
function getCurrentKey(): string {
  return provider === "gemini" ? geminiKey : claudeKey;
}

function getProviderName(): string {
  return provider === "gemini" ? "Google Gemini" : "Claude";
}

// ─── Camera / Image Capture ─────────────────────────
async function captureImage(fromGallery: boolean) {
  if (!getCurrentKey()) {
    alert(`Primero configura tu API Key de ${getProviderName()} en la seccion de Configuracion.`);
    navigateTo("config");
    return;
  }

  try {
    const { Camera, CameraResultType, CameraSource } = await import("@capacitor/camera");
    const photo = await Camera.getPhoto({
      quality: 85,
      resultType: CameraResultType.Base64,
      source: fromGallery ? CameraSource.Photos : CameraSource.Camera,
      width: 1200,
      height: 1200,
    });

    if (photo.base64String) {
      currentImageBase64 = photo.base64String;
      await analyzeImage(currentImageBase64, photo.format || "jpeg");
    }
  } catch (err: any) {
    if (err.message?.includes("not implemented") || err.message?.includes("not available") || err.code === "UNIMPLEMENTED") {
      useFileInput(fromGallery);
    } else if (err.message?.includes("cancelled") || err.message?.includes("canceled")) {
      // User cancelled
    } else {
      useFileInput(fromGallery);
    }
  }
}

function useFileInput(fromGallery: boolean) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "image/*";
  if (!fromGallery) input.capture = "environment";
  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;
    const base64 = await fileToBase64(file);
    currentImageBase64 = base64;
    const format = file.type.includes("png") ? "png" : "jpeg";
    await analyzeImage(base64, format);
  };
  input.click();
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(",")[1] || result;
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── Text Analysis ──────────────────────────────────
async function analyzeText(texto: string) {
  if (!getCurrentKey()) {
    alert(`Primero configura tu API Key de ${getProviderName()} en la seccion de Configuracion.`);
    navigateTo("config");
    return;
  }

  if (!texto.trim()) {
    alert("Por favor describe el problema estructural que observas.");
    return;
  }

  loadingOverlay.style.display = "flex";

  try {
    let resultado: ResultadoTriaje;

    if (provider === "gemini") {
      resultado = await callGeminiText(texto);
    } else {
      resultado = await callClaudeText(texto);
    }

    const reporte: Reporte = {
      id: Date.now().toString(),
      fecha: new Date().toLocaleString("es-MX"),
      imagen_base64: "",
      resultado,
      modo: "texto",
      texto_original: texto,
    };
    historial.push(reporte);
    saveHistorial();

    renderResultadoTexto(resultado, texto);
    navigateTo("resultado");

  } catch (err: any) {
    alert("Error al analizar: " + (err.message || err));
  } finally {
    loadingOverlay.style.display = "none";
  }
}

// ─── Image Analysis ─────────────────────────────────
async function analyzeImage(base64: string, format: string) {
  loadingOverlay.style.display = "flex";

  try {
    let resultado: ResultadoTriaje;

    if (provider === "gemini") {
      resultado = await callGeminiImage(base64, format);
    } else {
      resultado = await callClaudeImage(base64, format);
    }

    const reporte: Reporte = {
      id: Date.now().toString(),
      fecha: new Date().toLocaleString("es-MX"),
      imagen_base64: base64.substring(0, 200),
      resultado,
      modo: "foto",
    };
    historial.push(reporte);
    saveHistorial();

    renderResultado(resultado, base64, format);
    navigateTo("resultado");

  } catch (err: any) {
    alert("Error al analizar: " + (err.message || err));
  } finally {
    loadingOverlay.style.display = "none";
  }
}

// ─── Google Gemini API (GRATIS) ─────────────────────
function parseJsonResponse(text: string): ResultadoTriaje {
  let jsonStr = text.trim();
  if (jsonStr.startsWith("```")) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "");
  }
  return JSON.parse(jsonStr);
}

async function callGeminiImage(base64: string, format: string): Promise<ResultadoTriaje> {
  const mimeType = format === "png" ? "image/png" : "image/jpeg";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{
        parts: [
          { inline_data: { mime_type: mimeType, data: base64 } },
          { text: "Diagnostica esta estructura. Solo JSON." }
        ]
      }],
      generationConfig: { maxOutputTokens: 4096, temperature: 0.3 }
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || `Error HTTP ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return parseJsonResponse(text);
}

async function callGeminiText(texto: string): Promise<ResultadoTriaje> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{
        parts: [
          { text: `Diagnostica este problema estructural. Solo JSON.\n\n${texto}` }
        ]
      }],
      generationConfig: { maxOutputTokens: 4096, temperature: 0.3 }
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || `Error HTTP ${response.status}`);
  }

  const data = await response.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "";
  return parseJsonResponse(text);
}

// ─── Claude API (DE PAGO) ───────────────────────────
async function callClaudeImage(base64: string, format: string): Promise<ResultadoTriaje> {
  const mediaType = format === "png" ? "image/png" : "image/jpeg";

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": claudeKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{
        role: "user",
        content: [
          { type: "image", source: { type: "base64", media_type: mediaType, data: base64 } },
          { type: "text", text: "Diagnostica esta estructura. Solo JSON." }
        ]
      }]
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || `Error HTTP ${response.status}`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text || "";
  return parseJsonResponse(text);
}

async function callClaudeText(texto: string): Promise<ResultadoTriaje> {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": claudeKey,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 2048,
      system: SYSTEM_PROMPT,
      messages: [{
        role: "user",
        content: `Diagnostica este problema estructural. Solo JSON.\n\n${texto}`
      }]
    }),
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || `Error HTTP ${response.status}`);
  }

  const data = await response.json();
  const text = data.content?.[0]?.text || "";
  return parseJsonResponse(text);
}

// ─── Render: Resultado (con imagen) ──────────────────
const NIVEL_CONFIG: Record<string, { icon: string; label: string }> = {
  critico: { icon: "🔴", label: "CRITICO" },
  alto: { icon: "🟠", label: "ALTO" },
  medio: { icon: "🟡", label: "MEDIO" },
  bajo: { icon: "🟢", label: "BAJO" },
};

function renderResultado(r: ResultadoTriaje, base64: string, format: string) {
  const nivel = NIVEL_CONFIG[r.nivel_peligro] || NIVEL_CONFIG.bajo;
  const mediaType = format === "png" ? "image/png" : "image/jpeg";

  let html = `<img src="data:${mediaType};base64,${base64}" class="result-image" alt="Imagen analizada">`;
  html += renderResultadoComun(r, nivel);

  resultBody.innerHTML = html;
}

function renderResultadoTexto(r: ResultadoTriaje, textoOriginal: string) {
  const nivel = NIVEL_CONFIG[r.nivel_peligro] || NIVEL_CONFIG.bajo;

  let html = `<div class="result-section" style="background:#EEF2FF;border-color:var(--accent);">
    <h3>✍️ Descripcion Proporcionada</h3>
    <p style="font-style:italic;">"${textoOriginal}"</p>
  </div>`;
  html += renderResultadoComun(r, nivel);

  resultBody.innerHTML = html;
}

function renderResultadoComun(r: ResultadoTriaje, nivel: { icon: string; label: string }): string {
  let html = "";

  // Danger badge
  html += `<div class="danger-badge ${r.nivel_peligro}">${nivel.icon} ${nivel.label}</div>`;

  // Imagen de referencia del documento tecnico
  if (r.imagen_referencia) {
    const imgRef = buscarImagen(r.imagen_referencia);
    if (imgRef) {
      html += `<div class="result-section ref-image-section">
        <h3>📐 Diagrama de Referencia</h3>
        <p class="ref-figura">${imgRef.figura}: ${imgRef.descripcion}</p>
        <img src="./images/${imgRef.archivo}" class="ref-image" alt="${imgRef.descripcion}">
      </div>`;
    }
  }

  // Evacuation alert
  if (r.debe_desalojar) {
    html += `<div class="desalojar-alert">
      <div class="alert-icon">🚨</div>
      <p>¡DESALOJAR INMEDIATAMENTE!</p>
    </div>`;
  }

  // Tipo de falla
  html += `<div class="result-section">
    <h3>Tipo de Falla</h3>
    <p>${r.tipo_falla}</p>
  </div>`;

  // Descripcion
  html += `<div class="result-section">
    <h3>Descripcion</h3>
    <p>${r.descripcion}</p>
  </div>`;

  // Urgencia
  html += `<div class="result-section">
    <h3>Urgencia</h3>
    <p>${r.urgencia}</p>
  </div>`;

  // Recomendaciones
  if (r.recomendaciones?.length) {
    html += `<div class="result-section">
      <h3>Recomendaciones</h3>
      <ul>${r.recomendaciones.map(rec => `<li>${rec}</li>`).join("")}</ul>
    </div>`;
  }

  // Tecnicas de reparacion
  if (r.tecnicas_reparacion?.length) {
    html += `<div class="result-section tecnicas-section">
      <h3>🔧 Tecnicas de Reparacion</h3>
      <ul>${r.tecnicas_reparacion.map(tec => {
        // Resaltar la norma entre parentesis
        const formatted = tec.replace(/\(([^)]+)\)/g, '<span class="norma-ref">($1)</span>');
        return `<li>${formatted}</li>`;
      }).join("")}</ul>
    </div>`;
  }

  // Provider badge
  html += `<div style="text-align:center;margin:8px 0;font-size:12px;color:var(--fg3);">
    Analizado con ${provider === "gemini" ? "Google Gemini 🟢" : "Claude (Anthropic) 🟣"}
  </div>`;

  // Action buttons
  html += `<button class="btn-primary" onclick="document.querySelector('[data-tab=inicio]').click()">📷 Nueva Evaluacion</button>`;
  html += `<button class="btn-secondary" onclick="document.querySelector('[data-tab=guia]').click()">📖 Ver Guia de Reparacion</button>`;

  return html;
}

// ─── Render: Historial ──────────────────────────────
function renderHistorial() {
  if (historial.length === 0) {
    historialBody.innerHTML = `<div class="empty-state">
      <div class="empty-icon">📋</div>
      <p>No hay evaluaciones registradas.</p>
      <p style="font-size:13px;margin-top:8px;">Toma una foto o escribe una descripcion para iniciar.</p>
    </div>`;
    return;
  }

  const sorted = [...historial].reverse();
  let html = "";

  for (const rep of sorted) {
    const nivel = NIVEL_CONFIG[rep.resultado.nivel_peligro] || NIVEL_CONFIG.bajo;
    const modoIcon = rep.modo === "texto" ? "✍️" : "📷";
    html += `<div class="history-card ${rep.resultado.nivel_peligro}">
      <h4>${modoIcon} ${rep.resultado.tipo_falla}</h4>
      <div class="hc-meta">${rep.fecha}</div>
      <span class="hc-badge nivel-badge ${rep.resultado.nivel_peligro}">${nivel.icon} ${nivel.label}</span>
      <p style="font-size:13px;color:var(--fg2);margin-top:8px;">${rep.resultado.descripcion.substring(0, 100)}...</p>
    </div>`;
  }

  historialBody.innerHTML = html;
}

// ─── Render: Guia de Reparacion ─────────────────────
function renderGuia() {
  let html = `<div class="guia-intro">
    <h2>Guia de Reparacion Estructural</h2>
    <p>Selecciona el tipo de falla para ver metodos de reparacion, materiales y procedimientos.</p>
    <div class="guia-warning">
      <span>⚠️</span>
      <span>Esta guia es informativa. Siempre consulta a un ingeniero estructural certificado antes de realizar reparaciones.</span>
    </div>
  </div>`;

  for (const falla of GUIA_REPARACION) {
    const metodoCount = falla.metodos.length;
    html += `<div class="falla-card ${falla.nivel_tipico}" data-falla="${falla.id}">
      <div class="falla-header">
        <div class="falla-top">
          <span class="falla-nombre">${falla.falla}</span>
          <span class="nivel-badge ${falla.nivel_tipico}">${NIVEL_CONFIG[falla.nivel_tipico]?.icon || ""} ${(falla.nivel_tipico || "").toUpperCase()}</span>
        </div>
        <div class="falla-desc">${falla.descripcion}</div>
        <div class="falla-hint">Ver ${metodoCount} metodo${metodoCount > 1 ? "s" : ""} de reparacion</div>
      </div>
      <div class="falla-metodos">`;

    falla.metodos.forEach((metodo, idx) => {
      html += `<div class="metodo-card" data-metodo="${falla.id}-${idx}">
        <div class="metodo-top">
          <span class="metodo-num">${idx + 1}</span>
          <span class="metodo-nombre">${metodo.nombre}</span>
          <span class="metodo-arrow">▼</span>
        </div>
        <div class="metodo-desc-short">${metodo.descripcion}</div>
        <div class="metodo-detalle">
          <div class="metodo-seccion">
            <h5>Cuando usar:</h5>
            <p>${metodo.cuando_usar}</p>
          </div>
          <div class="metodo-seccion">
            <h5>Materiales necesarios:</h5>
            <ul>${metodo.materiales.map(m => `<li>${m}</li>`).join("")}</ul>
          </div>
          <div class="metodo-seccion">
            <h5>Procedimiento:</h5>
            ${metodo.pasos.map((p, i) => `<div class="paso-item"><span class="paso-num">${i + 1}</span><span class="paso-text">${p}</span></div>`).join("")}
          </div>
          ${metodo.imagenes?.length ? `<div class="metodo-seccion metodo-imagenes">
            <h5>📐 Diagramas de Referencia:</h5>
            ${metodo.imagenes.map(img => `<div class="metodo-img-item">
              <img src="./images/${img.archivo}" alt="${img.descripcion}" class="metodo-img" loading="lazy">
              <span class="metodo-img-desc">${img.descripcion}</span>
            </div>`).join("")}
          </div>` : ""}
        </div>
      </div>`;
    });

    html += `</div></div>`;
  }

  html += `<div style="text-align:center;padding:16px;color:var(--fg3);font-size:12px;line-height:18px;">
    Guia basada en el documento "Criterios de Diseno y Detalles Estructurales"<br>y practicas estandar de ingenieria estructural.<br>No sustituye la evaluacion de un profesional.
  </div>`;

  guiaBody.innerHTML = html;

  // Falla card expand/collapse
  guiaBody.querySelectorAll(".falla-header").forEach(header => {
    header.addEventListener("click", () => {
      const card = header.closest(".falla-card") as HTMLElement;
      card.classList.toggle("open");
      const hint = card.querySelector(".falla-hint") as HTMLElement;
      if (hint) hint.textContent = card.classList.contains("open") ? "Toca para cerrar" : hint.textContent.replace("Toca para cerrar", `Ver ${card.querySelectorAll(".metodo-card").length} metodo(s)`);
    });
  });

  // Metodo card expand/collapse
  guiaBody.querySelectorAll(".metodo-card").forEach(card => {
    card.addEventListener("click", (e) => {
      e.stopPropagation();
      (card as HTMLElement).classList.toggle("open");
      const arrow = card.querySelector(".metodo-arrow") as HTMLElement;
      if (arrow) arrow.textContent = (card as HTMLElement).classList.contains("open") ? "▲" : "▼";
    });
  });
}

// ─── Cuestionario Logic ──────────────────────────────
function getActiveSteps(): QuestionStep[] {
  return QUESTION_STEPS.filter(step => {
    if (step.conditional) return step.conditional(qAnswers);
    return true;
  });
}

function startQuestionnaire(texto: string, prefill?: Record<string, string>) {
  qOriginalText = texto;
  qCurrentStep = 0;
  qAnswers = prefill ? { ...prefill } : {};
  qIsSummary = false;
  btnQSkip.style.display = "";
  btnQSkipAll.style.display = "";
  navigateTo("cuestionario");
  renderCurrentStep();
}

function renderCurrentStep() {
  const activeSteps = getActiveSteps();
  if (qCurrentStep >= activeSteps.length) {
    showSummaryStep();
    return;
  }
  const step = activeSteps[qCurrentStep];
  const totalSteps = activeSteps.length;

  const progress = ((qCurrentStep + 1) / (totalSteps + 1)) * 100;
  qProgressBar.style.width = `${progress}%`;
  cuestionarioStep.textContent = `${qCurrentStep + 1}/${totalSteps}`;

  let html = "";
  if (qCurrentStep === 0) {
    const preview = qOriginalText.length > 100 ? qOriginalText.substring(0, 100) + "..." : qOriginalText;
    html += `<div class="q-original-text">"${preview}"</div>`;
  }

  html += `<h2 class="q-title">${step.title}</h2>`;
  html += `<p class="q-subtitle">${step.subtitle}</p>`;
  html += `<div class="q-options">`;
  const currentValue = qAnswers[step.id];
  for (const opt of step.options) {
    const selected = currentValue === opt.value ? "selected" : "";
    html += `<button class="q-option ${selected}" data-step="${step.id}" data-value="${opt.value}">
      <span class="q-option-icon">${opt.icon}</span>
      <span class="q-option-label">${opt.label}</span>
    </button>`;
  }
  // "Otro - Describir" option
  const otroKey = `${step.id}_otro`;
  const isOtroSelected = currentValue === "_otro";
  html += `</div>`;
  html += `<button class="q-otro-btn ${isOtroSelected ? 'selected' : ''}" id="btnOtro_${step.id}">✍️ Otro - Describir</button>`;
  html += `<div class="q-otro-input" id="otroInput_${step.id}" style="display:${isOtroSelected ? 'block' : 'none'};">
    <input type="text" class="q-otro-field" id="otroField_${step.id}" placeholder="Describe..." value="${qAnswers[otroKey] || ''}">
  </div>`;

  if (step.subQuestion) {
    html += `<p class="q-subtitle" style="margin-top:4px;">${step.subQuestion.title}</p>`;
    html += `<div class="q-options q-options--row">`;
    const subValue = qAnswers[step.subQuestion.id];
    for (const opt of step.subQuestion.options) {
      const selected = subValue === opt.value ? "selected" : "";
      html += `<button class="q-option ${selected}" data-step="${step.subQuestion.id}" data-value="${opt.value}">
        <span class="q-option-label">${opt.label}</span>
      </button>`;
    }
    html += `</div>`;
  }

  qStepContainer.innerHTML = html;
  btnQNext.textContent = qCurrentStep === totalSteps - 1 ? "Revisar y Analizar" : "Siguiente";
  btnQSkip.style.display = "";
  btnQSkipAll.style.display = "";
  qIsSummary = false;

  // Option click handlers
  qStepContainer.querySelectorAll(".q-option").forEach(btn => {
    btn.addEventListener("click", () => {
      const stepId = btn.getAttribute("data-step")!;
      const value = btn.getAttribute("data-value")!;
      qAnswers[stepId] = value;
      const siblings = btn.parentElement!.querySelectorAll(".q-option");
      siblings.forEach(s => s.classList.remove("selected"));
      btn.classList.add("selected");
      // Deselect "Otro" if a regular option is clicked
      if (stepId === step.id) {
        const otroBtn = document.getElementById(`btnOtro_${step.id}`);
        const otroDiv = document.getElementById(`otroInput_${step.id}`);
        if (otroBtn) otroBtn.classList.remove("selected");
        if (otroDiv) otroDiv.style.display = "none";
      }
    });
  });

  // "Otro" button handler
  const otroBtn = document.getElementById(`btnOtro_${step.id}`);
  const otroDiv = document.getElementById(`otroInput_${step.id}`);
  const otroField = document.getElementById(`otroField_${step.id}`) as HTMLInputElement | null;
  if (otroBtn && otroDiv && otroField) {
    otroBtn.addEventListener("click", () => {
      // Deselect all regular options
      qStepContainer.querySelectorAll(`.q-option[data-step="${step.id}"]`).forEach(s => s.classList.remove("selected"));
      otroBtn.classList.add("selected");
      otroDiv.style.display = "block";
      qAnswers[step.id] = "_otro";
      otroField.focus();
    });
    otroField.addEventListener("input", () => {
      qAnswers[otroKey] = otroField.value;
    });
  }

  cuestionarioBody.scrollTop = 0;
}

function showSummaryStep() {
  qIsSummary = true;
  const activeSteps = getActiveSteps();
  qProgressBar.style.width = "100%";
  cuestionarioStep.textContent = "Resumen";

  let html = `<h2 class="q-title">Resumen</h2>`;
  html += `<p class="q-subtitle">Revisa la informacion antes de analizar</p>`;
  html += `<div class="q-summary">`;
  html += `<div class="q-summary-item" style="flex-direction:column;align-items:flex-start;">
    <span class="q-summary-label">Descripcion original</span>
    <span class="q-summary-value" style="margin-top:4px;font-weight:400;max-width:100%;text-align:left;">"${qOriginalText}"</span>
  </div>`;

  for (const step of activeSteps) {
    const answer = qAnswers[step.id];
    const opt = step.options.find(o => o.value === answer);
    let displayValue = "No especificado";
    let isSkip = true;
    if (answer === "_otro" && qAnswers[`${step.id}_otro`]) {
      displayValue = `"${qAnswers[`${step.id}_otro`]}"`;
      isSkip = false;
    } else if (opt) {
      displayValue = opt.label.replace(/\n/g, " ");
      isSkip = false;
    }
    html += `<div class="q-summary-item">
      <span class="q-summary-label">${step.title}</span>
      <span class="q-summary-value ${isSkip ? 'q-summary-skip' : ''}">
        ${displayValue}
      </span>
    </div>`;
    if (step.subQuestion && qAnswers[step.subQuestion.id]) {
      html += `<div class="q-summary-item">
        <span class="q-summary-label" style="padding-left:12px;">${step.subQuestion.title}</span>
        <span class="q-summary-value">${qAnswers[step.subQuestion.id]}</span>
      </div>`;
    }
  }
  html += `</div>`;

  qStepContainer.innerHTML = html;
  btnQNext.textContent = "Analizar con IA";
  btnQSkip.style.display = "none";
  btnQSkipAll.style.display = "none";
  cuestionarioBody.scrollTop = 0;
}

function resolveAnswer(stepId: string, labels: Record<string, string>): string | null {
  const val = qAnswers[stepId];
  if (!val) return null;
  if (val === "_otro") return qAnswers[`${stepId}_otro`] || null;
  return labels[val] || val;
}

function compileDescription(): string {
  const parts: string[] = [`Descripcion del usuario: ${qOriginalText}`];
  const structured: string[] = [];

  const elemento = resolveAnswer("elemento", {
    columna: "Columna", viga: "Viga", losa: "Losa de entrepiso/azotea",
    muro: "Muro", cimentacion: "Cimentacion/zapata", pilote: "Pilote",
  });
  if (elemento) structured.push(`Elemento afectado: ${elemento}`);

  const dano = resolveAnswer("dano", {
    grietas: "Grietas y fisuras", corrosion: "Corrosion del acero de refuerzo",
    desprendimiento: "Desprendimiento de concreto/recubrimiento",
    deformacion: "Deformacion o pandeo del elemento",
    hundimiento: "Hundimiento o asentamiento diferencial",
    humedad: "Humedad y filtraciones",
  });
  if (dano) structured.push(`Tipo de dano: ${dano}`);

  const prof = resolveAnswer("profundidad", {
    pintura: "Superficial - solo afecta pintura o enlucido",
    recubrimiento: "Concreto de recubrimiento expuesto (superficial)",
    estructural: "Dano al concreto estructural (profundo)",
    acero_visible: "Acero de refuerzo visible (profundo)",
    acero_oxidado: "Acero de refuerzo oxidado con perdida de seccion (profundo, corrosion activa)",
  });
  if (prof) structured.push(`Profundidad: ${prof}`);

  const grietaOrient = resolveAnswer("grietas_detalle", {
    diagonal_45: "Diagonales a 45 grados (sugiere falla por cortante)",
    horizontal: "Horizontales (sugiere falla por flexion)",
    vertical: "Verticales (sugiere falla por flexion)",
    helicoidal: "Helicoidales/espiral (sugiere falla por torsion)",
    mapa: "Ramificadas tipo mapa (dano generalizado)",
  });
  if (grietaOrient) structured.push(`Orientacion de grietas: ${grietaOrient}`);

  const grietaAncho = qAnswers["grietas_ancho"];
  if (grietaAncho) structured.push(`Ancho de grietas: ${grietaAncho}`);

  const ext = resolveAnswer("extension", {
    localizado: "Dano localizado en area pequena",
    generalizado: "Dano generalizado en multiples zonas",
  });
  if (ext) structured.push(`Extension: ${ext}`);

  const mov = resolveAnswer("movimiento", {
    sin_movimiento: "Grietas sin movimiento (estables)",
    con_movimiento: "Grietas con movimiento activo (siguen creciendo)",
    no_se: "No se ha determinado si hay movimiento",
  });
  if (mov) structured.push(`Movimiento: ${mov}`);

  const sev = resolveAnswer("severidad", {
    estetico: "El usuario percibe el dano como solo estetico",
    preocupante: "El usuario percibe el dano como preocupante pero la estructura parece estable",
    peligroso: "El usuario percibe la situacion como peligrosa con deformacion visible",
    emergencia: "EMERGENCIA: El usuario reporta riesgo de colapso, post-sismo o post-incendio",
  });
  if (sev) structured.push(`Severidad percibida: ${sev}`);

  if (structured.length > 0) {
    parts.push("\nInformacion estructurada del cuestionario:");
    parts.push(structured.join("\n"));
  }

  return parts.join("\n");
}

// ─── Quick Chips + Toggle Descripcion ────────────────
quickChips.forEach(chip => {
  chip.addEventListener("click", () => {
    const group = chip.getAttribute("data-qsel")!;
    const value = chip.getAttribute("data-value")!;
    // Deselect siblings in same group
    document.querySelectorAll(`.quick-chip[data-qsel="${group}"]`).forEach(c => c.classList.remove("selected"));
    // Toggle: if already selected, deselect
    if (quickSelections[group] === value) {
      delete quickSelections[group];
    } else {
      quickSelections[group] = value;
      chip.classList.add("selected");
    }
  });
});

btnToggleDescripcion.addEventListener("click", () => {
  const visible = descripcionPanel.style.display !== "none";
  descripcionPanel.style.display = visible ? "none" : "block";
  toggleDescArrow.textContent = visible ? "▼" : "▲";
});

// ─── Event Listeners ────────────────────────────────
btnCapturar.addEventListener("click", () => captureImage(false));
btnGaleria.addEventListener("click", () => captureImage(true));

btnAnalizarTexto.addEventListener("click", () => {
  const texto = textoProblema.value.trim();
  const hasChips = quickSelections["elemento"] || quickSelections["dano"];

  if (!texto && !hasChips) {
    alert("Selecciona al menos un elemento o tipo de dano, o describe el problema.");
    return;
  }
  if (!getCurrentKey()) {
    alert(`Primero configura tu API Key de ${getProviderName()} en la seccion de Configuracion.`);
    navigateTo("config");
    return;
  }

  // Build initial description from chips + text
  const parts: string[] = [];
  if (quickSelections["elemento"]) parts.push(quickSelections["elemento"]);
  if (quickSelections["dano"]) parts.push(`con ${quickSelections["dano"]}`);
  if (texto) parts.push(texto);
  const initialText = parts.join(" ").trim() || texto;

  // Pre-fill questionnaire answers from chips
  const prefill: Record<string, string> = {};
  if (quickSelections["elemento"]) prefill["elemento"] = quickSelections["elemento"];
  if (quickSelections["dano"]) prefill["dano"] = quickSelections["dano"];
  startQuestionnaire(initialText, prefill);
});

// Cuestionario navigation
btnQNext.addEventListener("click", () => {
  const activeSteps = getActiveSteps();
  if (qIsSummary) {
    const compiledText = compileDescription();
    analyzeText(compiledText);
    return;
  }
  if (qCurrentStep < activeSteps.length - 1) {
    qCurrentStep++;
    renderCurrentStep();
  } else {
    qCurrentStep = activeSteps.length;
    showSummaryStep();
  }
});

btnQSkip.addEventListener("click", () => {
  const activeSteps = getActiveSteps();
  if (qCurrentStep < activeSteps.length - 1) {
    qCurrentStep++;
    renderCurrentStep();
  } else {
    qCurrentStep = activeSteps.length;
    showSummaryStep();
  }
});

btnCuestionarioBack.addEventListener("click", () => {
  if (qIsSummary) {
    const activeSteps = getActiveSteps();
    qCurrentStep = activeSteps.length - 1;
    renderCurrentStep();
  } else if (qCurrentStep > 0) {
    qCurrentStep--;
    renderCurrentStep();
  } else {
    navigateTo("inicio");
  }
});

btnQSkipAll.addEventListener("click", () => {
  analyzeText(qOriginalText);
});

// Save Gemini key
btnGuardarGemini.addEventListener("click", () => {
  const key = geminiKeyInput.value.trim();
  if (!key) {
    geminiKeyStatus.textContent = "La API key no puede estar vacia";
    geminiKeyStatus.className = "key-status err";
    return;
  }
  saveGeminiKey(key);
  geminiKeyStatus.textContent = "✓ API key de Gemini guardada correctamente";
  geminiKeyStatus.className = "key-status ok";
});

// Save Claude key
btnGuardarKey.addEventListener("click", () => {
  const key = apiKeyInput.value.trim();
  if (!key) {
    keyStatus.textContent = "La API key no puede estar vacia";
    keyStatus.className = "key-status err";
    return;
  }
  saveClaudeKey(key);
  keyStatus.textContent = "✓ API key de Claude guardada correctamente";
  keyStatus.className = "key-status ok";
});

// ─── Init ───────────────────────────────────────────
loadData();
renderGuia();
