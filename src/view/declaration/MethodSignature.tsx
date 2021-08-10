import React, { ReactElement } from 'react'
import ts from 'typescript'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Colon from '../text/Colon'
import Modifierxx from '../text/Modifierxx'
import TypeRoot from '../type/TypeRoot'
import ParameterDeclarationxx from './ParameterDeclarationxx'
import TypeParameterDeclarationxx from './TypeParameterDeclarationxx'

interface Props {
    node: ts.MethodSignature
}

export default function MethodSignature({ node }: Props): ReactElement {
    return (
        <div>
            <Modifierxx list={node.modifiers}></Modifierxx>{' '}
            <IdentifierDeclaration
                node={node.name as any}
            ></IdentifierDeclaration>
            <TypeParameterDeclarationxx
                list={node.typeParameters}
            ></TypeParameterDeclarationxx>
            <ParameterDeclarationxx
                list={node.parameters}
                parent={node}
            ></ParameterDeclarationxx>
            {node.type === undefined ? null : (
                <>
                    <Colon></Colon>{' '}
                    <TypeRoot
                        node={node.type}
                        parent={node}
                        required={true}
                    ></TypeRoot>
                </>
            )}
        </div>
    )
}
