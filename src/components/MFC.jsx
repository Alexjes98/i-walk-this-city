import { useLoader } from "@react-three/fiber";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader";
import { TextureLoader } from "three";
import { useMemo } from "react";
import * as THREE from 'three';

function MyFirstCar({position = [0, 0, 0], rotation = [0, 0, 0]}) {
    const obj = useLoader(OBJLoader, "/src/assets/objects/carrito-estilo-ghibli.obj");
    const texture = useLoader(TextureLoader, "/src/assets/textures/textura_base.png");
    
    const material = useMemo(() => {
        return new THREE.MeshStandardMaterial({
            map: texture,
            roughness: 0.5,
            metalness: 0.5
        });
    }, [texture]);

    return (
        <group position={position} rotation={rotation}>
            {obj.children.map((child, index) => (
                <mesh key={index} geometry={child.geometry} material={material} />
            ))}
        </group>
    );
}

export default MyFirstCar