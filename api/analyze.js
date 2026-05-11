export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = (process.env.GEMINI_API_KEY || '').trim().replace(/^["']|["']$/g, '');
  
  try {
    // PRUEBA DE FUEGO: Enviamos solo texto para ver si la llave responde
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: "Responde solo con la palabra 'CONECTADO' si recibes este mensaje." }]
        }]
      })
    });

    const data = await response.json();

    if (data.error) {
      throw new Error(`Google Error: ${data.error.message} (${data.error.status})`);
    }

    if (data.candidates && data.candidates[0]) {
      return res.status(200).json({ text: "### RESULTADO DE PRUEBA\nLa llave de Google RESPONDE correctamente al texto. El problema está exclusivamente en el envío de la imagen." });
    }

    throw new Error("No hubo respuesta.");

  } catch (error) {
    return res.status(500).json({ error: `Error de llave: ${error.message}` });
  }
}
