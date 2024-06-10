class Wall {

    #from;
    #to;
    #color;

    constructor (startX, startY, endX, endY, color) {
        this.#from = createVector(startX, startY);
        this.#to = createVector(endX, endY);
        this.#color = color ?? 255;
    }

    getPositions () {
        return [this.#from, this.#to]
    }

    draw () {
        stroke(this.#color);
        line(this.#from.x, this.#from.y, this.#to.x, this.#to.y);
    }

}