import { useTrafficStore } from "./trafficSystem";

const RED_LIGHT_DISTANCE = 17;
const YELLOW_LIGHT_DISTANCE = 30;
const PAST_STOPLIGHT_DISTANCE = 18;
const STOPLIGHT_DISTANCE_TOLERANCE = 10;

const MAX_DISTANCE = 110;

export function carBehaviour(
  state,
  delta,
  carRef,
  speed,
  direction,
  returnPositionLeft,
  returnPositionRight
) {
  if (!carRef.current) return direction;

  const stoplightStates = useTrafficStore.getState().stoplightStates;
  const carPosition = carRef.current.position;
  let yellowSpeed = 1;

  // Check if car is approaching any stoplight
  for (const [_, stoplight] of stoplightStates) {    
    let stoplightDistance = Math.abs(carPosition.z - stoplight.stopPoint);    
    if (direction === 1) {
      // If car is moving right
      if (stoplight.id === "right-stoplight") {
        if (carPosition.z > stoplight.stopPoint && stoplightDistance < PAST_STOPLIGHT_DISTANCE) {
          // If car is already past the stoplight, continue          
        } else if (stoplightDistance < STOPLIGHT_DISTANCE_TOLERANCE) {
          // If car is too close to the stoplight, continue          
        } else if (stoplightDistance < RED_LIGHT_DISTANCE && stoplight.state === "red") {
          return direction;
        } else if (stoplightDistance < YELLOW_LIGHT_DISTANCE && stoplight.state === "yellow") {
          yellowSpeed = 2;
        }
      }
    } else {      
      // If car is moving left
      if (stoplight.id === "left-stoplight") {
        if (carPosition.z < stoplight.stopPoint && stoplightDistance < PAST_STOPLIGHT_DISTANCE) {
          // If car is already past the stoplight, continue          
        } else if (stoplightDistance < STOPLIGHT_DISTANCE_TOLERANCE) {
          // If car is too close to the stoplight, continue          
        } else if (stoplightDistance < RED_LIGHT_DISTANCE && stoplight.state === "red") {
          // If stoplight is red, continue
          return direction;
        } else if (stoplightDistance < YELLOW_LIGHT_DISTANCE && stoplight.state === "yellow") {
          // If stoplight is yellow, slow down
          yellowSpeed = 2;
        }
      }
    }
  }

  // If no stoplight is blocking, continue with normal movement
  carRef.current.position.z += (speed * direction * delta * 60) / yellowSpeed;

  // Existing boundary check logic
  if (carRef.current.position.z >= MAX_DISTANCE) {
    carRef.current.position.x = returnPositionRight;
    carRef.current.rotation.y = Math.PI;
    return -1;
  } else if (carRef.current.position.z <= -MAX_DISTANCE) {
    carRef.current.position.x = returnPositionLeft;
    carRef.current.rotation.y = 0;
    return 1;
  }

  return direction;
}
