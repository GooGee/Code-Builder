import * as ts from 'typescript'
import Import, { ImportClause } from './Import'
import NameManager from './NameManager'
import Module from './Module'

export default class ImportManager extends NameManager<Import> {

    load(node: ts.ImportDeclaration) {
        let item = Import.load(node)
        this.add(item)
    }

    update(node: ts.ImportDeclaration) {
        let sl = node.moduleSpecifier as ts.StringLiteral
        let path = sl.text
        let iii = this.findPath(path)
        if (iii) {
            iii.update(node)
        }
    }

    toNodeArray() {
        let list: ts.Statement[] = []
        this.list.forEach(item => {
            list.push(item.toNode())
        })
        return list
    }

    make(path: string) {
        const clause = new ImportClause(Module.BaseName(path))
        const item = new Import(path, clause)
        return item
    }

    findName(name: string) {
        return this.list.find(iii => iii.name == name)
    }

    findPath(path: string) {
        return this.list.find(iii => iii.path == path)
    }

}
