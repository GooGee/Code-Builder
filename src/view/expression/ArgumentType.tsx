import React, { ReactElement } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'

interface Props {
    node: ts.ParameterDeclaration
}

export default function ArgumentType({ node }: Props): ReactElement | null {
    const uk = UniqueKey()
    if (node.type === undefined) {
        return null
    }

    if (ts.isFunctionTypeNode(node.type)) {
        if (node.type.parameters.length === 0) {
            return <span>{node.type.getText()}</span>
        }

        return (
            <table>
                <tbody>
                    <tr>
                        <td className="p-2">(</td>
                        <td className="p-2"></td>
                    </tr>
                    {node.type.parameters.map((item) => (
                        <tr key={uk()}>
                            <td className="text-right p-2">
                                {item.name.getText()}
                            </td>
                            <td className="p-2">
                                {item.type === undefined
                                    ? null
                                    : item.type.getText()}
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td className="p-2">{') =>'}</td>
                        <td className="p-2">{node.type.type.getText()}</td>
                    </tr>
                </tbody>
            </table>
        )
    }

    return <span>{node.getText()}</span>
}
