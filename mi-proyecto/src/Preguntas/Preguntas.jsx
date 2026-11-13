import { useState } from 'react'
import './Preguntas.css'
 import flores from '../assets/flores.webp'
 import horario from '../assets/horario.webp'
  import chorizo from '../assets/chorizo.webp'
// "imagen" es opcional en la pregunta y en cada respuesta.
const PREGUNTAS = [
  {
    texto: '¿Cuáles son tus flores favoritas?',
    imagen: flores,
    respuestas: [
      { texto: 'Rosas', imagen: null },
      { texto: 'Girasoles', imagen: null },
      { texto: 'Tulipanes', imagen: null },
      { texto: 'Margaritas', imagen: null },
      { texto: 'Lirios', imagen: null },
      { texto: 'Gerberas', imagen: null },
    ],
  },
  {
    texto: '¿En qué momento del día te gusta más vivir algo especial?',
    imagen: horario,
    respuestas: [
      { texto: 'Al atardecer', imagen: null },
      { texto: 'De noche', imagen: null },
      { texto: 'A la mañana', imagen: null },
      { texto: 'Al mediodía', imagen: null },
    ],
  },
  {
    texto: '¿Qué lugar te hace sentir más especial?',
    imagen: null,
    respuestas: [
      { texto: 'Una plaza', imagen: null },
      { texto: 'El Barrio Chino', imagen: null },
      { texto: 'No importa el lugar', imagen: null },
      { texto: 'Un lugar sorpresa', imagen: null },
    ],
  },
  {
    texto: '¿Cómo te imaginás ese momento?',
    imagen: null,
    respuestas: [
      { texto: 'Una sorpresa total', imagen: null },
      { texto: 'Algo tranquilo e íntimo', imagen: null },
      { texto: 'Con música de fondo', imagen: null },
      { texto: 'Con una carta', imagen: null },
    ],
  },
  {
    texto: '¿Con quién preferís que sea?',
    imagen: null,
    respuestas: [
      { texto: 'Solo los dos', imagen: null },
      { texto: 'Con tus papas cerca', imagen: null },
      { texto: 'Con alguien filmando', imagen: null },
      { texto: 'Que sea sorpresa', imagen: null },
    ],
  },
  {
    texto: '¿Qué detalle te da más ternura?',
    imagen: null,
    respuestas: [
      { texto: 'Una carta escrita a mano', imagen: null },
      { texto: 'Sorpresa', imagen: null },
      { texto: 'Chocolates', imagen: null },
      { texto: 'Una foto nuestra', imagen: null },
    ],
  },

  {
    texto: '¿Qué te gustaría comer después?(la foto es la que encontre no significa nada en doble sentido)',
    imagen: chorizo,
    respuestas: [
      { texto: 'Hamburguesas', imagen: null },
      { texto: 'Helado', imagen: null },
      { texto: 'Comida picante', imagen: null },
      { texto: 'Sorpresa', imagen: null },
    ],
  },
  {
    texto: '¿Qué gesto te enamora más?',
    imagen: null,
    respuestas: [
      { texto: 'Un abrazo largo', imagen: null },
      { texto: 'Un beso', imagen: null },
      { texto: 'Hablar', imagen: null },
      { texto: 'Sorpresa', imagen: null },
    ],
  },
]

function Preguntas({ onTerminar }) {
  const [i, setI] = useState(0)
  const [elegida, setElegida] = useState(null)
  const [respuestas, setRespuestas] = useState([])

  const p = PREGUNTAS[i]

  const responder = n => {
    if (elegida !== null) return
    setElegida(n)

    const nuevas = [...respuestas, { pregunta: p.texto, respuesta: p.respuestas[n].texto }]
    setRespuestas(nuevas)

    setTimeout(() => {
      if (i === PREGUNTAS.length - 1) {
        onTerminar(nuevas)
      } else {
        setI(i + 1)
        setElegida(null)
      }
    }, 700)
  }

  return (
    <section className="preguntas">
      <div className="preguntas__barra">
        pregunta {i + 1} / {PREGUNTAS.length}
      </div>

      <div className="preguntas__enunciado" key={`q${i}`}>
        {p.imagen && <img className="preguntas__imagen" src={p.imagen} alt="" />}
        <h2>{p.texto}</h2>
      </div>

      <div className="preguntas__grilla" key={`r${i}`}>
        {p.respuestas.map((r, n) => (
          <button
            key={n}
            className={
              'respuesta respuesta--' + n +
              (elegida === n ? ' respuesta--elegida' : '') +
              (elegida !== null && elegida !== n ? ' respuesta--apagada' : '')
            }
            onClick={() => responder(n)}
          >
            {r.imagen && <img className="respuesta__imagen" src={r.imagen} alt="" />}
            {r.texto && <span className="respuesta__texto">{r.texto}</span>}
          </button>
        ))}
      </div>
    </section>
  )
}

export default Preguntas