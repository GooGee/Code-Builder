import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import Block from './Block'

interface Props {
    text: string
    node: ts.Block
}

export default function EmptyBlock({ text, node }: Props): ReactElement {
    const [visible, setVisible] = useState(node.statements.length > 0)
    let css = 'cursor-pointer'
    if (visible) {
        css += ' keyword'
    } else {
        css += ' text-gray-300'
    }
    return (
        <span>
            <span
                onClick={() => {
                    if (node.statements.length) {
                        return
                    }
                    setVisible(!visible)
                }}
                className={css}
            >
                {text}
            </span>
            {visible === false ? (
                <span className="text-gray-300">{'{}'}</span>
            ) : (
                <Block node={node}></Block>
            )}
        </span>
    )
}
