import './Nubes.css'

function Nubes({ estado }) {
  if (!estado) return null
  return (
    <div className={`nubes nubes--${estado}`}>
      {[0, 1, 2].map(n => (
        <div key={`i${n}`} className="nubes__nube nubes__nube--izq" style={{ top: `${n * 31}%`, animationDelay: `${n * 0.12}s` }} />
      ))}
      {[0, 1, 2].map(n => (
        <div key={`d${n}`} className="nubes__nube nubes__nube--der" style={{ top: `${n * 31 + 10}%`, animationDelay: `${n * 0.12 + 0.06}s` }} />
      ))}
    </div>
  )
}

export default Nubes