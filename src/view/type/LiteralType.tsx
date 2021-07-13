import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeMenuFactory from '../../helper/Menu/TypeMenuFactory'
import MenuButton from '../control/MenuButton'
import Keyword from '../text/Keyword'
import Literal from '../text/Literal'

interface Props {
    node: ts.LiteralTypeNode
}

export default function LiteralType({ node }: Props): ReactElement {
    if (node.literal.kind === ts.SyntaxKind.NullKeyword) {
        return (
            <MenuButton
                factory={TypeMenuFactory(node.parent, node)}
                visible={true}
            >
                <Keyword kind={node.literal.kind}></Keyword>
            </MenuButton>
        )
    }

    return <Literal node={node.literal as any}></Literal>
}
