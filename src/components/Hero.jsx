import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronDown } from 'lucide-react'
import { profile } from '../data/portfolioData'
const CarScene = lazy(() => import('./3d/CarScene'))
gsap.registerPlugin(ScrollTrigger)

const canUse3D = () => {
  try {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return false
    return !!document.createElement('canvas').getContext('webgl2')
  } catch { return false }
}

const Palm = ({ className }) => (
  <svg className={className} viewBox="0 0 220 420" aria-hidden="true">
    <path d="M95 420 Q104 260 112 150" stroke="currentColor" strokeWidth="11" fill="none" />
    {[-85, -55, -25, 5, 35, 65, 95, 125].map(a => <path key={a} d="M112 150 Q160 92 212 138 Q160 116 112 150Z" fill="currentColor" transform={`rotate(${a} 112 150)`} />)}
  </svg>
)

export default function Hero() {
  const root = useRef(), copy = useRef()
  const [active, setActive] = useState(true)
  const [use3D] = useState(canUse3D)
  const lite = typeof window !== 'undefined' && window.innerWidth < 768
  const [photoOk, setPhotoOk] = useState(true)

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setActive(e.isIntersecting), { threshold: 0.05 })
    io.observe(root.current)
    const ctx = gsap.context(() => {
      gsap.from('.reveal', { y: 60, opacity: 0, duration: 1.1, stagger: 0.14, ease: 'power3.out', delay: 0.2 })
      gsap.to(copy.current, { yPercent: -18, opacity: 0.1, scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
    }, root)
    return () => { io.disconnect(); ctx.revert() }
  }, [])

  return (
    <header id="home" ref={root} className="hero">
      <div className="sun" aria-hidden="true" />
      {use3D && <div className="scene"><Suspense fallback={null}><CarScene active={active} lite={lite} /></Suspense></div>}
      {!use3D && <div className="scene static-car" aria-hidden="true"><div className="silhouette" /></div>}
      <div className="hero-copy" ref={copy}>
        <p className="reveal tag">The world is yours.</p>
        <h1 className="reveal">{profile.name}</h1>
        <p className="reveal role">{profile.role}</p>
        <p className="reveal intro">{profile.intro}</p>
        <div className="reveal cta">
          <a className="btn primary" href="#about">Explore my world</a>
          <a className="btn" href={profile.resume} target="_blank" rel="noreferrer">View my resume</a>
        </div>
      </div>
      <figure className="player reveal">
        {photoOk ? <img src={profile.photo} alt="Siddhesh Katkade" onError={() => setPhotoOk(false)} /> : <span>SK</span>}
        <figcaption><b>Siddhesh</b> Player 1</figcaption>
      </figure>
      <Palm className="palm pl" /><Palm className="palm pr" />
      <div className="hud" aria-hidden="true">
        <div className="minimap"><i /></div>
        <div className="hud-info"><b>Vice City</b><span>Leonida</span><span className="stars">★★★★★</span></div>
      </div>
      <a href="#about" className="scroll" aria-label="Scroll to About"><ChevronDown /></a>
    </header>
  )
}
