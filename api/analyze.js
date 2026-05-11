import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = (process.env.GEMINI_API_KEY || '').trim();
  if (!apiKey) {
    return res.status(500).json({ error: 'Error del servidor: La clave GEMINI_API_KEY no está configurada.' });
  }

  try {
    const { base64, mimeType, answers } = req.body;
    if (!base64 || !mimeType) {
      return res.status(400).json({ error: 'Faltan datos de la imagen.' });
    }

    const answersText = answers ? Object.entries(answers).map(([q, a]) => `- ${q}: ${a}`).join('\n') : 'No se proporcionaron respuestas.';

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Lista de modelos detectados en tu panel de control
    const modelsToTry = [
      "gemini-2-flash",
      "gemini-2.5-flash",
      "gemini-1.5-flash-latest",
      "gemini-2.0-flash-exp"
    ];

    let lastError = null;
    let text = "";

    for (const modelName of modelsToTry) {
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const prompt = `Actúa como un asesor técnico experto en Terapia Ocupacional. Genera un informe clínico DIRECTO y CATEGÓRICO basado en la IMAGEN adjunta y en las RESPUESTAS del cuestionario.

REGLAS CRÍTICAS DE LENGUAJE:
- PROHIBIDO usar lenguaje condicional como "Si detectas...", "Si tienes...", "Podrías valorar...".
- USA lenguaje imperativo y directo: "Se observa...", "Instala...", "Es necesario...".
- SÉ ESPECÍFICO: Si el cuestionario dice que no hay ascensor, no menciones el ascensor como una opción, céntrate en la barrera que eso supone.

RESPUESTAS DEL CUESTIONARIO:
${answersText}

Estructura del Informe (USA ### PARA TÍTULOS):
### 1. DIAGNÓSTICO TÉCNICO
Analiza la imagen y cruza los datos con el cuestionario. Identifica barreras reales y puntos de seguridad existentes.
### 2. PLAN DE ADAPTACIÓN Y PRODUCTOS
Mezcla el consejo clínico con la solución. Cuando recomiendes uno de estos productos, INSERTA OBLIGATORIAMENTE su etiqueta especial para que yo pueda mostrar la foto:
   - Tabla de bañera -> Usa la etiqueta: [[PRODUCTO:1]]
   - Asiento para ducha -> Usa la etiqueta: [[PRODUCTO:2]]
   - Barras de apoyo -> Usa la etiqueta: [[PRODUCTO:3]]
   - Alza de WC -> Usa la etiqueta: [[PRODUCTO:4]]
   
IMPORTANTE: Escribe la etiqueta EXACTAMENTE como [[PRODUCTO:X]], incluyendo los dobles corchetes. No pongas enlaces de Amazon en texto, solo la etiqueta.
### 3. SEGURIDAD Y ACCESIBILIDAD EXTERIOR
Si el cuestionario indica falta de ascensor o puertas estrechas, dicta aquí las medidas de seguridad urgentes.
### 4. CONCLUSIÓN PROFESIONAL
Un párrafo final con la hoja de ruta clara para la autonomía del usuario.

REGLAS DE ORO: NO inventes URLs. Tono profesional y empático pero resolutivo. No pongas los enlaces de Amazon directamente, usa solo las etiquetas [[PRODUCTO:X]].`;

        const result = await model.generateContent([
          prompt,
          {
            inlineData: {
              data: base64,
              mimeType: mimeType
            }
          }
        ]);

        text = result.response.text();
        if (text) break; // Si tenemos éxito, salimos del bucle
      } catch (error) {
        lastError = error;
        console.warn(`Fallo con el modelo ${modelName}, probando el siguiente...`, error.message);
      }
    }

    if (text) {
      return res.status(200).json({ text });
    } else {
      throw lastError; // Si todos fallan, lanzamos el último error
    }

  } catch (error) {
    console.error('Error en el análisis:', error);
    return res.status(500).json({ 
      error: 'Error al procesar la imagen con la IA oficial: ' + error.message,
      details: error
    });
  }
}
