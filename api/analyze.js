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
        const prompt = `Actúa como un asesor técnico experto en Terapia Ocupacional. Genera un informe detallado basado en la IMAGEN adjunta y en las RESPUESTAS del cuestionario del usuario.
        
RESPUESTAS DEL CUESTIONARIO:
${answersText}

Tu objetivo es generar un informe detallado que mezcle consejos técnicos con recomendaciones de productos concretos. Prioriza siempre la seguridad y la autonomía.

Estructura del Informe:
1. DIAGNÓSTICO POR ÁREAS: Sé descriptivo. Para cada elemento analizado (puertas, baño, iluminación, etc.):
   - Identifica BARRERAS o riesgos detectados.
   - Identifica PUNTOS CORRECTOS (lo que ya está bien adaptado o es seguro).
2. RECOMENDACIONES TÉCNICAS Y PRODUCTOS: Mezcla el 'por qué' clínico con la solución. Usa estos enlaces exclusivamente:
   - Tabla de bañera (https://amzn.to/4uLnkU5)
   - Asiento para ducha (https://amzn.to/4dfjkUJ)
   - Barras de apoyo (https://amzn.to/4u4JBw3)
   - Alza de WC (https://amzn.to/42hlsWU)
3. AVISO CRÍTICO / ACCESIBILIDAD EXTERIOR:
   - Si detectas pasos ≤ 60 cm: 'AVISO: Tus pasos de puerta son reducidos. Asegúrate de que el producto no supere los 55 cm de ancho total'.
   - Si detectas o se menciona que NO hay ascensor en un piso o casa de varias plantas: Sugiere valorar con la comunidad o propietarios la instalación de un ascensor, salvaescaleras o rampa normativa.
4. ANÁLISIS GENERAL: Finaliza con un párrafo que resuma el estado global de la estancia, destacando sus puntos fuertes y una hoja de ruta clara para mejorar los puntos débiles.

REGLAS DE ORO: NO inventes URLs. Usa un tono profesional, clínico y empático. Si el espacio es muy pequeño, prioriza el consejo de seguridad sobre la recomendación de compra.`;

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
