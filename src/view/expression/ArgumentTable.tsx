import React, { ReactElement, useContext, useState } from 'react'
import ts from 'typescript'
import ExpressionMenuFactory from '../../helper/Menu/ExpressionMenuFactory'
import ExpressionTransformer from '../../helper/Transformer/ExpressionTransformer'
import Transformer from '../../helper/Transformer/Transformer'
import UniqueKey from '../../helper/UniqueKey'
import SourceFileContext, { ContextData } from '../context/SourceFileContext'
import Button from '../control/Button'
import MenuButton from '../control/MenuButton'

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
        return context.state.worker.checker.getCallSignatureList(
            parent.expression as ts.Identifier,
        )
    }
    return context.state.worker.checker.getConstructSignature(
        parent.expression as ts.Identifier,
    )
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

    function getType(node: ts.Declaration) {
        if (ts.isParameter(node)) {
            if (node.type === undefined) {
                return null
            }
            if (ts.isFunctionTypeNode(node.type)) {
                if (node.type.parameters.length === 0) {
                    return node.type.getText()
                }
                return (
                    <table className="border-gray-200 border rounded-md">
                        <tbody>
                            <tr>
                                <td>(</td>
                                <td></td>
                            </tr>
                            {node.type.parameters.map((item) => (
                                <tr key={uk()}>
                                    <td className="p-2">
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
            return node.getText()
        }
        return null
    }
    return (
        <table className="ml-11 border-gray-200 border rounded-md">
            <tbody>
                <tr>
                    <td className="text-right p-2 px-5">
                        {children}
                        signature
                    </td>
                    <td className="p-2">
                        <select
                            onChange={(event) =>
                                setSignature(
                                    signaturexx[parseInt(event.target.value)],
                                )
                            }
                            className="border-gray-300 border rounded-md p-1"
                        >
                            {signaturexx.map((item, index) => (
                                <option key={uk()} value={index}>
                                    {item.declaration?.getText()}
                                </option>
                            ))}
                        </select>
                    </td>
                </tr>
                {signature.parameters.map((item, index) => (
                    <tr key={uk()}>
                        <td className="text-right p-2 px-5">
                            {getType(item.valueDeclaration)}
                        </td>
                        <td className="p-2">
                            {index < list.length ? (
                                <span>
                                    <Button
                                        onClick={() => {
                                            if (
                                                window.confirm('Are you sure:')
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
                                    <MenuButton
                                        factory={ExpressionMenuFactory(
                                            parent,
                                            list[index],
                                        )}
                                    >
                                        <span>{list[index].getText()}</span>
                                    </MenuButton>
                                </span>
                            ) : (
                                <Button
                                    onClick={() => {
                                        ExpressionTransformer.addArgument(
                                            parent,
                                        )
                                        context.update!()
                                    }}
                                >
                                    +
                                </Button>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
