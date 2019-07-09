import * as ts from 'typescript'

type Kind = ts.SyntaxKind.AbstractKeyword | ts.SyntaxKind.AsyncKeyword | ts.SyntaxKind.ConstKeyword | ts.SyntaxKind.DeclareKeyword | ts.SyntaxKind.DefaultKeyword | ts.SyntaxKind.ExportKeyword | ts.SyntaxKind.PublicKeyword | ts.SyntaxKind.PrivateKeyword | ts.SyntaxKind.ProtectedKeyword | ts.SyntaxKind.ReadonlyKeyword | ts.SyntaxKind.StaticKeyword
type Property = 'hasAbstract' | 'hasAsync' | 'hasConst' | 'hasDeclare' | 'hasDefault' | 'hasExport' | 'hasPublic' | 'hasPrivate' | 'hasProtected' | 'hasReadonly' | 'hasStatic'

class Modifier {
    kind: Kind
    property: Property
    keyword: string

    constructor(kind: Kind, property: Property) {
        this.kind = kind
        this.property = property
        this.keyword = property.substring(3)
    }
}

export const ModifierList = Array.from([
    new Modifier(ts.SyntaxKind.AbstractKeyword, 'hasAbstract'),
    new Modifier(ts.SyntaxKind.AsyncKeyword, 'hasAsync'),
    new Modifier(ts.SyntaxKind.ConstKeyword, 'hasConst'),
    new Modifier(ts.SyntaxKind.DeclareKeyword, 'hasDeclare'),
    new Modifier(ts.SyntaxKind.DefaultKeyword, 'hasDefault'),
    new Modifier(ts.SyntaxKind.ExportKeyword, 'hasExport'),
    new Modifier(ts.SyntaxKind.PublicKeyword, 'hasPublic'),
    new Modifier(ts.SyntaxKind.PrivateKeyword, 'hasPrivate'),
    new Modifier(ts.SyntaxKind.ProtectedKeyword, 'hasProtected'),
    new Modifier(ts.SyntaxKind.ReadonlyKeyword, 'hasReadonly'),
    new Modifier(ts.SyntaxKind.StaticKeyword, 'hasStatic'),
])

export default class ModifierManager {
    hasAbstract: boolean = false
    hasAsync: boolean = false
    hasConst: boolean = false
    hasDeclare: boolean = false
    hasDefault: boolean = false
    hasExport: boolean = false
    hasPublic: boolean = false
    hasPrivate: boolean = false
    hasProtected: boolean = false
    hasReadonly: boolean = false
    hasStatic: boolean = false

    get text(): string {
        return this.KeyWordList.join(' ')
    }

    get KeyWordList() {
        let list = Array<string>()
        ModifierList.forEach(modifier => {
            if (this[modifier.property]) {
                list.push(modifier.keyword)
            }
        })
        return list
    }

    load(list?: ReadonlyArray<ts.Modifier>) {
        if (!list) {
            return
        }

        list.forEach(modifier => {
            let found = ModifierList.find(item => item.kind == modifier.kind)
            if (found) {
                this[found.property] = true
            }
        })
    }

    toNodeArray() {
        let list: ts.Modifier[] = []
        ModifierList.forEach(modifier => {
            if (this[modifier.property]) {
                let item = ts.createModifier(modifier.kind as any)
                list.push(item)
            }
        })
        return list
    }

}
