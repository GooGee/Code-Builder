import React, { ReactElement } from 'react'
import ts from 'typescript'
import Keyword from '../text/Keyword'
import TypeRoot from '../type/TypeRoot'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    node: ts.AsExpression
}

export default function AsExpression({ node }: Props): ReactElement {
    return (
        <span>
            {/* <ExpressionRoot
                node={node.expression}
                parent={node}
            ></ExpressionRoot>{' '}
            <Keyword kind={node.kind} suffix=" "></Keyword>
            <TypeRoot
                editing={editing}
                node={node.type}
                parent={node}
            ></TypeRoot> */}
        </span>
    )
}
