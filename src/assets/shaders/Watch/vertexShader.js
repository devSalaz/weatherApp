export default `
varying vec3 vViewPosition;
varying float uTesteo;
uniform float uTime;
uniform float uStep;
varying float vDistancia;

void main() 
{

  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
  vDistancia =0.025 * distance(vec3(modelViewPosition.xyz), vec3(0.0,0.0, 0.0));
  vDistancia = step(0.4, vDistancia);
  vViewPosition = modelViewPosition.xyz;
  gl_Position = projectionMatrix * modelViewPosition; 
}

`;
