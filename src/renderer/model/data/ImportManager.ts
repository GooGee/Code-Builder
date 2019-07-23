import * as ts from 'typescript'
import * as path from 'path'
import Import, { ImportClause } from './Import'
import NameManager from './NameManager'
import Module from './Module'

export default class ImportManager extends NameManager<Import> {
    module: Module

    constructor(module: Module) {
        super()
        this.module = module
    }

    load(list: Array<ts.ImportDeclaration>) {
        list.forEach(node => {
            const item = Import.load(node)
            this.add(item)
        })
    }

    update(list: Array<ts.ImportDeclaration>) {
        this.clear()
        this.load(list)
    }

    toNodeArray() {
        let list: ts.Statement[] = []
        this.list.forEach(item => {
            list.push(item.toNode())
        })
        return list
    }

    getSpecifier(file: string) {
        const current = this.module.path
        const folder = path.dirname(current)
        let relative = path.relative(folder, path.dirname(file))
        if (relative == '') {
            relative = './'
        }
        const name = Module.BaseName(file)
        return `${relative}${name}`
    }

    make(path: string) {
        let specifier = path
        if (path.match(/^[a-z]+$/)) {
            // ok
        } else {
            specifier = this.getSpecifier(path)
        }
        const clause = new ImportClause(Module.BaseName(path))
        const item = new Import(specifier, clause)
        return item
    }

    findName(name: string) {
        return this.list.find(iii => iii.name == name)
    }

    findPath(path: string) {
        return this.list.find(iii => iii.path == path)
    }

}
