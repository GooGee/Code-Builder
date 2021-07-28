import React, { ReactElement } from 'react'
import ts from 'typescript'
import ObjectChildMenuFactory from '../../helper/Menu/ObjectChildMenuFactory'
import MenuButton from '../control/MenuButton'
import Identifier from '../text/Identifier'

interface Props {
    node: ts.Identifier
}

export default function IdentifierExpression({ node }: Props): ReactElement {
    return (
        <MenuButton factory={ObjectChildMenuFactory(node)}>
            <Identifier node={node}></Identifier>
        </MenuButton>
    )
}
