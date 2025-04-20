import { createRoot } from "react-dom/client";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, OrbitControls, SpotLight } from "@react-three/drei";
import { useRef, Suspense } from "react";
import EnvMap from "./EnvMap";
import Building1 from "./components/Building1";
import Building2 from "./components/Building2";
import Building3 from "./components/Building3";
import Building4 from "./components/Building4";
import Building5 from "./components/Building5";
import BackGroundBuilding from "./components/BackGroundBuilding";
import Avenue from "./components/Avenue";
import MyFirstCar from "./components/MFC";
import NeonLine from "./components/NeonLine";
import LoadingScreen from "./components/LoadingScreen";
import "./styles.css";

// Light guide component for point lights
function LightGuide({ position, color, size = 0.5 }) {
  return (
    <group position={position}>
      {/* Sphere to indicate light position */}
      <mesh>
        <sphereGeometry args={[size, 8, 8]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={1}
          transparent={true}
          opacity={0.7}
        />
      </mesh>
      
      {/* Cross to indicate light position */}
      <group>
        {/* X axis */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[size * 3, size * 0.2, size * 0.2]} />
          <meshStandardMaterial color={color} emissive={color} />
        </mesh>
        {/* Y axis */}
        <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <boxGeometry args={[size * 3, size * 0.2, size * 0.2]} />
          <meshStandardMaterial color={color} emissive={color} />
        </mesh>
        {/* Z axis */}
        <mesh position={[0, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
          <boxGeometry args={[size * 3, size * 0.2, size * 0.2]} />
          <meshStandardMaterial color={color} emissive={color} />
        </mesh>
      </group>
    </group>
  );
}

// Neon light component


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

function CityScene() {
  const spotLightRef = useRef();
  const movingLightRef = useRef();
  
  useFrame((state, delta) => {
    // Animate one of the spotlights
    if (spotLightRef.current) {
      spotLightRef.current.position.x =
        Math.sin(state.clock.elapsedTime * 0.5) * 10;
    }
    
    // If we have a moving light ref, update its position to match the spotlight
    if (movingLightRef.current && spotLightRef.current) {
      movingLightRef.current.position.x = spotLightRef.current.position.x;
    }
  });

  return (
    <>
      {/* Ground */}
      <mesh position={[0, -10, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[150, 150]} />
        <meshPhongMaterial color="#ffffff" />
      </mesh>
      <MyFirstCar position={[23, -0.45, -9]} rotation={[0, 0, 0]} />
      {/* Buildings */}
      <Building1 position={[-20, 0, 0]} rotation={[0, Math.PI/2, 0]} />
      <Building2 position={[-20, 0, 40]} rotation={[0, 0, 0]} />
      <Avenue position={[-5,-10, 0]} rotation={[0, 0, 0]} />
      <Building3 position={[36, 0, 42]} rotation={[0, Math.PI/2, 0]} />
      <Building4 position={[28, -10, -20]} rotation={[0, 0, 0]} />
      <Building5 position={[30, 15, 10]} rotation={[0, 0, 0]} />
      <BackGroundBuilding position={[-65, 40, -20]} rotation={[0, 0, 0]} />
      
      {/* Add visible guides for lights in Building1 */}      
      <LightGuide position={[-5, 17, 0]} color="white" size={0.5} />

      {/* Cyberpunk Neon Lights */}
      {/* Horizontal building edge lights */}
      <NeonLine
        start={[-23, -10, -8]}
        end={[-17, -10, -8]}
        color="#ff00ff"
        thickness={0.15}
      />
      <NeonLine
        start={[-23, -10, 8]}
        end={[-17, -10, 8]}
        color="#ff00ff"
        thickness={0.15}
      />
      {/* Vertical building edge lights */}
      {/* Building window outlines */}
      <NeonLine
        start={[-17.7, 10, 7.3]}
        end={[1.5, 12, 8.5]}
        color="#ff00aa"
        thickness={0.08}
      />
      
      <NeonLine
        start={[-21.5, 15, -8.5]}
        end={[-16.5, 15, -8.5]}
        color="#ff00aa"
        thickness={0.08}
      />
      <NeonLine
        start={[-21.5, 17, -8.5]}
        end={[-16.5, 17, -8.5]}
        color="#ff00aa"
        thickness={0.08}
      />
      <NeonLine
        start={[-21.5, 18, -8.5]}
        end={[-16.5, 18, -8.5]}
        color="#ff00aa"
        thickness={0.08}
      />
      <NeonLine
        start={[-21.5, 20, -8.5]}
        end={[-16.5, 20, -8.5]}
        color="#ff00aa"
        thickness={0.08}
      />
      {/* Ground grid lines */}
      {[...Array(5)].map((_, i) => (
        <NeonLine
          key={`grid-x-${i}`}
          start={[-30 + i * 15, -9.95, -30]}
          end={[-30 + i * 15, -9.95, 30]}
          color="#8000ff"
          thickness={0.05}
        />
      ))}
      {[...Array(5)].map((_, i) => (
        <NeonLine
          key={`grid-z-${i}`}
          start={[-30, -9.95, -30 + i * 15]}
          end={[30, -9.95, -30 + i * 15]}
          color="#8000ff"
          thickness={0.05}
        />
      ))}

      {/* Diagonal accent lines */}
      <NeonLine
        start={[-15, -10, 10]}
        end={[15, 10, -10]}
        color="#00ff99"
        thickness={0.12}
      />
      <NeonLine
        start={[-15, -10, -10]}
        end={[15, 10, 10]}
        color="#00ff99"
        thickness={0.12}
      />
      {/* Lighting */}      
      
      <LightGuide position={[0, 1, 3]} color="white" />
      
      {/* Spotlights for dramatic lighting */}
      <SpotLight 
        position={[15, 20, 0]} 
        angle={0.3} 
        penumbra={0.2} 
        intensity={20} 
        color="#ff00ff" 
        distance={50} 
        castShadow 
      />
      <LightGuide position={[15, 20, 0]} color="#ff00ff" />
      <SpotLight
        ref={spotLightRef}
        position={[-15, 15, 5]} 
        angle={0.5} 
        penumbra={0.5} 
        intensity={15} 
        color="#00ffff" 
        distance={30} 
        castShadow 
      />
      {/* Moving light guide that follows the animated spotlight */}
      <group ref={movingLightRef} position={[-15, 15, 5]}>
        <LightGuide position={[0, 0, 0]} color="#00ffff" />
      </group>  
      {/* Environment map for reflections */}
      <EnvMap />
      {/* Add fog for atmosphere */}
      <fog attach="fog" args={["#120023", 30, 90]} />
    </>
  );
}

function App() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [0, 8, 25], fov: 45 }} shadows>
        <Suspense fallback={<LoadingScreen />}>
          <CityScene />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={50}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
