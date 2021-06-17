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
    const [visible, setVisible] = useState(false)
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
                    <div
                        onMouseOver={() => setVisible(true)}
                        onMouseLeave={() => setVisible(false)}
                    >
                        {visible ? (
                            <MenuButton
                                factory={StatementMenuFactory(node)}
                                text="+"
                                visible={visible}
                            ></MenuButton>
                        ) : (
                            <span className="cursor-pointer px-2 py-1 mr-1">
                                +
                            </span>
                        )}
                    </div>
                )}
            </div>
            {'}'}
            {suffix}
        </span>
    )
}
