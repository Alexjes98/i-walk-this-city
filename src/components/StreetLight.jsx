import React from 'react';

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
    emissiveIntensity: 5,
  },
  pointLight: {
    intensity: 20,
    distance: 10,
    decay: 0.9,
    color: "#e0006c",
  },
};

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

export default StreetLight; 