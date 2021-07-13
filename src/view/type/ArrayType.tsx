import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeMenuFactory from '../../helper/Menu/TypeMenuFactory'
import MenuButton from '../control/MenuButton'
import TypeRoot from './TypeRoot'

interface Props {
    node: ts.ArrayTypeNode
}

export default function ArrayType({ node }: Props): ReactElement {
    return (
        <span>
            <MenuButton
                factory={TypeMenuFactory(node.parent, node)}
                visible={true}
            >
                <span className="identifier">Array</span>
            </MenuButton>
            &lt;
            <TypeRoot
                node={node.elementType}
                parent={node}
                propertyName="elementType"
            ></TypeRoot>
            &gt;
        </span>
    )
}
