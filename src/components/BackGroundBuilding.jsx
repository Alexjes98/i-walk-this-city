import { useGLTF } from '@react-three/drei';


function BackGroundBuilding({ position = [0, 0, 0], rotation = [0, 0, 0] }) {

    const { scene } = useGLTF('/src/assets/objects/edificito.glb');
    return (
        <group position={position} rotation={rotation}>
            <primitive object={scene} scale={52} />
        </group>
    )
}

export default BackGroundBuilding;
