import { useState } from 'react'
import './Historia.css'
import mia from '../assets/mia.webp'
import Instagram from '../assets/instagram.webp'
import beso from '../assets/beso.webp'
import llamada from '../assets/llamada.webp'
import hamburguesas from '../assets/hamburgesa.webp'
import parque from '../assets/parque.webp'
import cenet from '../assets/cenet.webp'
import mihermosa from '../assets/mihermosa.webp'
import novia from '../assets/novia.webp'
import futuro from '../assets/futuro.webp'
import Historiase from '../assets/historia.webp'
// Cuando tengas las fotos, ponelas en src/assets/historia/ e importalas:
// import foto1 from '../../assets/historia/01-badoo.png'
// y reemplazá imagen: null por imagen: foto1

const CAPITULOS = [
  {
    numero: 'I',
    titulo: 'Un match',
    fecha: '20 de septiembre',
    texto: 'Todo empezó en Badoo. Un día cualquiera, un match cualquiera... y sin saberlo era el comienzo de lo mejor que me pasó.',
    imagen: mia,
  },
  {
    numero: 'II',
    titulo: 'Primeras palabras',
    fecha: 'Instagram',
    texto: 'Pasamos a Instagram y las charlas se hicieron cada vez más largas. Hasta que me animé y te invité a salir.',
    imagen: Instagram,
  },
  {
    numero: 'III',
    titulo: 'Nuestra primera cita',
    fecha: '4 de octubre',
    texto: 'Barrio Chino. Estaba tímido, pero vos me animaste con tu seguridad. Y en la plaza, con nuestro primer beso, me enamoré más.',
    imagen: beso,
  },
  {
    numero: 'IV',
    titulo: 'Cada vez más cerca',
    fecha: 'Llamadas',
texto: 'Después de ese día, las llamadas se volvieron mi parte favorita. Esperaba escucharte todos los días, para decirte hola y también buenas noches.',    imagen: llamada,
  },
  {
    numero: 'V',
    titulo: 'Te extrañaba',
    fecha: 'Domingo',
    texto: 'Nos juntamos después de mucho tiempo. Te había extrañado tanto que quería demostrártelo. Comimos hamburguesas en el Barrio Chino y fue perfecto.',
    imagen: hamburguesas,
  },
  {
    numero: 'VI',
    titulo: 'Sin avisar',
    fecha: 'Lunes',
    texto: 'Salí al mediodía de la pasantía, falté al cole y volvimos al Barrio Chino. Me acosté en tus piernas en un banco del parque y quise quedarme ahí para siempre. Me olvidé de avisar en casa y me retaron, pero valió la pena.',
    imagen: parque,
  },
  {
    numero: 'VII',
    titulo: 'Era amor',
    fecha: 'Martes',
    texto: 'Seguíamos queriéndonos ver. Nos extrañábamos y ya no había dudas: era amor. Viniste a buscarme al mediodía desde la universidad y almorzamos en el Parque Centenario, cerca de mi colegio.',
    imagen: cenet,
  },
  {
    numero: 'VIII',
    titulo: 'Mi casita',
    fecha: 'Un domingo',
    texto: 'Viniste a la mañana y conociste mi casa, a mi perro. y compartimos un día hermoso. Me sentí tan feliz de tenerte cerca, que no quería que se terminara nunca. Despues fuimos a mcdonalds',
    imagen: mihermosa,
  },
  {
    numero: 'IX',
    titulo: 'Una pregunta',
    fecha: 'Próximamente',
    texto: 'Hay una pregunta que me late en el corazón desde hace días.  Mirándote a los ojos, te la voy a hacer. Y ojalá me regales el sí más lindo y un beso.',
    imagen: novia,
  },
  {
    numero: 'X',
    titulo: 'Nuestro futuro deaa me adelanté',
    fecha: 'Si me decís que sí',
    texto: 'Perdón, me adelanté. Pero te imagino en nuestro living, con nuestros hijos, nuestros perritos y una vida llena de risas. No sé cuánto falte, pero sé con quién quiero llegar. Algunas veces evito hablar del futuro es que te amo y me pongo nervioso jeje.',
    imagen: futuro,
  },
    {
  
    numero: 'XI',
    titulo: 'Armemos nuestra historia',
    fecha: 'Desde hoy',
    texto: 'A veces evito hablar del futuro porque te amo y me pongo nervioso, jeje. Pero ya no quiero esperar: quiero empezar esta historia, y quiero escribir el resto con vos.',
    imagen: Historiase,
  },
]

function Historia({ onVolver, onCompletar }) {
  const [i, setI] = useState(0)
  const cap = CAPITULOS[i]
  const esUltimo = i === CAPITULOS.length - 1

  const siguiente = () => (esUltimo ? onCompletar() : setI(i + 1))
  const anterior = () => (i === 0 ? onVolver() : setI(i - 1))

  return (
    <section className="historia">
      <header className="historia__cabecera">
        <span>capítulo {cap.numero}</span>
        <span>{cap.fecha}</span>
      </header>

      {/* key={i} hace que React remonte la página y se repita la animación */}
      <div className="historia__pagina" key={i}>
        {cap.imagen ? (
          <img className="historia__foto" src={cap.imagen} alt={cap.titulo} />
        ) : (
          <div className="historia__foto historia__foto--vacia">tu foto acá</div>
        )}
        <h2 className="historia__titulo">{cap.titulo}</h2>
        <p className="historia__texto">{cap.texto}</p>
      </div>

      <footer className="historia__pie">
        <button className="historia__boton" onClick={anterior}>
          {i === 0 ? 'menú' : '◀ atrás'}
        </button>

        <div className="historia__progreso">
          {CAPITULOS.map((_, n) => (
            <span
              key={n}
              className={n <= i ? 'historia__punto historia__punto--lleno' : 'historia__punto'}
            />
          ))}
        </div>

        <button className="historia__boton historia__boton--principal" onClick={siguiente}>
          {esUltimo ? 'terminar ♥' : 'siguiente ▶'}
        </button>
      </footer>
    </section>
  )
}

export default Historia