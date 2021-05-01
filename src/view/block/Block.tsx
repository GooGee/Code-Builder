import React, { ReactElement } from 'react'
import ts from 'typescript'
import Statementxx from '../statement/Statementxx'

interface Props {
    node: ts.Block | undefined
}

export default function Block({ node }: Props): ReactElement | null {
    if (node === undefined) {
        return null
    }

    return (
        <div>
            {'{'}
            <div className="block-padding">
                <Statementxx list={node.statements}></Statementxx>
            </div>
            {'}'}
        </div>
    )
}
