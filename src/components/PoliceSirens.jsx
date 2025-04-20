import { useState, useEffect } from "react";
function PoliceSirens() {  
  const [flashState, setFlashState] = useState(true);

  // Flash lights every 0.5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setFlashState((prev) => !prev);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Left blue light */}
      <pointLight
        position={[-0.4, 1.3, 0]}
        intensity={!flashState ? 100 : 0}
        color="blue"
      />
      <mesh position={[-0.15, 0.33, 0]}>
        <boxGeometry args={[0.28, 0.1, 0.1]} />
        <meshStandardMaterial
          color={!flashState ? "#0000ff" : "#000033"}
          emissive={!flashState ? "#0000ff" : "#000000"}
          emissiveIntensity={!flashState ? 1 : 0}
        />
      </mesh>

      {/* Right red light */}
      <pointLight
        position={[0.4, 1.3, 0]}
        intensity={flashState ? 100 : 0}
        color="red"
      />
      <mesh position={[0.15, 0.33, 0]}>
        <boxGeometry args={[0.28, 0.1, 0.1]} />
        <meshStandardMaterial
          color={flashState ? "#ff0000" : "#330000"}
          emissive={flashState ? "#ff0000" : "#000000"}
          emissiveIntensity={flashState ? 1 : 0}
        />
      </mesh>
    </>
  );
}

export default PoliceSirens;
