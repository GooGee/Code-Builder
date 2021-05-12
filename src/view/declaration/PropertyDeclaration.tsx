import React, { ReactElement } from 'react'
import ts from 'typescript'
import ClassMenuFactory from '../../helper/Menu/ClassMenuFactory'
import DeclarationLine from '../control/DeclarationLine'
import Modifierxx from '../text/Modifierxx'
import NameValue from './NameValue'

interface Props {
    node: ts.PropertyDeclaration
}

export default function PropertyDeclaration({ node }: Props): ReactElement {
    return (
        <DeclarationLine factory={ClassMenuFactory(node.parent as any, node)}>
            <Modifierxx list={node.modifiers}></Modifierxx>{' '}
            <NameValue node={node}></NameValue>
        </DeclarationLine>
    )
}
