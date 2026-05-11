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

    const models = ["gemini-1.5-flash-latest", "gemini-1.5-flash", "gemini-2.0-flash-exp"];
    let lastError = null;

    for (const modelName of models) {
      try {
        const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;
        
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: prompt },
                { inline_data: { mime_type: mimeType || 'image/jpeg', data: base64 } }
              ]
            }]
          })
        });

        const data = await response.json();

        if (data.error) {
          console.warn(`Fallo con ${modelName}:`, data.error.message);
          lastError = data.error.message;
          continue; // Probamos el siguiente modelo
        }

        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
          const text = data.candidates[0].content.parts[0].text;
          return res.status(200).json({ text });
        }
      } catch (err) {
        lastError = err.message;
      }
    }

    throw new Error(lastError || "No se pudo conectar con ningún modelo de Google.");

  } catch (error) {
    console.error('Error final:', error);
    return res.status(500).json({ error: error.message });
  }
}
