import React, { ReactElement, useEffect, useState } from 'react'
import ts from 'typescript'
import Block from './Block'

interface Props {
    text: string
    node: ts.Block
}

export default function EmptyBlock({ text, node }: Props): ReactElement {
    const css = 'cursor-pointer'
    const [visible, setVisible] = useState(node.statements.length > 0)
    const [gray, setGray] = useState(css)
    useEffect(() => {
        if (visible) {
            setGray(css + ' keyword')
        } else {
            setGray(css + ' text-gray-300')
        }
    }, [visible])
    return (
        <span>
            <span
                onClick={() => {
                    if (node.statements.length) {
                        return
                    }
                    setVisible(!visible)
                }}
                className={gray}
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
