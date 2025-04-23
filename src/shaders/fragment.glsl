uniform float uTime;
varying vec2 vUv;
varying vec3 vColor;
varying vec3 vWorldPosition;
    
void main() {
  // Reconstruye la normal a partir de gl_PointCoord asumiendo un sprite circular
  vec2 centered = gl_PointCoord - vec2(0.5);
  float r = length(centered);
  if(r > 0.5) discard; // Limita el punto a forma circular
  gl_FragColor = vec4(vColor, 1.0);
}