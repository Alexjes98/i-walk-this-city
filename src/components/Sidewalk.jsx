import React from 'react';

const Sidewalk_CONFIG = {
  width: 4,
  height: 1,
  color: "gray",
};

const Sidewalk = ({ position, length, rotation }) => (
  <mesh position={position} rotation={rotation}>
    <boxGeometry
      args={[Sidewalk_CONFIG.width, Sidewalk_CONFIG.height, length]}
    />
    <meshStandardMaterial color={Sidewalk_CONFIG.color} />
  </mesh>
);

export default Sidewalk; 