'use client';

interface SpotLightsProps {
  positions?: [number, number, number][];
  color?: string;
  intensity?: number;
}

export default function SpotLights({
  positions = [
    [-5, 8, -5],
    [5, 8, -5],
    [0, 10, 0],
  ],
  color = '#ffffff',
  intensity = 1,
}: SpotLightsProps) {
  return (
    <group>
      {positions.map((pos, i) => (
        <spotLight
          key={i}
          position={pos}
          angle={0.4}
          penumbra={0.6}
          intensity={intensity}
          color={color}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
      ))}
    </group>
  );
}
