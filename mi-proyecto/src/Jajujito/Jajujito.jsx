import { useState } from 'react'
import '../Preguntas/Preguntas.css'
import './Jajujito.css'

const op = (...textos) => textos.map(texto => ({ texto }))
const ESCALA = Array.from({ length: 10 }, (_, n) => ({ texto: String(n + 1) }))

// correctas: lista de posiciones correctas (0 = primera opción) o 'todas'
// ok / mal: mensajes opcionales; huye: true hace que la opción se escape
const PREGUNTAS = [
  {
    texto: '¿Cuánto lo amás?',
    respuestas: ESCALA,
    correctas: [9],
    mal: 'Mmm... esa no. La única correcta es 10 ♥',
  },
  {
    texto: '¿Cuántos años tiene Robert?',
    respuestas: op('7', '9', '11', '13'),
    correctas: [1],
  },
  {
    texto: '¿Qué quiere estudiar Jajujito?',
    respuestas: op('Ingeniería informática', 'Ingeniería en sistemas', 'Medicina', 'Abogacía'),
    correctas: [0, 1],
    ok: '¡Correcto! Informática o sistemas, es lo mismo ;)',
  },
  {
    texto: '¿Cuál es la comida favorita de Jajujito?',
    respuestas: op('Pollo frito', 'Vos', 'Sushi', 'Ensalada'),
    correctas: [0, 1],
    ok: '¡Correcto! siempre.',
  },
  {
    texto: 'Jajujito es conocido por...',
    respuestas: op('La jajupizza', 'Su pelo', 'Sus pasos de baile', 'Su voz de cantante'),
    correctas: [0],
  },
  {
    texto: '¿Cuánto le mide a Jajujito?',
    respuestas: op('17,5 cm', '13.5 cm', '18.5 cm', '15.5 cm'),
    correctas: [0],
    ok: '¡Correcto! (miamolll)',
  },
  {
    texto: '¿Qué tan fuerte es Jajujito para vos?',
    respuestas: ESCALA,
    correctas: 'todas',
    ok: '¡Cualquier respuesta es correcta!',
  },
  {
    texto: '¿Cuánto te ama Jajujito?',
    respuestas: ESCALA,
    correctas: [9],
    mal: 'Error. Te ama un 10, ni más ni menos ♥',
  },
  {
    texto: '¿Cuánto mide Jajujito?',
    respuestas: op('1,73 m', '1,68 m', '1,71 m', '1,75 m'),
    correctas: [0],
  },
  {
    texto: '¿Jajujito es un buen mago?',
    respuestas: op('Verdadero', 'Falso'),
    correctas: [0],
    ok: '¡Correcto! Hace desaparecer los problemas... y la jajupizza.',
  },
  {
    texto: '¿Qué tan lindo es Jajujito?',
    respuestas: ESCALA,
    correctas: 'todas',
    ok: 'Todas son correctas. Pero ya sabemos la verdad.',
  },
  {
    texto: '¿Jajujito es mejor que BTS?',
    respuestas: [
      { texto: 'Sí' },
      { texto: 'No', huye: true },
      { texto: 'Los dos son los mejores', huye: true },
    ],
    correctas: [0],
    ok: '¡Obvio que sí!',
  },
]

// Pregunta final: cambiala por la que quieras
const FINAL = {
  texto: '¿Estarias conmigo siempreeeeee?',
  si: 'Sí ♥',
  no: 'No',
}

// Mensaje según el puntaje (de mayor a menor)
const RANGOS = [
  { desde: 12, mensaje: '¡PERFECTO! Me conocés mejor que nadie ♥♥♥' },
  { desde: 10, mensaje: 'Casi perfecto, me conocés muy bien ♥♥' },
  { desde: 7, mensaje: 'Muy bien mi amor, vas por buen camino ♥' },
  { desde: 4, mensaje: 'Mmm... te falta estudiar un poquito más jeje' },
  { desde: 0, mensaje: 'Ouch... vamos a tener que pasar más tiempo juntos ♥' },
]

// Cada acierto suma 4 "o" a "teamo"
const teamo = aciertos => 'teamo' + 'o'.repeat(aciertos * 4)

const salto = () => ({
  x: (Math.random() < 0.5 ? -1 : 1) * (40 + Math.random() * 60),
  y: (Math.random() < 0.5 ? -1 : 1) * (30 + Math.random() * 50),
})

function Jajujito({ onVolver, onTerminar }) {
  const [i, setI] = useState(0)
  const [elegida, setElegida] = useState(null)
  const [aciertos, setAciertos] = useState(0)
  const [fase, setFase] = useState('quiz') // 'quiz' | 'final'
  const [saltos, setSaltos] = useState({})
  const [historial, setHistorial] = useState([])

  // estado de la pantalla final
  const [dijoSi, setDijoSi] = useState(false)
  const [saltoNo, setSaltoNo] = useState(null)

  if (fase === 'final') {
    const rango = RANGOS.find(r => aciertos >= r.desde)

    return (
      <section className="jj__final">
        {!dijoSi ? (
          <>
            <h2 className="jj__amo">te amo ♥</h2>
            <p className="jj__pregunta">{FINAL.texto}</p>
            <div className="jj__botones">
              <button
                className="boton"
                onClick={() => {
                  setDijoSi(true)
                  onTerminar?.({ historial, aciertos, total: PREGUNTAS.length })
                }}
              >
                {FINAL.si}
              </button>
              <button
                className="boton jj__huye"
                style={saltoNo ? { transform: `translate(${saltoNo.x}px, ${saltoNo.y}px)` } : undefined}
                onPointerEnter={() => setSaltoNo(salto())}
                onPointerDown={() => setSaltoNo(salto())}
                onClick={() => setSaltoNo(salto())}
              >
                {FINAL.no}
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="jj__puntaje">
              acertaste {aciertos} de {PREGUNTAS.length}
            </p>
            <h2 className="jj__teamo">{teamo(aciertos)} ♥</h2>
            <p className="jj__pregunta">{rango.mensaje}</p>
            <button className="boton" onClick={onVolver}>volver</button>
          </>
        )}
      </section>
    )
  }

  const p = PREGUNTAS[i]
  const esCorrecta = n => p.correctas === 'todas' || p.correctas.includes(n)
  const cant = p.respuestas.length
  const columnas = cant === 10 ? 'repeat(5, 1fr)' : cant === 4 ? '1fr 1fr' : '1fr'

  const esquivar = n => setSaltos(s => ({ ...s, [n]: salto() }))

  const responder = n => {
    if (elegida !== null) return
    if (p.respuestas[n].huye) return esquivar(n)

    setElegida(n)
    setHistorial(h => [
      ...h,
      {
        pregunta: p.texto,
        respuesta: p.respuestas[n].texto + (esCorrecta(n) ? ' ✔' : ' ✖'),
      },
    ])
    if (esCorrecta(n)) setAciertos(a => a + 1)

    setTimeout(() => {
      if (i === PREGUNTAS.length - 1) {
        setFase('final')
      } else {
        setI(i + 1)
        setElegida(null)
        setSaltos({})
      }
    }, 1900)
  }

  const acerto = elegida !== null && esCorrecta(elegida)
  const textoCorrectas =
    p.correctas === 'todas' ? '' : p.correctas.map(n => p.respuestas[n].texto).join(' / ')

  let mensaje = '\u00A0'
  if (elegida !== null) {
    mensaje = acerto
      ? p.ok || '¡Correcto! ♥'
      : p.mal || `Ups... la correcta era: ${textoCorrectas}`
  }

  return (
    <section className="preguntas jj">
      <div className="jj__cabecera">
        <span>jajujito</span>
        <span>{i + 1} / {PREGUNTAS.length}</span>
      </div>
      <div className="jj__progreso">
        <div style={{ width: `${((i + 1) / PREGUNTAS.length) * 100}%` }} />
      </div>

      <div className="preguntas__enunciado" key={`q${i}`}>
        <h2>{p.texto}</h2>
      </div>

      <div
        className={
          'jj__aviso' +
          (elegida === null ? '' : acerto ? ' jj__aviso--ok' : ' jj__aviso--mal')
        }
      >
        {mensaje}
      </div>

      <div
        className="preguntas__grilla"
        key={`r${i}`}
        style={{ gridTemplateColumns: columnas, gridTemplateRows: 'none', gridAutoRows: '1fr' }}
      >
        {p.respuestas.map((r, n) => (
          <button
            key={n}
            className={
              'respuesta respuesta--' + (n % 4) +
              (r.huye ? ' jj__huye' : '') +
              (elegida === n ? ' respuesta--elegida' : '') +
              (elegida !== null && elegida !== n ? ' respuesta--apagada' : '')
            }
            style={
              saltos[n]
                ? { transform: `translate(${saltos[n].x}px, ${saltos[n].y}px)` }
                : undefined
            }
            onPointerEnter={r.huye ? () => esquivar(n) : undefined}
            onPointerDown={r.huye ? () => esquivar(n) : undefined}
            onClick={() => responder(n)}
          >
            <span className="respuesta__texto">{r.texto}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

export default Jajujito