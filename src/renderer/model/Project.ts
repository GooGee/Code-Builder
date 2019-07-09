import * as ts from 'typescript'
import * as fs from 'fs'
import ModuleManager from './data/ModuleManager'
import Node from './Node'
import { TypeName } from './data/TypeChain'
import Module from './data/Module'
import { Builder } from './Builder'

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
    private host: ts.CompilerHost | null = null
    private _checker: ts.TypeChecker | null = null

    get checker() {
        return this._checker!
    }

    set checker(checker: ts.TypeChecker) {
        this._checker = checker
    }

    constructor(name: string) {
        this.name = name
        this.makeFolder()
    }

    get projectPath(): string {
        return `${ProjectPath}/${this.name}`
    }

    get codePath(): string {
        return `${this.projectPath}/src`
    }

    get fileList(): string[] {
        let list: string[] = []
        let path = this.codePath
        let fileList: string[] = fs.readdirSync(path)
        fileList.forEach(file => {
            list.push(`${path}/${file}`)
        })
        return list
    }

    get AmbientModuleList() {
        return this.checker.getAmbientModules()
    }

    /**
     * get export types of module
     * @param type 
     * @param builder 
     */
    getExportList(type: TypeName, builder: Builder) {
        // do not know how to do it yet
        if (type.isSingle) {
            let mmm = builder.project!.ModuleManager.find(type.name)
            if (mmm) {
                return mmm.TypeManager.list
            }
        }
        return []
    }

    /**
     * get Parameter List of Constructor
     * @param node 
     */
    getArgumentList(node: TypeName) {
        let signature = this.getTypeSignature(node)
        if (signature) {
            return signature.parameters
        }
        return []
    }

    /**
     * get Parameter List of Method
     * @param node 
     */
    getCallArgumentList(node: Node) {
        let signature = this.getCallSignature(node)
        if (signature) {
            return signature.parameters
        }
        return []
    }

    getCallSignature(node: Node) {
        let ttt = this.getType(node)
        let list = ttt.getCallSignatures()
        if (list.length) {
            return list[0]
        }
        return null
    }

    /**
     * get generic types of type
     * @param node 
     */
    getGenericList(node: TypeName) {
        let type = this.getType(node) as any
        // basic type
        if (type.intrinsicName) {
            return []
        }

        let symbol = this.getSymbol(node)
        if (symbol) {
            let declaration = symbol.valueDeclaration
            if (ts.isClassDeclaration(declaration)) {
                // user made generic type
                let list = declaration.typeParameters
                if (list) {
                    return list
                }
            }

            let sss = symbol as any
            if (sss.declaredType) {
                // Array
                let dt = sss.declaredType
                if (dt.typeParameters) {
                    return dt.typeParameters
                }
            }
        }

        // Map Set
        if (type.typeParameters) {
            return type.typeParameters as ReadonlyArray<ts.TypeParameter>
        }
        return []
    }

    getPropertyList(node: Node) {
        let type = this.getType(node)
        return type.getProperties()
    }

    getSymbol(node: Node) {
        return this.checker.getSymbolAtLocation(node.source!)
    }

    getType(node: Node) {
        return this.checker.getTypeAtLocation(node.source!)
    }

    getTypeList(node: Module) {
        let list: any[] = node.TypeManager.list
        return list.concat(ESTypeList)
        // too many useless Types
        return this.checker.getSymbolsInScope(node.source!, ts.SymbolFlags.Type)
    }

    getTypeSignature(node: TypeName) {
        let ttt = this.getType(node)
        let sss = this.checker.getTypeOfSymbolAtLocation(ttt.symbol, node.source!)
        let list = sss.getConstructSignatures()
        if (list.length) {
            return list[0]
        }
        return null
    }

    getVariableList(node: Node) {
        return this.checker.getSymbolsInScope(node.source!, ts.SymbolFlags.Variable)
    }

    find(file: string) {
        let sf = this.program!.getSourceFile(file)
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
        this.program = ts.createProgram(
            this.fileList,
            this.option,
            this.host!,
            this.program!
        )
        this.checker = this.program.getTypeChecker()

        let list: string[] = this.fileList
        list.forEach(file => {
            let sf = this.program!.getSourceFile(file)
            this.ModuleManager.update(sf!)
        })
    }

    save() {
        this.makeFolder()

        this.ModuleManager.save()
    }

    private loadModule() {
        let list: string[] = this.fileList
        this.host = ts.createCompilerHost(this.option)
        this.program = ts.createProgram(list, this.option, this.host)
        this.checker = this.program.getTypeChecker()
        // this.program.getSourceFiles().forEach(sf => {
        //     console.log(sf.fileName)
        // })
        list.forEach(file => {
            let sf = this.program!.getSourceFile(file)
            if (!sf) {
                throw `${file} does not exists!`
            }
            this.ModuleManager.load(sf)
        })
    }

    static load(name: string) {
        // let data = JSON.parse(fs.readFileSync(path, 'utf8'))
        let project = new Project(name)
        project.loadModule()
        return project
    }

}

const TypeList = [
    'Array',
    'Boolean',
    'Console',
    'Date',
    'Function',
    'Generator',
    'Iterable',
    'Iterator',
    'JSON',
    'Map',
    'Math',
    'Number',
    'Object',
    'Set',
    'String',
    'Symbol'
]

class ESType {
    name: string

    constructor(name: string) {
        this.name = name
    }
}

const ESTypeList: ESType[] = []
TypeList.forEach(name => {
    ESTypeList.push(new ESType(name))
})
