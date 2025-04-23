import React from 'react';

const STREET_SEPARATOR_CONFIG = {
  width: 3,
  height: 2,
  length: 88,
  color: "gray",
};

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

export default StreetSeparator; 