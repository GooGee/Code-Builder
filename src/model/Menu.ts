export default class Menu {
    readonly list: Menu[] = []

    constructor(
        readonly title: string,
        readonly cb: CallBack,
        readonly disabled = false,
        readonly isDivider = false,
    ) {}
}

export interface CallBack {
    (): void
}
