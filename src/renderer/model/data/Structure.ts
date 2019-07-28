import * as ts from 'typescript'
import Name from './Name'
import ModifierManager from './ModifierManager'
import { ClassMemberManager, InterfaceMemberManager, EnumMemberManager } from './MemberManager'
import HeritageManager from './HeritageManager'
import Node from '../Node'
import GenericManager from './GenericManager'

export default abstract class Structure extends Name implements Node {
    isClass: boolean = false
    isEnum: boolean = false
    isInterface: boolean = false
    opened: boolean = false
    abstract label: string
    abstract source: ts.Node | null
    readonly modifier: ModifierManager = new ModifierManager

    abstract open(): void

    abstract update(node: ts.Statement): void

    abstract toNode(): ts.Statement
}

export class Class extends Structure {
    label: string = 'Class'
    isClass: boolean = true
    source: ts.ClassDeclaration | null = null
    readonly MemberManager: ClassMemberManager = new ClassMemberManager
    readonly HeritageManager: HeritageManager = new HeritageManager(true)
    readonly GenericManager: GenericManager = new GenericManager()

    open() {
        if (!this.opened && this.source) {
            this.modifier.load(this.source.modifiers)
            this.HeritageManager.load(this.source.heritageClauses)
            this.MemberManager.load(this.source.members)
            this.GenericManager.load(this.source.typeParameters)
            this.opened = true
        }
    }

    static load(node: ts.ClassDeclaration) {
        const ccc = new Class(node.name!.text)
        ccc.source = node
        return ccc
    }

    update(node: ts.ClassDeclaration) {
        this.source = node
        if (this.opened) {
            this.HeritageManager.update(this.source.heritageClauses)
            this.MemberManager.update(this.source.members)
            this.GenericManager.update(this.source.typeParameters)
        }
    }

    toNode() {
        if (this.opened) {
            // data maybe changed
        } else {
            if (this.source) {
                return this.source
            }
        }

        const node = ts.createClassDeclaration(
            undefined,
            this.modifier.toNodeArray(),
            this.name,
            this.GenericManager.toNodeArray(),
            this.HeritageManager.toNodeArray(),
            this.MemberManager.toNodeArray()
        )
        return node
    }

}

export class Enum extends Structure {
    label: string = 'Enum'
    isEnum: boolean = true
    source: ts.EnumDeclaration | null = null
    readonly MemberManager: EnumMemberManager = new EnumMemberManager

    open() {
        if (!this.opened && this.source) {
            this.modifier.load(this.source.modifiers)
            this.MemberManager.load(this.source.members)
            this.opened = true
        }
    }

    static load(node: ts.EnumDeclaration) {
        const eee = new Enum(node.name.text)
        eee.source = node
        return eee
    }

    update(node: ts.EnumDeclaration) {
        this.source = node
        if (this.opened) {
            this.MemberManager.update(this.source.members)
        }
    }

    toNode() {
        if (this.opened) {
            // data maybe changed
        } else {
            if (this.source) {
                return this.source
            }
        }

        const node = ts.createEnumDeclaration(
            undefined,
            this.modifier.toNodeArray(),
            this.name,
            this.MemberManager.toNodeArray()
        )
        return node
    }
}

export class Interface extends Structure {
    label: string = 'Interface'
    isInterface: boolean = true
    source: ts.InterfaceDeclaration | null = null
    readonly MemberManager: InterfaceMemberManager = new InterfaceMemberManager
    readonly HeritageManager: HeritageManager = new HeritageManager(false)
    readonly GenericManager: GenericManager = new GenericManager()

    open() {
        if (!this.opened && this.source) {
            this.modifier.load(this.source.modifiers)
            this.HeritageManager.load(this.source.heritageClauses)
            this.MemberManager.load(this.source.members)
            this.GenericManager.load(this.source.typeParameters)
            this.opened = true
        }
    }

    static load(node: ts.InterfaceDeclaration) {
        const iii = new Interface(node.name.text)
        iii.source = node
        return iii
    }

    update(node: ts.InterfaceDeclaration) {
        this.source = node
        if (this.opened) {
            this.HeritageManager.update(this.source.heritageClauses)
            this.MemberManager.update(this.source.members)
            this.GenericManager.update(this.source.typeParameters)
        }
    }

    toNode() {
        if (this.opened) {
            // data maybe changed
        } else {
            if (this.source) {
                return this.source
            }
        }

        const node = ts.createInterfaceDeclaration(
            undefined,
            this.modifier.toNodeArray(),
            this.name,
            this.GenericManager.toNodeArray(),
            this.HeritageManager.toNodeArray(),
            this.MemberManager.toNodeArray()
        )
        return node
    }

}
