import ts from 'typescript'
import * as StatementFactory from '../Factory/StatementFactory'
import BlockTransformer from '../Transformer/BlockTransformer'
import MenuFactory from './MenuFactory'

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

export default function StatementMenuFactory(
    parent: ts.Block | ts.SourceFile,
    at?: ts.Statement,
) {
    return () => {
        console.log('StatementMenuFactory')
        const menu = MenuFactory.makeMenu('')
        let index = 2
        if (at !== undefined) {
            MenuFactory.addDelete(menu, at)
            MenuFactory.addSeparator(menu)
            index += 2
        }

        menu.list.push(
            MenuFactory.makeMenu('+ Access', () => {
                const item = StatementFactory.makeAccessStatement()
                BlockTransformer.addNote(parent, item, at)
            }),
            MenuFactory.makeMenu('+ Assign', () => {
                const item = StatementFactory.makeAssignStatement()
                BlockTransformer.addNote(parent, item, at)
            }),
            MenuFactory.makeMenu('+ for', () => {
                const item = StatementFactory.makeFor()
                BlockTransformer.addNote(parent, item, at)
            }),
            MenuFactory.makeMenu('+ if', () => {
                const item = StatementFactory.makeIf()
                BlockTransformer.addNote(parent, item, at)
            }),
            MenuFactory.makeMenu('+ let', () => {
                const item =
                    StatementFactory.makeVariableStatement('VariableName')
                BlockTransformer.addNote(parent, item, at)
            }),
            MenuFactory.makeMenu('+ return', () => {
                const item = StatementFactory.makeReturn()
                BlockTransformer.addNote(parent, item, at)
            }),
            // MenuFactory.makeMenu('+ switch', () => {
            //     const item = StatementFactory.makeSwitch()
            //     BlockTransformer.addNote(parent, item, at)
            // }),
            MenuFactory.makeMenu('+ try', () => {
                const item = StatementFactory.makeTry()
                BlockTransformer.addNote(parent, item, at)
            }),
            MenuFactory.makeMenu('+ throw', () => {
                const item = StatementFactory.makeThrow()
                BlockTransformer.addNote(parent, item, at)
            }),
            MenuFactory.makeMenu('+ while', () => {
                const item = StatementFactory.makeWhile()
                BlockTransformer.addNote(parent, item, at)
            }),
        )

        if (ts.isSourceFile(parent)) {
            return menu
        }

        const isLoop = inLoop(parent)
        if (isLoop) {
            menu.list.splice(
                index,
                0,
                MenuFactory.makeMenu('+ continue', () => {
                    const item = StatementFactory.makeContinue()
                    BlockTransformer.addNote(parent, item, at)
                }),
            )
        }
        if (isLoop || inSwitch(parent)) {
            menu.list.splice(
                index,
                0,
                MenuFactory.makeMenu('+ break', () => {
                    const item = StatementFactory.makeBreak()
                    BlockTransformer.addNote(parent, item, at)
                }),
            )
        }
        return menu
    }
}
