import React, { ReactElement } from 'react'
import ts from 'typescript'
import ClassMenuFactory from '../../helper/Menu/ClassMenuFactory'
import LineButton from '../control/LineButton'
import Modifierxx from '../text/Modifierxx'
import NameValue from './NameValue'

interface Props {
    node: ts.PropertyDeclaration
}

export default function PropertyDeclaration({ node }: Props): ReactElement {
    return (
        <div>
            <LineButton
                factory={ClassMenuFactory(node.parent as any, node)}
            ></LineButton>
            <Modifierxx list={node.modifiers}></Modifierxx>{' '}
            <NameValue node={node}></NameValue>
        </div>
    )
}
