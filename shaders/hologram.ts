// ─── Hologram Vertex Shader ───────────────────────────────────────────────────
// Used for holographic card / UI elements
// Features: scanline sweep, edge glow, subtle vertex displacement

// Vertex shader
// varying vec2 vUv;
// varying vec3 vNormal;
// varying vec3 vPosition;
//
// void main() {
//   vUv = uv;
//   vNormal = normalize(normalMatrix * normal);
//   vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }

// Fragment shader
// uniform float uTime;
// uniform float uOpacity;
// uniform vec3 uColor;
// uniform float uScanlineSpeed;
// uniform float uScanlineCount;
// uniform float uGlitchIntensity;
//
// varying vec2 vUv;
// varying vec3 vNormal;
// varying vec3 vPosition;
//
// float random(vec2 st) {
//   return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
// }
//
// void main() {
//   // Scanlines
//   float scanline = sin(vUv.y * uScanlineCount + uTime * uScanlineSpeed) * 0.5 + 0.5;
//   scanline = smoothstep(0.3, 0.7, scanline);
//
//   // Fresnel / edge glow
//   vec3 viewDir = normalize(-vPosition);
//   float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);
//
//   // Glitch offset
//   float glitch = step(0.98, random(vec2(floor(uTime * 20.0), vUv.y * 10.0))) * uGlitchIntensity;
//
//   // Composite
//   vec3 color = uColor * (0.6 + 0.4 * scanline);
//   color += uColor * fresnel * 0.8;
//   color += vec3(glitch);
//
//   float alpha = uOpacity * (0.5 + fresnel * 0.5) * (0.8 + 0.2 * scanline);
//
//   gl_FragColor = vec4(color, alpha);
// }

// ─── Exported as strings for use with Three.js ShaderMaterial ─────────────────

export const hologramVertexShader = /* glsl */ `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const hologramFragmentShader = /* glsl */ `
uniform float uTime;
uniform float uOpacity;
uniform vec3 uColor;
uniform float uScanlineSpeed;
uniform float uScanlineCount;
uniform float uGlitchIntensity;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
  // Scanlines
  float scanline = sin(vUv.y * uScanlineCount + uTime * uScanlineSpeed) * 0.5 + 0.5;
  scanline = smoothstep(0.3, 0.7, scanline);

  // Fresnel / edge glow
  vec3 viewDir = normalize(-vPosition);
  float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.0);

  // Glitch offset
  float glitch = step(0.98, random(vec2(floor(uTime * 20.0), vUv.y * 10.0))) * uGlitchIntensity;

  // Composite
  vec3 color = uColor * (0.6 + 0.4 * scanline);
  color += uColor * fresnel * 0.8;
  color += vec3(glitch);

  float alpha = uOpacity * (0.5 + fresnel * 0.5) * (0.8 + 0.2 * scanline);

  gl_FragColor = vec4(color, alpha);
}
`;
