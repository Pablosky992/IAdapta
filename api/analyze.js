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
    
    // Dejamos solo el modelo que confirmó actividad en el panel del usuario
    const modelName = "gemini-1.5-flash";

    try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const prompt = `IMPORTANTE: El informe DEBE comenzar siempre con este texto exacto:
"Este análisis ha sido generado mediante Inteligencia Artificial (modelo Gemini 2.0 Flash) en fase de pruebas. La información proporcionada es orientativa y puede contener errores. Debe ser validada por un profesional cualificado antes de realizar cualquier cambio estructural."
 Genera un informe clínico DIRECTO y CATEGÓRICO basado en la IMAGEN adjunta y en las RESPUESTAS del cuestionario.

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
Mezcla el consejo clínico con la solución. Cuando recomiendes un producto, INSERTA OBLIGATORIAMENTE su etiqueta [[PRODUCTO:X]] del siguiente catálogo (MÁXIMO 3 etiquetas por informe):

CATÁLOGO DE PRODUCTOS RECOMENDADOS:
- [[PRODUCTO:1]]: Tabla de bañera (si hay bañera y dificultad de entrada).
- [[PRODUCTO:2]]: Asiento para ducha (si hay plato de ducha y riesgo de caída).
- [[PRODUCTO:3]]: Barras de apoyo (indispensable en casi cualquier baño).
- [[PRODUCTO:4]]: Alza de WC (si el inodoro es bajo o hay dolor de rodillas).
- [[PRODUCTO:5]]: Asiento giratorio bañera (alternativa avanzada a la tabla).
- [[PRODUCTO:6]]: Barandilla cama (para seguridad al dormir e incorporarse).
- [[PRODUCTO:7]]: Trapecio cama (para movilidad activa en el lecho).
- [[PRODUCTO:8]]: Tacos elevadores cama (si la cama es muy baja).
- [[PRODUCTO:9]]: Cubiertos adaptados (para artritis o debilidad en manos).
- [[PRODUCTO:10]]: Cuchillo Nelson (para cortar con una sola mano).
- [[PRODUCTO:11]]: Tabla de cortar adaptada (para cocina segura).
- [[PRODUCTO:12]]: Plato con reborde alto (para evitar derrames).
- [[PRODUCTO:13]]: Vaso con escotadura nasal (si hay dificultad cervical o disfagia).
- [[PRODUCTO:14]]: Andador interior (estrecho para casa).
- [[PRODUCTO:15]]: Andador exterior (tipo Rollator con asiento).
- [[PRODUCTO:16]]: Conteras (repuesto de gomas antideslizantes).

REGLAS DE PRODUCTOS:
- NO recomiendes productos que no estén en esta lista.
- Inserta el código [[PRODUCTO:X]] EXACTAMENTE así, con doble corchete, después de mencionarlo.
- Sé selectivo: recomienda solo lo más prioritario según la imagen y el cuestionario.
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

        const text = result.response.text();
        return res.status(200).json({ text });

    } catch (error) {
      console.error('Error en el análisis:', error);
      return res.status(500).json({ 
        error: `Error al procesar con la IA (Modelo: gemini-1.5-flash): ` + error.message,
        details: error
      });
    }
  } catch (outerError) {
    console.error('Error externo:', outerError);
    return res.status(500).json({ error: 'Error interno del servidor: ' + outerError.message });
  }
}
