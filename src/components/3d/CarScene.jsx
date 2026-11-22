import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// PLACEHOLDER car built from primitives. To use a real model, drop an optimized
// GLB at public/models/car.glb and swap <Car/> for a drei useGLTF() primitive.
function Car() {
  const g = useRef()
  useFrame(({ clock }) => { g.current.position.y = Math.sin(clock.elapsedTime * 2.2) * 0.008 })
  const paint = <meshStandardMaterial color="#e3123c" metalness={0.85} roughness={0.22} />
  const dark = <meshStandardMaterial color="#120a1c" metalness={0.6} roughness={0.4} />
  const wheels = [[-1, 1.45], [1, 1.45], [-1, -1.35], [1, -1.35]]
  return (
    <group ref={g}>
      <mesh position={[0, 0.5, 0]} castShadow>{<boxGeometry args={[1.9, 0.42, 4.5]} />}{paint}</mesh>
      <mesh position={[0, 0.9, 0.35]} castShadow><boxGeometry args={[1.45, 0.42, 1.9]} />{dark}</mesh>
      <mesh position={[0, 0.72, -1.6]} rotation={[0.12, 0, 0]}><boxGeometry args={[1.8, 0.22, 1.3]} />{paint}</mesh>
      <mesh position={[0, 1.18, 2.05]} castShadow><boxGeometry args={[2, 0.05, 0.55]} />{dark}</mesh>
      {[-0.7, 0.7].map(x => <mesh key={x} position={[x, 0.95, 2.05]}><boxGeometry args={[0.06, 0.4, 0.1]} />{dark}</mesh>)}
      <mesh position={[0, 0.72, 2.26]}><boxGeometry args={[1.5, 0.06, 0.04]} /><meshBasicMaterial color="#ff3d8b" toneMapped={false} /></mesh>
      <mesh position={[0, 0.55, -2.26]}><boxGeometry args={[1.6, 0.07, 0.04]} /><meshBasicMaterial color="#fff2c9" toneMapped={false} /></mesh>
      {wheels.map(([x, z]) => (
        <group key={x + '' + z} position={[x, 0.38, z]} rotation={[0, 0, Math.PI / 2]}>
          <mesh castShadow><cylinderGeometry args={[0.38, 0.38, 0.3, 24]} />{dark}</mesh>
          <mesh position={[0, x * 0.16, 0]}><cylinderGeometry args={[0.24, 0.24, 0.02, 24]} /><meshStandardMaterial color="#c8902e" metalness={1} roughness={0.25} /></mesh>
        </group>
      ))}
      <pointLight position={[0, 0.2, 0]} color="#ff2e88" intensity={6} distance={5} />
    </group>
  )
}

function Palm({ x, z, h = 6, lean = 0.08 }) {
  const leaves = useMemo(() => Array.from({ length: 7 }, (_, i) => (i / 7) * Math.PI * 2), [])
  return (
    <group position={[x, 0, z]} rotation={[0, 0, lean]}>
      <mesh position={[0, h / 2, 0]}><cylinderGeometry args={[0.1, 0.18, h, 6]} /><meshBasicMaterial color="#1a0826" /></mesh>
      <group position={[0, h, 0]}>
        {leaves.map(a => (
          <mesh key={a} rotation={[0.45, a, 0]} position={[Math.sin(a) * 0.7, -0.15, Math.cos(a) * 0.7]}>
            <boxGeometry args={[0.35, 0.03, 1.8]} /><meshBasicMaterial color="#1a0826" />
          </mesh>
        ))}
      </group>
    </group>
  )
}

function Road() {
  const dashes = useRef([])
  useFrame((_, dt) => dashes.current.forEach(m => { if (m) { m.position.z += dt * 14; if (m.position.z > 12) m.position.z -= 90 } }))
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, -40]} receiveShadow><planeGeometry args={[14, 160]} /><meshStandardMaterial color="#1b0d2b" roughness={0.35} metalness={0.4} /></mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, -40]}><planeGeometry args={[200, 200]} /><meshBasicMaterial color="#2a0f3d" /></mesh>
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={i} ref={el => (dashes.current[i] = el)} rotation={[-Math.PI / 2, 0, 0]} position={[3.3, 0.01, 10 - i * 7.5]}><planeGeometry args={[0.18, 2.6]} /><meshBasicMaterial color="#b36bff" /></mesh>
      ))}
    </>
  )
}

function Skyline() {
  const b = useMemo(() => Array.from({ length: 26 }, (_, i) => ({ x: -38 + i * 3, h: 4 + ((i * 37) % 11) * 1.6, w: 1.8 + (i % 3) * 0.5 })), [])
  return <group position={[0, 0, -75]}>{b.map((o, i) => <mesh key={i} position={[o.x, o.h / 2, 0]}><boxGeometry args={[o.w, o.h, 1.5]} /><meshBasicMaterial color={i % 4 ? '#2b1245' : '#4a1b66'} /></mesh>)}</group>
}

function Rig() {
  useFrame(({ camera, pointer }, dt) => {
    const p = Math.min(window.scrollY / window.innerHeight, 1.2)
    const t = new THREE.Vector3(3.4 - p * 3.6 + pointer.x * 0.7, 1.35 + p * 1.4 + pointer.y * 0.2, 6.4 + p * 5)
    camera.position.lerp(t, 1 - Math.pow(0.02, dt))
    camera.lookAt(0, 0.8, 0)
  })
  return null
}

export default function CarScene({ active = true, lite = false }) {
  return (
    <Canvas shadows={!lite} frameloop={active ? 'always' : 'never'} dpr={lite ? [1, 1.25] : [1, 1.75]}
      camera={{ position: [9, 3.2, 14], fov: 42 }} gl={{ alpha: true, antialias: !lite, powerPreference: 'high-performance' }}>
      <fog attach="fog" args={['#4a1b66', 18, 90]} />
      <ambientLight intensity={0.55} color="#b88cff" />
      <directionalLight position={[-8, 5, -20]} intensity={3} color="#ff9a4d" castShadow={!lite} />
      <directionalLight position={[8, 3, 6]} intensity={1} color="#19d3ff" />
      <Car /><Road /><Skyline />
      {[-9, -14, -22, -34].map((z, i) => <Palm key={'l' + i} x={-6.5 - (i % 2)} z={z} h={5.5 + i * 0.4} lean={0.07} />)}
      {[-6, -16, -28, -40].map((z, i) => <Palm key={'r' + i} x={7 + (i % 2)} z={z} h={6 + i * 0.3} lean={-0.07} />)}
      <Rig />
    </Canvas>
  )
}
