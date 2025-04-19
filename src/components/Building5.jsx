//giant cilinder building
function Building5({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const glassMaterial = {
    transparent: true,
    opacity: 0.5,
    color: "#fffffff",
    metalness: 0.9,
    roughness: 0.05,
    transmission: 0.6,
    reflectivity: 5,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    envMapIntensity: 2.5,
    ior: 1.52, // Index of refraction for glass
    specularIntensity: 1,
    specularColor: "#ffffff",
  };

  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <cylinderGeometry args={[10, 10, 50, 32]} />
        <meshPhysicalMaterial {...glassMaterial} />
      </mesh>
      <mesh position={[0, 0, 11]}>
        <boxGeometry args={[1, 50, 1]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh position={[0, 0, -11]}>
        <boxGeometry args={[1, 50, 1]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      {/* Add some decorative elements */}
      <mesh position={[0, 25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[11, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 25, 0]}>
        <cylinderGeometry args={[11, 11, 2, 32]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh position={[0, 20, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[11, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>      
      <mesh position={[0, 20, 0]}>
        <cylinderGeometry args={[11, 11, 2, 32]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh position={[0, 15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[11, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 15, 0]}>
        <cylinderGeometry args={[11, 11, 2, 32]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh position={[0, 10, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[11, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 10, 0]}>
        <cylinderGeometry args={[11, 11, 2, 32]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh position={[0, 5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[11, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 5, 0]}>
        <cylinderGeometry args={[11, 11, 2, 32]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[11, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[11, 11, 2, 32]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh position={[0, -5, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[11, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, -5, 0]}>
        <cylinderGeometry args={[11, 11, 2, 32]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh position={[0, -10, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[11, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, -10, 0]}>
        <cylinderGeometry args={[11, 11, 2, 32]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh position={[0, -15, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[11, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, -15, 0]}>
        <cylinderGeometry args={[11, 11, 2, 32]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh position={[0, -20, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[11, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, -20, 0]}>
        <cylinderGeometry args={[11, 11, 2, 32]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      <mesh position={[0, -25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[11, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#ff00ff"
          emissive="#ff00ff"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, -25, 0]}>
        <cylinderGeometry args={[11, 11, 2, 32]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      {/* Add some lights */}
      <pointLight position={[0, 20, 0]} intensity={100} color="#00ffff" />
      <pointLight position={[0, -20, 0]} intensity={500}
      distance={10}
       color="#ff00ff" />
    </group>
  );
}

export default Building5;
