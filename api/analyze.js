export default async function handler(req, res) {
  // PRUEBA DE DIAGNÓSTICO: No llamamos a Google, devolvemos un texto fijo.
  return res.status(200).json({ 
    text: "### PRUEBA DE CONEXIÓN EXITOSA\n\nSi estás leyendo esto, significa que:\n1. Tu web está enviando los datos correctamente.\n2. El servidor de Vercel está funcionando.\n3. El problema está EXCLUSIVAMENTE en la comunicación con Google (API Key o modelo).\n\nPor favor, confírmame si ves este mensaje." 
  });
}
