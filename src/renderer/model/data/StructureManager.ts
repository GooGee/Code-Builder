import * as ts from 'typescript'
import NameManager from './NameManager'
import Structure, { Class, Enum, Interface } from './Structure'

export default class StructureManager extends NameManager<Structure> {

    private loadStatement(statement: ts.Statement) {
        switch (statement.kind) {
            case ts.SyntaxKind.ClassDeclaration:
                this.loadClass(statement as ts.ClassDeclaration)
                break

            case ts.SyntaxKind.EnumDeclaration:
                this.loadEnum(statement as ts.EnumDeclaration)
                break

            case ts.SyntaxKind.InterfaceDeclaration:
                this.loadInterface(statement as ts.InterfaceDeclaration)
                break

            default:
                break
        }
    }

    private loadClass(node: ts.ClassDeclaration) {
        let ccc = Class.load(node)
        this.add(ccc)
    }

    private loadEnum(node: ts.EnumDeclaration) {
        let eee = Enum.load(node)
        this.add(eee)
    }

    private loadInterface(node: ts.InterfaceDeclaration) {
        let iii = Interface.load(node)
        this.add(iii)
    }

    load(list: Array<ts.Statement>) {
        list.forEach(node => this.loadStatement(node))
    }

    update(list: Array<ts.Statement>) {
        list.forEach(node => {
            const nnn = node as ts.DeclarationStatement
            const name = nnn.name!.text
            const type = this.find(name)
            if (type) {
                type.update(node)
            }
        })
    }

    toNodeArray() {
        let list: ts.Statement[] = []
        this.list.forEach(item => {
            list.push(item.toNode())
        })
        return list
    }

    makeClass(name: string) {
        let ctype = new Class(name)
        return ctype
    }

    makeEnum(name: string) {
        let ctype = new Enum(name)
        return ctype
    }

    makeInterface(name: string) {
        let ctype = new Interface(name)
        return ctype
    }

}
