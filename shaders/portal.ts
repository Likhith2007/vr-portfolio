// ─── Portal Shader ────────────────────────────────────────────────────────────
// Manga/Anime Dungeon Gate Swirling Plasma and Lightning Effect

export const portalVertexShader = /* glsl */ `
varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vUv = uv;
  vPosition = position;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const portalFragmentShader = /* glsl */ `
uniform float uTime;
uniform vec3 uColorInner;
uniform vec3 uColorOuter;
uniform float uSpeed;
uniform float uIntensity;

varying vec2 vUv;
varying vec3 vPosition;

#define PI 3.14159265359

// Random hash function
vec2 hash(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

// Simplex noise
float noise(vec2 p) {
    const float K1 = 0.366025404; // (sqrt(3)-1)/2;
    const float K2 = 0.211324865; // (3-sqrt(3))/6;
    vec2 i = floor(p + (p.x + p.y) * K1);
    vec2 a = p - i + (i.x + i.y) * K2;
    vec2 o = (a.x > a.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec2 b = a - o + K2;
    vec2 c = a - 1.0 + 2.0 * K2;
    vec3 h = max(0.5 - vec3(dot(a, a), dot(b, b), dot(c, c)), 0.0);
    vec3 n = h * h * h * h * vec3(dot(a, hash(i + 0.0)), dot(b, hash(i + o)), dot(c, hash(i + 1.0)));
    return dot(n, vec3(70.0));
}

// Fractal Brownian Motion for swirling clouds
float fbm(vec2 p) {
  float f = 0.0;
  float amp = 0.5;
  for(int i = 0; i < 4; i++) {
    f += amp * noise(p);
    p *= 2.0;
    amp *= 0.5;
  }
  return f;
}

// Sharp electric lightning pattern
float lightning(vec2 p) {
    float f = 0.0;
    float amp = 0.5;
    for(int i = 0; i < 3; i++) {
        f += amp * abs(noise(p)); // abs() creates sharp ridges
        p *= 2.5;
        amp *= 0.4;
    }
    return 1.0 - f; // Invert so ridges become bright lightning streaks
}

void main() {
  vec2 uv = vUv - 0.5;
  float dist = length(uv);
  
  // Create a swirling vortex coordinate system
  float angle = atan(uv.y, uv.x);
  
  // Swirl factor increases towards the center
  float swirlSpeed = uTime * uSpeed * 2.0;
  float swirl = angle + (1.5 / (dist + 0.1)) - swirlSpeed;
  
  // Calculate polar coordinates for noise mapping
  vec2 polarUv = vec2(cos(swirl) * dist, sin(swirl) * dist);
  
  // 1. Swirling Plasma Core
  float plasma = fbm(polarUv * 8.0 - uTime * 0.5);
  
  // 2. Electric Lightning Arcs (crank up the contrast)
  float sparks = lightning(polarUv * 15.0 + uTime * 3.0);
  sparks = pow(sparks, 5.0) * 2.0; // Make them sharp and bright
  
  // 3. Central Black Hole / Dungeon Void
  float coreVoid = smoothstep(0.0, 0.25, dist);
  
  // 4. Outer Ring Glow (fades at the absolute edge)
  float edgeFade = smoothstep(0.5, 0.45, dist);
  
  // Combine visual layers
  vec3 baseColor = mix(uColorOuter, uColorInner, plasma);
  
  // Add intense lightning sparks
  vec3 finalColor = baseColor * coreVoid + (vec3(1.0, 1.0, 1.0) * sparks * coreVoid);
  
  // Boost overall intensity
  finalColor *= uIntensity * 1.5;
  
  // Add a glowing rim
  float rim = smoothstep(0.4, 0.45, dist) - smoothstep(0.45, 0.5, dist);
  finalColor += uColorInner * rim * 3.0;

  // Calculate opacity
  // Very transparent in the dead center, opaque plasma, fades at edges
  float alpha = (plasma * 0.8 + sparks + rim) * edgeFade * coreVoid;
  
  // Ensure the center is completely black/invisible to look like an endless hole
  alpha *= smoothstep(0.05, 0.15, dist);
  
  gl_FragColor = vec4(finalColor, alpha);
}
`;
