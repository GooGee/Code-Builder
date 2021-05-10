import ts from 'typescript'
import LanguageServiceHost from './LanguageServiceHost'

export default class Host extends LanguageServiceHost {
    readonly scriptVersionMap: Map<string, number> = new Map()

    constructor(
        fs: ts.System,
        compilerOptions: ts.CompilerOptions,
        files: string[],
    ) {
        super(fs, compilerOptions)

        files.forEach((file) => {
            this.scriptVersionMap.set(file, 1)
        })
    }

    getScriptFileNames(): string[] {
        return this.fs.readDirectory(this.fs.getCurrentDirectory())
    }

    getScriptVersion(fileName: string): string {
        return this.scriptVersionMap.get(fileName)?.toString() ?? '0'
    }

    getScriptSnapshot(fileName: string): ts.IScriptSnapshot | undefined {
        if (this.scriptVersionMap.has(fileName)) {
            const content = this.fs.readFile(fileName)
            if (content) {
                return ts.ScriptSnapshot.fromString(content)
            }
        }
        return
    }

    writeFile(fileName: string, content: string) {
        const old = this.fs.readFile(fileName)
        if (old === content) {
            return
        }

        super.writeFile(fileName, content)
        const version = parseInt(this.getScriptVersion(fileName)) + 1
        this.scriptVersionMap.set(fileName, version)
    }
}
