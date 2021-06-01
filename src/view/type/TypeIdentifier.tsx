import React, { ReactElement } from 'react'
import ts from 'typescript'
import { ModuleChildMenuFactory } from '../../helper/Menu/TypeMenuFactory'
import MenuButton from '../control/MenuButton'
import Identifier from '../expression/Identifier'

interface Props {
    editing: boolean
    node: ts.Identifier
}

export default function TypeIdentifier({ editing, node }: Props): ReactElement {
    return (
        <span>
            <MenuButton
                factory={ModuleChildMenuFactory(node)}
                visible={true}
            ></MenuButton>

            <Identifier node={node}></Identifier>
        </span>
    )
}
