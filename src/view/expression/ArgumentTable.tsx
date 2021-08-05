import React, { ReactElement, useContext, useState } from 'react'
import ts from 'typescript'
import ExpressionTransformer from '../../helper/Transformer/ExpressionTransformer'
import Transformer from '../../helper/Transformer/Transformer'
import UniqueKey from '../../helper/UniqueKey'
import SourceFileContext, { ContextData } from '../context/SourceFileContext'
import Button from '../control/Button'
import ArgumentType from './ArgumentType'
import ExpressionRoot from './ExpressionRoot'

interface Props {
    children: ReactElement
    list: ts.NodeArray<ts.Expression>
    parent: ts.CallExpression | ts.NewExpression
}

function getSignatureList(
    context: ContextData,
    parent: ts.CallExpression | ts.NewExpression,
) {
    if (context.state === undefined) {
        throw new Error('state is undefined')
    }

    if (ts.isCallExpression(parent)) {
        return context.state.worker.checker
            .getType(parent.expression)
            .getCallSignatures()
    }
    return context.state.worker.checker
        .getType(parent.expression as ts.Identifier)
        .getConstructSignatures()
}

export default function ArgumentTable({
    children,
    list,
    parent,
}: Props): ReactElement {
    const context = useContext(SourceFileContext)
    const signaturexx = getSignatureList(context, parent)
    if (signaturexx.length === 0) {
        throw new Error('CallSignatureList is empty')
    }

    const [signature, setSignature] = useState(signaturexx[0])
    const uk = UniqueKey()
    return (
        <table className="table ml-11">
            <thead>
                <tr>
                    <th className="text-right ">
                        {children}
                        signature
                    </th>
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
                {signature.parameters.map((item, index) => (
                    <tr key={uk()}>
                        <td className="px-5">
                            {ts.isParameter(item.valueDeclaration) ? (
                                <ArgumentType
                                    node={item.valueDeclaration}
                                ></ArgumentType>
                            ) : (
                                item.valueDeclaration.getText()
                            )}
                        </td>
                        <td>
                            {index < list.length ? (
                                <span>
                                    <Button
                                        onClick={() => {
                                            if (
                                                window.confirm('Are you sure?')
                                            ) {
                                                Transformer.replace(
                                                    list[index],
                                                    undefined,
                                                )
                                                context.update!()
                                            }
                                        }}
                                        color="red"
                                    >
                                        -
                                    </Button>
                                    <ExpressionRoot
                                        node={list[index]}
                                        parent={list[index].parent}
                                        visible={true}
                                    ></ExpressionRoot>
                                </span>
                            ) : index === list.length ? (
                                <Button
                                    onClick={() => {
                                        ExpressionTransformer.addArgument(
                                            parent,
                                            item.valueDeclaration as ts.ParameterDeclaration,
                                        )
                                        context.update!()
                                    }}
                                >
                                    +
                                </Button>
                            ) : null}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
