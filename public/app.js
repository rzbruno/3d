// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(10, 10, 10);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Load JSON data and create scene
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
        const boxGeometry = new THREE.BoxGeometry(item.w, item.h, item.d);
        const color = `#${Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0')}`
        const material = new THREE.MeshBasicMaterial({ color: color });
        const box = new THREE.Mesh(boxGeometry, material);
        box.position.set(item.x, item.y, item.z);
        scene.add(box);
    })
  })

// Initialize OrbitControls - THIS WILL NOW WORK
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Add coordinate axes helper
const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update(); // required when damping is enabled
    renderer.render(scene, camera);
}

// Handle window resize
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
window.addEventListener('resize', onWindowResize);

// Start animation
animate();