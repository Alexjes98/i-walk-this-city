import { useRef, useState, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Car({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  speed = 0.3,
  isOn = true,
  returnPositionLeft = 0,
  returnPositionRight = 0,
}) {
  const carRef = useRef();
  const [direction, setDirection] = useState(1); // 1 for right, -1 for left
  // const speed = 0.3; // Removed hardcoded speed

  // Load the GLB model
  const { scene } = useGLTF("/src/assets/objects/carritochatgptsoso.glb");

  // Clone the scene and apply modifications once per instance
  const clonedScene = useMemo(() => {
    const clone = scene.clone();
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        // Apply desired material and properties to the clone
        child.material = new THREE.MeshStandardMaterial({ color: 0x0000ff });
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return clone;
  }, [scene]); // Re-clone only if the original scene object changes

  useFrame((state, delta) => {
    if (carRef.current) {
      // Move the car using the speed prop
      carRef.current.position.z += speed * direction * delta * 60; // Multiply by delta and a factor (e.g., 60) for frame-rate independence
      // Check if car reached the boundaries
      if (carRef.current.position.z >= 80) {
        setDirection(-1);
        carRef.current.position.x = returnPositionRight; // Use prop
        carRef.current.rotation.y = Math.PI;
      } else if (carRef.current.position.z <= -80) {
        setDirection(1);
        carRef.current.position.x = returnPositionLeft; // Use prop
        carRef.current.rotation.y = 0;
      }
    }
  });

  return (
    <group ref={carRef} position={position} rotation={rotation}>
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

export default Car;
