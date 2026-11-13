const CANTIDAD = 30

const petalos = Array.from({ length: CANTIDAD }, (_, i) => ({
  id: i,
  left: Math.random() * 100,          // posición horizontal en %
  size: 8 + Math.random() * 10,       // tamaño en px
  duracion: 8 + Math.random() * 8,    // segundos que tarda en caer
  delay: -Math.random() * 15,         // negativo: arranca "ya cayendo"
}))

function Petals() {
  return (
    <div className="petals">
      {petalos.map(p => (
        <span
          key={p.id}
          className="petal"
          style={{
            left: `${p.left}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duracion}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  )
}

export default Petals