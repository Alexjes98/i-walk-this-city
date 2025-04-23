
export function carBehaviour(
  state,
  delta,
  carRef,
  speed,
  direction,
  returnPositionLeft,
  returnPositionRight
) {
  if (carRef.current) {
    // Move the car using the speed prop
    carRef.current.position.z += speed * direction * delta * 60; // Multiply by delta and a factor (e.g., 60) for frame-rate independence
    // Check if car reached the boundaries
    if (carRef.current.position.z >= 110) {
      carRef.current.position.x = returnPositionRight; // Use prop
      carRef.current.rotation.y = Math.PI;
      return -1;
    } else if (carRef.current.position.z <= -110) {
      carRef.current.position.x = returnPositionLeft; // Use prop
      carRef.current.rotation.y = 0;
      return 1;
    }
  }
}
