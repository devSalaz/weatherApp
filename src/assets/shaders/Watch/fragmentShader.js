export default `
  uniform sampler2D matcap;
  varying vec3 vViewPosition;
  varying float uTesteo;
  uniform float uChangeY;
  varying float vDistancia;

  void main() {
  
    vec3 redColor = vec3(1.0, 0.0, 0.0);
    vec3 blueColor = vec3(0.0, 0.0, 1.0);
    float changeY = vViewPosition.y + (uChangeY);
    vec3 finalColor = mix(redColor, blueColor, vDistancia);
    gl_FragColor = vec4(finalColor , 1.0);
}
`;
