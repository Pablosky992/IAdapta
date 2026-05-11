export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = (process.env.GEMINI_API_KEY || '').trim().replace(/^["']|["']$/g, '');
  
  if (!apiKey || apiKey.length < 10) {
    return res.status(500).json({ error: 'La API Key en Vercel está vacía o es demasiado corta.' });
  }

  try {
    const { base64, mimeType, answers } = req.body;
    const answersText = answers ? Object.entries(answers).map(([q, a]) => `${q}: ${a}`).join('\n') : '';

    const prompt = `Analiza esta imagen de accesibilidad.
RESPUESTAS: ${answersText}
Estructura: ### 1. DIAGNÓSTICO, ### 2. PRODUCTOS, ### 3. CONCLUSIÓN.`;

    // Intentamos v1beta con gemini-1.5-flash
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey // Enviamos la llave también por cabecera por si acaso
      },
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
      // Si falla, el error vendrá de Google directamente
      throw new Error(`Google dice: ${data.error.message} (${data.error.status})`);
    }

    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const text = data.candidates[0].content.parts[0].text;
      return res.status(200).json({ text });
    }

    throw new Error("No se pudo obtener una respuesta válida de la IA.");

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
