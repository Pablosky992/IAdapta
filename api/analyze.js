export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = (process.env.GEMINI_API_KEY || '').trim().replace(/^["']|["']$/g, '');
  
  try {
    const { base64, mimeType, answers } = req.body;
    const answersText = answers ? Object.entries(answers).map(([q, a]) => `${q}: ${a}`).join('\n') : '';

    const prompt = `Analiza esta imagen de accesibilidad universal desde la perspectiva de Terapia Ocupacional.
RESPUESTAS DEL CUESTIONARIO:
${answersText}

Estructura el informe así:
### 1. DIAGNÓSTICO TÉCNICO
Identifica barreras reales.
### 2. PLAN DE ADAPTACIÓN Y PRODUCTOS
Indica productos usando etiquetas [[PRODUCTO:1]] (Tabla bañera), [[PRODUCTO:2]] (Asiento ducha), [[PRODUCTO:3]] (Barras), [[PRODUCTO:4]] (Alza WC).
### 3. CONCLUSIÓN PROFESIONAL

IMPORTANTE: El informe debe empezar con el aviso de que es un análisis por IA en fase de pruebas.`;

    // Usamos el modelo más moderno disponible para tu llave en 2026: gemini-2.5-flash
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            { inlineData: { mimeType: mimeType || 'image/jpeg', data: base64 } }
          ]
        }]
      })
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(`Google Error: ${data.error.message}`);
    }

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const text = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ text });
    } else {
      throw new Error("No se pudo obtener una respuesta válida de la IA.");
    }

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
