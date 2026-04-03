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

module.exports = { GLTFLoader, DRACOLoader };
