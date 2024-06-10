const HEIGHT = 1000;
const WIDTH = 1000;
const CAST_LENGTH = 800;
const CAST_RAYS = 1000;

let lightSources = [];
let walls = [];
let draggedLightSource;

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function setup () {
    createCanvas(WIDTH, HEIGHT);
    for (let i=0; i<5; i++){
        walls.push(new Wall(getRandomIntInclusive(0, WIDTH), getRandomIntInclusive(0, HEIGHT), getRandomIntInclusive(0, WIDTH), getRandomIntInclusive(0, HEIGHT)))
    }
}

function mousePressed () {
    draggedLightSource = lightSources.find(light => light.clicked(mouseX, mouseY));
    if (!draggedLightSource) lightSources.push(new LightSource(mouseX, mouseY, CAST_LENGTH, CAST_RAYS));
}

function mouseDragged() {
    if (!draggedLightSource) return;
    draggedLightSource.setPosition(mouseX, mouseY);
}

function mouseReleased () {
    draggedLightSource = undefined;
}

function draw () {
    background(0);
    for (let index = 0; index < walls.length; index++) {
        walls[index].draw();
    }
    for (let index = 0; index < lightSources.length; index++) {
        lightSources[index].draw(walls);
    }
}