import React, { ReactElement } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
import ExpressionRoot from '../expression/ExpressionRoot'
import IdentifierDeclaration from '../expression/IdentifierDeclaration'
import TypeRoot from '../type/TypeRoot'

interface Props {
    children: ReactElement
    list: ts.NodeArray<ts.ParameterDeclaration>
    parent: ts.SignatureDeclarationBase
}

export default function ParameterTable({
    children,
    list,
    parent,
}: Props): ReactElement {
    const uk = UniqueKey()
    return (
        <table className="ml-11 border rounded-md">
            <thead>
                <tr>
                    <th className="p-2 border text-right">
                        {children}
                        name
                    </th>
                    <th className="p-2 border">type</th>
                    <th className="p-2 border">value</th>
                </tr>
            </thead>
            <tbody>
                {list.map((node) => (
                    <tr key={uk()}>
                        <td className="p-2 text-right">
                            <IdentifierDeclaration
                                node={node.name as any}
                            ></IdentifierDeclaration>
                        </td>
                        <td className="p-2">
                            <TypeRoot node={node.type} parent={node}></TypeRoot>
                        </td>
                        <td className="p-2">
                            <ExpressionRoot
                                node={node.initializer}
                                parent={node}
                                propertyName="initializer"
                            ></ExpressionRoot>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
