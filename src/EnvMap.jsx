import { Environment, Lightformer } from "@react-three/drei";
const EnvMap = () => {
  return (
    <Environment
      
      files={["./3.jpg"]}
    >
      <Lightformer
        intensity={6}
        position={[0, 10, -9]}
        scale={[100, 1, 1]}
        color="purple"        
      />
      <Lightformer
        intensity={60}
        position={[0, 10, 9]}
        rotation={[0, -Math.PI / 2, 0]}
        scale={[100, 1, 1]}
        color="purple"        
      />
      <Lightformer
        intensity={6}
        position={[0, 0, -9]}
        scale={[100, 1, 1]}
        color="purple"        
      />
    </Environment>
  );
};

export default EnvMap;
