import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Car({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  isOn = true,  
  behaviour = null,
  accessories = [],
}) {
  const carRef = useRef();
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  const [latestDirection, setLatestDirection] = useState(1);
  const [speed, setSpeed] = useState(0.3 + (Math.random() * 0.5));
  const [returnPositionLeft, setReturnPositionLeft] = useState(-3 + (Math.random() * 8)); // Random number between -3 and 5
  const [returnPositionRight, setReturnPositionRight] = useState(10 + (Math.random() * 8)); // Random number between 10 and 18
  
  if (latestDirection !== direction) {
    setLatestDirection(direction);
    setSpeed(0.3 + (Math.random() * 0.5));
    setReturnPositionLeft(Math.floor(-3 + (Math.random() * 8))); // Random number between -3 and 5
    setReturnPositionRight(Math.floor(10 + (Math.random() * 8))); // Random number between 10 and 18
  }
  // Load the GLB model with suspense
  const { scene } = useGLTF("/src/assets/objects/carritochatgptsoso.glb", true);

  // Clone the scene and apply modifications once per instance
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Apply desired material and properties to the clone
        child.material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
        child.castShadow = true;
        child.receiveShadow = true;
        child.scale.set(1, 1, 1);
      }
    });
    return clone;
  }, [scene]); // Re-clone only if the original scene object changes

  useFrame((state, delta) => {
    if (behaviour) {
      setDirection(behaviour(state, delta, carRef, speed, direction,returnPositionLeft,returnPositionRight) || direction);
    }
  });

  return (
    <group ref={carRef} position={position} rotation={rotation}>
      {accessories.map((accessory, index) => {
        return (
          <group key={index}>
            {accessory}
          </group>
        )
      })}
      <primitive object={clonedScene} />
      {/* Headlights */}
      {isOn && (
        <>
          <pointLight
            position={[0.5, 0.3, 1.5]}
            intensity={5}
            color="#ffffff"
          />
          <pointLight
            position={[-0.5, 0.3, 1.5]}
            intensity={5}
            color="#ffffff"
          />
          <pointLight
            position={[0.5, 0.3, -1.5]}
            intensity={1}
            color="#ff0000"
          />
          <pointLight
            position={[-0.5, 0.3, -1.5]}
            intensity={1}
            color="#ff0000"
          />
        </>
      )}

      {/* Taillights */}
    </group>
  );
}

// Preload the model
useGLTF.preload("/src/assets/objects/carritochatgptsoso.glb");

export default Car;
