export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = (process.env.GEMINI_API_KEY || '').trim();
  if (!apiKey) return res.status(500).json({ error: 'Falta API Key' });

  try {
    const { base64, mimeType, answers } = req.body;
    const answersText = answers ? Object.entries(answers).map(([q, a]) => `${q}: ${a}`).join('\n') : '';

    const prompt = `Analiza esta imagen de accesibilidad.
RESPUESTAS: ${answersText}
Estructura: ### 1. DIAGNÓSTICO, ### 2. PRODUCTOS (usa [[PRODUCTO:1]] Tabla bañera, [[PRODUCTO:2]] Asiento ducha, [[PRODUCTO:3]] Barras, [[PRODUCTO:4]] Alza WC), ### 3. CONCLUSIÓN.`;

    // CORRECCIÓN CRÍTICA: Google usa inlineData (CamelCase), no inline_data
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
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
      throw new Error("No se recibió respuesta válida de Google.");
    }

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: error.message });
  }
}
