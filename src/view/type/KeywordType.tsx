import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeMenuFactory from '../../helper/Menu/TypeMenuFactory'
import MenuButton from '../control/MenuButton'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.KeywordTypeNode
}

export default function KeywordType({ node }: Props): ReactElement {
    return (
        <MenuButton factory={TypeMenuFactory(node.parent, node)} visible={true}>
            <Keyword kind={node.kind}></Keyword>
        </MenuButton>
    )
}
