import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  Float, 
  RoundedBox,
  Sphere
} from '@react-three/drei'

// Mockup de téléphone 3D
const PhoneMockup = ({ position }) => {
  const groupRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.2
      groupRef.current.rotation.x = Math.cos(t * 0.2) * 0.1
    }
  })

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef} position={position}>
        {/* Corps du téléphone */}
        <RoundedBox args={[1.2, 2.4, 0.15]} radius={0.15} smoothness={4}>
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.9}
            roughness={0.1}
          />
        </RoundedBox>
        {/* Écran */}
        <RoundedBox args={[1.05, 2.2, 0.01]} radius={0.1} position={[0, 0, 0.08]}>
          <meshStandardMaterial
            color="#88A9C3"
            emissive="#88A9C3"
            emissiveIntensity={0.3}
            metalness={0.5}
            roughness={0.3}
          />
        </RoundedBox>
      </group>
    </Float>
  )
}

// Mockup d'écran laptop
const LaptopMockup = ({ position }) => {
  const groupRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.15 + 0.3
      groupRef.current.rotation.x = -0.1
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.4}>
      <group ref={groupRef} position={position} scale={0.8}>
        {/* Écran */}
        <RoundedBox args={[4, 2.5, 0.1]} radius={0.05} position={[0, 1.25, 0]}>
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.8}
            roughness={0.2}
          />
        </RoundedBox>
        {/* Surface écran */}
        <RoundedBox args={[3.6, 2.1, 0.01]} radius={0.03} position={[0, 1.3, 0.06]}>
          <meshStandardMaterial
            color="#88A9C3"
            emissive="#88A9C3"
            emissiveIntensity={0.2}
            metalness={0.3}
            roughness={0.4}
          />
        </RoundedBox>
        {/* Clavier */}
        <RoundedBox args={[4.2, 2.8, 0.15]} radius={0.05} rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -0.3, 0.8]}>
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.7}
            roughness={0.3}
          />
        </RoundedBox>
      </group>
    </Float>
  )
}

// Particules décoratives
const DecoParticles = ({ count = 30 }) => {
  const particles = Array.from({ length: count }, (_, i) => ({
    x: (Math.random() - 0.5) * 15,
    y: (Math.random() - 0.5) * 10,
    z: (Math.random() - 0.5) * 8 - 3,
    scale: Math.random() * 0.1 + 0.02
  }))

  return (
    <group>
      {particles.map((p, i) => (
        <Float key={i} speed={Math.random() * 2 + 0.5} floatIntensity={0.5}>
          <Sphere args={[p.scale, 8, 8]} position={[p.x, p.y, p.z]}>
            <meshBasicMaterial 
              color={i % 2 === 0 ? '#88A9C3' : '#9D4EDD'} 
              transparent 
              opacity={0.5} 
            />
          </Sphere>
        </Float>
      ))}
    </group>
  )
}

export const PortfolioScene = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 5]} intensity={1} color="#88A9C3" />
        <pointLight position={[-10, -5, -5]} intensity={0.5} color="#9D4EDD" />
        <spotLight position={[0, 5, 5]} angle={0.3} penumbra={1} intensity={0.5} color="#ffffff" />
        
        <LaptopMockup position={[-4, 0, -2]} />
        <PhoneMockup position={[5, -1, -1]} />
        <DecoParticles count={25} />
      </Canvas>
    </div>
  )
}

export default PortfolioScene

