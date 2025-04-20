import { useGLTF } from "@react-three/drei";

function MyFirstCar({position = [0, 0, 0], rotation = [0, 0, 0]}) {
    const { scene } = useGLTF("/src/assets/objects/carrito-estilo-ghibli.glb", true);
    return (
        <group position={position} rotation={rotation}>
          <primitive object={scene} />
        </group>
      );
}

export default MyFirstCar