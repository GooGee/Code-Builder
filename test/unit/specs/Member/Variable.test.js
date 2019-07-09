import * as ts from 'typescript'
import { Variable } from '@/model/data/Member'

let member = null

test(`load`, () => {
    const name = 'name'
    const node = ts.createVariableDeclaration(
        name,
        ts.createKeywordTypeNode(ts.SyntaxKind.StringKeyword),
        undefined
    )
    member = Variable.load(node)
    expect(member.name).toEqual(name)
})

test(`toNode`, () => {
    const node = member.toNode()
    expect(node.kind).toEqual(ts.SyntaxKind.VariableDeclaration)
})
