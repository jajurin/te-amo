const KEY = import.meta.env.VITE_WEB3FORMS_KEY

export async function enviar(asunto, message) {
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: KEY,
        subject: asunto,
        from_name: 'Teamo ♥',
        message,
      }),
    })
    return (await res.json()).success
  } catch {
    return false
  }
}

// Convierte [{pregunta, respuesta}] en texto legible para el mail
export const lista = arr =>
  arr.map((r, i) => `${i + 1}. ${r.pregunta}\n   → ${r.respuesta}`).join('\n\n')