import { useTrafficStore } from "./trafficSystem";

/**
 * Constants for traffic control distances
 */
const TRAFFIC_DISTANCES = {
  RED_LIGHT: 17,
  YELLOW_LIGHT: 35,
  PAST_STOPLIGHT_DISTANCE: 18,
  STOPLIGHT_TOLERANCE: 14,
  MAX_DISTANCE: 110,
  FRAME_RATE_MULTIPLIER: 60,
  YELLOW_SPEED_MULTIPLIER: 2,
};

const CROSS_CAR_DISTANCES = {
  MAX_DISTANCE: 50,
  FRAME_RATE_MULTIPLIER: 60,
  YELLOW_SPEED_MULTIPLIER: 2,
};

function checkStoplight(carPosition, stoplight, direction) {
  const stoplightDistance = Math.abs(carPosition.z - stoplight.stopPoint);
  const isRightDirection = direction === 1;
  const isCorrectStoplight =
    stoplight.id === (isRightDirection ? "right-stoplight" : "left-stoplight");

  if (!isCorrectStoplight) return { shouldStop: false, speedMultiplier: 1 };

  // Check if car is past the stoplight
  if (
    (isRightDirection && carPosition.z > stoplight.stopPoint) ||
    (!isRightDirection && carPosition.z < stoplight.stopPoint)
  ) {
    if (stoplightDistance < TRAFFIC_DISTANCES.PAST_STOPLIGHT_DISTANCE) {
      return { shouldStop: false, speedMultiplier: 1 };
    }
  }

  // Check stoplight conditions
  if (stoplightDistance < TRAFFIC_DISTANCES.STOPLIGHT_TOLERANCE) {
    return { shouldStop: false, speedMultiplier: 1 };
  }

  if (
    stoplightDistance < TRAFFIC_DISTANCES.RED_LIGHT &&
    stoplight.state === "red"
  ) {
    return { shouldStop: true, speedMultiplier: 1 };
  }

  if (
    stoplightDistance < TRAFFIC_DISTANCES.YELLOW_LIGHT &&
    stoplight.state === "yellow"
  ) {
    return {
      shouldStop: false,
      speedMultiplier: TRAFFIC_DISTANCES.YELLOW_SPEED_MULTIPLIER,
    };
  }

  return { shouldStop: false, speedMultiplier: 1 };
}

/**
 * Handles car movement and traffic light behavior
 * @param {Object} state - The current state
 * @param {number} delta - Time delta for movement calculation
 * @param {Object} carRef - Reference to the car object
 * @param {number} speed - Base speed of the car
 * @param {number} direction - Direction of movement (1 for right, -1 for left)
 * @param {number} returnPositionLeft - X position to return to when moving left
 * @param {number} returnPositionRight - X position to return to when moving right
 * @returns {number} The new direction of movement
 */
export function carBehaviour(
  state,
  delta,
  carRef,
  speed,
  direction,
  returnPositionLeft,
  returnPositionRight
) {
  if (!carRef?.current) {
    console.warn("Car reference is invalid");
    return direction;
  }

  const stoplightStates = useTrafficStore.getState().stoplightStates;
  const carPosition = carRef.current.position;
  let speedMultiplier = 1;

  // Check all stoplights
  for (const [_, stoplight] of stoplightStates) {
    const { shouldStop, speedMultiplier: newMultiplier } = checkStoplight(
      carPosition,
      stoplight,
      direction
    );
    if (shouldStop) return direction;
    speedMultiplier = Math.max(speedMultiplier, newMultiplier);
  }

  // Calculate and apply movement
  const movement =
    (speed * direction * delta * TRAFFIC_DISTANCES.FRAME_RATE_MULTIPLIER) /
    speedMultiplier;
  carRef.current.position.z += movement;

  // Handle boundary conditions
  if (carRef.current.position.z >= TRAFFIC_DISTANCES.MAX_DISTANCE) {
    carRef.current.position.x = returnPositionRight;
    carRef.current.rotation.y = Math.PI;
    return -1;
  }

  if (carRef.current.position.z <= -TRAFFIC_DISTANCES.MAX_DISTANCE) {
    carRef.current.position.x = returnPositionLeft;
    carRef.current.rotation.y = 0;
    return 1;
  }

  return direction;
}

function checkCrossCar(carPosition, stoplight, direction) {
  const stoplightDistance = Math.abs(carPosition.x - 20); 
  if (
    stoplightDistance < 5 &&
    (stoplight.state === "green" || stoplight.state === "yellow")
  ) {
    return { shouldStop: true, speedMultiplier: 1 };
  }

  return { shouldStop: false, speedMultiplier: 1 };
}

export function crossCarBehaviour(state, delta, carRef, speed, direction) {
  if (!carRef?.current) {
    console.warn("Car reference is invalid");
    return direction;
  }

  const stoplightStates = useTrafficStore.getState().stoplightStates;
  const carPosition = carRef.current.position;
  let speedMultiplier = 1;

  // Check all stoplights
  for (const [_, stoplight] of stoplightStates) {
    const { shouldStop, speedMultiplier: newMultiplier } = checkCrossCar(carPosition, stoplight, direction);
    if (shouldStop) return direction;
    speedMultiplier = Math.max(speedMultiplier, newMultiplier);
  }

  // Calculate and apply movement
  const movement =
    (speed * direction * delta * TRAFFIC_DISTANCES.FRAME_RATE_MULTIPLIER) /
    speedMultiplier;
  carRef.current.position.x += movement;

  // Handle boundary conditions
  if (carRef.current.position.x >= CROSS_CAR_DISTANCES.MAX_DISTANCE) {
    carRef.current.position.z = -50;
    carRef.current.rotation.y = -Math.PI / 2;
    return -1;
  }

  if (carRef.current.position.x <= -CROSS_CAR_DISTANCES.MAX_DISTANCE) {
    carRef.current.position.x = 50;
    carRef.current.position.z = Math.floor(-55 + (Math.random() * 10));
    return -1;
  }

  return direction;
}