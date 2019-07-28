import * as ts from 'typescript'
import * as fs from 'fs'
import ModuleManager from './data/ModuleManager'
import Checker from './Checker'

export const ProjectPath = 'project'

export default class Project {
    name: string
    static readonly PointSign: string = '∙'
    readonly option: ts.CompilerOptions = {
        lib: ['es6'],
        module: ts.ModuleKind.CommonJS,
        moduleResolution: ts.ModuleResolutionKind.NodeJs,
        target: ts.ScriptTarget.ES2015
    }
    readonly ModuleManager: ModuleManager = new ModuleManager(this)
    private program: ts.Program | null = null
    private host: ts.CompilerHost
    private _checker: Checker | null = null

    get checker() {
        return this._checker!
    }

    constructor(name: string) {
        this.name = name
        this.makeFolder()
        this.host = ts.createCompilerHost(this.option)
    }

    get projectPath(): string {
        return `${ProjectPath}/${this.name}`
    }

    get codePath(): string {
        return `${this.projectPath}/src`
    }

    getSourceFile(name: string) {
        return this.program!.getSourceFile(name)
    }

    get fileList(): Array<string> {
        const list: Array<string> = []
        const path = this.codePath
        const fileList: Array<string> = fs.readdirSync(path)
        fileList.forEach(file => {
            list.push(`${path}/${file}`)
        })
        return list
    }

    find(file: string) {
        const sf = this.program!.getSourceFile(file)
        return sf
    }

    private makeFolder() {
        if (!fs.existsSync(this.projectPath)) {
            fs.mkdirSync(this.projectPath)
        }
        if (!fs.existsSync(this.codePath)) {
            fs.mkdirSync(this.codePath)
        }
    }

    update() {
        const list: Array<string> = this.fileList
        this.program = ts.createProgram(
            list,
            this.option,
            this.host,
            this.program!
        )
        this._checker = new Checker(this.program)
        this.ModuleManager.update(list)
    }

    save() {
        this.makeFolder()

        this.ModuleManager.save()
    }

    private loadModule() {
        const list: Array<string> = this.fileList
        this.program = ts.createProgram(list, this.option, this.host)
        this._checker = new Checker(this.program)
        this.ModuleManager.load(list)
    }

    static load(name: string) {
        const project = new Project(name)
        project.loadModule()
        return project
    }

}
