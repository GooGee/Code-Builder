import React, { ReactElement } from 'react'
import ts from 'typescript'
import ObjectChildMenuFactory from '../../helper/Menu/ObjectChildMenuFactory'
import Diagnostic from '../control/Diagnostic'
import ObjectChildMenu from '../control/ObjectChildMenu'
import Keyword from '../text/Keyword'

interface Props {
    node: ts.ThisExpression
}

export default function ThisExpression({ node }: Props): ReactElement {
    return (
        <Diagnostic node={node}>
            <ObjectChildMenu
                factory={ObjectChildMenuFactory}
                node={node}
                root={node}
            >
                <Keyword kind={node.kind as any}></Keyword>
            </ObjectChildMenu>
        </Diagnostic>
    )
}
