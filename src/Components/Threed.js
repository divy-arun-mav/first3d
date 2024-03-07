import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeJSComponent = () => {
    const containerRef = useRef();

    useEffect(() => {
        // Create a scene
        const scene = new THREE.Scene();

        // Create a camera
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.z = 5;

        // Create a renderer
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        containerRef.current.appendChild(renderer.domElement);

        // Create a box geometry
        const boxGeometry = new THREE.BoxGeometry();
        const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        scene.add(boxMesh);

        // Create a point light
        const pointLight = new THREE.PointLight(0xffffff);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // Rotate the box
            boxMesh.rotation.x += 0.01;
            boxMesh.rotation.y += 0.01;

            // Render the scene
            renderer.render(scene, camera);
        };

        animate();

        // Clean up on component unmount
        return () => {
            renderer.dispose();
        };
    }, []);

    return <div ref={containerRef} />;
};

export default ThreeJSComponent;
