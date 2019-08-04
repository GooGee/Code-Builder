import * as ts from 'typescript'
import * as fs from 'fs'
import * as path from 'path'
import Name from './Name'
import StructureManager from './StructureManager'
import ImportManager from './ImportManager'
import { Change } from '../Item'
import { Event } from '../Event'
import TypeAliasManager from './TypeAliasManager'

const Extension = '.ts'

export class ModuleChange extends Change<Module> {

}

export default class Module extends Name {
    readonly StructureManager: StructureManager = new StructureManager
    readonly ImportManager: ImportManager = new ImportManager(this)
    readonly TypeAliasManager: TypeAliasManager = new TypeAliasManager
    readonly AfterModuleChange = new Event<ModuleChange>()
    sf: ts.SourceFile

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

    load() {
        const ll = new ListLoader
        ll.load(this.sf.statements)
        this.ImportManager.load(ll.ImportList)
        this.StructureManager.load(ll.StructureList)
        this.TypeAliasManager.load(ll.TypeList)
    }

    update(sf: ts.SourceFile) {
        this.sf = sf
        const ll = new ListLoader
        ll.load(this.sf.statements)
        this.ImportManager.update(ll.ImportList)
        this.StructureManager.update(ll.StructureList)
        this.TypeAliasManager.update(ll.TypeList)
    }

    toNode() {
        const ImportList = this.ImportManager.toNodeArray()
        const StructureList = this.StructureManager.toNodeArray()
        const TypeList = this.TypeAliasManager.toNodeArray()
        const list = ImportList.concat(TypeList, StructureList)
        return ts.updateSourceFileNode(this.sf, list)
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

export class ListLoader {
    readonly ConstantList: Array<ts.VariableStatement> = []
    readonly ImportList: Array<ts.ImportDeclaration> = []
    readonly StructureList: Array<ts.Statement> = []
    readonly TypeList: Array<ts.TypeAliasDeclaration> = []

    load(list: ReadonlyArray<ts.Statement>) {
        list.forEach(statement => {
            if (ts.isVariableStatement(statement)) {
                this.ConstantList.push(statement)
                return
            }

            if (ts.isImportDeclaration(statement)) {
                this.ImportList.push(statement)
                return
            }

            if (ts.isTypeAliasDeclaration(statement)) {
                this.TypeList.push(statement)
                return
            }

            this.StructureList.push(statement)
        })
    }
}
