import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import Button from '../control/Button'
import TypeArgumentTable from '../type/TypeArgumentTable'
import TypeNodexx from '../type/TypeNodexx'
import Expression from './Expression'
import Expressionxx from './Expressionxx'

interface Props {
    node: ts.CallExpression | ts.NewExpression
    root: ts.Expression
}

export default function CallExpression({ node, root }: Props): ReactElement {
    const [editing, setEditing] = useState(false)

    function view() {
        if (node.typeArguments === undefined) {
            return null
        }
        if (node.typeArguments.length === 0) {
            return null
        }

        if (editing) {
            return (
                <TypeArgumentTable list={node.typeArguments} parent={node}>
                    <Button onClick={() => setEditing(false)}>x</Button>
                </TypeArgumentTable>
            )
        }

        return (
            <span
                onClick={(event) => {
                    event.stopPropagation()
                    setEditing(true)
                }}
            >
                &lt;
                <TypeNodexx list={node.typeArguments}></TypeNodexx>
                &gt;
            </span>
        )
    }

    return (
        <span>
            <Expression node={node.expression} root={root}></Expression>
            {view()}
            <Expressionxx
                list={node.arguments!}
                parent={node}
                root={root}
            ></Expressionxx>
        </span>
    )
}
