


/**
 * ---------------------------------------------------------------------
 * Stats and GUI
 * ---------------------------------------------------------------------
 */

const stats = new Stats()
document.body.appendChild(stats.dom)

const data = {
    color: 0x785cf9,
    // color: ambientLight.color.getHex(),
    mapsEnabled: true,
}

const gui = new GUI()

// const ambientLightFolder = gui.addFolder('THREE.AmbientLight')
// ambientLightFolder.addColor(data, 'color').onChange(() => {
//     ambientLight.color.setHex(Number(data.color.toString().replace('#', '0x')))
// })
// ambientLightFolder.add(ambientLight, 'intensity', 0, 100, 1)
// ambientLightFolder.add(ambientLight, 'visible')
// ambientLightFolder.open()

// const rectLightFolder = gui.addFolder('THREE.RectAreaLight')
// rectLightFolder.addColor(data, 'color').onChange(() => {
//     rectLight.color.setHex(Number(data.color.toString().replace('#', '0x')))
// })
// rectLightFolder.add(rectLightParams, 'intensity', 0, Math.PI * 2, 0.01).onChange(() => { render() })
// rectLightFolder.add(rectLightParams, 'width', 0, 500, 1).onChange(() => { render() })
// rectLightFolder.add(rectLightParams, 'height', 0, 500, 1).onChange(() => { render() })
// rectLightFolder.add(rectLightParams, 'x', 0, 500, 1)
// rectLightFolder.add(rectLightParams, 'y', 0, 500, 1)
// rectLightFolder.add(rectLightParams, 'z', 0, 500, 1)
// rectLightFolder.open()

// const pointLightFolder = gui.addFolder('THREE.PointLight')
// pointLightFolder.addColor(data, 'color').onChange(() => {
//     pointLight.color.setHex(Number(data.color.toString().replace('#', '0x')))
// })
// pointLightFolder.add(pointLight, 'intensity', 0.0, 1.0, 0.01)
// pointLightFolder.add(pointLight.color, 'r', 0.0, 1.0, 0.01)
// pointLightFolder.add(pointLight.color, 'g', 0.0, 1.0, 0.01)
// pointLightFolder.add(pointLight.color, 'b', 0.0, 1.0, 0.01)
// pointLightFolder.add(pointLight, 'visible')
// pointLightFolder.add(pointLightHelper, 'visible')
// pointLightFolder.open()

const directionalLightFolder = gui.addFolder('THREE.DirectionalLight')
directionalLightFolder.addColor(data, 'color').onChange(() => {
    directionalLight.color.setHex(Number(data.color.toString().replace('#', '0x')))
})
directionalLightFolder.add(directionalLight, 'intensity', 0.0, 1.0, 0.01)
directionalLightFolder.add(directionalLight.color, 'r', 0.0, 1.0, 0.01)
directionalLightFolder.add(directionalLight.color, 'g', 0.0, 1.0, 0.01)
directionalLightFolder.add(directionalLight.color, 'b', 0.0, 1.0, 0.01)
directionalLightFolder.add(directionalLight, 'castShadow')
directionalLightFolder.add(directionalLight, 'visible')
directionalLightFolder.open()


const cameraControls = {
    get near(){ return camera.near; },
    set near(value){
        camera.near = value;
        camera.updateProjectionMatrix();
        cameraHelper.update();
    },
    get far(){ return camera.far; },
    set far(value){
        camera.far = value;
        camera.updateProjectionMatrix();
        cameraHelper.update();
    },
    get aspect(){ return camera.aspect; },
    set aspect(value){
        camera.aspect = value;
        camera.updateProjectionMatrix();
        cameraHelper.update();
    },
    get fov(){ return camera.fov; },
    set fov(value){
        camera.fov = value;
        camera.updateProjectionMatrix();
        cameraHelper.update();
    },
    get positionX(){ return camera.position.x; },
    set positionX(value){
        camera.position.x = value;
        camera.updateMatrixWorld();
    },
    get positionY(){ return camera.position.y; },
    set positionY(value){
        camera.position.y = value;
        camera.updateMatrixWorld();
    },
    get positionZ(){ return camera.position.z; },
    set positionZ(value){
        camera.position.z = value;
        camera.updateMatrixWorld();
    },
    LIMIT: 100
};
const perspectiveCameraFolder = gui.addFolder('THREE.camera')
perspectiveCameraFolder.add(cameraControls, 'near', 0, 50);
perspectiveCameraFolder.add(cameraControls, 'far', 0, 200);
perspectiveCameraFolder.add(cameraControls, 'aspect', 0, 4);
perspectiveCameraFolder.add(cameraControls, 'fov', 0, 100);
perspectiveCameraFolder.add(cameraControls, 'positionX', -cameraControls.LIMIT, cameraControls.LIMIT);
perspectiveCameraFolder.add(cameraControls, 'positionY', -cameraControls.LIMIT, cameraControls.LIMIT);
perspectiveCameraFolder.add(cameraControls, 'positionZ', -cameraControls.LIMIT, cameraControls.LIMIT);


const planeControls = {
    get positionX() { return plane.position.x },
    get positionY() { return plane.position.y },
    get positionZ() { return plane.position.z },
    set positionX(value) { plane.position.x = value; },
    set positionY(value) { plane.position.y = value; },
    set positionZ(value) { plane.position.z = value; },
    LIMIT: 200
}
const planeFolder = gui.addFolder('THREE.plane')
planeFolder.add(planeControls, 'positionX', -planeControls.LIMIT, planeControls.LIMIT);
planeFolder.add(planeControls, 'positionY', -planeControls.LIMIT, planeControls.LIMIT);
planeFolder.add(planeControls, 'positionZ', -planeControls.LIMIT, planeControls.LIMIT);

// const meshesFolder = gui.addFolder('Meshes')
// meshesFolder.add(data, 'mapsEnabled').onChange(() => {
//     material.forEach((m) => {
//         if (data.mapsEnabled) {
//             m.map = texture
//         } else {
//             m.map = null
//         }
//         m.needsUpdate = true
//     })
// })