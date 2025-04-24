import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useTrafficStore } from "../utils/trafficSystem";

const STOPLIGHT_CONFIG = {
  pole: {
    position: [0, 3, 0],
    topPosition: [3.25, 6, 0],
    width: 0.5,
    topWidth: 0.5,
    height: 6,
    topHeight: 7,
    depth: 0.5,
    topDepth: 0.5,
    color: "#787878",
  },
  poleDecorator: {
    position: [0, 3, 0.3],
    width: 0.2,
    height: 6,
    depth: 0.2,
    color: "#787878",    
    emissiveIntensity: 1,
  },
  box: {
    position: [7, 5.5, 0],
    width: 1,
    height: 2.5,
    depth: 0.8,
    color: "#222222",
  },
  lights: {
    red: {
      color: "#ff0000",
      emissive: "#ff0000",
      emissiveIntensity: 1,
      position: [7, 6, 0.5],
      duration: 5, // 5 seconds
    },
    yellow: {
      color: "#ffff00",
      emissive: "#ffff00",
      emissiveIntensity: 1,
      position: [7, 5.5, 0.5],
      duration: 2, // 2 seconds
    },
    green: {
      color: "#00ff00",
      emissive: "#00ff00",
      emissiveIntensity: 1,
      position: [7, 5, 0.5],
      duration: 5, // 5 seconds
    },
  },
};

function StopLight({ id, position = [0, 0, 0], rotation = [0, 0, 0] }) {
  
  const lightRef = useRef();
  const [activeLight, setActiveLight] = useState("red");
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  const [poleDecoratorColor, setPoleDecoratorColor] = useState(STOPLIGHT_CONFIG.poleDecorator.color);

  const registerStoplight = useTrafficStore(state => state.registerStoplight);
  const updateStoplightState = useTrafficStore(state => state.updateStoplightState);

  useEffect(() => {    
    registerStoplight(id, position, rotation);
  }, []);

  useFrame((state, delta) => {
    setTimeElapsed((prev) => prev + delta);

    // Check if it's time to change the light
    if (
      activeLight === "red" &&
      timeElapsed >= STOPLIGHT_CONFIG.lights.red.duration
    ) {
      setActiveLight("green");
      setTimeElapsed(0);
      setPoleDecoratorColor(STOPLIGHT_CONFIG.lights.green.color);
    } else if (
      activeLight === "yellow" &&
      timeElapsed >= STOPLIGHT_CONFIG.lights.yellow.duration
    ) {
      setActiveLight("red");
      setTimeElapsed(0);
      setPoleDecoratorColor(STOPLIGHT_CONFIG.lights.red.color);
    } else if (
      activeLight === "green" &&
      timeElapsed >= STOPLIGHT_CONFIG.lights.green.duration
    ) {
      setActiveLight("yellow");
      setTimeElapsed(0);
      setPoleDecoratorColor(STOPLIGHT_CONFIG.lights.yellow.color);
    }

    updateStoplightState(id, activeLight);
  });

  return (
    <group ref={lightRef} position={position} rotation={rotation}>
      {/* Pole */}
      <mesh position={STOPLIGHT_CONFIG.pole.position}>
        <boxGeometry
          args={[
            STOPLIGHT_CONFIG.pole.width,
            STOPLIGHT_CONFIG.pole.height,
            STOPLIGHT_CONFIG.pole.depth,
          ]}
        />
        <meshStandardMaterial color={STOPLIGHT_CONFIG.pole.color} />
      </mesh>
      <mesh position={STOPLIGHT_CONFIG.poleDecorator.position} rotation={[0, 0, 0]}>
        <boxGeometry args={[STOPLIGHT_CONFIG.poleDecorator.width, STOPLIGHT_CONFIG.poleDecorator.height, STOPLIGHT_CONFIG.poleDecorator.depth]} />
        <meshStandardMaterial
          color={poleDecoratorColor}
          emissive={poleDecoratorColor}
          emissiveIntensity={STOPLIGHT_CONFIG.poleDecorator.emissiveIntensity}
        />
      </mesh>
      {/* Top */}
      <mesh
        position={STOPLIGHT_CONFIG.pole.topPosition}
        rotation={[0, 0, Math.PI / 2]}
      >
        <boxGeometry
          args={[
            STOPLIGHT_CONFIG.pole.topWidth,
            STOPLIGHT_CONFIG.pole.topHeight,
            STOPLIGHT_CONFIG.pole.topDepth,
          ]}
        />
        <meshStandardMaterial color={STOPLIGHT_CONFIG.pole.color} />
      </mesh>
      {/* Box */}
      <mesh position={STOPLIGHT_CONFIG.box.position}>
        <boxGeometry
          args={[
            STOPLIGHT_CONFIG.box.width,
            STOPLIGHT_CONFIG.box.height,
            STOPLIGHT_CONFIG.box.depth,
          ]}
        />
        <meshStandardMaterial color={STOPLIGHT_CONFIG.box.color} />
      </mesh>
      {/* Lights */}
      <mesh position={STOPLIGHT_CONFIG.lights.red.position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color={STOPLIGHT_CONFIG.lights.red.color}
          emissive={STOPLIGHT_CONFIG.lights.red.emissive}
          emissiveIntensity={
            activeLight === "red"
              ? STOPLIGHT_CONFIG.lights.red.emissiveIntensity
              : 0
          }
        />
      </mesh>
      <pointLight
        position={STOPLIGHT_CONFIG.lights.red.position}
        intensity={activeLight === "red" ? 50 : 0}
        color={STOPLIGHT_CONFIG.lights.red.color}
      />
      <mesh position={STOPLIGHT_CONFIG.lights.yellow.position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color={STOPLIGHT_CONFIG.lights.yellow.color}
          emissive={STOPLIGHT_CONFIG.lights.yellow.emissive}
          emissiveIntensity={
            activeLight === "yellow"
              ? STOPLIGHT_CONFIG.lights.yellow.emissiveIntensity
              : 0
          }
        />
      </mesh>
      <pointLight
        position={STOPLIGHT_CONFIG.lights.yellow.position}
        intensity={activeLight === "yellow" ? 50 : 0}
        color={STOPLIGHT_CONFIG.lights.yellow.color}
      />

      <mesh position={STOPLIGHT_CONFIG.lights.green.position}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color={STOPLIGHT_CONFIG.lights.green.color}
          emissive={STOPLIGHT_CONFIG.lights.green.emissive}
          emissiveIntensity={
            activeLight === "green"
              ? STOPLIGHT_CONFIG.lights.green.emissiveIntensity
              : 0
          }
        />
      </mesh>
      <pointLight
        position={STOPLIGHT_CONFIG.lights.green.position}
        intensity={activeLight === "green" ? 50 : 0}
        color={STOPLIGHT_CONFIG.lights.green.color}
      />
    </group>
  );
}

export default StopLight;
