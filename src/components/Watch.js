import * as THREE from "three";
import gsap from "gsap";
import * as dat from "dat.gui";
import { TimelineMax } from "gsap/gsap-core";

import ShaderVertex from "../assets/shaders/Watch/vertexShader";
import ShaderFragment from "../assets/shaders/Watch/fragmentShader";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import WatchModel from "../assets/models/alarm_clock8.glb";
import MatcapOrangeLava from "../assets/matcaps/orangeLava-matcap.jpg";
import MatcapGreenToon from "../assets/matcaps/lightGreenToon-matcap.jpg";
import MatcapGrey from "../assets/matcaps/greyMatcap.jpg";
import MatcapRed from "../assets/matcaps/redMetal-matcap.jpg";
import PerlinNoise from "../assets/shaders/utils/PerlinNoise";

class Watch {
  constructor() {
    this.bind();
  }

  init(scene, camera, customCursor, gltfLoader, textureLoader) {
    this.customCursor = customCursor;
    this.time = 0;
    this.scene = scene;
    this.camera = camera;
    this.watch = 0;
    this.isWatchLoaded = false;
    this.modelLoader = gltfLoader;
    this.textureLoader = textureLoader;
    this.gui = new dat.GUI();
    this.setupMaterials();
    this.loadModel();
    this.groupObjects = [];
    this.currentIntersect = null;
    this.mousePos = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();
    this.currentHour = 0;
    this.currentMinutes = 0;
    window.addEventListener("click", this.onClickHandler, false);
    window.addEventListener("mousemove", this.onMouseMoveHandler, false);
  }

  onMouseMoveHandler(event) {
    this.mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mousePos.y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.raycaster.setFromCamera(this.mousePos, this.camera);
    const intersects = this.raycaster.intersectObjects(this.groupObjects);
    if (intersects.length) {
      if (!this.currentIntersect) {
        this.customCursor.classList.add("pointer");
      }

      this.currentIntersect = intersects[0];
    } else {
      if (this.currentIntersect) {
        this.customCursor.classList.remove("pointer");
      }

      this.currentIntersect = null;
    }
  }
  onClickHandler(event) {
    if (this.isWatchLoaded) {
      this.mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
      this.mousePos.y = -(event.clientY / window.innerHeight) * 2 + 1;
      this.raycaster.setFromCamera(this.mousePos, this.camera);
      const intersects = this.raycaster.intersectObjects(this.groupObjects);

      if (intersects.length) {
        let intersectedName = intersects[0].object.name;
        this.customCursor.classList.add("pointer");

        if (intersectedName === "watch") {
          const t1 = new TimelineMax({ ease: "bounce" });
          t1.to(this.watch.scale, {
            duration: 0.2,
            x: 0.5,
            y: 1.8,
            z: 1.2,
          });
          t1.to(this.watch.scale, {
            duration: 0.2,
            x: 1,
            y: 1,
            z: 1,
          });
        } else if (intersectedName === "handleWatch1") {
          this.currentHour -= -Math.PI * 2;
          gsap.to(this.watchHandle1.rotation, {
            duration: 0.8,
            ease: "bounce",
            z: this.currentHour,
          });
        } else if (intersectedName === "handleWatch2") {
          this.currentMinutes -= -Math.PI * 2;
          gsap.to(this.watchHandle2.rotation, {
            duration: 0.8,
            ease: "bounce",
            z: this.currentMinutes,
          });
        }
      }
    }
  }

  showWatchAnim() {
    gsap.to(this.constWatchUniforms.uAlpha, {
      duration: 2,
      value: 1,
      ease: "linear",
      delay: 2,
    });

    gsap.to(this.constWatchUniforms.uAlphaHandle, {
      duration: 1,
      value: 1,
      ease: "linear",
      delay: 4,
    });
  }

  setupMaterials() {
    const textureLavaMatcap = this.textureLoader.load(MatcapOrangeLava);
    const textureToonGreenMatcap = this.textureLoader.load(MatcapGreenToon);
    const textureGreyMatcap = this.textureLoader.load(MatcapGrey);
    const textureRedMatcap = this.textureLoader.load(MatcapRed);

    this.constWatchUniforms = {
      uWatchValue: { value: 1 },
      uWatchHandleValue: { value: 1 },
      uTime: { value: 0 },
      uStep: { value: -2 },
      uChangeXWatch: { value: 6 },
      uChangeXBackground: { value: 1 },
      uAlpha: { value: -15 },
      uAlphaHandle: { value: 0 },
    };

    this.watchMaterial = new THREE.MeshMatcapMaterial({
      matcap: textureLavaMatcap,
      transparent: true,
      side: THREE.DoubleSide,
    });

    this.backgroundMaterial = new THREE.MeshMatcapMaterial({
      matcap: textureLavaMatcap,
    });

    this.watchMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uWatchValue = this.constWatchUniforms.uWatchValue;
      shader.uniforms.uMatcap1 = { value: textureLavaMatcap };
      shader.uniforms.uMatcap2 = { value: textureToonGreenMatcap };
      shader.uniforms.uTime = this.constWatchUniforms.uTime;
      shader.uniforms.uChangeX = this.constWatchUniforms.uChangeXWatch;
      shader.uniforms.uAlpha = this.constWatchUniforms.uAlpha;

      shader.vertexShader = shader.vertexShader.replace(
        "#include <common>",
        `#include <common>
        varying float vNoise;
        varying vec3 uPosition;
        uniform float uTime;
        uniform float uStep;
        
        ${PerlinNoise}
        `
      );

      shader.vertexShader = shader.vertexShader.replace(
        "vViewPosition = - mvPosition.xyz;",
        `vViewPosition = - mvPosition.xyz;
        uPosition = position.xyz;
        float noise =  1.5 * cnoise(vec3(position.x * 10.0,position.y, position.z + uTime/4.0));
  
        vNoise = clamp(vNoise, 0.0, 1.0);
        vNoise = smoothstep(uStep, uStep, noise);
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        `#include <common>
        varying vec3 uPosition;
        uniform float uWatchValue;
        uniform sampler2D uMatcap1;
        uniform sampler2D uMatcap2;
        uniform float uChangeX;
        uniform float uAlpha;
        varying float vNoise;
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "vec4 matcapColor = texture2D( matcap, uv );",
        `
        vec4 matcapColor1 = texture2D( uMatcap1, uv);
        vec4 matcapColor2 = texture2D( uMatcap2, uv);
        float posX = uPosition.x + (uChangeX);
        posX = clamp(posX, 0.0, 1.0);
        vec4 matcapFinal = mix(matcapColor1, matcapColor2, posX );
        matcapFinal.a = 0.5;
        vec4 matcapColor = matcapFinal;
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        `#include <output_fragment>
        gl_FragColor = vec4( outgoingLight, uPosition.y + uAlpha );
        `
      );
    };

    this.backgroundMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uWatchValue = this.constWatchUniforms.uWatchValue;
      shader.uniforms.uMatcap1 = { value: textureLavaMatcap };
      shader.uniforms.uMatcap2 = { value: textureToonGreenMatcap };
      shader.uniforms.uTime = this.constWatchUniforms.uTime;
      shader.uniforms.uStep = this.constWatchUniforms.uStep;
      shader.uniforms.uChangeX = this.constWatchUniforms.uChangeXBackground;

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        `#include <common>
        uniform float uWatchValue;
        uniform sampler2D uMatcap1;
        uniform sampler2D uMatcap2;
        uniform float uChangeX;
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "vec4 matcapColor = texture2D( matcap, uv );",
        `
        vec4 matcapColor1 = texture2D( uMatcap1, uv);
        vec4 matcapColor2 = texture2D( uMatcap2, uv);
        vec4 matcapFinal = mix(matcapColor1, matcapColor2, uChangeX );
        vec4 matcapColor = matcapFinal;
        `
      );
    };

    // this.gui
    //   .add(this.constWatchUniforms.uStep, "value")
    //   .min(-2)
    //   .max(2)
    //   .step(0.01)
    //   .name("step");

    // this.gui
    //   .add(this.constWatchUniforms.uAlpha, "value")
    //   .min(-15)
    //   .max(1)
    //   .step(0.01)
    //   .name("uChangeY");

    this.watchHandleMaterial = new THREE.MeshMatcapMaterial({
      matcap: textureLavaMatcap,
      transparent: true,
    });

    this.watchHandleMaterial.onBeforeCompile = (shader) => {
      shader.uniforms.uWatchValue = this.constWatchUniforms.uWatchHandleValue;
      shader.uniforms.uMatcap1 = { value: textureRedMatcap };
      shader.uniforms.uMatcap2 = { value: textureGreyMatcap };
      shader.uniforms.uAlpha = this.constWatchUniforms.uAlphaHandle;
      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <common>",
        `#include <common>
        uniform float uWatchValue;
        uniform sampler2D uMatcap1;
        uniform sampler2D uMatcap2;
        uniform float uAlpha;
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "vec4 matcapColor = texture2D( matcap, uv );",
        `
        vec4 matcapColor1 = texture2D( uMatcap1, uv);
        vec4 matcapColor2 = texture2D( uMatcap2, uv);
        vec4 matcapFinal = mix(matcapColor1, matcapColor2, uWatchValue);
        vec4 matcapColor = matcapFinal;
        `
      );

      shader.fragmentShader = shader.fragmentShader.replace(
        "#include <output_fragment>",
        `#include <output_fragment>
        gl_FragColor = vec4( outgoingLight, uAlpha );
        `
      );
    };
  }

  loadModel() {
    this.modelLoader.load(WatchModel, (glb) => {
      glb.scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.name == "watch") {
            this.watch = child;
            this.shaderMat = new THREE.ShaderMaterial({
              uniforms: {
                uTime: { value: 0 },
                uStep: { value: 0 },
                uChangeY: { value: 0 },
              },
              vertexShader: ShaderVertex,
              fragmentShader: ShaderFragment,
              wireframe: false,
            });
            //   // this.gui
            //   //   .add(this.shaderMat.uniforms.uStep, "value")
            //   //   .min(-1.2)
            //   //   .max(1.2)
            //   //   .step(0.01);
            //   // this.gui
            //   //   .add(this.shaderMat.uniforms.uChangeY, "value")
            //   //   .min(-5)
            //   //   .max(5)
            //   //   .step(0.01)
            //   //   .name("shaderUChangeY");
            child.material = this.watchMaterial;
            this.groupObjects.push(child);
          } else if (child.name == "handleWatch1") {
            this.watchHandle1 = child;
            child.material = this.watchHandleMaterial;
          } else if (child.name == "handleWatch2") {
            this.watchHandle2 = child;
            this.watchHandle2.material = this.watchHandleMaterial;
          } else if (child.name == "numbers") {
            this.numbers = child;
            this.numbers.material = this.watchHandleMaterial;
          } else if ((child.name = "background")) {
            this.background = child;
            this.background.material = this.backgroundMaterial;
          }
        }
      });
      this.gui.add(this.watch.position, "y", -20, 3, 0.01);
      this.gui.add(this.background.position, "y", -20, 3, 0.01);
      this.watch.position.y = -5;
      this.background.position.y = -5;
      this.watch.scale.normalize();
      this.watch.scale.set(1, 1, 1);
      this.background.scale.normalize();
      this.background.scale.set(1, 1, 1);
      this.scene.add(this.watch, this.background);
      this.isWatchLoaded = true;
    });
  }

  changeMaterial(isDarkMode) {
    if (this.isWatchLoaded) {
      if (isDarkMode) {
        gsap.to(this.constWatchUniforms.uChangeXWatch, {
          duration: 0.75,
          value: -6,
          ease: "easeOut",
        });
        gsap.to(this.constWatchUniforms.uChangeXBackground, {
          duration: 1,
          value: 0,
          ease: "easeOut",
        });
        gsap.to(this.constWatchUniforms.uWatchHandleValue, {
          duration: 1,
          value: 1,
        });
      } else {
        gsap.to(this.constWatchUniforms.uChangeXWatch, {
          duration: 0.75,
          value: 6,
          ease: "easeOut",
        });
        gsap.to(this.constWatchUniforms.uChangeXBackground, {
          duration: 1,
          value: 1,
          ease: "easeOut",
        });
        gsap.to(this.constWatchUniforms.uWatchHandleValue, {
          duration: 1,
          value: 0,
        });
      }
    }
  }

  updateWatchHandles(currentWeather) {
    if (this.isWatchLoaded) {
      const timezone = currentWeather.timezone;
      const dt = currentWeather.dt;
      const dateTime = new Date(dt * 1000);
      const toUtc = dateTime.getTime() + dateTime.getTimezoneOffset() * 60000;
      const currentLocalTime = toUtc + 1000 * timezone;
      const selectedDate = new Date(currentLocalTime);

      const hour = selectedDate
        .toLocaleString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .replace("am", "")
        .replace("pm", "");

      const [hourWatch, minutesWatch] = hour.split(":");
      this.currentHour = -(Math.PI * 2) * (hourWatch / 12);
      this.currentMinutes = -(Math.PI * 2) * (minutesWatch / 60);

      gsap.to(this.watchHandle2.rotation, {
        duration: 1,
        ease: "bounce",
        z: this.currentMinutes,
      });

      gsap.to(this.watchHandle1.rotation, {
        duration: 1,
        ease: "easeIn",
        z: this.currentHour,
      });
    }
  }

  update() {
    this.time += 0.05;
    if (this.watchMaterial) {
      this.constWatchUniforms.uTime.value = this.time / 1;
    }
    if (this.shaderMat) {
      this.shaderMat.uniforms.uTime.value = this.time / 2.0;
    }
  }

  bind() {
    this.onClickHandler = this.onClickHandler.bind(this);
    this.onMouseMoveHandler = this.onMouseMoveHandler.bind(this);
  }
}

const _instance = new Watch();
export default _instance;
