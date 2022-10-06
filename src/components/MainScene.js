import * as THREE from "three";

import CamParallax from "../utilities/CamParallax";
import Watch from "./Watch";
import WeatherBehavior from "../components/WeatherBehaviour";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

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

  init(canvasContainer, setIsThreeLoaded) {
    this.setIsThreeLoaded = setIsThreeLoaded;
    console.log(this.setIsThreeLoaded);
    this.customCursor = document.querySelector(".custom-cursor-container");
    this.camera.position.set(0, 0, 15);
    this.scene.add(this.camera);
    canvasContainer.appendChild(this.renderer.domElement);
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    CamParallax.init(this.camera);

    window.addEventListener("resize", this.resizeCanvas);
    this.addingElementsToScene();
    this.update();
  }

  addingElementsToScene() {
    const loadingManager = new THREE.LoadingManager(
      // Loaded
      () => {
        window.setTimeout(() => {
          this.setIsThreeLoaded(true);
        }, 5000);
      },
      // Progress
      () => {}
    );
    const gltfLoader = new GLTFLoader(loadingManager);
    const textureLoader = new THREE.TextureLoader(loadingManager);
    Watch.init(
      this.scene,
      this.camera,
      this.customCursor,
      gltfLoader,
      textureLoader
    );
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
    Watch.updateWatchHandles(currentWeather);
    WeatherBehavior.onWeatherChanged(currentWeather);
  }

  bind() {
    this.init = this.init.bind(this);
    this.onWeatherChanged = this.onWeatherChanged.bind(this);
    this.addingElementsToScene = this.addingElementsToScene.bind(this);
    this.onDarkModeChanged = this.onDarkModeChanged.bind(this);
    this.update = this.update.bind(this);
    this.resizeCanvas = this.resizeCanvas.bind(this);
  }
}

const _instance = new MainScene();
export default _instance;
