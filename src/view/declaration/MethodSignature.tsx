import React, { ReactElement } from 'react'
import ts from 'typescript'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Colon from '../text/Colon'
import Modifierxx from '../text/Modifierxx'
import TypeRoot from '../type/TypeRoot'
import ParameterDeclarationxx from './ParameterDeclarationxx'
import TypeParameterDeclarationxx from './TypeParameterDeclarationxx'

interface Props {
    editing: boolean
    node: ts.MethodSignature
}

export default function MethodSignature({
    editing,
    node,
}: Props): ReactElement {
    return (
        <span>
            <Modifierxx list={node.modifiers}></Modifierxx>{' '}
            <IdentifierDeclaration
                editing={editing}
                node={node.name as any}
            ></IdentifierDeclaration>
            <TypeParameterDeclarationxx
                editing={editing}
                list={node.typeParameters}
            ></TypeParameterDeclarationxx>
            <ParameterDeclarationxx
                editing={editing}
                list={node.parameters}
            ></ParameterDeclarationxx>
            {node.type === undefined ? null : (
                <>
                    <Colon></Colon>{' '}
                    <TypeRoot
                        editing={editing}
                        node={node.type}
                        parent={node}
                    ></TypeRoot>
                </>
            )}
        </span>
    )
}
