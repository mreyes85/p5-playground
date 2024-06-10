class Ray {

    #length;
    #angle;
    #endingPosition;

    constructor (x, y, angle, length) {
        if (x===undefined||y===undefined) throw new Error('No initial position provided for the Ray');
        if (angle===undefined) throw new Error('No angle provided for the Ray');
        this.#length = length
        this.#angle =  angle
    }

    #calculateEndingPosition(position, walls){
        if (!this.#endingPosition) this.#endingPosition = createVector()
        this.#endingPosition.x = position.x + (this.#length * Math.cos(this.#angle))
        this.#endingPosition.y = position.y + (this.#length * Math.sin(this.#angle))
        
        let closestPoint =  null;
        let closestDistance = Infinity;
        walls.forEach(wall => {
            const point = this.intersectsAt(position, wall);
            if (!point) return;
            const distance = dist(position.x, position.y, point.x, point.y);
            if (distance >= closestDistance) return
            closestDistance = distance
            closestPoint = point
        })
        if (!closestPoint) return
        this.#endingPosition.x = closestPoint.x
        this.#endingPosition.y = closestPoint.y
    }

    intersectsAt (position, wall) {
        // Lines intersection calculations
        // https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
        const [wallFrom, wallTo] = wall.getPositions()
        const x1 = wallFrom.x
        const x2 = wallTo.x
        const y1 = wallFrom.y
        const y2 = wallTo.y

        const rayFrom = position
        const rayTo = this.#endingPosition

        const x3 = rayFrom.x
        const x4 = rayTo.x
        const y3 = rayFrom.y
        const y4 = rayTo.y
        
        const tNumerator = ((x1 - x3) * (y3 - y4)) - ((y1 - y3) * (x3 - x4))
        const uNumerator = -(((x1 - x2) * (y1 - y3)) - ((y1 - y2) * (x1 - x3)))
        const denominator = ((x1 - x2) * (y3 - y4)) - ((y1 - y2) * (x3 - x4))

        const t = tNumerator / denominator
        const u = uNumerator / denominator

        if (t < 0 || t > 1 || u < 0 || u > 1) return
        const point = createVector()
        point.x = x1 + t * (x2 - x1)
        point.y = y1 + t * (y2 - y1)
        return point
    }

    draw(position, walls){
        stroke(255);
        this.#calculateEndingPosition(position, walls)
        line(position.x, position.y, this.#endingPosition.x, this.#endingPosition.y)
    }

}

class LightSource {

    static #DEFAULT_SIZE = 100
    static #DEFAULT_LENGTH = 100
    #position;
    #rays;
    #size;
    #length;

    constructor (x, y, length, size) {
        if (x===undefined||y===undefined) throw new Error('No initial position provided for the LightSource');
        this.#position = createVector(x, y)
        this.#size = size ?? LightSource.#DEFAULT_SIZE;
        this.#length = length ?? LightSource.#DEFAULT_LENGTH;
        this.#rays = [];
        for (let i=0; i < this.#size; i++) {
            const angle = 2 * Math.PI * i / this.#size
            this.#rays.push(new Ray(x, y, angle, this.#length));
        }
    }

    clicked (x, y) {
        const distance = dist(this.#position.x, this.#position.y, x, y)
        return (distance < this.#length)
    }

    setPosition (x, y) {
        this.#position.x = x
        this.#position.y = y
    }

    draw(walls){
        for (let index = 0; index < this.#rays.length; index++) {
            const ray = this.#rays[index];
            ray.draw(this.#position, walls);
        }
    }

}