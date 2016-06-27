/* global THREE */
const positions = [];
const squares = 10000;

function addXYZValues(array, vector) {
  array.push(vector.x);
  array.push(vector.y);
  array.push(vector.z);
}

function createMainFeatures() {
  let j = 0;
  let i = 0;
  let len = squares / Math.sqrt(squares);
  for (j = 0, len = squares / Math.sqrt(squares); j < len; j++) {
    for (i = 0; i < len; i++) {
      const v1 = new THREE.Vector3(i - offset, Math.random() < 0.0002 ? 20 : 0, j - offset);
      // 2
      const v2 = new THREE.Vector3(i + 1 - offset, 0, j - offset);
      // 3
      const v3 = new THREE.Vector3(i - offset, 0, j + 1 - offset);
      // 4
      const v4 = new THREE.Vector3(i + 1 - offset, 0, j + 1 - offset);

      addXYZValues(positions, v1);
      addXYZValues(positions, v2);
      addXYZValues(positions, v3);
      addXYZValues(positions, v2);
      addXYZValues(positions, v3);
      addXYZValues(positions, v4);
    }
  }
}

window.createMainFeatures = createMainFeatures;
