import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import EnumMenuFactory from '../../helper/Menu/EnumMenuFactory'
import MenuButton from '../control/MenuButton'
import ExpressionRoot from '../expression/ExpressionRoot'
import ExpressionRootEdit from '../expression/ExpressionRootEdit'
import Identifier from '../text/Identifier'

interface Props {
    node: ts.EnumMember
}

export default function EnumMember({ node }: Props): ReactElement {
    const [editing, setEditing] = useState(false)
    return (
        <div
            onMouseEnter={(event) => setEditing(true)}
            onMouseLeave={(event) => setEditing(false)}
        >
            <MenuButton factory={EnumMenuFactory(node.parent, node)}>
                <Identifier node={node.name as any}></Identifier>
            </MenuButton>
            {node.initializer ? ' = ' : ''}
            {editing ? (
                <ExpressionRootEdit
                    node={node.initializer}
                    parent={node}
                    propertyName="initializer"
                ></ExpressionRootEdit>
            ) : (
                <ExpressionRoot
                    node={node.initializer}
                    parent={node}
                    propertyName="initializer"
                ></ExpressionRoot>
            )}
        </div>
    )
}
