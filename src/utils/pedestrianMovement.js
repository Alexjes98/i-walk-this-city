export function pedestrianBehaviour(delta, pedestrianRef, direction, speed) {
    if (pedestrianRef.current) {
      // Move the pedestrian using the speed
      pedestrianRef.current.position.z += speed * direction * delta * 60;
      
      // Check if pedestrian reached the boundaries
      if (pedestrianRef.current.position.z >= 80) {
        pedestrianRef.current.position.z = -80;
      } else if (pedestrianRef.current.position.z <= -80) {
        pedestrianRef.current.position.z = 80;
      }
    }
}