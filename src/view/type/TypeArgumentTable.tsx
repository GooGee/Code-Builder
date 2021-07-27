import React, { ReactElement } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
import TypeRoot from './TypeRoot'

interface Props {
    children: ReactElement
    list: ts.NodeArray<ts.TypeNode>
}

export default function TypeArgumentTable({
    children,
    list,
}: Props): ReactElement {
    const uk = UniqueKey()
    return (
        <table
            onClick={(event) => event.stopPropagation()}
            className="table ml-11"
        >
            <thead>
                <tr>
                    <th className="text-right">{children}</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {list.map((node) => (
                    <tr key={uk()}>
                        <td>
                            <TypeRoot
                                node={node}
                                parent={node.parent}
                            ></TypeRoot>
                        </td>
                        <td></td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
