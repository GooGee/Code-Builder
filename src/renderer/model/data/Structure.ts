import * as ts from 'typescript'
import Name from './Name'
import ModifierManager from './ModifierManager'
import { EnumMember } from './Member'
import { ClassMemberManager, InterfaceMemberManager } from './MemberManager'
import NameManager from './NameManager'
import Heritage from './Heritage'
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
    private base: Heritage | null = null
    readonly MemberManager: ClassMemberManager = new ClassMemberManager
    readonly HeritageManager: HeritageManager = new HeritageManager(true)
    readonly GenericManager = new GenericManager()

    open() {
        if (!this.opened && this.source) {
            this.modifier.load(this.source.modifiers)
            this.HeritageManager.load(this.source.heritageClauses)
            this.MemberManager.load(this.source.members)
            this.GenericManager.load(this.source.typeParameters)
            this.opened = true
        }
    }

    clearExtendList() {
        this.HeritageManager.extendList.forEach(heritage => this.HeritageManager.remove(heritage))
    }

    extend(list: string[]) {
        this.clearExtendList()
        this.base = this.HeritageManager.make(list, false)
        this.HeritageManager.add(this.base)
    }

    implement(list: string[]) {
        let hhh = this.HeritageManager.make(list, true)
        this.HeritageManager.add(hhh)
    }

    static load(node: ts.ClassDeclaration) {
        let ccc = new Class(node.name!.text)
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

        let node = ts.createClassDeclaration(
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
    readonly MemberManager: NameManager<EnumMember> = new NameManager<EnumMember>()

    open() {
        if (!this.opened && this.source) {
            this.modifier.load(this.source.modifiers)
            this.source.members.forEach(member => {
                let em = EnumMember.load(member)
                this.MemberManager.add(em)
            })
            this.opened = true
        }
    }

    static load(node: ts.EnumDeclaration) {
        let eee = new Enum(node.name.text)
        eee.source = node
        return eee
    }

    update(node: ts.EnumDeclaration) {
        this.source = node
        if (this.opened) {
            this.source.members.forEach(member => {
                let name = member.name as ts.Identifier
                let mmm = this.MemberManager.find(name.text)
                if (mmm) {
                    mmm.update(member)
                }
            })
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

        let list: ts.EnumMember[] = []
        this.MemberManager.list.forEach(member => {
            list.push(member.toNode())
        })

        let node = ts.createEnumDeclaration(
            undefined,
            this.modifier.toNodeArray(),
            this.name,
            list
        )
        return node
    }

    make(name: string) {
        let item = new EnumMember(name)
        return item
    }
}

export class Interface extends Structure {
    label: string = 'Interface'
    isInterface: boolean = true
    source: ts.InterfaceDeclaration | null = null
    readonly MemberManager: InterfaceMemberManager = new InterfaceMemberManager
    readonly HeritageManager: HeritageManager = new HeritageManager(false)

    open() {
        if (!this.opened && this.source) {
            this.modifier.load(this.source.modifiers)
            this.HeritageManager.load(this.source.heritageClauses)
            this.MemberManager.load(this.source.members)
            this.opened = true
        }
    }

    extend(list: string[]) {
        let hhh = this.HeritageManager.make(list, false)
        this.HeritageManager.add(hhh)
    }

    static load(node: ts.InterfaceDeclaration) {
        let iii = new Interface(node.name.text)
        iii.source = node
        return iii
    }

    update(node: ts.InterfaceDeclaration) {
        this.source = node
        if (this.opened) {
            this.HeritageManager.update(this.source.heritageClauses)
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

        let node = ts.createInterfaceDeclaration(
            undefined,
            this.modifier.toNodeArray(),
            this.name,
            undefined,
            this.HeritageManager.toNodeArray(),
            this.MemberManager.toNodeArray()
        )
        return node
    }

}
