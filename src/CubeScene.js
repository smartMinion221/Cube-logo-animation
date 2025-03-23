import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
const CubeScene = () => {
    const containerRef = useRef();
    const models = useRef([]); // Ref to store loaded models
    useEffect(() => {
        // Scene setup
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x000000); // Dark background
        // Camera setup
        const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight / 2.4, 0.25, 100);
        camera.position.set(3.5, 3.5, 3.5);
        // Renderer setup
        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth / 2.4, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);
        // Controls
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.minDistance = 2;
        controls.maxDistance = 10;
        controls.target.set(0, 0, 0); // Adjust target for centering
        controls.enableZoom = false; // Disable zoom
        controls.update();
        // Lighting setup
        const ambientLight = new THREE.AmbientLight(0xf8f8f8, 10000); // Soft ambient light
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xf2e2e2, 10000);
        directionalLight.position.set(100, 100,100);
        scene.add(directionalLight);
        const directionalLight1 = new THREE.DirectionalLight(0xffffff, 10000);
        // directionalLight1.position.set(.1, .1, .1);
        scene.add(directionalLight1);
        const directionalLight2 = new THREE.DirectionalLight(0xffffff, 10000);
        directionalLight2.position.set(-100, -100, -100);
        // scene.add(directionalLight2);
        const pointLight = new THREE.PointLight(0xffffff, 10000, 10);
        pointLight.position.set(-70, 70, 70);
        scene.add(pointLight);
        const testLight = new THREE.RectAreaLight(0xffffff, 15000, 10)
        testLight.position.set(-60, -60, 60);
        scene.add(testLight);
        // Create a parent object to rotate the whole scene
        const parent = new THREE.Object3D();
        scene.add(parent);
        // Load HDR Environment Map
        const rgbeLoader = new RGBELoader();
        rgbeLoader.setPath('textures/equirectangular/')
            .load('px.hdr', (texture) => {
                // texture.mapping = THREE.EquirectangularReflectionMapping;
                texture.mapping = THREE.EquirectangularReflectionMapping;
                scene.environment = texture;
                // Load multiple GLTF Models with different positions
                loadModel(parent, -1, 0.5, 6, Math.PI / 2); // Model 1
                loadModel(parent, -0.5, 1, 8, -Math.PI); // Model 2
                loadModel(parent, 0, 1, 7, Math.PI); // Model 3
                loadModel(parent, 0.5, 0.5, 9, -Math.PI / 2); // Model 4
            }, undefined, (error) => {
                console.error('Error loading HDR environment:', error);
            });
        // Load Model Function
        const loadModel = (parent, positionY, rotationDuration, delay, rotationAngle) => {
            const loader = new GLTFLoader().setPath('models/gltf/');
            loader.load('group.gltf', (gltf) => {
                const model = gltf.scene;
                model.scale.set(0.01, 0.01, 0.01); // Adjust scale as needed
                model.position.set(0, positionY, 0); // Set position for float effect
                // directionalLight.lookAt(model);
                const material = new THREE.MeshStandardMaterial({
                    color: 0x030303,
                    metalness: 1,
                    roughness: 0.1,
                });
                model.traverse((child) => {
                    if (child.isMesh) {
                        child.material = material; // Change material
                    }
                });
                models.current.push({ model, rotating: false, timer: 0, delay, rotationDuration, rotationAngle, currentRotation: 0 });
                parent.add(model); // Add the loaded model to the parent object
            }, undefined, (error) => {
                console.error('An error occurred while loading the model:', error);
            });
        };
        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            // Rotate the whole parent object (scene) constantly
            parent.rotation.x += 0.0085;
            parent.rotation.y += 0.0085;
            parent.rotation.z += 0.0085;
            models.current.forEach((modelData, index) => {
                const { model, timer, delay, rotationDuration, rotationAngle, currentRotation } = modelData;
                if (modelData.timer < modelData.delay) {
                    modelData.timer += 0.016; // Increment timer with a fixed delta time (approx. 60 FPS)
                } else if (modelData.timer < modelData.delay + modelData.rotationDuration) {
                    // Calculate rotation step
                    const rotationStep = rotationAngle / (rotationDuration / 0.016);
                    model.rotation.y += rotationStep; // Rotate by step amount
                    modelData.timer += 0.016; // Increment timer for rotation
                } else {
                    // Reset the timer for the next delay and rotation
                    modelData.timer = 0;
                    model.rotation.y = Math.round(model.rotation.y / (Math.PI / 2)) * (Math.PI / 2) + (rotationAngle >= 0 ? 0 : rotationAngle);
                }
            });
            renderer.render(scene, camera);
        };
        // Resize Handling
        const onResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', onResize);
        // Start Animation
        animate();
        // Cleanup on unmount
        return () => {
            window.removeEventListener('resize', onResize);
            renderer.dispose();
            controls.dispose(); // Clean up controls
        };
    }, []);
    return <div ref={containerRef} style={{ width: '50%'}} />;
};
export default CubeScene;