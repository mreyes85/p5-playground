class Cell {
    
    static STATE = {
        EMPTY: Symbol('0'),
        FALLING_SAND: Symbol('1'),
        STATIC_SAND: Symbol('2'),
    }

    static NEIGHBOR = {
        TOP_LEFT: Symbol(),
        TOP: Symbol(),
        TOP_RIGHT: Symbol(),
        LEFT: Symbol(),
        RIGHT: Symbol(),
        BOTTOM_LEFT: Symbol(),
        BOTTOM: Symbol(),
        BOTTOM_RIGHT: Symbol(),
    }

    static COLOR = {
        DEFAULT: '#000',
        ACTIVE: '#C2B280'
    }

    #state;
    #nextState;
    #neighbors;
    #color;

    constructor (x, y, size) {
        this.x = x
        this.y = y
        this.size = size
        this.#state = Cell.STATE.EMPTY
        this.#nextState = Cell.STATE.EMPTY
        this.#neighbors = new Map()
        this.#color = Cell.COLOR.DEFAULT
    }

    setState (state) {
        this.#state = state
        this.#color = (this.#state===Cell.STATE.EMPTY) ? Cell.COLOR.DEFAULT : Cell.COLOR.ACTIVE
    }

    setNextState (state) {
        this.#nextState = state
    }

    updateState () {
        this.setState(this.#nextState)
    }

    addNeighbor (type, cell) {
        this.#neighbors.set(type, cell)
    }

    #fall () {
        const bottomNeighbor = this.#neighbors.get(Cell.NEIGHBOR.BOTTOM)
        if (!bottomNeighbor) {
            this.setNextState(Cell.STATE.STATIC_SAND)
            return
        }

        if (bottomNeighbor.#state!==Cell.STATE.STATIC_SAND) {
            bottomNeighbor.setNextState(this.#state)
            this.setNextState(Cell.STATE.EMPTY)
            return
        }

        const bottomLeftNeighbor = this.#neighbors.get(Cell.NEIGHBOR.BOTTOM_LEFT)
        if (bottomLeftNeighbor&&bottomLeftNeighbor.#state!==Cell.STATE.STATIC_SAND) {
            bottomLeftNeighbor.setNextState(this.#state)
            this.setNextState(Cell.STATE.EMPTY)
            return
        }

        const bottomRightNeighbor = this.#neighbors.get(Cell.NEIGHBOR.BOTTOM_RIGHT)
        if (bottomRightNeighbor&&bottomRightNeighbor.#state!==Cell.STATE.STATIC_SAND) {
            bottomRightNeighbor.setNextState(this.#state)
            this.setNextState(Cell.STATE.EMPTY)
            return
        }

        this.setNextState(Cell.STATE.STATIC_SAND)
    }

    update () {
        if (this.#state!==Cell.STATE.FALLING_SAND) return
        if (this.x===1 && this.y===1)debugger
        this.#fall()
    }

    draw () {
        noStroke()
        fill(this.#color)
        square(this.x * this.size, this.y * this.size, this.size)
    }

}