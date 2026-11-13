const BOTONES = [
  { id: 'historia',  texto: 'nuestra historia',        bloqueado: false },
  { id: 'preguntas', texto: 'preguntas',               bloqueado: true  },
  { id: 'jajujito',  texto: 'cuánto sabés de jajujito', bloqueado: false },
  { id: 'dino',      texto: 'juego',                   bloqueado: false },
]

function Menu({ onElegir, historiaCompleta }) {
  return (
    <nav className="menu">
      {BOTONES.map(b => {
        const bloqueado = b.id === 'preguntas' && !historiaCompleta
        return (
          <button key={b.id} className="boton" disabled={bloqueado} onClick={() => onElegir(b.id)}>
            {bloqueado && <span className="candado">🔒</span>}
            {b.texto}
            {bloqueado && <small className="aviso">primero completá la historia</small>}
          </button>
        )
      })}
    </nav>
  )
}

export default Menu