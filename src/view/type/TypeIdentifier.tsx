import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeMenuFactory from '../../helper/Menu/TypeMenuFactory'
import MenuButton from '../control/MenuButton'
import Identifier from '../text/Identifier'

interface Props {
    node: ts.Identifier
}

export default function TypeIdentifier({ node }: Props): ReactElement {
    return (
        <MenuButton factory={TypeMenuFactory(node.parent, node)} visible={true}>
            <Identifier node={node}></Identifier>
        </MenuButton>
    )
}
