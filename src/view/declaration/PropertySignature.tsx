import React, { ReactElement } from 'react'
import ts from 'typescript'
import Modifierxx from '../text/Modifierxx'
import NameValue from './NameValue'

interface Props {
    location?: string
    node: ts.PropertySignature | ts.PropertyDeclaration
}

export default function PropertySignature({ node }: Props): ReactElement {
    return (
        <div>
            <Modifierxx list={node.modifiers}></Modifierxx>{' '}
            <NameValue node={node}></NameValue>
        </div>
    )
}
