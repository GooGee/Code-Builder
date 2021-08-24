import ts from 'typescript'
import Menu from '../../model/Menu'
import * as DeclarationFactory from '../Factory/DeclarationFactory'
import * as StatementFactory from '../Factory/StatementFactory'
import Finder from '../Finder/Finder'
import InputTool from '../InputTool'
import BlockTransformer from '../Transformer/BlockTransformer'
import Transformer from '../Transformer/Transformer'
import MenuFactory from './MenuFactory'

function addLoopMenu(
    menu: Menu,
    parent: ts.Block | ts.SourceFile,
    at?: ts.Statement,
) {
    if (ts.isSourceFile(parent)) {
        return
    }

    const isLoop = inLoop(parent)
    if (isLoop || inSwitch(parent)) {
        menu.list.push(
            MenuFactory.makeMenu('+ break', () => {
                const item = StatementFactory.makeBreak()
                BlockTransformer.addNode(parent, item, at)
            }),
        )
    }
    if (isLoop) {
        menu.list.push(
            MenuFactory.makeMenu('+ continue', () => {
                const item = StatementFactory.makeContinue()
                BlockTransformer.addNode(parent, item, at)
            }),
        )
    }
}

function inLoop(node: ts.Node): boolean {
    if (node.parent === undefined) {
        return false
    }
    if (ts.isFunctionLike(node.parent)) {
        return false
    }
    if (Finder.isLoop(node.parent)) {
        return true
    }
    return inLoop(node.parent)
}

function inSwitch(node: ts.Node): boolean {
    if (node.parent === undefined) {
        return false
    }
    if (ts.isFunctionLike(node.parent)) {
        return false
    }
    if (ts.isSwitchStatement(node.parent)) {
        return true
    }
    return inSwitch(node.parent)
}

function makeVariableDeclarationMenu(node: ts.VariableDeclarationList) {
    const value = node.flags & (ts.NodeFlags.Const | ts.NodeFlags.Let)
    let flag = ts.NodeFlags.Const
    let text = 'const'
    if (value === ts.NodeFlags.Const) {
        flag = ts.NodeFlags.Let
        text = 'let'
    }
    const menu = MenuFactory.makeMenu(text, () => {
        const vdl = ts.factory.createVariableDeclarationList(
            node.declarations,
            flag,
        )
        Transformer.replace(node, vdl)
    })
    return menu
}

function makeName(statementxx: ts.NodeArray<ts.Statement>, name?: string) {
    try {
        const text = InputTool.inputName(undefined, name)
        if (text === null) {
            return null
        }

        const found = statementxx.find((statement) => {
            if (
                ts.isClassDeclaration(statement) ||
                ts.isEnumDeclaration(statement) ||
                ts.isFunctionDeclaration(statement) ||
                ts.isInterfaceDeclaration(statement) ||
                ts.isTypeAliasDeclaration(statement)
            ) {
                return statement.name?.getText() === text
            }
            if (ts.isVariableStatement(statement)) {
                const found = statement.declarationList.declarations.find(
                    (item) => item.name.getText() === text,
                )
                if (found) {
                    return true
                }
            }
            return false
        })
        if (found) {
            window.alert(text + ' already exists!')
            return null
        }
        return text
    } catch (error) {
        if (error.message) {
            window.alert(error.message)
        } else {
            window.alert(error)
        }
        return null
    }
}

export function VariableDeclarationMenuFactory(
    node: ts.VariableDeclarationList,
) {
    const menu = MenuFactory.makeMenu('')
    menu.list.push(makeVariableDeclarationMenu(node))
    return menu
}

export default function StatementMenuFactory(
    parent: ts.Block | ts.SourceFile,
    at?: ts.Statement,
) {
    console.log('StatementMenuFactory')
    const menu = MenuFactory.makeMenu('')
    if (at !== undefined) {
        MenuFactory.addDelete(menu, at)
        MenuFactory.addSeparator(menu)
        if (ts.isVariableStatement(at)) {
            menu.list.push(makeVariableDeclarationMenu(at.declarationList))
            MenuFactory.addSeparator(menu)
        }
    }

    if (ts.isSourceFile(parent)) {
        menu.list.push(
            MenuFactory.makeMenu('+ class', () => {
                const text = makeName(parent.statements)
                if (text === null) {
                    return
                }
                const item = DeclarationFactory.makeClass(text)
                BlockTransformer.addNode(parent, item, at)
            }),
            MenuFactory.makeMenu('+ enum', () => {
                const text = makeName(parent.statements)
                if (text === null) {
                    return
                }
                const item = DeclarationFactory.makeEnum(text)
                BlockTransformer.addNode(parent, item, at)
            }),
            MenuFactory.makeMenu('+ function', () => {
                const text = makeName(parent.statements)
                if (text === null) {
                    return
                }
                const item = DeclarationFactory.makeFunction(text)
                BlockTransformer.addNode(parent, item, at)
            }),
            MenuFactory.makeMenu('+ interface', () => {
                const text = makeName(parent.statements)
                if (text === null) {
                    return
                }
                const item = DeclarationFactory.makeInterface(text)
                BlockTransformer.addNode(parent, item, at)
            }),
        )
    }

    menu.list.push(
        MenuFactory.makeMenu('+ Assign', () => {
            const item = StatementFactory.makeAssignStatement()
            BlockTransformer.addNode(parent, item, at)
        }),
        MenuFactory.makeMenu('+ Call', () => {
            const item = StatementFactory.makeAccessStatement()
            BlockTransformer.addNode(parent, item, at)
        }),
    )

    addLoopMenu(menu, parent, at)

    menu.list.push(
        MenuFactory.makeMenu('+ do', () => {
            const item = StatementFactory.makeDoWhile()
            BlockTransformer.addNode(parent, item, at)
        }),
        MenuFactory.makeMenu('+ for', () => {
            const item = StatementFactory.makeFor()
            BlockTransformer.addNode(parent, item, at)
        }),
        MenuFactory.makeMenu('+ for of', () => {
            const item = StatementFactory.makeForOf()
            BlockTransformer.addNode(parent, item, at)
        }),
        MenuFactory.makeMenu('+ if', () => {
            const item = StatementFactory.makeIf()
            BlockTransformer.addNode(parent, item, at)
        }),
        MenuFactory.makeMenu('+ let', () => {
            const text = makeName(parent.statements)
            if (text === null) {
                return
            }
            const item = StatementFactory.makeVariableStatement(text)
            BlockTransformer.addNode(parent, item, at)
        }),
        // MenuFactory.makeMenu('+ switch', () => {
        //     const item = StatementFactory.makeSwitch()
        //     BlockTransformer.addNode(parent, item, at)
        // }),
    )

    if (Finder.inFunction(parent)) {
        menu.list.push(
            MenuFactory.makeMenu('+ return', () => {
                const item = StatementFactory.makeReturn()
                BlockTransformer.addNode(parent, item, at)
            }),
        )
    }
    if (ts.isBlock(parent)) {
        menu.list.push(
            MenuFactory.makeMenu('+ throw', () => {
                const item = StatementFactory.makeThrow()
                BlockTransformer.addNode(parent, item, at)
            }),
        )
    }

    menu.list.push(
        MenuFactory.makeMenu('+ try', () => {
            const item = StatementFactory.makeTry()
            BlockTransformer.addNode(parent, item, at)
        }),
        MenuFactory.makeMenu('+ type', () => {
            const text = makeName(parent.statements)
            if (text === null) {
                return
            }
            const item = DeclarationFactory.makeTypeAlias(text)
            BlockTransformer.addNode(parent, item, at)
        }),
        MenuFactory.makeMenu('+ while', () => {
            const item = StatementFactory.makeWhile()
            BlockTransformer.addNode(parent, item, at)
        }),
    )

    return menu
}
