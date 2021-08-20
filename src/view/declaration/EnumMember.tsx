import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import EnumMenuFactory from '../../helper/Menu/EnumMenuFactory'
import MenuButton from '../control/MenuButton'
import TextButton from '../control/TextButton'
import ExpressionRoot from '../expression/ExpressionRoot'
import ExpressionRootEdit from '../expression/ExpressionRootEdit'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'

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
            {editing ? (
                <MenuButton factory={EnumMenuFactory(node.parent, node)}>
                    <TextButton></TextButton>
                </MenuButton>
            ) : null}
            <IdentifierDeclaration
                node={node.name as any}
            ></IdentifierDeclaration>
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
