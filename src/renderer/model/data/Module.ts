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
        const ImportList: Array<ts.ImportDeclaration> = []
        const StatementList: Array<ts.Statement> = []
        this.sf.statements.forEach(statement => {
            if (ts.isImportDeclaration(statement)) {
                ImportList.push(statement)
            } else {
                StatementList.push(statement)
            }
        })
        this.ImportManager.load(ImportList)
        this.StructureManager.load(StatementList)
    }

    update(sf: ts.SourceFile) {
        this.sf = sf
        const ImportList: Array<ts.ImportDeclaration> = []
        const StatementList: Array<ts.Statement> = []
        this.sf.statements.forEach(statement => {
            if (ts.isImportDeclaration(statement)) {
                ImportList.push(statement)
            } else {
                StatementList.push(statement)
            }
        })
        this.ImportManager.update(ImportList)
        this.StructureManager.update(StatementList)
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
