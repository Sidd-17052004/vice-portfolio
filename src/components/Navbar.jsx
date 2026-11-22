import { useEffect, useState } from 'react'
const links = [['home', 'Home'], ['about', 'About'], ['skills', 'Skills'], ['experience', 'Experience'], ['projects', 'Projects'], ['contact', 'Contact']]
export default function Navbar() {
  const [active, setActive] = useState('home')
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    links.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <nav className="nav" aria-label="Primary">
      {links.map(([id, label]) => (
        <a key={id} href={`#${id}`} className={active === id ? 'on' : ''} aria-current={active === id ? 'true' : undefined}>
          <span className="waypoint" aria-hidden="true" />{label}
        </a>
      ))}
    </nav>
  )
}
