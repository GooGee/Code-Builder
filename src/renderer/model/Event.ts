
export class Event<T> {
    readonly list: Listener<T>[] = []

    emit = (EventArgument: T) => {
        this.list.forEach((listener) => listener.handle(EventArgument))
    }

}

export abstract class Listener<T> {
    listen(event: Event<T>) {
        event.list.push(this)
    }

    ignore(event: Event<T>) {
        let index = event.list.indexOf(this)
        if (index > -1) {
            event.list.splice(index, 1)
        }
    }

    abstract handle(EventArgument: T): void
}

export class EventListener<T> extends Listener<T> {

    constructor(handle: (EventArgument: T) => void) {
        super()
        this.handle = handle
    }

    handle(EventArgument: T) {

    }

}
