import './Beso.css'

const CORAZONES = 7
const ENTRE = 260 // ms entre corazón y corazón

function Beso() {
  return (
    <div className="beso" aria-hidden="true">
      {Array.from({ length: CORAZONES }, (_, i) => (
        <span
          key={i}
          className="beso__corazon"
          style={{
            '--x': `${-(18 + i * 5)}vw`,
            '--y': `${-(10 + (i % 3) * 9)}vh`,
            animationDelay: `${i * ENTRE}ms`,
          }}
        >
          ♥
        </span>
      ))}
      <span className="beso__mua" style={{ animationDelay: `${CORAZONES * ENTRE}ms` }}>
        mua ♥
      </span>
    </div>
  )
}

export default Beso