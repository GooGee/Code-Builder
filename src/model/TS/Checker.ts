import ts from 'typescript'

type TypeNode =
    | ts.EntityName
    | ts.Identifier
    | ts.NumericLiteral
    | ts.PrivateIdentifier
    | ts.StringLiteral

export default class Checker {
    constructor(private program: ts.Program) {}

    private get checker() {
        return this.program.getTypeChecker()
    }

    getAmbientModuleList() {
        return this.checker.getAmbientModules()
    }

    /**
     * get export members of module
     * @param type
     */
    getExportList(type: ts.Node) {
        const symbol = this.getSymbol(type)
        if (symbol) {
            const ms = this.checker.getAliasedSymbol(symbol)
            return this.checker.getExportsOfModule(ms)
        }
        return []
    }

    /**
     * get generic types of type
     * @param node
     */
    getGenericList(node: ts.Identifier) {
        const type = this.getType(node) as any
        // basic type
        if (type.intrinsicName) {
            return []
        }

        const symbol = this.getSymbol(node)
        if (symbol) {
            if (symbol.valueDeclaration) {
                const declaration = symbol.valueDeclaration
                if (ts.isClassDeclaration(declaration)) {
                    // user made generic type
                    const list = declaration.typeParameters
                    if (list) {
                        return list
                    }
                }
            }

            const sss = symbol as any
            if (sss.declaredType) {
                // Array
                const dt = sss.declaredType
                if (dt.typeParameters) {
                    return dt.typeParameters
                }
            }
        }

        // Map Set
        if (type.typeParameters) {
            return type.typeParameters as ReadonlyArray<ts.TypeParameter>
        }
        return []
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

    getTypeSignatureList(node: ts.Identifier) {
        const ttt = this.getType(node) as any
        // basic type
        if (ttt.intrinsicName) {
            return []
        }
        const sss = this.checker.getTypeOfSymbolAtLocation(ttt.symbol, node)
        return sss.getConstructSignatures()
    }

    getVariableList(node: ts.Node) {
        return this.checker.getSymbolsInScope(
            node,
            ts.SymbolFlags.BlockScopedVariable,
        )
    }
}
