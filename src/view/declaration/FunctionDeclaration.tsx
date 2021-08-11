import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Block from '../block/Block'
import MenuModal from '../control/MenuModal'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import Colon from '../text/Colon'
import Keyword from '../text/Keyword'
import TypeRoot from '../type/TypeRoot'
import ParameterDeclarationxx from './ParameterDeclarationxx'
import TypeParameterDeclarationxx from './TypeParameterDeclarationxx'

interface Props {
    node: ts.FunctionDeclaration
}

export default function FunctionDeclaration({ node }: Props): ReactElement {
    const [editing, setEditing] = useState(false)
    return (
        <div>
            <MenuModal
                factory={StatementMenuFactory(node.parent as any, node)}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </MenuModal>
            <IdentifierDeclaration
                node={node.name as any}
            ></IdentifierDeclaration>
            <TypeParameterDeclarationxx
                list={node.typeParameters}
            ></TypeParameterDeclarationxx>
            <span
                onMouseEnter={(event) => setEditing(true)}
                onMouseLeave={(event) => setEditing(false)}
            >
                <ParameterDeclarationxx
                    list={node.parameters}
                    parent={node}
                ></ParameterDeclarationxx>
                {node.type === undefined ? '' : <Colon></Colon>}{' '}
                <TypeRoot
                    editing={editing}
                    node={node.type}
                    parent={node}
                ></TypeRoot>{' '}
            </span>
            <Block node={node.body}></Block>
        </div>
    )
}
