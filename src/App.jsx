import { createRoot } from "react-dom/client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, OrbitControls, SpotLight, PerspectiveCamera } from "@react-three/drei";
import { useRef, Suspense, useState, useEffect } from "react";
import * as THREE from "three";
import EnvMap from "./EnvMap";
import Building1 from "./components/Building1";
import Building2 from "./components/Building2";
import Building3 from "./components/Building3";
import Building4 from "./components/Building4";
import Building5 from "./components/Building5";
import BuildingBackground from "./components/BuildingBackground";
import BackGroundBuilding from "./components/BackGroundBuilding";
import Avenue from "./components/Avenue";
import MyFirstCar from "./components/MFC";
import LoadingScreen from "./components/LoadingScreen";
import ControlPanel from "./components/ControlPanel";
// Import all sound files
import eyeOfUniverse from "./assets/sounds/eyeofuniverse.mp3";
import favoriteLover from "./assets/sounds/favoritelover.mp3";
import myNewFriend from "./assets/sounds/mynewfriend.mp3";
import miamiDisco from "./assets/sounds/miamidisco.mp3";
import driftRider from "./assets/sounds/driftrider.mp3";
import blueMonday from "./assets/sounds/bluemonday.mp3";
import venger from "./assets/sounds/venger.mp3";
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

// Camera controller component for building navigation
function CameraController({ target, isMoving, setIsMoving, onBuildingReached }) {
  const { camera } = useThree();
  const initialPos = useRef(new THREE.Vector3(0, 8, 25));
  const targetPos = useRef(new THREE.Vector3());
  const lookAtTarget = useRef(new THREE.Vector3());
  const animationProgress = useRef(0);
  
  useEffect(() => {
    if (target) {
      console.log("target", target);
      // Store the current camera position
      initialPos.current.copy(camera.position);
      
      // Set target position - offset from building position for better view
      targetPos.current.set(
        target.position[0] + target.offset[0], // Offset X to view building from an angle
        target.position[1] + target.offset[1], // Higher Y for better overview
        target.position[2] + target.offset[2]  // Offset Z for distance
      );     
      
      // Set look at position - the building itself
      lookAtTarget.current.set(target.position[0], target.position[1], target.position[2]);      
      
      // Reset animation progress
      animationProgress.current = 0;
      setIsMoving(true);
    }
  }, [target, camera]);
  
  useFrame((_, delta) => {
    if (isMoving) {
      // Increment animation progress
      animationProgress.current += delta * 0.5; // Adjust speed by changing multiplier
      
      if (animationProgress.current >= 1) {
        // Animation complete
        animationProgress.current = 1;
        setIsMoving(false);
        
        // Call the callback when building is reached
        if (onBuildingReached && target) {
          onBuildingReached(target.name);
        }
      }
      
      // Calculate interpolated position
      const t = easeOutCubic(animationProgress.current);
      camera.position.lerpVectors(initialPos.current, targetPos.current, t);
      
      // Have camera look at the building during animation
      camera.lookAt(lookAtTarget.current);
    }
  });
  
  return null;
}

// Easing function for smoother camera movement
function easeOutCubic(x) {
  return 1 - Math.pow(1 - x, 3);
}

function CityScene({ orbitControlsEnabled, target, isMoving, setIsMoving, onBuildingReached }) {
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
      <Building1 position={[-20, 0, 0]} rotation={[0, Math.PI / 2, 0]} />
      <Building2 position={[-20, 0, 40]} rotation={[0, 0, 0]} />
      <Avenue position={[-5, -10, 0]} rotation={[0, 0, 0]} />

      <Building3 position={[37, 0, 42]} rotation={[0, Math.PI / 2, 0]} />
      <Building4 position={[28, -10, -20]} rotation={[0, 0, 0]} />
      <Building5 position={[30, 15, 10]} rotation={[0, 0, 0]} />
      <BackGroundBuilding position={[-65, 40, -20]} rotation={[0, 0, 0]} />

      {/* Add visible guides for lights in Building1 */}
      <LightGuide position={[-5, 17, 0]} color="white" size={0.5} />
      <LightGuide position={[0, 1, 0]} color="white" />

      <BuildingBackground windowColor="#ff00ff" windows={5} dimensions={[20, 100, 20]} position={[-25, 0, -27]} rotation={[0, Math.PI / 2, 0]} />
      <BuildingBackground windowColor="#003b99" windows={5} dimensions={[20, 100, 20]} position={[-25, 0, -70]} rotation={[0, 0, 0]} />
      <BuildingBackground windowColor="#ed004b" windows={3} dimensions={[20, 50, 20]} position={[30, 0, -73]} rotation={[0, 0, 0]} />
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
      
      {/* Camera controller for building navigation */}
      <CameraController 
        target={target} 
        isMoving={isMoving} 
        setIsMoving={setIsMoving}
        onBuildingReached={onBuildingReached}
      />
      
      {/* OrbitControls that can be toggled */}
      {orbitControlsEnabled && (
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={50}
        />
      )}
      
      {/* Main camera */}
      <PerspectiveCamera
        makeDefault
        position={[0, 8, 25]}
        fov={45}        
      />
    </>
  );
}

function App() {
  const [orbitControlsEnabled, setOrbitControlsEnabled] = useState(false);
  const [targetBuilding, setTargetBuilding] = useState(null);
  const [cameraIsMoving, setCameraIsMoving] = useState(false);
  const [audioElement, setAudioElement] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [volume, setVolume] = useState(0.5);
  
  // Define available tracks
  const availableTracks = [
    { id: 'eyeOfUniverse', name: 'Eye of Universe', src: eyeOfUniverse },
    { id: 'favoriteLover', name: 'Favorite Lover', src: favoriteLover },
    { id: 'myNewFriend', name: 'My New Friend', src: myNewFriend },
    { id: 'miamiDisco', name: 'Miami Disco', src: miamiDisco },
    { id: 'driftRider', name: 'Drift Rider', src: driftRider },
    { id: 'blueMonday', name: 'Blue Monday', src: blueMonday },
    { id: 'venger', name: 'Venger', src: venger }
  ];
  
  // Building positions for camera navigation
  const buildingPositions = {
    "Building 1": {position: [-10, 0, 0], offset: [25, -8, 25]},
    "Building 2": {position: [10, 0, 30], offset: [5, 0, 3]},
    "Building 3": {position: [7, 0, 65], offset: [-2, 0, 5]},
    "Building 4": {position: [5, 5, -10], offset: [-9, 3, 0]},
    "Building 5": {position: [10, 5, 30], offset: [-15, 0, 15]},    
    "Main Avenue": {position: [0, -8, 20], offset: [0, 0, 2]},
    "StopLight": {position: [15, 0, -52], offset: [8, 2, 0]},    
    "Overview": {position: [0, 10, 60], offset: [0, 0, 0]}
  };
  
  // Handle track changes
  useEffect(() => {
    if (currentTrack) {
      // Clean up previous audio if exists
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
      
      // Create new audio element with selected track
      const audio = new Audio(currentTrack.src);
      audio.loop = true;
      audio.volume = volume;
      setAudioElement(audio);
      
      // Play if already playing state
      if (isPlaying) {
        audio.play();
      }
    }
    
    // Cleanup function
    return () => {
      if (audioElement) {
        audioElement.pause();
        audioElement.src = '';
      }
    };
  }, [currentTrack]);
  
  // Handle volume changes
  useEffect(() => {
    if (audioElement) {
      audioElement.volume = volume;
    }
  }, [volume, audioElement]);
  
  // Handle when building is reached
  const handleBuildingReached = (buildingName) => {
    if (buildingName === "Building 3") {
      // Auto-select first track if none selected
      if (!currentTrack && availableTracks.length > 0) {
        setCurrentTrack(availableTracks[0]);
      }
      setIsPlaying(true);
      if (audioElement) {
        audioElement.play();
      }
    } else if (isPlaying) {
      setIsPlaying(false);
      if (audioElement) {
        audioElement.pause();
      }
    }
  };
  
  // Handle play/pause toggle
  const handlePlayPauseToggle = () => {
    if (!currentTrack && availableTracks.length > 0) {
      setCurrentTrack(availableTracks[0]);
    }
    
    const newPlayingState = !isPlaying;
    setIsPlaying(newPlayingState);
    
    if (audioElement) {
      if (newPlayingState) {
        audioElement.play();
      } else {
        audioElement.pause();
      }
    }
  };
  
  // Handle track selection
  const handleTrackSelect = (track) => {
    setCurrentTrack(track);
  };
  
  // Handle volume change
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
  };
  
  const handleToggleOrbitControls = () => {
    const newState = !orbitControlsEnabled;
    setOrbitControlsEnabled(newState);
    
    // If disabling orbit controls, reset to overview position
    if (!newState) {
      setTargetBuilding({
        name: "Overview", 
        position: buildingPositions["Overview"].position, 
        offset: buildingPositions["Overview"].offset
      });
      setCameraIsMoving(true);
    }
  };
  
  const handleMoveToBuilding = (buildingName, position, offset) => {
    if (!cameraIsMoving) {
      setTargetBuilding({name: buildingName, position: position, offset: offset});
    }
  };

  return (
    <div id="canvas-container">
      <ControlPanel 
        onToggleOrbitControls={handleToggleOrbitControls}
        orbitControlsEnabled={orbitControlsEnabled}
        onMoveToBuilding={handleMoveToBuilding}
        buildingPositions={buildingPositions}
        // Audio controls
        availableTracks={availableTracks}
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        volume={volume}
        onPlayPauseToggle={handlePlayPauseToggle}
        onTrackSelect={handleTrackSelect}
        onVolumeChange={handleVolumeChange}
        showAudioControls={targetBuilding?.name === "Building 3"}
      />
      
      <Canvas shadows>
        <Suspense fallback={<LoadingScreen />}>
          <CityScene 
            orbitControlsEnabled={orbitControlsEnabled}
            target={targetBuilding}
            isMoving={cameraIsMoving}
            setIsMoving={setCameraIsMoving}
            onBuildingReached={handleBuildingReached}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

export default App;
