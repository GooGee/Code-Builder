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
        <table className="ml-11 table">
            <thead>
                <tr>
                    <th className="text-right">
                        {children}
                        name
                    </th>
                    <th>type</th>
                    <th>value</th>
                </tr>
            </thead>
            <tbody>
                {list.map((node) => (
                    <tr key={uk()}>
                        <td className="text-right">
                            <IdentifierDeclaration
                                node={node.name as any}
                            ></IdentifierDeclaration>
                        </td>
                        <td>
                            <TypeRoot node={node.type} parent={node}></TypeRoot>
                        </td>
                        <td>
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
