const WINDOW_MATERIAL = {
  emissiveIntensity: 2,
  toneMapped: false,
};
export default function BuildingBackground({
  windows,
  windowColor,
  dimensions,
  position,
  rotation,
}) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <boxGeometry args={[dimensions[0], dimensions[1], dimensions[2]]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      {Array.from({ length: windows }, (_, i) => (
        <mesh key={i} position={[0, 0 + i * 10, 0]}>
          <boxGeometry args={[dimensions[0] + 1, 2, dimensions[2] + 1]} />
          <meshStandardMaterial
            {...WINDOW_MATERIAL}
            color={windowColor}
            emissive={windowColor}
          />
        </mesh>
      ))}
    </group>
  );
}
