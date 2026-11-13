import robert from './assets/jajurobert.png'
import Sobre from './Sobre'

function Robert({ carta }) {
  return (
    <div className="robert">
      <div
        className="burbuja"
        key={carta ? 'gracias' : 'amo'}
        style={{ animationDelay: carta ? '2.6s' : '1s' }}
      >
        {carta ? 'gracias ♥' : 'te amo'}
      </div>

      <div className="robert__cuerpo">
        {carta && <Sobre className="robert__sobre" cerrado />}
        <img src={robert} alt="Robert" />
      </div>
    </div>
  )
}

export default Robert