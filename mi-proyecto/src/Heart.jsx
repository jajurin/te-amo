const MAPA = [
  '.XX...XX.',
  'XWXX.XXXX',
  'XXXXXXXXX',
  'XXXXXXXXX',
  '.XXXXXXX.',
  '..XXXXX..',
  '...XXX...',
  '....X....',
]

const COLORES = { X: '#ff6fa5', W: '#ffffff' }

function Heart() {
  return (
    <svg
      className="corazon"
      viewBox="0 0 9 8"
      shapeRendering="crispEdges"
    >
      {MAPA.map((fila, y) =>
        [...fila].map((celda, x) =>
          COLORES[celda] ? (
            <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={COLORES[celda]} />
          ) : null
        )
      )}
    </svg>
  )
}

export default Heart