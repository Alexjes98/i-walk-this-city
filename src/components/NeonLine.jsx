function NeonLine({ start, end, color, thickness = 0.1, rotation }) {
  const direction = [end[0] - start[0], end[1] - start[1], end[2] - start[2]];
  const length = Math.sqrt(
    direction[0] ** 2 + direction[1] ** 2 + direction[2] ** 2
  );

  // Center position is halfway between start and end
  const position = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2,
  ];

  // Calculate rotation to align with direction
  const phi = Math.atan2(direction[2], direction[0]);
  const theta = Math.acos(direction[1] / length);

  if (rotation){
    rotation = [rotation[0], rotation[1], rotation[2]]
  }else{
    rotation = [0, phi, theta]
  }

  return (
    <mesh position={position} rotation={rotation}>
      <boxGeometry args={[thickness, thickness, length]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        toneMapped={false}
      />
    </mesh>
  );
}

export default NeonLine;
