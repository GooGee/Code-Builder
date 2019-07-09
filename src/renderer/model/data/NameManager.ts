import Name, { NameChange } from "./Name"
import Manager from "../Manager"
import { EventListener } from "../Event"

export default class NameManager<T extends Name> extends Manager<T> {
    readonly list: T[] = []
    readonly listener = new EventListener<NameChange>(ea => {
        this.throwIfExist(ea.newName)
    })

    add(item: T) {
        this.throwIfExist(item.name)
        this.listener.listen(item.BeforeNameChange)
        super.add(item)
    }

    find(name: string): T | undefined {
        return this.list.find(item => item.name == name)
    }

    protected throwIfExist(name: string) {
        if (this.find(name)) {
            throw name + ' already exists!'
        }
    }

    remove(item: T) {
        let index = this.list.indexOf(item)
        if (index > -1) {
            this.listener.ignore(item.BeforeNameChange)
            super.remove(item)
        }
    }

}
