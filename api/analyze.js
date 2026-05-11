export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

    const apiKey = (process.env.GEMINI_API_KEY || '').trim();
    if (!apiKey) {
      return res.status(500).json({ error: 'Error del servidor: La clave GEMINI_API_KEY no está configurada.' });
    }

  try {
    const { base64, mimeType } = req.body;
    
    if (!base64 || !mimeType) {
      return res.status(400).json({ error: 'Faltan datos de la imagen.' });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: "Actúa como un asesor técnico experto en Terapia Ocupacional. Tu objetivo es generar un informe detallado que mezcle consejos técnicos con recomendaciones de productos concretos. Prioriza siempre la seguridad y la autonomía.\n\nEstructura del Informe:\n1. DIAGNÓSTICO POR ÁREAS: Sé descriptivo. Para cada elemento analizado (puertas, baño, iluminación, etc.):\n   - Identifica BARRERAS o riesgos detectados.\n   - Identifica PUNTOS CORRECTOS (lo que ya está bien adaptado o es seguro).\n2. RECOMENDACIONES TÉCNICAS Y PRODUCTOS: Mezcla el 'por qué' clínico con la solución. Usa estos enlaces exclusivamente:\n   - Tabla de bañera (https://amzn.to/4uLnkU5)\n   - Asiento para ducha (https://amzn.to/4dfjkUJ)\n   - Barras de apoyo (https://amzn.to/4u4JBw3)\n   - Alza de WC (https://amzn.to/42hlsWU)\n3. AVISO CRÍTICO / ACCESIBILIDAD EXTERIOR:\n   - Si detectas pasos ≤ 60 cm: 'AVISO: Tus pasos de puerta son reducidos. Asegúrate de que el producto no supere los 55 cm de ancho total'.\n   - Si detectas o se menciona que NO hay ascensor en un piso o casa de varias plantas: Sugiere valorar con la comunidad o propietarios la instalación de un ascensor, salvaescaleras o rampa normativa.\n4. ANÁLISIS GENERAL: Finaliza con un párrafo que resuma el estado global de la estancia, destacando sus puntos fuertes y una hoja de ruta clara para mejorar los puntos débiles.\n\nREGLAS DE ORO: NO inventes URLs. Usa un tono profesional, clínico y empático. Si el espacio es muy pequeño, prioriza el consejo de seguridad sobre la recomendación de compra." },
            { inline_data: { mime_type: mimeType, data: base64 } }
          ]
        }]
      })
    });

    const data = await response.json();
    if (data.error) {
      console.error('Gemini API Error:', data.error);
      return res.status(response.status).json({ 
        error: data.error.message || 'Error en la API de Gemini',
        details: data.error
      });
    }

    if (data.candidates && data.candidates.length > 0) {
      return res.status(200).json({ text: data.candidates[0].content.parts[0].text });
    } else {
      return res.status(500).json({ error: 'No se pudo generar una respuesta.' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
