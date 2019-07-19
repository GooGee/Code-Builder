import * as ts from 'typescript'
import NameManager from './NameManager'
import Structure, { Class, Enum, Interface } from './Structure'

export default class StructureManager extends NameManager<Structure> {

    loadClass(node: ts.ClassDeclaration) {
        let ccc = Class.load(node)
        this.add(ccc)
    }

    loadEnum(node: ts.EnumDeclaration) {
        let eee = Enum.load(node)
        this.add(eee)
    }

    loadInterface(node: ts.InterfaceDeclaration) {
        let iii = Interface.load(node)
        this.add(iii)
    }

    update(node: ts.Statement) {
        let nnn = node as ts.DeclarationStatement
        let name = nnn.name!.text
        let type = this.find(name)
        if (type) {
            type.update(node)
        }
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
