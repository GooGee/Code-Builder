import * as ts from 'typescript'
import NameManager from './NameManager'
import { ClassMember, ClassMethod, ClassProperty, InterfaceMember, InterfaceMethod, InterfaceProperty, ClassLambda, ClassConstructor, ConstructorKeyWord } from './Member'
import TypeNode from './TypeNode'
import Lambda from './Lambda'

export class ClassMemberManager extends NameManager<ClassMember> {

    load(list: ReadonlyArray<ts.ClassElement>) {
        list.forEach(node => {
            switch (node.kind) {
                case ts.SyntaxKind.Constructor:
                    let cc = ClassConstructor.load(node as ts.ConstructorDeclaration)
                    this.add(cc)
                    break

                case ts.SyntaxKind.MethodDeclaration:
                    let cm = ClassMethod.load(node as ts.MethodDeclaration)
                    this.add(cm)
                    break

                case ts.SyntaxKind.PropertyDeclaration:
                    let cp = ClassProperty.load(node as ts.PropertyDeclaration)
                    this.add(cp)
                    break

                default:
                    break
            }
        })
    }

    update(list: ReadonlyArray<ts.ClassElement>) {
        list.forEach(node => {
            let name: string
            if (node.kind == ts.SyntaxKind.Constructor) {
                name = ConstructorKeyWord
            } else {
                let iii = node.name as ts.Identifier
                name = iii.text
            }
            let mmm = this.find(name)
            if (mmm) {
                mmm.update(node)
            }
        })
    }

    toNodeArray() {
        let list: ts.ClassElement[] = []
        this.list.forEach(item => {
            list.push(item.toNode())
        })
        return list
    }

    makeConstructor() {
        let item = new ClassConstructor()
        return item
    }

    makeMethod(name: string, type: string) {
        let node = TypeNode.make(type)
        let item = new ClassMethod(name, node)
        return item
    }

    makeProperty(name: string, type: string) {
        let node = TypeNode.make(type)
        let item = new ClassProperty(name, node)
        return item
    }

    makeLambda(name: string, type: string) {
        let node = TypeNode.make(type)
        let lambda = new Lambda(node)
        lambda.makeBlock()
        let item = new ClassLambda(name, lambda)
        return item
    }
}

export class InterfaceMemberManager extends NameManager<InterfaceMember> {

    load(list: ReadonlyArray<ts.TypeElement>) {
        list.forEach(node => {
            switch (node.kind) {
                case ts.SyntaxKind.MethodSignature:
                    let mmm = node as ts.MethodSignature
                    let cm = InterfaceMethod.load(mmm)
                    this.add(cm)
                    break

                case ts.SyntaxKind.PropertySignature:
                    let ppp = node as ts.PropertySignature
                    let cp = InterfaceProperty.load(ppp)
                    this.add(cp)
                    break

                default:
                    break
            }
        })
    }

    update(list: ReadonlyArray<ts.TypeElement>) {
        list.forEach(node => {
            let name = node.name as ts.Identifier
            let mmm = this.find(name.text)
            if (mmm) {
                mmm.update(node)
            }
        })
    }

    toNodeArray() {
        let list: ts.TypeElement[] = []
        this.list.forEach(item => {
            list.push(item.toNode())
        })
        return list
    }

    makeMethod(name: string, type: string) {
        let node = TypeNode.make(type)
        let item = new InterfaceMethod(name, node)
        return item
    }

    makeProperty(name: string, type: string) {
        let node = TypeNode.make(type)
        let item = new InterfaceProperty(name, node)
        return item
    }

}