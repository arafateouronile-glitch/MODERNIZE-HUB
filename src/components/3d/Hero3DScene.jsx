import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Sphere } from '@react-three/drei'

// Simple sphère lumineuse avec effet de pulsation
const GlowingSphere = () => {
  const meshRef = useRef()

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      // Légère rotation
      meshRef.current.rotation.y = t * 0.1
      // Pulsation subtile
      const scale = 1 + Math.sin(t * 0.5) * 0.05
      meshRef.current.scale.set(scale, scale, scale)
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={meshRef}>
        {/* Sphère principale avec glow */}
        <Sphere args={[2, 64, 64]}>
          <meshStandardMaterial
            color="#88A9C3"
            emissive="#88A9C3"
            emissiveIntensity={0.15}
            roughness={0.8}
            metalness={0.2}
            transparent
            opacity={0.12}
          />
        </Sphere>
        
        {/* Anneau subtil */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.8, 0.008, 16, 100]} />
          <meshBasicMaterial color="#88A9C3" transparent opacity={0.3} />
        </mesh>
      </group>
    </Float>
  )
}

// Scène principale simplifiée
export const Hero3DScene = () => {
  return (
    <div className="absolute inset-0 z-0 h-full w-full pointer-events-none opacity-60">
      <Canvas 
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Éclairage doux */}
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.5} color="#88A9C3" />
        
        {/* Sphère centrale */}
        <GlowingSphere />
      </Canvas>
    </div>
  )
}

export default Hero3DScene
