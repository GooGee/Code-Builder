import ts from 'typescript'
import * as DeclarationFactory from '../Factory/DeclarationFactory'
import SourceFileTransformer from '../Transformer/SourceFileTransformer'
import MenuFactory from './MenuFactory'

export default function SourceFileMenuFactory(at?: ts.Statement) {
    return () => {
        console.log('SourceFileMenuFactory')
        const menu = MenuFactory.makeMenu('')
        if (at !== undefined) {
            menu.list.push(
                MenuFactory.makeMenu('Delete', () => {
                    SourceFileTransformer.deleteNote(at)
                }),
            )
            MenuFactory.addSeparator(menu)
        }

        menu.list.push(
            MenuFactory.makeMenu('+ class', () => {
                const item = DeclarationFactory.makeClass('ClassName')
                SourceFileTransformer.addNode(item, at)
            }),
            MenuFactory.makeMenu('+ enum', () => {
                const item = DeclarationFactory.makeEnum('EnumName')
                SourceFileTransformer.addNode(item, at)
            }),
            MenuFactory.makeMenu('+ interface', () => {
                const item = DeclarationFactory.makeInterface('InterfaceName')
                SourceFileTransformer.addNode(item, at)
            }),
        )
        return menu
    }
}
