import React, { ReactElement } from 'react'
import ts from 'typescript'
import Modifierxx from '../text/Modifierxx'
import NameValue from './NameValue'

interface Props {
    node: ts.PropertySignature
}

export default function PropertySignature({ node }: Props): ReactElement {
    return (
        <div>
            <Modifierxx list={node.modifiers}></Modifierxx>{' '}
            <NameValue node={node}></NameValue>
        </div>
    )
}
