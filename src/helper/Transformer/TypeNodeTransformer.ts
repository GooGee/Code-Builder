import ts from 'typescript'
import Transformer from './Transformer'

function addType(
    parent: ts.HeritageClause | ts.UnionTypeNode,
    at?: ts.TypeNode,
) {
    const list = Transformer.insert(
        parent.types,
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword),
        at,
    )
    Transformer.setProperty(parent, list, 'types')
}

function addTypeArgument(
    parent: ts.ExpressionWithTypeArguments | ts.TypeReferenceNode,
    at?: ts.TypeNode,
) {
    if (parent.typeArguments === undefined) {
        return
    }
    const list = Transformer.insert(
        parent.typeArguments,
        ts.factory.createKeywordTypeNode(ts.SyntaxKind.UndefinedKeyword),
        at,
    )
    Transformer.setProperty(parent, list, 'typeArguments')
}

const TypeNodeTransformer = {
    addType,
    addTypeArgument,
}

export default TypeNodeTransformer
