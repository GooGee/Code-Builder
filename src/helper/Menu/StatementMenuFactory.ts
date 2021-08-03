import ts from 'typescript'
import Menu from '../../model/Menu'
import * as DeclarationFactory from '../Factory/DeclarationFactory'
import * as StatementFactory from '../Factory/StatementFactory'
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
    if (isFunction(node.parent)) {
        return false
    }
    if (isFor(node.parent)) {
        return true
    }
    return inLoop(node.parent)
}

function inSwitch(node: ts.Node): boolean {
    if (node.parent === undefined) {
        return false
    }
    if (isFunction(node.parent)) {
        return false
    }
    if (ts.isSwitchStatement(node.parent)) {
        return true
    }
    return inSwitch(node.parent)
}

function isFor(node: ts.Node) {
    if (ts.isDoStatement(node)) {
        return true
    }
    if (ts.isForInStatement(node)) {
        return true
    }
    if (ts.isForOfStatement(node)) {
        return true
    }
    if (ts.isForStatement(node)) {
        return true
    }
    if (ts.isWhileStatement(node)) {
        return true
    }
    return false
}

function isFunction(node: ts.Node) {
    if (ts.isArrowFunction(node)) {
        return true
    }
    if (ts.isFunctionDeclaration(node)) {
        return true
    }
    if (ts.isFunctionExpression(node)) {
        return true
    }
    if (ts.isMethodDeclaration(node)) {
        return true
    }
    return false
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

export function VariableDeclarationMenuFactory(
    node: ts.VariableDeclarationList,
) {
    return () => {
        const menu = MenuFactory.makeMenu('')
        menu.list.push(makeVariableDeclarationMenu(node))
        return menu
    }
}

export default function StatementMenuFactory(
    parent: ts.Block | ts.SourceFile,
    at?: ts.Statement,
) {
    return () => {
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
            MenuFactory.makeMenu('+ function', () => {
                const text = InputTool.inputName()
                if (text === null) {
                    return
                }
                const item = DeclarationFactory.makeFunction(text)
                BlockTransformer.addNode(parent, item, at)
            }),
            MenuFactory.makeMenu('+ if', () => {
                const item = StatementFactory.makeIf()
                BlockTransformer.addNode(parent, item, at)
            }),
            MenuFactory.makeMenu('+ let', () => {
                const text = InputTool.inputName()
                if (text === null) {
                    return
                }
                const item = StatementFactory.makeVariableStatement(text)
                BlockTransformer.addNode(parent, item, at)
            }),
            MenuFactory.makeMenu('+ return', () => {
                const item = StatementFactory.makeReturn()
                BlockTransformer.addNode(parent, item, at)
            }),
            // MenuFactory.makeMenu('+ switch', () => {
            //     const item = StatementFactory.makeSwitch()
            //     BlockTransformer.addNode(parent, item, at)
            // }),
            MenuFactory.makeMenu('+ try', () => {
                const item = StatementFactory.makeTry()
                BlockTransformer.addNode(parent, item, at)
            }),
            MenuFactory.makeMenu('+ throw', () => {
                const item = StatementFactory.makeThrow()
                BlockTransformer.addNode(parent, item, at)
            }),
            MenuFactory.makeMenu('+ while', () => {
                const item = StatementFactory.makeWhile()
                BlockTransformer.addNode(parent, item, at)
            }),
        )

        return menu
    }
}
