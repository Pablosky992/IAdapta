export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Error del servidor: La clave GEMINI_API_KEY no está configurada.' });
  }

  try {
    const { base64, mimeType } = req.body;
    
    if (!base64 || !mimeType) {
      return res.status(400).json({ error: 'Faltan datos de la imagen.' });
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: "Actúa como una experta en Terapia Ocupacional. Tu prioridad es la seguridad, la prevención de caídas y la autonomía. No te fijes solo en la estética; busca barreras arquitectónicas para una persona mayor o con movilidad reducida en la imagen. Devuelve un diagnóstico preliminar estructurado señalando qué riesgos hay o qué falta (por ejemplo: 'Falta asidero en la ducha', 'Suelo deslizante con alfombra peligrosa', etc.). Si no estás segura de una medida en la foto, usa frases como: 'Parece que el espacio es reducido, te recomiendo verificar si tienes al menos 80cm libres'." },
            { inline_data: { mime_type: mimeType, data: base64 } }
          ]
        }]
      })
    });

    const data = await response.json();
    if (data.error) {
      return res.status(500).json({ error: data.error.message || 'Error en la API de Gemini' });
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
