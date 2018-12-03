var mainScene;

// Camera Variables
var camera;
var cFov, cAspect, cNear, cFar, cPosX, cPosY, cPosZ, cTarX, cTarY;
var controls;
var renderer;

// SpotLight Variables
var pointLight;
var plx, ply, plz; // the light's x, y, and z coordinates
var sphereSize;
var pointLightHelper;

// AmbientLight Variables
var ambientLight;
var intensity;
var ambientColor;
var ambientLightHelper;

// Cube Variables
var colorNumber; // = 0xff0000;
var colorR, colorG, colorB; // the RGB values that will be used and manipulated
var tempColorString; //The string that will concat the RGB values
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

// octohedron variables
var octohedronExists;
var oRadius, oDetail;
var octohedronGeometry;
var octohedron;

//Torus knot variabels
var torusKnot;
var tkRadius, tkTube, tkRadialSeg, tkTubularSeg;
var TorusKnotGeometry;

//This is where variables get initialized to their default values
function InitializeVars()
{
    mainScene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(90, 1, 0.1, 100);
    renderer = new THREE.WebGLRenderer();

    plx = 2;
    ply = 4;
    plz = 5;
    AddLight();

    colorR = 0;
    colorG = 0;
    colorB = 255;
    colorNumber = "rgb(" + colorR + ", " + colorG + ", " + colorB + ")";
    cubeExists = false;
    torusExists = false;
    OctohedralExists = false;

    mainScene.autoUpdate = true;
    renderer.setSize(window.innerWidth / 3, window.innerWidth / 3);
    document.body.appendChild(renderer.domElement);

    mainScene.add(camera);

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

        renderer.render(mainScene, camera);
    };

    animate();
    
}

function AddLight()
{
    pointLight = new THREE.PointLight(0xffffff, 5, 100);
    pointLight.position.set(plx, ply, plz);
    sphereSize = 1;
    mainScene.add(pointLight);

    //ambientLight = new THREE.AmbientLight(0xffffff, 4);
    //ambientLight.position.set(0, 3, 4);
    //mainScene.add(ambientLight);

    pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
    mainScene.add(pointLightHelper);
}

function RemoveLight()
{
    mainScene.remove(pointLight);
    //mainScene.remove(ambientLight);
    mainScene.remove(pointLightHelper);
}

function LightMoveLeft()
{
    plx -= 0.5;
    RemoveLight();
    AddLight();
}

function LightMoveRight()
{
    plx += 0.5;
    RemoveLight();
    AddLight();
}

function LightMoveBackward()
{
    plz += 0.5;
    RemoveLight();
    AddLight();
}

function LightMoveForward()
{
    plz -= 0.5;
    RemoveLight();
    AddLight();
}

function LightHeightUp()
{
    ply += 0.5;
    RemoveLight();
    AddLight();
}

function LightHeightDown()
{
    ply -= 0.5;
    RemoveLight();
    AddLight();
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
        colorNumber = "rgb(" + colorR + ", " + colorG + ", " + colorB + ")";
        material = new THREE.MeshStandardMaterial({ color: colorNumber });

        cWidth = cHeight = cDepth = 3;
        cubeGeometry = new THREE.BoxGeometry(cWidth, cHeight, cDepth, 2, 2, 2);
        cube = new THREE.Mesh(cubeGeometry, material);
        
        mainScene.add(cube);
        RemoveLight();
        AddLight();
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
        colorNumber = "rgb(" + colorR + ", " + colorG + ", " + colorB + ")";
        material = new THREE.MeshStandardMaterial({ color: colorNumber });

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
        colorNumber = "rgb(" + colorR + ", " + colorG + ", " + colorB + ")";
        material = new THREE.MeshStandardMaterial({ color: colorNumber });

        oRadius = 5;
        oDetail = 0;

        octohedronGeometry = new THREE.OctahedronGeometry(oRadius, oDetail);
        octohedron = new THREE.Mesh(octohedronGeometry, material);

        mainScene.add(octohedron);
        octohedronExists = true;
    }
}

function adjustCamera()
{
    mainScene.remove(camera);

    camera = new THREE.PerspectiveCamera(90, 1, 0.1, 100);
    camera.position.set(cPosX, cPosY, cPosZ);

    mainScene.add(camera);
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
        case 0xffff00:
            {
                colorNumber = 0x00ffff;
                break;
            }
        case 0x00ffff:
            {
                colorNumber = 0xff00ff;
                break;
            }
        case 0xff00ff:
            {
                colorNumber = 0xffff00;
                break;
            }
    }

    //colorNumber = new THREE.color(colorNumber);
    material = new THREE.MeshStandardMaterial({ color: colorNumber });


    if (cubeExists)
    {
        var temp = cube.rotation;
        mainScene.remove(cube);
        cubeExists = false;
        cube = new THREE.Mesh(cubeGeometry, material);
        cube.rotation += temp;
        mainScene.add(cube);
        cubeExists = true;
    }
    if (torusExists)
    {
        var temp2 = torus.rotation;
        mainScene.remove(torus);
        torusExists = false;
        torus = new THREE.Mesh(torusGeometry, material);
        torus.rotation += temp2;
        mainScene.add(torus);
        torusExists = true;
    }
    if (octohedronExists)
    {
        var temp3 = octohedron.rotation;
        mainScene.remove(octohedron);
        octohedronExists = false;
        octohedron = new THREE.Mesh(octohedronGeometry, material);
        octohedron.rotation += temp3;
        mainScene.add(octohedron);
        octohedronExists = true;
    }
}

function recreateShape()
{
    colorNumber = "rgb(" + colorR + ", " + colorG + ", " + colorB + ")";

    material = new THREE.MeshStandardMaterial({ color: colorNumber });


    if (cubeExists) {
        var temp = cube.rotation;
        mainScene.remove(cube);
        cubeExists = false;
        cube = new THREE.Mesh(cubeGeometry, material);
        cube.rotation += temp;
        mainScene.add(cube);
        cubeExists = true;
    }
    if (torusExists) {
        var temp2 = torus.rotation;
        mainScene.remove(torus);
        torusExists = false;
        torus = new THREE.Mesh(torusGeometry, material);
        torus.rotation += temp2;
        mainScene.add(torus);
        torusExists = true;
    }
    if (octohedronExists) {
        var temp3 = octohedron.rotation;
        mainScene.remove(octohedron);
        octohedronExists = false;
        octohedron = new THREE.Mesh(octohedronGeometry, material);
        octohedron.rotation += temp3;
        mainScene.add(octohedron);
        octohedronExists = true;
    }
}

function MoveRedColorUp()
{
    colorR += 32;

    if (colorR > 255)
    {
        colorR = 0;
    }
    recreateShape();
}

function MoveGreenColorUp()
{
    colorG += 32;
    if (colorG > 255)
    {
        colorG = 0;
    }
    recreateShape();
}

function MoveBlueColorUp()
{
    colorB += 32;
    if (colorB > 255)
    {
        colorB = 0;
    }
    recreateShape();
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
    cPosY += 0.5;
    adjustCamera();
}

function CameraMoveLeft()
{
    cPosX -= 0.5;
    adjustCamera();
}

function CameraHeightDown()
{
    cPosY -= 0.5;
    adjustCamera();
}

function CameraMoveRight()
{
    cPosX += 0.5;
    adjustCamera();
}

function CameraMoveForward()
{
    cPosZ -= 0.5;
    adjustCamera();
}

function CameraMoveBackward()
{
    cPosZ += 0.5;
    adjustCamera();
}

function rotateCamera()
{
    //cTarX = MOUSE.LEFT.valueOf(MOUSE.movementX);
    //cTarY = MOUSE.LEFT.valueOf(MOUSE.movementY);

    cTarX = camera.getWorldDirection().x;
    cTarY = camera.getWorldDirection().y;
    
}