    uniform float uTime;
    uniform float pointSize;
    uniform float uA;
    uniform float uB;
    uniform float uC;
    uniform float uD;
    uniform float uE;
    uniform float uF;
    attribute vec3 aColor;
    varying vec3 vColor;
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    
    void main() {
      vColor = aColor;
      vUv = position.xy;
      
      vec3 pos = position.xyz;
      for (int i = 0; i < 10; i++) {
          float x_new = sin(uA * pos.y + uTime * 0.1) + uC * cos(pos.x + uTime * 0.1);
          float y_new = sin(uB * pos.x + uTime * 0.1) + uD * cos(pos.y + uTime * 0.1);
          float z_new = sin(uE * pos.x + uTime * 0.1) + uF * cos(pos.y + uTime * 0.1);
          pos = vec3(x_new, y_new, z_new);
      }
      
      // Calcula la posición en el mundo para efectos de reflexión/refracción
      vec4 worldPos = modelMatrix * vec4(pos, 1.0);
      vWorldPosition = worldPos.xyz;
      
      //gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * modelViewMatrix * vec4(normalize(pos)*2.0, 1.0);
      gl_PointSize = pointSize;
    }