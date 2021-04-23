import ts from 'typescript'
import {
    createSystem,
    createVirtualTypeScriptEnvironment,
} from '@typescript/vfs'

export default class Worker {
    private readonly env

    constructor(
        files: Map<string, string>,
        rootFiles: string[],
        compilerOptions: ts.CompilerOptions,
    ) {
        const vfs = createSystem(files)
        this.env = createVirtualTypeScriptEnvironment(
            vfs,
            rootFiles,
            ts,
            compilerOptions,
        )
    }

    createFile(fileName: string, content: string) {
        return this.env.createFile(fileName, content)
    }

    get fs() {
        return this.env.sys
    }

    get ls() {
        return this.env.languageService
    }

    getSourceFile(fileName: string) {
        return this.env.getSourceFile(fileName)
    }

    updateFile(fileName: string, content: string) {
        return this.env.updateFile(fileName, content)
    }
}
