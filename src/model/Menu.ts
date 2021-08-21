export default class Menu {
    readonly list: Menu[] = []

    constructor(
        readonly title: string,
        readonly cb: CallBack,
        readonly disabled = false,
        readonly isDivider = false,
        readonly isParent = false,
    ) {}

    get empty() {
        return this.list.length === 0
    }
}

export interface CallBack {
    (): void
}
