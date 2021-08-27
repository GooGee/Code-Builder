import React, { ReactElement } from 'react'
import ts from 'typescript'
import ObjectTypeMenuFactory from '../../helper/Menu/ObjectTypeMenuFactory'
import ObjectTypeMenu from '../control/ObjectTypeMenu'
import TextButton from '../control/TextButton'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import TypeNode from '../type/TypeNode'

interface Props {
    node: ts.TypeParameterDeclaration
}

export default function TypeParameterDeclaration({
    node,
}: Props): ReactElement {
    return (
        <span>
            <IdentifierDeclaration node={node.name}></IdentifierDeclaration>
            <span className="keyword"> extends </span>
            <ObjectTypeMenu
                factory={ObjectTypeMenuFactory}
                node={node.constraint}
                parent={node}
            >
                {node.constraint === undefined ? (
                    <TextButton></TextButton>
                ) : (
                    <TypeNode node={node.constraint}></TypeNode>
                )}
            </ObjectTypeMenu>
        </span>
    )
}
