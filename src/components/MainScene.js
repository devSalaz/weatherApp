import * as THREE from "three";

import CamParallax from "../utilities/CamParallax";
import Watch from "./Watch";

class MainScene {
  constructor() {
    this.bind();
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.clock = new THREE.Clock();
  }

  init(canvasContainer) {
    this.customCursor = document.querySelector(".custom-cursor-container");
    this.camera.position.set(0, 0, 15);
    this.scene.add(this.camera);
    CamParallax.init(this.camera);
    canvasContainer.appendChild(this.renderer.domElement);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    Watch.init(this.scene, this.camera, this.customCursor);

    window.addEventListener("resize", this.resizeCanvas);
    this.update();
  }

  resizeCanvas() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }

  update() {
    requestAnimationFrame(this.update.bind(this));
    this.time = this.clock.getElapsedTime();
    CamParallax.update();
    Watch.update();
    this.renderer.render(this.scene, this.camera);
  }

  onDarkModeChanged(isDarkMode) {
    Watch.changeMaterial(isDarkMode);
  }

  onWeatherChanged(currentWeather) {
    console.log(currentWeather);
    Watch.updateWatchHandles(currentWeather);
  }

  bind() {
    this.init = this.init.bind(this);
    this.update = this.update.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this);
  }
}

const _instance = new MainScene();
export default _instance;
