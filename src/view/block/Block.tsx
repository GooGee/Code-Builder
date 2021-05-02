import React, { ReactElement } from 'react'
import ts from 'typescript'
import Statementxx from '../statement/Statementxx'

interface Props {
    node: ts.Block | undefined
    postfix?: string | ReactElement
    prefix?: string | ReactElement
}

export default function Block({
    node,
    prefix,
    postfix,
}: Props): ReactElement | null {
    if (node === undefined) {
        return null
    }

    return (
        <div>
            {prefix}
            {'{'}
            <div className="pl-9">
                <Statementxx list={node.statements}></Statementxx>
            </div>
            {'}'}
            {postfix}
        </div>
    )
}
