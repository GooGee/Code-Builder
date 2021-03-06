import React, { ReactElement } from 'react'
import ts from 'typescript'
import { replaceLiteral } from '../../helper/Transformer/ExpressionTransformer'
import Button from '../control/Button'

interface Props {
    editing?: boolean
    node: ts.NumericLiteral | ts.StringLiteral
}

export default function Literal({ editing, node }: Props): ReactElement {
    const text = ts.isStringLiteral(node) ? `"${node.text}"` : node.text
    if (editing) {
        return (
            <Button
                onClick={() => {
                    const value = prompt('Enter a literal', node.text)
                    if (value === null) {
                        return
                    }
                    replaceLiteral(node, value)
                }}
            >
                {text}
            </Button>
        )
    }

    return <span className="literal">{text}</span>
}
