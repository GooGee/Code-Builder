import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeParameterMenuFactory from '../../helper/Menu/TypeParameterMenuFactory'
import TextButton from '../control/TextButton'
import TypeParameterMenu from '../control/TypeParameterMenu'
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
            <TypeParameterMenu
                factory={TypeParameterMenuFactory}
                node={node.constraint}
                parent={node}
            >
                {node.constraint === undefined ? (
                    <TextButton></TextButton>
                ) : (
                    <TypeNode node={node.constraint}></TypeNode>
                )}
            </TypeParameterMenu>
        </span>
    )
}
