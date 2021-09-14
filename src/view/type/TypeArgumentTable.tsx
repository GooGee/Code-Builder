import React, { ReactElement, useContext, useState } from 'react'
import ts from 'typescript'
import UniqueKey from '../../helper/UniqueKey'
import SourceFileContext from '../context/SourceFileContext'
import TypeRoot from './TypeRoot'

interface Props {
    children: ReactElement
    list: ts.NodeArray<ts.TypeNode>
    parent: ts.CallExpression | ts.NewExpression
}

export default function TypeArgumentTable({
    children,
    list,
    parent,
}: Props): ReactElement {
    const context = useContext(SourceFileContext)
    const signaturexx =
        context.state?.worker.checker
            .getType(parent.expression)
            .getCallSignatures() ?? []
    const [signature, setSignature] = useState(signaturexx[0])
    const typeParameterxx = signature?.declaration?.typeParameters ?? []
    const uk = UniqueKey()
    return (
        <table
            onClick={(event) => event.stopPropagation()}
            className="table ml-11"
        >
            <thead>
                <tr>
                    <th className="text-right">{children} signature</th>
                    <th>
                        <select
                            onChange={(event) =>
                                setSignature(
                                    signaturexx[parseInt(event.target.value)],
                                )
                            }
                            className="border rounded-md p-1"
                        >
                            {signaturexx.map((item, index) => (
                                <option key={uk()} value={index}>
                                    {item.declaration?.getText()}
                                </option>
                            ))}
                        </select>
                    </th>
                </tr>
            </thead>
            <tbody>
                {list.map((node, index) => (
                    <tr key={uk()}>
                        <td>
                            {index >= typeParameterxx.length
                                ? null
                                : typeParameterxx[index].getText()}
                        </td>
                        <td>
                            <TypeRoot
                                node={node}
                                parent={node.parent}
                            ></TypeRoot>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
