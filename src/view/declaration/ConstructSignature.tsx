import React, { ReactElement } from 'react'
import ts from 'typescript'
import Keyword from '../text/Keyword'
import ParameterDeclarationxx from './ParameterDeclarationxx'

interface Props {
    node: ts.ConstructSignatureDeclaration
}

export default function ConstructSignature({ node }: Props): ReactElement {
    return (
        <div>
            <Keyword kind={node.kind}></Keyword>
            <ParameterDeclarationxx
                list={node.parameters}
            ></ParameterDeclarationxx>
        </div>
    )
}
