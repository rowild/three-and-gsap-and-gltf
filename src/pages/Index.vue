<script setup lang="ts">
import * as THREE from 'three'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'
import { GUI } from 'dat.gui'
// import { RectAreaLightUniformsLib } from '../classes/RectAreaLightUniformsLib.js'
// import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

import gsap from 'gsap'

import { onMounted } from 'vue'

const cubeTextureLoader = new THREE.CubeTextureLoader()
const textures = cubeTextureLoader.load([
    // "bg/blue/bkg1_right.png",
    // "bg/blue/bkg1_left.png",
    // "bg/blue/bkg1_top.png",
    // "bg/blue/bkg1_bot.png",
    // "bg/blue/bkg1_front.png",
    // "bg/blue/bkg1_back.png",

    "bg/lightblue/right.png",
    "bg/lightblue/left.png",
    "bg/lightblue/top.png",
    "bg/lightblue/bot.png",
    "bg/lightblue/front.png",
    "bg/lightblue/back.png",

    // "bg/red/bkg1_right1.png",
    // "bg/red/bkg1_left2.png",
    // "bg/red/bkg1_top3.png",
    // "bg/red/bkg1_bottom4.png",
    // "bg/red/bkg1_front5.png",
    // "bg/red/bkg1_back6.png",

    // "bg/red/bkg2_right1.png",
    // "bg/red/bkg2_left2.png",
    // "bg/red/bkg2_top3.png",
    // "bg/red/bkg2_bottom4.png",
    // "bg/red/bkg2_front5.png",
    // "bg/red/bkg2_back6.png",

    // "bg/red/bkg3_right1.png",
    // "bg/red/bkg3_left2.png",
    // "bg/red/bkg3_top3.png",
    // "bg/red/bkg3_bottom4.png",
    // "bg/red/bkg3_front5.png",
    // "bg/red/bkg3_back6.png",
])


/**
 * Create Renderer
 */

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setPixelRatio(window.devicePixelRatio)

    document.body.appendChild(renderer.domElement)

    /// Window resize event
    window.addEventListener( 'resize', onWindowResize, false )
    function onWindowResize() {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    }



/**
 * Create the main Scene (also needed in renderer)
 */ 

    const scene = new THREE.Scene()
    // scene.add(new THREE.GridHelper( 9, 9 ));
    // scene.add(new THREE.AxesHelper( Math.PI ))
    scene.background = textures



/**
 * Create main camera
 */

    const cameraParams = {
        fov: 60,
        aspectRatio: window.innerWidth/window.innerHeight,
        near: 0.1,
        far: 1000,
        positionX: -5,
        positionY: 1.5,
        positionZ: 15
    }
    const camera = new THREE.PerspectiveCamera(cameraParams.fov, cameraParams.aspectRatio, cameraParams.near, cameraParams.far)
    camera.position.set( cameraParams.positionX, cameraParams.positionY, cameraParams.positionZ )
    camera.lookAt( 0, 0, 0 )
    const cameraHelper = new THREE.CameraHelper( camera );
    scene.add( camera )
    scene.add( cameraHelper )



/**
 * ------------------------------------------------------------------------------
 *  Create a meshes
 * ------------------------------------------------------------------------------
 */

    /// Plane
    const plane = new THREE.Mesh( 
        new THREE.PlaneGeometry( 20, 20, 10, 10 ), 
        new THREE.MeshStandardMaterial({ 
            color: 0xffff00, 
            side: THREE.DoubleSide, 
            // wireframe: false 
        })
    );
    plane.rotation.x = -Math.PI * 0.5
    plane.position.y = -0.5
    plane.castShadow = false
    plane.receiveShadow = true
    scene.add( plane )

    /// Sphere
    // const sphere = new THREE.Mesh( 
    //     new THREE.SphereGeometry(1,5,5),
    //     new THREE.MeshBasicMaterial({ color: 0x008080, wireframe: true, }) 
    // )
    // sphere.position.set(0, 0, .9)
    // scene.add( sphere )



/**
 * ------------------------------------------------------------------------------
 * Load 3D model
 * ------------------------------------------------------------------------------
 */

    const gltfLoader = new GLTFLoader()
    gltfLoader.load(
        // '/models/classroom.gltf',
        // '/models/en.gltf',
        '/models/ball.gltf',
        (gltf) =>
        {
            scene.add(gltf.scene)

            const allCubes = []

            gltf.scene.children.forEach(cube => {
                cube.castShadow = true
                cube.receiveShadow = true
                cube.scale.set(0.2, 0.2, 0.2)

                // const newCube = new THREE.Mesh( cube.geometry, cube.material )
                // newCube.position.set(cube.position.x, cube.position.y, cube.position.z)
                // newCube.castShadow = true
                // newCube.receiveShadow = true
                // newCube.material.opacity = 0
                // newCube.scale.set(0, 0.2, 0.2)
                // scene.add(newCube)

                allCubes.push(cube)
            })

            console.log('allCubes =', allCubes);

            gsap.to( gltf.scene.children, {
                duration: 2,
                "scale.x": 1,
                stagger: {
                    amount: 0.1,
                    grid: "auto",
                    from: "center"
                }
            })


        },
        // (progress) => console.log('progress', progress),
        // (error) =>  console.log('error', error)
    )



/**
 * ------------------------------------------------------------------------------
 * Lights
 * ------------------------------------------------------------------------------
 */

    //// AmbientLight
    // const ambientLight = new THREE.AmbientLight( 0x404040, 1.0 ); // soft white light
    // // const ambientLightHelper = new THREE.AmbientLightHelper( ambientLight )
    // scene.add( ambientLight );

    //// PointLight
    // const pointLight = new THREE.PointLight( 0x66ffcc, 1 );
    // pointLight.position.set( -2, 3, -3 );
    // pointLight.lookAt( 0, 0, 0)
    // const pointLightHelper = new THREE.PointLightHelper( pointLight, 2 )
    // scene.add( pointLight );
    // scene.add( pointLightHelper )

    //// RectAreaLight
    // RectAreaLightUniformsLib.init()
    // let rectLightParams = {
    //     intensity: 1,
    //     width: 30,
    //     height: 10,
    //     x: 10,
    //     y: 5,
    //     z: 4
    // }
    // const rectLight = new THREE.RectAreaLight( 0xff5580, rectLightParams.intensity, rectLightParams.width, rectLightParams.height )
    // rectLight.position.set( rectLightParams.x, rectLightParams.y, rectLightParams.z )
    // rectLight.lookAt( 0, 0, 0 )
    // const rectAreaLightHelper = new RectAreaLightHelper( rectLight );
    // rectLight.add( rectAreaLightHelper )
    // scene.add( rectLight )

    // Directionl Light
    const directionalLight = new THREE.DirectionalLight( 0x826fc7, 100.0 )
    directionalLight.position.set( -2, 3, 2 )
    directionalLight.target = plane
    // Shadow params
    directionalLight.castShadow = true
    directionalLight.shadow.bias = .00001
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    directionalLight.shadow.camera.near = .01
    directionalLight.shadow.camera.far = 5000
    directionalLight.shadow.camera.left = 200
    directionalLight.shadow.camera.right = -200
    directionalLight.shadow.camera.top = 200
    directionalLight.shadow.camera.bottom = -200

    const directionalLightHelper = new THREE.DirectionalLightHelper( directionalLight, 1 )
    directionalLight.add( directionalLightHelper ) 

    scene.add( directionalLight );
    scene.add( directionalLight.target )


const animate = () => {
    requestAnimationFrame( animate );
    render()
    // stats.update()
}

const render = () => {
    renderer.render(scene, camera)
}

onMounted(() => {
    
})
</script>

<template>
    <!-- <canvas ref="experience" /> -->
</template>