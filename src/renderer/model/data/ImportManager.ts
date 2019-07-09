import * as ts from 'typescript'
import Import from './Import'
import NameManager from './NameManager'

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
        let item = new Import(path)
        return item
    }

    findName(name: string) {
        return this.list.find(iii => iii.name == name)
    }

    findPath(path: string) {
        return this.list.find(iii => iii.path == path)
    }

}
