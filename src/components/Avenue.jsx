import Car from "./Car";
import StopLight from "./StopLight";
import PoliceSirens from "./PoliceSirens";

// Constants
const STREET_CONFIG = {
  width: 12,
  height: 0.5,
  length: 200,
  color: "#9c9c9c",
};

const Sidewalk_CONFIG = {
  width: 4,
  height: 1,
  color: "gray",
};

const STREET_SEPARATOR_CONFIG = {
  width: 3,
  height: 2,
  length: 88,
  color: "gray",
};

const LIGHT_CONFIG = {
  pole: {
    width: 0.5,
    height: 3,
    depth: 0.5,
    color: "#333333",
  },
  cylinder: {
    radius: 0.1,
    height: 9,
    color: "#333333",
  },
  fixture: {
    width: 1,
    height: 0.2,
    depth: 0.5,
    color: "#666666",
  },
  glow: {
    radius: 0.3,
    color: "red",
    emissive: "#e0006c",
    emissiveIntensity: 0.5,
  },
  pointLight: {
    intensity: 20,
    distance: 10,
    decay: 0.9,
    color: "#e0006c",
  },
};

// Helper functions
const generateLightPositions = () => {
  const positions = [];
  const leftSide = -5;
  const rightSide = 20;
  const zPositions = [-60, -40, -20, 0, 20, 40, 60];

  zPositions.forEach((z) => {
    positions.push([leftSide, 0, z]);
    positions.push([rightSide, 0, z]);
  });

  return positions;
};

function carBehaviour(
  state,
  delta,
  carRef,
  speed,
  direction,
  returnPositionLeft,
  returnPositionRight
) {
  if (carRef.current) {
    // Move the car using the speed prop
    carRef.current.position.z += speed * direction * delta * 60; // Multiply by delta and a factor (e.g., 60) for frame-rate independence
    // Check if car reached the boundaries
    if (carRef.current.position.z >= 80) {
      carRef.current.position.x = returnPositionRight; // Use prop
      carRef.current.rotation.y = Math.PI;
      return -1;
    } else if (carRef.current.position.z <= -80) {
      carRef.current.position.x = returnPositionLeft; // Use prop
      carRef.current.rotation.y = 0;
      return 1;
    }
  }
}

const StreetLight = ({ position, rotation }) => (
  <group position={position} rotation={[0, rotation, 0]}>
    <mesh>
      <boxGeometry
        args={[
          LIGHT_CONFIG.pole.width,
          LIGHT_CONFIG.pole.height,
          LIGHT_CONFIG.pole.depth,
        ]}
      />
      <meshStandardMaterial color={LIGHT_CONFIG.pole.color} />
    </mesh>
    <mesh position={[0, 3, 0]}>
      <cylinderGeometry
        args={[
          LIGHT_CONFIG.cylinder.radius,
          LIGHT_CONFIG.cylinder.radius,
          LIGHT_CONFIG.cylinder.height,
          8,
        ]}
      />
      <meshStandardMaterial color={LIGHT_CONFIG.cylinder.color} />
    </mesh>
    <mesh position={[-0.4, 7.5, 0]}>
      <boxGeometry
        args={[
          LIGHT_CONFIG.fixture.width,
          LIGHT_CONFIG.fixture.height,
          LIGHT_CONFIG.fixture.depth,
        ]}
      />
      <meshStandardMaterial color={LIGHT_CONFIG.fixture.color} />
    </mesh>
    <mesh position={[-0.5, 7.2, 0]}>
      <dodecahedronGeometry args={[LIGHT_CONFIG.glow.radius, 0]} />
      <meshStandardMaterial
        color={LIGHT_CONFIG.glow.color}
        emissive={LIGHT_CONFIG.glow.emissive}
        emissiveIntensity={LIGHT_CONFIG.glow.emissiveIntensity}
      />
    </mesh>
    <pointLight
      position={[-3, 7, 0]}
      intensity={LIGHT_CONFIG.pointLight.intensity}
      distance={LIGHT_CONFIG.pointLight.distance}
      decay={LIGHT_CONFIG.pointLight.decay}
      color={LIGHT_CONFIG.pointLight.color}
    />
  </group>
);

const Street = ({ position, rotation, length }) => (
  <mesh position={position} rotation={rotation}>
    <boxGeometry args={[STREET_CONFIG.width, STREET_CONFIG.height, length]} />
    <meshStandardMaterial color={STREET_CONFIG.color} />
  </mesh>
);

const Sidewalk = ({ position, length, rotation }) => (
  <mesh position={position} rotation={rotation}>
    <boxGeometry
      args={[Sidewalk_CONFIG.width, Sidewalk_CONFIG.height, length]}
    />
    <meshStandardMaterial color={Sidewalk_CONFIG.color} />
  </mesh>
);

const StreetSeparator = ({ position }) => (
  <mesh position={position}>
    <boxGeometry
      args={[
        STREET_SEPARATOR_CONFIG.width,
        STREET_SEPARATOR_CONFIG.height,
        STREET_SEPARATOR_CONFIG.length,
      ]}
    />
    <meshStandardMaterial color={STREET_SEPARATOR_CONFIG.color} />
  </mesh>
);

function Avenue({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const lightPositions = generateLightPositions();

  return (
    <group position={position} rotation={rotation}>
      {/* Sidewalks */}
      <Sidewalk position={[-6, 0, 7]} length={102} />
      <Street position={[0, 0, 0]} rotation={[0, 0, 0]} length={200} />
      <Sidewalk position={[21, 0, 7]} length={102} />
      <Street position={[15, 0, 0]} rotation={[0, 0, 0]} length={200} />

      {/* Intersection */}
      <Sidewalk position={[-6, 0, -107]} length={102} />
      <Sidewalk position={[-58, 0, -58]} rotation={[0, Math.PI/2, 0]} length={100} />
      <Sidewalk position={[-58, 0, -42]} rotation={[0, Math.PI/2, 0]} length={100} />
      <Sidewalk position={[73, 0, -58]} rotation={[0, Math.PI/2, 0]} length={100} />
      <Sidewalk position={[73, 0, -42]} rotation={[0, Math.PI/2, 0]} length={100} />
      <Sidewalk position={[21, 0, -107]} length={102} />

      {/* Streets */}
      <Street
        position={[0, 0, -50]}
        rotation={[0, Math.PI / 2, 0]}
        length={200}
      />

      {/* Street Separator */}
      <StreetSeparator position={[7.5, 0, 0]} />
      <StreetSeparator position={[7.5, 0, -100]} />

      {/* Street Lights */}
      {lightPositions.map((pos, index) => (
        <StreetLight
          key={index}
          position={pos}
          rotation={pos[0] === -5 || pos[0] === 10 ? Math.PI : 0}
        />
      ))}

      {/* Cars */}
      <Car
        position={[-1, 0.5, -70]}
        rotation={[0, 0, 0]}
        behaviour={carBehaviour}
      />
      <Car
        position={[1, 0.5, 20]}
        rotation={[0, 0, 0]}
        behaviour={carBehaviour}
      />
      <Car
        position={[3, 0.5, -60]}
        rotation={[0, 0, 0]}
        behaviour={carBehaviour}
      />
      <Car
        position={[5, 0.5, 79]}
        rotation={[0, 0, 0]}
        accessories={[<PoliceSirens />]}
        behaviour={carBehaviour}
      />

      {/* Stop Light */}
      <StopLight
        position={[7, 0, -58]}
        rotation={[0, 0, 0]}        
      />
      <StopLight
        position={[7, 0, -40]}
        rotation={[0, Math.PI, 0]}
      />
    </group>
  );
}

export default Avenue;
