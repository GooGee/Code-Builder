import * as ts from 'typescript'
import NameManager from './NameManager'
import { ClassMember, ClassMethod, ClassProperty, InterfaceMember, InterfaceMethod, InterfaceProperty, ClassConstructor, ConstructorKeyWord, EnumMember } from './Member'
import TypeBox, { OwnerKind } from './TypeBox'

export class ClassMemberManager extends NameManager<ClassMember> {

    load(list: ReadonlyArray<ts.ClassElement>) {
        list.forEach(node => {
            switch (node.kind) {
                case ts.SyntaxKind.Constructor:
                    const cc = ClassConstructor.load(node as ts.ConstructorDeclaration)
                    this.add(cc)
                    break

                case ts.SyntaxKind.MethodDeclaration:
                    const cm = ClassMethod.load(node as ts.MethodDeclaration)
                    this.add(cm)
                    break

                case ts.SyntaxKind.PropertyDeclaration:
                    const cp = ClassProperty.load(node as ts.PropertyDeclaration)
                    this.add(cp)
                    break

                default:
                    break
            }
        })
    }

    update(list: ReadonlyArray<ts.ClassElement>) {
        this.clear()
        this.load(list)
    }

    toNodeArray() {
        const list: ts.ClassElement[] = []
        this.list.forEach(item => {
            list.push(item.toNode())
        })
        return list
    }

    makeConstructor() {
        const item = new ClassConstructor()
        return item
    }

    makeMethod(name: string, list: Array<string>) {
        const node = TypeBox.make(list, OwnerKind.Function)
        const item = new ClassMethod(name, node)
        return item
    }

    makeProperty(name: string, list: Array<string>) {
        const node = TypeBox.make(list, OwnerKind.Variable)
        const item = new ClassProperty(name, node)
        return item
    }
}

export class EnumMemberManager extends NameManager<EnumMember> {

    make(name: string) {
        const member = new EnumMember(name)
        return member
    }

    load(list: ReadonlyArray<ts.EnumMember>) {
        list.forEach(node => {
            const member = EnumMember.load(node)
            this.add(member)
        })
    }

    update(list: ReadonlyArray<ts.EnumMember>) {
        this.clear()
        this.load(list)
    }

    toNodeArray() {
        const list: Array<ts.EnumMember> = []
        this.list.forEach(member => {
            list.push(member.toNode())
        })
        return list
    }
}

export class InterfaceMemberManager extends NameManager<InterfaceMember> {

    load(list: ReadonlyArray<ts.TypeElement>) {
        list.forEach(node => {
            switch (node.kind) {
                case ts.SyntaxKind.MethodSignature:
                    const mmm = node as ts.MethodSignature
                    const cm = InterfaceMethod.load(mmm)
                    this.add(cm)
                    break

                case ts.SyntaxKind.PropertySignature:
                    const ppp = node as ts.PropertySignature
                    const cp = InterfaceProperty.load(ppp)
                    this.add(cp)
                    break

                default:
                    break
            }
        })
    }

    update(list: ReadonlyArray<ts.TypeElement>) {
        this.clear()
        this.load(list)
    }

    toNodeArray() {
        const list: ts.TypeElement[] = []
        this.list.forEach(item => {
            list.push(item.toNode())
        })
        return list
    }

    makeMethod(name: string, list: Array<string>) {
        const node = TypeBox.make(list, OwnerKind.Function)
        const item = new InterfaceMethod(name, node)
        return item
    }

    makeProperty(name: string, list: Array<string>) {
        const node = TypeBox.make(list, OwnerKind.Variable)
        const item = new InterfaceProperty(name, node)
        return item
    }

}
