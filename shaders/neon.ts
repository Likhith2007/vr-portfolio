// ─── Neon Tube Shader ─────────────────────────────────────────────────────────
// Animated neon glow with intensity pulsation

export const neonVertexShader = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPos;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vWorldPos = (modelMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const neonFragmentShader = /* glsl */ `
uniform float uTime;
uniform vec3 uColor;
uniform float uIntensity;
uniform float uFlicker;
uniform float uPulseSpeed;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPos;

float random(float seed) {
  return fract(sin(seed * 78.233) * 43758.5453);
}

void main() {
  // Base neon glow
  float glow = uIntensity;

  // Pulse
  glow *= 0.85 + 0.15 * sin(uTime * uPulseSpeed);

  // Flicker (random on/off)
  float flickerVal = step(uFlicker, random(floor(uTime * 30.0)));
  glow *= mix(1.0, flickerVal, uFlicker);

  // Edge intensity (fresnel-like for tubes)
  float edgeFade = smoothstep(0.0, 0.3, vUv.x) * smoothstep(1.0, 0.7, vUv.x);
  glow *= 0.6 + 0.4 * edgeFade;

  vec3 color = uColor * glow;

  // Add white-hot center
  float center = smoothstep(0.4, 0.5, vUv.x) * smoothstep(0.6, 0.5, vUv.x);
  color += vec3(1.0) * center * glow * 0.5;

  gl_FragColor = vec4(color, glow);
}
`;
