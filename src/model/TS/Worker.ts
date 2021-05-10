import ts from 'typescript'
import { createSystem } from '@typescript/vfs'
import Host from './Host'

export default class Worker {
    readonly fs
    readonly ls
    readonly lsh

    constructor(
        fileMap: Map<string, string>,
        compilerOptions: ts.CompilerOptions,
        files: string[],
    ) {
        this.fs = createSystem(fileMap)
        const host = new Host(this.fs, compilerOptions, files)
        this.lsh = host
        // const {
        //     languageServiceHost,
        //     updateFile,
        // } = createVirtualLanguageServiceHost(
        //     this.fs,
        //     Array.from(files.keys()),
        //     compilerOptions,
        //     ts,
        // )
        this.ls = ts.createLanguageService(host)
    }

    getSourceFile(fileName: string) {
        return this.ls.getProgram()?.getSourceFile(fileName)
    }
}
