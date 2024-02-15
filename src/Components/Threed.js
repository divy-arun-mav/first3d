import React, { useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const Threed = () => {
    useEffect(() => {
        const scene = new THREE.Scene();

        const geometry = new THREE.SphereGeometry(3.64, 64);
        const material = new THREE.MeshStandardMaterial({
            color: '#00ff83',
            roughness: 0.2,
            metalness: 0.8,
            emissive: '#004400',
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        const light = new THREE.PointLight(0xffffff, 1000, 20);
        light.position.set(0, 10, 10);
        scene.add(light);

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.z = 10;
        camera.lookAt(0, 0, 0);
        scene.add(camera);

        const canvas = document.querySelector('.webgl');
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(window.innerWidth, window.innerHeight);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.25;
        controls.screenSpacePanning = false;
        controls.maxPolarAngle = Math.PI / 2;
        controls.minPolarAngle = Math.PI / 2;
        controls.maxAzimuthAngle = Math.PI / 2;
        controls.minAzimuthAngle = Math.PI / 2;

        const animate = () => {
            requestAnimationFrame(animate);

            controls.update();

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            renderer.dispose();
            geometry.dispose();
            material.dispose();
        };
    }, []);

    return (
        <div>
            <canvas className='webgl' width='800' height='600'></canvas>
        </div>
    );
};

export default Threed;
