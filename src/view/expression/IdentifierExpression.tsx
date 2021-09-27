import React, { ReactElement } from 'react'
import ts from 'typescript'
import ObjectChildMenuFactory from '../../helper/Menu/ObjectChildMenuFactory'
import ObjectChildMenu from '../control/ObjectChildMenu'
import Identifier from '../text/Identifier'

interface Props {
    node: ts.Identifier
    root: ts.Expression
}

export default function IdentifierExpression({
    node,
    root,
}: Props): ReactElement {
    return (
        <ObjectChildMenu
            factory={ObjectChildMenuFactory}
            node={node}
            root={root}
        >
            <Identifier node={node}></Identifier>
        </ObjectChildMenu>
    )
}
