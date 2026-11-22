import { motion } from 'framer-motion'
export default function Loader() {
  return (
    <motion.div className="loader" exit={{ opacity: 0 }} transition={{ duration: 0.8 }} role="status" aria-label="Loading portfolio">
      <p className="welcome">Welcome to</p>
      <motion.h1 initial={{ letterSpacing: '0.6em', opacity: 0 }} animate={{ letterSpacing: '0.08em', opacity: 1 }} transition={{ duration: 1.6, ease: 'easeOut' }}>
        VICE <span>CITY</span>
      </motion.h1>
      <div className="loader-silhouette" aria-hidden="true"><span /><i /></div>
      <p className="welcome">The portfolio of Siddhesh Katkade · GTA VI-inspired</p>
      <p className="loader-tip">TIP: Every mission starts with a strong foundation.</p>
      <motion.div className="loader-bar" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 2, ease: 'easeInOut' }} />
    </motion.div>
  )
}
