class Model {
  constructor(obj) {
    this.name = obj.meshName;
    this.file = obj.file;
    this.scene = obj.scene;
    this.groupObjects = obj.group;
    this.loadOnStart = obj.loadOnStart;
    this.particleIntensity = obj.particleIntensity;
    this.color1 = obj.color1;
    this.color2 = obj.color2;
    this.isAdd = false;
    this.currentIndex = 0;
    this.myIndex = obj.myIndex;
    this.numParticles = obj.numParticles;
    this.scaleDK = obj.scaleDK;
    this.scaleMB = obj.scaleMB;
    this.rotateOnEntry = obj.rotateOnEntry;
    this.loadingManager = obj.loadingManager;
    this.loader = new GLTFLoader(this.loadingManager);

    this.init();
  }

  init() {
    this.bind();
    this.loader.load(this.file, (response) => {
      this.material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true,
        blending: THREE.AdditiveBlending,
      });

      this.mesh = null;
      this.geometry = null;

      response.scene.traverse((child) => {
        if (child.name == this.name) {
          this.mesh = child;
          this.mesh.material = this.material;
          //console.log(this.mesh.scale);
        }
        if (child instanceof THREE.Mesh) {
          //console.log(child.name);
        }
      });

      // this.mesh.material = this.material;
      this.mesh.scale.set(2.4, 2.4, 2.4);

      //Particles Material
      this.particlesMaterial = new THREE.PointsMaterial({
        color: "red",
        size: 0.01,
      });

      //Geometry
      this.geometry = this.mesh.geometry;
      //console.log(this.geometry);

      //PArticles Geometry
      const sampler = new MeshSurfaceSampler(this.mesh).build();
      this.particlesGeometry = new THREE.BufferGeometry();
      const particlesPosition = new Float32Array(this.numParticles * 3);
      const particlesRandom = new Float32Array(this.numParticles * 3);

      for (let i = 0; i < this.numParticles; i++) {
        const newPosition = new THREE.Vector3();
        sampler.sample(newPosition);
        particlesPosition.set(
          [newPosition.x, newPosition.y, newPosition.z],
          i * 3
        );

        particlesRandom.set(
          [Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1],
          i * 3
        );
      }

      this.particlesGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(particlesPosition, 3)
      );

      this.particlesGeometry.setAttribute(
        "aRandom",
        new THREE.BufferAttribute(particlesRandom, 3)
      );

      this.particlesShader = new THREE.ShaderMaterial({
        uniforms: {
          uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
          uTime: { value: 0 },
          uIntensity: { value: this.particleIntensity },
          uColor1: { value: this.color1 },
          uColor2: { value: this.color2 },
          uScale: { value: 0 },
          uSMultiplier: { value: 13 },
        },
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        depthTest: false,
      });

      //Particles
      this.particles = new THREE.Points(
        this.particlesGeometry,
        this.particlesShader
      );

      this.particles.name = this.name;

      this.particles.scale.set(this.scaleDK, this.scaleDK, this.scaleDK);

      if (this.loadOnStart) {
        this.addModel();
      }
      window.addEventListener("resize", this.resizeCanvas);
    });
  }

  addModel() {
    const width = window.innerWidth;

    this.groupObjects.push(this.particles);
    this.scene.add(this.particles);
    if (!this.rotateOnEntry) {
      gsap.fromTo(
        this.particles.rotation,
        {
          y: Math.PI,
        },
        {
          y: 0,
          duration: 1.2,
          ease: "power3.out",
        }
      );
    }

    this.isAdd = true;
    this.resizeCanvas();
    gsap.fromTo(
      this.particlesShader.uniforms.uScale,
      { value: 0 },
      { value: 1, duration: 1.0, ease: "power3.out" }
    );
  }

  removeModel() {
    this.groupObjects.pop(); // ['Bob', 'Willy']
    if (this.isAdd) {
      gsap.to(this.particlesShader.uniforms.uScale, {
        value: 0,
        duration: 1.0,
        ease: "power3.out",
        onComplete: () => {
          // if (!this.isAdd) {

          // }

          if (this.currentIndex != this.myIndex) {
            this.scene.remove(this.particles);
            this.isAdd = false;
          }
        },
      });
    }
  }

  resizeCanvas() {
    const width = window.innerWidth;

    if (this.isAdd) {
      if (width < 1026) {
        this.particles.scale.set(this.scaleMB, this.scaleMB, this.scaleMB);
        this.particlesShader.uniforms.uSMultiplier.value = 9;
      } else {
        this.particles.scale.set(this.scaleDK, this.scaleDK, this.scaleDK);
        this.particlesShader.uniforms.uSMultiplier.value = 13;
      }
    }
  }

  update(time, index) {
    this.currentIndex = index;
    if (this.isAdd) {
      this.particlesShader.uniforms.uTime.value = time;
    }
  }

  bind() {
    this.resizeCanvas = this.resizeCanvas.bind(this);
  }
}

export default Model;
