import React, { ReactElement } from 'react'
import ts from 'typescript'
import ObjectChildMenuFactory from '../../helper/Menu/ObjectChildMenuFactory'
import ObjectChildMenu from '../control/ObjectChildMenu'
import Identifier from '../text/Identifier'

interface Props {
    node: ts.Identifier
}

export default function IdentifierExpression({ node }: Props): ReactElement {
    return (
        <ObjectChildMenu factory={ObjectChildMenuFactory} node={node}>
            <Identifier node={node}></Identifier>
        </ObjectChildMenu>
    )
}
