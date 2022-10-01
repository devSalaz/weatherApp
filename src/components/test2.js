import * as THREE from "three";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { DotScreenPass } from "three/examples/jsm/postprocessing/DotScreenPass.js";
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader.js";
import { UnrealBloomPass } from "../TransparentFixed";
import { SMAAPass } from "three/examples/jsm/postprocessing/SMAAPass.js";

import CamParallax from "./CamParallax";
import Model from "./Model";
import GreyMatter from "../assets/models/greyMatter.glb";
import MrMeesek from "../assets/models/mrMeesek.glb";
import Monster from "../assets/models/monster.glb";
import Psyduck from "../assets/models/psyduck.glb";
import Victrebeel from "../assets/models/victreebel.glb";
import KameHouse from "../assets/models/kameHouse.glb";

class MainScene {
  constructor() {
    this.bind();
    this.camera = 0;
    this.scene = 0;
    this.renderer = 0;
    this.clock = new THREE.Clock();
    this.isPlane = false;
    this.isLoaded = false;
    this.index = 0;
  }

  init(container, loadContainer, loadBar) {
    //MAIN SCENE INSTANCE
    this.scene = new THREE.Scene();

    this.loadingManager = new THREE.LoadingManager(
      //Loaded
      () => {
        window.setTimeout(() => {
          loadContainer.classList.add("loaded");
        }, 1500);
      },

      //Progress
      (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded / itemsTotal;
        loadBar.style.transform = `scaleX(${progressRatio})`;
      }
    );

    //CAMERA AND ORBIT CONTROLLER
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    this.camera.position.set(0, 0, 5);
    CamParallax.init(this.camera);

    //CREATING GROUP OF HOVER OBJECTS
    this.mousePos = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.groupObjects = [];
    this.currentIntersect = null;

    window.addEventListener("mousemove", (event) => {
      this.mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mousePos.y = -(event.clientY / window.innerHeight) * 2 + 1;
      //Raycaster Code
      this.raycaster.setFromCamera(this.mousePos, this.camera);
      const intersects = this.raycaster.intersectObjects(this.groupObjects);

      if (intersects.length) {
        document.body.style.cursor = "pointer";
      } else {
        document.body.style.cursor = "auto";
      }
    });

    container.addEventListener("click", (event) => {
      this.mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mousePos.y = -(event.clientY / window.innerHeight) * 2 + 1;
      //Raycaster Code
      this.raycaster.setFromCamera(this.mousePos, this.camera);
      const intersects = this.raycaster.intersectObjects(this.groupObjects);

      if (intersects.length) {
        let intersectedName = intersects[0].object.name;

        //console.log(intersectedName);

        if (intersectedName === "GM_Body") {
          window
            .open(
              "https://sketchfab.com/3d-models/materia-gris-c3f551011aaf4e7fb36a3d4e7912b5d3",
              "_blank"
            )
            .focus();
        } else if (intersectedName === "Kame_House") {
          window
            .open(
              "https://sketchfab.com/3d-models/kame-house-f2ae2e0f7827499cb64b40f267a82cd5",
              "_blank"
            )
            .focus();
        } else if (intersectedName === "Meesek_Body") {
          window
            .open(
              "https://sketchfab.com/3d-models/mr-meeseks-356fca081a514508bf8d344ec1515d3f",
              "_blank"
            )
            .focus();
        } else if (intersectedName === "Monster_Body") {
          window
            .open(
              "https://sketchfab.com/3d-models/cartoon-monster-677110104468442f9f4ba23b3469eec0",
              "_blank"
            )
            .focus();
        } else if (intersectedName === "Psy_Body") {
          window
            .open(
              "https://sketchfab.com/3d-models/psyduck-6bd718edee504a26922000c546a455a9",
              "_blank"
            )
            .focus();
        } else if (intersectedName === "VC_Body") {
          window
            .open(
              "https://sketchfab.com/3d-models/victreebel-1164197623f84bb4ad5004a5911722f8",
              "_blank"
            )
            .focus();
        }
      }
    });

    //RENDERER SETUP
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.renderer.physicallyCorrectLights = true;
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ReinhardToneMapping;
    this.renderer.toneMappingExposure = 1.5;
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.renderer.setClearColor(0x000000, 0.0);

    /**
     * Post processing
     */
    let RenderTargetClass = null;

    if (
      this.renderer.getPixelRatio() === 1 &&
      this.renderer.capabilities.isWebGL2
    ) {
      RenderTargetClass = THREE.WebGLMultisampleRenderTarget;
      //console.log("Using WebGLMultisampleRenderTarget");
    } else {
      RenderTargetClass = THREE.WebGLRenderTarget;
      //console.log("Using WebGLRenderTarget");
    }

    this.renderTarget = new RenderTargetClass(800, 600, {
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
      encoding: THREE.sRGBEncoding,
      alpha: true,
    });

    // Effect composer
    this.effectComposer = new EffectComposer(this.renderer, this.renderTarget);
    this.effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.effectComposer.setSize(window.innerWidth, window.innerHeight);

    // Render pass
    this.renderPass = new RenderPass(this.scene, this.camera);
    this.effectComposer.addPass(this.renderPass);

    this.unrealBloomPass = new UnrealBloomPass();
    this.unrealBloomPass.enabled = true;
    this.effectComposer.addPass(this.unrealBloomPass);

    if (window.innerWidth < 768) {
      this.unrealBloomPass.strength = 0.2;
    } else {
      this.unrealBloomPass.strength = 2.0;
    }
    this.unrealBloomPass.radius = 0.6;
    this.unrealBloomPass.threshold = 0.0;

    this.material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      wireframe: true,
    });
    this.geometry = new THREE.BoxGeometry(1, 1, 1, 20, 20, 20);

    this.plane = new THREE.Mesh(this.geometry, this.material);

    //this.scene.add(this.plane);
    this.isPlane = true;

    //RENDER LOOP AND WINDOW SIZE UPDATER SETUP
    window.addEventListener("resize", this.resizeCanvas);
    this.addObjects();
    this.time = 0;

    container.appendChild(this.renderer.domElement);
    this.update();
  }

  testFunction() {
    if (this.isPlane) {
      //console.log(this.plane.rotation.y);
    }
  }

  addObjects() {
    this.greyMatter = new Model({
      meshName: "GM_Body",
      file: GreyMatter,
      scene: this.scene,
      group: this.groupObjects,
      loadOnStart: true,
      particleIntensity: 0.025,
      color1: new THREE.Color("#00f328"),
      color2: new THREE.Color("#678293"),
      myIndex: 0,
      numParticles: 160000,
      scaleDK: 2.2,
      scaleMB: 1.5,
      loadingManager: this.loadingManager,
    });

    this.kameHouse = new Model({
      meshName: "Kame_House",
      file: KameHouse,
      scene: this.scene,
      group: this.groupObjects,
      particleIntensity: 0.025,
      color1: new THREE.Color("#0071f9"),
      color2: new THREE.Color("#efc5e9"),
      myIndex: 1,
      numParticles: 400000,
      scaleDK: 1.9,
      scaleMB: 1.2,
      rotateOnEntry: true,
      loadingManager: this.loadingManager,
    });

    this.mrMeesek = new Model({
      meshName: "Meesek_Body",
      file: MrMeesek,
      scene: this.scene,
      group: this.groupObjects,
      particleIntensity: 0.015,
      color1: new THREE.Color("#3c02e1"),
      color2: new THREE.Color("#00a2ab"),
      myIndex: 2,
      numParticles: 140000,
      scaleDK: 2.2,
      scaleMB: 1.5,
      loadingManager: this.loadingManager,
    });

    this.monster = new Model({
      meshName: "Monster_Body",
      file: Monster,
      scene: this.scene,
      group: this.groupObjects,
      particleIntensity: 0.025,
      color1: new THREE.Color("#FF69B4"),
      color2: new THREE.Color("#00d4b8"),
      myIndex: 3,
      numParticles: 160000,
      scaleDK: 2.2,
      scaleMB: 1.4,
      loadingManager: this.loadingManager,
    });

    this.psyduck = new Model({
      meshName: "Psy_Body",
      file: Psyduck,
      scene: this.scene,
      group: this.groupObjects,
      particleIntensity: 0.035,
      color1: new THREE.Color("#ad00bd"),
      color2: new THREE.Color("#fff23a"),
      myIndex: 4,
      numParticles: 160000,
      scaleDK: 2.2,
      scaleMB: 1.4,
      loadingManager: this.loadingManager,
    });

    this.victrebeel = new Model({
      meshName: "VC_Body",
      file: Victrebeel,
      scene: this.scene,
      group: this.groupObjects,
      particleIntensity: 0.05,
      color1: new THREE.Color("#499403"),
      color2: new THREE.Color("#f1e900"),
      myIndex: 5,
      numParticles: 160000,
      scaleDK: 2.2,
      scaleMB: 1.3,
      loadingManager: this.loadingManager,
    });
    this.isLoaded = true;
  }

  changeSlider(index) {
    this.index = index;

    if (this.isLoaded) {
      switch (index) {
        case 0:
          if (window.innerWidth < 768) {
            this.unrealBloomPass.strength = 0.2;
          } else {
            this.unrealBloomPass.strength = 2.0;
          }
          this.unrealBloomPass.radius = 0.6;
          this.kameHouse.removeModel();
          this.mrMeesek.removeModel();
          this.monster.removeModel();
          this.psyduck.removeModel();
          this.victrebeel.removeModel();
          this.greyMatter.addModel();
          break;
        case 1:
          if (window.innerWidth < 768) {
            this.unrealBloomPass.strength = 0.2;
          } else {
            this.unrealBloomPass.strength = 2.0;
          }
          this.unrealBloomPass.radius = 0.6;
          this.greyMatter.removeModel();
          this.mrMeesek.removeModel();
          this.monster.removeModel();
          this.psyduck.removeModel();
          this.victrebeel.removeModel();
          this.kameHouse.addModel();
          break;
        case 2:
          if (window.innerWidth < 768) {
            this.unrealBloomPass.strength = 0.2;
          } else {
            this.unrealBloomPass.strength = 2.0;
          }
          this.unrealBloomPass.radius = 0.6;
          this.greyMatter.removeModel();
          this.kameHouse.removeModel();
          this.monster.removeModel();
          this.psyduck.removeModel();
          this.victrebeel.removeModel();
          this.mrMeesek.addModel();
          break;

        case 3:
          if (window.innerWidth < 768) {
            this.unrealBloomPass.strength = 0.2;
          } else {
            this.unrealBloomPass.strength = 2.3;
          }
          this.unrealBloomPass.radius = 0.6;
          this.greyMatter.removeModel();
          this.kameHouse.removeModel();
          this.mrMeesek.removeModel();
          this.psyduck.removeModel();
          this.victrebeel.removeModel();
          this.monster.addModel();
          break;

        case 4:
          if (window.innerWidth < 768) {
            this.unrealBloomPass.strength = 0.35;
          } else {
            this.unrealBloomPass.strength = 3.5;
          }
          this.unrealBloomPass.radius = 0.1;
          this.greyMatter.removeModel();
          this.kameHouse.removeModel();
          this.mrMeesek.removeModel();
          this.monster.removeModel();
          this.victrebeel.removeModel();
          this.psyduck.addModel();
          break;

        case 5:
          if (window.innerWidth < 768) {
            this.unrealBloomPass.strength = 0.2;
          } else {
            this.unrealBloomPass.strength = 3.5;
          }
          this.unrealBloomPass.radius = 0.1;
          this.greyMatter.removeModel();
          this.kameHouse.removeModel();
          this.mrMeesek.removeModel();
          this.monster.removeModel();
          this.psyduck.removeModel();
          this.victrebeel.addModel();
          break;
        default:
          //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
          break;
      }
    }
  }

  update() {
    requestAnimationFrame(this.update.bind(this));
    this.time = this.clock.getElapsedTime();
    this.greyMatter.update(this.time, this.index);
    this.kameHouse.update(this.time, this.index);
    this.mrMeesek.update(this.time, this.index);
    this.monster.update(this.time, this.index);
    this.psyduck.update(this.time, this.index);
    this.victrebeel.update(this.time, this.index);
    CamParallax.update();
    //this.renderer.render(this.scene, this.camera);
    this.effectComposer.render();
  }

  resizeCanvas() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.effectComposer.setSize(window.innerWidth, window.innerHeight);
  }

  bind() {
    this.resizeCanvas = this.resizeCanvas.bind(this);
    this.update = this.update.bind(this);
    this.init = this.init.bind(this);
    this.testFunction = this.testFunction.bind(this);
    this.addObjects = this.addObjects.bind(this);
  }
}

const _instance = new MainScene();
export default _instance;
