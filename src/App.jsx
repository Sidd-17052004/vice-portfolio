import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Loader from './components/Loader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import { Profile, Skills, Experience, Projects, Education, Contact, Footer } from './components/Sections'

const Marquee = () => (
  <div className="marquee" aria-hidden="true"><div>{Array.from({ length: 8 }, (_, i) => <span key={i}>Welcome to Leonida ✦ Vice City ✦ The world is yours ✦</span>)}</div></div>
)

const RadioTicker = () => {
  const stations = ['FLASH FM', 'NIGHT DRIVE 1986', 'VAPORWAVE FM', 'VICE RADIO']
  const [station, setStation] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => setStation(s => (s + 1) % stations.length), 5000)
    return () => clearInterval(timer)
  }, [])
  return (
    <div className="radio-ticker" aria-label={`Now playing ${stations[station]}`}>
      <div className="radio-live"><span className="radio-dot" /> VCI-Radio</div>
      <div className="radio-track" key={station}>
        <span>{stations[station]} ✦ NOW PLAYING ✦ {stations[(station + 1) % stations.length]} ✦ AI ASSISTANT ON THE AIR ✦</span>
      </div>
      <div className="equalizer" aria-hidden="true">{[1, 2, 3, 4, 5].map(i => <i key={i} />)}</div>
    </div>
  )
}

const WorldHud = () => {
  const [stars, setStars] = useState(1)
  const [time, setTime] = useState('')
  useEffect(() => {
    const clock = setInterval(() => setTime(new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date())), 1000)
    setTime(new Intl.DateTimeFormat('en-IN', { hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()))
    return () => clearInterval(clock)
  }, [])
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight
      setStars(Math.min(5, 1 + Math.floor((scrollY / Math.max(max, 1)) * 5)))
    }
    update()
    addEventListener('scroll', update, { passive: true })
    return () => removeEventListener('scroll', update)
  }, [])
  return (
    <motion.aside className="world-hud" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.5 }}>
      <div className="world-hud-money">$ 0017254</div>
      <div className="world-hud-stars" aria-label={`${stars} wanted level stars`}>
        {[1, 2, 3, 4, 5].map(i => <span key={i} className={i <= stars ? 'filled' : ''}>★</span>)}
      </div>
      <div className="world-hud-place">LEONIDA <b>{time}</b></div>
    </motion.aside>
  )
}

const TrafficStreaks = () => (
  <div className="traffic-streaks" aria-hidden="true">
    {[1, 2, 3, 4, 5, 6].map(i => <i key={i} />)}
  </div>
)

const SectionTransition = () => {
  const [label, setLabel] = useState('')
  useEffect(() => {
    const sections = [...document.querySelectorAll('main section[id="experience"], main section[id="projects"], main section[id="contact"]')]
    let last = ''
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (!visible) return
      const next = visible.target.id
      if (next !== last && last) {
        setLabel(next === 'contact' ? 'WANTED LEVEL LOST' : 'MISSION CHECKPOINT')
        setTimeout(() => setLabel(''), 950)
      }
      last = next
    }, { threshold: [0.35, 0.55] })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  return <AnimatePresence>{label && <motion.div className="section-transition" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} exit={{ scaleX: 0 }} /><strong>{label}</strong></motion.div>}</AnimatePresence>
}

const AchievementSystem = () => {
  const [achievement, setAchievement] = useState('')
  const [earned, setEarned] = useState(() => new Set())
  useEffect(() => {
    const titles = {
      about: 'Character scanned',
      skills: 'Arsenal unlocked',
      experience: 'Career progress',
      projects: 'Missions explored',
      contact: 'Connection ready',
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return
        const id = entry.target.id
        if (!titles[id] || earned.has(id)) return
        setEarned(previous => new Set(previous).add(id))
        setAchievement(titles[id])
        setTimeout(() => setAchievement(''), 2200)
      })
    }, { threshold: 0.45 })
    Object.keys(titles).forEach(id => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [earned])
  return (
    <AnimatePresence>
      {achievement && (
        <motion.div className="achievement-toast" role="status"
          initial={{ opacity: 0, x: 70, scale: .92 }} animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 50 }} transition={{ type: 'spring', stiffness: 160, damping: 18 }}>
          <span className="achievement-badge">★</span>
          <div><small>Achievement unlocked</small><strong>{achievement}</strong></div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)
  const [externalToast, setExternalToast] = useState(false)
  const [easterEgg, setEasterEgg] = useState(false)
  const [hudClicks, setHudClicks] = useState(0)
  useEffect(() => {
    let typed = ''
    const onKey = e => {
      typed = (typed + e.key.toLowerCase()).slice(-4)
      if (typed === 'vice') setEasterEgg(true)
    }
    addEventListener('keydown', onKey)
    return () => removeEventListener('keydown', onKey)
  }, [])
  const activateHud = () => {
    const next = hudClicks + 1
    setHudClicks(next)
    if (next >= 5) {
      setEasterEgg(true)
      setHudClicks(0)
    }
  }
  useEffect(() => { const t = setTimeout(() => setLoading(false), 2300); return () => clearTimeout(t) }, [])
  useEffect(() => {
    if (!matchMedia('(pointer:fine)').matches) return
    const c = document.getElementById('cursor')
    const m = e => { c.style.transform = `translate(${e.clientX}px,${e.clientY}px)` }
    addEventListener('mousemove', m); return () => removeEventListener('mousemove', m)
  }, [])
  useEffect(() => {
    const onClick = e => {
      const link = e.target.closest('a[target="_blank"]')
      if (link) {
        setExternalToast(true)
        setTimeout(() => setExternalToast(false), 1500)
      }
    }
    addEventListener('click', onClick)
    return () => removeEventListener('click', onClick)
  }, [])
  return (
    <>
      <AnimatePresence>{loading && <Loader key="l" />}</AnimatePresence>
      <div id="cursor" aria-hidden="true" />
      <div className="scanlines" aria-hidden="true" />
      <TrafficStreaks />
      <SectionTransition />
      <AchievementSystem />
      <AnimatePresence>
        {easterEgg && (
          <motion.div className="easter-egg" role="dialog" aria-label="Vice City easter egg"
            initial={{ opacity: 0, scale: 1.08 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
            <button aria-label="Close easter egg" onClick={() => setEasterEgg(false)}>×</button>
            <motion.span initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>Welcome to Leonida</motion.span>
            <strong>SECRET UNLOCKED</strong>
            <p>Ocean Drive is open. The world is yours.</p>
          </motion.div>
        )}
      </AnimatePresence>
      <Navbar />
      <div onClick={activateHud}><WorldHud /></div>
      <RadioTicker />
      <AnimatePresence>
        {externalToast && (
          <motion.div className="mission-toast external-toast" role="status" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 25 }}>
            <span>Mission passed</span><strong>External link opened</strong>
          </motion.div>
        )}
      </AnimatePresence>
      <main>
        <Hero /><Marquee /><Profile /><Skills /><Experience /><Projects /><Education /><Contact />
      </main>
      <Footer />
    </>
  )
}
