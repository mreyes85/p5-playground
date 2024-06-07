const HEIGHT = 100;
const WIDTH = 200;
const SAND_SIZE = 1;

let grid
function setup() {
    createCanvas(WIDTH, HEIGHT)
    grid = new Grid((HEIGHT / SAND_SIZE), (WIDTH / SAND_SIZE), SAND_SIZE);
    grid.setNeighbors()
}

function mouseDragged() {
    const cell = grid.getCellByPosition(mouseX, mouseY)
    cell.setState(Cell.STATE.FALLING_SAND)
}

function draw() {
    background(0)
    grid.draw()
}