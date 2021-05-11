import ts from 'typescript'
import state from '../../state'
import Transformer from './Transformer'

function addNote(item: ts.Statement, at?: ts.Statement) {
    const list = Transformer.insert<ts.Statement>(state.sf.statements, item, at)
    const to = ts.factory.updateSourceFile(state.sf, list)
    Transformer.transform(state.sf, to)
}

function deleteNote(item: ts.Statement) {
    const index = state.sf.statements.indexOf(item)
    const list = Array.from(state.sf.statements.values())
    list.splice(index, 1)
    if (list.length === 0) {
        list.push(ts.factory.createEmptyStatement())
    }
    const to = ts.factory.updateSourceFile(
        state.sf,
        ts.factory.createNodeArray(list),
    )
    Transformer.transform(state.sf, to)
}

export default {
    addNote,
    deleteNote,
}
