import { Event } from "./Event"

export class Change<T> {
    readonly sender: T

    constructor(sender: T) {
        this.sender = sender
    }
}

export default class Item {
    readonly BeforeChange: Event<Change<Item>> = new Event<Change<Item>>()
    readonly AfterChange: Event<Change<Item>> = new Event<Change<Item>>()
}
