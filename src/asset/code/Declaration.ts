enum Direction {
    East = 0,
    West,
    North,
    South,
}

interface IName {
    name: string
    text(name: string): string
}

abstract class Parent implements IName {
    readonly key: string = 'key'
    name: string = ''
    text(name: string): string {
        return name
    }
}

export class Child<T extends Parent, K> extends Parent implements IName {
    optional?: boolean
    constructor(name?: string) {
        super()
        delete this.optional
    }
}

function show<T, K>(text: string = ''): void {
    return
}
