import ts from 'typescript'
import Checker from './Checker'
import Host from './Host'

export default class Worker {
    constructor(
        readonly checker: Checker,
        readonly fs: ts.System,
        readonly lsh: Host,
        readonly ls: ts.LanguageService,
    ) {}

    getSourceFile(fileName: string) {
        return this.ls.getProgram()?.getSourceFile(fileName)
    }
}
