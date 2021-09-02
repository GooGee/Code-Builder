import React, { ReactElement } from 'react'
import ts from 'typescript'
import TypeMenuFactory from '../../helper/Menu/TypeMenuFactory'
import TextButton from '../control/TextButton'
import TypeMenu from '../control/TypeMenu'
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
            <TypeMenu
                factory={TypeMenuFactory}
                node={node.constraint}
                parent={node}
                required={false}
                onlyObjectType={true}
            >
                {node.constraint === undefined ? (
                    <TextButton></TextButton>
                ) : (
                    <TypeNode node={node.constraint}></TypeNode>
                )}
            </TypeMenu>
        </span>
    )
}
