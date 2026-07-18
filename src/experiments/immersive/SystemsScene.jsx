import { useEffect, useRef } from "react";

const clamp = (value, min = 0, max = 1) =>
  Math.min(Math.max(value, min), max);

const seededRandom = (seed) => {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
};

const createSkillIconCanvas = (glyph, fontFamily, accent) => {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const context = canvas.getContext("2d");

  context.clearRect(0, 0, 256, 256);
  context.font = `${fontFamily === "brand" ? "400" : "900"} 142px "${
    fontFamily === "brand"
      ? "Font Awesome 7 Brands"
      : "Font Awesome 7 Free"
  }"`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.shadowColor = accent;
  context.shadowBlur = 34;
  context.fillStyle = accent;
  context.fillText(glyph, 128, 132);
  context.shadowBlur = 12;
  context.fillStyle = "#ffffff";
  context.fillText(glyph, 128, 132);

  return canvas;
};

const SystemsScene = ({ onReady }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    let cancelled = false;
    let frameId;
    let renderer;
    let resizeHandler;
    let pointerHandler;
    let visibilityHandler;
    let motionHandler;
    let motionPreference;
    let observer;
    let readyNotified = false;
    const disposableGeometries = [];
    const disposableMaterials = [];
    const disposableTextures = [];
    const skillLabelMaterials = [];

    const notifyReady = () => {
      if (readyNotified || cancelled) return;
      readyNotified = true;
      onReady?.();
    };

    const setupScene = async () => {
      const THREE = await import("three");
      await Promise.allSettled([
        document.fonts.load('400 142px "Font Awesome 7 Brands"'),
        document.fonts.load('900 142px "Font Awesome 7 Free"'),
      ]);
      if (cancelled) return;

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x050505, 0.047);

      const camera = new THREE.PerspectiveCamera(
        43,
        mount.clientWidth / mount.clientHeight,
        0.1,
        90,
      );
      camera.position.set(0, 1.6, 13.5);

      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.domElement.setAttribute("aria-hidden", "true");
      mount.appendChild(renderer.domElement);

      const world = new THREE.Group();
      scene.add(world);

      const ambientLight = new THREE.HemisphereLight(0x809cff, 0x180914, 1.7);
      scene.add(ambientLight);

      const pinkLight = new THREE.PointLight(0xff62aa, 54, 32, 1.8);
      pinkLight.position.set(-3.5, 4.5, 7);
      scene.add(pinkLight);

      const blueLight = new THREE.PointLight(0x4c65f7, 48, 30, 1.8);
      blueLight.position.set(3, 2, -6);
      scene.add(blueLight);

      const amberLight = new THREE.PointLight(0xffb449, 36, 24, 2);
      amberLight.position.set(0, 5, -15);
      scene.add(amberLight);

      const floorGeometry = new THREE.PlaneGeometry(14, 52, 12, 48);
      const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x09090b,
        roughness: 0.72,
        metalness: 0.28,
        wireframe: true,
        transparent: true,
        opacity: 0.2,
      });
      disposableGeometries.push(floorGeometry);
      disposableMaterials.push(floorMaterial);
      const floor = new THREE.Mesh(floorGeometry, floorMaterial);
      floor.rotation.x = -Math.PI / 2;
      floor.position.set(0, -0.8, -8);
      world.add(floor);

      const endpointGeometry = new THREE.BoxGeometry(0.88, 0.62, 0.12);
      const endpointMaterial = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        roughness: 0.34,
        metalness: 0.42,
      });
      disposableGeometries.push(endpointGeometry);
      disposableMaterials.push(endpointMaterial);

      const endpointCount = 108;
      const endpoints = new THREE.InstancedMesh(
        endpointGeometry,
        endpointMaterial,
        endpointCount,
      );
      const palette = [
        new THREE.Color(0xff62aa),
        new THREE.Color(0xb25cfa),
        new THREE.Color(0x4c65f7),
        new THREE.Color(0x80adff),
        new THREE.Color(0xffb449),
      ];
      const dummy = new THREE.Object3D();

      for (let index = 0; index < endpointCount; index += 1) {
        const side = index % 2 === 0 ? -1 : 1;
        const localIndex = Math.floor(index / 2);
        const row = localIndex % 6;
        const bay = Math.floor(localIndex / 6);
        const random = seededRandom(index + 9);

        dummy.position.set(
          side * (2.7 + row * 0.5),
          0.25 + (row % 3) * 1.05 + random * 0.24,
          7 - bay * 2.85 - row * 0.12,
        );
        dummy.rotation.set(
          (random - 0.5) * 0.08,
          side * (-0.38 - row * 0.035),
          side * (random - 0.5) * 0.08,
        );
        dummy.scale.set(0.72 + random * 0.6, 0.8 + random * 0.42, 1);
        dummy.updateMatrix();
        endpoints.setMatrixAt(index, dummy.matrix);
        endpoints.setColorAt(index, palette[index % palette.length]);
      }
      endpoints.instanceMatrix.needsUpdate = true;
      endpoints.instanceColor.needsUpdate = true;
      world.add(endpoints);

      const skillNodes = [
        ["HTML5", "\uf13b", "brand"],
        ["CSS3", "\uf38b", "brand"],
        ["JavaScript", "\uf3b8", "brand"],
        ["React", "\uf41b", "brand"],
        ["GitHub", "\uf09b", "brand"],
        ["Azure", "\uf409", "brand"],
        ["Autopilot", "\uf0ee", "solid"],
        ["Windows 11", "\uf17a", "brand"],
        ["Active Directory", "\uf509", "solid"],
        ["Intune", "\uf3ed", "solid"],
        ["Microsoft 365", "\uf658", "solid"],
        ["ServiceNow", "\uf145", "solid"],
        ["Networking", "\uf6ff", "solid"],
        ["Teams Rooms", "\uf03d", "solid"],
      ];
      const nodes = new THREE.Group();
      world.add(nodes);
      const nodeGeometry = new THREE.IcosahedronGeometry(0.36, 3);
      const nodeShellGeometry = new THREE.IcosahedronGeometry(0.43, 2);
      const nodeAtmosphereGeometry = new THREE.SphereGeometry(0.48, 24, 18);
      const nodeOrbitGeometry = new THREE.TorusGeometry(0.52, 0.012, 8, 72);
      const nodeSatelliteGeometry = new THREE.SphereGeometry(0.045, 12, 8);
      const iconBadgeGeometry = new THREE.CylinderGeometry(
        0.215,
        0.215,
        0.055,
        36,
      );
      const iconRimGeometry = new THREE.TorusGeometry(0.22, 0.018, 10, 48);
      const iconPlaneGeometry = new THREE.PlaneGeometry(0.32, 0.32);
      disposableGeometries.push(
        nodeGeometry,
        nodeShellGeometry,
        nodeAtmosphereGeometry,
        nodeOrbitGeometry,
        nodeSatelliteGeometry,
        iconBadgeGeometry,
        iconRimGeometry,
        iconPlaneGeometry,
      );

      const createSkillLabel = (skill, color) => {
        const canvas = document.createElement("canvas");
        canvas.width = skill.length > 12 ? 896 : 640;
        canvas.height = 192;
        const context = canvas.getContext("2d");
        const accent = `#${color.getHexString()}`;

        context.shadowColor = accent;
        context.shadowBlur = 34;
        context.fillStyle = accent;
        context.fillRect(canvas.width * 0.34, 145, canvas.width * 0.32, 3);
        context.shadowBlur = 24;
        context.fillStyle = "#ffffff";
        context.font = "800 54px Arial, sans-serif";
        context.textAlign = "center";
        context.textBaseline = "middle";
        context.fillText(skill, canvas.width / 2, 92);

        const texture = new THREE.CanvasTexture(canvas);
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        disposableTextures.push(texture);

        const material = new THREE.SpriteMaterial({
          map: texture,
          transparent: true,
          opacity: 0.08,
          depthTest: false,
          depthWrite: false,
        });
        disposableMaterials.push(material);
        skillLabelMaterials.push(material);
        const label = new THREE.Sprite(material);
        const labelWidth = 1.05 + skill.length * 0.052;
        label.scale.set(labelWidth, 0.38, 1);
        label.position.set(0, -0.68, 0.26);
        label.renderOrder = 6;
        return label;
      };

      skillNodes.forEach(([skill, icon, iconFont], index) => {
        const color = palette[index % palette.length];
        const nodeMaterial = new THREE.MeshPhysicalMaterial({
          color,
          emissive: color.clone().multiplyScalar(0.24),
          emissiveIntensity: 0.7,
          roughness: 0.16,
          metalness: 0.42,
          clearcoat: 1,
          clearcoatRoughness: 0.12,
        });
        const shellMaterial = new THREE.MeshBasicMaterial({
          color,
          wireframe: true,
          transparent: true,
          opacity: 0.34,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const atmosphereMaterial = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.07,
          side: THREE.BackSide,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const orbitMaterial = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.72,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const iconBadgeMaterial = new THREE.MeshPhysicalMaterial({
          color: 0x090a12,
          emissive: color.clone().multiplyScalar(0.16),
          emissiveIntensity: 0.85,
          roughness: 0.14,
          metalness: 0.78,
          clearcoat: 1,
          clearcoatRoughness: 0.08,
        });
        const iconRimMaterial = new THREE.MeshBasicMaterial({
          color,
          transparent: true,
          opacity: 0.95,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const iconCanvas = createSkillIconCanvas(
          icon,
          iconFont,
          `#${color.getHexString()}`,
        );
        const iconTexture = new THREE.CanvasTexture(iconCanvas);
        iconTexture.colorSpace = THREE.SRGBColorSpace;
        iconTexture.minFilter = THREE.LinearFilter;
        const iconMaterial = new THREE.MeshBasicMaterial({
          map: iconTexture,
          transparent: true,
          depthWrite: false,
          toneMapped: false,
        });
        disposableTextures.push(iconTexture);
        disposableMaterials.push(
          nodeMaterial,
          shellMaterial,
          atmosphereMaterial,
          orbitMaterial,
          iconBadgeMaterial,
          iconRimMaterial,
          iconMaterial,
        );

        const planet = new THREE.Group();
        const planetVisual = new THREE.Group();
        const node = new THREE.Mesh(nodeGeometry, nodeMaterial);
        const shell = new THREE.Mesh(nodeShellGeometry, shellMaterial);
        const atmosphere = new THREE.Mesh(
          nodeAtmosphereGeometry,
          atmosphereMaterial,
        );
        const orbit = new THREE.Group();
        const orbitRing = new THREE.Mesh(nodeOrbitGeometry, orbitMaterial);
        const satellite = new THREE.Mesh(nodeSatelliteGeometry, orbitMaterial);
        const iconMedallion = new THREE.Group();
        const iconBadge = new THREE.Mesh(iconBadgeGeometry, iconBadgeMaterial);
        const iconRim = new THREE.Mesh(iconRimGeometry, iconRimMaterial);
        const iconFace = new THREE.Mesh(iconPlaneGeometry, iconMaterial);
        const nodeScale = 0.88 + seededRandom(index + 21) * 0.42;

        iconBadge.rotation.x = Math.PI / 2;
        iconRim.position.z = 0.034;
        iconFace.position.z = 0.052;
        iconFace.renderOrder = 5;
        iconMedallion.position.z = 0.345;
        iconMedallion.add(iconBadge, iconRim, iconFace);
        satellite.position.set(0.52, 0, 0);
        orbit.rotation.set(
          0.72 + seededRandom(index + 41) * 0.72,
          seededRandom(index + 61) * 0.85,
          seededRandom(index + 81) * Math.PI,
        );
        orbit.add(orbitRing, satellite);
        planetVisual.scale.setScalar(nodeScale);
        planetVisual.add(node, shell, atmosphere, orbit, iconMedallion);
        planet.add(planetVisual, createSkillLabel(skill, color));

        const angle = index * 2.18;
        planet.position.set(
          Math.cos(angle) * (1.25 + (index % 3) * 0.38),
          1.25 + Math.sin(index * 0.82) * 1.2,
          7 - index * 2.05,
        );
        planet.userData.baseY = planet.position.y;
        planet.userData.offset = index * 0.58;
        planet.userData.core = node;
        planet.userData.shell = shell;
        planet.userData.orbit = orbit;
        planet.userData.icon = iconMedallion;
        planet.userData.iconBaseZ = iconMedallion.position.z;
        nodes.add(planet);
      });

      const ringGeometry = new THREE.TorusGeometry(3.35, 0.035, 10, 128);
      const ringMaterial = new THREE.MeshStandardMaterial({
        color: 0xff62aa,
        emissive: 0x57152f,
        metalness: 0.82,
        roughness: 0.2,
      });
      disposableGeometries.push(ringGeometry);
      disposableMaterials.push(ringMaterial);
      const rings = [-1, -9, -17].map((zPosition, index) => {
        const ring = new THREE.Mesh(ringGeometry, ringMaterial);
        ring.position.set(0, 1.55, zPosition);
        ring.rotation.set(Math.PI * 0.5, index * 0.55, index * 0.4);
        world.add(ring);
        return ring;
      });

      const coreGeometry = new THREE.IcosahedronGeometry(1.18, 2);
      const coreMaterial = new THREE.MeshStandardMaterial({
        color: 0x4c65f7,
        emissive: 0x15236e,
        wireframe: true,
        roughness: 0.24,
        metalness: 0.74,
      });
      disposableGeometries.push(coreGeometry);
      disposableMaterials.push(coreMaterial);
      const core = new THREE.Mesh(coreGeometry, coreMaterial);
      core.position.set(0, 1.55, -19.5);
      world.add(core);

      const particleGeometry = new THREE.BufferGeometry();
      const particleCount = 620;
      const particlePositions = new Float32Array(particleCount * 3);
      for (let index = 0; index < particleCount; index += 1) {
        particlePositions[index * 3] = (seededRandom(index + 31) - 0.5) * 12;
        particlePositions[index * 3 + 1] = seededRandom(index + 58) * 7 - 1;
        particlePositions[index * 3 + 2] = 11 - seededRandom(index + 93) * 42;
      }
      particleGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(particlePositions, 3),
      );
      const particleMaterial = new THREE.PointsMaterial({
        color: 0xffb8dc,
        size: 0.028,
        transparent: true,
        opacity: 0.7,
        depthWrite: false,
      });
      disposableGeometries.push(particleGeometry);
      disposableMaterials.push(particleMaterial);
      const particles = new THREE.Points(particleGeometry, particleMaterial);
      world.add(particles);

      const cameraPath = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 1.6, 13.5),
        new THREE.Vector3(0.65, 1.3, 7),
        new THREE.Vector3(-0.7, 2.1, 0),
        new THREE.Vector3(0.5, 1.2, -8),
        new THREE.Vector3(-0.25, 2.15, -16),
      ]);

      let reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      motionPreference = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      );
      const pointer = { x: 0, y: 0 };

      pointerHandler = (event) => {
        if (reducedMotion) return;
        pointer.x = event.clientX / window.innerWidth - 0.5;
        pointer.y = event.clientY / window.innerHeight - 0.5;
      };
      window.addEventListener("pointermove", pointerHandler, { passive: true });

      const renderStaticFrame = () => {
        const staticPosition = cameraPath.getPointAt(0.07);
        camera.position.copy(staticPosition);
        camera.lookAt(0, 1.4, 1.8);
        renderer.render(scene, camera);
        notifyReady();
      };

      resizeHandler = () => {
        if (!renderer) return;
        const width = mount.clientWidth;
        const height = mount.clientHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
        if (reducedMotion) renderStaticFrame();
      };
      window.addEventListener("resize", resizeHandler);

      let inView = true;
      let pageVisible = !document.hidden;
      observer = new IntersectionObserver(
        ([entry]) => {
          inView = entry.isIntersecting;
        },
        { rootMargin: "120px" },
      );
      observer.observe(mount);

      visibilityHandler = () => {
        pageVisible = !document.hidden;
      };
      document.addEventListener("visibilitychange", visibilityHandler);

      motionHandler = (event) => {
        reducedMotion = event.matches;
        if (reducedMotion) {
          if (frameId) window.cancelAnimationFrame(frameId);
          frameId = undefined;
          renderStaticFrame();
        } else if (!frameId) {
          frameId = window.requestAnimationFrame(render);
        }
      };
      motionPreference.addEventListener("change", motionHandler);

      const clock = new THREE.Clock();
      const currentCameraPosition = new THREE.Vector3();
      const targetCameraPosition = new THREE.Vector3();
      const lookTarget = new THREE.Vector3();

      const render = () => {
        frameId = undefined;
        if (reducedMotion || cancelled) return;

        if (!inView || !pageVisible) {
          frameId = window.requestAnimationFrame(render);
          return;
        }

        const hero = mount.closest(".ip-hero");
        const heroRect = hero?.getBoundingClientRect();
        const scrollRange = Math.max(
          (hero?.offsetHeight || window.innerHeight) - window.innerHeight,
          1,
        );
        const progress = clamp(-(heroRect?.top || 0) / scrollRange);
        const elapsed = clock.getElapsedTime();
        const skillLabelOpacity = clamp((progress - 0.08) * 2.8, 0.08, 0.92);

        skillLabelMaterials.forEach((material) => {
          material.opacity = skillLabelOpacity;
        });

        cameraPath.getPointAt(progress * 0.94, targetCameraPosition);
        targetCameraPosition.x += pointer.x * 0.5;
        targetCameraPosition.y += -pointer.y * 0.3;
        currentCameraPosition.copy(camera.position).lerp(targetCameraPosition, 0.065);
        camera.position.copy(currentCameraPosition);

        lookTarget.set(
          pointer.x * 0.25,
          1.45 - pointer.y * 0.18,
          4 - progress * 22,
        );
        camera.lookAt(lookTarget);

        nodes.children.forEach((planet, index) => {
          planet.position.y =
            planet.userData.baseY +
            Math.sin(elapsed * 0.72 + planet.userData.offset) * 0.09;
          planet.userData.core.rotation.x += 0.0015 + index * 0.00003;
          planet.userData.core.rotation.y += 0.003;
          planet.userData.shell.rotation.x -= 0.0012;
          planet.userData.shell.rotation.y += 0.0018;
          planet.userData.orbit.rotation.z += 0.0025 + (index % 4) * 0.0004;
          const iconPulse = Math.sin(elapsed * 1.25 + planet.userData.offset);
          planet.userData.icon.position.z =
            planet.userData.iconBaseZ + iconPulse * 0.012;
          planet.userData.icon.rotation.z = iconPulse * 0.055;
        });
        rings.forEach((ring, index) => {
          ring.rotation.z = elapsed * (0.045 + index * 0.012) + progress * 1.4;
        });
        core.rotation.x = elapsed * 0.08;
        core.rotation.y = elapsed * 0.12;
        particles.rotation.y = elapsed * 0.006;
        pinkLight.position.z = 7 - progress * 18;
        blueLight.intensity = 36 + progress * 34;

        renderer.render(scene, camera);
        notifyReady();
        frameId = window.requestAnimationFrame(render);
      };

      if (reducedMotion) {
        renderStaticFrame();
      } else {
        frameId = window.requestAnimationFrame(render);
      }
    };

    setupScene().catch(() => {
      mount.classList.add("ip-scene--unavailable");
      notifyReady();
    });

    return () => {
      cancelled = true;
      if (frameId) window.cancelAnimationFrame(frameId);
      if (resizeHandler) window.removeEventListener("resize", resizeHandler);
      if (pointerHandler) window.removeEventListener("pointermove", pointerHandler);
      if (visibilityHandler) {
        document.removeEventListener("visibilitychange", visibilityHandler);
      }
      if (motionHandler) {
        motionPreference?.removeEventListener("change", motionHandler);
      }
      observer?.disconnect();
      disposableGeometries.forEach((geometry) => geometry.dispose());
      disposableMaterials.forEach((material) => material.dispose());
      disposableTextures.forEach((texture) => texture.dispose());
      renderer?.dispose();
      renderer?.domElement.remove();
    };
  }, [onReady]);

  return (
    <div
      ref={mountRef}
      className="ip-scene absolute inset-0 -z-[4] h-full w-full bg-[radial-gradient(circle_at_52%_38%,rgba(178,92,250,0.14),transparent_30%),linear-gradient(180deg,#09070c,#050505)] [&>canvas]:absolute [&>canvas]:inset-0 [&>canvas]:block [&>canvas]:h-full [&>canvas]:w-full"
      aria-hidden="true"
    />
  );
};

export default SystemsScene;
