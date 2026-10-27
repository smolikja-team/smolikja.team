// The header's 3D wordmark: the Blender model (exported to glTF by
// `scripts/export-logo-model.py`) spinning on a transparent WebGL canvas.
// Imported on demand by `site-logo.tsx`, so three.js never blocks the page.

import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/** One turn per 8 s, as in the original render. */
const SECONDS_PER_TURN = 8;
/** Longest step a frame may advance the spin; a stall slows it instead of skipping. */
const MAX_STEP = 1 / 30;
/** Width of the front-facing model in scene units, and its share of the canvas width. */
const MODEL_WIDTH = 2.75;
const FILL = 0.85;

/**
 * Reflection environment: a mid-grey room (so the chrome never reflects
 * black) with softboxes where the Blender scene has its area lights — a dim
 * one in front, bright ones behind, to the right and upper left — plus a top
 * strip for glints on the upper edges. Values are light intensities.
 */
function studio() {
  const scene = new THREE.Scene();
  scene.add(
    new THREE.Mesh(
      new THREE.BoxGeometry(40, 24, 40),
      new THREE.MeshBasicMaterial({ color: new THREE.Color().setScalar(0.3), side: THREE.BackSide }),
    ),
  );
  const softboxes: [x: number, y: number, z: number, width: number, height: number, intensity: number][] = [
    [0, 0, 9, 7.7, 9.9, 0.9],
    [0, 0, -14, 7.7, 9.9, 5],
    [11, 0, -2.2, 6, 9.9, 5],
    [-11, 4, 9, 2.2, 9.9, 4],
    [0, 9, 0, 14, 1.2, 6],
  ];
  for (const [x, y, z, width, height, intensity] of softboxes) {
    const panel = new THREE.Mesh(
      new THREE.PlaneGeometry(width, height),
      new THREE.MeshBasicMaterial({ color: new THREE.Color().setScalar(intensity), side: THREE.DoubleSide }),
    );
    panel.position.set(x, y, z);
    panel.lookAt(0, 0, 0);
    scene.add(panel);
  }
  return scene;
}

function disposeTree(root: THREE.Object3D) {
  root.traverse((node) => {
    if (node instanceof THREE.Mesh) {
      node.geometry.dispose();
      for (const material of Array.isArray(node.material) ? node.material : [node.material]) material.dispose();
    }
  });
}

/**
 * Loads the model into `host`, compiles its shaders, and starts spinning only
 * when everything is ready, so the first turn never stutters. Resolves to a
 * cleanup function; rejects if WebGL is unavailable or the signal aborts.
 */
export async function mountHeaderLogo(host: HTMLElement, src: string, signal: AbortSignal) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.AgXToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearAlpha(0);

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = studio();
  const environment = pmrem.fromScene(room, 0.02).texture;
  disposeTree(room);
  scene.environment = environment;

  const camera = new THREE.PerspectiveCamera(18, 1, 0.1, 100);
  const logo = new THREE.Group();
  scene.add(logo);

  function fit() {
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    const halfFov = Math.atan(Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect);
    camera.position.set(0, 0, MODEL_WIDTH / FILL / (2 * Math.tan(halfFov)));
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
  }

  const resize = new ResizeObserver(fit);
  let last: number | undefined;

  function frame(time: number) {
    const step = last === undefined ? 0 : Math.min((time - last) / 1000, MAX_STEP);
    last = time;
    logo.rotation.y = (logo.rotation.y + (step / SECONDS_PER_TURN) * Math.PI * 2) % (Math.PI * 2);
    renderer.render(scene, camera);
  }

  function onVisibility() {
    last = undefined;
    renderer.setAnimationLoop(document.visibilityState === "visible" ? frame : null);
  }

  function dispose() {
    renderer.setAnimationLoop(null);
    document.removeEventListener("visibilitychange", onVisibility);
    resize.disconnect();
    disposeTree(logo);
    environment.dispose();
    pmrem.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  }

  try {
    const gltf = await new GLTFLoader().loadAsync(src);
    signal.throwIfAborted();
    logo.add(gltf.scene);
    fit();
    await renderer.compileAsync(scene, camera);
    signal.throwIfAborted();
  } catch (error) {
    dispose();
    throw error;
  }

  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  host.appendChild(renderer.domElement);
  resize.observe(host);
  document.addEventListener("visibilitychange", onVisibility);
  onVisibility();
  return dispose;
}
