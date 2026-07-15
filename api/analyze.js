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
Propuestas concretas de mejora (especialmente para patologías como Parkinson, Ictus/hemiplejia, Artritis y Prevención de Caídas). Coloca las etiquetas de los productos de apoyo al final de cada bloque de recomendación.
Productos disponibles: [[PRODUCTO:1]] (Tabla bañera), [[PRODUCTO:2]] (Asiento ducha), [[PRODUCTO:3]] (Barras), [[PRODUCTO:4]] (Alza WC), [[PRODUCTO:5]] (Asiento bañera giratorio), [[PRODUCTO:6]] (Barandilla cama), [[PRODUCTO:7]] (Trapecio cama), [[PRODUCTO:8]] (Tacos cama), [[PRODUCTO:9]] (Cubiertos adaptados), [[PRODUCTO:10]] (Cuchillo Nelson), [[PRODUCTO:11]] (Tabla corte 1 mano), [[PRODUCTO:12]] (Plato con reborde), [[PRODUCTO:13]] (Vaso escotadura), [[PRODUCTO:14]] (Andador interior), [[PRODUCTO:15]] (Andador exterior Rollator), [[PRODUCTO:16]] (Conteras antideslizantes), [[PRODUCTO:17]] (Muletas), [[PRODUCTO:18]] (Cinturón transferencia), [[PRODUCTO:19]] (Disco giratorio transferencia), [[PRODUCTO:20]] (Sábana deslizante), [[PRODUCTO:21]] (Reloj orientación digital), [[PRODUCTO:22]] (Detector humo/gas), [[PRODUCTO:23]] (Localizador GPS personas mayores), [[PRODUCTO:24]] (Controlador inteligente Alexa), [[PRODUCTO:25]] (Enchufe inteligente), [[PRODUCTO:26]] (Teléfono móvil mayores), [[PRODUCTO:27]] (Cojín antiescaras), [[PRODUCTO:28]] (Colchón aire alternante), [[PRODUCTO:29]] (Taloneras antiescaras), [[PRODUCTO:30]] (Lupa lectura LED), [[PRODUCTO:31]] (Sujeta-cartas madera), [[PRODUCTO:32]] (Enhebrador automático), [[PRODUCTO:33]] (Calzador mango largo), [[PRODUCTO:34]] (Pone-calcetines), [[PRODUCTO:35]] (Abotonador mango grueso), [[PRODUCTO:36]] (Cubiertos peso Parkinson), [[PRODUCTO:37]] (Inodoro reposabrazos Parkinson), [[PRODUCTO:38]] (Calzador gancho), [[PRODUCTO:39]] (Tapete antideslizante silicona), [[PRODUCTO:40]] (Esponja baño mango largo), [[PRODUCTO:41]] (Abridor tarros ergonómico), [[PRODUCTO:42]] (Adaptador llaves gran palanca), [[PRODUCTO:43]] (Luces LED sensor movimiento), [[PRODUCTO:44]] (Cinta antideslizante alfombras), [[PRODUCTO:45]] (Barra apoyo antideslizante), [[PRODUCTO:46]] (Trapecio incorporador cama).
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
