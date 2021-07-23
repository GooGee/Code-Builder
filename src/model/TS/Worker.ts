import ts from 'typescript'
import Checker from './Checker'
import Host from './Host'

export default class Worker {
    readonly diagnosticMap = new Map<number, ts.Diagnostic>()

    constructor(
        readonly checker: Checker,
        readonly fs: ts.System,
        readonly lsh: Host,
        readonly ls: ts.LanguageService,
    ) {}

    checkDiagnostic(file: string) {
        this.diagnosticMap.clear()
        const diagnosticxx = this.ls.getSemanticDiagnostics(file)
        diagnosticxx.forEach((item) => {
            if (item.start === undefined) {
                return
            }
            this.diagnosticMap.set(item.start, item)
        })
    }

    getSourceFile(fileName: string) {
        return this.ls.getProgram()?.getSourceFile(fileName)
    }
}
