import ts from 'typescript'
import CommonTypeList from '../../asset/CommonTypeList'
import KeywordTypeList from '../../asset/KeywordTypeList'
import KeywordText from '../KeywordText'
import Transformer from '../Transformer/Transformer'
import MenuFactory from './MenuFactory'

function makeBasicTypeMenu(
    parent: ts.Node,
    node?: ts.TypeNode,
    propertyName: string = 'type',
) {
    const menu = MenuFactory.makeMenu('basic')
    KeywordTypeList.forEach((item) => {
        menu.list.push(
            MenuFactory.makeMenu(KeywordText(item)!, () => {
                const type = ts.factory.createKeywordTypeNode(item)
                Transformer.transform(type, parent, propertyName, node)
            }),
        )
    })
    menu.list.push(
        MenuFactory.makeMenu('null', () => {
            const type = ts.factory.createLiteralTypeNode(
                ts.factory.createNull(),
            )
            Transformer.transform(type, parent, propertyName, node)
        }),
    )
    CommonTypeList.forEach((item) => {
        menu.list.push(
            MenuFactory.makeMenu(item, () => {
                const type = ts.factory.createTypeReferenceNode(
                    ts.factory.createIdentifier(item),
                )
                Transformer.transform(type, parent, propertyName, node)
            }),
        )
    })
    return menu
}

function makeLocalTypeMenu(
    parent: ts.Node,
    node?: ts.TypeNode,
    propertyName: string = 'type',
) {
    const menu = MenuFactory.makeMenu('local')
    return menu
}

function makeImportedTypeMenu(
    parent: ts.Node,
    node?: ts.TypeNode,
    propertyName: string = 'type',
) {
    const menu = MenuFactory.makeMenu('imported')
    return menu
}

export default function TypeMenuFactory(
    parent: ts.Node,
    node?: ts.TypeNode,
    propertyName: string = 'type',
) {
    return () => {
        console.log('TypeMenuFactory')
        const menu = MenuFactory.makeMenu('')
        if (node !== undefined) {
            MenuFactory.addDelete(menu, node)
            MenuFactory.addSeparator(menu)
        }

        menu.list.push(
            makeBasicTypeMenu(parent, node, propertyName),
            makeLocalTypeMenu(parent, node, propertyName),
            makeImportedTypeMenu(parent, node, propertyName),
        )
        return menu
    }
}