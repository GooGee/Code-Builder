import * as ts from 'typescript'
import Name from './Name'
import ModifierManager from './ModifierManager'
import ParameterManager from './ParameterManager'
import TypeNode, { QualifiedName, ReferenceType } from './TypeNode'
import Block from '../code/Block'
import Node from '../Node'
import { ChainBox } from '../code/Box'
import Lambda from './Lambda'

export const ConstructorKeyWord = 'Constructor'


export abstract class Member extends Name implements Node {
    abstract source: ts.Node | null
    initializer: ChainBox | null = null

    loadValue(initializer?: ts.Expression) {
        if (initializer) {
            this.initializer = new ChainBox
            this.initializer.load(initializer)
        }
    }

    get value() {
        let initializer = undefined
        if (this.initializer) {
            initializer = this.initializer.toNode()
        }
        return initializer
    }

    noValue() {
        this.initializer = null
    }

    setValue(value: string) {
        if (!this.initializer) {
            this.initializer = new ChainBox
        }
        this.initializer.chain.start(value)
    }

    abstract update(node: ts.Node): void

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

    update(node: ts.EnumMember) {
        this.source = node
    }

    toNode() {
        let node = ts.createEnumMember(this.name, this.value)
        return node
    }
}

export abstract class TypeMember extends Member {
    inClass: boolean = false
    isConstructor: boolean = false
    hasType: boolean = true
    hasBlock: boolean = false
    hasQuestionToken: boolean = false
    type: TypeNode
    readonly modifier: ModifierManager = new ModifierManager

    constructor(name: string, type: TypeNode) {
        super(name)
        this.type = type
    }

    setType(name: string) {
        this.type = TypeNode.make(name)
    }

    typeToArray(type: ReferenceType) {
        const list: string[] = []
        let ttt = type.type
        while (ttt instanceof QualifiedName) {
            list.push(ttt.name)
            ttt = ttt.left
        }
        return list
    }

    makeNew(slist: ReadonlyArray<ts.Symbol>) {
        this.initializer = new ChainBox
        const chain = this.initializer.chain
        if (this.type instanceof ReferenceType) {
            let first = true
            let list: string[] = this.typeToArray(this.type)
            list.reverse().forEach(name => {
                if (first) {
                    chain.start(name)
                } else {
                    chain.access(name, chain.root)
                }
                first = false
            })
        }
        chain.makeNew(slist)
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
    readonly ParameterManager: ParameterManager = new ParameterManager
    readonly block: Block = new Block(this)
    source: ts.ConstructorDeclaration | null = null

    constructor() {
        super(ConstructorKeyWord, TypeNode.make('void'))
    }

    static load(node: ts.ConstructorDeclaration) {
        let mmm = new ClassConstructor
        mmm.source = node
        mmm.modifier.load(node.modifiers)
        mmm.ParameterManager.load(node.parameters)
        mmm.block.load(node.body!)
        return mmm
    }

    update(node: ts.ConstructorDeclaration) {
        this.source = node
        this.ParameterManager.update(node.parameters)
        this.block.update(node.body!)
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
    readonly ParameterManager: ParameterManager = new ParameterManager
    readonly block: Block = new Block(this)
    source: ts.MethodDeclaration | null = null

    static load(node: ts.MethodDeclaration) {
        let name = node.name as ts.Identifier
        let type = TypeNode.load(node.type)
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

    update(node: ts.MethodDeclaration) {
        this.source = node
        this.type.update(node.type!)
        this.ParameterManager.update(node.parameters)
        this.block.update(node.body!)
    }

    toNode(): ts.MethodDeclaration {
        let QuestionToken = undefined
        if (this.hasQuestionToken) {
            QuestionToken = ts.createToken(ts.SyntaxKind.QuestionToken)
        }

        let node = ts.createMethod(
            undefined,
            this.modifier.toNodeArray(),
            undefined,
            this.name,
            QuestionToken,
            undefined,
            this.ParameterManager.toNodeArray(),
            this.type.toNode(),
            this.block.toNode()
        )
        return node
    }
}

export class ClassProperty extends ClassMember {
    source: ts.PropertyDeclaration | null = null

    static load(node: ts.PropertyDeclaration) {
        if (node.initializer) {
            if (node.initializer.kind == ts.SyntaxKind.ArrowFunction) {
                return ClassLambda.load(node)
            }
        }

        let name = node.name as ts.Identifier
        let type = TypeNode.load(node.type)
        let mmm = new ClassProperty(name.text, type)
        mmm.source = node
        if (node.questionToken) {
            mmm.hasQuestionToken = true
        }
        mmm.modifier.load(node.modifiers)
        mmm.loadValue(node.initializer)
        return mmm
    }

    update(node: ts.PropertyDeclaration) {
        this.source = node
        this.type.update(node.type!)
        if (this.initializer) {
            this.initializer.update(node.initializer!)
        }
    }

    toNode(): ts.PropertyDeclaration {
        let QuestionToken = undefined
        if (this.hasQuestionToken) {
            QuestionToken = ts.createToken(ts.SyntaxKind.QuestionToken)
        }

        let node = ts.createProperty(
            undefined,
            this.modifier.toNodeArray(),
            this.name,
            QuestionToken,
            this.type.toNode(),
            this.value
        )
        return node
    }

}

export class ClassLambda extends ClassMember {
    readonly isLambda: boolean = true
    lambda: Lambda
    source: ts.PropertyDeclaration | null = null

    constructor(name: string, lambda: Lambda) {
        super(name, lambda.type)
        this.lambda = lambda
    }

    get type(): TypeNode {
        return this.lambda.type
    }

    set type(type: TypeNode) {
        if (this.lambda) {
            this.lambda.type = type
        }
    }

    static load(node: ts.PropertyDeclaration) {
        let name = node.name as ts.Identifier
        let lambda = Lambda.load(node.initializer as ts.ArrowFunction)
        let mmm = new ClassLambda(name.text, lambda)
        mmm.source = node
        mmm.modifier.load(node.modifiers)
        return mmm
    }

    update(node: ts.PropertyDeclaration) {
        this.source = node
        this.lambda.update(node.initializer as ts.ArrowFunction)
    }

    toNode(): ts.PropertyDeclaration {
        let node = ts.createProperty(
            undefined,
            this.modifier.toNodeArray(),
            this.name,
            undefined,
            undefined,
            this.lambda.toNode()
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
    readonly ParameterManager: ParameterManager = new ParameterManager
    source: ts.MethodSignature | null = null

    static load(node: ts.MethodSignature) {
        let name = node.name as ts.Identifier
        let type = TypeNode.load(node.type)
        let mmm = new InterfaceMethod(name.text, type)
        mmm.source = node
        if (node.questionToken) {
            mmm.hasQuestionToken = true
        }
        mmm.modifier.load(node.modifiers)
        mmm.ParameterManager.load(node.parameters)
        return mmm
    }

    update(node: ts.MethodSignature) {
        this.source = node
        this.type.update(node.type!)
        this.ParameterManager.update(node.parameters)
    }

    toNode() {
        let QuestionToken = undefined
        if (this.hasQuestionToken) {
            QuestionToken = ts.createToken(ts.SyntaxKind.QuestionToken)
        }

        let node = ts.createMethodSignature(
            undefined,
            this.ParameterManager.toNodeArray(),
            this.type.toNode(),
            this.name,
            QuestionToken
        )
        return node
    }

}

export class InterfaceProperty extends InterfaceMember {
    source: ts.PropertySignature | null = null

    static load(node: ts.PropertySignature) {
        let name = node.name as ts.Identifier
        let type = TypeNode.load(node.type)
        let mmm = new InterfaceProperty(name.text, type)
        mmm.source = node
        if (node.questionToken) {
            mmm.hasQuestionToken = true
        }
        mmm.modifier.load(node.modifiers)
        mmm.loadValue(node.initializer)
        return mmm
    }

    update(node: ts.PropertySignature) {
        this.source = node
        this.type.update(node.type!)
    }

    toNode() {
        let QuestionToken = undefined
        if (this.hasQuestionToken) {
            QuestionToken = ts.createToken(ts.SyntaxKind.QuestionToken)
        }

        let node = ts.createPropertySignature(
            this.modifier.toNodeArray(),
            this.name,
            QuestionToken,
            this.type.toNode(),
            this.value
        )
        return node
    }

}

export class Parameter extends TypeMember {
    source: ts.ParameterDeclaration | null = null

    static load(node: ts.ParameterDeclaration) {
        let name = node.name as ts.Identifier
        let type = TypeNode.load(node.type)
        let ppp = new Parameter(name.text, type)
        ppp.source = node
        if (node.questionToken) {
            ppp.hasQuestionToken = true
        }
        ppp.modifier.load(node.modifiers)
        ppp.loadValue(node.initializer)
        return ppp
    }

    update(node: ts.ParameterDeclaration) {
        this.source = node
        if (node.type) {
            this.type.update(node.type)
        }
        if (this.initializer) {
            this.initializer.update(node.initializer!)
        }
    }

    toNode() {
        let QuestionToken = undefined
        if (this.hasQuestionToken) {
            QuestionToken = ts.createToken(ts.SyntaxKind.QuestionToken)
        }

        let node = ts.createParameter(
            undefined,
            this.modifier.toNodeArray(),
            undefined,
            this.name,
            QuestionToken,
            this.type.toNode(),
            this.value
        )
        return node
    }
}

export class Variable extends TypeMember {
    source: ts.VariableDeclaration | null = null

    static load(node: ts.VariableDeclaration) {
        let name = node.name as ts.Identifier
        let type = TypeNode.load(node.type)
        let vvv = new Variable(name.text, type)
        vvv.source = node
        vvv.loadValue(node.initializer)
        return vvv
    }

    update(node: ts.VariableDeclaration) {
        this.source = node
        if (node.type) {
            this.type.update(node.type)
        }
        if (this.initializer) {
            this.initializer.update(node.initializer!)
        }
    }

    toNode() {
        let type = undefined
        if (this.hasType) {
            type = this.type.toNode()
        }
        let node = ts.createVariableDeclaration(
            this.name,
            type,
            this.value
        )
        return node
    }
}

export default {}
