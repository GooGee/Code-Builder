import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import HoverButton from '../control/HoverButton'
import StatementMenu from '../control/StatementMenu'
import Statementxx from '../statement/Statementxx'

interface Props {
    node: ts.Block | undefined
}

export default function Block({ node }: Props): ReactElement | null {
    if (node === undefined) {
        return null
    }

    return (
        <span>
            {'{'}
            <div onClick={(event) => event.stopPropagation()} className="pl-11">
                <Statementxx list={node.statements}></Statementxx>
                {node.statements.length > 0 ? null : (
                    <StatementMenu factory={StatementMenuFactory} parent={node}>
                        <HoverButton>+</HoverButton>
                    </StatementMenu>
                )}
            </div>
            {'}'}
        </span>
    )
}
