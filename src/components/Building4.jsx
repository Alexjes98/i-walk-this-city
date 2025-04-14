// parking lot bulding
import Car from "./Car";
function ParkingLotFloor({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  isLastFloor = false,
}) {
  const lightColor = "#00ffe1";
  const lightIntensity = 20;
  const lightDistance = 10;
  const lightDecay = 0.9;
  const wallsColor = "#ab003c";
  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 1, 0]} rotation={[0, 0, 0]}>
        <boxGeometry args={[18, 0.1, 30]} />
        <meshPhysicalMaterial color="gray" />
      </mesh>
      {/*up ramp*/}
      {!isLastFloor && (
        <mesh position={[0, 3, 0]} rotation={[Math.PI / 8, 0, 0]}>
          <boxGeometry args={[3, 0.5, 10]} />
          <meshPhongMaterial color={wallsColor} />
        </mesh>
      )}
      {/* front of the building */}
      <mesh position={[-9, 1, 0]}>
        <boxGeometry args={[1, 2, 30]} />
        <meshPhysicalMaterial color={wallsColor} />
      </mesh>
      {/* back of the building */}
      <mesh position={[9, 1, 0]}>
        <boxGeometry args={[1, 2, 30]} />
        <meshPhysicalMaterial color={wallsColor} />
      </mesh>
      {/* left side of the building */}
      <mesh position={[0, 1, 15]}>
        <boxGeometry args={[17, 2, 1]} />
        <meshPhysicalMaterial color={wallsColor} />
      </mesh>
      {/* right side of the building */}
      <mesh position={[0, 1, -15]}>
        <boxGeometry args={[17, 2, 1]} />
        <meshPhysicalMaterial color={wallsColor} />
      </mesh>
      {/* parked cars */}
      <Car
        position={[-6, 1.3, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        speed={0}
        isOn={false}
      />
      <Car
        position={[-6, 1.3, 2]}
        rotation={[0, -Math.PI / 2, 0]}
        speed={0}
        isOn={false}
      />
      <Car
        position={[6, 1.3, 8]}
        rotation={[0, -Math.PI / 2, 0]}
        speed={0}
        isOn={false}
      />
      <Car
        position={[6, 1.3, -8]}
        rotation={[0, -Math.PI / 2, 0]}
        speed={0}
        isOn={false}
      />
      <Car
        position={[6, 1.3, -4]}
        rotation={[0, -Math.PI / 2, 0]}
        speed={0}
        isOn={false}
      />

      {!isLastFloor && (
        <>
          <pointLight
            position={[-4, 2, -9]}
            color={lightColor}
            intensity={lightIntensity}
            distance={lightDistance}
            decay={lightDecay}
          />
          <pointLight
            position={[4, 2, -9]}
            color={lightColor}
            intensity={lightIntensity}
            distance={lightDistance}
            decay={lightDecay}
          />
          <pointLight
            position={[-4, 2, 9]}
            color={lightColor}
            intensity={lightIntensity}
            distance={lightDistance}
            decay={lightDecay}
          />
          <pointLight
            position={[4, 2, 9]}
            color={lightColor}
            intensity={lightIntensity}
            distance={lightDistance}
            decay={lightDecay}
          />
        </>
      )}
    </group>
  );
}
function Building4({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const pillars = [
    { position: [9.5, 8, 15], rotation: [0, 0, 0] },
    { position: [9.5, 8, 9], rotation: [0, 0, 0] },
    { position: [9.5, 8, 3], rotation: [0, 0, 0] },
    { position: [9.5, 8, -3], rotation: [0, 0, 0] },
    { position: [9.5, 8, -9], rotation: [0, 0, 0] },
    { position: [9.5, 8, -15], rotation: [0, 0, 0] },
    { position: [-9.5, 8, 15], rotation: [0, 0, 0] },
    { position: [-9.5, 8, 9], rotation: [0, 0, 0] },
    { position: [-9.5, 8, 3], rotation: [0, 0, 0] },
    { position: [-9.5, 8, -3], rotation: [0, 0, 0] },
    { position: [-9.5, 8, -9], rotation: [0, 0, 0] },
    { position: [-9.5, 8, -15], rotation: [0, 0, 0] },
    /* Internal pillars */
    { position: [0, 6, 10], rotation: [0, 0, 0] },
    { position: [-3, 6, 10], rotation: [0, 0, 0] },
    { position: [3, 6, 10], rotation: [0, 0, 0] },

    { position: [0, 6, 6], rotation: [0, 0, 0] },
    { position: [-3, 6, 6], rotation: [0, 0, 0] },
    { position: [3, 6, 6], rotation: [0, 0, 0] },


    { position: [0, 6, -10], rotation: [0, 0, 0] },
    { position: [-3, 6, -10], rotation: [0, 0, 0] },
    { position: [3, 6, -10], rotation: [0, 0, 0] },

    { position: [0, 6, -6], rotation: [0, 0, 0] },
    { position: [-3, 6, -6], rotation: [0, 0, 0] },
    { position: [3, 6, -6], rotation: [0, 0, 0] },

    { position: [3, 6, 0], rotation: [0, 0, 0] },
    { position: [-3, 6, 0], rotation: [0, 0, 0] },
  ];
  return (
    <group position={position} rotation={rotation}>
      {/* pillars of the building */}
      {pillars.map((pillar, index) => (
        <mesh
          key={index}
          position={pillar.position}
          rotation={pillar.rotation}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1, 20.3, 1]} />
          <meshPhysicalMaterial color="#636363" />
        </mesh>
      ))}
      <ParkingLotFloor position={[0, 0, 0]} rotation={[0, -Math.PI, 0]} />
      <ParkingLotFloor position={[0, 4, 0]} rotation={[0, 0, 0]} />
      <ParkingLotFloor position={[0, 8, 0]} rotation={[0, 0, 0]} />
      <ParkingLotFloor position={[0, 12, 0]} rotation={[0, -Math.PI, 0]} />
      <ParkingLotFloor
        position={[0, 16, 0]}
        rotation={[0, 0, 0]}
        isLastFloor={true}
      />
    </group>
  );
}

export default Building4;
