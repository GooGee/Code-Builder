import React, { ReactElement } from 'react'
import ts from 'typescript'
import InterfaceMenuFactory from '../../helper/Menu/InterfaceMenuFactory'
import LineButton from '../control/LineButton'
import Modifierxx from '../text/Modifierxx'
import NameValue from './NameValue'

interface Props {
    location?: string
    node: ts.PropertySignature
}

export default function PropertySignature({ node }: Props): ReactElement {
    return (
        <div>
            <LineButton
                factory={InterfaceMenuFactory(node.parent as any, node)}
            ></LineButton>
            <Modifierxx list={node.modifiers}></Modifierxx>{' '}
            <NameValue node={node}></NameValue>
        </div>
    )
}
