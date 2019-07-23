import { Event } from "./Event"

export enum BracketKind {
    None,
    Curly,
    Pointy,
    Round,
    Square
}

export class ListChange<T> {
    readonly item: T
    readonly isAdd: boolean
    readonly sender: Manager<T>

    constructor(item: T, isAdd: boolean, sender: Manager<T>) {
        this.item = item
        this.isAdd = isAdd
        this.sender = sender
    }
}

export default class Manager<T> {
    readonly BeforeListChange = new Event<ListChange<T>>()
    readonly AfterListChange = new Event<ListChange<T>>()
    readonly list: T[] = []

    add(item: T) {
        this.insertAt(this.list.length, item)
    }

    clear() {
        this.list.splice(0, this.list.length)
    }

    insert(newItem: T, item: T) {
        let index = this.list.indexOf(item)
        this.insertAt(index, newItem)
    }

    insertAt(index: number, item: T) {
        if (index > -1) {
            let ea = new ListChange<T>(item, true, this)
            this.BeforeListChange.emit(ea)
            this.list.splice(index, 0, item)
            this.AfterListChange.emit(ea)
        }
    }

    moveUp(item: T) {
        let index = this.list.indexOf(item)
        if (index > 0) {
            this.remove(item)
            this.insertAt(index - 1, item)
        }
    }

    moveDown(item: T) {
        let index = this.list.indexOf(item)
        if (index > -1) {
            if (index < this.list.length - 1) {
                this.remove(item)
                this.insertAt(index + 1, item)
            }
        }
    }

    remove(item: T) {
        let index = this.list.indexOf(item)
        if (index > -1) {
            let ea = new ListChange<T>(item, false, this)
            this.BeforeListChange.emit(ea)
            this.list.splice(index, 1)
            this.AfterListChange.emit(ea)
        }
    }

}
