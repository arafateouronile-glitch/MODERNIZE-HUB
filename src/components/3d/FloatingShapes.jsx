import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { 
  Float, 
  Torus, 
  Box, 
  Octahedron,
  Dodecahedron,
  Cone
} from '@react-three/drei'

// Forme flottante individuelle
const FloatingShape = ({ position, shape, color, scale = 1, speed = 1 }) => {
  const meshRef = useRef()
  
  useFrame((state) => {
    const t = state.clock.getElapsedTime()
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.3 * speed
      meshRef.current.rotation.y = t * 0.5 * speed
    }
  })

  const renderShape = () => {
    const material = (
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={0.3}
        metalness={0.8}
        roughness={0.2}
        transparent
        opacity={0.8}
        wireframe
      />
    )

    switch (shape) {
      case 'torus':
        return (
          <Torus args={[1, 0.3, 16, 50]} scale={scale}>
            {material}
          </Torus>
        )
      case 'box':
        return (
          <Box args={[1, 1, 1]} scale={scale}>
            {material}
          </Box>
        )
      case 'octahedron':
        return (
          <Octahedron args={[1]} scale={scale}>
            {material}
          </Octahedron>
        )
      case 'dodecahedron':
        return (
          <Dodecahedron args={[1]} scale={scale}>
            {material}
          </Dodecahedron>
        )
      case 'cone':
        return (
          <Cone args={[1, 2, 6]} scale={scale}>
            {material}
          </Cone>
        )
      default:
        return (
          <Octahedron args={[1]} scale={scale}>
            {material}
          </Octahedron>
        )
    }
  }

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={1}>
      <group ref={meshRef} position={position}>
        {renderShape()}
      </group>
    </Float>
  )
}

// Scène pour la section About
export const AboutScene = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#88A9C3" />
        <pointLight position={[-5, -5, -5]} intensity={0.4} color="#9D4EDD" />
        
        <FloatingShape position={[-5, 3, -2]} shape="octahedron" color="#88A9C3" scale={0.8} speed={0.8} />
        <FloatingShape position={[5, -2, -3]} shape="torus" color="#9D4EDD" scale={0.6} speed={0.6} />
        <FloatingShape position={[-4, -3, -1]} shape="dodecahedron" color="#88A9C3" scale={0.5} speed={1} />
        <FloatingShape position={[4, 2, -2]} shape="box" color="#9D4EDD" scale={0.4} speed={0.7} />
      </Canvas>
    </div>
  )
}

// Scène pour la section Process
export const ProcessScene = () => {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.15} />
        <pointLight position={[10, 0, 5]} intensity={1} color="#88A9C3" />
        
        <FloatingShape position={[6, 0, -2]} shape="cone" color="#88A9C3" scale={0.7} speed={0.5} />
        <FloatingShape position={[-6, 2, -3]} shape="octahedron" color="#88A9C3" scale={0.5} speed={0.8} />
        <FloatingShape position={[-5, -3, -2]} shape="torus" color="#9D4EDD" scale={0.4} speed={0.6} />
      </Canvas>
    </div>
  )
}

// Export groupé pour import par défaut
const FloatingShapes = { AboutScene, ProcessScene }
export default FloatingShapes

