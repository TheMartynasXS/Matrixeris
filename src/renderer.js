const { Matrix4 } = require("three");
const THREE = require("three");
Cmin = 20

let scene = new THREE.Scene();
width = 300;
height = 300;
let camera = new THREE.OrthographicCamera(width / Cmin / - 2, width / Cmin / 2, height / Cmin / 2, height / Cmin / - 2, 1, 1000);
camera.position.set(1.5, -1.5, 100);

function MakeTexture(texture) {
  x = new THREE.TextureLoader().load(texture);
  x.wrapS = THREE.RepeatWrapping;
  x.wrapT = THREE.RepeatWrapping;
  x.repeat.set(1, 1);
  return x
}

let geometry = new THREE.PlaneGeometry(1, 1);
geometry.applyMatrix4(new THREE.Matrix4().makeTranslation(0.5, -0.5, 0));

const bg = MakeTexture("./bg.png");
const imgA = MakeTexture("./A.png");
const imgB = MakeTexture("./B.png");

let matA = new THREE.MeshBasicMaterial({ map: imgA });
let matB = new THREE.MeshBasicMaterial({ map: imgB, transparent: true});
let matC = new THREE.MeshBasicMaterial({ map: imgB, transparent: true });

let planeA = new THREE.Mesh(geometry, matA);
let planeB = new THREE.Mesh(geometry, matB);
let planeC = new THREE.Mesh(geometry, matC);
planeC.material.opacity = 0.5;
planeB.material.opacity = 0.5;

scene.add(planeA);
scene.add(planeB);
scene.add(planeC);

function RandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}



planeA.position.set(RandomInt(-5, -1), RandomInt(1, 5), 0);
planeA.rotateZ(RandomInt(0, 3) * Math.PI / 2);

planeB.scale.set(RandomInt(-4, 4), RandomInt(1, 4), 1);
planeB.position.set(RandomInt(0, 4), RandomInt(-5, 5), 0);
planeB.rotateZ(RandomInt(0, 3) * Math.PI / 2);

planeC.position.copy(planeA.position);
planeC.rotation.copy(planeA.rotation);
planeC.scale.copy(planeA.scale);

scene.background = bg;

let renderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);

renderer.domElement.onclick = function () {
  planeA.position.set(RandomInt(-5, -1), RandomInt(1, 5), 0);
  planeA.rotateZ(RandomInt(0, 3) * Math.PI / 2);


  planeB.scale.set(
    RandomInt(1, 4) * (Math.random() > 0.5 ? 1 : -1),
    RandomInt(1, 4) * (Math.random() > 0.5 ? 1 : -1), 1
  );
  planeB.position.set(RandomInt(0, 4), RandomInt(-5, 5), 0);
  planeB.rotateZ(RandomInt(0, 3) * Math.PI / 2);

  planeC.position.copy(planeA.position);
  planeC.rotation.copy(planeA.rotation);
  planeC.scale.copy(planeA.scale);
}
document.getElementById("Canvas-Container").appendChild(renderer.domElement);


function multiplyMatrices(matrixA, matrixB) {
  let result = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      let sum = 0;
      for (let k = 0; k < 3; k++) {
        sum += matrixA[i * 3 + k] * matrixB[k * 3 + j];
      }
      result.push(sum);
    }
  }
  return result;
}

a1 = document.getElementById("A1");
a2 = document.getElementById("A2");

b1 = document.getElementById("B1");
b2 = document.getElementById("B2");

c1 = document.getElementById("C1");
c2 = document.getElementById("C2");
c3 = document.getElementById("C3");
c4 = document.getElementById("C4");

d1 = document.getElementById("D1");
d2 = document.getElementById("D2");

e1 = document.getElementById("E1");
e2 = document.getElementById("E2");
e3 = document.getElementById("E3");
e4 = document.getElementById("E4");
e5 = document.getElementById("E5");
e6 = document.getElementById("E6");

let E = [
  1, 0, 0, 0,
  0, 1, 0, 0,
  0, 0, 1, 0,
  0, 0, 0, 1
]

function V(element) {
  let value = element.value;
  if (value === "") {
    return null;
  }
  return value;
}

function test() {
  planeC.position.copy(planeA.position);
  planeC.rotation.copy(planeA.rotation);
  planeC.scale.copy(planeA.scale);
  planeC.applyMatrix4(
    new Matrix4().set(
      E[0], E[3], 0, E[6],
      E[1], E[4], 0, E[7],
      0, 0, 1, 0,
      0, 0, 0, 1
    ))
}

Compare = (a, b) => {
  a = Math.abs(a)
  b = Math.abs(b)
  if (a > b) {

    return a - b < 0.0001
  }
  return b - a < 0.0001
}
CompareVec = (a, b) => {
  if (Compare(a.x, b.x) && Compare(a.y, b.y) && Compare(a.z, b.z)) {
    return true
  }
  return false
}

const Rez = document.getElementById("Rez")
function render() {
  let A = [
    1, 0, 0,
    0, 1, 0,
    V(a1) ?? 0, V(a2) ?? 0, 1
  ]
  let B = [
    V(b1) ?? 1, 0, 0,
    0, V(b2) ?? 1, 0,
    0, 0, 1
  ]
  let C = [
    V(c1) ?? 1, V(c2) ?? 0, 0,
    V(c3) ?? 0, V(c4) ?? 1, 0,
    0, 0, 1
  ]
  let D = [
    1, 0, 0,
    0, 1, 0,
    V(d1) ?? 0, V(d2) ?? 0, 1
  ]
  e1.value = E[0];
  e2.value = E[1];
  e3.value = E[3];
  e4.value = E[4];
  e5.value = E[6];
  e6.value = E[7];
  if (Compare(planeB.rotation.z, planeC.rotation.z) &&
    CompareVec(planeB.position, planeC.position) &&
    CompareVec(planeB.scale, planeC.scale)) {
    Rez.classList.replace("incorrect", "correct")

  }
  else {
    Rez.classList.replace("correct", "incorrect")
  }

  E = multiplyMatrices(multiplyMatrices(multiplyMatrices(A, B), C), D);
  test()
  setTimeout(() => {
    requestAnimationFrame(render)
  }, 1000 / 144);;
  renderer.render(scene, camera)
}

render();