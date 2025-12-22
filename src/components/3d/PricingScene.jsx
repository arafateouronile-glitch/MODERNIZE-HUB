import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  Float, 
  Icosahedron,
  Octahedron,
  Torus
} from '@react-three/drei'
import * as THREE from 'three'

// Diamant rotatif symbolisant la valeur
const Diamond = ({ position, scale = 1, color = '#88A9C3' }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.5
      meshRef.current.rotation.z = Math.sin(t * 0.3) * 0.1
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.6}>
      <Octahedron ref={meshRef} args={[1]} scale={scale} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          metalness={0.9}
          roughness={0.1}
          transparent
          opacity={0.9}
        />
      </Octahedron>
    </Float>
  )
}

// Anneaux symbolisant les offres
const PricingRings = () => {
  const groupRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Ring 1 - Express */}
      <Float speed={0.8} floatIntensity={0.3}>
        <Torus args={[2, 0.03, 16, 100]} position={[-4, 0, -3]} rotation={[Math.PI / 4, 0, 0]}>
          <meshStandardMaterial
            color="#88A9C3"
            emissive="#88A9C3"
            emissiveIntensity={0.3}
            transparent
            opacity={0.5}
          />
        </Torus>
      </Float>
      
      {/* Ring 2 - Transformation */}
      <Float speed={1} floatIntensity={0.4}>
        <Torus args={[2.5, 0.04, 16, 100]} position={[0, 0, -4]} rotation={[Math.PI / 3, Math.PI / 6, 0]}>
          <meshStandardMaterial
            color="#88A9C3"
            emissive="#88A9C3"
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
          />
        </Torus>
      </Float>
      
      {/* Ring 3 - Premium */}
      <Float speed={0.6} floatIntensity={0.5}>
        <Torus args={[3, 0.05, 16, 100]} position={[4, 0, -2]} rotation={[Math.PI / 2.5, -Math.PI / 4, 0]}>
          <meshStandardMaterial
            color="#9D4EDD"
            emissive="#9D4EDD"
            emissiveIntensity={0.4}
            transparent
            opacity={0.6}
          />
        </Torus>
      </Float>
    </group>
  )
}

// Particules de valeur
const ValueParticles = ({ count = 40 }) => {
  const groupRef = useRef()
  
  const particles = Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * 20,
    y: (Math.random() - 0.5) * 15,
    z: (Math.random() - 0.5) * 10 - 5,
    scale: Math.random() * 0.08 + 0.02,
    speed: Math.random() * 0.5 + 0.2
  }))

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      {particles.map((p, i) => (
        <Float key={i} speed={p.speed * 2} floatIntensity={0.8}>
          <Icosahedron args={[p.scale, 0]} position={[p.x, p.y, p.z]}>
            <meshBasicMaterial 
              color={i % 3 === 0 ? '#88A9C3' : i % 3 === 1 ? '#9D4EDD' : '#ffffff'} 
              transparent 
              opacity={0.4} 
            />
          </Icosahedron>
        </Float>
      ))}
    </group>
  )
}

export const PricingScene = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 5]} intensity={1} color="#88A9C3" />
        <pointLight position={[-10, -5, -5]} intensity={0.5} color="#9D4EDD" />
        
        <Diamond position={[-6, 3, -3]} scale={0.5} color="#88A9C3" />
        <Diamond position={[6, -2, -4]} scale={0.7} color="#9D4EDD" />
        <Diamond position={[0, 4, -5]} scale={0.4} color="#ffffff" />
        
        <PricingRings />
        <ValueParticles count={30} />
      </Canvas>
    </div>
  )
}

export default PricingScene

