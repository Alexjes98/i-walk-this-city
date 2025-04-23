import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const PEDESTRIAN_CONFIG = {
  width: 0.2,
  height: 1.5,
  depth: 0.5,
  color: '#333333',
  speed: 0.09, // Walking speed
};

function Pedestrian({ position = [0, 0, 0], direction = 1, behaviour = pedestrianBehaviour }) {
  const pedestrianRef = useRef();

  useFrame((state, delta) => {
    behaviour(delta, pedestrianRef, direction, PEDESTRIAN_CONFIG.speed);
  });

  return (
    <mesh ref={pedestrianRef} position={position}>
      <boxGeometry args={[PEDESTRIAN_CONFIG.width, PEDESTRIAN_CONFIG.height, PEDESTRIAN_CONFIG.depth]} />
      <meshStandardMaterial color={PEDESTRIAN_CONFIG.color} />
    </mesh>
  );
}

export default Pedestrian; 