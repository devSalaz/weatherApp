export default `
varying vec3 vViewPosition;
varying float uTesteo;
uniform float uTime;
uniform float uStep;
varying float vDistancia;
varying vec2 vUv;

void main() 
{
  vUv = uv;
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  vDistancia =0.025 * distance(vec3(modelViewPosition.xyz), vec3(0.0,0.0, 0.0));
  vDistancia = 2.0 * distance(vec2(0.5, 0.5), vUv);
  vDistancia = step(0.4, vDistancia);
  vViewPosition = modelViewPosition.xyz;
  gl_Position = projectionMatrix * modelViewPosition; 
}

`;
