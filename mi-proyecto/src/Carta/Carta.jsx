import { useEffect, useState } from 'react'
import Sobre from '../Sobre'
import './Carta.css'

const ENTRE = 450 // ms entre corazón y corazón

function Carta({ respuestas, onListo }) {
  const [cerrado, setCerrado] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setCerrado(true), respuestas.length * ENTRE + 1000)
    const t2 = setTimeout(onListo, respuestas.length * ENTRE + 2600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <section className="carta">
      <div className="carta__escena">
        <Sobre className="carta__sobre" cerrado={cerrado} />

        {respuestas.map((_, i) => (
          <span
            key={i}
            className="carta__corazon"
            style={{
              '--x': `${(i % 2 ? 1 : -1) * (28 + ((i * 37) % 30))}vw`,
              '--y': `${-(18 + ((i * 23) % 30))}vh`,
              animationDelay: `${i * ENTRE}ms`,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      <p className="carta__texto">
        {cerrado ? 'guardado con amor ♥' : 'guardando tus respuestas...'}
      </p>
    </section>
  )
}

export default Carta