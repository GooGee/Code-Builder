import React, { ReactElement } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import MenuButton from '../control/MenuButton'
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
        <span>
            {prefix}
            {'{'}
            <div onClick={(event) => event.stopPropagation()} className="pl-11">
                <Statementxx list={node.statements}></Statementxx>
                {node.statements.length > 0 ? null : (
                    <MenuButton
                        factory={StatementMenuFactory(node)}
                        visible={true}
                    >
                        <span className="cursor-pointer px-2 py-1 mr-1">+</span>
                    </MenuButton>
                )}
            </div>
            {'}'}
            {suffix}
        </span>
    )
}
