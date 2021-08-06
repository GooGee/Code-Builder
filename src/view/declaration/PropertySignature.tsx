import React, { ReactElement } from 'react'
import ts from 'typescript'
import Modifierxx from '../text/Modifierxx'
import NameTypeValue from './NameTypeValue'

interface Props {
    node: ts.PropertySignature
}

export default function PropertySignature({ node }: Props): ReactElement {
    return (
        <div>
            <Modifierxx list={node.modifiers}></Modifierxx>{' '}
            <NameTypeValue node={node}></NameTypeValue>
        </div>
    )
}
