import ts from 'typescript'
import { makeParameter } from '../Factory/DeclarationFactory'
import ParameterTransformer from '../Transformer/ParameterTransformer'
import MenuFactory from './MenuFactory'

export default function ParameterMenuFactory(
    parent: ts.SignatureDeclarationBase,
    at?: ts.ParameterDeclaration,
) {
    return () => {
        console.log('CaseMenuFactory')
        const menu = MenuFactory.makeMenu('')

        if (at !== undefined) {
            MenuFactory.addDelete(menu, at)
            MenuFactory.addSeparator(menu)
        }

        const one = MenuFactory.makeMenu('+ Parameter', () => {
            const value = prompt('Enter a name')
            if (value === null) {
                return
            }
            const node = makeParameter(value)
            ParameterTransformer.addNode(parent, node, at)
        })
        menu.list.push(one)

        return menu
    }
}
