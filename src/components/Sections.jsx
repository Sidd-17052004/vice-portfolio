import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Github, Linkedin, Mail, X, Phone } from 'lucide-react'
import { profile, traits, skills, experience, projects, education } from '../data/portfolioData'

export function Profile() {
  const [ok, setOk] = useState(true)
  const [traitIndex, setTraitIndex] = useState(0)
  const [traitsPaused, setTraitsPaused] = useState(false)
  useEffect(() => {
    if (traitsPaused) return
    const timer = setInterval(() => setTraitIndex(i => (i + 1) % traits.length), 4200)
    return () => clearInterval(timer)
  }, [traitsPaused])
  return (
    <section id="about" className="sec">
      <h2>Character profile</h2>
      <div className="profile">
        <div className="card photo">{ok ? <img src={profile.photo} alt={profile.short} onError={() => setOk(false)} /> : <span>SK</span>}</div>
        <div>
          <h3>{profile.name}</h3>
          <p className="role">{profile.role}</p>
          <p className="muted">Based in {profile.location}</p>
          <p className="lead">{profile.intro}</p>
          <dl className="stats">
            {traits.map(([k, v], i) => (
              <motion.div
                key={k}
                className="stat"
                onMouseEnter={() => { setTraitsPaused(true); setTraitIndex(i) }}
                onMouseLeave={() => setTraitsPaused(false)}
                onFocus={() => { setTraitsPaused(true); setTraitIndex(i) }}
                onBlur={() => setTraitsPaused(false)}
                tabIndex={0}
                animate={{ opacity: i === traitIndex ? 1 : .58, scale: i === traitIndex ? 1.025 : 1, borderColor: i === traitIndex ? '#ff2e88' : 'rgba(255,255,255,.16)' }}
                transition={{ duration: .35 }}>
                <dt>{k}</dt><dd>{v}</dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

export function Skills() {
  return (
    <section id="skills" className="sec">
      <h2>My arsenal</h2>
      <motion.div className="grid skills" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}>
        {skills.map((s, i) => (
          <motion.article key={s.title} className="card skill"
            style={{ '--c': s.color, '--r': i % 2 ? '18px 4px 18px 4px' : '4px 18px 4px 18px', '--i': i }}
            variants={{ hidden: { opacity: 0, y: 36, scale: 0.94 }, show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 150, damping: 16 } } }}
            whileHover={{ y: -8, rotateZ: i % 2 ? 0.6 : -0.6, transition: { duration: 0.2 } }}>
            <h3>{s.title}</h3>
            <ul>{s.items.map((x, itemIndex) => (
              <motion.li key={x} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: itemIndex * 0.035, duration: 0.28 }} viewport={{ once: true }}>{x}</motion.li>
            ))}</ul>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

export function Experience() {
  return (
    <section id="experience" className="sec">
      <h2>My journey</h2>
      <motion.ol className="timeline" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.12 }} variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18 } } }}>
        {experience.map((e, i) => (
          <motion.li key={e.company} className="card brief"
            variants={{ hidden: { opacity: 0, x: i % 2 ? 45 : -45, y: 24 }, show: { opacity: 1, x: 0, y: 0, transition: { type: 'spring', stiffness: 120, damping: 16 } } }}
            whileHover={{ x: 8, borderColor: 'var(--orange)', transition: { duration: 0.25 } }}>
            <p className="muted">{e.duration} · {e.place}</p>
            <h3>{e.title}</h3><p className="role">{e.company}</p>
            <ul className="points">{e.points.map(p => <li key={p}>{p}</li>)}</ul>
            <ul className="chips">{e.tech.map(t => <li key={t}>{t}</li>)}</ul>
          </motion.li>
        ))}
      </motion.ol>
    </section>
  )
}

function Mission({ p, onOpen, index }) {
  const [t, setT] = useState('')
  const move = e => {
    if (matchMedia('(pointer:coarse)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const r = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5
    setT(`perspective(900px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(1.02)`)
  }
  return (
    <motion.button
      className="card mission"
      style={{ transform: t, '--a': p.colors[0], '--b': p.colors[1], '--mission-index': index }}
      variants={{
        hidden: { opacity: 0, y: 70, scale: 0.92, rotateZ: index % 2 ? 2 : -2 },
        show: { opacity: 1, y: 0, scale: 1, rotateZ: 0, transition: { type: 'spring', stiffness: 120, damping: 16, delay: index * 0.08 } },
      }}
      onMouseMove={move} onMouseLeave={() => setT('')} onClick={() => onOpen(p)}>
      <span className={`art mission-art scene-${index}`} aria-hidden="true">
        <img src={p.image} alt="" />
        <span className="mission-grade" />
      </span>
      <span className="passed">Mission passed</span>
      <h3>{p.title}</h3><p>{p.summary}</p>
      <ul className="chips">{p.tech.slice(0, 4).map(t => <li key={t}>{t}</li>)}</ul>
      <span className="view">View mission</span>
    </motion.button>
  )
}

export function Projects() {
  const [open, setOpen] = useState(null)
  const [briefing, setBriefing] = useState(true)
  useEffect(() => {
    const k = e => e.key === 'Escape' && setOpen(null)
    addEventListener('keydown', k)
    const timer = setTimeout(() => setBriefing(false), 1800)
    return () => { removeEventListener('keydown', k); clearTimeout(timer) }
  }, [])
  return (
    <section id="projects" className="sec">
      <AnimatePresence>
        {briefing && (
          <motion.div className="mission-briefing" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }}>
            <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: .8, ease: 'easeInOut' }} />
            <motion.strong initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>Mission briefing</motion.strong>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .45 }}>Review completed operations</motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      <h2>Completed missions</h2>
      <motion.div className="grid missions" initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.15 }}>
        {projects.map((p, index) => <Mission key={p.title} p={p} onOpen={setOpen} index={index} />)}
      </motion.div>
      <AnimatePresence>
        {open && (
          <motion.div className="modal-bg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <motion.div className="modal card" role="dialog" aria-modal="true" aria-label={open.title} style={{ '--a': open.colors[0], '--b': open.colors[1] }}
              initial={{ y: 40, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, opacity: 0 }} onClick={e => e.stopPropagation()}>
              <button className="close" aria-label="Close" onClick={() => setOpen(null)}><X /></button>
              <img className="modal-mission-image" src={open.image} alt={`${open.title} GTA-inspired preview`} />
              <p className="passed big">Mission passed</p>
              <h3>{open.title}</h3><p className="lead">{open.summary}</p>
              <h4>My contribution</h4><ul className="points">{open.contribution.map(c => <li key={c}>{c}</li>)}</ul>
              <ul className="chips">{open.tech.map(t => <li key={t}>{t}</li>)}</ul>
              <a className="btn primary" href={profile.github} target="_blank" rel="noreferrer">See my GitHub</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export function Education() {
  const e = education
  return (
    <section id="education" className="sec">
      <h2>Education & training</h2>
      <div className="card edu">
        <div><p className="muted">{e.period}</p><h3>{e.degree}</h3><p className="role">{e.school}</p><p>{e.score}</p></div>
        <div><h4>Certifications</h4><ul className="points">{e.certs.map(c => <li key={c}>{c}</li>)}</ul>
          <h4>Achievements</h4><ul className="points">{e.achievements.map(c => <li key={c}>{c}</li>)}</ul></div>
      </div>
    </section>
  )
}

export function Contact() {
  const [f, setF] = useState({ name: '', email: '', msg: '' })
  const [sent, setSent] = useState(false)
  const [status, setStatus] = useState('')
  const send = e => {
    e.preventDefault()
    const name = f.name.trim()
    const email = f.email.trim()
    const message = f.msg.trim()
    if (!name || !email || !message) {
      setStatus('Please complete every field.')
      return
    }
    const subject = encodeURIComponent(`Portfolio message from ${name}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`)
    setSent(true)
    setStatus('')
    const mailto = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setTimeout(() => {
      window.location.assign(mailto)
      setF({ name: '', email: '', msg: '' })
    }, 700)
  }
  const set = k => e => setF({ ...f, [k]: e.target.value })
  useEffect(() => {
    if (!sent) return
    const timer = setTimeout(() => setSent(false), 3500)
    return () => clearTimeout(timer)
  }, [sent])
  return (
    <section id="contact" className="sec contact">
      <h2 className="big">Ready for the next mission?</h2>
      <p className="lead">Let's build something extraordinary together.</p>
      <div className="contact-grid">
        <ul className="links">
          <li><a href={`mailto:${profile.email}`}><Mail />{profile.email}</a></li>
          <li><a href={`tel:${profile.phone.replace(/\s/g, '')}`}><Phone />{profile.phone}</a></li>
          <li><a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin />LinkedIn</a></li>
          <li><a href={profile.github} target="_blank" rel="noreferrer"><Github />GitHub</a></li>
        </ul>
        <form onSubmit={send} className="card form">
          <label>Name<input required minLength="2" value={f.name} onChange={set('name')} autoComplete="name" /></label>
          <label>Email<input required type="email" value={f.email} onChange={set('email')} autoComplete="email" /></label>
          <label>Message<textarea required minLength="10" rows="4" value={f.msg} onChange={set('msg')} /></label>
          {status && <p className="form-status" role="alert">{status}</p>}
          <button className="btn primary" type="submit">{sent ? 'Email opened' : 'Send message'}</button>
        </form>
      </div>
      <AnimatePresence>
        {sent && (
          <motion.div className="mission-toast" role="status"
            initial={{ opacity: 0, y: 80, scale: 0.85 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40 }} transition={{ type: 'spring', stiffness: 180, damping: 16 }}>
            <button className="mission-toast-close" type="button" aria-label="Dismiss notification" onClick={() => setSent(false)}>×</button>
            <span>Mission passed</span>
            <strong>Email client ready!</strong>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

export const Footer = () => (
  <footer className="foot">
    <div className="footer-map" aria-label="Vice City minimap">
      <div className="map-road road-a" /><div className="map-road road-b" /><div className="map-road road-c" />
      <i className="map-player" />
      <a className="map-point point-about" href="#about" aria-label="Go to Character Profile" />
      <a className="map-point point-skills" href="#skills" aria-label="Go to Skills" />
      <a className="map-point point-projects" href="#projects" aria-label="Go to Projects" />
      <a className="map-point point-contact" href="#contact" aria-label="Go to Contact" />
    </div>
    <p><b>GTA VI references:</b> sunset Vice City palette, Leonida, character-poster hero, HUD minimap and stars, "Mission passed" project cards, neon Art Deco nightlife.</p>
    <p>© {new Date().getFullYear()} {profile.name}. Original artwork only. Inspired by Grand Theft Auto VI; not affiliated with Rockstar Games or Take-Two.</p>
  </footer>
)
