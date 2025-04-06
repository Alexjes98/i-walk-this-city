import { createRoot } from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import { useRef } from "react";
import EnvMap from "./EnvMap";

import "./styles.css";
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
function Building({
  position,
  rotation = [0, 0, 0],
  width,
  height,
  depth,
  color,
  isGlass = false,
}) {
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

  return (
    <>
      <mesh position={position} rotation={rotation}>
        <boxGeometry args={[width, height, depth]} />
        {isGlass ? (
          <meshPhysicalMaterial {...glassMaterial} />
        ) : (
          <meshPhongMaterial color={color} />
        )}
      </mesh>
    </>
  );
}

function GlassBuilding({
  position,
  rotation = [0, 0, 0],
  width,
  height,
  depth,
}) {
  return (
    <Building
      position={position}
      rotation={rotation}
      width={width}
      height={height}
      depth={depth}
      isGlass={true}
    />
  );
}

function CityScene() {
  // Scene content without auto-rotation

  return (
    <>
      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshPhongMaterial color="#444444" />
      </mesh>

      {/* Buildings */}
      <Building
        position={[-2, 1, 0]}
        rotation={[0, Math.PI / 4, 0]}
        width={5}
        height={3}
        depth={2}
        color="#000000"
      />
      <Building
        position={[4, 1, 0]}
        rotation={[0, -Math.PI / 4, 0]}
        width={5}
        height={3}
        depth={2}
        color="#000000"
      />

      {/* Glass Buildings */}
      <GlassBuilding
        position={[-1, 1, 1]}
        rotation={[0, Math.PI / 4, 0]}
        width={5}
        height={1}
        depth={1}
      />

      <GlassBuilding
        position={[4, 1, 1]}
        rotation={[0, -Math.PI / 4, 0]}
        width={5}
        height={1}
        depth={1}
      />

      {/* Lighting */}
      <directionalLight
        position={[0, 2, 3]}
        lookAt={[0, 0, 0]}
        intensity={5}
        color="purple"
      />
      <pointLight
        position={[2, 1, 2]}
        intensity={100}
        distance={10}
        decay={0.5}
        color="purple"
      />

      <mesh position={[1, 2, 1]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshPhysicalMaterial {...glassMaterial} />
      </mesh>

      {/* Environment map for reflections */}
      <EnvMap />

      
    </>
  );
}

function App() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [0, 8, 15], fov: 45 }}>
        <CityScene />
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={25}
        />
      </Canvas>
    </div>
  );
}

export default App;
