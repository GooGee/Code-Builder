import * as ts from 'typescript'
import Module from './data/Module'

export default class Checker {
    private program: ts.Program
    private checker: ts.TypeChecker

    constructor(program: ts.Program) {
        this.program = program
        this.checker = program.getTypeChecker()
    }

    getAmbientModuleList() {
        return this.checker.getAmbientModules()
    }

    getCallSignatureList(node: ts.Node) {
        const ttt = this.getType(node)
        return ttt.getCallSignatures()
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
    getGenericList(node: ts.Node) {
        const type = this.getType(node) as any
        // basic type
        if (type.intrinsicName) {
            return []
        }

        const symbol = this.getSymbol(node)
        if (symbol) {
            const declaration = symbol.valueDeclaration
            if (ts.isClassDeclaration(declaration)) {
                // user made generic type
                const list = declaration.typeParameters
                if (list) {
                    return list
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

    getPropertyList(node: ts.Node) {
        const type = this.getType(node)
        return type.getProperties()
    }

    getSymbol(node: ts.Node) {
        return this.checker.getSymbolAtLocation(node)
    }

    getType(node: ts.Node) {
        return this.checker.getTypeAtLocation(node)
    }

    getTypeList(node: Module) {
        const list: any[] = node.StructureManager.list
        return list.concat(ESTypeList)
    }

    // getTypeList(node: ts.Node) {
    //     // too many useless Types
    //     return this.checker.getSymbolsInScope(node, ts.SymbolFlags.Type)
    // }

    getTypeSignatureList(node: ts.Node) {
        const ttt = this.getType(node) as any
        // basic type
        if (ttt.intrinsicName) {
            return []
        }
        const sss = this.checker.getTypeOfSymbolAtLocation(ttt.symbol, node)
        return sss.getConstructSignatures()
    }

    getVariableList(node: ts.Node) {
        return this.checker.getSymbolsInScope(node, ts.SymbolFlags.Variable)
    }

}


const TypeList = [
    'Array',
    'Boolean',
    'Console',
    'Date',
    'Function',
    'Generator',
    'Iterable',
    'Iterator',
    'JSON',
    'Map',
    'Math',
    'Number',
    'Object',
    'Set',
    'String',
    'Symbol'
]

class ESType {
    name: string

    constructor(name: string) {
        this.name = name
    }
}

const ESTypeList: ESType[] = []
TypeList.forEach(name => {
    ESTypeList.push(new ESType(name))
})
