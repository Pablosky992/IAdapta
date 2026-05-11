export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = (process.env.GEMINI_API_KEY || '').trim().replace(/^["']|["']$/g, '');
  
  try {
    // 1. INTENTO DE ANÁLISIS DIRECTO
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: "Analiza" }] }]
      })
    });

    const data = await response.json();

    if (data.error) {
      // 2. SI FALLA, PEDIMOS A GOOGLE LA LISTA DE MODELOS DISPONIBLES PARA ESTA LLAVE
      const listUrl = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
      const listResp = await fetch(listUrl);
      const listData = await listResp.json();
      
      const availableModels = listData.models 
        ? listData.models.map(m => m.name.replace('models/', '')).join(', ') 
        : 'Ninguno encontrado';

      throw new Error(`Tu llave API NO tiene acceso a gemini-1.5-flash. Los modelos que sí puede ver son: [${availableModels}]. Google dice: ${data.error.message}`);
    }

    return res.status(200).json({ text: "Conexión exitosa. Re-activando análisis de imagen..." });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
