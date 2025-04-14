// CLUB
function Building3({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
    return (
        <group position={position} rotation={rotation}>
            <mesh>
                <boxGeometry args={[10, 10, 10]} />
                <meshStandardMaterial color="gray" />
            </mesh>
        </group>
    )
}

export default Building3;