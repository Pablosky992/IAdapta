import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = (process.env.GEMINI_API_KEY || '').trim();
  if (!apiKey) {
    return res.status(500).json({ error: 'Error: Clave API no configurada.' });
  }

  try {
    const { base64, mimeType, answers } = req.body;
    if (!base64) {
      return res.status(400).json({ error: 'Falta la imagen.' });
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    
    // Usamos v1beta porque algunos proyectos nuevos solo aceptan esta versión para modelos Flash
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }, { apiVersion: 'v1beta' });

    const answersText = answers ? Object.entries(answers).map(([q, a]) => `${q}: ${a}`).join('\n') : '';

    const prompt = `Genera un informe clínico breve de accesibilidad.
RESPUESTAS:
${answersText}

### 1. DIAGNÓSTICO
Analiza la imagen y el cuestionario.
### 2. PRODUCTOS
Usa etiquetas [[PRODUCTO:1]] (Tabla bañera), [[PRODUCTO:2]] (Asiento ducha), [[PRODUCTO:3]] (Barras), [[PRODUCTO:4]] (Alza WC).
### 3. CONCLUSIÓN
Consejo final.

Usa tono profesional.`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64,
          mimeType: mimeType || 'image/jpeg'
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();
    
    return res.status(200).json({ text });

  } catch (error) {
    console.error('Error detallado:', error);
    return res.status(500).json({ 
      error: 'Error de conexión con Google: ' + error.message,
      details: error.message
    });
  }
}
