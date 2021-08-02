import ts from 'typescript'
import Transformer from './Transformer'

function makeNumericLiteral(
    text: string,
    parent: ts.Node,
    propertyName: string,
    old?: ts.Expression,
) {
    const node = ts.factory.createNumericLiteral(text)
    Transformer.transform(node, parent, propertyName, old)
}

function makeStringLiteral(
    text: string,
    parent: ts.Node,
    propertyName: string,
    old?: ts.Expression,
) {
    const node = ts.factory.createStringLiteral(text)
    Transformer.transform(node, parent, propertyName, old)
}

const LiteralTransformer = {
    makeNumericLiteral,
    makeStringLiteral,
}

export default LiteralTransformer
