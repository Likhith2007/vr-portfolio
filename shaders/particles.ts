// ─── GPU Particle System Shaders ──────────────────────────────────────────────
// Used for dust, fireflies, sparks, and other particle effects

export const particleVertexShader = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uSpeed;

attribute float aScale;
attribute float aPhase;
attribute vec3 aVelocity;

varying float vAlpha;
varying float vPhase;

void main() {
  vPhase = aPhase;

  // Animate position
  vec3 pos = position;
  pos += aVelocity * uTime * uSpeed;

  // Sine wave motion (organic floating)
  pos.y += sin(uTime * 0.5 + aPhase * 6.28) * 0.3;
  pos.x += cos(uTime * 0.3 + aPhase * 3.14) * 0.15;

  // Distance-based fade
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  float dist = -mvPosition.z;
  vAlpha = smoothstep(50.0, 5.0, dist) * smoothstep(0.0, 2.0, dist);

  // Size attenuation
  gl_PointSize = uSize * aScale * (200.0 / dist);
  gl_Position = projectionMatrix * mvPosition;
}
`;

export const particleFragmentShader = /* glsl */ `
uniform vec3 uColor;
uniform float uOpacity;
uniform float uTime;

varying float vAlpha;
varying float vPhase;

void main() {
  // Circular particle shape
  vec2 center = gl_PointCoord - 0.5;
  float dist = length(center);
  if (dist > 0.5) discard;

  // Soft edge
  float alpha = smoothstep(0.5, 0.1, dist);

  // Twinkle
  float twinkle = 0.7 + 0.3 * sin(uTime * 3.0 + vPhase * 6.28);

  alpha *= vAlpha * uOpacity * twinkle;

  gl_FragColor = vec4(uColor, alpha);
}
`;
