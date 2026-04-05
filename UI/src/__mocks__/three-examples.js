// Mock for three/examples/jsm/* modules used in unit tests.
// These modules are ESM-only and cannot be transformed by jest in a JSDOM environment.

class GLTFLoader {
  load() {}
  loadAsync() { return Promise.resolve({ scene: null, scenes: [], animations: [], cameras: [], asset: {} }); }
}

class DRACOLoader {
  setDecoderPath() { return this; }
  dispose() {}
}

class SVGLoader {
  load(_url, onLoad) {
    if (onLoad) onLoad({ paths: [] });
  }
  static createShapes() { return []; }
}

class OrbitControls {
  enableDamping = false;
  dampingFactor = 0;
  enableZoom = true;
  minPolarAngle = 0;
  maxPolarAngle = Math.PI;
  target = { set() {} };
  update() {}
  dispose() {}
}

module.exports = { GLTFLoader, DRACOLoader, SVGLoader, OrbitControls };
