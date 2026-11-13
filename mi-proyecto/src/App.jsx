import { useState } from 'react'
import './App.css'
import Petals from './Petals'
import Heart from './Heart'
import Robert from './Robert'
import Beso from './Beso/Beso'
import Menu from './Menu'
import Historia from './Historia/Historia'
import Nubes from './Nubes/Nubes'
import Preguntas from './Preguntas/Preguntas'
import Carta from './Carta/Carta'
import Jajujito from './Jajujito/Jajujito'
import Dino from './Dino/Dino'
import fondo from './assets/fondo.jpg'
import fondoNubes from './assets/fondonube.jpg'

function App() {
  const [pantalla, setPantalla] = useState('menu')
  const [nubes, setNubes] = useState(null) // null | 'cubrir' | 'abrir'
  const [respuestasFinales, setRespuestasFinales] = useState([])
  const [cartaCae, setCartaCae] = useState(false)
  const [beso, setBeso] = useState(false)
  const [historiaCompleta, setHistoriaCompleta] = useState(
    () => localStorage.getItem('historiaCompleta') === '1'
  )

  // Cambia de pantalla pasando por la transición de nubes
  const conNubes = (destino, alTerminarDeCubrir) => {
    setNubes('cubrir')
    setTimeout(() => {
      setPantalla(destino)
      if (alTerminarDeCubrir) alTerminarDeCubrir()
      setNubes('abrir')
    }, 1300)
    setTimeout(() => setNubes(null), 2400)
  }

  const irA = id => {
    if (id === 'preguntas' || id === 'jajujito' || id === 'dino') return conNubes(id)
    setPantalla(id)
  }

  const volverAlParque = () => conNubes('menu', () => setCartaCae(true))

  // Jajujito → parque: cuando las nubes ya se abrieron, le llega un beso a Robert
  const volverConBeso = () =>
    conNubes('menu', () => {
      setTimeout(() => {
        setBeso(true)
        setTimeout(() => setBeso(false), 3000)
      }, 900)
    })

  const ancho = pantalla === 'preguntas' || pantalla === 'jajujito' || pantalla === 'dino'
  const enCielo = ancho || pantalla === 'carta'

  return (
    <div
      className="app"
      style={{ backgroundImage: `url(${enCielo ? fondoNubes : fondo})` }}
    >
      <Petals />

      <main className={ancho ? 'contenido contenido--ancho' : 'contenido'}>
        {pantalla === 'menu' && (
          <>
            <h1 className="titulo">hola mimiiiiiii <Heart /></h1>
            <Menu historiaCompleta={historiaCompleta} onElegir={irA} />
          </>
        )}

        {pantalla === 'historia' && (
          <Historia
            onVolver={() => setPantalla('menu')}
            onCompletar={() => {
              localStorage.setItem('historiaCompleta', '1')
              setHistoriaCompleta(true)
              setPantalla('menu')
            }}
          />
        )}

        {pantalla === 'preguntas' && (
          <Preguntas
            onTerminar={respuestas => {
              setRespuestasFinales(respuestas) // acá después conectamos Web3Forms
              setPantalla('carta')
            }}
          />
        )}

        {pantalla === 'carta' && (
          <Carta respuestas={respuestasFinales} onListo={volverAlParque} />
        )}

        {pantalla === 'jajujito' && <Jajujito onVolver={volverConBeso} />}

        {pantalla === 'dino' && <Dino onVolver={() => conNubes('menu')} />}
      </main>

      {!enCielo && <Robert carta={cartaCae} />}
      {beso && !enCielo && <Beso />}
      <Nubes estado={nubes} />
    </div>
  )
}

export default App