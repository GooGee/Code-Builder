import * as ts from 'typescript'
import Name from './Name'
import ModifierManager from './ModifierManager'
import ParameterManager from './ParameterManager'
import TypeBox, { OwnerKind } from './TypeBox'
import { ReferenceType } from './TypeNode'
import Block from '../code/Block'
import Node from '../Node'
import Box from '../code/Box'
import Chain from '../code/Chain'

export const ConstructorKeyWord = 'Constructor'


export abstract class Member extends Name implements Node {
    abstract source: ts.Node | null
    initializer: Box | null = null

    loadValue(initializer?: ts.Expression) {
        if (initializer) {
            this.initializer = Box.load(initializer)
        }
    }

    valueToNode() {
        if (this.initializer) {
            return this.initializer.toNode()
        }
        return undefined
    }

    clearValue() {
        this.initializer = null
    }

    setValue(value: string) {
        if (!this.initializer) {
            this.initializer = Box.make()
        }
        const chain = this.initializer.BoxItem as Chain
        chain.start(value)
    }

    abstract toNode(): ts.Node
}

export class EnumMember extends Member {
    source: ts.EnumMember | null = null

    static load(node: ts.EnumMember) {
        let name = node.name as ts.Identifier
        let em = new EnumMember(name.text)
        em.source = node
        em.loadValue(node.initializer)
        return em
    }

    toNode() {
        let node = ts.createEnumMember(
            this.name,
            this.valueToNode()
        )
        return node
    }
}

export abstract class TypeMember extends Member {
    inClass: boolean = false
    isConstructor: boolean = false
    hasType: boolean = true
    hasValue: boolean = true
    hasBlock: boolean = false
    hasQuestionToken: boolean = false
    TypeBox: TypeBox
    readonly modifier: ModifierManager = new ModifierManager

    constructor(name: string, type: TypeBox) {
        super(name)
        this.TypeBox = type
    }

    get QuestionToken() {
        if (this.hasQuestionToken) {
            return ts.createToken(ts.SyntaxKind.QuestionToken)
        }
        return undefined
    }

    typeToNode() {
        if (this.hasType) {
            return this.TypeBox.toNode()
        }
        return undefined
    }

    makeNew(list: ReadonlyArray<ts.Symbol>) {
        this.initializer = Box.make()
        const chain = this.initializer.BoxItem as Chain
        if (this.TypeBox.type instanceof ReferenceType) {
            const list: string[] = this.TypeBox.type.toArray()
            chain.from(list.reverse())
        }
        chain.makeNew(list)
    }
}

export abstract class ClassMember extends TypeMember {
    inClass: boolean = true
    isLambda: boolean = false
    abstract toNode(): ts.ConstructorDeclaration | ts.MethodDeclaration | ts.PropertyDeclaration

    get isMethod(): boolean {
        return this instanceof ClassMethod
    }

    get isProperty(): boolean {
        return this instanceof ClassProperty
    }
}

export class ClassConstructor extends ClassMember {
    readonly isConstructor: boolean = true
    readonly hasBlock: boolean = true
    readonly hasType: boolean = false
    readonly hasValue: boolean = false
    readonly ParameterManager: ParameterManager = new ParameterManager
    readonly block: Block = new Block(this)
    source: ts.ConstructorDeclaration | null = null

    constructor() {
        super(ConstructorKeyWord, TypeBox.make(['void'], OwnerKind.Function))
    }

    static load(node: ts.ConstructorDeclaration) {
        let mmm = new ClassConstructor
        mmm.source = node
        mmm.modifier.load(node.modifiers)
        mmm.ParameterManager.load(node.parameters)
        mmm.block.load(node.body!)
        return mmm
    }

    toNode(): ts.ConstructorDeclaration {
        let node = ts.createConstructor(
            undefined,
            this.modifier.toNodeArray(),
            this.ParameterManager.toNodeArray(),
            this.block.toNode()
        )
        return node
    }
}

export class ClassMethod extends ClassMember {
    readonly hasBlock: boolean = true
    readonly hasValue: boolean = false
    readonly ParameterManager: ParameterManager = new ParameterManager
    readonly block: Block = new Block(this)
    source: ts.MethodDeclaration | null = null

    static load(node: ts.MethodDeclaration) {
        let name = node.name as ts.Identifier
        let type = TypeBox.load(node.type!, OwnerKind.Function)
        let mmm = new ClassMethod(name.text, type)
        mmm.source = node
        if (node.questionToken) {
            mmm.hasQuestionToken = true
        }
        mmm.modifier.load(node.modifiers)
        mmm.ParameterManager.load(node.parameters)
        mmm.block.load(node.body!)
        return mmm
    }

    toNode(): ts.MethodDeclaration {
        let node = ts.createMethod(
            undefined,
            this.modifier.toNodeArray(),
            undefined,
            this.name,
            this.QuestionToken,
            undefined,
            this.ParameterManager.toNodeArray(),
            this.TypeBox.toNode(),
            this.block.toNode()
        )
        return node
    }
}

export class ClassProperty extends ClassMember {
    source: ts.PropertyDeclaration | null = null

    static load(node: ts.PropertyDeclaration) {
        let name = node.name as ts.Identifier
        let type = TypeBox.load(node.type!, OwnerKind.Variable)
        let mmm = new ClassProperty(name.text, type)
        mmm.source = node
        if (node.questionToken) {
            mmm.hasQuestionToken = true
        }
        mmm.modifier.load(node.modifiers)
        mmm.loadValue(node.initializer)
        return mmm
    }

    toNode(): ts.PropertyDeclaration {
        let node = ts.createProperty(
            undefined,
            this.modifier.toNodeArray(),
            this.name,
            this.QuestionToken,
            this.TypeBox.toNode(),
            this.valueToNode()
        )
        return node
    }

}

export abstract class InterfaceMember extends TypeMember {
    abstract toNode(): ts.MethodSignature | ts.PropertySignature

    get isMethod(): boolean {
        return this instanceof InterfaceMethod
    }

    get isProperty(): boolean {
        return this instanceof InterfaceProperty
    }
}

export class InterfaceMethod extends InterfaceMember {
    readonly hasValue: boolean = false
    readonly ParameterManager: ParameterManager = new ParameterManager
    source: ts.MethodSignature | null = null

    static load(node: ts.MethodSignature) {
        let name = node.name as ts.Identifier
        let type = TypeBox.load(node.type!, OwnerKind.Function)
        let mmm = new InterfaceMethod(name.text, type)
        mmm.source = node
        if (node.questionToken) {
            mmm.hasQuestionToken = true
        }
        mmm.modifier.load(node.modifiers)
        mmm.ParameterManager.load(node.parameters)
        return mmm
    }

    toNode() {
        let node = ts.createMethodSignature(
            undefined,
            this.ParameterManager.toNodeArray(),
            this.TypeBox.toNode(),
            this.name,
            this.QuestionToken
        )
        return node
    }

}

export class InterfaceProperty extends InterfaceMember {
    source: ts.PropertySignature | null = null

    static load(node: ts.PropertySignature) {
        let name = node.name as ts.Identifier
        let type = TypeBox.load(node.type!, OwnerKind.Variable)
        let mmm = new InterfaceProperty(name.text, type)
        mmm.source = node
        if (node.questionToken) {
            mmm.hasQuestionToken = true
        }
        mmm.modifier.load(node.modifiers)
        mmm.loadValue(node.initializer)
        return mmm
    }

    toNode() {
        let node = ts.createPropertySignature(
            this.modifier.toNodeArray(),
            this.name,
            this.QuestionToken,
            this.TypeBox.toNode(),
            this.valueToNode()
        )
        return node
    }

}

export class Parameter extends TypeMember {
    source: ts.ParameterDeclaration | null = null

    static load(node: ts.ParameterDeclaration) {
        let name = node.name as ts.Identifier
        let type = TypeBox.load(node.type!, OwnerKind.Variable)
        let ppp = new Parameter(name.text, type)
        ppp.source = node
        if (node.questionToken) {
            ppp.hasQuestionToken = true
        }
        ppp.modifier.load(node.modifiers)
        ppp.loadValue(node.initializer)
        return ppp
    }

    toNode() {
        let node = ts.createParameter(
            undefined,
            this.modifier.toNodeArray(),
            undefined,
            this.name,
            this.QuestionToken,
            this.typeToNode(),
            this.valueToNode()
        )
        return node
    }
}

export class Variable extends TypeMember {
    source: ts.VariableDeclaration | null = null

    static make(name: string, list: Array<string>, kind: OwnerKind) {
        const box = TypeBox.make(list, kind)
        const member = new Variable(name, box)
        return member
    }

    static load(node: ts.VariableDeclaration) {
        let name = node.name as ts.Identifier
        let type = TypeBox.load(node.type!, OwnerKind.Variable)
        let vvv = new Variable(name.text, type)
        vvv.source = node
        vvv.loadValue(node.initializer)
        return vvv
    }

    toNode() {
        let node = ts.createVariableDeclaration(
            this.name,
            this.typeToNode(),
            this.valueToNode()
        )
        return node
    }
}

export default {}
