import Car from "./Car";
import StopLight from "./StopLight";
import PoliceSirens from "./PoliceSirens";
import Pedestrian from "./Pedestrian";
import StreetLight from "./StreetLight";
import Street from "./Street";
import Sidewalk from "./Sidewalk";
import StreetSeparator from "./StreetSeparator";
import { pedestrianBehaviour } from "../utils/pedestrianMovement";
import { carBehaviour, crossCarBehaviour } from "../utils/carMovement";
// Entity configurations
const CAR_CONFIGS = [
  {
    position: [-1, 0.5, -70],
    rotation: [0, 0, 0],
    accessories: [],
  },
  {
    position: [1, 0.5, 20],
    rotation: [0, 0, 0],
    accessories: [],
  },
  {
    position: [3, 0.5, -60],
    rotation: [0, 0, 0],
    accessories: [],
  },
  {
    position: [5, 0.5, 79],
    rotation: [0, 0, 0],
    accessories: [<PoliceSirens />],
  },
];

const CROSS_CAR_CONFIGS = [
  {
    position: [0, 0.5, -50],
    rotation: [0, Math.PI/2, 0],
    accessories: [],
  },
  {
    position: [0, 0.5, -51],
    rotation: [0, Math.PI/2, 0],
    accessories: [],
  },
  {
    position: [0, 0.5, -55],
    rotation: [0, Math.PI/2, 0],
    accessories: [],
  },

];

const PEDESTRIAN_CONFIGS = [
  // Left sidewalk pedestrians
  { position: [-6, 0.95, -30], direction: 1 },
  { position: [-6, 0.95, 10], direction: -1 },
  { position: [-6, 0.95, 40], direction: 1 },
  { position: [-6, 0.95, 60], direction: -1 },
  { position: [-6, 0.95, 80], direction: 1 },
  { position: [-6, 0.95, -50], direction: -1 },
  
  // Right sidewalk pedestrians
  { position: [21, 0.95, -20], direction: 1 },
  { position: [21, 0.95, 20], direction: -1 },
  { position: [21, 0.95, 50], direction: 1 },
  { position: [21, 0.95, 70], direction: -1 },
  { position: [21, 0.95, 90], direction: 1 },
  { position: [21, 0.95, -50], direction: 1 },
  
  // Crosswalk pedestrians
  { position: [-40, 0.95, -50], direction: 1 },
  { position: [60, 0.95, -50], direction: -1 },
];

const STOPLIGHT_CONFIGS = [
  {
    id: 'left-stoplight',
    position: [7, 0, -58],
    rotation: [0, 0, 0],
  },
  {
    id: 'right-stoplight',
    position: [7, 0, -42],
    rotation: [0, Math.PI, 0],
  },
];

// Helper functions
const generateLightPositions = () => {
  const positions = [];
  const leftSide = -5;
  const rightSide = 20;
  const zPositions = [-60, -40, -20, 0, 20, 40, 60];

  zPositions.forEach((z) => {
    positions.push([leftSide, 0, z]);
    positions.push([rightSide, 0, z]);
  });

  return positions;
};

function Avenue({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  const lightPositions = generateLightPositions();

  return (
    <group position={position} rotation={rotation}>
      {/* Sidewalks */}
      <Sidewalk position={[-6, 0, 7]} length={102} />
      <Street position={[0, 0, 0]} rotation={[0, 0, 0]} length={200} />
      <Sidewalk position={[21, 0, 7]} length={102} />
      <Street position={[15, 0, 0]} rotation={[0, 0, 0]} length={200} />

      {/* Intersection */}
      <Sidewalk position={[-6, 0, -107]} length={102} />
      <Sidewalk position={[-58, 0, -58]} rotation={[0, Math.PI/2, 0]} length={100} />
      <Sidewalk position={[-58, 0, -42]} rotation={[0, Math.PI/2, 0]} length={100} />
      <Sidewalk position={[73, 0, -58]} rotation={[0, Math.PI/2, 0]} length={100} />
      <Sidewalk position={[73, 0, -42]} rotation={[0, Math.PI/2, 0]} length={100} />
      <Sidewalk position={[21, 0, -107]} length={102} />

      {/* Streets */}
      <Street
        position={[0, 0, -50]}
        rotation={[0, Math.PI / 2, 0]}
        length={200}
      />

      {/* Street Separator */}
      <StreetSeparator position={[7.5, 0, 0]} />
      <StreetSeparator position={[7.5, 0, -100]} />

      {/* Street Lights */}
      {lightPositions.map((pos, index) => (
        <StreetLight
          key={index}
          position={pos}
          rotation={pos[0] === -5 || pos[0] === 10 ? Math.PI : 0}
        />
      ))}

      {/* Cars */}
      {CAR_CONFIGS.map((config, index) => (
        <Car
          key={index}
          position={config.position}
          rotation={config.rotation}
          accessories={config.accessories}
          behaviour={carBehaviour}
        />
      ))}

      {CROSS_CAR_CONFIGS.map((config, index) => (
        <Car
          key={index}
          position={config.position}
          rotation={config.rotation}          
          behaviour={crossCarBehaviour}
        />
      ))}

      {/* Stop Lights */}
      {STOPLIGHT_CONFIGS.map((config, index) => (
        <StopLight
          key={index}
          id={config.id}
          position={config.position}
          rotation={config.rotation}
        />
      ))}

      {/* Pedestrians */}
      {PEDESTRIAN_CONFIGS.map((config, index) => (
        <Pedestrian
          key={index}
          position={config.position}
          direction={config.direction}
          behaviour={pedestrianBehaviour}
        />
      ))}
    </group>
  );
}

export default Avenue;
