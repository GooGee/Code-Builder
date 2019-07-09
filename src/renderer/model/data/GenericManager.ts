import * as ts from 'typescript'
import Generic from './Generic'
import NameManager from './NameManager'

export default class GenericManager extends NameManager<Generic> {

    get text(): string {
        let list = Array<string>()
        this.list.forEach(item => {
            list.push(item.name)
        })
        return list.join(', ')
    }

    make(name: string) {
        let parameter = new Generic(name)
        return parameter
    }

    load(list?: ReadonlyArray<ts.TypeParameterDeclaration>) {
        if (!list) {
            return
        }

        list.forEach(node => {
            let ppp = Generic.load(node)
            this.add(ppp)
        })
    }

    update(list?: ReadonlyArray<ts.TypeParameterDeclaration>) {
        if (!list) {
            return
        }

        list.forEach((node, index) => {
            this.list[index].update(node)
        })
    }

    toNodeArray() {
        let list: ts.TypeParameterDeclaration[] = []
        this.list.forEach(item => {
            list.push(item.toNode())
        })
        return list
    }
}
