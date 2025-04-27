import { useTrafficStore } from "./trafficSystem";
function pedestrianStoplight(pedestrianPosition, stoplight, direction) {
  const stoplightDistance = Math.abs(pedestrianPosition.z - -52);
  // Check stoplight conditions
  if (
    stoplightDistance < 10 &&
    pedestrianPosition.z > -60 &&
    direction === 1 &&
    (stoplight.state === "yellow" || stoplight.state === "red")
  ) {
    return { shouldStop: false, speedMultiplier: 3 };
  }
  if (
    stoplightDistance < 10 &&
    pedestrianPosition.z < -50 &&
    direction === -1 &&
    (stoplight.state === "yellow" || stoplight.state === "red")
  ) {
    return { shouldStop: false, speedMultiplier: 3 };
  }

  if (stoplightDistance < 10 && stoplight.state === "red") {
    return { shouldStop: true, speedMultiplier: 1 };
  }
  return { shouldStop: false, speedMultiplier: 1 };
}

export function pedestrianBehaviour(delta, pedestrianRef, direction, speed) {
  if (pedestrianRef.current) {
    const stoplightStates = useTrafficStore.getState().stoplightStates;
    const pedestrianPosition = pedestrianRef.current.position;
    let speedMultiplier = 1;

    // Check all stoplights
    for (const [_, stoplight] of stoplightStates) {
      const { shouldStop, speedMultiplier: newMultiplier } =
        pedestrianStoplight(pedestrianPosition, stoplight, direction);
      if (shouldStop) return direction;
      speedMultiplier = Math.max(speedMultiplier, newMultiplier);
    }

    // Move the pedestrian using the speed
    pedestrianRef.current.position.z +=
      speed * direction * delta * 60 * speedMultiplier;

    // Check if pedestrian reached the boundaries
    if (pedestrianRef.current.position.z >= 80) {
      pedestrianRef.current.position.z = -80;
    } else if (pedestrianRef.current.position.z <= -80) {
      pedestrianRef.current.position.z = 80;
    }
  }
}
