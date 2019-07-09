import * as ts from 'typescript'
import NameManager from './NameManager'
import Heritage from './Heritage'
import { TypeExpression } from '../code/Expression'

export default class HeritageManager extends NameManager<Heritage> {
    readonly inClass: boolean

    constructor(inClass: boolean) {
        super()
        this.inClass = inClass
    }

    /**
     * get extend list of class
     */
    get extendList() {
        return this.list.filter(item => item.isImplement == false)
    }

    /**
     * get implement list of class
     */
    get implementList() {
        return this.list.filter(item => item.isImplement)
    }

    /**
     * for class
     */
    get extendText(): string {
        let list = Array<string>()
        this.list.forEach(item => {
            if (item.isImplement == false) {
                list.push(item.name)
            }
        })

        let text = ''
        if (list.length) {
            text = list.join(', ')
        }
        return text
    }

    /**
     * for class
     */
    get implementText(): string {
        let list = Array<string>()
        this.list.forEach(item => {
            if (item.isImplement) {
                list.push(item.name)
            }
        })

        let text = ''
        if (list.length) {
            text = list.join(', ')
        }
        return text
    }

    /**
     * for interface
     */
    get text() {
        let list = Array<string>()
        this.list.forEach(item => list.push(item.name))
        let text = ''
        if (list.length) {
            text = list.join(', ')
        }
        return text
    }

    load(list?: ReadonlyArray<ts.HeritageClause>) {
        if (!list) {
            return
        }

        list.forEach(node => {
            let hhh = Heritage.load(node)
            this.add(hhh)
        })
    }

    update(list?: ReadonlyArray<ts.HeritageClause>) {
        if (!list) {
            return
        }

        list.forEach((node, index) => {
            this.list[index].update(node)
        })
    }

    toNodeArray() {
        let clauseList: ts.HeritageClause[] = []
        if (this.inClass) {
            let clause = this.makeClause(this.extendList)
            if (clause) {
                clauseList.push(clause)
            }
            let clause2 = this.makeClause(this.implementList, true)
            if (clause2) {
                clauseList.push(clause2)
            }
        } else {
            let clause = this.makeClause(this.list)
            if (clause) {
                clauseList.push(clause)
            }
        }
        return clauseList
    }

    makeClause(heritageList: Heritage[], isImplement: boolean = false) {
        let kind = ts.SyntaxKind.ExtendsKeyword
        if (isImplement) {
            kind = ts.SyntaxKind.ImplementsKeyword
        }
        if (heritageList.length) {
            let list: Array<ts.ExpressionWithTypeArguments> = []
            heritageList.forEach(heritage => list.push(heritage.toNode()))
            let node = ts.createHeritageClause(
                kind,
                list
            )
            return node
        }
        return null
    }

    make(type: string, isImplement: boolean) {
        let node = TypeExpression.make(type)
        let hhh = new Heritage(node, isImplement)
        return hhh
    }

    add(item: Heritage) {
        if (this.findType(item.text)) {
            throw item.text + ' already exists!'
        }

        super.add(item)
    }

    findType(text: string): Heritage | undefined {
        return this.list.find(hhh => hhh.text == text)
    }

}
