import ts from 'typescript'

type TypeNode =
    | ts.EntityName
    | ts.Identifier
    | ts.NumericLiteral
    | ts.PrivateIdentifier
    | ts.StringLiteral

export default class Checker {
    constructor(private ls: ts.LanguageService) {}

    private get checker() {
        return this.ls.getProgram()!.getTypeChecker()
    }

    getFunctionList(node: ts.Node) {
        return this.checker.getSymbolsInScope(node, ts.SymbolFlags.Function)
    }

    getSymbol(node: ts.Node) {
        return this.checker.getSymbolAtLocation(node)
    }

    getType(node: TypeNode | ts.LeftHandSideExpression) {
        return this.checker.getTypeAtLocation(node)
    }

    getTypeList(node: ts.Node) {
        // too many useless Types
        return this.checker.getSymbolsInScope(node, ts.SymbolFlags.Type)
    }

    getVariableList(node: ts.Node) {
        return this.checker
            .getSymbolsInScope(node, ts.SymbolFlags.BlockScopedVariable)
            .filter((item) => {
                if (item.name === 'name') {
                    return false
                }
                return true
            })
    }
}
