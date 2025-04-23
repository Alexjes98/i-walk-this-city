import React from 'react';

const STREET_CONFIG = {
  width: 12,
  height: 0.5,
  color: "#9c9c9c",
};

const Street = ({ position, rotation, length }) => (
  <mesh position={position} rotation={rotation}>
    <boxGeometry args={[STREET_CONFIG.width, STREET_CONFIG.height, length]} />
    <meshStandardMaterial color={STREET_CONFIG.color} />
  </mesh>
);

export default Street; 