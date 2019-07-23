import * as ts from 'typescript'
import * as fs from 'fs'
import * as path from 'path'
import Name from './Name'
import StructureManager from './StructureManager'
import ImportManager from './ImportManager'
import { Change } from '../Item'
import { Event } from '../Event'

const Extension = '.ts'

export class ModuleChange extends Change<Module> {

}

export default class Module extends Name {
    readonly StructureManager: StructureManager = new StructureManager
    readonly ImportManager: ImportManager = new ImportManager(this)
    sf: ts.SourceFile
    readonly AfterModuleChange = new Event<ModuleChange>()

    constructor(sf: ts.SourceFile) {
        super(Module.BaseName(sf.fileName))
        this.sf = sf
    }

    get path(): string {
        return this.sf.fileName
    }

    get source() {
        return this.sf
    }

    private loadStatement(statement: ts.Statement) {
        switch (statement.kind) {
            case ts.SyntaxKind.ClassDeclaration:
                this.StructureManager.loadClass(statement as ts.ClassDeclaration)
                break

            case ts.SyntaxKind.EnumDeclaration:
                this.StructureManager.loadEnum(statement as ts.EnumDeclaration)
                break

            case ts.SyntaxKind.InterfaceDeclaration:
                this.StructureManager.loadInterface(statement as ts.InterfaceDeclaration)
                break

            case ts.SyntaxKind.ImportDeclaration:
                this.ImportManager.load(statement as ts.ImportDeclaration)
                break

            default:
                break
        }
    }

    load() {
        this.sf.statements.forEach(statement => {
            this.loadStatement(statement)
        })
    }

    update(sf: ts.SourceFile) {
        this.sf = sf
        let importList: ts.ImportDeclaration[] = []
        let typeList: ts.Statement[] = []
        this.sf.statements.forEach(statement => {
            if (statement.kind == ts.SyntaxKind.ImportDeclaration) {
                importList.push(statement as ts.ImportDeclaration)
            } else {
                typeList.push(statement)
            }
        })

        importList.forEach(item => {
            this.ImportManager.update(item)
        })

        typeList.forEach(item => {
            this.StructureManager.update(item)
        })
    }

    toNode() {
        const ImportList = this.ImportManager.toNodeArray()
        const TypeList = this.StructureManager.toNodeArray()
        return ts.updateSourceFileNode(this.sf, ImportList.concat(TypeList))
    }

    save() {
        const printer = ts.createPrinter()
        this.sf = this.toNode()
        const string = printer.printFile(this.sf)
        // console.log(string)
        fs.writeFileSync(this.path, string)

        this.AfterModuleChange.emit(new ModuleChange(this))
    }

    static makeFileName(name: string, path?: string): string {
        if (path) {
            return `${path}/${name}${Extension}`
        }
        return `${name}${Extension}`
    }

    static BaseName(file: string) {
        return path.basename(file, Extension)
    }

}
