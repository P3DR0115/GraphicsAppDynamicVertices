var mainScene;

// Camera Variables
var camera;
var cFov, cAspect, cNear, cFar, cPosX, cPosY, cPosZ;
var controls;
var renderer;

// SpotLight Variables
var pointLight;
var sphereSize;
var pointLightHelper;

// Cube Variables
var colorNumber; // = 0xff0000;
var material;

var cubeExists;
var cWidth, cHeight, cDepth;
var cubeGeometry; 
var cube;

var wWidth, wHeight, wDepth;
var wallGeometry;
var wall;

var modelXSpeed;
var modelYSpeed;

// Torus Vairables
var torusExists;
var tRadius, tTube, tRadialSeg, tTubularSeg, tArc;
var torusGeometry;
var torus;

var octohedronExists;
var oRadius, oDetail;
var octohedronlGeometry;
var octohedron;

//This is where variables get initialized to their default values
function InitializeVars()
{
    mainScene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, 1, 0.1, 100);
    renderer = new THREE.WebGLRenderer();

    pointLight = new THREE.PointLight(0x0000ff, 10, 100);
    pointLight.position.set(0, 1, 3.1);
    mainScene.add(pointLight);
    sphereSize = 1;
    pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
    mainScene.add(pointLightHelper);
    
    //cubeGeometry.colors[0] = new THREE.Color(0, 255, 255);
    //cubeGeometry.colors[1] = new THREE.Color(255, 0, 255);

    //colorNumber = 0xffff00;
    //material = new THREE.MeshBasicMaterial({ color: colorNumber });
    //wWidth = wHeight = 6; wDepth = 1;
    //wallGeometry = new THREE.BoxGeometry(wWidth, wHeight, wDepth, 2, 2, 2);
    //wall = new THREE.Mesh(wallGeometry, material);
    cubeExists = false;
    torusExists = false;
    OctohedralExists = false;

    mainScene.autoUpdate = true;
    renderer.setSize(window.innerWidth / 3, window.innerWidth / 3);
    document.body.appendChild(renderer.domElement);

    mainScene.add(camera);
    //controls = new THREE.OrbitControls(camera);
    //mainScene.add(controls);
    cPosX = cPosY = 0;
    cPosZ = 10;
    camera.position.z = cPosZ;
    //mainScene.add(wall);

    modelXSpeed = 0.00;
    modelYSpeed = 0.00;
}

function main()
{
    InitializeVars();

    var animate = function ()
    {
        requestAnimationFrame(animate);

        if (cubeExists) {
            cube.rotation.x += modelXSpeed;
            cube.rotation.y += modelYSpeed;
        }
        else if (torusExists)
        {
            torus.rotation.x += modelXSpeed;
            torus.rotation.y += modelYSpeed;
        }
        else if (octohedronExists)
        {
            octohedron.rotation.x += modelXSpeed;
            octohedron.rotation.y += modelYSpeed;
        }

        //MoveColorUp();

        renderer.render(mainScene, camera);
    };

    animate();
    
}

function CubeSelect()
{
    if (torusExists)
    {
        mainScene.remove(torus);
        torusExists = false;
    }
    if (octohedronExists)
    {
        mainScene.remove(octohedron);
        octohedronExists = false;
    }
    if (!cubeExists)
    {
        colorNumber = 0xff0000;
        material = new THREE.MeshBasicMaterial({ color: colorNumber });

        cWidth = cHeight = cDepth = 3;
        cubeGeometry = new THREE.BoxGeometry(cWidth, cHeight, cDepth, 2, 2, 2);
        cube = new THREE.Mesh(cubeGeometry, material);

        mainScene.add(cube);
        cubeExists = true;
    }
}

function TorusSelect()
{
    if (cubeExists)
    {
        mainScene.remove(cube);
        cubeExists = false;
    }
    if (octohedronExists)
    {
        mainScene.remove(octohedron);
        octohedronExists = false;
    }
    if (!torusExists)
    {
        colorNumber = 0x005555;
        material = new THREE.MeshBasicMaterial({ color: colorNumber });

        tRadius = 5;
        tTube = 1;
        tRadialSeg = 24;
        tTubularSeg = 24;
        tArc = 8;
        torusGeometry = new THREE.TorusGeometry(tRadius, tTube, tRadialSeg, tTubularSeg);//, tArc);
        torus = new THREE.Mesh(torusGeometry, material);

        mainScene.add(torus);
        torusExists = true;
    }
}

function OctohedronSelect()
{
    if (cubeExists)
    {
        mainScene.remove(cube);
        cubeExists = false;
    }
    if (torusExists)
    {
        mainScene.remove(torus);
        torusExists = false;
    }
    if (!octohedronExists)
    {
        colorNumber = 0xff00ff;
        material = new THREE.MeshBasicMaterial({ color: colorNumber });

        oRadius = 5;
        oDetail = 0;

        octohedronlGeometry = new THREE.OctahedronGeometry(oRadius, oDetail);
        octohedron = new THREE.Mesh(octohedronlGeometry, material);

        mainScene.add(octohedron);
        octohedronExists = true;
    }
}

function adjustCamera()
{
    camera.position.x = cPosX;
    camera.position.y = cPosY;
    camera.position.z = cPosZ;

    camera.position.set(cPosX, cPosY, cPosZ);
    //controls.update();
}

function MoveColorUp()
{
    //var temp = colorNumber.toString();

    var tempColor;
    var tempmaterial; // = new THREE.MeshBasicMaterial({ color: colorNumber });

    switch (colorNumber)
    {
        case 0xff0000:
            {
                colorNumber = 0x00ff00;
                break;
            }
        case 0x00ff00:
            {
                colorNumber = 0x0000ff;
                break;
            }
        case 0x0000ff:
            {
                colorNumber = 0xff0000;
                break;
            }
    }
    //colorNumber = new THREE.color(colorNumber);
    //tempmaterial = new THREE.MeshBasicMaterial({ color: tempColor });
    material = material.color.set(colorNumber); //new THREE.MeshBasicMaterial({ color: colorNumber });
    //cube = new THREE.Mesh(cubeGeometry, material);
    cubeGeometry.elementsNeedUpdate = true;
    cubeGeometry.colorsNeedUpdate = true;

}

function XSpeedUp()
{
    modelXSpeed += 0.01;
}

function XSpeedDown()
{
    modelXSpeed -= 0.01;
}

function YSpeedUp()
{
    modelYSpeed += 0.01;
}

function YSpeedDown()
{
    modelYSpeed -= 0.01;
}

function CameraHeightUp()
{
    cHeight += 0.5;
    adjustCamera();
}

function CameraHeightDown()
{
    cHeight -= 0.5;
    adjustCamera();
}