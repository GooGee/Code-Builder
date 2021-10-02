import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import Block from '../block/Block'
import StatementMenu from '../control/StatementMenu'
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
    const [hovering, setHovering] = useState(false)
    return (
        <div>
            <StatementMenu
                factory={StatementMenuFactory}
                node={node}
                parent={node.parent as any}
            >
                <Keyword kind={node.kind} suffix=" "></Keyword>
            </StatementMenu>
            <span
                onMouseEnter={(event) => setHovering(true)}
                onMouseLeave={(event) => setHovering(false)}
            >
                <IdentifierDeclaration
                    node={node.name as any}
                ></IdentifierDeclaration>{' '}
                <TypeParameterDeclarationxx
                    hovering={hovering}
                    list={node.typeParameters}
                    parent={node}
                ></TypeParameterDeclarationxx>{' '}
                <ParameterDeclarationxx
                    list={node.parameters}
                    parent={node}
                ></ParameterDeclarationxx>
                {node.type === undefined ? '' : <Colon></Colon>}{' '}
                <TypeRoot
                    editing={hovering}
                    node={node.type}
                    parent={node}
                ></TypeRoot>{' '}
            </span>
            <Block node={node.body}></Block>
        </div>
    )
}
