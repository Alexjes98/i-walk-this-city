import { useGLTF } from '@react-three/drei';

function BackGroundBuilding({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
    const { scene } = useGLTF('/src/assets/objects/edificito.glb', true);
    return (
        <group position={position} rotation={rotation}>
            <primitive object={scene} scale={52} />
        </group>
    )
}

// Preload the model
useGLTF.preload('/src/assets/objects/edificito.glb');

export default BackGroundBuilding;
