'use client';

export default function TheatreLights() {
  return (
    <group>
      {/* Main overhead warm light */}
      <spotLight
        position={[0, 8, 2]}
        angle={0.5}
        penumbra={0.8}
        intensity={0.6}
        color="#ffccaa"
        castShadow
      />

      {/* Screen backlight */}
      <pointLight position={[0, 4, -6]} intensity={0.3} color="#00f5ff" distance={10} />

      {/* Side accent lights */}
      <pointLight position={[-10, 3, -3]} intensity={0.15} color="#ff2d55" distance={12} />
      <pointLight position={[10, 3, -3]} intensity={0.15} color="#8b5cf6" distance={12} />

      {/* Ambient fill */}
      <ambientLight intensity={0.08} color="#1a1a2e" />
    </group>
  );
}
