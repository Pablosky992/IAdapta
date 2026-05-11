export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // LIMPIEZA EXTREMA: Quitamos espacios, comillas y cualquier carácter invisible
  const apiKey = (process.env.GEMINI_API_KEY || '').trim().replace(/^["']|["']$/g, '');
  
  if (!apiKey || apiKey.length < 10) {
    return res.status(500).json({ error: 'La API Key no es válida o no está configurada en Vercel.' });
  }

  try {
    const { base64, mimeType, answers } = req.body;
    const answersText = answers ? Object.entries(answers).map(([q, a]) => `${q}: ${a}`).join('\n') : '';

    const prompt = `Analiza esta imagen de accesibilidad.
RESPUESTAS: ${answersText}
Estructura: ### 1. DIAGNÓSTICO, ### 2. PRODUCTOS (usa [[PRODUCTO:1]], [[PRODUCTO:2]], [[PRODUCTO:3]], [[PRODUCTO:4]]), ### 3. CONCLUSIÓN.`;

    // Usamos v1 (Estable) que es la que mejor funciona con claves Tier 1
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
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
      // Si falla, probamos con gemini-1.5-flash-8b que es el más compatible
      const urlFallback = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-8b:generateContent?key=${apiKey}`;
      const respFallback = await fetch(urlFallback, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }, { inlineData: { mimeType: 'image/jpeg', data: base64 } }] }]
        })
      });
      const dataFallback = await respFallback.json();
      
      if (dataFallback.error) {
        throw new Error(`Google Error: ${dataFallback.error.message} (${dataFallback.error.status})`);
      }
      
      if (dataFallback.candidates) {
        return res.status(200).json({ text: dataFallback.candidates[0].content.parts[0].text });
      }
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
