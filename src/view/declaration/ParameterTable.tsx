import React, { ReactElement, useContext } from 'react'
import ts from 'typescript'
import ParameterTransformer from '../../helper/Transformer/ParameterTransformer'
import Transformer from '../../helper/Transformer/Transformer'
import UniqueKey from '../../helper/UniqueKey'
import SourceFileContext from '../context/SourceFileContext'
import Button from '../control/Button'
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
    const context = useContext(SourceFileContext)
    const uk = UniqueKey()
    return (
        <table className="ml-11 table">
            <thead>
                <tr>
                    <th>{children}</th>
                    <th className="text-right">name</th>
                    <th>type</th>
                    <th>value</th>
                </tr>
            </thead>
            <tbody>
                {list.map((node) => (
                    <tr key={uk()}>
                        <td>
                            <Button
                                onClick={() => {
                                    ParameterTransformer.addNode(parent, node)
                                    context.update!()
                                }}
                            >
                                +
                            </Button>
                            <Button
                                onClick={() => {
                                    if (window.confirm('Are you sure?')) {
                                        Transformer.replace(node, undefined)
                                        context.update!()
                                    }
                                }}
                                color="red"
                            >
                                -
                            </Button>
                        </td>
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
            <tfoot>
                <tr>
                    <td>
                        <Button
                            onClick={() => {
                                ParameterTransformer.addNode(parent)
                                context.update!()
                            }}
                        >
                            +
                        </Button>
                    </td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tfoot>
        </table>
    )
}
