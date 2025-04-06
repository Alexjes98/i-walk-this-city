import { Environment, Lightformer } from "@react-three/drei";
const EnvMap = () => {
  return (
    <Environment
      files={["./city.jpg"]}      
    >
      <Lightformer
        intensity={6}
        position={[0, 10, -9]}
        scale={[100, 1, 1]}
        color="purple"
        receiveShadow
        castShadow
      />
      <Lightformer
        intensity={6}
        position={[0, 10, 9]}
        scale={[100, 1, 1]}
        color="purple"
        receiveShadow
        castShadow
      />
    </Environment>
  );
};

export default EnvMap;
