function Sobre({ cerrado = true, className }) {
  return (
    <svg
      className={className}
      viewBox="0 -6 16 18"
      shapeRendering="crispEdges"
      style={{ overflow: 'visible' }}
    >
      <rect x="0.5" y="0.5" width="15" height="11" fill="#fff3f7" stroke="#7a2048" strokeWidth="1" />
      <polygon
        points={cerrado ? '0.5,0.5 15.5,0.5 8,7' : '0.5,0.5 15.5,0.5 8,-5.5'}
        fill="#ffc2d6"
        stroke="#7a2048"
        strokeWidth="1"
      />
      {cerrado && <rect x="7" y="5" width="2" height="2" fill="#ff6fa5" />}
    </svg>
  )
}

export default Sobre