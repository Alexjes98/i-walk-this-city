import { SpotLight } from "@react-three/drei";
import Car from "./Car";
import PoliceSirens from "./PoliceSirens";

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

function Avenue({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  // Create an array of positions for the street lights
  const lightPositions = [
    // Left side of first street
    [-5, 0, -60],
    [-5, 0, -40],
    [-5, 0, -20],
    [-5, 0, 0],
    [-5, 0, 20],
    [-5, 0, 40],
    [-5, 0, 60],
    // Right side of second street
    [20, 0, -60],
    [20, 0, -40],
    [20, 0, -20],
    [20, 0, 0],
    [20, 0, 20],
    [20, 0, 40],
    [20, 0, 60],
  ];

  return (
    <group position={position} rotation={rotation}>
      {/* Crosswalk */}
      <mesh position={[-6, 0, 0]}>
        <boxGeometry args={[4, 1, 200]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      {/* Street 1*/}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[12, 0.5, 200]} />
        <meshStandardMaterial color="#9c9c9c" />
      </mesh>
      {/* Street 2*/}
      <mesh position={[15, 0, 0]}>
        <boxGeometry args={[12, 0.5, 200]} />
        <meshStandardMaterial color="#9c9c9c" />
      </mesh>
      {/* Crosswalk */}
      <mesh position={[21, 0, 0]}>
        <boxGeometry args={[4, 1, 200]} />
        <meshStandardMaterial color="gray" />
      </mesh>
      {/* Street separator */}
      <mesh position={[7.5, 0, 0]}>
        <boxGeometry args={[3, 2, 200]} />
        <meshStandardMaterial color="gray" />
      </mesh>

      {/* Street Lights */}
      {lightPositions.map((pos, index) => {
        let rotation = 0;
        if (pos[0] === -5 || pos[0] === 10) {
          rotation = Math.PI;
        }

        return (
          <group key={index} position={pos} rotation={[0, rotation, 0]}>
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[0.5, 3, 0.5]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
            {/* Light Pole */}
            <mesh position={[0, 3, 0]}>
              <cylinderGeometry args={[0.1, 0.1, 9, 8]} />
              <meshStandardMaterial color="#333333" />
            </mesh>
            {/* Light Fixture */}
            <mesh position={[-0.4, 7.5, 0]}>
              <boxGeometry args={[1, 0.2, 0.5]} />
              <meshStandardMaterial color="#666666" />
            </mesh>
            {/* Glowing Box */}
            <mesh position={[-0.5, 7.2, 0]}>
              <dodecahedronGeometry args={[0.3, 0]} />
              <meshStandardMaterial
                color="red"
                emissive="#e0006c"
                emissiveIntensity={0.5}
              />
            </mesh>
            {/* Point Light */}
            <pointLight
              position={[-3, 7, 0]}
              intensity={20}
              distance={10}
              decay={0.9}
              color="#e0006c"
            />
          </group>
        );
      })}

      {/* Add the animated car */}
      <Car
        position={[-1, 0.5, 0]}
        rotation={[0, 0, 0]}
        behaviour={carBehaviour}
      />
      <Car
        position={[1, 0.5, 0]}
        rotation={[0, 0, 0]}
        behaviour={carBehaviour}
      />
      <Car
        position={[3, 0.5, 0]}
        rotation={[0, 0, 0]}
        behaviour={carBehaviour}
      />
      <Car
        position={[5, 0.5, 0]}
        rotation={[0, 0, 0]}
        accessories={[<PoliceSirens />]}
        behaviour={carBehaviour}
      />
      
    </group>
  );
}

export default Avenue;
