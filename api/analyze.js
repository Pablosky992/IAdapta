export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = (process.env.GEMINI_API_KEY || '').trim().replace(/^["']|["']$/g, '');
  
  try {
    const { base64, mimeType, answers } = req.body;
    const answersText = answers ? Object.entries(answers).map(([q, a]) => `${q}: ${a}`).join('\n') : '';

    const prompt = `Actúa como un experto Terapeuta Ocupacional especializado en Accesibilidad Universal.
Analiza esta imagen y las respuestas del cuestionario para generar un informe clínico detallado.

DATOS DEL PACIENTE/ENTORNO:
${answersText}

FORMATO DE RESPUESTA (MUY IMPORTANTE):
- Usa Markdown estándar.
- Usa ### para los encabezados de sección.
- Usa asteriscos (*) para crear listas de puntos.
- Deja SIEMPRE una línea en blanco entre párrafos.
- Coloca las etiquetas [[PRODUCTO:X]] SIEMPRE al final del párrafo o sección donde las recomiendes, no entre medias del texto.
- NO añadidas el nombre del producto al lado de la etiqueta (ejemplo: NO pongas [[PRODUCTO:1]] (Tabla bañera)). Pon solo la etiqueta [[PRODUCTO:1]].

Estructura del informe:
### 1. DIAGNÓSTICO TÉCNICO
Identifica barreras reales observadas y riesgos potenciales.
### 2. PLAN DE ADAPTACIÓN Y PRODUCTOS
Propuestas concretas de mejora. Coloca las etiquetas al final de cada bloque de recomendación.
Productos disponibles: [[PRODUCTO:1]] (Tabla bañera), [[PRODUCTO:2]] (Asiento ducha), [[PRODUCTO:3]] (Barras), [[PRODUCTO:4]] (Alza WC), [[PRODUCTO:17]] (Muletas).
### 3. CONCLUSIÓN PROFESIONAL

IMPORTANTE: El informe debe empezar con un aviso indicando que es un análisis por IA en fase beta para apoyo profesional.`;

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
