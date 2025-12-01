import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, Float, Stars } from '@react-three/drei'

const AnimatedSphere = () => {
  const meshRef = useRef(null)

  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.2
      meshRef.current.rotation.y = t * 0.3
    }
  })

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Sphere args={[1, 100, 100]} scale={2.4} ref={meshRef}>
        <MeshDistortMaterial
          color="#1a1a1a"
          attach="material"
          distort={0.5} // Strength, 0 disables distortion (default 1)
          speed={2} // Speed (default 1)
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
        />
      </Sphere>
      {/* Inner Core */}
      <Sphere args={[0.5, 32, 32]} scale={2}>
        <meshStandardMaterial
          color="#D9FF00"
          emissive="#D9FF00"
          emissiveIntensity={2}
          roughness={0}
        />
      </Sphere>
    </Float>
  )
}

export const HeroScene = () => {
  return (
    <div className="absolute inset-0 z-0 h-screen w-full">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#D9FF00" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#9D4EDD" />
        
        <AnimatedSphere />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  )
}


