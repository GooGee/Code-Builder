import * as ts from 'typescript'
import Generic from './Generic'
import NameManager from './NameManager'

export default class GenericManager extends NameManager<Generic> {

    get text(): string {
        const list = Array<string>()
        this.list.forEach(item => {
            list.push(item.text)
        })
        return list.join(', ')
    }

    make(name: string) {
        const parameter = new Generic(name)
        return parameter
    }

    load(list?: ReadonlyArray<ts.TypeParameterDeclaration>) {
        if (list) {
            list.forEach(node => {
                const ppp = Generic.load(node)
                this.add(ppp)
            })
        }
    }

    update(list?: ReadonlyArray<ts.TypeParameterDeclaration>) {
        this.clear()
        this.load(list)
    }

    toNodeArray() {
        const list: ts.TypeParameterDeclaration[] = []
        this.list.forEach(item => {
            list.push(item.toNode())
        })
        return list
    }
}
