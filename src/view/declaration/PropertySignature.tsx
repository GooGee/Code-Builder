import React, { ReactElement } from 'react'
import ts from 'typescript'
import InterfaceMenuFactory from '../../helper/Menu/InterfaceMenuFactory'
import StatementLine from '../control/StatementLine'
import Modifierxx from '../text/Modifierxx'
import NameValue from './NameValue'

interface Props {
    location?: string
    node: ts.PropertySignature
}

export default function PropertySignature({ node }: Props): ReactElement {
    return (
        <StatementLine
            factory={InterfaceMenuFactory(node.parent as any, node)}
        >
            <Modifierxx list={node.modifiers}></Modifierxx>{' '}
            <NameValue node={node}></NameValue>
        </StatementLine>
    )
}
