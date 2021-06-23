import ts from 'typescript'

export default abstract class LanguageServiceHost
    implements ts.LanguageServiceHost
{
    constructor(
        readonly fs: ts.System,
        readonly compilerOptions: ts.CompilerOptions,
    ) {}

    fileExists(path: string): boolean {
        return this.fs.fileExists(path)
    }

    getCompilationSettings(): ts.CompilerOptions {
        return this.compilerOptions
    }

    getCurrentDirectory(): string {
        return this.fs.getCurrentDirectory()
    }

    getDefaultLibFileName(options: ts.CompilerOptions): string {
        return ts.getDefaultLibFileName(options)
    }

    getDirectories(directoryName: string): string[] {
        return this.fs.getDirectories(directoryName)
    }

    readDirectory(
        path: string,
        extensions?: readonly string[],
        exclude?: readonly string[],
        include?: readonly string[],
        depth?: number,
    ): string[] {
        return this.fs.readDirectory(path, extensions, exclude, include, depth)
    }

    readFile(path: string, encoding?: string): string | undefined {
        return this.fs.readFile(path, encoding)
    }

    // realpath(path: string): string {
    //     return this.fs.realpath(path)
    // }

    useCaseSensitiveFileNames(): boolean {
        return this.fs.useCaseSensitiveFileNames
    }

    writeFile(fileName: string, content: string) {
        this.fs.writeFile(fileName, content)
    }

    abstract getScriptFileNames(): string[]
    abstract getScriptVersion(fileName: string): string
    abstract getScriptSnapshot(fileName: string): ts.IScriptSnapshot | undefined
}
