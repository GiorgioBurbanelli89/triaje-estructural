/**
 * Triaje Estructural — App principal v2.0
 * Evaluacion de danos estructurales con IA (Google Gemini GRATIS / Claude opcional)
 * Soporta analisis por foto y por descripcion de texto
 */
import { GUIA_REPARACION } from "./guia-data.js";
import { CRITERIOS_DISENO_KNOWLEDGE } from "./criterios-knowledge.js";

// ─── Interfaces ──────────────────────────────────────
interface ResultadoTriaje {
  tipo_falla: string;
  nivel_peligro: "critico" | "alto" | "medio" | "bajo";
  debe_desalojar: boolean;
  descripcion: string;
  recomendaciones: string[];
  urgencia: string;
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

// ─── State ──────────────────────────────────────────
let geminiKey = "";
let claudeKey = "";
let provider: Provider = "gemini";
let historial: Reporte[] = [];
let currentImageBase64 = "";

// ─── DOM refs ────────────────────────────────────────
const pages = document.querySelectorAll(".page") as NodeListOf<HTMLElement>;
const tabBtns = document.querySelectorAll(".tab-btn") as NodeListOf<HTMLButtonElement>;
const btnCapturar = document.getElementById("btnCapturar") as HTMLButtonElement;
const btnGaleria = document.getElementById("btnGaleria") as HTMLButtonElement;
const btnAnalizarTexto = document.getElementById("btnAnalizarTexto") as HTMLButtonElement;
const textoProblema = document.getElementById("textoProblema") as HTMLTextAreaElement;

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

// ─── System Prompt (shared) ──────────────────────────
const SYSTEM_PROMPT = `Eres un perito estructural experto con 30 anos de experiencia en evaluacion de danos estructurales.
Analiza la informacion proporcionada (imagen o descripcion) y proporciona un diagnostico detallado.

DEBES responder UNICAMENTE con un JSON valido (sin markdown, sin bloques de codigo) con esta estructura exacta:
{
  "tipo_falla": "nombre del tipo de falla detectada",
  "nivel_peligro": "critico|alto|medio|bajo",
  "debe_desalojar": true/false,
  "descripcion": "descripcion detallada de lo observado o analizado",
  "recomendaciones": ["recomendacion 1", "recomendacion 2", ...],
  "urgencia": "descripcion de la urgencia de intervencion"
}

Criterios de clasificacion:
- CRITICO (rojo): Colapso inminente, desalojar inmediatamente. Columnas aplastadas, deformaciones severas, pandeo de elementos principales.
- ALTO (naranja): Peligro significativo, reparacion urgente. Grietas diagonales en elementos de carga, corrosion avanzada, perdida parcial de seccion.
- MEDIO (amarillo): Requiere atencion programada. Grietas por flexion menores, desprendimiento de recubrimiento, humedad moderada.
- BAJO (verde): Sin peligro inmediato, monitorear. Fisuras capilares, manchas superficiales, desgaste normal.

Si no se puede determinar una falla estructural, responde con nivel_peligro "bajo" y en descripcion indica que no se detecta falla estructural clara.

IMPORTANTE: Basa tus recomendaciones de reparacion en el siguiente documento tecnico de referencia. Cuando sugieras metodos de reparacion, utiliza los procedimientos, materiales y especificaciones de este documento:

${CRITERIOS_DISENO_KNOWLEDGE}`;

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
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{
        parts: [
          { inline_data: { mime_type: mimeType, data: base64 } },
          { text: "Analiza esta imagen de la estructura y proporciona tu diagnostico como perito estructural. Responde SOLO con el JSON." }
        ]
      }],
      generationConfig: { maxOutputTokens: 2048, temperature: 0.3 }
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
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${geminiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents: [{
        parts: [
          { text: `El usuario describe el siguiente problema estructural. Analiza la descripcion y proporciona tu diagnostico como perito estructural con recomendaciones de reparacion basadas en el documento de referencia. Responde SOLO con el JSON.\n\nDESCRIPCION DEL PROBLEMA:\n${texto}` }
        ]
      }],
      generationConfig: { maxOutputTokens: 2048, temperature: 0.3 }
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
          { type: "text", text: "Analiza esta imagen de la estructura y proporciona tu diagnostico como perito estructural. Responde SOLO con el JSON." }
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
        content: `El usuario describe el siguiente problema estructural. Analiza la descripcion y proporciona tu diagnostico como perito estructural con recomendaciones de reparacion basadas en el documento de referencia. Responde SOLO con el JSON.\n\nDESCRIPCION DEL PROBLEMA:\n${texto}`
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

// ─── Event Listeners ────────────────────────────────
btnCapturar.addEventListener("click", () => captureImage(false));
btnGaleria.addEventListener("click", () => captureImage(true));

btnAnalizarTexto.addEventListener("click", () => {
  analyzeText(textoProblema.value);
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
