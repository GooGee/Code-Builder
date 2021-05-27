import React, { ReactElement } from 'react'
import ts from 'typescript'
import Statementxx from '../statement/Statementxx'

interface Props {
    node: ts.Block | undefined
    prefix?: string | ReactElement
    suffix?: string | ReactElement
}

export default function Block({
    node,
    prefix,
    suffix,
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
            {suffix}
        </div>
    )
}
