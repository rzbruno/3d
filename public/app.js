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

// Create container (large transparent box)
const containerSize = 15;
const containerGeometry = new THREE.BoxGeometry(containerSize, containerSize, containerSize);
const containerMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xcccccc,
    wireframe: true,
    transparent: true,
    opacity: 0.3
});
const container = new THREE.Mesh(containerGeometry, containerMaterial);
scene.add(container);

// Create 6 colored boxes inside container
const boxSize = 2;
const boxGeometry = new THREE.BoxGeometry(boxSize, boxSize, boxSize);
const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
const positions = [
    [-4, 0, 0], [4, 0, 0],
    [0, -4, 0], [0, 4, 0],
    [0, 0, -4], [0, 0, 4]
];

positions.forEach((pos, i) => {
    const material = new THREE.MeshBasicMaterial({ color: colors[i] });
    const box = new THREE.Mesh(boxGeometry, material);
    box.position.set(pos[0], pos[1], pos[2]);
    scene.add(box);
});

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