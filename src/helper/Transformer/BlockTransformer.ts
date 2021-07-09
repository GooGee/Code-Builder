import ts from 'typescript'
import Transformer from './Transformer'

function addNode(
    parent: ts.Block | ts.SourceFile,
    item: ts.Statement,
    at?: ts.Statement,
) {
    const list = Transformer.insert<ts.Statement>(parent.statements, item, at)
    if (ts.isSourceFile(parent)) {
        Transformer.replace(parent, ts.factory.updateSourceFile(parent, list))
        return
    }

    Transformer.replace(parent, ts.factory.updateBlock(parent, list))
}

const BlockTransformer = {
    addNode,
}

export default BlockTransformer
