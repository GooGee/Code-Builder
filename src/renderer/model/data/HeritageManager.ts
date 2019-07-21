import * as ts from 'typescript'
import Heritage from './Heritage'
import Manager from '../Manager'

export default class HeritageManager extends Manager<Heritage> {
    readonly inClass: boolean

    constructor(inClass: boolean) {
        super()
        this.inClass = inClass
    }

    get extendText() {
        let clause = this.extendClause
        if (clause) {
            return clause.text
        }
        return ''
    }

    get implementText() {
        let clause = this.implementClause
        if (clause) {
            return clause.text
        }
        return ''
    }

    get extendList() {
        let clause = this.extendClause
        if (clause) {
            return clause.TypeManager.list
        }
        return []
    }

    get implementList() {
        let clause = this.implementClause
        if (clause) {
            return clause.TypeManager.list
        }
        return []
    }

    get extendClause() {
        const list = this.list.filter(item => item.isImplement == false)
        if (list.length) {
            return list[0]
        }
        return null
    }

    get implementClause() {
        const list = this.list.filter(item => item.isImplement)
        if (list.length) {
            return list[0]
        }
        return null
    }

    extend(list: Array<string>) {
        let clause = this.extendClause
        if (clause == null) {
            clause = new Heritage(false)
            this.add(clause)
        }
        const type = clause.make(list)
        if (this.inClass) {
            clause.TypeManager.clear()
        }
        clause.TypeManager.add(type)
    }

    implement(list: Array<string>) {
        let clause = this.implementClause
        if (clause == null) {
            clause = new Heritage(true)
            this.add(clause)
        }
        const type = clause.make(list)
        clause.TypeManager.add(type)
    }

    load(list?: ReadonlyArray<ts.HeritageClause>) {
        if (list) {
            list.forEach(node => {
                const hhh = Heritage.load(node)
                this.add(hhh)
            })
        }
    }

    update(list?: ReadonlyArray<ts.HeritageClause>) {
        this.clear()
        this.load(list)
    }

    toNodeArray() {
        const list: Array<ts.HeritageClause> = []
        this.list.forEach(item => {
            if (item.TypeManager.list.length) {
                list.push(item.toNode())
            }
        })
        return list
    }
}
