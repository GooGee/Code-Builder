import ts from 'typescript'
import CaseTransformer from '../Transformer/CaseTransformer'
import MenuFactory from './MenuFactory'

export default function CaseMenuFactory(
    parent: ts.CaseBlock,
    at?: ts.CaseClause,
) {
    return () => {
        console.log('CaseMenuFactory')
        const menu = MenuFactory.makeMenu('')
        if (at !== undefined) {
            MenuFactory.addDelete(menu, at)
            MenuFactory.addSeparator(menu)
        }

        menu.list.push(
            MenuFactory.makeMenu('+ case', () => {
                CaseTransformer.addNode(parent, at)
            }),
        )
        return menu
    }
}
