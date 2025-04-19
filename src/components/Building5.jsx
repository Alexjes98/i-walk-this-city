// Constants
const BUILDING_DIMENSIONS = {
  RADIUS: 10,
  HEIGHT: 50,
  SEGMENTS: 32,
  DECORATIVE_RADIUS: 11,
  DECORATIVE_THICKNESS: 0.1,
  DECORATIVE_SEGMENTS: 16,
  DECORATIVE_RINGS: 100,
  DECORATIVE_SPACING: 5,
};

const GLASS_MATERIAL = {
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
  ior: 1.52,
  specularIntensity: 1,
  specularColor: "#ffffff",
};

const DECORATIVE_MATERIAL = {
  color: "#ff00ff",
  emissive: "#ff00ff",
  emissiveIntensity: 2,
  toneMapped: false,
};

const GRAY_MATERIAL = {
  color: "gray",
};

// Helper component for decorative rings
const DecorativeRing = ({ position }) => (
  <group position={position}>
    <mesh rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry 
        args={[
          BUILDING_DIMENSIONS.DECORATIVE_RADIUS, 
          BUILDING_DIMENSIONS.DECORATIVE_THICKNESS, 
          BUILDING_DIMENSIONS.DECORATIVE_SEGMENTS, 
          BUILDING_DIMENSIONS.DECORATIVE_RINGS
        ]} 
      />
      <meshStandardMaterial {...DECORATIVE_MATERIAL} />
    </mesh>
    <mesh>
      <cylinderGeometry 
        args={[
          BUILDING_DIMENSIONS.DECORATIVE_RADIUS, 
          BUILDING_DIMENSIONS.DECORATIVE_RADIUS, 
          2, 
          BUILDING_DIMENSIONS.SEGMENTS
        ]} 
      />
      <meshStandardMaterial {...GRAY_MATERIAL} />
    </mesh>
  </group>
);

DecorativeRing.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

function Building5({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  // Generate positions for decorative rings
  const decorativePositions = Array.from(
    { length: 11 }, 
    (_, i) => [0, (i - 5) * BUILDING_DIMENSIONS.DECORATIVE_SPACING, 0]
  );

  return (
    <group position={position} rotation={rotation}>
      {/* Main cylinder */}
      <mesh>
        <cylinderGeometry 
          args={[
            BUILDING_DIMENSIONS.RADIUS, 
            BUILDING_DIMENSIONS.RADIUS, 
            BUILDING_DIMENSIONS.HEIGHT, 
            BUILDING_DIMENSIONS.SEGMENTS
          ]} 
        />
        <meshPhysicalMaterial {...GLASS_MATERIAL} />
      </mesh>

      {/* Vertical supports */}
      <mesh position={[0, 0, 11]}>
        <boxGeometry args={[1, BUILDING_DIMENSIONS.HEIGHT, 1]} />
        <meshStandardMaterial {...GRAY_MATERIAL} />
      </mesh>
      <mesh position={[0, 0, -11]}>
        <boxGeometry args={[1, BUILDING_DIMENSIONS.HEIGHT, 1]} />
        <meshStandardMaterial {...GRAY_MATERIAL} />
      </mesh>

      {/* Decorative rings */}
      {decorativePositions.map((pos, index) => (
        <DecorativeRing key={index} position={pos} />
      ))}

      {/* Lights */}
      <pointLight position={[0, 20, 0]} intensity={100} color="#00ffff" />
      <pointLight 
        position={[0, -20, 0]} 
        intensity={500}
        distance={10}
        color="#ff00ff" 
      />
    </group>
  );
}

export default Building5;
