// CLUB
import { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
  // Create glass material
const glassMaterial = new THREE.MeshPhysicalMaterial({
  transparent: false,
  opacity: 0.9,
  roughness: 0.2,
  transmission: 0.1,
  thickness: 0.5,
  clearcoat: 1.0,
  clearcoatRoughness: 0.1,
  envMapIntensity: 1.5,
  metalness: 0.9,
  //color: new THREE.Color(1, 1, 1),
});
function Building3({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const [activeLight, setActiveLight] = useState(0);
  const lightsRef = useRef([]);
  const glassRef = useRef();
  const time = useRef(0);
  // Flash lights sequence
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLight((prev) => (prev + 1) % 3);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const redLight = new THREE.Color(1, 0.2, 0.2);
  const greenLight = new THREE.Color(0.2, 1, 0.2);
  const purpleLight = new THREE.Color(0.8, 0.2, 0.8);

  const colors = {
    0: redLight, // Red tint
    1: greenLight, // Green tint
    2: purpleLight, // Purple tint
  };

  // Animate glass material
  useFrame((state, delta) => {
    time.current += delta;
    if (glassRef.current) {
      // Change color tint based on active light
      glassRef.current.material.color.lerp(colors[activeLight], 0.1);
    }
  });

  const octaedronRadius = 20;
  const octaedronHeight = 5;

  return (
    <group position={position} rotation={rotation}>
      <mesh ref={glassRef} position={[0, 0, 0]}>
        <octahedronGeometry args={[octaedronRadius, octaedronHeight]} />
        <primitive object={glassMaterial} />
      </mesh>

      {/* Outlined octahedron cage */}
      <mesh position={[0.01, 0.01, 0.01]}>
        <octahedronGeometry args={[octaedronRadius, octaedronHeight]} />
        <meshBasicMaterial
          color="#000000"
          wireframe={true}
          transparent={true}
          opacity={1}
        />
      </mesh>
      <mesh>
        <octahedronGeometry args={[octaedronRadius, octaedronHeight]} />
        <meshBasicMaterial
          color="#000000"
          wireframe={true}
          transparent={true}
          opacity={1}
        />
      </mesh>
      <mesh position={[-0.01, -0.01, -0.01]}>
        <octahedronGeometry args={[octaedronRadius, octaedronHeight]} />
        <meshBasicMaterial
          color="#000000"
          wireframe={true}
          transparent={true}
          opacity={1}
        />
      </mesh>

      {/* Point lights container */}
      <group>
        <pointLight
          ref={(el) => (lightsRef.current[0] = el)}
          position={[5, 20, -5]}
          color="#ff0000"
          intensity={activeLight === 0 ? 100 : 0}
          distance={5}
        />
        <pointLight
          ref={(el) => (lightsRef.current[1] = el)}
          position={[-5, 20, -5]}
          color="#00ff00"
          intensity={activeLight === 1 ? 100 : 0}
          distance={5}
        />
        <pointLight
          ref={(el) => (lightsRef.current[2] = el)}
          position={[0, 20, -8]}
          color="#800080"
          intensity={activeLight === 2 ? 100 : 0}
          distance={5}
        />
      </group>
    </group>
  );
}

export default Building3;
