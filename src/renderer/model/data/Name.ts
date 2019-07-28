import { Event } from "../Event"

export class NameChange {
    readonly newName: string
    readonly oldName: string
    readonly sender: Name

    constructor(newName: string, oldName: string, sender: Name) {
        this.newName = newName
        this.oldName = oldName
        this.sender = sender
    }
}

export default abstract class Name {
    protected _name: string
    readonly BeforeNameChange: Event<NameChange> = new Event<NameChange>()
    readonly AfterNameChange: Event<NameChange> = new Event<NameChange>()

    constructor(name: string) {
        this.name = name
        this._name = name
    }

    static valid(name: string): boolean {
        if (name) {
            if (name.match(/^[a-z_A-Z][a-z_A-Z\d]*$/)) {
                return true
            }
        }

        return false
    }

    static throwIfInvalid(name: string) {
        if (Name.valid(name)) {
            return
        }
        throw 'Invalid name: ' + name
    }

    get name(): string {
        return this._name
    }

    set name(name: string) {
        Name.throwIfInvalid(name)
        if (this._name == name) {
            return
        }
        const old = this._name
        const event = new NameChange(name, old, this)
        this.BeforeNameChange.emit(event)
        this._name = name
        this.AfterNameChange.emit(event)
    }

}
