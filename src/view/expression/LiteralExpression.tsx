import React, { ReactElement } from 'react'
import ts from 'typescript'
import ObjectChildMenuFactory from '../../helper/Menu/ObjectChildMenuFactory'
import ObjectChildMenu from '../control/ObjectChildMenu'
import Literal from '../text/Literal'

interface Props {
    node: ts.NumericLiteral | ts.StringLiteral
}

export default function LiteralExpression({ node }: Props): ReactElement {
    return (
        <ObjectChildMenu factory={ObjectChildMenuFactory} node={node}>
            <Literal node={node}></Literal>
        </ObjectChildMenu>
    )
}
