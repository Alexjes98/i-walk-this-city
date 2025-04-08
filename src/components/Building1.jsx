import { useRef } from "react";
import { Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { SpotLight, useDepthBuffer } from "@react-three/drei";

import NeonLine from "./NeonLine";

function MovingSpot({ vec = new Vector3(), ...props }) {
  const light = useRef();
  const viewport = useThree((state) => state.viewport);
  useFrame((state) => {
    light.current.target.position.lerp(
      vec.set(
        state.mouse.x * viewport.width,
        state.mouse.y * viewport.height,
        0
      ),
      0.1
    );
    light.current.target.updateMatrixWorld();
  });
  return (
    <SpotLight
      castShadow
      ref={light}
      penumbra={1}
      distance={90}
      angle={0.35}
      attenuation={99}
      decay={9}
      anglePower={9}
      intensity={202}
      {...props}
    />
  );
}

const Building1 = ({ position = [0, 0, 0], rotation = [0, 0, 0] }) => {
  const depthBuffer = useDepthBuffer({ frames: 1 });
  const glassMaterial = {
    transparent: true,
    opacity: 0.5,
    color: "#fffffff",
    metalness: 0.9,
    roughness: 0.05,
    transmission: 0.6,
    reflectivity: 5,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    envMapIntensity: 2.5,
    ior: 1.52, // Index of refraction for glass
    specularIntensity: 1,
    specularColor: "#ffffff",
  };
  const buildingMaterial = {};
  const glassDimensions = [6, 2, 17];

  return (
    <group position={position} rotation={rotation}>
      {/* Main cylinder */}
      <mesh position={[0, 11, -7]}>
        <cylinderGeometry args={[10, 10, 50, 6]} />
        <meshPhongMaterial color="white" />
      </mesh>

      {/* Lights */}
      <pointLight position={[0, 40, 6]} intensity={100} color="red" />
      <mesh position={[10, 40, 15]}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhongMaterial color="purple" />
      </mesh>
      <pointLight
        position={[4, 10, 5]}
        intensity={20}
        decay={0.9}
        color="purple"
      />
      <MovingSpot
        position={[position[0] - 15, position[1]+8, position[2] + -7, 25]}
        depthBuffer={depthBuffer}
        color="red"
      />

      {/* Left building section */}
      <group position={[5, 0, 0]} rotation={[0, -Math.PI / 4, 0]}>
        {/* Main building structure */}
        <mesh>
          <boxGeometry args={[5, 78, 15]} />
          <meshPhongMaterial {...buildingMaterial} />
        </mesh>

        {/* Glass divider */}
        <mesh position={[2, 0, 0]}>
          <boxGeometry args={[3, 75, 0.4]} />
          <meshPhongMaterial color="black" />
        </mesh>

        {/* Glass panels */}
        {[0, 5, 10, 15, 20, 25, 30, 35].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <boxGeometry args={glassDimensions} />
            <meshPhysicalMaterial {...glassMaterial} />
          </mesh>
        ))}
      </group>

      {/* Right building section */}
      <group position={[-5, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
        {/* Main building structure */}
        <mesh>
          <boxGeometry args={[5, 82, 15]} />
          <meshPhongMaterial {...buildingMaterial} />
        </mesh>

        {/* Glass panels */}
        {[0, 5, 10, 15, 20, 25, 30, 35].map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <boxGeometry args={glassDimensions} />
            <meshPhysicalMaterial {...glassMaterial} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

export default Building1;
