import React, { ReactElement, useState } from 'react'
import ts from 'typescript'
import StatementMenuFactory from '../../helper/Menu/StatementMenuFactory'
import EditingBox from '../control/EditingBox'
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
    const [editing, setEditing] = useState(false)
    if (node === undefined) {
        return null
    }

    return (
        <span onClick={() => setEditing(true)}>
            {prefix}
            {'{'}
            <div className="pl-9">
                <Statementxx list={node.statements}></Statementxx>
                <div>
                    {editing ? (
                        <EditingBox hide={() => setEditing(false)}>
                            <MenuButton
                                visible={true}
                                factory={StatementMenuFactory(node)}
                            ></MenuButton>
                        </EditingBox>
                    ) : null}
                </div>
            </div>
            {'}'}
            {suffix}
        </span>
    )
}
