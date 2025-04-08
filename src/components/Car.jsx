import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';

function Car({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const carRef = useRef();
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const speed = 0.1;

  useFrame((state, delta) => {
    // FIX THIS THE CAR IS MOVING FROM ONE SIDE TO THE OTHER SHOULD APPEAR FROM THE OTHER SIDE ONCE IT REACHES THE END
    if (carRef.current) {
      // Move the car
      carRef.current.position.z += speed * direction;
      
      // Check if car reached the boundaries
      if (carRef.current.position.z >= 30) {
        setDirection(-1);
      } else if (carRef.current.position.z <= 0) {        
        setDirection(1);
      }
    }
  });

  return (
    <group ref={carRef} position={[0, 0.5, 0]} rotation={rotation}>
      {/* Car body */}
      <mesh>
        <boxGeometry args={[2, 0.5, 4]} />
        <meshPhysicalMaterial 
          color="#ff0000" 
          metalness={0.9}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* Car roof */}
      <mesh position={[0, 0.5, 0]}>
        <boxGeometry args={[1.5, 0.4, 2]} />
        <meshPhysicalMaterial 
          color="#ff0000" 
          metalness={0.9}
          roughness={0.1}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* Headlights */}
      <mesh position={[1, 0, 1.5]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial 
          color="#ffffff" 
          emissive="#ffffff"
          emissiveIntensity={1}
        />
      </mesh>
      
      {/* Taillights */}
      <mesh position={[-1, 0, -1.5]}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial 
          color="#ff0000" 
          emissive="#ff0000"
          emissiveIntensity={1}
        />
      </mesh>
      
      {/* Point lights */}
      <pointLight position={[1, 0, 1.5]} intensity={1} color="#ffffff" />
      <pointLight position={[-1, 0, -1.5]} intensity={1} color="#ff0000" />
    </group>
  );
}

export default Car; 