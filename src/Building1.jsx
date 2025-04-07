import { useRef } from "react";
import { Vector3 } from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { SpotLight, useDepthBuffer } from "@react-three/drei";

import NeonLine from "./components/NeonLine";

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

const Building1 = ({ position, rotation }) => {
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
    <>
      <group position={position} rotation={rotation}>
        <NeonLine
          rotation={[rotation[0], rotation[1], rotation[2]]}
          start={[position[0] + 10, position[1], position[2]]}
          end={[position[0], position[1] + 11, position[2]]}
          color="#8000ff"
          thickness={0.05}
        />
        <mesh
          position={[position[0], position[1] + 11, position[2] - 7]}
          rotation={[rotation[0], rotation[1], rotation[2]]}
        >
          <cylinderGeometry args={[10, 10, 50, 6]} />
          <meshPhongMaterial color="white" />
        </mesh>
        {/* Lights */}
        <pointLight
          position={[position[0], position[1] + 40, position[2] + 6]}
          intensity={100}
          color="red"
        />
        <mesh
          position={[position[0] + 10, position[1] + 40, position[2] + 15]}
          rotation={[rotation[0], rotation[1], rotation[2]]}
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshPhongMaterial color="purple" />
        </mesh>
        <pointLight
          position={[position[0] + 4, position[1] + 10, position[2] + 5]}
          intensity={20}
          color="purple"
        />
        <MovingSpot
          position={[position[0] + 5, position[1] - 7, position[2] + 25]}
          depthBuffer={depthBuffer}
          color="red"
        />

        <group
          position={[position[0] + 5, position[1], position[2]]}
          rotation={[rotation[0], rotation[1] - Math.PI / 4, rotation[2]]}
        >
          {/* Building */}
          <mesh
            position={[position[0], position[1], position[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
          >
            <boxGeometry args={[5, 78, 15]} />
            <meshPhongMaterial {...buildingMaterial} />
          </mesh>
          {/* Glass divider */}
          <mesh
            position={[position[0] + 2, position[1], position[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
          >
            <boxGeometry args={[3, 75, 0.4]} />
            <meshPhongMaterial color="black" />
          </mesh>
          {/* Glass */}
          <mesh
            position={[position[0], position[1], position[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
          >
            <boxGeometry args={glassDimensions} />
            <meshPhysicalMaterial {...glassMaterial} />
          </mesh>

          <mesh
            position={[position[0], position[1] + 5, position[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
          >
            <boxGeometry args={glassDimensions} />
            <meshPhysicalMaterial {...glassMaterial} />
          </mesh>
          <mesh
            position={[position[0], position[1] + 10, position[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
          >
            <boxGeometry args={glassDimensions} />
            <meshPhysicalMaterial {...glassMaterial} />
          </mesh>
          <mesh
            position={[position[0], position[1] + 15, position[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
          >
            <boxGeometry args={glassDimensions} />
            <meshPhysicalMaterial {...glassMaterial} />
          </mesh>
          <mesh
            position={[position[0], position[1] + 20, position[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
          >
            <boxGeometry args={glassDimensions} />
            <meshPhysicalMaterial {...glassMaterial} />
          </mesh>
          <mesh
            position={[position[0], position[1] + 25, position[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
          >
            <boxGeometry args={glassDimensions} />
            <meshPhysicalMaterial {...glassMaterial} />
          </mesh>
          <mesh
            position={[position[0], position[1] + 30, position[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
          >
            <boxGeometry args={glassDimensions} />
            <meshPhysicalMaterial {...glassMaterial} />
          </mesh>
          <mesh
            position={[position[0], position[1] + 35, position[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
          >
            <boxGeometry args={glassDimensions} />
            <meshPhysicalMaterial {...glassMaterial} />
          </mesh>
        </group>
        {/* Reflection */}
        <group
          position={[position[0] - 5, position[1], position[2]]}
          rotation={[rotation[0], rotation[1] + Math.PI / 4, rotation[2]]}
        >
          {/* Building */}
          <mesh
            position={[position[0], position[1], position[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
          >
            <boxGeometry args={[5, 82, 15]} />
            <meshPhongMaterial {...buildingMaterial} />
          </mesh>
          {/* Glass */}
          <mesh
            position={[position[0], position[1], position[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
          >
            <boxGeometry args={glassDimensions} />
            <meshPhysicalMaterial {...glassMaterial} />
          </mesh>
          <mesh
            position={[position[0], position[1] + 5, position[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
          >
            <boxGeometry args={glassDimensions} />
            <meshPhysicalMaterial {...glassMaterial} />
          </mesh>
          <mesh
            position={[position[0], position[1] + 10, position[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
          >
            <boxGeometry args={glassDimensions} />
            <meshPhysicalMaterial {...glassMaterial} />
          </mesh>
          <mesh
            position={[position[0], position[1] + 15, position[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
          >
            <boxGeometry args={glassDimensions} />
            <meshPhysicalMaterial {...glassMaterial} />
          </mesh>
          <mesh
            position={[position[0], position[1] + 20, position[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
          >
            <boxGeometry args={glassDimensions} />
            <meshPhysicalMaterial {...glassMaterial} />
          </mesh>
          <mesh
            position={[position[0], position[1] + 25, position[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
          >
            <boxGeometry args={glassDimensions} />
            <meshPhysicalMaterial {...glassMaterial} />
          </mesh>
          <mesh
            position={[position[0], position[1] + 30, position[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
          >
            <boxGeometry args={glassDimensions} />
            <meshPhysicalMaterial {...glassMaterial} />
          </mesh>
          <mesh
            position={[position[0], position[1] + 35, position[2]]}
            rotation={[rotation[0], rotation[1], rotation[2]]}
          >
            <boxGeometry args={glassDimensions} />
            <meshPhysicalMaterial {...glassMaterial} />
          </mesh>
        </group>
      </group>
    </>
  );
};

export default Building1;
