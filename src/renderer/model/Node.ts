import * as ts from 'typescript'

export default interface Node {
    source: ts.Node | null

    toNode(): ts.Node
}
