import Worker from './TS/Worker'

export default class Vendor {
    constructor(readonly worker: Worker, readonly file: string) {}

    get sf() {
        // console.log(this.worker.lsh.getScriptVersion(this.file))
        return this.worker.getSourceFile(this.file)!
    }
}
