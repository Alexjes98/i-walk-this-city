
function Building2({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const glassMaterial = {
    transparent: true,
    opacity: 0.5,
    color: "#ffffff",
    metalness: 0.9,
    roughness: 0.05,
    envMapIntensity: 2.5,
  };

  const pilars = [
    { position: [5, -10, 0], rotation: [0, 0, 0] },
    { position: [5, -10, -5], rotation: [0, 0, 0] },
    { position: [5, -10, -10], rotation: [0, 0, 0] },
    { position: [5, -10, -15], rotation: [0, 0, 0] },
    { position: [5, -10, -20], rotation: [0, 0, 0] },
    { position: [5, -10, -25], rotation: [0, 0, 0] },
  ];

  const roofLights = [
    { position: [3, -5, 0], rotation: [0, 0, 0] },
    { position: [3, -5, -5], rotation: [0, 0, 0] },
    { position: [3, -5, -10], rotation: [0, 0, 0] },
    { position: [3, -5, -15], rotation: [0, 0, 0] },
    { position: [3, -5, -20], rotation: [0, 0, 0] },
    { position: [3, -5, -25], rotation: [0, 0, 0] },
  ];

  const dividers = [
    { position: [-3, 2, -2.5], rotation: [0, 0, 0] },
    { position: [-3, 2, -7.5], rotation: [0, 0, 0] },
    { position: [-3, 2, -12.5], rotation: [0, 0, 0] },
    { position: [-3, 2, -17.5], rotation: [0, 0, 0] },
    { position: [-3, 2, -22.5], rotation: [0, 0, 0] },
    //horizontal dividers
    { position: [-3, 15, -12.5], rotation: [Math.PI / 2, 0, 0] },
    { position: [-3, 10, -12.5], rotation: [Math.PI / 2, 0, 0] },
    { position: [-3, 5, -12.5], rotation: [Math.PI / 2, 0, 0] },
    { position: [-3, 0, -12.5], rotation: [Math.PI / 2, 0, 0] },
    { position: [-3, -5, -12.5], rotation: [Math.PI / 2, 0, 0] },
  ];

  return (
    <group position={position} rotation={rotation}>
      {/* pilars*/}
      {pilars.map((pilar, index) => (
        <mesh key={index} position={pilar.position} rotation={pilar.rotation}>
          <boxGeometry args={[1, 10, 1]} />
          <meshStandardMaterial color="gray" />
        </mesh>
      ))}
      {/* roof*/}
      <mesh position={[3, -5, -12.5]} rotation={[0, 0, 0]}>
        <boxGeometry args={[5, 0.2, 27]} />
        <meshStandardMaterial color="black" />
      </mesh>
      {/* roof lights*/}
      {roofLights.map((light, index) => (
        <pointLight
          key={index}
          position={light.position}
          rotation={light.rotation}
          color="#00fff2"
          intensity={5}
          distance={10}
          decay={0.5}
        />
      ))}
      {/* glass*/}
      <mesh position={[-3, 2, -12.5]} rotation={[0, 0, Math.PI / 2]}>
        <boxGeometry args={[25, 0.2, 27]} />
        <meshStandardMaterial {...glassMaterial} />
      </mesh>
      {/* dividers*/}
      {dividers.map((divider, index) => (
        <mesh
          key={index}
          position={divider.position}
          rotation={divider.rotation}
        >
          <boxGeometry args={[0.3, 27, 0.3]} />
          <meshStandardMaterial color="black" />
        </mesh>
      ))}
      {/* building structure*/}
      <mesh position={[-15.6, 0, -12]} rotation={[0, 0, 0]}>
        <boxGeometry args={[25, 30, 27]} />
        <meshStandardMaterial color="grey" />
      </mesh>
      <pointLight          
        position={[-15.6, 0, -12]}
        rotation={[0, 0, 0]}
        color="blue"
        intensity={100}
      />
    </group>
  );
}

export default Building2;
