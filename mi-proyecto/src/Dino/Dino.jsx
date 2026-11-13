import { useEffect, useRef, useState } from 'react'
import './Dino.css'
import personaje from '../assets/Animat.png'
import agachado from '../assets/deslizarse.png'
import obstaculo from '../assets/obstaculos.png'
import pajaro from '../assets/pajaros.png'
// FONDO: dejalo vacío, o importá el tuyo y ponelo acá:
// import fondoDino from '../assets/fondodino.png'
// const FONDO = fondoDino
const FONDO = ''

const W = 650 // tamaño interno del canvas
const H = 450
const SUELO = 390 // altura del piso
const PX = 90 // posición horizontal del personaje
const RUN_H = 150 // alto del personaje corriendo
const SLIDE_H = 120 // alto del personaje agachado
const GRAVEDAD = 3300
const SALTO = 1100
const VEL_INICIAL = 520
const VEL_MAX = 1100

const SRC = { personaje, agachado, obstaculo, pajaro }

const nuevo = () => ({
  y: 0,
  vy: 0,
  puntos: 0,
  vel: VEL_INICIAL,
  dist: 0,
  falta: 900,
  obst: [],
  muerto: false,
  mostrado: 0,
})

const listo = img => img && img.complete && img.naturalWidth > 0
const ratio = img => (listo(img) ? img.naturalWidth / img.naturalHeight : 1.3)
const caja = (x, y, w, h, k) => ({
  x: x + w * k,
  y: y + h * k,
  w: w * (1 - 2 * k),
  h: h * (1 - 2 * k),
})
const choca = (a, b) =>
  a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y

function jugador(j, imgs, abajo) {
  const deslizando = abajo && j.y === 0
  const img = deslizando ? imgs.agachado : imgs.personaje
  const h = deslizando ? SLIDE_H : RUN_H
  return { img, w: ratio(img) * h, h, x: PX, top: SUELO - j.y - h }
}

function crear(j, imgs) {
  // después de 250 puntos aparecen los pájaros (hay que agacharse)
  if (j.puntos > 250 && Math.random() < 0.35) {
    const h = 72
    return { img: imgs.pajaro, x: W + 30, y: SUELO - 168, w: ratio(imgs.pajaro) * h, h, extra: 120 }
  }
  const h = 90 + Math.random() * 45
  return { img: imgs.obstaculo, x: W + 30, y: SUELO - h, w: ratio(imgs.obstaculo) * h, h, extra: 0 }
}

// Devuelve true si chocó
function actualizar(j, imgs, abajo, dt) {
  j.vel = Math.min(VEL_MAX, VEL_INICIAL + j.puntos * 0.7)
  j.puntos += (j.vel * dt) / 15
  j.dist += j.vel * dt

  if (j.y > 0 || j.vy > 0) {
    j.vy -= (GRAVEDAD + (abajo ? 3700 : 0)) * dt // agacharse en el aire = caer más rápido
    j.y += j.vy * dt
    if (j.y <= 0) {
      j.y = 0
      j.vy = 0
    }
  }

  j.falta -= j.vel * dt
  if (j.falta <= 0) {
    j.obst.push(crear(j, imgs))
    j.falta = j.vel * 0.7 + 390 + Math.random() * 520
  }

  j.obst.forEach(o => (o.x -= (j.vel + o.extra) * dt))
  j.obst = j.obst.filter(o => o.x + o.w > -30)

  const p = jugador(j, imgs, abajo)
  const cp = caja(p.x, p.top, p.w, p.h, 0.2)
  return j.obst.some(o => choca(cp, caja(o.x, o.y, o.w, o.h, 0.15)))
}

function pintar(ctx, img, x, y, w, h, color) {
  if (listo(img)) ctx.drawImage(img, x, y, w, h)
  else {
    ctx.fillStyle = color
    ctx.fillRect(x, y, w, h)
  }
}

function dibujar(ctx, j, imgs, abajo) {
  ctx.clearRect(0, 0, W, H)

  // piso
  ctx.fillStyle = '#ff6fa5'
  ctx.fillRect(0, SUELO, W, 6)
  ctx.fillStyle = '#7a2048'
  ctx.fillRect(0, SUELO + 6, W, H - SUELO)
  ctx.fillStyle = '#ffb7c5'
  for (let x = -(j.dist % 90); x < W; x += 90) ctx.fillRect(x, SUELO + 30, 36, 6)

  // obstáculos y pájaros
  j.obst.forEach(o => pintar(ctx, o.img, o.x, o.y, o.w, o.h, '#c2336b'))

  // personaje
  const p = jugador(j, imgs, abajo)
  const rebote = !j.muerto && j.y === 0 && !abajo ? Math.abs(Math.sin(j.dist / 27)) * 6 : 0
  const top = p.top - rebote

  if (j.muerto) {
    ctx.save()
    ctx.translate(p.x + p.w / 2, top + p.h / 2)
    ctx.rotate(-0.5)
    pintar(ctx, p.img, -p.w / 2, -p.h / 2, p.w, p.h, '#ff6fa5')
    ctx.restore()
  } else {
    pintar(ctx, p.img, p.x, top, p.w, p.h, '#ff6fa5')
  }
}

const pad = n => String(n).padStart(5, '0')

function Dino({ onVolver }) {
  const canvasRef = useRef(null)
  const imgs = useRef({})
  const juego = useRef(nuevo())
  const faseRef = useRef('intro')
  const teclas = useRef({ abajo: false })
  const perdioEn = useRef(0)

  const [fase, setFase] = useState('intro') // 'intro' | 'jugando' | 'perdio'
  const [puntos, setPuntos] = useState(0)
  const [record, setRecord] = useState(() => Number(localStorage.getItem('dinoRecord')) || 0)

  const cambiarFase = f => {
    faseRef.current = f
    setFase(f)
  }

  const empezar = () => {
    if (faseRef.current === 'jugando') return
    if (faseRef.current === 'perdio' && Date.now() - perdioEn.current < 500) return
    juego.current = nuevo()
    setPuntos(0)
    cambiarFase('jugando')
  }

  const saltar = () => {
    const j = juego.current
    if (faseRef.current === 'jugando' && j.y === 0) j.vy = SALTO
  }

  const registrar = n =>
    setRecord(r => {
      if (n > r) {
        localStorage.setItem('dinoRecord', String(n))
        return n
      }
      return r
    })

  // cargar imágenes
  useEffect(() => {
    Object.entries(SRC).forEach(([k, src]) => {
      const im = new Image()
      im.src = src
      imgs.current[k] = im
    })
  }, [])

  // teclado
  useEffect(() => {
    const down = e => {
      if (e.key === ' ' || e.key === 'ArrowUp' || e.key === 'w') {
        e.preventDefault()
        if (faseRef.current === 'jugando') saltar()
        else empezar()
      } else if (e.key === 'ArrowDown' || e.key === 's') {
        e.preventDefault()
        teclas.current.abajo = true
      }
    }
    const up = e => {
      if (e.key === 'ArrowDown' || e.key === 's') teclas.current.abajo = false
    }
    window.addEventListener('keydown', down)
    window.addEventListener('keyup', up)
    return () => {
      window.removeEventListener('keydown', down)
      window.removeEventListener('keyup', up)
    }
  }, [])

  // bucle del juego
  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    ctx.imageSmoothingEnabled = false
    let raf
    let ultimo = performance.now()

    const frame = ahora => {
      const dt = Math.min(0.033, (ahora - ultimo) / 1000)
      ultimo = ahora
      const j = juego.current
      const abajo = teclas.current.abajo

      if (faseRef.current === 'jugando') {
        const choco = actualizar(j, imgs.current, abajo, dt)
        const n = Math.floor(j.puntos)
        if (n !== j.mostrado) {
          j.mostrado = n
          setPuntos(n)
        }
        if (choco) {
          j.muerto = true
          perdioEn.current = Date.now()
          registrar(n)
          cambiarFase('perdio')
        }
      }

      dibujar(ctx, j, imgs.current, abajo)
      raf = requestAnimationFrame(frame)
    }

    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  return (
    <section className="dino">
      <div className="dino__cabecera">
        <span>puntos {pad(puntos)}</span>
        <span>récord {pad(record)}</span>
      </div>

      {fase === 'intro' && (
        <div className="dino__panel">
          <h2 className="dino__titulo">¡noticia urgente!</h2>
          <p>Secuestraron a los BTS ♥</p>
          <p>
            Los secuestradores mandaron obstáculos y pájaros para frenarte, pero vos corrés
            con tu amor a cuestas.
          </p>
          <p className="dino__ayuda">
            ↑ o espacio: saltar
            <br />
            ↓: agacharte (para los pájaros)
          </p>
          <button className="dino__boton" onClick={empezar}>
            ¡a rescatarlos!
          </button>
        </div>
      )}

      <div
        className="dino__pantalla"
        style={{
          display: fase === 'intro' ? 'none' : 'block',
          backgroundImage: FONDO ? `url(${FONDO})` : 'none',
        }}
        onPointerDown={saltar}
      >
        <canvas ref={canvasRef} width={W} height={H} className="dino__canvas" />
      </div>

      {fase === 'jugando' && (
        <div className="dino__controles">
          <button
            className="dino__boton"
            onPointerDown={e => {
              e.preventDefault()
              saltar()
            }}
          >
            saltar ↑
          </button>
          <button
            className="dino__boton"
            onPointerDown={e => {
              e.preventDefault()
              teclas.current.abajo = true
            }}
            onPointerUp={() => (teclas.current.abajo = false)}
            onPointerLeave={() => (teclas.current.abajo = false)}
            onPointerCancel={() => (teclas.current.abajo = false)}
          >
            agacharse ↓
          </button>
        </div>
      )}

      {fase === 'perdio' && (
        <div className="dino__panel">
          <h2 className="dino__titulo">¡te atraparon!</h2>
          <p>
            puntaje: {pad(puntos)}
            <br />
            récord: {pad(record)}
          </p>
          <div className="dino__controles">
            <button className="dino__boton dino__boton--principal" onClick={empezar}>
              reintentar
            </button>
            <button className="dino__boton" onClick={onVolver}>
              volver
            </button>
          </div>
        </div>
      )}
    </section>
  )
}

export default Dino